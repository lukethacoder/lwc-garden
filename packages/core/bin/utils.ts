import fs from 'fs'
import { pathToFileURL } from 'url'

export async function checkAndReadFile(filePath: string) {
  try {
    if (fs.existsSync(filePath)) {
      // assert JSON imports
      if (filePath.split('.').at(-1) === 'json') {
        return import(pathToFileURL(filePath).toString(), {
          with: { type: 'json' },
        })
      }

      return import(pathToFileURL(filePath).toString())
    } else {
      throw new Error(`File "${filePath}" does not exist.`)
    }
  } catch (error) {
    console.error((error as any).message)
    return null
  }
}
