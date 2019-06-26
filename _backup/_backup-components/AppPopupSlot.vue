<template>
 <div v-if="isOpen" class="app-popup ap-slot">
    <div class="ap-bg" ></div> 
    <div class="ap-body">
      <div class="ap-header">
        {{title}}
        <a class="btn btn-link ap-close" @click="closeHandler"><b>X</b></a>
      </div>
      <div class="ap-content">
        <slot></slot>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: "AppPopupSlot",
  props: {
    title: {
      type: String,
      default: "Title Popup Slot"
    },
    isOpen: {
      type: Boolean,
      default: true
    },
    closeHandler: {
      type: Function,
      default: () => {
        console.log("closeHandler");
      }
    }
  },

  methods: {}
};
</script>