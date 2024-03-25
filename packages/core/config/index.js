/**
 * '@lwc/synthetic-shadow' must be the first import here to enable
 * the synthetic shadow (to mimic on platform functionality)
 */
// sort-imports-ignore
import '@lwc/synthetic-shadow' // import 'lwc/synthetic-shadow'

import App from 'garden/app'

import { createElement } from 'lwc'

document
  .getElementById('main')
  .appendChild(createElement('garden-app', { is: App }))
