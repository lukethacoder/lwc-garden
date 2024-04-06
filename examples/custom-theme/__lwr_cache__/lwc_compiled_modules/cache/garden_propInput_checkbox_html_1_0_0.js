import { freezeTemplate } from "lwc";

import _implicitStylesheets from "./checkbox.css";

import _implicitScopedStylesheets from "./checkbox.scoped.css?scoped=true";

import {parseFragment, registerTemplate} from "lwc";
const $fragment1 = parseFragment`<legend class="label${0}"${2}>${"t1"}</legend>`;
const stc0 = {
  "field": true
};
const stc1 = {
  classMap: {
    "options": true
  },
  key: 3
};
const stc2 = {
  key: 5
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const {d: api_dynamic_text, sp: api_static_part, st: api_static_fragment, k: api_key, b: api_bind, h: api_element, t: api_text, i: api_iterator} = $api;
  const {_m0} = $ctx;
  return [api_element("div", {
    classMap: stc0,
    attrs: {
      "role": "fieldset",
      "data-type": $cmp.type
    },
    key: 0
  }, [api_static_fragment($fragment1, 2, [api_static_part(1, null, api_dynamic_text($cmp.label))]), api_element("span", stc1, api_iterator($cmp.optionsToRender, function (item) {
    return api_element("span", {
      key: api_key(4, item.value)
    }, [api_element("label", stc2, [api_element("input", {
      attrs: {
        "type": "checkbox",
        "name": $cmp.name
      },
      props: {
        "value": item.value,
        "checked": item.checked
      },
      key: 6,
      on: {
        "input": _m0 || ($ctx._m0 = api_bind($cmp.handleOnInput))
      }
    }), api_text(api_dynamic_text(item.label))])]);
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
tmpl.stylesheetToken = "lwc-6pm7kf51h11";
tmpl.legacyStylesheetToken = "garden-propInput_checkbox";
freezeTemplate(tmpl);
