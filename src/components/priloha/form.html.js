export default `
<div>
  <b-form-group
    :state="!$v.priloha.$error"
    label="Soubor přílohy"
    label-for="priloha-input"
    invalid-feedback="Toto je povinné"
  >
    <b-form-file
      v-model="$v.priloha.$model"
      :state="!$v.priloha.$error"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
      >
    </b-form-file>
  </b-form-group>
  <b-button class="mt-3" block @click="handleSubmit">
    Save
  </b-button>
</div>
`