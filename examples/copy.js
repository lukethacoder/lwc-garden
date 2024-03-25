/**
 * Assist with copying shared components to each example folder.
 *
 * You would not usually need to do this as your components would
 * live within your SFDX project.
 */

import fs from 'fs'
import path from 'path'

const SHARED_COMPONENTS_FOLDER = 'shared-components'

export async function copyToAllExamples(sourceFolder) {
  const currentDir = process.cwd()

  // Get a list of all directories in the current working directory
  const directories = await fs.promises
    .readdir(currentDir, { withFileTypes: true })
    .then((entries) => entries.filter((entry) => entry.isDirectory()))
    .then((dirents) => dirents.map((dirent) => dirent.name))
    .then((dirs) => dirs.filter((item) => item !== sourceFolder))

  // Loop through each directory
  for (const directory of directories) {
    const targetDir = path.join(currentDir, directory)

    // Ensure the target directory is not the same as the source directory
    if (targetDir !== sourceFolder) {
      await fs.promises.cp(
        sourceFolder,
        path.join(targetDir, SHARED_COMPONENTS_FOLDER),
        {
          recursive: true,
        }
      )
    }
  }
}

await copyToAllExamples(SHARED_COMPONENTS_FOLDER)
