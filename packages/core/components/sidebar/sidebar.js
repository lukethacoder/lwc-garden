import { LightningElement, api } from 'lwc'

export default class Sidebar extends LightningElement {
  /**
   * Modules config
   * @type {Object[]}
   */
  @api modules = []

  /**
   * Currently active module
   * @type {Object[]}
   */
  @api
  get module() {
    return this._module
  }
  set module(value) {
    this._module = value

    // make sure to open the respective details element
    // if it isn't already open
    if (value) {
      const category = value.category || 'Uncategorised'
      const details = this.template.querySelector(
        `details[data-category='${category}']`
      )
      if (!details.open) {
        details.open = true
      }
    }
  }

  isFirstRender = true
  /**
   * @type {'dark' | 'light'}
   */
  theme = 'dark'
  _module

  get modulesToDisplay() {
    const modules =
      this.filterValue || this.filteredModules.length > 0
        ? this.filteredModules
        : this.modules
    if (this.filterValue) {
      return this.filteredModules
    }
    return this.module
      ? modules.map((item) => {
          if (item.name === this.module.name) {
            return {
              ...item,
              isActive: true,
            }
          }
          return item
        })
      : modules
  }

  filteredModules = []
  filterValue

  get modulesByCategory() {
    const uncategorised = 'Uncategorised'

    const modulesByCategory = this.modulesToDisplay.reduce((acc, item) => {
      const category = item.category

      if (category) {
        if (!Object.hasOwn(acc, category)) {
          acc[category] = {
            label: category,
            components: [],
          }
        }
        acc[category].components.push(item)
      } else {
        if (!Object.hasOwn(acc, category)) {
          acc[uncategorised] = {
            label: 'Uncategorised',
            components: [],
          }
        }
        acc[uncategorised].components.push(item)
      }

      return acc
    }, {})

    const categories = Object.values(modulesByCategory)

    categories.sort((a, b) => {
      if (a.label === 'Uncategorised' || a.label < b.label) {
        return -1
      } else if (b.label < a.label) {
        return 1
      }

      return 0
    })

    return categories
  }

  handleSearchClick = () => {
    this.dispatchEvent(new CustomEvent('gardensearchclick'))
  }

  handleClickModule = (event) => {
    event.preventDefault()

    window.history.pushState('', '', event.target.href)

    this.dispatchEvent(
      new CustomEvent('moduleselect', {
        detail: {
          name: event.target.dataset.name,
        },
      })
    )
  }

  handleToggleTheme = (event) => {
    if (document.body) {
      const currentTheme = document.body.dataset.theme
      const newTheme =
        currentTheme && currentTheme === 'light' ? 'dark' : 'light'
      document.body.dataset.theme = newTheme

      // save for future reference
      localStorage.setItem('theme', newTheme)

      this.theme = newTheme
    }
  }
  handleToggleCategory = (event) => {}

  renderedCallback() {
    if (this.isFirstRender) {
      this.isFirstRender = false

      const themeFromStorage = localStorage.getItem('theme')
      if (themeFromStorage === 'light' || themeFromStorage === 'dark') {
        document.body.dataset.theme = themeFromStorage
        this.theme = themeFromStorage
      }
    }
  }
}
