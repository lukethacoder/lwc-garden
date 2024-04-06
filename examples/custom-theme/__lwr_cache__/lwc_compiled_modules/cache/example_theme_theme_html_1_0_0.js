import { freezeTemplate } from "lwc";

import _implicitStylesheets from "./theme.css";

import _implicitScopedStylesheets from "./theme.scoped.css?scoped=true";

import {parseFragment, registerTemplate} from "lwc";
const $fragment1 = parseFragment`<li${"s0"}${3}>${"t1"}</li>`;
const stc0 = {
  key: 0
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const {k: api_key, d: api_dynamic_text, sp: api_static_part, st: api_static_fragment, i: api_iterator, h: api_element} = $api;
  return [api_element("ul", stc0, api_iterator($cmp.colors, function (item) {
    return api_static_fragment($fragment1, api_key(2, item.label), [api_static_part(0, {
      style: item.style
    }, null), api_static_part(1, null, api_dynamic_text(item.label))]);
  }))];
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
tmpl.stylesheetToken = "lwc-6245srbv23h";
tmpl.legacyStylesheetToken = "example-theme_theme";
freezeTemplate(tmpl);
