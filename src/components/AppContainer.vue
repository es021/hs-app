<template>
  <div id="AppContainer" :class="{loggedIn:this.authIsLoggedIn}">
    <!-- Header -->
    <div class="header" :style="styleMain">
      <AppHeader></AppHeader>
    </div>
    <div class="main" :style="styleMain">
      <!-- Banner -->
      <AppBanner v-if="!this.authIsLoggedIn"></AppBanner>

      <!-- Left Bar -->
      <div class="left-bar" v-if="this.authIsLoggedIn" :style="styleLeftBar">
        <AppLeftBar></AppLeftBar>
      </div>

      <!-- Left Content -->
      <div :style="styleContent" class="content section white">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import * as ComponentHelper from "../helper/component-helper";
export default {
  name: "AppContainer",
  props: {
    withBanner: {
      type: Boolean,
      default: false
    },
    loggedIn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      styleMain: {
        marginTop: ""
      },
      styleLeftBar: {},
      styleContent: {}
    };
  },
  mounted() {},
  created() {},
  // import * as ComponentHelper from "../helper/component-helper";
  computed: {
    ...ComponentHelper.getComputed()
  },
  methods: {
    ...ComponentHelper.getMethods()
  }
};
</script>

<style lang="scss">
$HEADER_HEIGHT: 50px;
#AppContainer {
  .header {
    height: $HEADER_HEIGHT;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
  }
  .main {
    padding-top: $HEADER_HEIGHT;
    position: relative;
  }
}

#AppContainer.loggedIn {
  .main {
    .left-bar {
      left: 0;
      height: 100vh;
      position: fixed;
      width: 200px;
    }
    .content {
      margin-left: 200px;
    }
  }
}
</style>
