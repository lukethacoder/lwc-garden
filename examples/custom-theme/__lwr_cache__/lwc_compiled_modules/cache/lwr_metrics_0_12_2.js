// Bootstrap / shim
export const BOOTSTRAP_PREFIX = 'lwr.bootstrap.';
export const BOOTSTRAP_END = `${BOOTSTRAP_PREFIX}end`;
export const BOOTSTRAP_ERROR = `${BOOTSTRAP_PREFIX}error`;
export const BOOTSTRAP_ERROR_COUNT = `${BOOTSTRAP_ERROR}.count`;
export const BOOTSTRAP_DURATION = `${BOOTSTRAP_PREFIX}duration`;

// Initialization
export const INIT = 'lwr.bootstrap.init';
export const INIT_DURATION = `${INIT}.duration`;
export const INIT_MODULE = `lwr.bootstrap.init.module`;
export const INIT_MODULE_DURATION = `${INIT_MODULE}.duration`;
export const INIT_MODULE_COUNT = `${INIT_MODULE}.count`;

// Loader: modules
export const LOADER_PREFIX = 'lwr.loader.';
export const MODULE_DEFINE = `${LOADER_PREFIX}module.define`;
export const MODULE_DEFINE_COUNT = `${MODULE_DEFINE}.count`;
export const MODULE_DYNAMIC_LOAD = `${LOADER_PREFIX}moduleRegistry.dynamicLoad`;
export const MODULE_DYNAMIC_LOAD_COUNT = `${MODULE_DYNAMIC_LOAD}.count`;
export const MODULE_FETCH = `${LOADER_PREFIX}module.fetch`;
export const MODULE_FETCH_COUNT = `${MODULE_FETCH}.count`;
export const MODULE_FETCH_DURATION = `${MODULE_FETCH}.duration`;
export const MODULE_ERROR = `${LOADER_PREFIX}module.error`;
export const MODULE_ERROR_COUNT = `${MODULE_ERROR}.count`;

// Loader: mappings
export const MAPPINGS_FETCH = `${LOADER_PREFIX}mappings.fetch`;
export const MAPPINGS_FETCH_COUNT = `${MAPPINGS_FETCH}.count`;
export const MAPPINGS_FETCH_DURATION = `${MAPPINGS_FETCH}.duration`;
export const MAPPINGS_ERROR = `${LOADER_PREFIX}mappings.error`;
export const MAPPINGS_ERROR_COUNT = `${MAPPINGS_ERROR}.count`;

// Router
export const ROUTER_PREFIX = 'lwr.router.';
export const ROUTER_NAV = `${ROUTER_PREFIX}navigate`;
export const ROUTER_NAV_COUNT = `${ROUTER_NAV}.count`;
export const ROUTER_NAV_DURATION = `${ROUTER_NAV}.duration`;
export const ROUTER_VIEW = `${ROUTER_PREFIX}view`;
export const ROUTER_VIEW_DURATION = `${ROUTER_VIEW}.duration`;
export const ROUTER_ERROR = `${ROUTER_PREFIX}error`;
export const ROUTER_ERROR_COUNT = `${ROUTER_ERROR}.count`;