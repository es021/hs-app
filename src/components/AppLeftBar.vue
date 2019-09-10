<template>
  <div id="AppLeftBar">
    <div class="left-bar-nav">
      <MenuList :data="menuLeftBar"></MenuList>
    </div>
  </div>
</template>

<script>
import * as ComponentHelper from "../helper/component-helper";

export default {
  name: "AppLeftBar",
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
#AppLeftBar {
  // left: 0;
  // position: absolute;
  // width: 200px;
  text-align: left;
  height: 100%;
  background: rgb(15, 15, 15);

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
        color: white;
        display: flex;
        position: relative;
        .menu_count {
          color: white;
          background: #f62626;
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
      background-color: blue;
    }

    ul li.link:active {
      background-color: darken(red, 5);
    }
  }
}
</style>
