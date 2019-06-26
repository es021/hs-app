
<template>
  <div :style="parentStyle">
    <div v-if="resStore === null">
      <h3>Masukkan ID Penyelia</h3>
      <div class="form-field">
        <div class="ff-item ff-no-label">
          <input
            type="text"
            name="penyelia_id"
            label="Masukkan ID Penyelia"
            v-model="penyelia_id"
            @change="onChange"
          >
        </div>
      </div>
      <div v-if="errorMesValidation != null" :style="{color:'red'}">
        <b>{{errorMesValidation}}</b>
      </div>
      <div v-if="loadingValidation">
        <i class="fa fa-spinner fa-pulse"></i>
      </div>
      <div class="btn-group-vertical">
        <button @click="sahClick" :disabled="disabledSah || loadingSah" class="btn btn-green">
          Sahkan Pengguna
          <span v-if="loadingSah">
            <i class="fa fa-spinner fa-pulse"></i>
          </span>
        </button>
        <button @click="kembaliOnClick" :disabled="disabledKembali" class="btn btn-red">Kembali</button>
      </div>
    </div>

    <div v-else>
      <div v-if="errorMes != null">Request Failed : {{errorMes}}</div>
      <div v-else-if="authed">
        <h2>Pengesahan Berjaya</h2>
      </div>
      <div v-else>
        <h2 class="text-red">Pengesahan Gagal</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {
  AppRoot,
  STORE_FINGERPRINT,
  BranchIp,
  isProd
} from "../config/app-config";
import { openWindowPopup, closeWindowPopup } from "../helper/util-helper";
import * as ApiHelper from "../helper/api-helper";
import { convertDecToBinary } from "../helper/util-helper";

export default {
  name: "FingerprintPopup",
  props: {
    isOperatorValid: Boolean,
    default: false,
    success: Function,
    default: res => {
      console.log("PopupFingerprint", "success", res);
    },
    error: Function,
    default: res => {
      console.log("PopupFingerprint", "error", res);
    },
    onClose: Function,
    default: res => {
      console.log("PopupFingerprint", "onClose", res);
    }
  },
  data() {
    return {
      BIT_PENYELIA: 3,
      BIT_OPERATOR: 1,
      penyelia_id: "",
      disabledSah: true,
      disabledKembali: false,
      loadingSah: false,
      resStore: null,
      parentStyle: {
        padding: "0px 50px",
        paddingBottom: "40px"
      },
      loadingValidation: false,
      errorMes: null,
      errorMesValidation: null // ni utk mula2 nk cek penyelia
    };
  },
  computed: {
    ...mapGetters(["transactionTransCode"])
  },
  methods: {
    kembaliOnClick() {
      this.popupClose();
      if (this.onClose) {
        this.onClose();
      }
    },
    onChange() {
      if (this.penyelia_id != "") {
        this.disabledSah = false;
      } else {
        this.disabledSah = true;
      }

      if (typeof this.penyelia_id === "string") {
        this.penyelia_id = this.penyelia_id.toUpperCase();
      }
    },
    penyeliaValidHandler(authClass, authLevel) {
      if (!isProd) {
        // debug
        this.success(this.penyelia_id, "8", "111111");
        return;
      }

      var penyeliaId = this.penyelia_id;

      this.initSah();

      var callbackUrl = AppRoot; // "/#/fingerprint-response";

      // need fingerprint.war dalam jboss
      var apiUrl =
        BranchIp +
        `/fingerprint/myDevice.jsp` +
        `?spvrid=${penyeliaId}` +
        `&path=${callbackUrl}` +
        `&codeBase=${BranchIp}/fingerprint/`;

      // open window popup for jsp fingerprint
      // the jar will open up our callback url
      // which will set response to the local storage STORE_FINGERPRINT
      var width = 200,
        height = 200,
        top = 50,
        left = 50;

      openWindowPopup(apiUrl, STORE_FINGERPRINT, width, height, top, left);

      // test je ni
      // setTimeout(() => {
      //   openWindowPopup(
      //     callbackUrl + "?name=1",
      //     STORE_FINGERPRINT,
      //     width,
      //     height,
      //     top,
      //     left
      //   );
      // }, 1000);

      // this function will keep checking if local storage STORE_FINGERPRINT
      // is updated or not
      this.checkLocalStorage();
    },
    sahClick() {
      var penyeliaId = this.penyelia_id;
      if (penyeliaId == "") {
        return;
      }

      if (!isProd) {
        // debug
        this.penyeliaValidHandler();
        return;
      }

      // KENA CHECK SAMA ADA USER NI ADALAH SUPERVISOR
      // bit KETIGA
      // dari operClass txn ni
      this.errorMesValidation = null;
      this.loadingValidation = true;
      let param = {};
      param[ApiHelper.LocalActionParam.UserId] = penyeliaId;
      ApiHelper.localTransRequest(
        ApiHelper.LocalAction.INQ_USER,
        param,
        res => {
          this.loadingValidation = false;
          console.log(res);
          if (!Array.isArray(res) || res.length < 1) {
            this.errorMesValidation = `ID Penyelia '${penyeliaId}' Tidak Dijumpai`;
            return;
          }
          let txnCode = this.transactionTransCode;
          let txnClass = txnCode[1];
          let operCol = "OPER_LVL" + txnClass;
          let operLvl = res[0][operCol];
          operLvl = convertDecToBinary(operLvl);

          let bitPenyelia = operLvl[this.BIT_PENYELIA - 1];
          let bitOperator = operLvl[this.BIT_OPERATOR - 1];

          console.log("bitPenyelia", bitPenyelia);
          console.log("bitOperator", bitOperator);
          console.log("operCol", operCol);
          console.log("operLvl", operLvl);

          if (
            bitPenyelia == "1" ||
            (this.isOperatorValid && bitOperator == "1")
          ) {
            console.log("validation penyelia valid");
            this.penyeliaValidHandler(txnClass, operLvl);
          } else {
            let operText = "";
            if (this.isOperatorValid) {
              operText = "Atau Operator ";
            }
            this.errorMesValidation = `ID '${penyeliaId}' Bukan Level Penyelia ${operText}(${operCol})`;
            return;
          }
        },
        err => {
          this.loadingValidation = false;
          console.error(err);
          this.errorMesValidation = err;
        }
      );

      return;
    },
    checkLocalStorage() {
      var interval = setInterval(() => {
        var ls = localStorage.getItem(STORE_FINGERPRINT);
        console.log("check", ls);

        if (ls !== null) {
          this.resStore = JSON.parse(ls);
          clearInterval(interval);
          this.finishSah();
        }
      }, 500);
    },
    initSah() {
      localStorage.removeItem(STORE_FINGERPRINT);
      this.resStore = null;
      this.loadingSah = true;
      this.disabledKembali = true;
    },
    finishSah() {
      closeWindowPopup(STORE_FINGERPRINT);

      if (this.resStore.err !== null) {
        this.errorMes = this.resStore.err;
      } else {
        this.errorMes = null;
        if (this.resStore.res == "1") {
          this.authed = true;
          console.log("open success");
          this.success(this.penyelia_id);
        } else {
          this.authed = false;
          console.log("open error");
          this.error(this.penyelia_id);
        }
      }
    },
    ...mapMutations(["popupClose"])
  }
};
</script>
