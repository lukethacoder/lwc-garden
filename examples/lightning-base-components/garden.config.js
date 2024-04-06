import lwrConfig from './lwr.config.json' assert { type: 'json' }

/**
 * @type {import('@lwc-garden/core/types').GardenConfig}
 */
const CONFIG = {
  // uses minimatch
  ignore: ['./**/lightning', './**/__examples__', './**/__docs__'],
  // lwr.config.json modules type
  modules: lwrConfig.lwc.modules,
  lwc: {
    enableSlds: true,
  },
}

export default CONFIG
