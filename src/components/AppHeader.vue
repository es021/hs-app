<template>
  <div>
    <nav>
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
    </nav>

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
import { mapGetters } from "vuex";
import * as AppConfig from "../../_config/app-config";

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
    // ...mapGetters(["authUser"])
  },
  mounted() {},
  methods: {}
};
</script>
