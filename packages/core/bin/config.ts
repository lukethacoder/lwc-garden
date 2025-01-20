import { GardenConfig } from '../types.js'
import { formatObjectToString, writeStringToFile } from '../utils.js'

/// Function to convert object to string
function objectToString(obj: object) {
  let str = 'export const CONFIG = '
  str += formatObjectToString(obj)
  return str
}

/**
 * Save the users config to the lwc-garden config LWC
 */
export async function syncToLwc(
  configLwcPath: string,
  gardenConfig: GardenConfig
) {
  await writeStringToFile(configLwcPath, objectToString(gardenConfig))
}
