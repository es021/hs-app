
   
<template>
  <AppContainer :withBanner="true">
    <h2>Home</h2>
  </AppContainer>
</template>

 <!-- <h3>Home</h3> -->
    <!-- <LoaderCircular :loading="loading" size="small"></LoaderCircular>
    {{user}}
    <div class="container">
      <div class="row">
        <div class="col s12">
          <div class="card-panel teal lighten-2">test</div>
        </div>
      </div>
    </div>-->
    
<script>
import * as ApiHelper from "../../_helper/api-helper";

export default {
  name: "default",
  data() {
    return {
      user: {},
      loading: false
    };
  },
  created() {},
  mounted() {
    // this.loading = true;
    // ApiHelper.graphql(
    //   `query{
    //     user(ID:136){
    //       ID user_email first_name last_name
    //     }
    //   }`
    // ).then(data => {
    //   this.user = data.user;
    //   this.loading = false;
    //   console.log(data);
    // });
  },
  methods: {}
};
</script>
