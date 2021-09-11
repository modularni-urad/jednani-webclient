const _voteVal = {
  a: 'pro', n: 'proti', z: 'zdržel'
}

export default {
  data: () => {
    return {
      loading: true,
      existing: null
    }
  },
  filters: {
    voteval: function (val) {
      return _voteVal[val]
    }
  },
  async created () {
    const api = this.$props.cfg.api
    const res = await this.$store.dispatch('send', {
      method: 'get',
      url: `${api}/hlasy/${this.hlasovani.id}`
    })
    this.existing = res.data || null
  },
  methods: {
    hlasuj: async function (value) {
      try {
        const api = this.$props.cfg.api
        const res = await this.$store.dispatch('send', {
          method: 'post',
          url: `${api}/hlasy/${this.hlasovani.id}/${value}`
        })
        this.existing = { hlas: value }
      } catch (err) {
        alert(err)
      }
    },
    opravit: function (value) {
      this.existing = null
    }
  },
  props: ['cfg', 'hlasovani'], 
  template: `
  <div v-if="existing !== null">
    Hlasoval jsem: <b>{{ existing.hlas | voteval }}</b>
    <b-button variant="warning" size="sm" @click="opravit">opravit</b-button>
  </div>
  <b-button-group v-else>
    <b-button size="xl" variant="success" @click="hlasuj('a')">PRO</b-button>
    <b-button size="xl" variant="danger" @click="hlasuj('n')">PROTI</b-button>
    <b-button size="xl" @click="hlasuj('z')">ZDRŽEL</b-button>
  </b-button-group>
  `
}
