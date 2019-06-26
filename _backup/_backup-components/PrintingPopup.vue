
<template>
  <div :style="parentStyle">
    <div class="btn-group-vertical">
      <button
        :disabled="isDisabled[i] == true"
        v-for="(d,i) in data"
        class="btn btn-blue"
        :key="d.key"
        @click="openPrintingWindow(i, d.id, d.formData, d.label, isLandscapeArr[i], d.limitPrint, d.isUseAutoPrint)"
      >
        {{d.label}}
        <!-- <span v-if="isLandscapeArr[i] == true"> (Landscape)</span> -->
      </button>
      <br>
      <br>
      <a @click="keluarOnClick" class="btn btn-red btn-sm">Keluar</a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {
  openWindowPopup,
  closeWindowPopup,
  generateNaviUrl,
  createGetParam,
  decodeHtml
} from "../helper/util-helper";

import * as PrintingHelper from "../helper/printing-helper";
import { postRequest } from "../helper/api-helper";
import { AlertConst } from "../store/modules/alert";
import {
  PrintingUrl,
  AppRoot,
  TransRoot,
  IsPrintLimitEnabled,
  IsAutoPrintEnabled,
  STORE_PRINT_ID,
  STORE_PRINT_DATA,
  BranchIp,
  PrintingAutoRoot
} from "../config/app-config";

export default {
  name: "PrintingPopup",
  props: {
    openPreview: {
      type: Boolean,
      default: false
    },
    chainTrans: {
      type: String,
      default: null
    },
    chainParam: {
      type: Object,
      default: () => {
        return {};
      }
    },
    parentUrl: {
      type: String,
      default: ""
    },
    data: {
      type: Array,
      default: () => {
        return [
          {
            id: "cetakan_id",
            label: "Sila Define Data",
            isLandscape: false,
            formData: { key: "value" },
            isLimitOnePrint: false,
            limitPrint: null,
            isUseAutoPrint: false
          },
          {
            id: "cetakan_id2",
            label: "Contoh Button Printing",
            isLandscape: false,
            formData: { key: "value" },
            isLimitOnePrint: true,
            limitPrint: null,
            isUseAutoPrint: false
          }
        ];
      }
    }
  },
  data() {
    return {
      limitPrintCount: {},
      isDisabled: {},
      isLandscapeArr: [],
      parentStyle: {
        padding: "40px 50px"
      }
    };
  },
  created() {
    for (var i in this.data) {
      if (typeof this.data[i].isLandscape === "undefined") {
        this.isLandscapeArr[i] = false;
      } else {
        this.isLandscapeArr[i] = this.data[i].isLandscape;
      }

      // limit print
      if (typeof this.data[i].limitPrint !== "undefined") {
        this.$set(this.limitPrintCount, i, this.data[i].limitPrint);
      }
    }
  },
  mounted() {
    // openPreview
    if (this.openPreview == true) {
      let i = 0;
      let d = this.data[i];
      this.openPrintingWindow(
        i,
        d.id,
        d.formData,
        d.label,
        this.isLandscapeArr[i],
        d.limitPrint,
        d.isUseAutoPrint
      );
      this.popupClose();
    }
  },
  methods: {
    keluarOnClick() {
      var yeah = confirm("Keluar Dari Transaksi. Anda Pasti?");

      if (yeah) {
        if (this.chainTrans == null) {
          window.location = generateNaviUrl(this.parentUrl);
        } else {
          var param = this.chainParam;
          var getParam = createGetParam(param);
          var chainUrl = `${TransRoot}/${this.chainTrans}${getParam}`;
          console.log(chainUrl);
          window.location = chainUrl;
        }
      }
    },
    ...mapMutations(["popupClose", "alertOpen"]),
    decreaseLimitCountAndDisabled(index) {
      if (IsPrintLimitEnabled) {
        let curCount = this.limitPrintCount[index];
        if (typeof curCount === "number") {
          this.$set(this.limitPrintCount, index, curCount - 1);
          if (curCount - 1 <= 0) {
            this.$set(this.isDisabled, index, true);
          }
        }
      }
    },
    openPrintingWindow(
      index,
      id,
      formData,
      printLabel,
      isLandscape,
      limitPrint,
      isUseAutoPrint
    ) {
   
      this.decreaseLimitCountAndDisabled(index);

      var target = "printingPopup_" + new Date().getTime();
      var config = "width=500,height=600,left=200,top=50";

      console.log("Priting ID", id);
      console.log("isLandscape", isLandscape);
      console.log("Priting Data", JSON.parse(JSON.stringify(formData)));

      // untk resit bayaran . guna PrintingPreview utk restrict one print only
      if (isUseAutoPrint == true) {
        localStorage.setItem(STORE_PRINT_ID, id);
        localStorage.setItem(STORE_PRINT_DATA, JSON.stringify(formData));
        openWindowPopup(PrintingAutoRoot, target, config);
        return;
      }

      var form = PrintingHelper.getForm(id, formData);
      if (typeof form === "string") {
        alert("Failed to open printing popup\n" + form);
        return;
      }

      //console.log(form);
      if (form !== null) {
        document.body.appendChild(form);

        window.open("about:blank", target, config);
        form.target = target;
        form.submit();

        document.body.removeChild(form);

        if (isLandscape) {
          this.alertOpen({
            type: AlertConst.INFO,
            content: `Untuk dokumen <b>${printLabel}</b> sila pastikan setting printer ditukar kepada <b>LANDSCAPE</b> sebelum mula cetak`,
            closeHandler: null
          });
        }
      }
    }

    // // #######################################################
    // /// HELPER
    // createField(name, value, parent) {
    //   value = this.fixEmptyData(value);

    //   var hiddenField = document.createElement("input");
    //   hiddenField.setAttribute("type", "hidden");
    //   hiddenField.setAttribute("name", name);
    //   hiddenField.setAttribute("value", value);
    //   parent.appendChild(hiddenField);
    // },
    // fixEmptyData(value) {
    //   // SIT jangan letak '-'
    //   if (value == "" || value == null || typeof value == "undefined") {
    //     // return "-";
    //     return "";
    //   } else {
    //     return value;
    //   }
    // },
    // getForm(reportId, formData) {
    //   var form = document.createElement("form");
    //   form.setAttribute("method", "post");
    //   form.setAttribute("action", PrintingUrl);
    //   this.createField("ReportName", reportId, form);

    //   //console.log("ReportData", JSON.stringify(formData));
    //   //console.log("ReportData", formData);

    //   // fix formData
    //   for (var i in formData) {
    //     formData[i] = this.fixEmptyData(formData[i]);

    //     // fix html entities
    //     let v = formData[i];
    //     if (typeof v == "string") {
    //       if (v.indexOf(">") <= -1 && v.indexOf("<") <= -1) {
    //         formData[i] = decodeHtml(v);
    //       }
    //     }
    //   }

    //   this.createField("ReportData", JSON.stringify(formData), form);
    //   return form;
    // }
  }
};
</script>
