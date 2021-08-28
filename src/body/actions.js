export default {
  data: () => {
    return {
      opened: false,
      selected: null,
      options: []
    }
  },
  props: ['query', 'cfg', 'row'],
  computed: {
    muzuZaradit: function () {
      return this.row.stav === 'draft' 
        && this.row.predkl === this.$store.getters.UID.toString()
    }
  },
  methods: {
    doEdit: function () {
      const query = Object.assign({}, this.query, { _detail: this.row.id })
      this.$router.replace({ query })
    },
    enqueue: function () {
      const api = this.$props.cfg.api
      const filter = { datum: { gt: new Date() } }
      axios.get(`${api}/jednani/`, { 
        params: { 
          filter: JSON.stringify(filter),
          sort: 'datum:desc'
        }
      }).then(res => {
        this.$data.options = res.data.map(i => {
          return { value: i.id, text: i.datum }
        })
        this.$data.selected = this.$data.options[0].value
        this.opened = true
      })      
    },
    save: async function () {
      try {
        const res = await this.$store.dispatch('send', {
          method: 'put',
          url: `${this.$props.cfg.url}/${this.row.id}/zaradit/${this.$data.selected}`
        })
        this.$store.dispatch('toast', { message: 'zařazeno' })
      } catch (err) {
        const message = err.response.data
        this.$store.dispatch('toast', { message, type: 'error' })
      }
    }
  },
  template: `
  <td>
    <b-button size="sm" v-if="row.stav === 'draft'" variant="primary" @click="doEdit">
      <i class="fas fa-edit"></i> upravit
    </b-button>
    <b-button size="sm" v-if="muzuZaradit" variant="success" @click="enqueue">
      <i class="fas fa-arrow-up"></i> zaradit na jednani
    </b-button>
    <b-modal v-model="opened" size="sm" title="Vyberte jednání">
      <b-form-select v-model="selected" :options="options"></b-form-select>
      <template #modal-footer="{ ok, cancel, hide }">
        <b-button size="sm" variant="success" @click="save">
          uložit
        </b-button>
      </template>
    </b-modal>
  </td>
  `
}
