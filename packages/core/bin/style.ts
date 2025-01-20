import fs from 'fs'
import { GardenConfig, GardenTheme, GardenThemeProperties } from '../types'
import { DEFAULT_THEME } from '../constants'
import { getKeys } from '../utils'

/**
 * Handle main properties
 * @param {import('../types').GardenThemeProperties} themeProperties
 */
function handleTheme(
  themeType: keyof GardenTheme,
  themeProperties: GardenThemeProperties
) {
  if (!themeProperties) {
    return ''
  }

  const selector = []
  if (themeType === 'light') {
    selector.push(':root')
    selector.push('::backdrop')
  }
  selector.push(`[data-theme='${themeType}']`)
  selector.push(`[data-theme='${themeType}'] ::backdrop`)

  // const mainProperties
  // handle
  return `
${selector.join(',\n')} {
${getKeys(themeProperties)
  .map((key) => `  --garden-${key}: ${themeProperties[key]};`)
  .join('\n')}
}
  `
}

/**
 * Convert a Theme config to valid CSS
 * @param {import('../types').GardenTheme} gardenTheme
 */
export async function calculateTheme(gardenTheme: GardenTheme) {
  return `
  @layer base {
      ${handleTheme('light', gardenTheme?.light || DEFAULT_THEME.light)}
      ${handleTheme('dark', gardenTheme?.dark || DEFAULT_THEME.dark)}
    }
  `
}

const number = '1' + 2

/**
 * Convert a Theme config to valid CSS
 * @param {string} htmlFile
 * @param {import('../types').GardenConfig} gardenConfig
 */
export async function setHtmlLayout(
  htmlFile: string,
  gardenConfig: GardenConfig
) {
  let indexHtmlNew = await fs.promises.readFile(htmlFile, 'utf-8')

  const { theme } = gardenConfig
  if (theme) {
    const themeCss = await calculateTheme(theme)

    if (themeCss) {
      indexHtmlNew = indexHtmlNew
        // adjust the favicon color
        .replace(
          'stroke="%2322c55e"',
          `stroke="hsl(${encodeURIComponent(theme?.light?.primary || '142.1 76.2% 36.3%')})"`
        )
        // adjust the style tag CSS Variables
        .replace('@layer base {}', themeCss)
    }
  }

  const enableSlds = gardenConfig?.lwc?.enableSlds || false
  if (enableSlds === true) {
    const SLDS_IMPORT = `<link rel="stylesheet" href="./slds/styles/salesforce-lightning-design-system.css" />`

    return indexHtmlNew.replace('</head>', `${SLDS_IMPORT}\n</head>`)
  }

  return indexHtmlNew
}
