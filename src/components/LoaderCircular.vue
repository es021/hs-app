
<template>
  <div>
    <div v-if="loading" :class="`preloader-wrapper ${size} active`">
      <div class="spinner-layer spinner-blue-only">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "default",
  props: {
    size: {
      type: String,
      default: ""
      // ["small", "", "big"]
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>
