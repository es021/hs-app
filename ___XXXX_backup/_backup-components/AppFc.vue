
<template>
  <div>
    {{view}}
  </div>
</template>

<script>
import * as Fc381050 from "../transaction/SAA/T385010/field-config";
import * as Fc382000 from "../transaction/SAA/T382000/field-config";
export default {
  name: "AppFc",
  data() {
    return {
      view : "",
      currentTxn: "385010",
      Fc381050 : Fc381050
    };
  },
  mounted() {
    
   this.view = JSON.stringify()
  },
  methods: {
    getFcInfo(fcAll) {
      console.log("getFcInfo", fcAll);
      console.log("getFcInfo", this[fcAll]);
      console.log("getFcInfo", this["Fc385010"]);
      return fcAll;
    }
  }
};
</script>
