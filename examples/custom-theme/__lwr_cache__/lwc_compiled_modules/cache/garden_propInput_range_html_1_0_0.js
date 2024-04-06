import { freezeTemplate } from "lwc";

import _implicitStylesheets from "./range.css";

import _implicitScopedStylesheets from "./range.scoped.css?scoped=true";

import {parseFragment, registerTemplate} from "lwc";
const $fragment1 = parseFragment`<span class="field${0}"${2}><label${"a1:for"}${3}>${"t2"}</label><input type="range"${"a3:id"}${"a3:name"}${"a3:min"}${"a3:max"}${"a3:step"}${3}></span>`;
function tmpl($api, $cmp, $slotset, $ctx) {
  const {gid: api_scoped_id, d: api_dynamic_text, b: api_bind, sp: api_static_part, st: api_static_fragment} = $api;
  const {_m0} = $ctx;
  return [api_static_fragment($fragment1, 1, [api_static_part(1, {
    attrs: {
      "for": api_scoped_id($cmp.name)
    }
  }, null), api_static_part(2, null, api_dynamic_text($cmp.label)), api_static_part(3, {
    on: {
      "input": _m0 || ($ctx._m0 = api_bind($cmp.handleOnInput))
    },
    attrs: {
      "id": api_scoped_id($cmp.name),
      "name": $cmp.name,
      "min": $cmp.min,
      "max": $cmp.max,
      "step": $cmp.step
    }
  }, null)])];
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
tmpl.stylesheetToken = "lwc-lrn0fjjk57";
tmpl.legacyStylesheetToken = "garden-propInput_range";
freezeTemplate(tmpl);
