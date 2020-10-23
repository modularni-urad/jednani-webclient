/* global Vue, axios, API, _, moment */
// import { PRIORITY_LABELS, STATE_LABELS } from '../consts.js'
import UserSelect from '../userselect.js'
import ListUsneseni from '../usneseni/list.js'
import ListPrilohy from '../priloha/list.js'
import template from './form.html.js'
const validationMixin = window.vuelidate.validationMixin
const validators = window.validators

export default Vue.extend({
  mixins: [validationMixin],
  data: () => {
    return {
      nazev: '',
      duvod: '',
      predkl: '',
      zprac: ''
    }
  },
  validations: {
    nazev: { required: validators.required },
    duvod: { required: validators.required },
    predkl: { required: validators.required },
    zprac: { required: validators.required }
  },
  created () {
    if (this.$props.bod) {
      Object.assign(this.$data, this.$props.bod)
    }
  },
  props: ['bod', 'usneseni', 'prilohy'],
  methods: {
    save () {
      const data = _.omit(this.$data, 'usneseni', 'prilohy')
      return this.$data.id
        ? axios.put(`${API}/jednani/body/${this.$data.id}`, data)
        : axios.post(`${API}/jednani/body`, data)
    },
    handleSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      }
      this.save()
        .then(res => {
          return this.$attrs.onSubmit(this.$data)
        })
        .catch(err => {
          const message = err.response.data
          this.$store.dispatch('toast', { message, type: 'error' })
        })
    }
  },
  components: {
    'user-select': UserSelect,
    'list-usneseni': ListUsneseni,
    'list-prilohy': ListPrilohy
  },
  template
})
