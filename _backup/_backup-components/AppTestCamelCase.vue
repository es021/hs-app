
<template>
  <div>
    {{movie}}
    <h2>Zul's Test Page</h2>
    <h4>To Camel Case</h4>
    <input type="text" v-model="toCamelCase" @change="toCamelCaseChange"/>
    <br>
    
    <button @click="onClickTest">Click Di Sini</button>

    {{camelCased}}

  </div>
</template>

<script>

export default {
  name: "AppExit",
  data() {
    return {
      toCamelCase: "",
      camelCased: "",
      movie: ""
    };
  },

  methods: {
    onClickTest() {
      this.movie = "lalala";
    },
    toCamelCaseChange() {
      var input = this.toCamelCase;
      console.log(this.toCamelCase);

      var arr = input.split("_");
      var res = "";
      arr.map((d, i) => {
        if (d != "") {
          d = d.toLowerCase();
          var first = d.charAt(0).toUpperCase();
          var rest = d.substring(1, d.length);
          res += first + rest;
        }
      });

      this.camelCased = res;
    }
  }
};
</script>
