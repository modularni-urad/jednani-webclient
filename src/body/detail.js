/* global axios, API, _ */
import { ROUTE_NAMES } from '../consts.js'
import DetailModal from '/modularni-urad-admin-components/entity/detail.js'
import ItemForm from '/modularni-urad-admin-components/entity/form.js'
import EditorUsneseni from '../usneseni/editor.js'
import EditorPriloh from '../prilohy/editor.js'
// import formconfig from './formconfig.js'

export default {
  data: () => {
    return {
      loading: true,
      item: null
    }
  },
  props: ['query', 'cfg'], 
  components: { DetailModal, ItemForm, EditorUsneseni, EditorPriloh },
  template: `
    <DetailModal :query="query" :cfg="cfg">      
      <template v-slot:form="{ config, onSubmit, item }">

      <div class="row">
        <div class="col-sm-12 col-md-6">  
          <ItemForm :config="config" :onSubmit="onSubmit" :item="item">
          </ItemForm>
        </div>

        <div class="col-sm-12 col-md-6" v-if="item">
          <h3>přílohy</h3>
          <EditorPriloh :query="query" :cfg="cfg" />

          <h3>usnesení</h3>
          <EditorUsneseni :query="query" :cfg="cfg" />
        </div>
        <div class="col-sm-12 col-md-6" v-else>
          Přílohy a usnesení lze vkládat až do uloženého bodu.
        </div>
      </div>

      </template>
    </DetailModal>
  `
}
