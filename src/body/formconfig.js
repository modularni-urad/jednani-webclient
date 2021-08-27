export default [
  {
    name: 'idjendnani',
    // component: 'dyn-select',
    options: '/api/jednani/',
    attrmap: { value: 'id', text: 'datum' },
    label: 'jednání',
    fieldcomponent: true
  },
  {
    name: 'nazev',
    component: 'dyn-input',
    label: 'název',
    rules: 'required',
    fieldcomponent: true
  },
  {
    name: 'predkl',
    component: 'dyn-input',
    label: 'předkládá',
    fieldcomponent: true
  },
  {
    name: 'zprac',
    component: 'dyn-input',
    label: 'zpracoval',
    fieldcomponent: true
  },
  {
    name: 'duvod',
    component: 'dyn-textarea',
    label: 'důvodová zpráva',
    rules: 'required'
  }
]