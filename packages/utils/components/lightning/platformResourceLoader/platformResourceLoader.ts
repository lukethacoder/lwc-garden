import { LightningElement } from '@lwc/engine-core'

/**
 * Given a lighting element, check if it is using Shadow DOM or not
 * @param context
 */
const checkIsShadow = (context: LightningElement): boolean => {
  // TODO: this may change in future LWC/LWR releases? TS types don't seem to be up to date with the docs?
  // https://developer.salesforce.com/docs/platform/lwc/guide/create-mixed-shadow.html
  // @ts-ignore
  return context.template.synthetic !== true
}

export const loadStyle = async (
  context: LightningElement,
  file: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const isShadow = checkIsShadow(context)

    const contextToAddTo = context.template || document.head

    // Create a <style> tag
    const style = document.createElement('style')
    style.type = 'text/css'

    // Add the @import rule to the style tag
    style.appendChild(document.createTextNode(`@import url('${file}');`))

    // Listen for the style to be applied
    const checkStyleLoaded = () => {
      const toCheckEl = isShadow
        ? context.template?.querySelectorAll('style')
        : document.styleSheets

      if (toCheckEl) {
        try {
          for (let i = 0; i < toCheckEl.length; i++) {
            const sheet = toCheckEl[i]

            if (isShadow) {
              if (sheet === style) {
                resolve()
                return
              }
            } else {
              // non-shadow
              if (
                sheet.cssRules?.[0]?.cssText ===
                style.sheet?.cssRules?.[0]?.cssText
              ) {
                resolve()
                return
              }
            }
          }
        } catch (err) {
          // Browser security may throw if the stylesheet is not accessible yet
          setTimeout(checkStyleLoaded, 50)
        }
      }
    }

    contextToAddTo.appendChild(style)

    // Start checking if the CSS is loaded
    setTimeout(checkStyleLoaded, 0)
  })
}
export const loadScript = async (context: LightningElement, file: string) => {
  return new Promise((resolve, reject) => {
    const isShadow = checkIsShadow(context)

    // Append the script tag to the head or body
    const head = document.head || document.getElementsByTagName('head')[0]

    // based on the renderMode, adjust where the scripts are appended to
    const contextToAddTo = isShadow ? context.template : head || document.body

    const toCheckEl = isShadow
      ? context.template?.querySelectorAll('script') || []
      : document.scripts

    // Check if the script already exists in the document
    const existingScript = Array.from(toCheckEl).find(
      (script) => script.src === file
    )
    if (existingScript) {
      resolve('Script already loaded.')
      return
    }

    // Create a <script> tag
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = file
    script.async = true

    // Add event listeners for load and error
    script.onload = () => {
      resolve(`Script loaded: ${file}`)
    }
    script.onerror = () => {
      reject(new Error(`Failed to load script: ${file}`))
    }

    if (contextToAddTo) {
      contextToAddTo.appendChild(script)
    } else {
      reject(new Error(`Invalid context: ${file}`))
    }
  })
}
