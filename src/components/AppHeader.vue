<template>
  <div id="AppHeader">
    <div class="img">
      <router-link :to="'/'" class="brand-logo">
        <img src>
      </router-link>
    </div>
    <div class="title">
      <b>{{AppConfig.AppName.toUpperCase()}}</b>
      <br>
      <small>{{AppConfig.AppDesc}}</small>
    </div>
    <div class="menu">
      <ul>
        <span v-for="(d,i) in menuHeader" :key="`menu_${i}`">
          <li class="title" v-if="d.isTitle">{{d.label}}</li>
          <router-link v-else :to="d.path">
            <li class="link">
              <i :className="`fa fa-${d.icon} left`"/>
              <span class="menu_label">{{d.label}}</span>
              <div class="menu_count">{{d.count}}</div>
            </li>
          </router-link>
        </span>
      </ul>
    </div>
    <div class="menu-small">
      <ButtonIcon size="lg" icon="bars"/>
      <ul>
        <span v-for="(d,i) in menuHeader" :key="`menu_${i}`">
          <li class="title" v-if="d.isTitle">{{d.label}}</li>
          <router-link v-else :to="d.path">
            <li class="link">
              <i :className="`fa fa-${d.icon} left`"/>
              <span class="menu_label">{{d.label}}</span>
              <div class="menu_count">{{d.count}}</div>
            </li>
          </router-link>
        </span>
      </ul>
    </div>
    {userIcon}
    <!-- <nav>
      <div class="nav-wrapper teal darken-3">
        <div class="left" :style="{paddingLeft:'10px'}">
          <router-link :to="'/'" class="brand-logo">
            <i class="material-icons">widgets</i>
            <b>{{AppConfig.AppName.toUpperCase()}}</b>
          </router-link>
        </div>

        <a href="#" data-target="mobile-demo" class="sidenav-trigger">
          <i class="material-icons">menu</i>
        </a>
        <ul class="right hide-on-med-and-down">
          <li v-for="(d,i) in items" :key="i">
            <router-link :to="d.url">
              <i class="material-icons left">{{d.icon}}</i>
              {{d.label}}
            </router-link>
          </li>
        </ul>
      </div>
    </nav>-->

    <ul class="sidenav" id="mobile-demo">
      <li v-for="(d,i) in items" :key="i">
        <router-link :to="d.url">
          <i class="material-icons left">{{d.icon}}</i>
          {{d.label}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import * as AppConfig from "../../_config/app-config";
import * as ComponentHelper from "../helper/component-helper";

export default {
  data() {
    return {
      AppConfig,
      items: [
        {
          label: "Companies",
          icon: "business",
          url: "u-companies"
        },
        {
          label: "Events",
          icon: "mic",
          url: "u-companies"
        },
        {
          label: "Students",
          icon: "people",
          url: "u-companies"
        }
      ]
    };
  },
  name: "default",
  props: {
    // loggedIn: {
    //   type: Boolean,
    //   default: true
    // }
  },
  computed: {
    ...ComponentHelper.getComputed()
  },
  methods: {
    ...ComponentHelper.getMethods()
  }
};
</script>

<style lang="scss" scoped>
@import "../style/define/_constant.scss";
@import "../style/define/_mixin.scss";

#AppHeader {
  width: 100%;
  @include flex;
  @include flex-align(center);
  height: 100%;
  padding: 10px 0px;

  margin-bottom: 0px;
  background: white;
  text-align: left;
  justify-content: space-between;
  //border-bottom: solid 2px #ccc8c8;
  box-shadow: 1px 4px 5px -3px rgba(0, 0, 0, 0.5);

  .h-left {
    @include flex;
    @include flex-align(center);
    img.logo {
      height: 100%;
    }
    .title {
      // font-family: 'Jockey One';
      // text-transform: uppercase;
      // letter-spacing: 1px;
      text-decoration: none;
      font-size: 25px;
      line-height: 20px;
      font-weight: bold;
      color: $COLOR-BLUE;
    }
    .subtitle {
      font-size: 17px;
      opacity: 0.8;
    }
    .title,
    img.logo {
      cursor: pointer;
    }
    .title:hover,
    img.logo:hover {
      opacity: 0.7;
    }
    .title:active,
    img.logo:active {
      opacity: 1;
    }
  }
  .h-right {
    line-height: 15px;
    margin-right: 10px;
  }

  .user-info {
    text-align: right;

    div {
      margin-bottom: 5px;
    }

    .ui-name {
      font-size: 15px;
      font-weight: bold;
      color: $COLOR-BLUE;
    }

  }
}
</style>
