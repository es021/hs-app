
<template>
<div>
    <h3>Home</h3>
    <LoaderCircular :loading="loading" size="small"></LoaderCircular>

    <div class="container">
      <div class="row">
        <div class="col s12">
          <div class="card-panel teal lighten-2">test</div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import * as ApiHelper from "../../_helper/api-helper";

export default {
  name: "default",
  data() {
    return {
      loading: false
    };
  },
  created() {},
  mounted() {
    this.loading = true;
    ApiHelper.graphql(
      `query{
        messages_count(user_id:12){
          total_unread
        }
      }`
    ).then(data => {
      //this.loading = false;
      console.log(data);
    });
  },
  methods: {}
};
</script>
