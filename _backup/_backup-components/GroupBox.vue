
<template>
  <div class="group-box">
    <div class="gb-title">
      {{title}}
    </div>
    <div class="gb-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "GroupBox",
  props: {
    title: {
      type: String
    }
  },
  data() {
    return {};
  }
};
</script>
