/* global Vue, axios, API, _, moment */
import { AKCE_LABELS } from '../consts.js'
import UserSelect from '../userselect.js'
import template from './form.html.js'
const validationMixin = window.vuelidate.validationMixin
const validators = window.validators

export default Vue.extend({
  mixins: [validationMixin],
  data: () => {
    return {
      akce: '',
      osoba: '',
      text: ''
    }
  },
  computed: {
    akceOpts: () => _.map(AKCE_LABELS, (v, k) => ({ value: k, text: v }))
  },
  validations: {
    akce: { required: validators.required },
    osoba: { },
    text: { required: validators.required }
  },
  created () {
    if (this.$props.item) {
      Object.assign(this.$data, this.$props.item)
    }
  },
  props: ['bod', 'item'],
  methods: {
    save () {
      return this.$data.id
        ? axios.put(`${API}/jednani/usneseni/${this.$props.item.id}`, this.$data)
        : axios.post(`${API}/jednani/usneseni/${this.$props.bod.id}`, this.$data)
    },
    handleSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return false
      }
      this.save()
        .then(res => {
          this.$attrs.onSubmit(this.$data)
        })
        .catch(err => {
          const message = err.response.data
          this.$store.dispatch('toast', { message, type: 'error' })
        })
    }
  },
  components: {
    'user-select': UserSelect
  },
  template
})
