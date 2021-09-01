
export default {
  props: ['text'],
  computed: {
    html: function() {
      return marked(this.$props.text || '')
    }
  },
  template: '<span v-html="html" />'
}