import path from 'path'

import lwcConfig from './lwc.config.json' assert { type: 'json' }
import CUSTOM_THEME from './theme.js'

/**
 * @type {import('@lwc-garden/core/types').GardenConfig}
 */
const CONFIG = {
  rootDir: path.resolve('./'),
  // lwc.config.json modules type
  modules: [...lwcConfig.modules],
  theme: CUSTOM_THEME,
}

export default CONFIG
