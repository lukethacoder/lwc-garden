import OmniscriptBlock from 'omnistudio/omniscriptBlock'

import html_template from './customOmniCard.html'

/**
 * Used to override the OmniScriptBlock element
 */
export default class CustomOmniCard extends OmniscriptBlock {
  render() {
    return html_template
  }
}
