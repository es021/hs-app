
<template>
      <div>
      <br><br>
      ----------------------------------------------------------------------------------------- 
      DEBUG STORE
      -----------------------------------------------------------------------------------------
      
      <h3>Form Value</h3>
      {{transactionState.formValue}}<br>

      <h3>Form Error</h3>
      {{transactionState.formError}}<br>
      
      <h3>Form Disabled</h3>
      {{transactionState.formDisabled}}<br>

      <h3>Form Required</h3>
      {{transactionState.formRequired}}<br>
   
      <h3>Form Ref</h3>
      {{transactionState.formRef}}<br>

      <h3>Ref Table</h3>
      {{transactionState.refTable}}<br>

      <h3>All Data</h3>
      {{transactionState}}

      <br><br>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "AppDebug",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["transactionState", "transactionCurrentTabId"])
  }
};
</script>
