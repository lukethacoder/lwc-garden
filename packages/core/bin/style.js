import fs from 'fs'

/**
 * Handle main properties
 * @param {import('../types').GardenThemeProperties} themeProperties
 */
function handleTheme(themeType, themeProperties) {
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
${Object.keys(themeProperties)
  .map((key) => `  --garden-${key}: ${themeProperties[key]};`)
  .join('\n')}
}
  `
}

/**
 * Convert a Theme config to valid CSS
 * @param {import('../types').GardenTheme} gardenTheme
 */
export async function calculateTheme(gardenTheme) {
  return `
  @layer base {
      ${handleTheme('light', gardenTheme.light)}
      ${handleTheme('dark', gardenTheme.dark)}
    }
  `
}

export async function setStyleToHtmlString(htmlFile, gardenTheme) {
  const themeCss = await calculateTheme(gardenTheme)
  const indexHtml = await fs.promises.readFile(htmlFile, 'utf-8')
  const indexHtmlNew = indexHtml.replace('@layer base {}', themeCss)

  return indexHtmlNew
}
