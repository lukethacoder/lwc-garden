import lwrConfig from './lwr.config.json' assert { type: 'json' }

/**
 * @type {import('@lwc-garden/core/types').GardenConfig}
 */
const CONFIG = {
  // lwr.config.json modules type
  modules: [...lwrConfig.lwc.modules],
  lwc: {
    disableSyntheticShadowSupport: true,
  },
}

export default CONFIG
