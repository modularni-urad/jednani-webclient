export default `
  <div>
    <div>
      <b-breadcrumb class="float-left">
        <b-breadcrumb-item to="/"><i class="fas fa-home"></i></b-breadcrumb-item>
        <b-breadcrumb-item active>Materiály</b-breadcrumb-item>
      </b-breadcrumb>

      <div class="float-right">
        <b-button v-if="$store.getters.isMember('taskadmin')" variant="primary" @click="add">
          <i class="fas fa-plus"></i> Přidat
        </b-button>
      </div>

      <b-table small striped hover sort-icon-left no-local-sorting
        id="maps-table"
        primary-key="id"
        :current-page="currentPage"
        :per-page="perPage"
        :busy.sync="isBusy"
        :items="myProvider"
        :fields="fields"
      >
        <template v-slot:cell(predkl)="data">
          {{ data.item.predkl | username }}
        </template>
        <template v-slot:cell(predkl)="data">
          {{ data.item.zprac | username }}
        </template>
        <template v-slot:cell(stav)="data">
          {{ data.item.stav }}
        </template>
        <template v-slot:cell(nazev)="data">
          <a href="javascript:void(0)" v-on:click="detail(data.item)">
            {{ data.item.nazev }}
          </a>
        </template>
        <template v-slot:cell(actions)="data">
          <b-button v-if="$store.getters.UID === data.item.owner"
            size="sm" variant="primary"
            v-on:click="edit(data.item)">
            <i class="fas fa-edit"></i> upravit
          </b-button>
        </template>
      </b-table>

      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        aria-controls="maps-table"
      ></b-pagination>

      <b-dropdown id="pagesize-dropup" dropup text="Velikost stránky"
        variant="primary" class="m-2">
        <b-dropdown-item @click="setPageSize(5)">5</b-dropdown-item>
        <b-dropdown-item @click="setPageSize(10)">10</b-dropdown-item>
        <b-dropdown-item @click="setPageSize(50)">50</b-dropdown-item>
      </b-dropdown>

    </div>
  </div>
  `