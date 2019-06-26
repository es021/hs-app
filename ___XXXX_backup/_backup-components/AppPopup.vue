<template>
 <div v-if="state.isOpen" class="app-popup">
    <div class="ap-bg" ></div> 
    <div class="ap-body">
      <div class="ap-header">
        {{state.title}}
        <a v-if="state.closeable" class="btn btn-link ap-close" @click="close"><b>X</b></a>
      </div>
      <div class="ap-content">
        <component :is="state.content" v-bind="state.prop"></component>
      </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "AppPopup",
  computed: {
    ...mapGetters({
      state: "popupState"
    })
  },
  methods: {
    ...mapMutations({ close: "popupClose" })
  }
};
</script>