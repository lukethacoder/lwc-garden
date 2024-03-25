import { LightningElement, api, createElement } from 'lwc'
import { traverseActiveTreeRecursively } from 'garden/utils'

import HTML_TEMPLATE from './container.html'
import { GardenModule } from '../types'

export default class Container extends LightningElement {
  /**
   * Custom Container HTML template
   * Optional, allows for end users to override the base container component
   */
  @api htmlTemplate

  /**
   * Currently active module metadata
   * @type {GardenModule | undefined}
   */
  @api
  get module() {
    return this._module
  }
  set module(value) {
    this._module = value
  }

  _module: GardenModule | undefined
  _currentModuleName: string | undefined

  async handleSetSlots() {
    // only run if the components has slots
    if (this.module) {
      if (Object.hasOwn(this.module, 'slots')) {
        // TODO: should this happen on renderedCallback? convert module to a getter?
        const slotElements = Array.from(this.template.querySelectorAll('slot'))
        const child = slotElements[0]

        // find child slots
        const slots: HTMLSlotElement[] = []
        traverseActiveTreeRecursively(child, (payload: HTMLElement) => {
          if (payload.tagName === 'SLOT') {
            slots.push(payload as HTMLSlotElement)
          }
        })

        // get slotComponents from config
        const slotComponents = this.module.slotComponents
        const slotComponentKeys = slotComponents
          ? Object.keys(slotComponents)
          : undefined

        for (const slot of slots) {
          if (!slot?.parentElement?.classList.contains('container')) {
            const slotName = slot.name || 'default'
            if (
              slotComponents &&
              slotComponentKeys &&
              slotComponentKeys.includes(slotName)
            ) {
              // dynamically import the slot component to render
              const slotEl = await slotComponents[slotName]()
              const element = createElement('garden-placeholder', {
                is: slotEl.default,
              })
              slot.appendChild(element)
            } else {
              // TODO: import a garden/placeholder component instead
              const pEl = document.createElement('p')
              pEl.textContent = 'placeholder'
              slot.appendChild(pEl)
            }
          }
        }
      }
    }
  }

  handleSlotChange(event) {
    const slot = event.target
    const children = slot.assignedElements() || []

    if (children.length > 0) {
      const currentModule = children[0]

      if (this._currentModuleName !== currentModule.tagName) {
        this._currentModuleName = currentModule.tagName

        this.handleSetSlots()
      }
    }
    // TODO: fire off event for parent and/or plugins to listen for?
  }

  render() {
    if (this.htmlTemplate) {
      return this.htmlTemplate
    }

    return HTML_TEMPLATE
  }
}
