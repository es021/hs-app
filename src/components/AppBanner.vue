<template>
  <div class="parallax-container" :style="{background:'rgba(0,0,0,0.4)'}">
    <div class="parallax">
      <img :src="AppConfig.getImgUploadUrl('banner.jpg')">
    </div>
    <div class="white-text">
      <div class="container">
        <div class="row">
          <div class="col s12 valign-wrapper" :style="{marginTop:'90px'}">
            <h1 class="width-full white-text bold">
              <b>{{AppConfig.AppName.toUpperCase()}}</b>
              <br>
              <small>{{AppConfig.AppDesc}}</small>
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
import * as AppConfig from "../../_config/app-config";
export default {
  name: "default",
  props: {},
  data() {
    return {
      AppConfig
    };
  },
  computed: {
    // ...mapGetters(["authUser"])
  },

  mounted() {
    console.log("banner mount");
  },
  methods: {}
};
</script>
