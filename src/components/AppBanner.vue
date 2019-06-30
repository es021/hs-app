<template>
  <div class="parallax-container" :style="{background:'rgba(0,0,0,0.4)'}">
    <div class="parallax">
      <img :src="require('../image/banner.jpg')">
    </div>
    <div class="white-text">
      <div class="container">
        <div class="row">
          <div class="col s12 valign-wrapper" :style="{marginTop:'90px'}">
            <h1 class="width-full white-text">
              Something Awesome
              <br>
              <small>Yes it is awesome</small>
            </h1>
          </div>
          <div class="col s12">
            <button class="btn red btn-large waves-effect waves-light">
              <i class="material-icons right">chevron_right</i>Sign Up
            </button>
            <button class="btn blue btn-large waves-effect waves-light">
              <i class="material-icons right">chevron_right</i>Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "default",
  props: {},
  data() {
    return {};
  },
  computed: {
    // ...mapGetters(["authUser"])
  },
  mounted() {},
  methods: {}
};
</script>
