export default [
  {
    name: 'akce',
    component: 'dyn-select',
    options: [
      { value: 'navedomí', text: 'bere na vědomí' },
      { value: 'souhlasi', text: 'souhlasí' },
      { value: 'poveruje', text: 'pověřuje' },
      { value: 'doporucuje', text: 'doporučuje' }
    ],
    label: 'akce',
    rules: 'required'
  },
  {
    name: 'osoba',
    component: 'dyn-input',
    label: 'osoba'
  },
  {
    name: 'text',
    component: 'dyn-textarea',
    label: 'důvodová zpráva',
    rules: 'required'
  }
]