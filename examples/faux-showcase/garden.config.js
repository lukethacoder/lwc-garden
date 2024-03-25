import lwcConfig from './lwc.config.json' assert { type: 'json' }

/**
 * @type {import('@lwc-garden/core/types').GardenConfig}
 */
const CONFIG = {
  // lwc.config.json modules type
  modules: [...lwcConfig.modules],
}

export default CONFIG
