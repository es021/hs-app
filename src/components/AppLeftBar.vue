<template>
  <div id="AppLeftBar" ref="AppLeftBar">
    <div class="left-bar-nav">
      <MenuList :onMouseoverLi="onMouseoverLi" 
        :onMouseoutLi="onMouseoutLi"  
        :data="menuLeftBar"></MenuList>
    </div>
  </div>
</template>

<script>
import * as ComponentHelper from "../helper/component-helper";

export default {
  name: "AppLeftBar",
  computed: {
    ...ComponentHelper.getComputed()
  },
  data() {
    return {};
  },
  mounted() {
    this.setTheme();
  },
  methods: {
    ...ComponentHelper.getMethods(),

    // ########################################################################
    // THEMEING HELPER
    onMouseoverLi(e) {
      this.setStyle(
        e.currentTarget,
        "background",
        this.themeAppLeftBar.link_active
      );
    },
    onMouseoutLi(e) {
      this.setStyle(
        e.currentTarget,
        "background",
        this.themeAppLeftBar.background
      );
    },
    setTheme() {
      let theme = this.themeAppLeftBar;
      let main = this.$refs["AppLeftBar"];
      this.setStyle(main, "background", theme.background);
      this.setStyleByClass(main, "link", { color: theme.link });
      this.setStyleByClass(main, "active", { background: theme.link_active });
      this.setStyleByClass(main, "title", {
        color: theme.title
      });
      this.setStyleByClass(main, "menu_count", {
        color: theme.count_color,
        background: theme.count_background
      });
    }
  }
};
</script>


<style lang="scss">
#AppLeftBar {
  // left: 0;
  // position: absolute;
  // width: 200px;
  text-align: left;
  height: 100%;
  //background: rgb(15, 15, 15);

  .left-bar-nav {
    ul {
      margin: 0;
      font-size: 13px;
      padding: 15px 0px;
      li {
        padding: 5px 20px;
      }
      li.title {
        padding-top: 20px;
        color: rgba(255, 255, 255, 0.5);
        font-size: 90%;
      }
      li.link {
        cursor: pointer;
        //color: white;
        display: flex;
        position: relative;
        .menu_count {
          // color: white;
          // background: #f62626;
          font-size: 10px;
          border-radius: 100%;
          height: 15px;
          width: 15px;
          position: absolute;
          right: 15px;
          top: 7px;
          font-weight: bold;
          text-align: center;
        }
      }
    }

    ul li .fa {
      padding-right: 7px;
      width: 24px;
      text-align: center;
      margin-top: 3px;
    }

    ul a {
      text-decoration: none !important;
    }

    ul a.active li.link,
    ul li.link:hover {
      //background-color: blue;
    }

    ul li.link:active {
      //background-color: darken(red, 5);
    }
  }
}
</style>
