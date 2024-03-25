import path from 'path'
import { fileURLToPath } from 'url'

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

export const __root = process.cwd()
export const __cache = path.join(__root, '.garden')

export const COMPONENT_CONFIG_FILE_NAME = 'garden.config.js'
export const MODULES_LWC_PATH = './modules/modules.ts'
export const CONFIG_LWC_PATH = './config/config.ts'
