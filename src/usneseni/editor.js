import ItemForm from '/modularni-urad-admin-components/entity/form.js'
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
  components: { ItemForm },
  template: `
  <div>
    <ol v-if="!loading">
      <li v-for="i,idx in items" :key="idx">
        {{ i.akce }} <i v-if="i.osoba">{{ i.osoba }}</i> {{ i.text }} <br />
        
        <b-button size="sm" variant="secondary" @click="doEdit(i)">
          <i class="fas fa-edit"></i> upravit
        </b-button>
        <b-button size="sm" variant="secondary" @click="doDelete(i)">
          <i class="fas trash-alt"></i> odstranit
        </b-button>
      </li>
    </ol>

    <b-button size="sm" variant="secondary" @click="add">
      <i class="fas fa-plus"></i> přidat
    </b-button>

    <b-modal v-model="opened" size="lg" title="Upravit Usnesení" hide-footer>
      <ItemForm :onSubmit="onSubmit" :item="item" :config="formconfig" />
    </b-modal>
  </div>
`}