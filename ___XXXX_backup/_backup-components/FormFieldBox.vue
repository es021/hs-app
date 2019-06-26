<!-- DO NOT CHANGE ANYTHING HERE -->
<template>
  <div class="form-field">
    <div class="ff-flex">
      <div class="ff-label" :style="labelStyle" :title="labelStyle">            
        {{label}}
      </div>
      <div :style="itemStyle">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormFieldBox",
  props: {
    label: {
      type: String,
      default: ""
    },
    labelWidth: {
      type: Number,
      default: 30
    }
  },
  data() {
    return {
      labelStyle: {},
      itemStyle: {}
    };
  },
  created() {
    this.labelStyle = { width: this.labelWidth + "%" };
    this.itemStyle = { width: 100 - this.labelWidth + "%" };
    this.itemStyle["display"] = "flex";
  }
};
</script>

