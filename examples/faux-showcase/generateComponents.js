import fs from 'fs'
import path from 'path'

// TODO: make this auto generate a garden.config.js as well as meaningful components + config

// allows ripping from storybook pages
// Array.from(document.querySelectorAll('.sidebar-item')).map((item) => {
//   return {
//     label: item.textContent,
//     category: item.dataset.parentId,
//   }
// })

const COMPONENTS_CONFIG = [
  'accordion',
  'accordionSection',
  'alert',
  'avatar',
  'badge',
  'barcodeScanner',
  'breadcrumb',
  'breadcrumbs',
  'button',
  'buttonGroup',
  'buttonIcon',
  'buttonIconStateful',
  'buttonMenu',
  'buttonStateful',
  'card',
  'carousel',
  'carouselImage',
  'checkboxGroup',
  'clickToDial',
  'combobox',
  'confirm',
  'datatable',
  'dualListbox',
  'dynamicIcon',
  'fileUpload',
  'flow',
  'flowSupport',
  'formattedAddress',
  'formattedDateTime',
  'formattedEmail',
  'formattedLocation',
  'formattedName',
  'formattedNumber',
  'formattedPhone',
  'formattedRichText',
  'formattedText',
  'formattedTime',
  'formattedUrl',
  'helptext',
  'icon',
  'input',
  'inputAddress',
  'inputField',
  'inputLocation',
  'inputName',
  'inputRichText',
  'layout',
  'layoutItem',
  'logger',
  'map',
  'mediaUtils',
  'menuDivider',
  'menuItem',
  'menuSubheader',
  'messageService',
  'modal',
  'modalBody',
  'modalFooter',
  'modalHeader',
  'navigation',
  'outputField',
  'pill',
  'pillContainer',
  'platformResourceLoader',
  'platformShowToastEvent',
  'platformWorkspaceApi',
  'progressBar',
  'progressIndicator',
  'progressRing',
  'progressStep',
  'prompt',
  'quickActionPanel',
  'radioGroup',
  'recordEditForm',
  'recordForm',
  'recordPicker',
  'recordViewForm',
  'refresh',
  'relativeDateTime',
  'richTextToolbarButton',
  'richTextToolbarButtonGroup',
  'select',
  'slider',
  'spinner',
  'tab',
  'tabset',
  'textarea',
  'tile',
  'toast',
  'toastContainer',
  'tree',
  'treeGrid',
  'userConsentCookie',
  'verticalNavigation',
  'verticalNavigationItem',
  'verticalNavigationItemBadge',
  'verticalNavigationItemIcon',
]

// TODO: script that auto generates a heap of LWCs
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

function camelCaseToWords(s) {
  const result = s.replace(/([A-Z])/g, ' $1')
  return result.charAt(0).toUpperCase() + result.slice(1)
}

function generateJsString(componentName) {
  return `import { LightningElement } from 'lwc'

  export default class ${componentName} extends LightningElement {}`
}

function generateJsGardenConfigString(componentName) {
  return `
/**
 * @type {import('@lwc-garden/core/types').GardenConfig}
 */
export default {
  name: '${camelCaseToWords(componentName)}',
}
  `
}
function generateHtmlString() {
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
  const htmlString = generateHtmlString()
  const cssString = generateCssString()
  const jsGardenConfigString = generateJsGardenConfigString(componentName)

  // make component folder
  const componentFolder = path.join(COMPONENTS_FOLDER, componentName)

  await fs.promises.mkdir(componentFolder, { recursive: true })

  await Promise.all([
    fs.promises.writeFile(
      path.join(componentFolder, `${componentName}.js`),
      jsString
    ),
    fs.promises.writeFile(
      path.join(componentFolder, `garden.config.js`),
      jsGardenConfigString
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

for (const iterator of COMPONENTS_CONFIG) {
  generateComponent(iterator)
}

// for (const iterator of [...Array(10).keys()]) {
//   console.log('iterator ', iterator)
//   const componentName = `component${iterator}`
//   generateComponent(componentName)
// }
