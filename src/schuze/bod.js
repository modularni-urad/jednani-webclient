/* global axios, API, _ */
import { NameSpan } from '../_shared/user.js'
import MarkDown from '../_shared/markdown.js'
import { ROUTE_NAMES } from '../consts.js'
// import formconfig from './formconfig.js'

export default {
  data: () => {
    return {
      loading: true,
      prilohy: null,
      usneseni: null
    }
  },
  async created () {
    const api = this.$props.cfg.api
    const res = await Promise.all([
      this.$store.dispatch('send', {
        method: 'get',
        url: `${api}/prilohy/${this.bod.id}`
      }),
      this.$store.dispatch('send', {
        method: 'get',
        url: `${api}/usneseni/?filter={"idbod":"${this.bod.id}"}`
      })
    ])
    this.$data.prilohy = res[0].data
    this.$data.usneseni = res[1].data
    this.$data.loading = false
  },
  props: ['query', 'cfg', 'bod'], 
  components: { NameSpan, MarkDown },
  template: `
    <div class="row">
      <div class="col-sm-12 col-md-6">  
        Předkládá: <NameSpan :uid="bod.predkl" :cfg="cfg" /><br/>
        Zpracoval: <NameSpan :uid="bod.zprac" :cfg="cfg" /><br/>
        Důvodová zpráva: <b-button size="sm" v-b-modal.zprava-modal>zobrazit</b-button>
        <b-modal id="zprava-modal" size="lg" title="Důvodová zpráva" hide-footer>
          <MarkDown :text="bod.duvod" />
        </b-modal>

        <h5>přílohy</h5>

        <h5>usnesení</h5>
      </div>
    </div>
  `
}
