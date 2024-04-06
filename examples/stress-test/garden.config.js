import THEME_ROSE from '@lwc-garden/core/themes/rose.js'

import lwrConfig from './lwr.config.json' assert { type: 'json' }

/**
 * @type {import('@lwc-garden/core/types').GardenConfig}
 */
const CONFIG = {
  // lwr.config.json modules type
  modules: [...lwrConfig.lwc.modules],
  theme: THEME_ROSE,
}

export default CONFIG
