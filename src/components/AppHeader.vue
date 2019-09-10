<template>
  <div id="AppHeader">
      <div class="img">
        <router-link :to="'/'" class="brand-logo">
          <img :src="AppConfig.getImgUploadUrl('favicon.ico')">
        </router-link>
      </div>
      <div class="title">
        <b>{{AppConfig.AppName.toUpperCase()}}</b>
        <br>
        <small>{{AppConfig.AppDesc}}</small>
      </div>
      <div class="menu hide-on-small-and-down">
        <MenuList :iconStyle="{fontSize:'20px', marginRight:'5px'}"  
          :data="menuHeader"></MenuList>
      </div>
      <div class="menu menu-toggle hide-on-med-and-up right-align">
        <a @click="toogleSideMenu">
          <i class="material-icons">menu</i>
        </a>
      </div>
      <div :class="{'hide-on-med-and-up':true,'side-menu':true, 'show': isSideMenuShow}">
          <MenuList :iconStyle="{fontSize:'20px', marginRight:'15px'}"  
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
  computed: {
    ...ComponentHelper.getComputed()
  },
  methods: {
    ...ComponentHelper.getMethods(),
    toogleSideMenu() {
      this.isSideMenuShow = !this.isSideMenuShow;
    }
  }
};
</script>

<style lang="scss">
@import "../style/define/_constant.scss";
@import "../style/define/_mixin.scss";
$SIDE_MENU_WIDTH: 200px;

#AppHeader {
  height: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  z-index: 10;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5); // logo

  .img {
    height: 100%;
    margin-left: 10px;
    margin-right: 2px;
    padding: 2px;

    img {
      height: 100%;
    }
  }

  .title {
    color: $COLOR_HEADER_TITLE;
    line-height: 15px;

    small {
      color: $COLOR_HEADER_SUBTITLE;
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
      color: $COLOR_HEADER_LINK;
      text-decoration: none;
    }

    a:hover {
      text-decoration: none;
      color: $COLOR_HEADER_LINK_ACTIVE;
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
          color: $COLOR_HEADER_LINK_ACTIVE;
        }
      }
    }
  }

  .menu-toggle {
    cursor: pointer;
  }

  .side-menu {
    position: absolute;
    right: 0;

    ul {
      position: absolute;
      right: -$SIDE_MENU_WIDTH;
      width: $SIDE_MENU_WIDTH;
      transition: right 0.2s ease-out;
      height: 100vh;
      background: $COLOR_HEADER;
      top: 25px;
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
