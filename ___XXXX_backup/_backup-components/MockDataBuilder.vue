
<template>
  <div v-if="!isProd">
    <div  v-for="(tab,i) in fc" :key="i">
        <GroupBox :title="i" >
          <div v-for="(item,k) in tab" :key="k">
              <div v-if="!hasChildren(item)">
                <FormField type="text" 
                  :label="item.label"
                  :name="item.name" 
                  :value="formValue[item.name]"
                  @onChange="onChange"></FormField>
              </div>
              <div v-else>
                <div v-for="(ch,c) in item.children" :key="c">
                  <FormField type="text" 
                    :label="item.label + ' - ' + ch"
                    :name="ch" 
                    :value="formValue[ch]"
                    @onChange="onChange"></FormField>
                </div>
              </div>
          </div>
        </GroupBox>
    </div>
    <button class="btn btn-blue" @click="createMockData">Create Mock Data</button>
    <GroupBox title="Mock Data" >
      {{mockData}}
     </GroupBox>
  </div>
</template>

<script>
import { isProd } from "../config/app-config";

export default {
  name: "MockDataBuilder",
  props: {
    fc: {
      type: Object
    },
    isJournalData: {
      type: Boolean,
      default: false
    },
    createTabName: {
      type: Function,
      default: index => {
        return `Tab${index}`;
      }
    }
  },
  data() {
    return {
      isProd: false,
      formValue: {},
      mockData: {}
    };
  },
  mounted() {
    this.isProd = isProd;
    for (var i in this.fc) {
      for (var j in this.fc[i]) {
        this.formValue[this.fc[i][j].name] = null;
      }
    }
  },
  methods: {
    hasChildren(item) {
      if (typeof item.children !== "undefined") {
        return true;
      }

      return false;
    },
    createMockData() {
      let mockData = {};
      let index = 1;

      let journalData = {};

      for (var i in this.fc) {
        let tab = this.createTabName(index);
        mockData[tab] = [];
        let datas = {};
        for (var j in this.fc[i]) {
          let item = this.fc[i][j];
          let itemName = item.name;

          if (typeof item.children !== "undefined") {
            for (var ch in item.children) {
              let name = item.children[ch];
              let val = this.formValue[name];
              if (val == null || val == "") {
                continue;
              } else {
                datas[name] = val;
                journalData[name] = val;
              }
            }
          } else {
            let name = item.name;
            let val = this.formValue[name];
            if (val == null || val == "") {
              continue;
            }
            datas[name] = val;
            journalData[name] = val; // journal
          }
        }
        index++;
        mockData[tab].push(datas);
      }

      if (this.isJournalData) {
        this.mockData = journalData;
      } else {
        this.mockData = mockData;
      }
    },
    onChange(name, value, error, ref) {
      this.$set(this.formValue, name, value);
    }
  }
};
</script>
