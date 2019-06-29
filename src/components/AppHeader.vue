<template>
  <div>
    <nav>
      <div class="nav-wrapper teal darken-3">
        <div class="left" :style="{paddingLeft:'10px'}">
          <a href="#" class="brand-logo">
            <i class="material-icons">widgets</i>App Name Here
          </a>
        </div>

        <a href="#" data-target="mobile-demo" class="sidenav-trigger">
          <i class="material-icons">menu</i>
        </a>
        <ul class="right hide-on-med-and-down">
          <li v-for="(d,i) in items" :key="i">
            <a href="#">{{d}}</a>
          </li>
        </ul>
      </div>
    </nav>

    <ul class="sidenav" id="mobile-demo">
      <li v-for="(d,i) in items" :key="i">
        <a href="#">{{d}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "default",
  props: {
    // loggedIn: {
    //   type: Boolean,
    //   default: true
    // }
  },
  data() {
    return {
      items: ["Companies", "Events", "Students"]
    };
  },
  computed: {
    // ...mapGetters(["authUser"])
  },
  mounted() {},
  methods: {}
};
</script>
