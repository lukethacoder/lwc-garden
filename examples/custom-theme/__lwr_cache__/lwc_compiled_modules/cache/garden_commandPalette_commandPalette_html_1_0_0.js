import { freezeTemplate } from "lwc";

import _implicitStylesheets from "./commandPalette.css";

import _implicitScopedStylesheets from "./commandPalette.scoped.css?scoped=true";

import {parseFragment, registerTemplate} from "lwc";
const $fragment1 = parseFragment`<span${3}>/</span>`;
const $fragment2 = parseFragment`<span${3}>${"t1"}</span>`;
const stc0 = {
  ref: "dialogEl",
  key: 0
};
const stc1 = {
  key: 1
};
const stc2 = {
  "sr-only": true
};
const stc3 = {
  key: 4
};
const stc4 = {
  classMap: {
    "category": true
  },
  key: 7
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const {gid: api_scoped_id, t: api_text, h: api_element, b: api_bind, k: api_key, fid: api_scoped_frag_id, d: api_dynamic_text, fr: api_fragment, st: api_static_fragment, sp: api_static_part, i: api_iterator} = $api;
  const {_m0, _m1} = $ctx;
  return [api_element("dialog", stc0, [api_element("span", stc1, [api_element("label", {
    classMap: stc2,
    attrs: {
      "for": api_scoped_id("command-search")
    },
    key: 2
  }, [api_text("Search")]), api_element("input", {
    attrs: {
      "type": "search",
      "id": api_scoped_id("command-search")
    },
    ref: "inputEl",
    props: {
      "value": $cmp.filterValue
    },
    key: 3,
    on: {
      "input": _m0 || ($ctx._m0 = api_bind($cmp.handleOnInput))
    }
  })]), api_element("ul", stc3, api_iterator($cmp.filteredModules, function (item) {
    return api_element("li", {
      key: api_key(5, item.name)
    }, [api_element("a", {
      attrs: {
        "href": api_scoped_frag_id(item.href),
        "tabindex": "-1",
        "data-name": item.name,
        "title": item.name
      },
      key: 6,
      on: {
        "click": _m1 || ($ctx._m1 = api_bind($cmp.handleClickModule))
      }
    }, [api_element("span", stc4, [item.category ? api_fragment(8, [api_text(" " + api_dynamic_text(item.category) + " ")], 0) : api_fragment(8, [api_text(" Uncategorised ")], 0)]), api_static_fragment($fragment1, 10), api_static_fragment($fragment2, 12, [api_static_part(1, null, " " + api_dynamic_text(item.label))])])]);
  }))])];
  /*LWC compiler v6.5.0*/
}
export default registerTemplate(tmpl);
tmpl.stylesheets = [];
tmpl.hasRefs = true;


if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets);
}
if (_implicitScopedStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitScopedStylesheets);
}
tmpl.stylesheetToken = "lwc-22nu5rlk8p1";
tmpl.legacyStylesheetToken = "garden-commandPalette_commandPalette";
freezeTemplate(tmpl);
