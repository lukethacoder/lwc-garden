/**
 * https://lwc.dev/guide/wire_adapter#wire-adapters
 */
class CurrentPageReference {
  connected = false

  constructor(dataCallback) {
    this.dataCallback = dataCallback
  }

  connect() {
    this.connected = true
    this.runMethod()
  }

  disconnect() {
    this.connected = false
  }

  update(config) {
    // if any of the wire values have changed
    // this.runMethod()
  }

  runMethod() {
    const { connected } = this
    if (connected) {
      const state = {}
      new URLSearchParams(window.location.search).forEach(
        (val, key) => (state[key] = val)
      )
      this.dataCallback({ state: state })
    }
  }
}

const CACHE = new WeakMap()
function getNavigationHelm(id) {
  const metadata = CACHE.get(id)
  if (!metadata || !metadata.value) {
    throw new Error('Missing context')
  }
  return metadata.value
}

function registerNavigationHelm(contextId, contextValue) {
  const metadata = {
    id: contextId,
    value: contextValue,
    update: (newValue) => {
      metadata.value = newValue
    },
  }
  CACHE.set(metadata.id, metadata)
  return metadata
}

function navigate(context, pageReference, replace) {}

function generateUrl(context, pageReference) {
  // const api = getNavigationHelm(context)
  // return api.generateUrl(pageReference)

  // allows generateUrl to return undefined as needed when mocking
  // either pass a falsey name key, or 'Invalid_Page__c'
  const {
    attributes: { name },
  } = pageReference

  if (!name || name === 'Invalid_Page__c') {
    return undefined
  }
  return '/'
}

const isSSR = typeof window === 'undefined'
const Navigate = Symbol('Navigate')
const GenerateUrl = Symbol('GenerateUrl')
const NavContext = Symbol('NavContext')
const GetContext = Symbol('NavContext')

const CONTEXT_ID_BACKDOOR = `universalcontainergetnavigationcontext${Date.now()}`

function NavigationMixin(Base) {
  class Mixin extends Base {
    [GetContext]() {
      if (!this[NavContext]) {
        this.dispatchEvent(
          new CustomEvent(CONTEXT_ID_BACKDOOR, {
            bubbles: true,
            composed: true,
            detail: {
              callback: (contextId) => {
                this[NavContext] = contextId
              },
            },
          })
        )
        this[NavContext] = CONTEXT_ID_BACKDOOR
        if (!this[NavContext]) {
          throw new Error('Missing context')
        }
      }
    }
    [Navigate](pageRef, replace) {
      if (!isSSR) {
        this[GetContext]()
        navigate(this[NavContext], pageRef, replace)
        this.dispatchEvent(
          new CustomEvent('lightningnavigate', {
            detail: {
              pageRef,
              replace,
            },
          })
        )
      }
    }
    async [GenerateUrl](pageRef) {
      if (!isSSR) {
        this[GetContext]()
        return generateUrl(this[NavContext], pageRef)
      } else {
        return null
      }
    }
  }
  return Mixin
}
NavigationMixin.Navigate = Navigate
NavigationMixin.GenerateUrl = GenerateUrl
NavigationMixin.NavContext = NavContext

export { NavigationMixin, generateUrl, navigate, CurrentPageReference }
