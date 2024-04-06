import { freezeTemplate } from "lwc";

import _implicitStylesheets from "./select.css";

import _implicitScopedStylesheets from "./select.scoped.css?scoped=true";

import {parseFragment, registerTemplate} from "lwc";
const $fragment1 = parseFragment`<label class="label${0}"${"a0:for"}${2}>${"t1"}</label>`;
const $fragment2 = parseFragment`<option${"a0:value"}${3}>${"t1"}</option>`;
const stc0 = {
  classMap: {
    "field": true
  },
  key: 0
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const {gid: api_scoped_id, d: api_dynamic_text, sp: api_static_part, st: api_static_fragment, b: api_bind, k: api_key, i: api_iterator, h: api_element} = $api;
  const {_m0} = $ctx;
  return [api_element("span", stc0, [api_static_fragment($fragment1, 2, [api_static_part(0, {
    attrs: {
      "for": api_scoped_id($cmp.name)
    }
  }, null), api_static_part(1, null, api_dynamic_text($cmp.label))]), api_element("select", {
    attrs: {
      "id": api_scoped_id($cmp.name)
    },
    key: 3,
    on: {
      "input": _m0 || ($ctx._m0 = api_bind($cmp.handleOnInput))
    }
  }, api_iterator($cmp.optionsToRender, function (item) {
    return api_static_fragment($fragment2, api_key(5, item.value), [api_static_part(0, {
      attrs: {
        "value": item.value
      }
    }, null), api_static_part(1, null, api_dynamic_text(item.label))]);
  }))])];
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
tmpl.stylesheetToken = "lwc-2pgaeh8ob97";
tmpl.legacyStylesheetToken = "garden-propInput_select";
freezeTemplate(tmpl);
