import { GardenConfig } from '@lwc-garden/core/types'
import lwrConfig from './lwr.config.json' with { type: 'json' }

/**
 * @type {import('@lwc-garden/core/types').GardenConfig}
 */
const CONFIG: GardenConfig = {
  // lwc.config.json modules type
  modules: [...lwrConfig.lwc.modules],
}

export default CONFIG
