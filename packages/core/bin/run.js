#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { createServer } from 'lwr'
import { logger } from '@lwrjs/diagnostics'

import readFiles from './readFiles.js'
import { loadConfig, loadLwrConfig, writeStringToFile } from '../utils.js'
import { syncToLwc } from './config.js'
import { setHtmlLayout } from './style.js'
import { __filename, __dirname, __root, CONFIG_LWC_PATH } from '../constants.js'

/**
 * Load the users garden.config.js file
 * @type {import('../types').GardenConfig}
 */
const GardenConfig = await loadConfig(`${process.cwd()}/garden.config.js`)

/**
 * Load the users garden.config.js file
 * @type {import('@lwrjs/types').LwrGlobalConfig}
 */
const LwrUserConfig = await loadLwrConfig(`${process.cwd()}/lwr.config.json`)

// save garden.config.js to the `garden-config` LWC
await syncToLwc(
  path.join(__dirname, 'components', CONFIG_LWC_PATH),
  GardenConfig
)

/**
 * @param {import('@lwrjs/types').LwrGlobalConfig} config
 * @returns {Promise<LwrApp | undefined>}
 */
async function createApp(config) {
  return await createServer(config)
}

// app <garden-*> LWCs copied to the users `.garden/*` cache folder
async function copyComponents() {
  const componentsSource = path.join(__dirname, './components')
  const destinationComponents = path.join(GardenConfig.cacheDir, './components')

  await fs.promises.cp(componentsSource, destinationComponents, {
    recursive: true,
  })
}

// app <garden-*> LWCs copied to the users `.garden/*` cache folder
async function copyLayouts() {
  const componentsSource = path.join(__dirname, './layouts')
  const destinationComponents = path.join(GardenConfig.cacheDir, './layouts')

  await fs.promises.cp(componentsSource, destinationComponents, {
    recursive: true,
  })
}

async function setLayoutTheme() {
  // check if files exists
  const layoutMain = path.join(GardenConfig.cacheDir, './layouts', 'index.html')
  if (layoutMain) {
    const newHtmlString = await setHtmlLayout(layoutMain, GardenConfig)

    await writeStringToFile(layoutMain, newHtmlString)
  }
}

async function copySlds() {
  // copy from users node_modules, not LWC Gardens
  const componentsSource = path.join(
    __root,
    './node_modules/@salesforce-ux/design-system/assets'
  )

  const destinationComponents = path.join(GardenConfig.cacheDir, './slds')

  // validate @salesforce-ux/design-system has been installed by the user
  if (!fs.existsSync(componentsSource)) {
    logger.warn(
      `Missing dependency "@salesforce-ux/design-system" is required when enableSlds is true.`
    )

    return
  }

  await fs.promises.cp(componentsSource, destinationComponents, {
    recursive: true,
  })

  const userSldsDirConfig = LwrUserConfig?.assets?.find(
    (item) => item.urlPath === '/slds' && item.dir === './.garden/slds'
  )
  if (!userSldsDirConfig) {
    // validate users lwr.config.json has been correctly configured to support SLDS
    logger.warn(
      `Please properly configure assets in your lwr.config.json. SLDS will not work without this.\n   ${JSON.stringify(
        {
          assets: [
            {
              dir: './.garden/slds',
              urlPath: '/slds',
            },
          ],
        },
        undefined,
        2
      )}`
    )
  }
}

if (GardenConfig?.lwc?.enableSlds === true) {
  await copySlds()
}

// copy layouts and set the theme
await copyLayouts()
await setLayoutTheme()

// copy LWC Garden Source LWCs
await copyComponents()

// attempt to read LWC components before spooling up the local dev server
await readFiles(GardenConfig)

try {
  const lwrApp = await createApp({
    serverType: 'koa',
    serverMode: 'dev',
    port: GardenConfig.port,
  })
  lwrApp.listen((lwrAppResponse) => {
    const { port } = lwrAppResponse
    console.log(
      `\n🍃 LWC Garden running at ${chalk.green(`http://localhost:${port}`)}\n`
    )
  })
} catch (err) {
  logger.error(err)
  process.exit(1)
}
