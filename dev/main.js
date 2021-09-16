/* global Vue, VueMarkdown */
import './vuecustoms.js'
import Store from './store.js'
import {setupRoutes} from './index.js'
import DynComponents from './bootstrap-vue-dynamic-form/index.js'
import ListView from '/modularni-urad-admin-components/entity/list.js'
import ItemForm from '/modularni-urad-admin-components/entity/form.js'
import DetailModal from '/modularni-urad-admin-components/entity/detail.js'
import { initConfig } from '/modularni-urad-admin-components/entity/utils.js'
import {NameSpan} from '../src/_shared/user.js'
import FullWidthMDEditor from '../src/_shared/fullwidth-md-editor.js'
import { 
  WITHOUT_DIACRITICS_VALIDATOR_NAME, WITHOUT_DIACRITICS_VALIDATOR 
} from './bootstrap-vue-dynamic-form/components/file.js'

Vue.component('ACListView', ListView)
Vue.component('ACDynamicForm', ItemForm)
Vue.component('ACDetailModal', DetailModal)
Vue.component('NameSpan', NameSpan)

for (let i in DynComponents) {
  Vue.component(i, DynComponents[i])
}
Vue.component('user-select', DynComponents['dyn-input'])
Vue.component('markdown-editor', DynComponents['dyn-textarea'])
Vue.component('fullwidth-md-editor', FullWidthMDEditor)
Vue.use(VueMarkdown)
Vue.component('ValidationProvider', VeeValidate.ValidationProvider)
Vue.component('ValidationObserver', VeeValidate.ValidationObserver)
VeeValidate.extend('required', VeeValidateRules.required)
VeeValidate.extend(WITHOUT_DIACRITICS_VALIDATOR_NAME, WITHOUT_DIACRITICS_VALIDATOR)

async function doInit () {
  const cfg = { 
    url: '/api',
    listViewName: 'ukoly'
  }

  const router = new VueRouter({
    routes: await setupRoutes('/', cfg, initConfig)
  })
  const store = Store(router)

  new Vue({
    router,
    store,
    template: '<router-view :key="$route.fullPath"></router-view>'
  }).$mount('#app')
}

doInit()