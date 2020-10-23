/* global Vue, axios, API, _, moment */
import template from './form.html.js'
const validationMixin = window.vuelidate.validationMixin
const validators = window.validators

export default Vue.extend({
  mixins: [validationMixin],
  data: () => {
    return {
      priloha: null
    }
  },
  validations: {
    priloha: { required: validators.required }
  },
  created () {
    if (this.$props.item) {
      Object.assign(this.$data, this.$props.item)
    }
  },
  props: ['item', 'bod'],
  methods: {
    save () {
      return this.readFile().then(content => {
        const data = _.pick(this.$data.priloha, 'size', 'name', 'type')
        data.content = content
        return this.$data.id
          ? axios.put(`${API}/jednani/prilohy/${this.$data.id}`, data)
          : axios.post(`${API}/jednani/prilohy/${this.$props.bod.id}`, data)
      })
    },
    readFile () {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.addEventListener('load', function () {          
          resolve(reader.result)
        }, false)
        reader.readAsDataURL(this.$data.priloha)  // convert file to base64 string
      })
    },
    handleSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      }
      this.save()
        .then(res => {
          this.$attrs.onSubmit(res.data)
        })
        .catch(err => {
          const message = err.response.data
          this.$store.dispatch('toast', { message, type: 'error' })
        })
    }
  },
  template
})
