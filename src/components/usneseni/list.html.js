export default `
<div class="row">

  <div class="col-sm-12">
    <h2 class="float-left mr-3">Usnesení</h2>
    <b-button v-if="$store.getters.isMember('taskadmin')" variant="primary" @click="add">
      <i class="fas fa-plus"></i> Přidat
    </b-button>
  </div>

  <div class="col-sm-12">
    <table class="table">
      <tbody>
        <tr v-for="u in usneseni">
        <td>{{ u.akce }}</td>
          <td>{{ u.text }}</td>
          <td>
            <b-button v-if="$store.getters.isMember('taskadmin')" 
              size="sm" variant="secondary" @click="edit(u)">
              <i class="fas fa-plus"></i> Upravit
            </b-button>
            <b-button v-if="$store.getters.isMember('taskadmin')"
              size="sm" variant="danger" @click="remove(u)">
              <i class="fas fa-minus"></i> Odstranit
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <b-modal size="xl" id="modal-add-usneseni" title="Upravit" hide-footer>
    <usneseni-form v-bind:onSubmit="onItemSubmit" v-bind:item="curr" :bod="bod">
    </usneseni-form>
  </b-modal>
</div>
`