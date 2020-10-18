/* global Vue, axios, API, _, moment */
import { AKCE_LABELS } from '../consts.js'
import template from './editor.html.js'
import BodForm from './form.js'

export default {
  data: () => {
    return {
      usneseni: [],
      bod: null
    }
  },
  created () {
    this.load(2)
  },
  methods: {
    load (id) {
      Promise.all([
        axios.get(`${API}/jednani/body/?filter={"id":${id}}`),
        axios.get(`${API}/jednani/usneseni/?filter={"idbod":${id}}`)
      ])
      .then(res => {
        this.$data.bod = res[0].data[0]
        this.$data.usneseni = res[1].data
      })
    }
  },
  components: {
    'bod-form': BodForm
  },
  template
}
