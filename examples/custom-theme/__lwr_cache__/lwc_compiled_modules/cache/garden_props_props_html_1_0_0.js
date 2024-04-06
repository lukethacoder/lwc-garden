import { freezeTemplate } from "lwc";

import _implicitStylesheets from "./props.css";

import _implicitScopedStylesheets from "./props.scoped.css?scoped=true";

import _gardenPropInput from "garden/propInput";
import {parseFragment, registerTemplate} from "lwc";
const $fragment1 = parseFragment`<li class="header${0}"${2}><span${3}>Name</span><span${3}>Value<button aria-label="Clear values" title="Clear values"${3}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${3}><path stroke="none" d="M0 0h24v24H0z" fill="none"${3}/><path d="M9 14l-4 -4l4 -4"${3}/><path d="M5 10h11a4 4 0 1 1 0 8h-1"${3}/></svg></button></span></li>`;
const $fragment2 = parseFragment`<li${3}>No props configured</li>`;
const stc0 = {
  key: 0
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, sp: api_static_part, st: api_static_fragment, k: api_key, c: api_custom_element, h: api_element, i: api_iterator, f: api_flatten, fr: api_fragment} = $api;
  const {_m0} = $ctx;
  return [api_element("ul", stc0, [$cmp.props ? api_fragment(1, api_flatten([api_static_fragment($fragment1, 3, [api_static_part(5, {
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.handleClearValues))
    }
  }, null)]), api_iterator($cmp.props, function (item) {
    return api_element("li", {
      key: api_key(4, item.name)
    }, [api_custom_element("garden-prop-input", _gardenPropInput, {
      props: {
        "label": item.name,
        "type": item.type,
        "value": item.value,
        "name": item.name,
        "min": item.min,
        "max": item.max,
        "step": item.step,
        "options": item.options
      },
      key: 5
    })]);
  })]), 0) : api_fragment(1, [api_static_fragment($fragment2, 7)], 0)])];
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
tmpl.stylesheetToken = "lwc-1fkao7elr2s";
tmpl.legacyStylesheetToken = "garden-props_props";
freezeTemplate(tmpl);
