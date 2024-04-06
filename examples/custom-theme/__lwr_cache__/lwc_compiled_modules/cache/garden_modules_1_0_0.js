export const MODULES = [{
  id: "example-allArgTypes",
  href: "?module=example%2FallArgTypes",
  label: "All Arg Types",
  category: "example",
  name: "example/allArgTypes",
  argTypes: [{
    name: "text",
    type: "text"
  }, {
    name: "color",
    type: "color"
  }, {
    name: "boolean",
    type: "boolean"
  }, {
    name: "number",
    type: "number",
    min: -100,
    max: 100,
    step: 10
  }, {
    name: "range",
    type: "range",
    min: 5,
    max: 15,
    step: 0.5
  }, {
    name: "select",
    type: "select",
    options: [{
      label: "0px",
      value: "0px"
    }, {
      label: "4px",
      value: "4px"
    }, {
      label: "12px",
      value: "12px"
    }, {
      label: "full",
      value: "999px"
    }]
  }, {
    name: "radio",
    type: "radio",
    options: [{
      label: "0px",
      value: "0px"
    }, {
      label: "4px",
      value: "4px"
    }, {
      label: "12px",
      value: "12px"
    }, {
      label: "full",
      value: "999px"
    }]
  }, {
    name: "inlineRadio",
    type: "inline-radio",
    options: [{
      label: "0px",
      value: "0px"
    }, {
      label: "4px",
      value: "4px"
    }, {
      label: "12px",
      value: "12px"
    }, {
      label: "full",
      value: "999px"
    }]
  }, {
    name: "checkbox",
    type: "checkbox",
    options: [{
      label: "0px",
      value: "0px"
    }, {
      label: "4px",
      value: "4px"
    }, {
      label: "12px",
      value: "12px"
    }, {
      label: "full",
      value: "999px"
    }]
  }, {
    name: "inlineCheckbox",
    type: "inline-checkbox",
    options: [{
      label: "0px",
      value: "0px"
    }, {
      label: "4px",
      value: "4px"
    }, {
      label: "12px",
      value: "12px"
    }, {
      label: "full",
      value: "999px"
    }]
  }],
  slotComponents: {},
  LWC: () => import('example/allArgTypes')
}, {
  id: "example-button",
  href: "?module=example%2Fbutton",
  label: "button",
  name: "example/button",
  category: "example",
  slotComponents: {},
  LWC: () => import('example/button')
}, {
  id: "example-clock",
  href: "?module=example%2Fclock",
  label: "clock",
  name: "example/clock",
  category: "example",
  slotComponents: {},
  LWC: () => import('example/clock')
}, {
  id: "example-multipleSlots",
  href: "?module=example%2FmultipleSlots",
  label: "multipleSlots",
  name: "example/multipleSlots",
  category: "example",
  slotComponents: {
    default: () => import('garden/placeholder')
  },
  slots: ["slot1", "default", "slot2"],
  LWC: () => import('example/multipleSlots')
}, {
  id: "example-theme",
  href: "?module=example%2Ftheme",
  label: "theme",
  name: "example/theme",
  category: "example",
  slotComponents: {},
  LWC: () => import('example/theme')
}];