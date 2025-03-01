import { LightningElement } from 'lwc'
import { loadStyle, loadScript } from 'lightning/platformResourceLoader'

import MY_RESOURCE_URL from '@salesforce/resourceUrl/testResources'

export default class StaticResourceUsage extends LightningElement {
  isFirstRender = true

  async renderedCallback() {
    if (this.isFirstRender) {
      this.isFirstRender = false

      try {
        await Promise.all([
          loadScript(this, `${MY_RESOURCE_URL}/script.js`),
          loadStyle(this, `${MY_RESOURCE_URL}/style.css`),
        ])
        // successfully loaded - run logic here as required
      } catch (error) {
        console.error(
          `Error loading static resource from folder ${MY_RESOURCE_URL} `,
          error
        )
        // TODO: handle load error
      }
    }
  }
}
