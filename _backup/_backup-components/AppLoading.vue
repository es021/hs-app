
<template>
  <div class="app-loading">
    <div><i class="fa fa-spinner fa-pulse fa-3x"></i></div>
    <div class="text" v-html="text"></div>
  </div>
</template>

<script>
export default {
  name: "AppLoading",
  props: {
    text: {
      type: String,
      default: "Sila Tunggu Sebentar"
    }
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>
