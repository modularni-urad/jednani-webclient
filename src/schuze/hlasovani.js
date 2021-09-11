import { ROUTE_NAMES } from '../consts.js'
import HlasovaciTlacitka from './hlasovaci_tlacitka.js'

function _load(self) {
  
}

export default {
  data: () => {
    return {
      usneseni: null
    }
  },
  async created () {
    const api = this.$props.cfg.api
    const res = await this.$store.dispatch('send', {
      method: 'get',
      url: `${api}/usneseni/?filter={"idhlasovani":"${this.hlasovani.id}"}`
    })
    this.$data.usneseni = res.data
    this.$data.loading = false
  },
  props: ['query', 'cfg', 'hlasovani'], 
  components: { HlasovaciTlacitka },
  template: `
  <div>
    <h5>usnesení</h5>
    <div v-for="i,idx in usneseni" :key="idx">
      {{ i.id }}: {{ i.akce }}: {{ i.osoba }}: {{ i.text }}
    </div>
    <HlasovaciTlacitka :cfg="cfg" :hlasovani="hlasovani" />
  </div>
  `
}
