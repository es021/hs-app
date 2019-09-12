<template>
  <div id="AppHeader" ref="AppHeader">
      <div class="img">
        <router-link :to="'/'" class="brand-logo">
          <img :src="AppConfig.getImgUploadUrl('logo.png')">
        </router-link>
      </div>
      <div class="title">
        <b>{{AppConfig.AppName.toUpperCase()}}</b>
        <br>
        <small class="subtitle">{{AppConfig.AppDesc}}</small>
      </div>
      <div class="menu hide-on-small-and-down">
        <MenuList 
          :onMouseoverLi="onMouseoverLi" 
          :onMouseoutLi="onMouseoutLi" 
          :iconStyle="{fontSize:'20px', marginRight:'5px'}"  
          :data="menuHeader"></MenuList>
      </div>
      <div class="menu menu-toggle hide-on-med-and-up right-align">
        <a @mouseover="onMouseoverLi" @mouseout="onMouseoutLi" 
          class="menu-toggle-link" @click="toogleSideMenu">
          <i class="material-icons">menu</i>
        </a>
      </div>
      <div :class="{'hide-on-med-and-up':true,'side-menu':true, 'show': isSideMenuShow}">
          <div v-if="isSideMenuShow" class="side-menu-background" @click="toogleSideMenu"></div>
          <MenuList 
            :onMouseoverLi="onMouseoverLi" 
            :onMouseoutLi="onMouseoutLi" 
            :iconStyle="{fontSize:'20px', marginRight:'15px'}"  
            :data="menuHeader"></MenuList>
      </div>
  </div>
</template>

<script>
import * as AppConfig from "../../_config/app-config";
import * as ComponentHelper from "../helper/component-helper";

export default {
  data() {
    return {
      isSideMenuShow: false,
      AppConfig
    };
  },
  name: "default",
  props: {},
  mounted() {
    this.setTheme();
  },
  computed: {
    ...ComponentHelper.getComputed()
  },
  methods: {
    ...ComponentHelper.getMethods(),
    toogleSideMenu() {
      this.isSideMenuShow = !this.isSideMenuShow;
    },

    // ########################################################################
    // THEMEING HELPER
    onMouseoverLi(e) {
      this.setStyle(e.currentTarget, "color", this.themeAppHeader.link_active);
    },
    onMouseoutLi(e) {
      this.setStyle(e.currentTarget, "color", this.themeAppHeader.link);
    },
    setTheme() {
      let theme = this.themeAppHeader;

      let main = this.$refs["AppHeader"];
      this.setStyle(main, "background", theme.background);
      this.setStyleByClass(main, "title", { color: theme.title });
      this.setStyleByClass(main, "subtitle", { color: theme.subtitle });
      this.setStyleByClass(main, "link", { color: theme.link });
      this.setStyleByClass(main, "menu-toggle-link", { color: theme.link });
      this.setStyleByClass(main, "active", { color: theme.link_active });

      let sideMenu = main.getElementsByClassName("side-menu")[0];
      this.setStyleByTag(sideMenu, "ul", { background: theme.background });
    }
  }
};
</script>

<style lang="scss">
@import "../style/define/_constant.scss";
@import "../style/define/_mixin.scss";
$SIDE_MENU_WIDTH: 200px;

#AppHeader {
  // (dynamic in setTheme) background: $COLOR_HEADER_BACKGROUND;
  height: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  z-index: 10;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5); // logo

  .img {
    height: 100%;
    margin-left: 10px;
    margin-right: 7px;
    padding: 7px 0px;

    img {
      height: 100%;
    }
  }

  .title {
    // (dynamic in setTheme) color: $COLOR_HEADER_TITLE;
    line-height: 15px;

    small {
      // (dynamic in setTheme) color: $COLOR_HEADER_SUBTITLE;
    }
  }

  .menu_count {
    color: white;
    background: #f62626;
    font-size: 10px;
    border-radius: 100%;
    margin-left: 5px;
    height: 20px;
    width: 20px;
    font-weight: bold;
    text-align: center;
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1px;
  }

  .menu,
  .side-menu {
    flex-grow: 2;
    padding: 0 10px;

    ul {
      margin: 0;
      list-style: none;
      padding: 0;
    }

    a {
      // (dynamic in setTheme) color: $COLOR_HEADER_LINK;
      text-decoration: none;
    }

    a:hover {
      text-decoration: none;
      // (dynamic in setTheme) color: $COLOR_HEADER_LINK_ACTIVE;
    }
  }

  .menu {
    ul {
      display: flex;
      align-items: center;
      flex-flow: row wrap;
      justify-content: flex-end;

      .menu-item {
        margin-left: 20px;
        .active {
          //border-bottom: $COLOR_HEADER_LINK solid 2px;
          font-weight: bold;
          //color: $COLOR_HEADER_LINK_ACTIVE;
        }
      }
    }
  }

  .menu-toggle {
    cursor: pointer;
  }

  .side-menu {
    .side-menu-background {
      position: fixed;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.7);
    }

    position: absolute;
    right: 0;

    ul {
      position: absolute;
      right: -$SIDE_MENU_WIDTH;
      width: $SIDE_MENU_WIDTH;
      transition: right 0.2s ease-out;
      height: 100vh;
      // background: $COLOR_HEADER;
      // (dynamic in setTheme) background: $COLOR_HEADER_BACKGROUND;
      top: -25px;
      padding: 10px;

      .menu-item {
        margin-bottom: 10px;
      }
    }
  }

  .side-menu.show {
    ul {
      right: 0;
    }
  }
}
</style>
