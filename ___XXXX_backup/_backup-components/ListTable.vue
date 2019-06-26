
<template>
  <div>
       <div>

      <div class="list-table" :style="styleParent">
        <table>
          <thead>
            <tr>
              <th :key="`header-${h}`" v-for="h in header">{{h}}</th>
            </tr>
          </thead>
          <tbody :class="{stripped: isStripped == true}">
              <tr :class="{clickable: onRowClick !== null, selected : i == selected}" @click="onRowClick(d, i)" v-for="(d,i) in data" v-bind:key="d[dataKey]">
                <!-- <td><a class="btn btn-link" @click="editRow(d)"><i class="fa fa-edit"></i></a></td>
                <td><a class="btn btn-link" @click="deleteRow(d)"><i class="fa fa-trash"></i></a></td> -->
                <!-- <td v-for="(col,key) in arrangeData(d)">{{col}}</td> -->
                <td :key="`col-${key}`" v-for="(col,key) in arrangeData(d)" v-html="col"></td>
                <td :key="`action-${actIndex}`" class='text-blue' v-for="(text, actIndex) in actions" v-html="text" @click="actionsOnClick[actIndex](d, i)"></td>
              </tr>
          </tbody>
        </table>
        <br><br>
      </div>

       </div> 

  </div>
</template>

<script>
export default {
  props: {
    actions: {
      type: Array,
      default: () => {
        return [];
      }
    },
    actionsOnClick: {
      type: Array,
      default: () => {
        return [];
      }
    },
    maxHeight: {
      type: String,
      default: null
    },
    data: {
      type: Array
    },
    isStripped: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Number,
      default: -1
    },
    header: {
      type: Array
    },
    dataKey: {
      type: String
    },
    arrangeData: {
      type: Function,
      default: d => {
        //console.log(d);
        return d;
      }
    },
    onRowClick: {
      type: Function,
      default: (d, i) => {
        console.log("default onRowClick", i, d);
      }
    },
    renderColumn: {
      type: Function,
      default: (d, key, col) => {
        return col;
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
  name: "ListTable",
  created() {
    this.init();
  },
  data() {
    return {
      styleParent: {}
    };
  },
  methods: {
    init() {
      if (this.maxHeight !== null) {
        this.styleParent = { maxHeight: this.maxHeight, overflowY: "scroll" };
      }
    }
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



