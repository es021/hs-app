<template>
  <div>
    <AppHeader></AppHeader>
    <div :style="style">
      <AppBanner v-if="withBanner"></AppBanner>
      <div class="section white">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "default",
  props: {
    withBanner: {
      type: Boolean,
      default: false
    }
  },
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
