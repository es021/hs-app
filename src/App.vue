<template>
  <div id="app" >
    <AppPopup></AppPopup>
    <AppAlert></AppAlert>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {},
  // watch: {
  //   $route(to, from) {
  //     if (to.path != from.path) {
  //       location.reload();
  //     }
  //   }
  // },
  methods: {}
};
</script>

<style>
.break-all {
  word-break: break-all !important;
}

html {
  height: 100%;
  width: 100%;
}

html,
body {
  font-family: "Montserrat", Helvetica, sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
