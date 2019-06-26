
<template>
  <div>
      <div class="list-table">
        <table>
          <thead>
            <tr>
              <th v-for="h in header">{{h}}</th>
            </tr>
          </thead>
          <tbody>
              <slot></slot>
          </tbody>
        </table>
        <br><br>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    header: {
      type: Array
    }
  },
  name: "TableStatic",
  created() {},
  methods: {}
};
</script>



