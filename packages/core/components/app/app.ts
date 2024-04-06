import { LightningElement, track } from 'lwc'

import { MODULES } from 'garden/modules'
import { CONFIG } from 'garden/config'
import { timeout } from 'garden/utils'

import { Resizer } from './resizer'

export default class App extends LightningElement {
  /**
   * Array of all possible modules
   */
  MODULES = MODULES

  isFirstRender = true

  /**
   * LWC instance of the currently selected module
   */
  @track moduleLwc

  /**
   * Metadata of the currently selected module
   */
  @track moduleMetadata

  @track moduleLwcProps = {}

  handleClickModule = async (event) => {
    this.handleSetModuleByName(event.detail.name)
  }

  handlePropsChange = (event) => {
    const { key, value } = event.detail

    if (key) {
      const newProps = {
        ...this.moduleLwcProps,
        [key]: value,
      }
      this.moduleLwcProps = newProps

      if (CONFIG.args.cache === true) {
        localStorage.setItem(this.moduleMetadata.id, JSON.stringify(newProps))
      }
      // TODO: save to local storage (or session storage?)
    }
  }

  handlePropsClear = async () => {
    // somewhat 'hacky' way to reset both the LWC Component and the ArgValues
    const moduleMetadata = this.moduleMetadata

    // remove values from localStorage if args cache is enabled
    if (CONFIG.args.cache === true) {
      localStorage.removeItem(moduleMetadata.id)
    }

    this.moduleLwcProps = {}
    this.moduleLwc = undefined
    this.moduleMetadata = undefined

    await timeout(0)

    this.moduleMetadata = moduleMetadata
    this.moduleLwc = (await this.moduleMetadata.LWC()).default
  }

  handleSetModuleByName = async (moduleName) => {
    this.moduleLwcProps = {}

    const moduleMetadata = this.MODULES.find(
      (module) => module.name === moduleName
    )
    if (!moduleMetadata) {
      this.moduleLwc = undefined
      return
    }

    this.moduleLwc = (await moduleMetadata.LWC()).default
    this.moduleMetadata = moduleMetadata

    // attempt to load prop values from localStorage if args cache is enabled
    if (CONFIG.args.cache === true) {
      const propsFromCache = localStorage.getItem(moduleMetadata.id)

      if (propsFromCache) {
        try {
          this.moduleLwcProps = JSON.parse(propsFromCache)
        } catch (error) {
          // silently fail, no harm done if the values can't be pulled from the cache
        }
      }
    }
  }

  handleSearchClick() {
    this.refs.commandPaletteRef.showModal()
  }

  renderedCallback() {
    if (this.isFirstRender) {
      this.isFirstRender = false

      // check if url has ref to an existing module
      const params = new URLSearchParams(window.location.search)
      if (params.has('module')) {
        const moduleFromUrl = params.get('module')
        this.handleSetModuleByName(moduleFromUrl)
      }

      // initialise section resizers
      const resizeSliderEl = this.template.querySelector('.resize_slider_el')
      const resizeTargetEl = this.template.querySelector('.resize_target_el')
      if (resizeSliderEl && resizeTargetEl) {
        new Resizer(resizeSliderEl, resizeTargetEl)
      }

      const resizePropsSliderEl = this.template.querySelector(
        '.resize_props_slider_el'
      )
      const resizePropsTargetEl = this.template.querySelector(
        '.resize_props_target_el'
      )
      if (resizePropsSliderEl && resizePropsTargetEl) {
        new Resizer(resizePropsSliderEl, resizePropsTargetEl, 'vertical')
      }
    }
  }

  connectedCallback() {
    // handle browser back event
    window.addEventListener(
      'popstate',
      () => {
        const search = new URLSearchParams(window.location.search)
        const moduleName = search.get('module')
        if (moduleName) {
          if (moduleName !== this.moduleMetadata.name) {
            this.handleSetModuleByName(moduleName)
          }
        } else {
          this.moduleMetadata = undefined
          this.moduleLwc = undefined
        }
      },
      false
    )
  }
}
