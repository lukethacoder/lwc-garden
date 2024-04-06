import { freezeTemplate } from "lwc";

import _implicitStylesheets from "./app.css";

import _implicitScopedStylesheets from "./app.scoped.css?scoped=true";

import _gardenSidebar from "garden/sidebar";
import _gardenContainer from "garden/container";
import _gardenProps from "garden/props";
import _gardenCommandPalette from "garden/commandPalette";
import {parseFragment, registerTemplate} from "lwc";
const $fragment1 = parseFragment`<div class="resize_slider_el${0}"${2}></div>`;
const $fragment2 = parseFragment`<div class="resize_props_slider_el${0}"${2}></div>`;
const stc0 = {
  key: 0
};
const stc1 = {
  classMap: {
    "resize_target_el": true
  },
  key: 1
};
const stc2 = {
  key: 6
};
const stc3 = {
  classMap: {
    "props-container": true
  },
  key: 10
};
const stc4 = {
  "resize_props_target_el": true
};
function tmpl($api, $cmp, $slotset, $ctx) {
  const {b: api_bind, c: api_custom_element, fr: api_fragment, h: api_element, st: api_static_fragment, dc: api_dynamic_component} = $api;
  const {_m0, _m1, _m2, _m3, _m4} = $ctx;
  return [api_element("aside", stc0, [api_element("div", stc1, [$cmp.MODULES ? api_fragment(2, [api_custom_element("garden-sidebar", _gardenSidebar, {
    props: {
      "modules": $cmp.MODULES,
      "module": $cmp.moduleMetadata
    },
    key: 3,
    on: {
      "moduleselect": _m0 || ($ctx._m0 = api_bind($cmp.handleClickModule)),
      "gardensearchclick": _m1 || ($ctx._m1 = api_bind($cmp.handleSearchClick))
    }
  })], 0) : null]), api_static_fragment($fragment1, 5)]), api_element("main", stc2, [api_custom_element("garden-container", _gardenContainer, {
    props: {
      "module": $cmp.moduleMetadata
    },
    key: 7
  }, [$cmp.moduleLwc ? api_fragment(8, [api_dynamic_component($cmp.moduleLwc, {
    props: {
      ...$cmp.moduleLwcProps
    },
    key: 9
  })], 0) : null]), api_element("section", stc3, [api_static_fragment($fragment2, 12), api_custom_element("garden-props", _gardenProps, {
    classMap: stc4,
    props: {
      "module": $cmp.moduleMetadata,
      "propValues": $cmp.moduleLwcProps
    },
    key: 13,
    on: {
      "gardenpropschange": _m2 || ($ctx._m2 = api_bind($cmp.handlePropsChange)),
      "gardenpropsclear": _m3 || ($ctx._m3 = api_bind($cmp.handlePropsClear))
    }
  })])]), api_custom_element("garden-command-palette", _gardenCommandPalette, {
    ref: "commandPaletteRef",
    props: {
      "modules": $cmp.MODULES
    },
    key: 14,
    on: {
      "moduleselect": _m4 || ($ctx._m4 = api_bind($cmp.handleClickModule))
    }
  })];
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
tmpl.stylesheetToken = "lwc-7qiqllcp35h";
tmpl.legacyStylesheetToken = "garden-app_app";
freezeTemplate(tmpl);
