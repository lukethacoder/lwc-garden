import path from 'path'

import lwcConfig from './lwc.config.json' assert { type: 'json' }

/**
 * @type {import('@lwc-garden/core/types').GardenConfig}
 */
const CONFIG = {
  rootDir: path.resolve('./'),
  // don't display mock LWCs in the sidebar
  ignore: ['./__mocks__/**'],
  // lwc.config.json modules type
  modules: lwcConfig.modules,
}

export default CONFIG
