import {
  mapGetters,
  mapMutations
} from "vuex";
import * as ApiHelper from "./api-helper";
import * as TimeHelper from "./time-helper";
import {
  TransMeta
} from "../store/modules/transaction";
import {
  RefNewCode,
  RefNewDesc,
  IsSkipLoadRef
} from "../config/app-config";
import {
  AlertConst
} from "../store/modules/alert";

export function getGetters() {
  return [
    "authUser",
    "transactionState",
    "transactionCurrentTabId",
    "transactionFormObjectByName", // key, tab, name
    "transactionFormValueByName", // tab, name
    "transactionFormObject", // key, tab
    "transactionDataset",
    "transactionRefTable",
    "transactionCurrentTabId",
    "transactionMetaData",
    "transactionRefTableRaw"
  ];
}

export function getMutations() {
  return [
    "alertOpen",
    "transSetEnabledTab",
    "transAddEnabledTab",
    "transRemoveEnabledTab",
    "transSetTabData", // tabData
    "transSetRefTable", // { key, data }
    "transSetFormObject", // { key, tab, data }
    "transSetFormObjectByName", // { key, tab, name, data }
    "transSetMetaData", // { key, value }
  ];
}

export function getExtraData() {
  return {
    formValue: {},
    formDisabled: {},
    formRequired: {},
    formError: {},
    formRef: {},
  }
}

export function getAllComputed() {
  return {
    ...mapGetters(getGetters())
  }
}

export function getAllMethod() {
  return {
    startCreated() {
      this.loading = true;
      this.transSetTabData(this.tabData);
      this.transSetEnabledTab(this.initialTabEnabled);
      this.loadAllRefTable();

      // // set tab meta data
      // this.transSetMetaData({
      //   key: TransMeta.BREADCRUMBS,
      //   value: this.breadcrumbs
      // });

      // sham
      // set time transaction start
      this.transSetMetaData({
        key: TransMeta.TIME_START,
        value: TimeHelper.getTimeStringNow()
      });

    },
    alertInfo(content, closeHandler) {
      this.alertOpen({
        type: AlertConst.INFO,
        content: content,
        closeHandler: closeHandler
      });
    },
    alertError(content, closeHandler) {
      this.alertOpen({
        type: AlertConst.ERROR,
        content: content,
        closeHandler: closeHandler
      });
    },
    getDerivedRefTable(ref) {
      // the ref {table, field, derivedFrom, filter(value, label)}
      let toRet = [];
      let oriTable = this.transactionRefTableRaw(ref.derivedFrom);
      for (var i in oriTable) {
        let value = oriTable[i][RefNewCode];
        let label = oriTable[i][RefNewDesc];
        if (ref.filter(value, label)) {
          let objNew = {};
          objNew[RefNewCode] = value;
          objNew[RefNewDesc] = label;
          toRet.push(objNew);
        }
      }
      return toRet;
    },
    loadAllRefTable() {


      let totalToLoad = 0;
      for (var i in this.refTable) {
        if (typeof this.refTable[i].derivedFrom === "undefined") {
          totalToLoad++;
        }
      }

      if (totalToLoad <= 0) {
        this.loading = false;
        return;
      }

      ApiHelper.loadRefTable(
        this.refTable,
        (key, data) => {
          //progress Handler
          this.transSetRefTable({
            key: key,
            data: data
          });
          this.refTableCompleted++;

          // when all finished
          if (totalToLoad == this.refTableCompleted) {
            // create derived 
            for (var i in this.refTable) {
              if (typeof this.refTable[i].derivedFrom !== "undefined") {
                let _ref = this.refTable[i];
                let dataDerived = this.getDerivedRefTable(_ref);
                //console.log("set derived", _ref.table, dataDerived);
                this.transSetRefTable({
                  key: _ref.table,
                  data: dataDerived
                });
              }
            }

            // // set time transaction start
            // this.transSetMetaData({
            //   key: TransMeta.TIME_START,
            //   value: TimeHelper.getTimeStringNow()
            // });
            this.loading = false;
          }
        },
        err => {
          if(this.IsSkipLoadRefErrorShow === true){
            return;
          }
          if (IsSkipLoadRef) {
            let errMes = "Indicator IsSkipLoadRef is true. Please change to false in app-config"
            this.alertError(errMes, () => {
              this.loading = false;
            });
            this.IsSkipLoadRefErrorShow = true;
            return;
          }
          // FIX STOPPER
          let errMes = "Gagal Mendapatkan Reference File.<br>Sila Tekan <b>'OK'</b> Untuk Cuba Sekali Lagi"
          this.alertError(errMes, () => {
            location.reload();
          });
        }
      );
    },
    ...mapMutations(getMutations())
  };
}
