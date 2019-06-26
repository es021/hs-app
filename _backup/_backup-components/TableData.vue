
<template>
  <div>
      <h2>{{title}}</h2>
      <div class="table-data">
        <table>
          <thead>
            <tr>
              <th v-for="h in header">{{h}}</th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="d in data" v-bind:key="d[dataKey]" v-if="validRow(d)">
                <td><a class="btn btn-link" @click="editRow(d)"><i class="fa fa-edit"></i></a></td>
                <td><a class="btn btn-link" @click="deleteRow(d)"><i class="fa fa-trash"></i></a></td>
                <td v-for="(col,key) in arrangeData(d)" v-html="renderColumn(d,key,col)"></td>
              </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array
    },
    header: {
      type: Array
    },
    title: {
      type: String
    },
    dataKey: {
      type: String
    },
    arrangeData: {
      type: Function,
      default: d => {
        return d;
      }
    },
    renderColumn: {
      type: Function,
      default: (d, key, col) => {
        return key;
      }
    },
    validRow: {
      type: Function,
      default: d => {
        return true;
      }
    },
    editRow: {
      type: Function,
      default: d => {
        console.log("edit", d);
      }
    },
    deleteRow: {
      type: Function,
      default: d => {
        console.log("delete", d);
      }
    }
  },
  name: "TableData",
  created() {
    this.init();
  },
  methods: {
    init() {}
    // validRow(d) {
    //   if (this.validRowCustom) {
    //     return this.validRowCustom(d);
    //   } else {
    //     return true;
    //   }
    // },
    // arrangeData(d) {
    //   if (this.arrangeDataCustom) {
    //     return this.arrangeDataCustom(d);
    //   } else {
    //     return d;
    //   }
    // },
    // renderColumn(key, col) {
    //   if (this.renderColumnCustom) {
    //     return this.renderColumnCustom(key, col);
    //   } else {
    //     return key;
    //   }
    // }
  }
};
</script>



