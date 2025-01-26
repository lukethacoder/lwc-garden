import { join } from 'path'
import { readdir } from 'fs/promises'
import {
  GlobalData,
  NormalizedLwrGlobalConfig,
  ResolverModuleRecord,
} from '@lwrjs/types'

/**
 * Recursively retrieves all unique files from multiple directories.
 *
 * @param {string[]} dirs - An array of directories to search.
 * @returns {Promise<string[]>} - An array of unique file paths.
 */
const getFilesRecursively = async (dirs: string[]): Promise<string[]> => {
  const results: Set<string> = new Set() // Use a Set to store unique file paths

  const processDirectory = async (dir: string) => {
    try {
      const entries = await readdir(dir, { withFileTypes: true })

      for (const entry of entries) {
        const fullPath = join(dir, entry.name)

        if (entry.isDirectory()) {
          // Recursively process subdirectories
          await processDirectory(fullPath)
        } else {
          // Add file to the results Set
          results.add(fullPath)
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dir}:`, error)
      throw error
    }
  }

  for (const dir of dirs) {
    await processDirectory(dir)
  }

  // Convert Set to an Array
  return Array.from(results)
}

interface SiteGlobalData extends GlobalData {
  garden: {
    apex: {
      paths: string[]
    }
  }
}

const SALESFORCE_APEX_IMPORT_BASE = '@salesforce/apex'

export default class ApexHook {
  async initConfigs(
    lwrConfig: NormalizedLwrGlobalConfig,
    globalData: SiteGlobalData
  ) {
    if (!globalData.garden) {
      throw 'Expected "garden" global data to be defined'
    }

    const { rootDir } = lwrConfig

    if (globalData.garden.apex.paths) {
      const absolutePaths = globalData.garden.apex.paths.map((item) =>
        join(rootDir, item)
      )

      const apexMockFiles = await getFilesRecursively(absolutePaths)

      const apexMocks: ResolverModuleRecord[] = apexMockFiles.map((item) => {
        const pathNormalize = item.replace(rootDir, '').replaceAll('\\', '/')

        const importName = pathNormalize.split('/').at(-1)?.replace('.js', '')

        return {
          name: `${SALESFORCE_APEX_IMPORT_BASE}/${importName}`,
          path: `.${pathNormalize}`,
        }
      })

      console.log('apexMocks ', apexMocks)

      lwrConfig.lwc.modules.push(...apexMocks)
    }
  }
}
