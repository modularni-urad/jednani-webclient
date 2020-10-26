export default `
<div class="row">

  <div class="col-sm-12">
    <h2 class="float-left mr-3">Přílohy</h2>
    <b-button v-if="$store.getters.isMember('taskadmin')" variant="primary" @click="add">
      <i class="fas fa-plus"></i> Přidat
    </b-button>
  </div>

  <div class="col-sm-12">
    <table class="table">
      <tbody>
        <tr v-for="p in prilohy">
          <td>{{ p.name }}</td>
          <td>{{ p.size }}</td>
          <td>
            <b-button v-if="$store.getters.isMember('taskadmin')" 
              size="sm" variant="secondary" @click="edit(p)">
              <i class="fas fa-plus"></i> Upravit
            </b-button>
            <b-button v-if="$store.getters.isMember('taskadmin')" 
              size="sm"variant="danger" @click="remove(p)">
              <i class="fas fa-minus"></i> Odstranit
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <b-modal size="xl" id="modal-add-prilohy" title="Upravit" hide-footer>
    <priloha-form v-bind:onSubmit="onItemSubmit" v-bind:item="curr" :bod="bod">
    </priloha-form>
  </b-modal>
</div>
`