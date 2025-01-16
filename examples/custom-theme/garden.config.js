import path from 'path'

import lwrConfig from './lwr.config.json' with { type: 'json' }
import CUSTOM_THEME from './theme.js'

/**
 * @type {import('@lwc-garden/core/types').GardenConfig}
 */
const CONFIG = {
  rootDir: path.resolve('./'),
  // lwr.config.json modules type
  modules: [...lwrConfig.lwc.modules],
  theme: CUSTOM_THEME,
}

export default CONFIG
