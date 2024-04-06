/**
 * This module is called in the ABS module (app bootstrap module) to perform neccesary pre initialization steps for an LWR app.
 * Note: this module should be imported before other dependencies in the ABS
 */

const lwrGlobals = globalThis.LWR;
if (lwrGlobals.define || lwrGlobals.env) {
  // AMD only
  globalThis.LWR = Object.freeze({
    define: lwrGlobals.define,
    env: lwrGlobals.env
  });
} else {
  delete globalThis.LWR;
}
export function getClientBootstrapConfig() {
  return lwrGlobals;
}