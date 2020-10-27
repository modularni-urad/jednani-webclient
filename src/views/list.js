/* global axios, API, _ */
import template from './list.html.js'

export default {
  data: () => {
    return {
      fields: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'nazev', label: 'Název', sortable: true },
        { key: 'predkl', label: 'Předkládá' },
        { key: 'zprac', label: 'Zpracoval' },
        { key: 'stav', label: 'Stav' },
        { key: 'idjendnani', label: 'Zařazeno na' },
        { key: 'actions', label: '' }
      ],
      items: [],
      isBusy: false,
      currentPage: 1,
      totalRows: 0,
      perPage: 10,
      curr: null,
      currDetail: null,
      item: {}
    }
  },
  filters: {
    priority: (value) => PRIORITY_LABELS[value],
    state: (value) => STATE_LABELS[value]
  },
  methods: {
    myProvider (ctx) {
      const params = {
        currentPage: this.currentPage,
        perPage: this.perPage,
        sort: ctx.sortBy ? `${ctx.sortBy}:${ctx.sortDesc ? 'desc' : 'asc'}` : 'id:asc'
      }
      let data = null
      const promise = axios.get(`${API}/jednani/body`, { params })
      return promise.then(res => {
        this.totalRows = res.data.pagination.total
          ? res.data.pagination.total : this.totalRows
        data = res.data.data
        const uids = _.uniq(
          _.union(_.map(data, i => i.solver), _.map(data, i => i.owner))
        )
        return this.$store.dispatch('loadusers', uids)
      }).then(res => {
        return data
      }).catch(err => {
        console.log(err)
        return []
      })
    },
    setPageSize: function (newSize) {
      this.perPage = newSize
    },
    detail: function (item) {
      this.$data.currDetail = item.id
      this.$bvModal.show('modal-detail')
    },
    add: function () {
      this.$data.curr = null
      this.$bvModal.show('modal-add')
    },
    edit: function (item) {
      this.$data.curr = item
      this.$bvModal.show('modal-add')
    },
    onItemSubmit: function (item) {
      if (this.curr) {
        Object.assign(this.curr, item)
      }
    }
  },
  template
}
