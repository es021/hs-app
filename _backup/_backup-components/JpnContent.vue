<template>
<div  class="app-content" id="app-content">
  <component :is="transaction"></component>
</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "JpnContent",
  data() {
    return {
      transaction: ""
    };
  },
  watch: {
    $route(to, from) {
      if (to.path != from.path) {
        this.loadTransaction();
      }
    }
  },
  mounted() {
    this.loadTransaction();
  },
  methods: {
    refresh() {
      this.loadTransaction();
    },
    loadTransaction() {
      this.transaction = this.$route.params.transaction_code;
    }
  }
};
</script>
