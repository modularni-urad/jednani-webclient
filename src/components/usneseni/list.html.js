export default `
<div class="row">

  <div class="col-sm-12">
    <h2>Usnesení</h2>
    <b-button v-if="$store.getters.isMember('taskadmin')" variant="primary" @click="add">
      <i class="fas fa-plus"></i> Přidat
    </b-button>
  </div>

  <div class="col-sm-12">
    <ol>
      <li v-for="u in usneseni">
        {{ u.akce }}: {{ u.text }}
        <b-button v-if="$store.getters.isMember('taskadmin')" variant="primary" @click="edit">
          <i class="fas fa-plus"></i> Upravit
        </b-button>
        <b-button v-if="$store.getters.isMember('taskadmin')" variant="primary" @click="remove">
          <i class="fas fa-minus"></i> Odstranit
        </b-button>
      </li>
    </ol>
  </div>

  <b-modal size="xl" id="modal-add-usneseni" title="Upravit" hide-footer>
    <usneseni-form v-bind:onSubmit="onItemSubmit" v-bind:item="curr" :bod="bod">
    </usneseni-form>
  </b-modal>
</div>
`