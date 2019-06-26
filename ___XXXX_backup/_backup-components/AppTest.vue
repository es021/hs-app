
<template>
  <div>
    <h2>Test Page</h2>

    <input type="text" v-model="model" @change="onChangeInput"/>
    <input type="text" :disabled="isDisabled" />

    </div>
    
</template>

<script>
// Data Binding
// logic - view

// event Binding
// on Click
// on Change
// on Blur
// on Keypress
// @

export default {
  name: "AppTest",
  data() {
    return {
      isDisabled: false,
      isShowing: false,
      model2: "",
      model: "",
      movie: "Test Movie 2"
    };
  },

  methods: {
    onClick2() {
      alert(this.model2);
    },
    onChange2() {},
    onClickTest() {
      this.isShowing = !this.isShowing;
    },
    onChangeInput() {
      if (this.model == "") {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    }
  }
};
</script>
