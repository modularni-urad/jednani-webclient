/* global axios, API, _ */
import { ROUTE_NAMES } from '../consts.js'
import DetailModal from '/modularni-urad-admin-components/entity/detail.js'
import ItemForm from '/modularni-urad-admin-components/entity/form.js'
// import formconfig from './formconfig.js'

export default {
  data: () => {
    return {
      loading: true,
      item: null,
      prilohy: null,
      usneseni: null
    }
  },
  props: ['query', 'cfg'], 
  components: { DetailModal, ItemForm },
  template: `
    <DetailModal :query="query" :cfg="cfg">      
      <template v-slot:form="{ config, onSubmit, item }">

      <div class="row">
        <div class="col-sm-12 col-md-6">  
          <ItemForm :config="config" :onSubmit="onSubmit" :item="item">
          </ItemForm>
        </div>

        <div class="col-sm-12 col-md-6">
          Prilohy
          Usneseni
        </div>
      </div>

      </template>
    </DetailModal>
  `
}
