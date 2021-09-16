import formconfig from './formconfig.js'

export default {
  data: () => {
    return {
      formconfig,
      loading: true,
      item: null,
      opened: false,
      items: null
    }
  },
  props: ['query', 'cfg'],
  filters: {
    first16: function (val) {
      return val.substring(0, 16)
    }
  },
  async created () {
    const api = this.$props.cfg.api
    const id = this.$props.query._detail
    const res = await axios.get(`${api}/usneseni/`, { params: { 
      filter: JSON.stringify({ idbod: id }) 
    } })
    this.$data.items = res.data
    this.$data.loading = false
  },
  methods: {
    add: function () {
      this.$data.item = null
      this.$data.opened = true
    },
    doEdit: function (row) {
      this.$data.item = row
      this.$data.opened = true
    },
    doDelete: function (row) {
    },
    onSubmit: async function (item) {
      try {
        const api = this.$props.cfg.api
        const id = this.$props.query._detail
        const res = await this.$store.dispatch('send', {
          method: 'post',
          url: `${api}/usneseni/${id}`,
          data: item
        })
        this.$store.dispatch('toast', { message: 'uloženo' })
        this.$data.items.push(item)
        this.$data.opened = false
      } catch (err) {
        const message = err.response.data
        this.$store.dispatch('toast', { message, type: 'error' })
      }
    }
  },
  template: `
  <div>
    <table class="table" v-if="!loading">
      <thead>
        <tr>
          <th scope="col">akce</th>
          <th scope="col">osoba</th>
          <th scope="col">text</th>
          <th scope="col">
            <b-button size="sm" variant="success" @click="add">
              <i class="fas fa-plus"></i> přidat
            </b-button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i,idx in items" :key="idx">
          <td>{{ i.akce }}</td>
          <td>{{ i.osoba }}</td>
          <td>
            <b v-b-tooltip.hover :title="i.text">{{ i.text | first16 }} ...</b>
          </td>
          <td>
            <b-button size="sm" variant="warning" @click="doEdit(i)">
              <i class="fas fa-edit"></i>
            </b-button>
            <b-button size="sm" variant="danger" @click="doDelete(i)">
              <i class="fas fa-trash-alt"></i>
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>

    <b-modal v-model="opened" size="lg" title="Upravit Usnesení" hide-footer>
      <ACDynamicForm :onSubmit="onSubmit" :item="item" :config="formconfig" />
    </b-modal>
  </div>
`}