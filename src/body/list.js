import ListView from '/modularni-urad-admin-components/entity/list.js'
import { initConfig } from '/modularni-urad-admin-components/entity/utils.js'
import { ROUTE_NAMES } from '../consts.js'
import formconfig from './formconfig.js'

export async function InitCfg (cfg) {
  const mycfg = {
    url: `${cfg.url}/body`,
    conf: formconfig
  }
  await initConfig(mycfg)
  return mycfg
}

const rowClasses = {
  'low': null,
  'nor': 'table-success',
  'draft': 'table-warning',
  'cri': 'table-danger'
}

export const Component = {
  props: ['query', 'cfg'],
  methods: {
    rowClass: function (row) {
      return rowClasses[row.stav] || ''
    },
    doEdit: function (i) {
      this.$router.push({ name: ROUTE_NAMES.bodydetail, params: { id: i.id } })
    }
  },
  components: { ListView },
  template: `
  <ListView :query="query" :cfg="cfg">
    <template v-slot:default="{ items, fields }">
      <tr v-for="row,rowidx in items" :key="rowidx" :class="rowClass(row)">
        <td>{{ row.id }}</td>
        <td>{{ row.idjendnani }}</td>
        <td>{{ row.nazev }}</td>
        <td>{{ row.predkl }}</td>
        <td>{{ row.zprac }}</td>
        <td key="actions">
          <b-button size="sm" variant="primary" @click="doEdit(row)">
            <i class="fas fa-edit"></i> upravit
          </b-button>
          <b-button size="sm" variant="secondary" @click="showDetail(row)">
            <i class="fas fa-edit"></i> detail
          </b-button>
        </td>
      </tr>
    </template>
  </ListView>
  `
}
