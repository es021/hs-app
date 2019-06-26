
<template>
  <div v-if="!isProd">
     <FormField type="textarea"  
                  :label="'Text Input'"
                  :name="name" 
                  :value="formValue[name]"
                  @onChange="onChangeGen2"></FormField>


    <div :style="{textAlign:'left'}" v-for="tab in newFc" :key="tab">
      {{buangQuote(JSON.stringify(tab))}}
      <br>
      <br>
    </div>

    <div :style="{textAlign:'left'}" v-html="view"></div>
    <hr>
    <h3>New Fc Based On Ca Gen Punya Work List</h3>
    <div :style="{textAlign:'left'}" v-for="tab in view2" :key="tab">
      {{buangQuote(JSON.stringify(tab))}}
      <br>
      <br>
    </div>
      

  </div>
</template>

<script>
//import * as FC from "../../SKC/T341060/field-config";
import { isProd } from "../config/app-config";

export default {
  name: "FcBuilder",
  props: {
    FC: {
      type: Object
    }
  },
  data() {
    return {
      generateNew: {},
      isProd: isProd,
      newFc: {},
      view: "",
      mapGen: {},
      name: "nameTextarea",
      nameFc: "nameFc",
      formValue: {}
    };
  },
  mounted() {},
  methods: {
    getStandardFcName(name) {
      // - Fid1001NoPermohonan -> Fid1001
      let standardKey = name;
      let key = name.toUpperCase();
      if (key.indexOf("FID") == 0) {
        // get all number after FID
        let fidNum = "";
        for (var idx = 3; idx < key.length; idx++) {
          let number = key[idx];
          number = Number.parseInt(number);
          if (!isNaN(number)) {
            fidNum += number;
          } else {
            break;
          }
        }
        standardKey = "Fid" + fidNum;
      }
      return standardKey;
    },
    toCamelCase(input) {
      let arr = input.split("_");
      let toRet = "";
      for (var i in arr) {
        let a = arr[i].toLowerCase();
        toRet += a[0].toUpperCase() + a.substring(1);
      }

      return toRet;
    },
    processDataGen2(value) {
      let arr = value.split("\n");
      let view = "";

      let fidByTab = {};
      let currentRow = "";
      for (var i in arr) {
        let row = arr[i];
        if (row.indexOf("ATTRIBUTE") >= 0) {
          let rowArr = row.split(" ");
          let fid = "";
          for (var k in rowArr) {
            let col = rowArr[k];
            if (col.indexOf("FID") == 0) {
              fid = this.toCamelCase(col);
              this.mapGen[this.getStandardFcName(fid)] = fid;
            }
          }
          view += `${fid}<br>`;
          fidByTab[currentRow].push(fid);

          //console.log(rowArr);
        } else {
          currentRow = row;
          fidByTab[currentRow] = [];
          view += `<br><br>TAB : ${row}<br>`;
        }
      }

      this.view = view;

      this.view2 = "";

      let fcObj = {};
      let index = 1;
      for (var i in fidByTab) {
        let tabKey = "T" + index;
        fcObj[tabKey] = {};
        for (var j in fidByTab[i]) {
          let fid = fidByTab[i][j];
          let key = fid.substring(8);
          let firstLetter = fid[7];
          firstLetter = firstLetter.toLowerCase();
          key = firstLetter + key;
          let name = fid;
          let label = fid.substring(7);

          fcObj[tabKey][key] = {
            name: name,
            label: label
          };
        }

        index++;
      }

      this.view2 = fcObj;
      console.log("fcObj", fcObj);

      let fcNew = {};
      let FC = this.FC;
      for (var tab in FC) {
        fcNew[tab] = {};
        for (var k in FC[tab]) {
          let name = FC[tab][k].name;
          let newName = this.mapGen[this.getStandardFcName(name)];

          if (typeof newName === "undefined") {
            newName = name;
          }

          fcNew[tab][k] = FC[tab][k];
          fcNew[tab][k].name = newName;
        }
      }
      // fcNew = JSON.stringify(fcNew);
      this.newFc = fcNew;
    },
    processDataGen(value) {
      let arr = value.split("\n");
      let view = "";
      for (var i in arr) {
        let row = arr[i];
        if (row.indexOf("ATTRIBUTE") >= 0) {
          let rowArr = row.split(" ");
          let fid = "";
          for (var k in rowArr) {
            let col = rowArr[k];
            if (col.indexOf("FID") == 0) {
              fid = this.toCamelCase(col);
              this.mapGen[this.getStandardFcName(fid)] = fid;
            }
          }
          view += `${fid}<br>`;
          console.log(rowArr);
        } else {
          view += `<br><br>TAB : ${row}<br>`;
        }
      }

      this.view = view;

      let fcNew = {};
      let FC = this.FC;
      for (var tab in FC) {
        fcNew[tab] = {};
        for (var k in FC[tab]) {
          let name = FC[tab][k].name;
          let newName = this.mapGen[this.getStandardFcName(name)];

          if (typeof newName === "undefined") {
            newName = name;
          }

          fcNew[tab][k] = FC[tab][k];
          fcNew[tab][k].name = newName;
        }
      }
      // fcNew = JSON.stringify(fcNew);
      this.newFc = fcNew;
    },
    buangQuote(text) {
      if(typeof text !== "string"){
        return "";
      }
      text = text.replace(/\"([^(\")"]+)\":/g, "$1:");
      return text.substring(1, text.length - 1);
    },
    // processDataFC(value) {
    //   let arr = value.split("\n");
    //   console.log(arr);

    //   let currentObj = {};
    //   let objText = "";

    //   let objStart = false;
    //   let objEnd = false;

    //   let allObj = {};
    //   for (var i in arr) {
    //     let row = arr[i];
    //     if (row.indexOf(": {") >= 0) {
    //       // start
    //       objStart = true;
    //     }

    //     if (row.indexOf("},") >= 0) {
    //       objEnd = true;
    //     }

    //     if (objStart && !objEnd) {
    //       objText += row;
    //     }

    //     if (objStart && objEnd) {
    //       console.log("++++++++++++++++++++++++++++++++=");
    //       let objCreate = `{${objText}}`;

    //       try {
    //         objCreate = JSON.parse(objCreate);
    //       } catch (err) {}
    //       console.log(objCreate);
    //       objText = "";
    //       objStart = false;
    //       objEnd = false;
    //     }
    //   }
    // },
    onChangeGen(name, value, error, ref) {
      this.$set(this.formValue, name, value);
      this.processDataGen(value);
    },
    onChangeGen2(name, value, error, ref) {
      this.$set(this.formValue, name, value);
      this.processDataGen2(value);
    },
    onChangeFC(name, value, error, ref) {
      this.$set(this.formValue, name, value);
      this.processDataFC(value);
    }
  }
};
</script>
