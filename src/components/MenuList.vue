<template>
  <ul>
    <span v-for="(d,i) in data" :key="`menu_${i}`">
      <li class="title" v-if="d.isTitle">{{d.label}}</li>
      <router-link v-else :to="d.path">
        <li class="link">
          <i :className="`fa fa-${d.icon} left`"/>
          <span class="menu_label">{{d.label}}</span>
          <div v-if="d.count" class="menu_count">{{d.count}}</div>
        </li>
      </router-link>
    </span>
  </ul>
</template>

<script>
import * as ComponentHelper from "../helper/component-helper";

export default {
  data() {
    return {};
  },
  name: "MenuList",
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    ...ComponentHelper.getComputed()
  },
  methods: {
    ...ComponentHelper.getMethods()
  }
};
</script>
