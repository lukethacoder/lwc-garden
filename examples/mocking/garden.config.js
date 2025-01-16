import path from 'path'

import lwrConfig from './lwr.config.json' with { type: 'json' }

/**
 * @type {import('@lwc-garden/core/types').GardenConfig}
 */
const CONFIG = {
  rootDir: path.resolve('./'),
  // don't display mock LWCs in the sidebar
  ignore: ['./__mocks__/**'],
  // lwr.config.json modules type
  modules: lwrConfig.lwc.modules,
}

export default CONFIG
