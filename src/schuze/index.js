import BodDetail from './bod.js'
import { ROUTE_NAMES } from '../consts.js'

export default {
  data: () => {
    return {
      loading: true,
      item: null,
      body: null,
      opened: null,
      modalShow: false
    }
  },
  async created () {
    const api = this.$props.cfg.api
    const id = this.$props.params.id
    const res = await Promise.all([
      this.$store.dispatch('send', {
        method: 'get',
        url: `${api}/jednani/${id}`
      }),
      this.$store.dispatch('send', {
        method: 'get',
        url: `${api}/body/?filter={"idjednani":"${id}"}`
      })
    ])
    this.$data.item = res[0].data
    this.$data.body = res[1].data
    this.$data.opened = this.query._detail 
      ? _.find(this.$data.body, { id: Number(this.query._detail) })
      : null
    this.$data.modalShow = !_.isUndefined(this.query._detail)
    this.$data.loading = false
  },
  props: ['query', 'params', 'cfg'], 
  components: { BodDetail },
  methods: {
    openDetail: function (i) {
      const query = Object.assign({}, this.query, { _detail: i.id })
      this.$router.replace({ query })
      this.opened = i
    },
    hide: function () {
      this.$router.replace({ query: _.omit(this.query, '_detail') })
      this.opened = null
    }
  },
  template: `
<div class="row">
  <i v-if="loading" class="fas fa-spinner fa-spin"></i>
  <div v-else class="col-sm-12">
    <h1>{{ item.organ }} - schůze {{ item.datum || datetime }}, {{ item.misto }}</h1>
    <h3>program</h3>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">název</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i,idx in body" :key="idx">
          <td>{{ i.id }}</td>
          <td><a href="javascript:void(0);" @click="openDetail(i)">{{ i.nazev }}</a></td>
        </tr>
      </tbody>
    </table>
    <b-modal v-model="modalShow" size="xl" @hidden="hide"
        :title="opened ? opened.nazev : ''" hide-footer>
      <BodDetail :bod="opened" :cfg="cfg" />
    </b-modal>
  </div>
</div>
  `
}
