export default `
<form ref="form" @submit.stop.prevent="handleSubmit">
  
  <div class="row">
    <div class="col-sm-12">
      <b-form-group
        :state="!$v.nazev.$error"
        label="Název"
        label-for="nazev-input"
        invalid-feedback="Název je povinný"
      >
        <b-form-input
          id="nazev-input"
          v-model="$v.nazev.$model"
          :state="!$v.nazev.$error"
        ></b-form-input>
      </b-form-group>
    </div>      
  </div>

  <div class="row">
    <div class="col-sm-6">
      <b-form-group
        :state="!$v.predkl.$error"
        label="Předkladatel"
        label-for="predkl-input"
        invalid-feedback="Toto je povinné"
      >
        <user-select id="predkl-input"
          :state="!$v.predkl.$error"
          v-model="$v.predkl.$model">
        </user-select>
      </b-form-group>
    </div> 
    <div class="col-sm-6">
      <b-form-group
        :state="!$v.zprac.$error"
        label="Zpracovatel"
        label-for="zprac-input"
        invalid-feedback="Toto je povinné"
      >
        <user-select id="zprac-input"
          :state="!$v.zprac.$error"
          v-model="$v.zprac.$model">
        </user-select>
      </b-form-group>        
    </div>
  </div>

  <div class="row">
    <div class="col-sm-12">
      <b-form-group
        :state="!$v.duvod.$error"
        label="Důvodová zpráva"
        label-for="duvod-input"
        invalid-feedback="Toto je povinné"
      >
        <b-form-textarea rows="7"
          id="duvod-input"
          v-model="$v.duvod.$model"
          :state="!$v.duvod.$error"
        ></b-form-textarea>
      </b-form-group>
    </div>      
  </div>

  <b-button class="mt-3" block :disabled="$v.$anyError" @click="handleSubmit">
    Save
  </b-button>

  <div v-if="!$data.id">Prilohy a Usneseni az po ulozeni</div>
  <div v-else>
    <list-usneseni :usneseni="usneseni" :bod="bod">
    </list-usneseni>
    <list-prilohy :prilohy="prilohy" :bod="bod">
    </list-prilohy>
  </div>
</form>
`