import { freezeTemplate } from "lwc";

import _implicitStylesheets from "./clock.css";

import _implicitScopedStylesheets from "./clock.scoped.css?scoped=true";

import {registerTemplate} from "lwc";
function tmpl($api, $cmp, $slotset, $ctx) {
  const {d: api_dynamic_text, t: api_text} = $api;
  return [api_text(api_dynamic_text($cmp.timestamp))];
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
tmpl.stylesheetToken = "lwc-5spta4iep6u";
tmpl.legacyStylesheetToken = "example-clock_clock";
freezeTemplate(tmpl);
