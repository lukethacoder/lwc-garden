import { freezeTemplate } from "lwc";

import _implicitStylesheets from "./container.css";

import _implicitScopedStylesheets from "./container.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
const stc0 = {
  classMap: {
    "container": true
  },
  key: 0
};
const stc1 = [];
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, s: api_slot, h: api_element} = $api;
  const {_m0} = $ctx;
  return [api_element("div", stc0, [api_slot("", {
    key: 1,
    on: {
      "slotchange": _m0 || ($ctx._m0 = api_bind($cmp.handleSlotChange))
    }
  }, stc1, $slotset)])];
  /*LWC compiler v6.5.0*/
}
export default registerTemplate(tmpl);
tmpl.slots = [""];
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
}
tmpl.stylesheetToken = "lwc-21vn5gt497p";
tmpl.legacyStylesheetToken = "garden-container_container";
freezeTemplate(tmpl);
