/* global axios, API, _ */
import { NameSpan } from '../_shared/user.js'
import MarkDown from '../_shared/markdown.js'
import Hlasovani from './hlasovani.js'
import { ROUTE_NAMES } from '../consts.js'

export default {
  data: () => {
    return {
      loading: true,
      prilohy: null,
      hlasovani: null
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
        url: `${api}/hlasovani/?filter={"idbod":"${this.bod.id}"}`
      })
    ])
    this.$data.prilohy = res[0].data
    this.$data.hlasovani = res[1].data
    this.$data.loading = false
  },
  props: ['query', 'cfg', 'bod'], 
  components: { NameSpan, MarkDown, Hlasovani },
  template: `
    <div class="row">
      <div class="col-sm-12 col-md-6">  
        Předkládá: <NameSpan :uid="bod.predkl" :cfg="cfg" /><br/>
        Zpracoval: <NameSpan :uid="bod.zprac" :cfg="cfg" /><br/>
        Důvodová zpráva: <b-button size="sm" v-b-modal.zprava-modal>zobrazit</b-button>
        <b-modal id="zprava-modal" size="xl" title="Důvodová zpráva" hide-footer>
          <MarkDown :text="bod.duvod" />
        </b-modal>

        <h5>přílohy</h5>
        <div class="d-inline-flex">
          <a v-for="i,idx in prilohy" :key="idx" 
            :href="i.name" target="_blank" class="p-1">{{ i.name }}</a>
        </div>        
      </div>

      <div class="col-sm-12 col-md-6">
        <Hlasovani v-for="i,idx in hlasovani" :key="idx" :cfg="cfg" :hlasovani="i" />
      </div>
    </div>
  `
}
