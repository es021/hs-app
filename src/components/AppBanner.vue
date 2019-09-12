<template>
  <div class="parallax-container" :style="style.container">
    <div class="parallax" :style="style.parallax">
      <!-- <img :src="AppConfig.getImgUploadUrl('banner.jpg')"> -->
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
import * as ComponentHelper from "../helper/component-helper";
export default {
  name: "default",
  props: {},
  data() {
    return {
      AppConfig,
      style: {
        container: {},
        parallax: {}
      }
    };
  },
  computed: {
    ...ComponentHelper.getComputed()
  },
  mounted() {
    this.style.container = { background: "rgba(0,0,0,0.4)" };
    this.style.parallax = {
      ...this.getImgStyle({
        url: AppConfig.getImgUploadUrl("banner.jpg"),
        position: "center center",
        size: "cover"
      })
    };
    // AppConfig.getImgUploadUrl('banner.jpg')
    // console.log("banner mount");
  },
  methods: {
    ...ComponentHelper.getMethods()
  }
};
</script>
