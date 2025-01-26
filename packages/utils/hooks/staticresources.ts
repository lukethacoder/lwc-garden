import { join } from 'path'
import { readdir } from 'fs/promises'
import {
  AssetConfig,
  GlobalData,
  NormalizedLwrGlobalConfig,
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
    staticresources: {
      paths: string[]
    }
  }
}

export default class StaticResourceHook {
  async initConfigs(
    lwrConfig: NormalizedLwrGlobalConfig,
    globalData: SiteGlobalData
  ) {
    if (!globalData.garden) {
      throw 'Expected "garden" global data to be defined'
    }

    const { rootDir } = lwrConfig

    if (globalData.garden.staticresources.paths) {
      const absolutePaths = globalData.garden.staticresources.paths.map(
        (item) => join(rootDir, item)
      )
      const staticresourceFiles = await getFilesRecursively(absolutePaths)

      const staticResourceAssetConfigs = staticresourceFiles.reduce<
        AssetConfig[]
      >((acc, item) => {
        // ignore `-meta.xml` files - these are not meant to be loaded
        if (item.includes('-meta.xml')) {
          return acc
        }

        const pathNormalize = item.replace(rootDir, '').replaceAll('\\', '/')

        // add mapping
        acc.push({
          dir: `.${pathNormalize}`,
          urlPath: pathNormalize,
        })

        /**
         * allow .js files to be imported by other js files within static
         * resources without having to explicitly define the `.js` extension.
         */
        if (pathNormalize.includes('.js'))
          acc.push({
            dir: `.${pathNormalize}`,
            urlPath: pathNormalize.replace('.js', ''),
          })

        return acc
      }, [])

      lwrConfig.assets.push(...staticResourceAssetConfigs)
    }
  }
}
