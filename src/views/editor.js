/* global Vue, axios, API, _, moment */
import { AKCE_LABELS } from '../components/consts.js'
import template from './editor.html.js'
import BodForm from '../components/bod/form.js'

export default {
  data: () => {
    return {
      usneseni: [],
      prilohy: [],
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
        axios.get(`${API}/jednani/usneseni/?filter={"idbod":${id}}`),
        axios.get(`${API}/jednani/prilohy/?filter={"idbod":${id}}`)
      ])
      .then(res => {
        this.$data.bod = res[0].data[0]
        this.$data.usneseni = res[1].data
        this.$data.prilohy = res[2].data
      })
    }
  },
  components: {
    'bod-form': BodForm
  },
  template
}
