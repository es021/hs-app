<template>
  <div>
    <AppHeader></AppHeader>
    <div :style="style">
      <AppBanner></AppBanner>
      <div class="section white">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "default",
  props: {},
  data() {
    return {
      style: {
        marginTop: ""
      }
    };
  },
  computed: {
    // ...mapGetters(["authUser"])
  },
  mounted() {},
  methods: {}
};
</script>
