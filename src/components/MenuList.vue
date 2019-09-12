<template>
  <ul>
    <div class="menu-item" v-for="(d,i) in data" :key="`menu_${i}`">
      <li class="title" v-if="d.isTitle">{{d.label}}</li>
      <router-link v-else :to="d.path">
        <li 
          :class="{'link' : true, 'active' : isActive(d)}"
          @mouseover="(e) => { if(isActive(d)) return; onMouseoverLi(e) }" 
          @mouseout="(e) => { if(isActive(d)) return; onMouseoutLi(e) }">
            <i v-if="d.icon" :style="iconStyle" class="material-icons left">{{d.icon}}</i>
            <span class="menu_label">{{d.label}}</span>
          <div v-if="d.count" class="menu_count">{{d.count}}</div>
        </li>
      </router-link>
    </div>
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
    onMouseoverLi: {
      type: Function,
      default: () => {
        return;
      }
    },
    onMouseoutLi: {
      type: Function,
      default: () => {
        return;
      }
    },
    iconStyle: {
      type: Object,
      default: () => {
        return {};
      }
    },
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
    ...ComponentHelper.getMethods(),
    isActive(d) {
      if (d.path == this.$route.path) {
        return true;
      }
      return false;
    }
  }
};
</script>
