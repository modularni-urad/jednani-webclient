import DetailModal from './detail.js'
import Actions from './actions.js'
import { ROUTE_NAMES } from '../consts.js'
import formconfig from './formconfig.js'

export async function InitCfg (cfg, initConfig) {
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
  components: { Actions, DetailModal },
  template: `
  <ACListView :query="query" :cfg="cfg">
    <template v-slot:default="{ items, fields }">
      <tr v-for="row,rowidx in items" :key="rowidx" :class="rowClass(row)">
        <td>{{ row.id }}</td>
        
        <td>{{ row.nazev }}</td>
        <td><NameSpan :uid="row.predkl" :cfg="cfg" /></td>
        <td><NameSpan :uid="row.zprac" :cfg="cfg" /></td>
        <Actions key="actions" :query="query" :row="row" :cfg="cfg" />
      </tr>
    </template>

    <template v-slot:detail="{ query, cfg }">
      <DetailModal :query="query" :cfg="cfg" />
    </template>

  </ACListView>
  `
}
// <td>{{ row.idjednani }}</td>