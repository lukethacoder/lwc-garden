import { formatObjectToString, writeStringToFile } from '../utils.js'

/// Function to convert object to string
function objectToString(obj) {
  let str = 'export const CONFIG = '
  str += formatObjectToString(obj)
  return str
}

/**
 * Save the users config to the lwc-garden config LWC
 */
export async function syncToLwc(configLwcPath, gardenConfig) {
  // ignore the webpack config
  const { webpack, ...config } = gardenConfig

  await writeStringToFile(configLwcPath, objectToString(config))
}
