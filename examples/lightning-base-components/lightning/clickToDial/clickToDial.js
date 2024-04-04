import { LightningElement, api } from 'lwc'

import * as utilsPrivate from 'lightning/utilsPrivate'
import * as clickToDialService from './clickToDialService'

export default class ClickToDial extends LightningElement {
  @api value
  @api recordId
  @api params

  state = {
    enabled: clickToDialService.isEnabled(),
  }
  stateChangeListener

  /**
   * When the component is actually connected, initialize the event
   * handling hooks.
   */
  connectedCallback() {
    // defining it here with arrow function to preserve
    // `this` context
    this.stateChangeListener = () => {
      this.state.enabled = clickToDialService.isEnabled()
    }
    clickToDialService.addStateChangeListener(this.stateChangeListener)
  }

  /**
   * When the component is destroyed, de-register the event handler.
   */
  disconnectedCallback() {
    clickToDialService.removeStateChangeListener(this.stateChangeListener)
  }

  renderedCallback() {
    const iconPath = this.iconPath
    if (iconPath !== this.prevIconPath) {
      this.prevIconPath = iconPath
    }
  }

  get formattedPhoneNumber() {
    return utilsPrivate.toNorthAmericanPhoneNumber(this.value)
  }

  get enabled() {
    return this.state.enabled
  }

  get i18n() {
    return {
      clickToDial: 'click to dial',
      clickToDialDisabled: 'click to dial disabled',
    }
  }

  /**
   * Dials the phone number by passing the parameters and recordId
   * to the phone system if they are provided.
   * Only an enabled phone number can be clicked.
   */
  click() {
    if (this.enabled) {
      this.handleClick()
    }
  }
  handleClick() {
    clickToDialService.dial({
      number: this.value,
      recordId: this.recordId,
      params: this.params,
      pageInfo: {
        hashFragment: window.location.hash,
      },
    })
  }
}
