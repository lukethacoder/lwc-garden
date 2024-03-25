import fs from 'fs'
import path from 'path'

// Auto generate a heap of LWCs
// these should be ignored from source control

const COMPONENTS_FOLDER = './components'

function generateRandomHexColor() {
  // Define allowed characters for hex color
  const hexChars = '0123456789ABCDEF'

  let color = '#'
  // Loop 6 times to generate 6 digits
  for (let i = 0; i < 6; i++) {
    // Get random index from hexChars
    const randomIndex = Math.floor(Math.random() * hexChars.length)
    // Append random character to color string
    color += hexChars[randomIndex]
  }

  return color
}

function generateJsString(componentName) {
  return `import { LightningElement } from 'lwc'

  export default class ${componentName} extends LightningElement {}`
}
function generateHtmlString(componentName) {
  return `<template>
  <p>hello world</p>
</template>`
}
function generateCssString() {
  return `p {
  color: ${generateRandomHexColor()};    
}
  `
}

async function generateComponent(componentName) {
  const jsString = generateJsString(componentName)
  const htmlString = generateHtmlString(componentName)
  const cssString = generateCssString()

  // make component folder
  const componentFolder = path.join(COMPONENTS_FOLDER, componentName)
  fs.promises.mkdir(componentFolder, { recursive: true })

  await Promise.all([
    fs.promises.writeFile(
      path.join(componentFolder, `${componentName}.js`),
      jsString
    ),
    fs.promises.writeFile(
      path.join(componentFolder, `${componentName}.html`),
      htmlString
    ),
    fs.promises.writeFile(
      path.join(componentFolder, `${componentName}.css`),
      cssString
    ),
  ])
}

for (const iterator of [...Array(200).keys()]) {
  generateComponent(`component${iterator}`)
}
