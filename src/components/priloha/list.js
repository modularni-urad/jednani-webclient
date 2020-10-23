/* global Vue, axios, API, _, moment */
import PrilohaForm from './form.js'
import template from './list.html.js'

export default {
  data: () => {
    return {
      curr: null,
      currDetail: null,
      item: {}
    }
  },
  created () {
    if (this.$props.item) {
      Object.assign(this.$data, this.$props.item)
    }
  },
  props: ['bod', 'prilohy'],
  methods: {
    add: function () {
      this.$data.curr = null
      this.$bvModal.show('modal-add-prilohy')
    },
    edit: function (item) {
      this.$data.curr = item
      this.$bvModal.show('modal-add-prilohy')
    },
    remove: function (item) {
      axios.delete(`${API}/jednani/prilohy/${item.id}`).then(res => {
        const idx = _.indexOf(this.$props.prilohy, item)
        this.$props.prilohy.splice(idx, 1)
      })
    },
    onItemSubmit: function (item) {
      if (this.curr) {
        Object.assign(this.curr, item)
      } else {
        this.$props.prilohy.push(item)
      }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-add-prilohy')
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
    'priloha-form': PrilohaForm
  },
  template
}
