export default [
  {
    name: 'organ',
    component: "dyn-select",
    options: [
      { value: 'zm', text: 'zastupitelstvo' },
      { value: 'rm', text: 'rada' }
    ],
    label: "organ",
    rules: "required",
    fieldcomponent: true
  },
  {
    name: "misto",
    component: "dyn-input",
    label: "misto",
    rules: "required",
    fieldcomponent: false
  },
  {
    name: "datum",
    component: "dyn-datetime",
    type: 'datetime',
    label: "Datum",
    fieldcomponent: 'datestring'
  }
]