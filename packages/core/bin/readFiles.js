import fs from 'fs/promises'
import path from 'path'

import { pathToFileURL } from 'url'
import { minimatch } from 'minimatch'

import { formatObjectToString, writeStringToFile } from '../utils.js'
import { COMPONENT_CONFIG_FILE_NAME, MODULES_LWC_PATH } from '../constants.js'

function readSlotsFromHtml(htmlString) {
  // Define the regular expression pattern
  const pattern = /<slot(?:\s+name="([^"]*)")?>/g

  // Find all matches in the HTML string
  const slotNames = []
  let match
  while ((match = pattern.exec(htmlString)) !== null) {
    const slotName = match[1] || 'default' // If name attribute is empty, set to 'default'
    slotNames.push(slotName)
  }

  return slotNames
}

async function getHtmlFile(files) {
  const htmlFile = files.find((item) => item.includes('.html'))

  if (htmlFile) {
    return await fs.readFile(htmlFile, 'utf-8')
  }
  return undefined
}

async function handleLwcComponentMetadataFromFiles(
  gardenConfig,
  modules,
  files
) {
  const {
    slots: { placeholder, components },
  } = gardenConfig

  const firstFile = files.find((item) => !item.includes('garden.config'))
  const componentName = firstFile.split('/').at(-1).split('.')[0]
  const { namespace } = modules.find((item) => firstFile.includes(item.dir))

  // const slotsComponents =

  const configFromComponent = files.find((item) =>
    item.includes(COMPONENT_CONFIG_FILE_NAME)
  )
  if (configFromComponent) {
    // import local LWCs garden.config.js file
    const data = await import(pathToFileURL(configFromComponent))

    // TODO: should we validate this?
    const customLwcConfig = data.default

    let slots = customLwcConfig.slots

    // if no slots are provided, attempt to read from the HTML file
    if (!slots) {
      const htmlFileContents = await getHtmlFile(files)
      if (htmlFileContents) {
        slots = readSlotsFromHtml(htmlFileContents)
      }
    }

    const slotComponentsMerged = {
      ...components,
      ...customLwcConfig.slotComponents,
    }
    const slotComponents = Object.keys(slotComponentsMerged).reduce(
      (acc, item) => {
        if (slots.includes(item)) {
          acc = {
            ...acc,
            [item]: slotComponentsMerged[item],
          }
        }
        return acc
      },
      {}
    )

    return {
      id: `${namespace}-${componentName}`,
      href: `?module=${namespace}%2F${componentName}`,
      label: customLwcConfig.name || componentName,
      category: customLwcConfig.category || namespace || 'Uncagetorised',
      name: `${namespace}/${componentName}`,
      ...(customLwcConfig.argTypes
        ? { argTypes: customLwcConfig.argTypes }
        : {}),
      ...(placeholder && slotComponents ? { slotComponents } : {}),
      ...(slots.length > 0 ? { slots } : {}),
    }
  }

  let slots = []
  const htmlFileContents = await getHtmlFile(files)
  if (htmlFileContents) {
    slots = readSlotsFromHtml(htmlFileContents)
  }

  const slotComponents = placeholder
    ? Object.keys(components).reduce((acc, item) => {
        if (slots.includes(item)) {
          acc = {
            ...acc,
            [item]: components[item],
          }
        }
        return acc
      }, {})
    : undefined

  return {
    id: `${namespace}-${componentName}`,
    href: `?module=${namespace}%2F${componentName}`,
    label: componentName,
    name: `${namespace}/${componentName}`,
    category: namespace || 'Uncagetorised',
    slotComponents,
    ...(slots.length > 0 ? { slots } : {}),
  }
}

/**
 * Valid LWCs should contain a .html file and a .js file that matches the parent folders names
 * @param {Object[]} files
 * @returns {boolean}
 */
function validateLwcFromFiles(files) {
  const hasHtmlFile = files.find(
    (item) =>
      item.entryPath.split(
        `${item.parentFolderName}/${item.parentFolderName}`
      )[1] === '.html'
  )
  const hasJsFile = files.find(
    (item) =>
      item.entryPath.split(
        `${item.parentFolderName}/${item.parentFolderName}`
      )[1] === '.js'
  )

  return hasHtmlFile && hasJsFile
}

async function checkFolders(gardenConfig, folderPaths, modules) {
  let components = []

  for (const folderPath of folderPaths) {
    try {
      const dirEntries = await fs.readdir(folderPath)

      const files = []
      for (const entry of dirEntries) {
        const entryPath = `${folderPath}/${entry}`
        const stats = await fs.stat(entryPath)
        if (stats.isDirectory()) {
          const _components = await checkFolders(
            gardenConfig,
            [entryPath],
            modules
          ) // Recursive call with array
          components = components.concat(_components)
        } else {
          const parentFolderName = folderPath.split('/').at(-1)
          const baseName = entry.split('.')[0]

          // LWCs should have componentName/componentName.(html|js|css) structure
          if (
            parentFolderName === baseName ||
            entry === COMPONENT_CONFIG_FILE_NAME
          ) {
            files.push({
              parentFolderName,
              baseName,
              entryPath,
            })
          }
        }
      }

      const isValidLwcFromFiles = validateLwcFromFiles(files)

      /**
       * Only attempt to render LWCs with at least a componentName.js and a componentName.html file
       */
      if (files.length > 0 && isValidLwcFromFiles) {
        components.push(
          await handleLwcComponentMetadataFromFiles(
            gardenConfig,
            modules,
            files.map((item) => item.entryPath)
          )
        )
      }
    } catch (error) {
      console.error(`Error checking folder: ${folderPath}`, error)
    }
  }

  return components
}

async function saveComponentsMetadataToFile(moduleFile, components) {
  const fileLines = components.reduce((acc, item) => {
    item['LWC'] = `() => import('${item.name}')`
    acc.push(item)

    return acc
  }, [])

  const metadataString = formatObjectToString(fileLines)

  // Function to remove quotes from LWC key
  function removeQuotesFromLWC(dataString) {
    // Capture the value without quotes
    // const regex = /: ?"([^"]+)"/g
    const regex = /: "\(\) => import\(([^)]+)\)"/g
    return dataString.replace(regex, ': () => import($1)')
  }

  await writeStringToFile(
    moduleFile,
    `import { GardenModule } from '../types'

export const MODULES: GardenModule[] = ${removeQuotesFromLWC(metadataString)}`
  )
}

function isFileMatch(filePath, ignorePatterns) {
  for (const pattern of ignorePatterns) {
    if (minimatch(filePath, pattern)) {
      // Path is ignored, stop iterating patterns
      return false
    }
  }
  // No match in any pattern, path is included
  return true
}

async function main(gardenConfig) {
  const { ignore, modules, cacheDir } = gardenConfig

  const foldersToWatch = modules.reduce((acc, item) => {
    // ignore garden LWCs
    if (item.dir && !item.dir.includes('garden')) {
      if (ignore) {
        // check file isn't being ignored
        if (isFileMatch(item.dir, ignore)) {
          acc.push(item.dir)
        }
      } else {
        acc.push(item.dir)
      }
    }

    return acc
  }, [])

  const components = await checkFolders(gardenConfig, foldersToWatch, modules)
  const modulesFile = path.join(cacheDir, 'components', MODULES_LWC_PATH)

  await saveComponentsMetadataToFile(modulesFile, components)
}

export default main
