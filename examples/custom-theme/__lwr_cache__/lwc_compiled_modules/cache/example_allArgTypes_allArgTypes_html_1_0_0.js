import { freezeTemplate } from "lwc";

import _implicitStylesheets from "./allArgTypes.css";

import _implicitScopedStylesheets from "./allArgTypes.scoped.css?scoped=true";

import {parseFragment, registerTemplate} from "lwc";
const $fragment1 = parseFragment`<pre${"s0"}${3}><code${3}>${"t2"}</code></pre>`;
function tmpl($api, $cmp, $slotset, $ctx) {
  const {d: api_dynamic_text, sp: api_static_part, st: api_static_fragment} = $api;
  return [api_static_fragment($fragment1, 1, [api_static_part(0, {
    style: $cmp.inlineStyle
  }, null), api_static_part(2, null, api_dynamic_text($cmp.displayProperties))])];
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
tmpl.stylesheetToken = "lwc-4liobljt7iu";
tmpl.legacyStylesheetToken = "example-allArgTypes_allArgTypes";
freezeTemplate(tmpl);
