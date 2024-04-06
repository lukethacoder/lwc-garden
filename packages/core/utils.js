import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { logger } from '@lwrjs/diagnostics'

import DEFAULT_THEME from './themes/green.js'

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

const CACHE_FOLDER = '.garden'

export async function loadConfig(pathToConfig) {
  /**
   * @type {import('./types').GardenConfig}
   */
  const GardenConfigFromFile = await checkAndReadFile(pathToConfig)

  if (!GardenConfigFromFile) {
    logger.error('Please create a garden.config.js file')
    process.exit(1)
  }

  const gardenConfig = GardenConfigFromFile.default
  const rootDir = gardenConfig.rootDir || process.cwd()

  const themeFromConfig = gardenConfig.theme
  const theme = {
    light: {
      ...DEFAULT_THEME.light,
      ...(themeFromConfig && Object.hasOwn(themeFromConfig, 'light')
        ? themeFromConfig.light
        : {}),
    },
    dark: {
      ...DEFAULT_THEME.dark,
      ...(themeFromConfig && Object.hasOwn(themeFromConfig, 'dark')
        ? themeFromConfig.dark
        : {}),
    },
  }

  /**
   * @type {import('./types').GardenConfig}
   */
  const _gardenConfig = {
    ...gardenConfig,
    rootDir,
    cacheDir: path.join(rootDir, CACHE_FOLDER),
    theme,
    port: gardenConfig.port || 3333,
    args: {
      cache: true,
      ...gardenConfig?.args,
    },
    slots: {
      /* display placeholders by default */
      placeholder: true,
      ...gardenConfig?.slots,
      components: {
        default: () => import('garden/placeholder'),
        ...gardenConfig?.slots?.components,
      },
    },
    lwc: {
      disableSyntheticShadowSupport: false,
      ...gardenConfig.lwc,
    },
  }

  return _gardenConfig
}

export async function loadLwrConfig(pathToConfig) {
  const LwrConfigFromFile = await checkAndReadFile(pathToConfig)
  if (!LwrConfigFromFile) {
    logger.error('Please create a lwr.config.json file')
    process.exit(1)
  }

  return LwrConfigFromFile.default
}

export async function checkAndReadFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      // assert JSON imports
      if (filePath.split('.').at(-1) === 'json') {
        return import(pathToFileURL(filePath), {
          assert: { type: 'json' },
        })
      }

      return import(pathToFileURL(filePath))
    } else {
      logger.info(`File "${filePath}" does not exist.`)
    }
  } catch (error) {
    logger.error(error.message)
    return null
  }
}

export async function writeStringToFile(filePath, content) {
  try {
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
    await fs.promises.writeFile(filePath, content, 'utf8')
  } catch (error) {
    logger.error(`Error writing to file: ${filePath}`, error)
  }
}

/**
 * Format a JavaScript object to a string
 *
 * Similar to JSON.stringify, but keeps methods and value types
 *
 * @param {Object} obj
 * @param {number}[2] indent
 * @returns {string}
 */
export function formatObjectToString(obj, indent = 2) {
  if (typeof obj === 'function') {
    return obj.toString()
  }
  if (Array.isArray(obj)) {
    let str = '['
    for (let i = 0; i < obj.length; i++) {
      str +=
        formatObjectToString(obj[i], indent) + (i < obj.length - 1 ? ', ' : '')
    }
    str += ']'
    return str
  }
  if (typeof obj === 'object' && obj !== null) {
    let str = '{\n'
    for (const key in obj) {
      str += ' '.repeat(indent)
      str += `${key.includes('-') ? `'${key}'` : key}: ${formatObjectToString(obj[key], indent + 2)},\n`
    }
    str += ' '.repeat(indent - 2) + '}'
    return str
  }
  return JSON.stringify(obj)
}
