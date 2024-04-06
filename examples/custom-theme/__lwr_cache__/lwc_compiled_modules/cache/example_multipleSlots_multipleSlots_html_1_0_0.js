import { freezeTemplate } from "lwc";

import _implicitStylesheets from "./multipleSlots.css";

import _implicitScopedStylesheets from "./multipleSlots.scoped.css?scoped=true";

import {parseFragment, registerTemplate} from "lwc";
const $fragment1 = parseFragment`<span${3}>slot1</span>`;
const $fragment2 = parseFragment`<span${3}>default</span>`;
const $fragment3 = parseFragment`<span${3}>slot2</span>`;
const stc0 = {
  key: 0
};
const stc1 = {
  classMap: {
    "slot-container": true
  },
  key: 1
};
const stc2 = {
  attrs: {
    "name": "slot1"
  },
  key: 4
};
const stc3 = [];
const stc4 = {
  classMap: {
    "slot-container": true
  },
  key: 5
};
const stc5 = {
  key: 8
};
const stc6 = {
  classMap: {
    "slot-container": true
  },
  key: 9
};
const stc7 = {
  attrs: {
    "name": "slot2"
  },
  key: 12
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const {st: api_static_fragment, s: api_slot, h: api_element} = $api;
  return [api_element("div", stc0, [api_element("span", stc1, [api_static_fragment($fragment1, 3), api_slot("slot1", stc2, stc3, $slotset)]), api_element("span", stc4, [api_static_fragment($fragment2, 7), api_slot("", stc5, stc3, $slotset)]), api_element("span", stc6, [api_static_fragment($fragment3, 11), api_slot("slot2", stc7, stc3, $slotset)])])];
  /*LWC compiler v6.5.0*/
}
export default registerTemplate(tmpl);
tmpl.slots = ["", "slot1", "slot2"];
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
}
tmpl.stylesheetToken = "lwc-64fs28pldhc";
tmpl.legacyStylesheetToken = "example-multipleSlots_multipleSlots";
freezeTemplate(tmpl);
