export default [
  // {
  //   name: 'idjendnani',
  //   // component: 'dyn-select',
  //   options: '/api/jednani/',
  //   attrmap: { value: 'id', text: 'datum' },
  //   label: 'jednání',
  //   fieldcomponent: true
  // },
  {
    name: 'nazev',
    component: 'dyn-input',
    label: 'název',
    rules: 'required',
    fieldcomponent: true
  },
  {
    name: 'predkl',
    component: 'user-select',
    label: 'předkládá',
    fieldcomponent: true
  },
  {
    name: 'zprac',
    component: 'user-select',
    label: 'zpracoval',
    fieldcomponent: true
  },
  {
    name: 'duvod',
    component: 'fullwidth-md-editor',
    label: 'důvodová zpráva',
    rules: 'required'
  }
]