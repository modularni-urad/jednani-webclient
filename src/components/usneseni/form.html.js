export default `
<form ref="form" @submit.stop.prevent="handleSubmit">
  <div class="row">
    
    <div class="col-sm-6">
      <b-form-group :state="!$v.akce.$error" label="Akce"
        label-for="akce-input" invalid-feedback="Toto je povinné">
          <b-form-select id="akce-input" v-model="$v.akce.$model"
            :state="!$v.akce.$error" :options="akceOpts">
          </b-form-select>
      </b-form-group>
    </div>

    <div class="col-sm-6">
      <b-form-group :state="!$v.osoba.$error" label="Osoba"
        label-for="osoba-input" invalid-feedback="Osoba je povinný">
          <user-select id="osoba-input"
            :state="!$v.osoba.$error"
            v-model="$v.osoba.$model">
          </user-select>
      </b-form-group>
    </div>
    
  </div>

  <b-form-group
    :state="!$v.text.$error"
    label="Text"
    label-for="text-input"
    invalid-feedback="Toto je povinné"
  >
    <b-form-textarea rows="5" id="text-input" 
      v-model="$v.text.$model"
      :state="!$v.text.$error"
    ></b-form-textarea>
  </b-form-group>

  <b-button class="mt-3" block :disabled="$v.$anyError" @click="handleSubmit">
    Save
  </b-button>
</form>
`