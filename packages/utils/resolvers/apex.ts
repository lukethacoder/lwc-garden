import path from 'path'
import { access, readFile } from 'fs/promises'
import { fileURLToPath } from 'url'

import { hashContent } from '@lwrjs/shared-utils'
import {
  AbstractModuleId,
  ModuleCompiled,
  ModuleProvider,
  ProviderContext,
  VirtualModuleEntry,
} from '@lwrjs/types'

export const readFileContent = async (filePath: string) => {
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

export const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    await access(filePath)
    return true // File exists
  } catch {
    return false // File does not exist
  }
}

const parseApexSpecifier = (
  specifier: string
): [string | null, string | null] => {
  const lastSegment = specifier.split('/').at(-1) // Get the last segment of the path
  if (!lastSegment) return [null, null] // If there’s no last segment, return null values

  const [apexClassName, apexMethodName] = lastSegment.split('.') ?? []
  return [apexClassName || null, apexMethodName || null] // Ensure both parts are null if missing
}

// Return generated LWC code strings by file type: html, css or default js
async function generateModule(
  specifier: string,
  { paths, rootDir }: { paths: string[]; rootDir: string }
): Promise<string> {
  const [apexClassName, apexMethodName] = parseApexSpecifier(specifier)

  // early return if either the class name or the method couldn't be calculated
  if (!apexClassName || !apexMethodName) {
    return ''
  }

  // check for the apex mock within any of the provided config "paths"
  let fileContents: string = ''
  for await (const singlePath of paths) {
    if (await fileExists(`${rootDir}/${singlePath}/${apexClassName}.js`)) {
      fileContents = await readFileContent(
        `${rootDir}/${paths[0]}/${apexClassName}.js`
      )
      break
    }
  }

  // successfully found apex mock
  if (apexMethodName && fileContents) {
    return `${fileContents}
${
  // if no default export is found, "create" one
  fileContents.includes('export default')
    ? ''
    : `export default ${apexMethodName}`
}`
  }

  // Unable to find mock within file?
  console.error(
    `[@lwc-garden/utils/resolvers/apex] Unable to find apex mock '${apexMethodName}'`
  )
  return `export default function() { console.error("Unable to find apex mock '${apexMethodName}'") }`
}

interface ApexProviderOptions {
  paths: string | string[]
}

export default class ApexProvider implements ModuleProvider {
  name: string = '@lwc-garden/utils/apex-provider'
  private version = '1'
  rootDir: string = ''
  paths: string[] = []

  constructor(config: ApexProviderOptions, context: ProviderContext) {
    const { paths = 'apex' } = config

    // bind rootDir from user config
    this.rootDir = context.config.rootDir

    // normalize to always be an array
    this.paths = typeof paths === 'string' ? [paths] : paths
  }

  getConfig() {
    return {
      paths: this.paths,
      rootDir: this.rootDir,
    }
  }

  async getModuleEntry({
    specifier,
  }: AbstractModuleId): Promise<VirtualModuleEntry | undefined> {
    if (specifier && specifier.startsWith('@salesforce/apex/')) {
      const [apexClassName, apexMethodName] = parseApexSpecifier(specifier)

      // early return if either the class name or the method couldn't be calculated
      if (!apexClassName || !apexMethodName) {
        return undefined
      }

      // Module provider checks for the @my namespace
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
