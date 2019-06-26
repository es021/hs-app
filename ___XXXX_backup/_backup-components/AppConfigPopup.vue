<template>
 <div :style="{margin:'10px'}">
   <div v-if="loading">
     Loading...
   </div>
   <div v-else>
      <FormField type="radiobox"
            :name="TransMeta.IS_USE_SERVER_MOCK_DATA"
            label="Is Use Mock Data"
            :value="val[TransMeta.IS_USE_SERVER_MOCK_DATA]"
            :dataset="dataset.yesNo" 
            @onChange="onChange">
          </FormField>

      <FormField type="select"
        :isCaseSensitive="true"
        :name="TransMeta.MOCK_DATA_NAME"
        label="Mock Data Existing Filename"
        :value="val[TransMeta.MOCK_DATA_NAME]"
        :dataset="dataset.fileList"
        @onChange="onChangeFileSelect">
      </FormField>

      <FormField type="text"
        :isCaseSensitive="true"
        :name="TransMeta.MOCK_DATA_NAME"
        label="Mock Data New Filename"
        :value="val[TransMeta.MOCK_DATA_NAME]"
        :dataset="dataset.fileList"
        @onChange="onChange">
      </FormField>

      <div :style="{textAlign:'left'}">
        <b>Mock Data Content</b>
      </div>
      <FormField type="textarea"
        :isCaseSensitive="true"
        :hideLabel="true"
        :name="CONTENT"
        :label="null"
        :value="val[CONTENT]"
        :rows="15"
        :labelWidth="0"
        :inputStyle="{height:'auto'}"
        @onChange="onChangeTextarea">
      </FormField>

      <!-- <div v-if="val[TransMeta.MOCK_DATA_NAME] != ''">
        <br>
        <a target="_blank" :href="getUrl(val[TransMeta.MOCK_DATA_NAME])">
          View Mock Data <b>{{val[TransMeta.MOCK_DATA_NAME]}}</b>
        </a>
        <br>
        <br>
      </div> -->

      <!-- <button class="btn btn-green" @click="onConfirm">Confirm</button> -->
    
      <button @click="onConfirmClick" :disabled="confirmDisabled" class="btn btn-green">Confirm</button>
      <br>
      <br>
      <h3>Current Configuration</h3>
      <pre>{{val}}</pre>
   </div>
</div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { TransMeta } from "../store/modules/transaction";
import { getRequest, mockDataCreate, mockDataGet } from "../helper/api-helper";
import { BranchIp } from "../config/app-config";

export default {
  name: "AppConfigPopup",
  computed: {
    ...mapGetters(["transactionMetaData", "authUser"])
  },

  data() {
    return {
      confirmDisabled: false,
      CONTENT: "CONTENT",
      loading: true,
      indexUrl: `${BranchIp}/soap-middleware/mock-data/index.jsp`,
      getUrl: fileName =>
        `${BranchIp}/soap-middleware/mock-data/${fileName}.json`,
      //createUrl: `${BranchIp}/soap-middleware/mock-data-create.jsp`,
      TransMeta: TransMeta,
      dataset: {
        yesNo: [{ value: "1", label: "Yes" }, { value: "0", label: "No" }],
        fileList: []
      },
      val: {},
      defaultVal: {},
      // edit here to add more key involved
      keyInvolved: [TransMeta.IS_USE_SERVER_MOCK_DATA, TransMeta.MOCK_DATA_NAME]
    };
  },

  mounted() {
    this.loadAllJsonFile();
    // edit here to add more key involved
    this.defaultVal[TransMeta.IS_USE_SERVER_MOCK_DATA] = "0";
    this.defaultVal[TransMeta.MOCK_DATA_NAME] = "";

    for (var i in this.keyInvolved) {
      let key = this.keyInvolved[i];
      let v = this.transactionMetaData[key];
      let defV = this.defaultVal[key];
      let toSetVal = "";
      if (typeof v === "undefined" && typeof defV !== "undefined") {
        toSetVal = defV;
      } else {
        toSetVal = v;
      }
      this.setVal(key, toSetVal);
      this.updateTransMeta(key, toSetVal);
    }
  },

  methods: {
    createHtmlDomFromString(str) {
      str = str.trim();
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(str, "text/xml");
      return xmlDoc;
    },
    getFileNameFromText(txtA) {
      // 1060_tab1.json - 12/07/2018 12:05:20
      if (typeof txtA === "string") {
        let fileName = txtA.split(".json");
        fileName = fileName[0];
        return fileName;
      } else {
        return "";
      }
    },
    loadAllJsonFile() {
      this.loading = true;
      getRequest({
        url: this.indexUrl,
        success: res => {
          this.dataset.fileList = [];
          try {
            res = "<div>" + res + "</div>";
            res = res.replaceAll("<br>", "");
            let html = this.createHtmlDomFromString(res);
            let arrLink = html.getElementsByTagName("a");

            let objCode = {};
            let keys = [];

            for (var i in arrLink) {
              let ref = arrLink[i].innerHTML;
              if (typeof ref !== "string") {
                continue;
              }
              if (ref.replaceAll(" ", "") == "" || ref.indexOf("index") >= 0) {
                continue;
              }

              let fileName = this.getFileNameFromText(ref);
              objCode[fileName] = ref;
              keys.push(fileName);
            }

            // sort by key
            keys.sort();
            this.dataset.fileList.push({
              value: "",
              label: "-- Sila Pilih --"
            });
            for (var i in keys) {
              let refCode = keys[i];
              this.dataset.fileList.push({
                value: refCode,
                label: objCode[refCode]
              });
            }
          } catch (err) {
            console.error("err onLoadPertanyaan", err);
          }
          this.loading = false;
        },
        error: err => {
          alert("Failed to fetch mock data list");
          this.loading = false;
        }
      });
    },
    ...mapMutations(["transUpdateMetaData", "popupClose"]),
    onChange(name, value, error, ref) {
      if (value == null || typeof value === "undefined") {
        return;
      }
      this.setVal(name, value); //val[name] = value;
      this.onConfirm();
    },
    onChangeTextarea(name, value, error, ref) {
      this.onChange(name, value, error, ref);

      if (this.val[TransMeta.MOCK_DATA_NAME] == "") {
        this.confirmDisabled = false;
      }

      if (value == null || value == "") {
        //this.confirmDisabled = true;
        return;
      }

      let jsonObj = {};
      try {
        jsonObj = JSON.parse(value);
        this.confirmDisabled = false;
      } catch (err) {
        this.confirmDisabled = true;
        alert(
          "Mock Data Content Is Not A Valid JSON Object. Please Reformat Data to follow JSON format"
        );
      }
    },
    onChangeFileSelect(name, value, error, ref) {
      this.onChange(name, value, error, ref);
      if (value != "" && value != null) {
        this.setVal(TransMeta.IS_USE_SERVER_MOCK_DATA, "1");

        // load content of file
        mockDataGet(
          value,
          res => {
            res = res.trim();
            this.setVal(this.CONTENT, res);
          },
          err => {}
        );
      } else {
        this.setVal(this.CONTENT, "");
        this.setVal(TransMeta.IS_USE_SERVER_MOCK_DATA, "0");
      }
    },
    setVal(name, value) {
      this.setDataObj("val", name, value);
    },
    setDefaultVal(name, value) {
      this.setDataObj("defaultVal", name, val);
    },
    setDataObj(key, name, value) {
      this.$set(this[key], name, value);
    },
    onConfirm() {
      for (var i in this.keyInvolved) {
        let key = this.keyInvolved[i];
        let v = this.val[key];
        let defV = this.defaultVal[key];
        let toSetVal = "";
        if (typeof v === "undefined" && typeof defV !== "undefined") {
          toSetVal = defV;
        } else {
          toSetVal = v;
        }
        this.setVal(key, toSetVal);
        this.updateTransMeta(key, toSetVal);
      }
    },
    onConfirmClick() {
      var filename = this.val[TransMeta.MOCK_DATA_NAME];
      var content = this.val[this.CONTENT];

      if (
        filename != "" &&
        filename != null &&
        typeof filename !== "undefined" &&
        content != "" &&
        content != null &&
        typeof content !== "undefined"
      ) {
        content = JSON.parse(content);
        // update mock data from textarea
        mockDataCreate(
          filename,
          content,
          res => {
            this.popupClose();
          },
          err => {
            alert("Failed to update mock-data content");
          }
        );
      } else {
        this.popupClose();
      }
    },
    getTransMeta(key) {
      return this.transactionMetaData[key];
    },
    updateTransMeta(key, value) {
      this.transUpdateMetaData({
        key: key,
        value: value
      });
    }
  }
};
</script>