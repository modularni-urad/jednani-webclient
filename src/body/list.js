import ListView from '/modularni-urad-admin-components/entity/list.js'
import DetailModal from './detail.js'
import Actions from './actions.js'
import { initConfig } from '/modularni-urad-admin-components/entity/utils.js'
import { ROUTE_NAMES } from '../consts.js'
import formconfig from './formconfig.js'

export async function InitCfg (cfg) {
  const mycfg = {
    url: `${cfg.url}/body`,
    api: cfg.url,
    conf: formconfig
  }
  await initConfig(mycfg)
  return mycfg
}

const rowClasses = {
  'zarazen': null,
  'prijat': 'table-success',
  'draft': 'table-warning',
  'neprijat': 'table-danger',
  'stazen': 'table-danger'
}

export const Component = {
  props: ['query', 'cfg'],
  methods: {
    rowClass: function (row) {
      return rowClasses[row.stav] || ''
    }
  },
  components: { ListView, DetailModal, Actions },
  template: `
  <ListView :query="query" :cfg="cfg">
    <template v-slot:default="{ items, fields }">
      <tr v-for="row,rowidx in items" :key="rowidx" :class="rowClass(row)">
        <td>{{ row.id }}</td>
        <td>{{ row.idjendnani }}</td>
        <td>{{ row.nazev }}</td>
        <td>{{ row.predkl }}</td>
        <td>{{ row.zprac }}</td>
        <Actions key="actions" :query="query" :row="row" :cfg="cfg" />
      </tr>
    </template>

    <template v-slot:detail="{ query, cfg }">
      <DetailModal :query="query" :cfg="cfg" />
    </template>

  </ListView>
  `
}
