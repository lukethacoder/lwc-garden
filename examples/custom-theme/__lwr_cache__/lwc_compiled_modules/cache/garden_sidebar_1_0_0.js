import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./sidebar.html";
class Sidebar extends LightningElement {
  constructor(...args) {
    super(...args);
    /**
     * Modules config
     * @type {Object[]}
     */
    this.modules = [];
    this.isFirstRender = true;
    /**
     * @type {'dark' | 'light'}
     */
    this.theme = 'dark';
    this._module = void 0;
    this.filteredModules = [];
    this.filterValue = void 0;
    this.handleSearchClick = () => {
      this.dispatchEvent(new CustomEvent('gardensearchclick'));
    };
    this.handleClickModule = event => {
      event.preventDefault();
      window.history.pushState('', '', event.target.href);
      this.dispatchEvent(new CustomEvent('moduleselect', {
        detail: {
          name: event.target.dataset.name
        }
      }));
    };
    this.handleToggleTheme = event => {
      if (document.body) {
        const currentTheme = document.body.dataset.theme;
        const newTheme = currentTheme && currentTheme === 'light' ? 'dark' : 'light';
        document.body.dataset.theme = newTheme;

        // save for future reference
        localStorage.setItem('theme', newTheme);
        this.theme = newTheme;
      }
    };
    this.handleToggleCategory = event => {};
  }
  /**
   * Currently active module
   * @type {Object[]}
   */
  get module() {
    return this._module;
  }
  set module(value) {
    this._module = value;

    // make sure to open the respective details element
    // if it isn't already open
    if (value) {
      const category = value.category || 'Uncategorised';
      const details = this.template.querySelector(`details[data-category='${category}']`);
      if (!details.open) {
        details.open = true;
      }
    }
  }
  get modulesToDisplay() {
    const modules = this.filterValue || this.filteredModules.length > 0 ? this.filteredModules : this.modules;
    if (this.filterValue) {
      return this.filteredModules;
    }
    return this.module ? modules.map(item => {
      if (item.name === this.module.name) {
        return {
          ...item,
          isActive: true
        };
      }
      return item;
    }) : modules;
  }
  get modulesByCategory() {
    const uncategorised = 'Uncategorised';
    const modulesByCategory = this.modulesToDisplay.reduce((acc, item) => {
      const category = item.category;
      if (category) {
        if (!Object.hasOwn(acc, category)) {
          acc[category] = {
            label: category,
            components: []
          };
        }
        acc[category].components.push(item);
      } else {
        if (!Object.hasOwn(acc, category)) {
          acc[uncategorised] = {
            label: 'Uncategorised',
            components: []
          };
        }
        acc[uncategorised].components.push(item);
      }
      return acc;
    }, {});
    const categories = Object.values(modulesByCategory);
    categories.sort((a, b) => {
      if (a.label === 'Uncategorised' || a.label < b.label) {
        return -1;
      } else if (b.label < a.label) {
        return 1;
      }
      return 0;
    });
    return categories;
  }
  renderedCallback() {
    if (this.isFirstRender) {
      this.isFirstRender = false;
      const themeFromStorage = localStorage.getItem('theme');
      if (themeFromStorage === 'light' || themeFromStorage === 'dark') {
        document.body.dataset.theme = themeFromStorage;
        this.theme = themeFromStorage;
      }
    }
  }
  /*LWC compiler v6.5.0*/
}
_registerDecorators(Sidebar, {
  publicProps: {
    modules: {
      config: 0
    },
    module: {
      config: 3
    }
  },
  fields: ["isFirstRender", "theme", "_module", "filteredModules", "filterValue", "handleSearchClick", "handleClickModule", "handleToggleTheme", "handleToggleCategory"]
});
export default _registerComponent(Sidebar, {
  tmpl: _tmpl,
  sel: "garden-sidebar",
  apiVersion: 61
});