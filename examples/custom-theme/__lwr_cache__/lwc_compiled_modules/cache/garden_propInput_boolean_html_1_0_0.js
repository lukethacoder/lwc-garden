import { freezeTemplate } from "lwc";

import _implicitStylesheets from "./boolean.css";

import _implicitScopedStylesheets from "./boolean.scoped.css?scoped=true";

import {parseFragment, registerTemplate} from "lwc";
const $fragment1 = parseFragment`<label${"a0:for"}${3}>${"t1"}</label>`;
const stc0 = {
  classMap: {
    "field": true
  },
  key: 0
};
const stc1 = {
  key: 3
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const {gid: api_scoped_id, d: api_dynamic_text, sp: api_static_part, st: api_static_fragment, b: api_bind, h: api_element} = $api;
  const {_m0} = $ctx;
  return [api_element("span", stc0, [api_static_fragment($fragment1, 2, [api_static_part(0, {
    attrs: {
      "for": api_scoped_id($cmp.name)
    }
  }, null), api_static_part(1, null, api_dynamic_text($cmp.label))]), api_element("span", stc1, [api_element("input", {
    attrs: {
      "type": "checkbox",
      "id": api_scoped_id($cmp.name)
    },
    props: {
      "value": $cmp.value
    },
    key: 4,
    on: {
      "input": _m0 || ($ctx._m0 = api_bind($cmp.handleOnInput))
    }
  })])])];
  /*LWC compiler v6.5.0*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
}
tmpl.stylesheetToken = "lwc-47uo8d4gk2a";
tmpl.legacyStylesheetToken = "garden-propInput_boolean";
freezeTemplate(tmpl);
