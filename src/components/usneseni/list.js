/* global Vue, axios, API, _, moment */
import { AKCE_LABELS } from '../consts.js'
import UsneseniForm from './form.js'
import template from './list.html.js'

export default {
  data: () => {
    return {
      curr: null,
      currDetail: null,
      item: {}
    }
  },
  computed: {
    akceOpts: () => _.map(AKCE_LABELS, (v, k) => ({ value: k, text: v }))
  },
  created () {
    if (this.$props.item) {
      Object.assign(this.$data, this.$props.item)
    }
  },
  props: ['bod', 'usneseni'],
  methods: {
    add: function () {
      this.$data.curr = null
      this.$bvModal.show('modal-add-usneseni')
    },
    edit: function (item) {
      this.$data.curr = item
      this.$bvModal.show('modal-add-usneseni')
    },
    remove: function (item) {
      axios.delete(`${API}/jednani/usneseni/${item.id}`).then(res => {
        const idx = _.indexOf(this.$props.usneseni, item)
        this.$props.usneseni.splice(idx, 1)
      })
    },
    onItemSubmit: function (item) {
      if (this.curr) {
        Object.assign(this.curr, item)
      }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-add-usneseni')
      })
    },
    handleSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      }
      this.save()
        .then(res => {
          this.$attrs.onSubmit(this.$data)
          // Hide the modal manually
          this.$nextTick(() => {
            this.$bvModal.hide('modal-add')
          })
        })
        .catch(err => {
          const message = err.response.data
          this.$store.dispatch('toast', { message, type: 'error' })
        })
    }
  },
  components: {
    'usneseni-form': UsneseniForm
  },
  template
}
