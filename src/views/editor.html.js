export default `
  <div>
    <p v-if="bod === null">loading</p>
    <bod-form v-else :bod="bod" :usneseni="usneseni" :prilohy="prilohy">
    </bod-form>
  </div>
`