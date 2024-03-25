import { GardenModule } from '../types'

export const MODULES: GardenModule[] = [
  {
    "id": "test-allArgTypes",
    "href": "?module=test%2FallArgTypes",
    "label": "All Arg Types",
    "name": "test/allArgTypes",
    "argTypes": [
      {
        "name": "text",
        "type": "text"
      },
      {
        "name": "color",
        "type": "color"
      },
      {
        "name": "boolean",
        "type": "boolean"
      },
      {
        "name": "number",
        "type": "number",
        "min": -100,
        "max": 100,
        "step": 10
      },
      {
        "name": "range",
        "type": "range",
        "min": 5,
        "max": 15,
        "step": 0.5
      },
      {
        "name": "select",
        "type": "select",
        "options": [
          {
            "label": "0px",
            "value": "0px"
          },
          {
            "label": "4px",
            "value": "4px"
          },
          {
            "label": "12px",
            "value": "12px"
          },
          {
            "label": "full",
            "value": "999px"
          }
        ]
      },
      {
        "name": "radio",
        "type": "radio",
        "options": [
          {
            "label": "0px",
            "value": "0px"
          },
          {
            "label": "4px",
            "value": "4px"
          },
          {
            "label": "12px",
            "value": "12px"
          },
          {
            "label": "full",
            "value": "999px"
          }
        ]
      },
      {
        "name": "inlineRadio",
        "type": "inline-radio",
        "options": [
          {
            "label": "0px",
            "value": "0px"
          },
          {
            "label": "4px",
            "value": "4px"
          },
          {
            "label": "12px",
            "value": "12px"
          },
          {
            "label": "full",
            "value": "999px"
          }
        ]
      },
      {
        "name": "checkbox",
        "type": "checkbox",
        "options": [
          {
            "label": "0px",
            "value": "0px"
          },
          {
            "label": "4px",
            "value": "4px"
          },
          {
            "label": "12px",
            "value": "12px"
          },
          {
            "label": "full",
            "value": "999px"
          }
        ]
      },
      {
        "name": "inlineCheckbox",
        "type": "inline-checkbox",
        "options": [
          {
            "label": "0px",
            "value": "0px"
          },
          {
            "label": "4px",
            "value": "4px"
          },
          {
            "label": "12px",
            "value": "12px"
          },
          {
            "label": "full",
            "value": "999px"
          }
        ]
      }
    ],
    "slotComponents": {},
    "LWC": () => import('test/allArgTypes')
  },
  {
    "id": "test-button",
    "href": "?module=test%2Fbutton",
    "label": "Button Custom",
    "category": "Buttons",
    "name": "test/button",
    "argTypes": [
      {
        "name": "label",
        "type": "string"
      },
      {
        "name": "color",
        "type": "string"
      },
      {
        "name": "backgroundColor",
        "type": "string"
      },
      {
        "name": "borderRadius",
        "type": "string",
        "options": [
          {
            "label": "0px",
            "value": "0px"
          },
          {
            "label": "4px",
            "value": "4px"
          },
          {
            "label": "12px",
            "value": "12px"
          },
          {
            "label": "full",
            "value": "999px"
          }
        ]
      }
    ],
    "slotComponents": {},
    "LWC": () => import('test/button')
  },
  {
    "id": "test-clock",
    "href": "?module=test%2Fclock",
    "label": "clock",
    "name": "test/clock",
    "category": "test",
    "slotComponents": {},
    "LWC": () => import('test/clock')
  },
  {
    "id": "test-customButton",
    "href": "?module=test%2FcustomButton",
    "label": "customButton",
    "name": "test/customButton",
    "category": "test",
    "slotComponents": {},
    "LWC": () => import('test/customButton')
  },
  {
    "id": "test-customOmniCard",
    "href": "?module=test%2FcustomOmniCard",
    "label": "Custom Omni Card",
    "category": "Omni",
    "name": "test/customOmniCard",
    "argTypes": [
      {
        "name": "borderRadius",
        "type": "select",
        "options": [
          {
            "label": "0px",
            "value": "0px"
          },
          {
            "label": "4px",
            "value": "4px"
          },
          {
            "label": "12px",
            "value": "12px"
          },
          {
            "label": "full",
            "value": "999px"
          }
        ]
      },
      {
        "name": "borderRadius1",
        "type": "radio",
        "options": [
          {
            "label": "0px",
            "value": "0px"
          },
          {
            "label": "4px",
            "value": "4px"
          },
          {
            "label": "12px",
            "value": "12px"
          },
          {
            "label": "full",
            "value": "999px"
          }
        ]
      },
      {
        "name": "borderRadius2",
        "type": "inline-radio",
        "options": [
          {
            "label": "0px",
            "value": "0px"
          },
          {
            "label": "4px",
            "value": "4px"
          },
          {
            "label": "12px",
            "value": "12px"
          },
          {
            "label": "full",
            "value": "999px"
          }
        ]
      },
      {
        "name": "borderRadius3",
        "type": "checkbox",
        "options": [
          {
            "label": "0px",
            "value": "0px"
          },
          {
            "label": "4px",
            "value": "4px"
          },
          {
            "label": "12px",
            "value": "12px"
          },
          {
            "label": "full",
            "value": "999px"
          }
        ]
      },
      {
        "name": "borderRadius4",
        "type": "inline-checkbox",
        "options": [
          {
            "label": "0px",
            "value": "0px"
          },
          {
            "label": "4px",
            "value": "4px"
          },
          {
            "label": "12px",
            "value": "12px"
          },
          {
            "label": "full",
            "value": "999px"
          }
        ]
      }
    ],
    "slotComponents": {},
    "slots": [
      "default"
    ],
    "LWC": () => import('test/customOmniCard')
  },
  {
    "id": "test-moduleUsingAnother",
    "href": "?module=test%2FmoduleUsingAnother",
    "label": "moduleUsingAnother",
    "name": "test/moduleUsingAnother",
    "category": "test",
    "slotComponents": {},
    "LWC": () => import('test/moduleUsingAnother')
  },
  {
    "id": "test-multipleSlots",
    "href": "?module=test%2FmultipleSlots",
    "label": "multipleSlots",
    "name": "test/multipleSlots",
    "category": "test",
    "slotComponents": {
      "default": () => import('test/button'),
      "slot1": () => import('test/clock'),
      "slot2": () => import('test/button')
    },
    "slots": [
      "slot1",
      "default",
      "slot2"
    ],
    "LWC": () => import('test/multipleSlots')
  },
  {
    "id": "test-reallyLongTitleToTestSidebar",
    "href": "?module=test%2FreallyLongTitleToTestSidebar",
    "label": "Really Long Title To Test Sidebar",
    "category": "Really Long Title To Test Sidebar",
    "name": "test/reallyLongTitleToTestSidebar",
    "slotComponents": {},
    "LWC": () => import('test/reallyLongTitleToTestSidebar')
  },
  {
    "id": "test-theme",
    "href": "?module=test%2Ftheme",
    "label": "theme",
    "name": "test/theme",
    "category": "test",
    "slotComponents": {},
    "LWC": () => import('test/theme')
  },
  {
    "id": "bulk-component1",
    "href": "?module=bulk%2Fcomponent1",
    "label": "component1",
    "name": "bulk/component1",
    "category": "bulk",
    "slotComponents": {},
    "LWC": () => import('bulk/component1')
  }
]