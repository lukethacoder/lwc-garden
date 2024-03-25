import { LightningElement } from 'lwc'

import html_template from './omniscriptBlock.html'

/**
 * Used to override the OmniScriptBlock element
 */
export default class OmniscriptBlock extends LightningElement {
  render() {
    return html_template
  }
}
