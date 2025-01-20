import { GardenConfig } from '@lwc-garden/core/types'
import lwrConfig from './lwr.config.json' with { type: 'json' }

export default {
  // lwc.config.json modules type
  modules: [...lwrConfig.lwc.modules],
} satisfies GardenConfig
