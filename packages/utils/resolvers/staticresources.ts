import path from 'path'
import { access, readFile, stat } from 'fs/promises'
import { fileURLToPath } from 'url'

import { hashContent } from '@lwrjs/shared-utils'
import {
  AbstractModuleId,
  FsModuleEntry,
  ModuleCompiled,
  ModuleEntry,
  ModuleProvider,
  ModuleSource,
  ProviderContext,
  VirtualModuleEntry,
} from '@lwrjs/types'

const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    await access(filePath)
    return true
  } catch {
    return false
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

// Return generated LWC code strings by file type: html, css or default js
async function generateModule(
  specifier: string,
  { paths, rootDir }: { paths: string[]; rootDir: string }
) {
  const fileOrFolderName = specifier.split('/').at(-1)

  // check for the apex mock within any of the provided config "paths"
  let staticresourcePath: string = ''
  for await (const singlePath of paths) {
    const fullPath = `${rootDir}/${singlePath}/${fileOrFolderName}`
    if ((await fileExists(fullPath)) || (await folderExists(fullPath))) {
      staticresourcePath = `/${singlePath}/${fileOrFolderName}`
      break
    }
  }

  // we use hooks, no need to return anything more than the path here
  return `export default '${staticresourcePath}'`
}

interface StaticResourceProviderOptions {
  paths: string | string[]
}

export default class StaticResourceProvider implements ModuleProvider {
  name: string = '@lwc-garden/utils/staticresource-provider'
  private version = '1'
  rootDir: string = ''
  paths: string[] = []

  constructor(config: StaticResourceProviderOptions, context: ProviderContext) {
    const { paths = 'force-app/main/default/staticresources' } = config

    // bind rootDir from user config
    this.rootDir = context.config.rootDir

    // normalize to always be an array
    this.paths = typeof paths === 'string' ? [paths] : paths
  }

  getConfig = () => ({
    paths: this.paths,
    rootDir: this.rootDir,
  })

  async getModuleEntry({
    specifier,
  }: AbstractModuleId): Promise<VirtualModuleEntry | undefined> {
    if (specifier.startsWith('@salesforce/resourceUrl/')) {
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
