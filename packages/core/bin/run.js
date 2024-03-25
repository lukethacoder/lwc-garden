#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

// import chokidar from 'chokidar'

import { loadConfig, getWebpackConfig, writeStringToFile } from '../utils.js'
import { syncToLwc } from './config.js'
import { startWebpack } from './webpack.js'
import { setStyleToHtmlString } from './style.js'
import { __filename, __dirname, CONFIG_LWC_PATH } from '../constants.js'

import readFiles from './readFiles.js'

const GardenConfig = await loadConfig(`${process.cwd()}/garden.config.js`)
const webpackConfig = await getWebpackConfig(GardenConfig)

const isUsingDefaultWebpackConfig = !GardenConfig.webpack

// save garden.config.js to the `garden-config` LWC
await syncToLwc(
  path.join(__dirname, 'components', CONFIG_LWC_PATH),
  GardenConfig
)

// copy /config folder + set themes (if not using custom webpack config)
if (isUsingDefaultWebpackConfig) {
  // copy config/ folder as the user is not bringing their own
  const configSource = path.join(__dirname, './config')
  const destination = path.join(GardenConfig.cacheDir, './config')

  // set the Theme CSS Variables to the index.html before we copy it over
  const htmlString = await setStyleToHtmlString(
    path.join(configSource, 'index.html'),
    GardenConfig.theme
  )

  const jsSource = await fs.promises.readFile(
    path.join(configSource, 'index.js')
  )

  await writeStringToFile(path.join(destination, 'index.html'), htmlString)
  await writeStringToFile(path.join(destination, 'index.js'), jsSource)
}
// else -> ignore as the user is bringing their own config files

// app <garden-*> LWCs copied to the users `.garden/*` cache folder
async function copyComponents() {
  const componentsSource = path.join(__dirname, './components')
  const destinationComponents = path.join(GardenConfig.cacheDir, './components')

  await fs.promises.cp(componentsSource, destinationComponents, {
    recursive: true,
  })
}

await copyComponents()

// attempt to read LWC components before spooling up the webpack server
await readFiles(GardenConfig)

// start the webpack server
await startWebpack(webpackConfig)

/**
 *
 * @param {WatchOptions} options
 */
// function watchFolder(options) {
//   const { folderPath, callback } = options

//   // One-liner for current directory
//   chokidar
//     .watch(folderPath)
//     .on('change', (path) => {
//       callback({ type: 'change', path })
//     })
//     .on('rename', (path) => {
//       callback({ type: 'rename', path })
//     })
// }

// function myCallback({ type, path }) {
//   console.log(`Folder contents ${type}! - ${path}`)
//   // TODO: Do something when folder contents change
// }

// const foldersToWatch = lwcConfig.modules.reduce((acc, item) => {
//   if (item.dir) {
//     acc.push(item.dir)
//   } else if (item.path) {
//     acc.push(item.path)
//   }

//   return acc
// }, [])

// watchFolder({ folderPath: foldersToWatch, callback: myCallback })
