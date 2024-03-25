#!/usr/bin/env node

import fs from 'fs'
import { pathToFileURL } from 'url'

export async function checkAndReadFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      // assert JSON imports
      if (filePath.split('.').at(-1) === 'json') {
        return import(pathToFileURL(filePath), {
          assert: { type: 'json' },
        })
      }

      return import(pathToFileURL(filePath))
    } else {
      throw new Error(`File "${filePath}" does not exist.`)
    }
  } catch (error) {
    console.error(error.message)
    return null
  }
}
