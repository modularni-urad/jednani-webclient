/* global axios, API, _ */
import { ROUTE_NAMES } from '../consts.js'
import ItemForm from '/modularni-urad-admin-components/entity/form.js'
import formconfig from './formconfig.js'

export async function InitCfg (cfg) {
  return {
    url: `${cfg.url}/body`,
    apiurl: cfg.url,
    conf: formconfig
  }
}

export const Component = {
  data: () => {
    return {
      loading: true,
      item: null,
      prilohy: null,
      usneseni: null
    }
  },
  // filters: { priority, state },
  props: ['params', 'cfg'],
  async created () {
    const api = this.$props.cfg.url
    const id = this.$props.params.id
    const res = await Promise.all([
      axios.get(`${this.$props.cfg.url}/${id}`),
      axios.get(`${this.$props.cfg.apiurl}/usneseni/`, { params: { 
        filter: JSON.stringify({ idbod: id }),
        sort: 'id:desc'
      } })
    ])
    this.$data.item = res[0].data
    this.$data.usneseni = res[1].data
    this.$data.loading = false
  },
  computed: {
    backUrl: function () {
      return { name: ROUTE_NAMES.list }
    }
  },
  methods: {
    onSubmit: async function (item) {
      if (!item) return this.back()
      try {
        const res = await defaultSaveData(item, this.curr, this.$props, this.$store)
        this.$store.dispatch('toast', { message: 'uloženo' })
      } catch (err) {
        const message = err.response.data
        this.$store.dispatch('toast', { message, type: 'error' })
      }
    },
    back: function () {
      this.$router.push({ name: ROUTE_NAMES.bodylist })//, params: { id: i.id } })
    }
  },
  components: { ItemForm },
  template: `
    <div>
      <b-breadcrumb>
        <b-breadcrumb-item to="/"><i class="fas fa-home"></i></b-breadcrumb-item>
        <b-breadcrumb-item @click="back">body jednání</b-breadcrumb-item>
        <b-breadcrumb-item active>
          <i v-if="loading" class="fa fa-spinner fa-spin"></i>
          <span v-else>{{ item ? item.nazev : 'nový bod' }}</span>
        </b-breadcrumb-item>
      </b-breadcrumb>
      
      <div class="row" v-if="!loading">
        
        <div class="col-sm-12 col-md-6">
          <ItemForm :config="cfg.conf" :onSubmit="onSubmit" :item="item">
            <b-button class="mt-3" @click="back">Storno</b-button>
          </ItemForm>
        </div>

        <div class="col-sm-12 col-md-6">
          Prilohy
          Usneseni
        </div>

      </div>
    </div>
  `
}
