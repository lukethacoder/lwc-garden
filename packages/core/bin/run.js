#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { createServer } from 'lwr'

import readFiles from './readFiles.js'
import { loadConfig, writeStringToFile } from '../utils.js'
import { syncToLwc } from './config.js'
import { setHtmlLayout } from './style.js'
import { __filename, __dirname, CONFIG_LWC_PATH } from '../constants.js'

/**
 * Load the users garden.config.js file
 * @type {import('../types').GardenConfig}
 */
const GardenConfig = await loadConfig(`${process.cwd()}/garden.config.js`)

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
    port: 3333,
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
