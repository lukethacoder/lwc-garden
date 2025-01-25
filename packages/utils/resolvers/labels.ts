import path from 'path'
import { access, readFile, readdir, stat } from 'fs/promises'
import { fileURLToPath } from 'url'

import { hashContent } from '@lwrjs/shared-utils'
import {
  AbstractModuleId,
  ModuleCompiled,
  ModuleProvider,
  ProviderContext,
  VirtualModuleEntry,
} from '@lwrjs/types'

/**
 * Reads all file names within a folder that match a specific extension.
 * @param folderPath - The path to the folder to read.
 * @param extension - The file extension to filter (e.g., ".txt").
 * @returns A Promise that resolves to an array of matching file names.
 */
async function getFilesByExtension(
  folderPath: string,
  extension: string
): Promise<string[]> {
  try {
    const files = await readdir(folderPath, { withFileTypes: true })
    const matchingFiles: string[] = []

    for (const file of files) {
      if (file.isFile() && file.name.endsWith(extension)) {
        matchingFiles.push(path.resolve(folderPath, file.name))
      }
    }

    return matchingFiles
  } catch (error) {
    console.error('Error reading folder: ', error)
    throw error
  }
}

const readFileContent = async (filePath: string) => {
  try {
    // Resolve the full path (for compatibility with ES modules)
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const fullPath = path.resolve(__dirname, filePath)

    // Read the file as a string
    const content = await readFile(fullPath, 'utf8')
    return content
  } catch (error) {
    console.error(
      `[@lwc-garden/utils/resolvers/apex] Error reading file: `,
      error
    )
    throw error
  }
}

/**
 * Checks if a folder exists at the given path.
 * @param {string} folderPath - The path to the folder.
 * @returns {Promise<boolean>} - Returns true if the folder exists, otherwise false.
 */
const folderExists = async (folderPath: string) => {
  try {
    const stats = await stat(folderPath)
    return stats.isDirectory()
  } catch {
    return false
  }
}

/**
 * Finds the value corresponding to a given fullName in the XML content.
 * @param xmlContent - The XML string to parse.
 * @param targetFullName - The fullName to search for.
 * @returns The value associated with the fullName or undefined if not found.
 */
function findValueByFullNameFromXML(
  xmlContent: string,
  targetFullName: string
): string | undefined {
  // Extract all <labels> elements using a regular expression
  const labelsMatches = xmlContent.match(/<labels>[\s\S]*?<\/labels>/g)

  if (!labelsMatches) {
    return undefined // No labels found
  }

  for (const label of labelsMatches) {
    // Extract the fullName value
    const fullNameMatch = label.match(/<fullName>(.*?)<\/fullName>/)
    const valueMatch = label.match(/<value>(.*?)<\/value>/)

    if (fullNameMatch && fullNameMatch[1] === targetFullName) {
      return valueMatch ? valueMatch[1] : undefined // Return value if found
    }
  }

  return undefined // No matching fullName found
}

// Return generated LWC code strings by file type: html, css or default js
async function generateModule(
  specifier: string,
  { paths, rootDir }: { paths: string[]; rootDir: string }
) {
  const labelName = specifier.split('.').at(-1)
  if (!labelName) {
    return ''
  }

  let labelValue: string | undefined

  // check over each folder passed as part of "paths"
  for await (const singlePath of paths) {
    const fullPath = `${rootDir}/${singlePath}`

    // check over each folder passed as part of "paths"
    if (await folderExists(fullPath)) {
      const files = await getFilesByExtension(fullPath, '.labels-meta.xml')

      // check each file within the specific folder
      for (const file of files) {
        const contents = await readFileContent(file)
        labelValue = findValueByFullNameFromXML(contents, labelName)
        if (labelValue) {
          break
        }
      }
      if (labelValue) {
        break
      }
    }
  }

  // we use hooks, no need to return anything more than the path here
  return `export default '${labelValue}'`
}

interface LabelProviderOptions {
  paths: string[]
}

export default class LabelProvider implements ModuleProvider {
  name: string = '@lwc-garden/utils/label-provider'
  private version = '1'
  rootDir: string = ''
  paths: string[] = []

  constructor(config: LabelProviderOptions, context: ProviderContext) {
    const { paths = ['force-app/main/default/labels'] } = config

    // bind rootDir from user config
    this.rootDir = context.config.rootDir

    // normalize to always be an array
    this.paths = paths
  }

  getConfig = () => ({
    paths: this.paths,
    rootDir: this.rootDir,
  })

  async getModuleEntry({
    specifier,
  }: AbstractModuleId): Promise<VirtualModuleEntry | undefined> {
    if (specifier.startsWith('@salesforce/label/')) {
      return {
        id: `${specifier}|${this.version}`,
        virtual: true,
        entry: `<virtual>/${specifier}.js`,
        specifier, // Reuse the specifier passed into getModuleEntry()
        version: this.version,
      }
    }
  }

  async getModule({
    specifier,
    namespace,
    name,
  }: AbstractModuleId): Promise<ModuleCompiled | undefined> {
    // Retrieve the Module Entry
    const moduleEntry = await this.getModuleEntry({ specifier })
    if (!moduleEntry) {
      return
    }

    // Generate code for the requested ES module
    const originalSource = await generateModule(specifier, this.getConfig())

    // Construct a Module object
    return {
      id: moduleEntry.id,
      specifier,
      namespace,
      name: name || specifier,
      version: this.version,
      originalSource,
      moduleEntry,
      ownHash: hashContent(originalSource),
      // Note: there is no need to compile this module
      // The module registry will compile ES code, if needed
      compiledSource: originalSource,
    }
  }
}
