
<template>
  <div>
    <JpnHeader :loggedIn="false"></JpnHeader>
    <div v-bind:style="{backgroundImage:backgroundImage}" class="jpn-login">
      <h2>Session User Tamat</h2>
      <p>
        Berjaya Log Keluar
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppExit",
  data() {
    return {
      backgroundImage: `url('${require(`../image/content-bg.jpg`)}')`
    };
  }
};
</script>
