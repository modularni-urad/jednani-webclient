import ItemForm from '/modularni-urad-admin-components/entity/form.js'
import formconfig from './formconfig.js'
import { saveAttachment } from './utils.js'

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
    const res = await this.$store.dispatch('send', {
      method: 'get',
      url: `${api}/prilohy/${id}`
    })
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
    doDelete: async function (row) {
      try {
        await this.$store.dispatch('send', {
          method: 'delete',
          url: `${this.$props.cfg.api}/prilohy/${row.id}`
        })
        this.$data.items.splice(this.$data.items.indexOf(row), 1)
        this.$store.dispatch('toast', { message: 'smazáno' })
      } catch (err) {
        const message = err.response.data
        this.$store.dispatch('toast', { message, type: 'error' })
      }
    },
    onSubmit: async function (item) {
      try {
        await saveAttachment(this, item)
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
    <table class="table" v-if="!loading">
      <thead>
        <tr>
          <th scope="col">název</th>
          <th scope="col">typ</th>
          <th scope="col">velikost</th>
          <th scope="col">
            <b-button size="sm" variant="secondary" @click="add">
              <i class="fas fa-plus"></i> přidat
            </b-button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i,idx in items" :key="idx">
          <td>{{ i.name }}</td>
          <td>{{ i.type }}</td>
          <td>{{ i.size }}</td>
          <td>
            <b-button size="sm" variant="secondary" @click="doEdit(i)">
              <i class="fas fa-edit"></i> upravit
            </b-button>
            <b-button size="sm" variant="secondary" @click="doDelete(i)">
              <i class="fas trash-alt"></i> odstranit
            </b-button>
          <td>
        </tr>
      </tbody>
    </table>

    <b-modal v-model="opened" size="lg" title="Upravit Přílohu" hide-footer>
      <ItemForm :onSubmit="onSubmit" :item="item" :config="formconfig" />
    </b-modal>
  </div>
`}