
   
<template>
  <AppContainer :withBanner="true">
    This Is Home
  </AppContainer>
</template>

<script>
import * as ApiHelper from "../../_helper/api-helper";
import * as ComponentHelper from "../helper/component-helper";

export default {
  name: "PageHome",
  data() {
    return {
      user: {},
      loading: false
    };
  },
  created() {},
  mounted() {
    this.X("authIsLoggedIn", this.authIsLoggedIn);
    // this.loading = true;
    // ApiHelper.graphql(
    //   `query{
    //     user(ID:1){
    //       ID email first_name last_name
    //       company {name slug ID}
    //     }
    //   }`
    // ).then(data => {
    //   this.user = data.user;
    //   this.loading = false;
    //   this.X("data", data);
    // });
  },
  computed: {
    ...ComponentHelper.getComputed()
  },
  methods: {
    ...ComponentHelper.getMethods()
  }
};
</script>
