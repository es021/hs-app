import {
  mapGetters,
  mapMutations
} from "vuex";

import {
  AlertConst
} from "../store/modules/alert";

import {
  kCarian_isOnEmptyButHasNoDokumen
} from './saa-helper';

import {
  LesenTemporaryFCName,
  LesenInWs
} from './skc-helper';


import FingerprintPopup from "../components/FingerprintPopup";
import PrintingPopup from "../components/PrintingPopup";
import ListTable from "../components/ListTable";
import * as PhotoHelper from "./photo-helper";


import {
  TransMeta,
  getTabNameFromFc
} from "../store/modules/transaction";

import {
  ChildrenType,
} from './format-helper';

import {
  DokumenMalaysia,
  MalaysiaCode,

  DuplWs,
  SelectDefault,

  WebJournal,
  TWJR,
  TWTR,
  SirenBis,
  createTwjrParam,
  createTwtrParam,
  createSirenBisParam,
  HasOffline,
  ReserveFcName,
  DokumenKpp,
  getTransactionTransCode
} from '../config/trans-config';

import {
  isProd,
  IsUseWas,
  isMigrateJournal,
  IsOfflineEnable
} from '../config/app-config';

import * as ApiHelper from "./api-helper";
import * as FormatHelper from './format-helper';
import * as GlobalValidate from './global-validate-helper';
import * as PrintingHelper from './printing-helper';
import * as TimeHelper from './time-helper';

// ########################################################################
// CONSTANT 

const CheckboxFn = {
  PRE_CHECKBOX: "CHECKBOX_",
  PRE_OLDVAL: "OLDVAL_",
}

// ########################################################################
// FUNCTION HELPER 

export function getGetters() {
  return [
    "authUser",
    "transactionJournalData",
    "transactionState",
    "transactionFcMap",
    "transactionFcChildren",
    "transactionCurrentTabId",
    "transactionFormObjectByName", // key, tab, name
    "transactionFormValueByName", // tab, name
    "transactionFormObject", // key, tab
    "transactionDataset",
    "transactionTabData",
    "transactionTabEnabled",
    "transactionRefTable",
    "transactionRefTableMap",
    "transactionNextTabId",
    "transactionTransName",
    "transactionTransFullName",
    "transactionTransCode",
    "transactionTransClass",
    "transactionMetaData",
    "transactionFocusOnInit"
  ];
}

export function getMutations() {
  return [
    "popupOpen",
    "popupClose",
    "alertOpen",
    "transSetJournalData",
    "transChangeTab",
    "transSetEnabledTab",
    "transAddEnabledTab",
    "transRemoveEnabledTab",
    "transAddHiddenTab",
    "transRemoveHiddenTab",
    "transSetTabData", // tabData
    "transSetRefTable", // { key, data }
    "transSetFormObject", // { key, tab, data }
    "transSetFormObjectByName", // { key, tab, name, data }
    "transSetMetaData", // { key, value }
    "transSetFormSelect", // { key, value }
    "transInitFcMap", // FC
    "transSetFocusOnInit",
  ];
}

export function getExtraData() {
  return {
    formValue: {},
    formDisabled: {},
    formRequired: {},
    formError: {},
    formRef: {},

    // add global validation here
    // add in FormField 
    // :validate="globalValidate.poskod"
    globalValidate: {
      poskod: input => {
        return GlobalValidate.poskod(input);
      }
    }
  }
}

/**
 * Used in transaction component
 */
export function getAllComputed() {
  return {
    ...mapGetters(getGetters())
  }
}

/**
 * Used in transaction component
 */
export function getAllMethod() {
  return {
    //###############################################
    initCheckboxFn(fcObj) {
      for (var k in fcObj) {
        let fc = fcObj[k];
        //console.log("[initCheckboxFn] fc.hasCheckboxFn",fc.hasCheckboxFn, "fc.name",fc.name);
        if (fc.hasCheckboxFn) {
          this.simulateOnChange(this.old_name(fc.name), this.old_onChange)
        }
      }
    },
    /**
     * @param {*} name -> ori_name
     */
    old_name(name) {
      name = this.getNameFromFC(name);
      return `${CheckboxFn.PRE_OLDVAL}${name}`;
    },
    /**
     * @param {*} name -> ori_name
     */
    cb_name(name) {
      name = this.getNameFromFC(name);
      return `${CheckboxFn.PRE_CHECKBOX}${name}`;
    },
    /**
     * @param {*} name -> cb_name | old_name
     */
    cb_getOriName(name) {
      name = this.getNameFromFC(name);
      if (name.indexOf(CheckboxFn.PRE_CHECKBOX) == 0) {
        name = name.replace(CheckboxFn.PRE_CHECKBOX, "");
      }
      if (name.indexOf(CheckboxFn.PRE_OLDVAL) == 0) {
        name = name.replace(CheckboxFn.PRE_OLDVAL, "");
      }
      return name
    },
    /**
     * @param {*} name -> cb_name
     */
    cb_onChangeLink(arrLinked, name, value, error, ref) {
      this.cb_onChange(name, value, error, ref)

      if (Array.isArray(arrLinked)) {
        for (var i in arrLinked) {
          let fc = arrLinked[i]
          this.setFormValue(fc, value);
          this.simulateOnChange(fc, this.cb_onChange);
        }
      }
    },
    /**
     * @param {*} name -> cb_name
     */
    cb_onChange(name, value, error, ref) {
      if (value == null) {
        return;
      }
      this.onChange(name, value, error, ref)
      let oriName = this.cb_getOriName(name);
      let oldVal = this.old_getValue(oriName);
      if (this.cb_isChecked(oriName)) {
        this.setFormValue(oriName, "");
      } else {
        this.setFormValue(oriName, oldVal);
      }
    },
    /**
     * @param {*} name -> ori_name
     */
    cb_isChecked(name) {
      let value = this.getFormValue(this.cb_name(name));
      value = typeof value === "undefined" ? this.cb_value : value;
      if (Array.isArray(value) && value.length > 0 && value[0] == "1") {
        return true;
      }
      return false;
    },
    /**
     * @param {*} name -> ori_name
     */
    old_getValue(name) {
      return this.getFormValue(this.old_name(name));
    },
    /**
     * @param {*} name -> old_name
     */
    old_onChange(name, value, error, ref) {
      // if(value == null){
      //   return;
      // }
      this.onChange(name, value, error, ref)
      let oriName = this.cb_getOriName(name);
      if (this.cb_isChecked(oriName)) {
        return;
      }
      let oriVal = this.getFormValue(oriName);
      if (typeof oriVal !== "undefined") {
        this.setFormValueInitial(name, oriVal);
      }

    },
    //###############################################

    getTwjrTxnFld(rawTwjr) {
      var journalData = rawTwjr[TWJR.WjrTxnFld1] + rawTwjr[TWJR.WjrTxnFld2];
      journalData = this.fixJournalDataString(journalData);
      try {
        journalData = JSON.parse(journalData);
      } catch (err) {
        journalData = {};
        console.error("[this.getTwjrTxnFld] error parsing journal data", err);
      }
      return journalData;
    },
    objectConsoleLog(obj, label) {
      label = typeof label === "undefined" ? "" : label;
      try {
        console.log("[objectConsoleLog]", label, JSON.parse(JSON.stringify(obj)));
      } catch (err) {
        console.log("[objectConsoleLog err]", err);
      }
    },
    twiceInputValidation(input1, input2, messageText) {
      //No Siri Tidak Sama
      messageText = typeof messageText === "undefined" ? "Nilai Terdahulu Tidak Sama" : messageText;

      var value1 = this.getFormValue(input1);
      var value2 = this.getFormValue(input2);

      if (value2 == null) {
        this.setFormValue(input2, value1);
        this.setFormValue(input1, null);
        this.alertWarning(
          "Sila Masukkan Sekali Lagi",
          () => {
            this.focusToFormField(input1)
          }
        );
        this.pertanyaanDisabled = true;
        return;
      } else {
        if (value2 === value1) {
          this.setFormValue(input2, null);
          this.pertanyaanDisabled = false;
        } else {
          this.pertanyaanDisabled = true;
          this.setFormValue(input2, null);
          this.setFormValue(input1, "");
          this.alertError(messageText,
            () => {
              this.focusToFormField(input1)
            });
        }
      }
    },
    simulateOnChange(name, customOnChange) {
      name = this.getNameFromFC(name);
      var val = this.getFormValue(name);
      var err = this.getFormError(name);
      var ref = this.getFormRef(name);

      if (customOnChange) {
        customOnChange(name, val, err, ref, true);
      } else {
        console.log("simulateOnChange", name, val, err, ref)
        this.onChange(name, val, err, ref, true);
      }
    },
    // #########################################################################
    // Useful functions
    doFromFcToFc(fcArr, fcStart, fcEnd, doFunction) {
      let start = false;
      let end = false;
      for (var i in fcArr) {
        if (JSON.stringify(fcArr[i]) == JSON.stringify(fcStart)) {
          start = true;
        }

        if (start && !end) {
          doFunction(fcArr[i]);
        }

        if (JSON.stringify(fcArr[i]) == JSON.stringify(fcEnd)) {
          end = true;
        }

        if (end) {
          break;
        }
      }
    },
    getRefTable(table, {
      value,
      label,
      overrideGlobalFilter,
      isNoDefault
    }, filter) {
      //console.log("table", table)
      return this.transactionRefTable(table, {
        value: value,
        label: label,
        overrideGlobalFilter: overrideGlobalFilter,
        isNoDefault: isNoDefault
      }, filter)
    },
    focusToFormField(name) {
      name = this.getNameFromFC(name);

      //console.log("focusToFormField")
      var ref = this.getFormRef(name);
      //console.log(ref);
      ref.focus();
    },
    alertWarning(content, closeHandler) {
      this.alertOpen({
        type: AlertConst.WARNING,
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
    alertSuccess(content, closeHandler) {
      this.alertOpen({
        type: AlertConst.SUCCESS,
        content: content,
        closeHandler: closeHandler
      });
    },
    alertInfo(content, closeHandler) {
      this.alertOpen({
        type: AlertConst.INFO,
        content: content,
        closeHandler: closeHandler
      });
    },
    openPopup(title, content, prop, closeable) {
      if (typeof closeable === "undefined") {
        closeable = true;
      }

      this.popupOpen({
        title: title,
        content: content,
        prop: prop,
        closeable: closeable
      });
    },
    // #########################################################################
    // Functions For Form Value
    resetAllFormValueByTab(tabId, exceptionFc) {
      this.saveAllToStore();
      var exceptionName = [];
      for (var i in exceptionFc) {
        exceptionName.push(this.getNameFromFC(exceptionFc[i]));
      }
      var tabIndex = tabId.split("_");
      tabIndex = tabIndex[1];
      if (typeof tabIndex === "undefined") {
        return;
      }

      var fc = this.FC[tabIndex];
      console.log("tabIndex", tabIndex)
      for (var i in fc) {
        if (exceptionName.indexOf(fc[i].name) >= 0) {
          continue;
        }

        this.setFormValueByTab(tabId, fc[i], "");
      }
    },
    resetAllStateByTab(tabId, exceptionFc) {
      this.saveAllToStore();
      var exceptionName = [];
      for (var i in exceptionFc) {
        exceptionName.push(this.getNameFromFC(exceptionFc[i]));
      }
      var tabIndex = tabId.split("_");
      tabIndex = tabIndex[1];
      if (typeof tabIndex === "undefined") {
        return;
      }

      var fc = this.FC[tabIndex];
      for (var i in fc) {
        if (exceptionName.indexOf(fc[i].name) >= 0) {
          continue;
        }

        this.setFormDisabledByTab(tabId, fc[i], null);
        this.setFormRequiredByTab(tabId, fc[i], null);
      }
    },
    getFormRadioLabel(name) {
      try {
        name = this.getNameFromFC(name);
        var ref = this.getFormRef(name);
        return ref.title;
      } catch (err) {
        console.error("getFormRadioLabel err", err);
        return "";
      }
    },
    getFormRadioLabelByTab(tab, name) {
      try {
        name = this.getNameFromFC(name);
        var ref = this.getFormRefByTab(tab, name);
        return ref.title;
      } catch (err) {
        console.error("getFormRadioLabelByTab err", err);
        return "";
      }
    },
    getFormSelectLabel(name) {
      name = this.getNameFromFC(name);
      var ref = this.getFormRef(name);
      let codeVal = this.getFormValue(name);
      try {
        let selectedIndex = ref.selectedIndex;
        let toRet = this.splitSelectDesc(ref.options[selectedIndex].text);

        // brute force
        if (selectedIndex == 0) {
          for (var i in ref.options) {
            if (codeVal == ref.options[i]._value) {
              toRet = this.splitSelectDesc(ref.options[i].text);
              break;
            }
          }
        }
        return toRet;

      } catch (err) {
        return null;
      }
    },
    formatKpt(str) {
      if (typeof str == "string") {
        let kptTarikh = str.substr(0, 6);
        let kptKod = str.substr(6, 2);
        let kptID = str.substr(8, 4);
        return kptTarikh + "-" + kptKod + "-" + kptID;
      }
    },
    formatUmur(tabName, fcUmur) {
      // set format field umur bapa angkat
      let umur = this.getFormValueGlobal(tabName, fcUmur);
      umur = Number.parseInt(umur);
      if (isNaN(umur)) {
        return;
      }
      this.setFormValueGlobal(tabName, fcUmur, umur);

      // // set format field umur bapa angkat
      // let umur = this.getFormValueByTab(tabName, fcUmur);
      // umur = Number.parseInt(umur);
      // if (isNaN(umur)) {
      //   return;
      // }
      // this.setFormValueByTab(tabName, fcUmur, umur);
    },
    // yang ni kena pastikan on change dia ada super this.onChange
    getFormSelectLabelByTab(tab, name) {
      name = this.getNameFromFC(name);
      var ref = this.getFormRefByTab(tab, name);

      try {
        return this.splitSelectDesc(ref.options[ref.selectedIndex].text);
      } catch (err) {
        return null;
      }
    },
    splitSelectDesc(txt) {
      if (txt == SelectDefault) {
        return "";
      }

      var splitDesc = txt.split("-");

      if (splitDesc.length == 1) {
        return splitDesc[0];
      }

      var desc = "";
      for (var i in splitDesc) {
        if (i == 0)
          continue;
        desc += splitDesc[i];
        if (i != splitDesc.length - 1)
          desc += '-';
      }

      return desc.trim();
    },
    setFormValueByTab(tab, name, value) {
      name = this.getNameFromFC(name);
      this.setOtherTabData(tab, "formValue", name, value)
    },
    setFormValueGlobal(tabName, fc, value) {
      if (tabName == this.transactionCurrentTabId) {
        this.setFormValue(fc, value);
      } else {
        this.setFormValueByTab(tabName, fc, value);
      }
    },
    setFormValue(name, value) {
      // check if format type is list table

      name = this.getNameFromFC(name);
      this.setThisData("formValue", name, value)
    },
    setFormValueInitial(name, value) {
      if (!this.isFormValueEmpty(name)) {
        return;
      }
      name = this.getNameFromFC(name);
      this.setThisData("formValue", name, value)
    },
    getFormValueByTab(tab, name) {
      name = this.getNameFromFC(name);
      return this.getOtherTabData(tab, "formValue", name);
    },
    getFormValue(name) {
      name = this.getNameFromFC(name);
      return this.formValue[name];
    },
    getFormValueGlobal(tabName, fc) {
      let val = null;
      if (tabName == this.transactionCurrentTabId) {
        val = this.getFormValue(fc);
      } else {
        val = this.getFormValueByTab(tabName, fc);
      }
      return val;
    },
    isValueEmpty(value) {
      if (Array.isArray(value)) {
        for (var i in value) {
          var val = value[i];
          if (typeof val == "undefined" || val == "" || val == null) {
            continue;
          } else {
            return false;
          }
        }

        return true;

      } else if (typeof value == "undefined" || value == "" || value == null) {
        return true;
      }

      return false;
    },
    isFormValueEmpty(name) {
      name = this.getNameFromFC(name);
      var value = this.getFormValue(name);
      return this.isValueEmpty(value);
    },
    isFormValueEmptyByTab(tab, name) {
      name = this.getNameFromFC(name);
      var value = this.getFormValueByTab(tab, name);
      return this.isValueEmpty(value);
    },
    isFormValueEmptyGlobal(tabName, fc) {
      let val = null;
      if (tabName == this.transactionCurrentTabId) {
        val = this.isFormValueEmpty(fc);
      } else {
        val = this.isFormValueEmptyByTab(tabName, fc);
      }
      return val;
    },
    // not empty and no error 
    isFormValueValid(name) {
      name = this.getNameFromFC(name);
      return !this.isFormHasError(name) && !this.isFormValueEmpty(name);
    },

    // #########################################################################
    // Functions For Form Ref
    setFormRef(name, ref) {
      name = this.getNameFromFC(name);

      this.setThisData("formRef", name, ref)
    },
    getFormRef(name) {
      name = this.getNameFromFC(name);
      return this.formRef[name];
    },
    getFormRefByTab(tab, name) {
      name = this.getNameFromFC(name);
      return this.getOtherTabData(tab, "formRef", name);
    },
    // #########################################################################
    isFormOptional(name) {
      return this.getFormDisabled(name) != true && this.getFormRequired(name) != true
    },
    setFormDisabledAll(fcTab) {
      for (var i in fcTab) {
        this.setFormDisabled(fcTab[i], true);
      }
    },
    // Functions For Form Disabled
    getFormDisabled(name) {
      name = this.getNameFromFC(name);
      return this.formDisabled[name];
    },
    setFormDisabledByTab(tab, name, value) {
      name = this.getNameFromFC(name);
      this.setOtherTabData(tab, "formDisabled", name, value)
    },
    setFormDisabledInitial(name, bool) {
      name = this.getNameFromFC(name);
      var init = this.getFormDisabled(name);
      if (typeof init !== "boolean") {
        this.setFormDisabled(name, bool);
      }
    },
    setFormDisabled(name, bool) {
      name = this.getNameFromFC(name);

      if (bool) {
        // set required to false first
        this.setFormRequired(name, false);
      }
      this.setThisData("formDisabled", name, bool)
    },
    // #########################################################################
    // Functions For Form Required
    getFormRequired(name) {
      name = this.getNameFromFC(name);
      return this.formRequired[name];
    },
    setFormRequiredByTab(tab, name, value) {
      name = this.getNameFromFC(name);

      this.setOtherTabData(tab, "formRequired", name, value)
    },
    setFormRequiredInitial(name, bool) {
      var init = this.getFormRequired(name);
      if (typeof init !== "boolean") {
        this.setFormRequired(name, bool);
      }
    },
    setFormRequired(name, bool) {
      name = this.getNameFromFC(name);

      if (bool) {
        // set disabled to false first
        this.setFormDisabled(name, false);
      }
      this.setThisData("formRequired", name, bool)
    },
    // #########################################################################
    // Functions For Form Optional
    setFormOptional(name) {
      this.setFormRequired(name, false);
      this.setFormDisabled(name, false);
    },
    // #########################################################################
    // Functions For Form Error
    setFormError(name, error) {
      name = this.getNameFromFC(name);
      this.setThisData("formError", name, error)
    },
    getFormError(name) {
      name = this.getNameFromFC(name);

      return this.formError[name];
    },
    isFormHasError(name) {
      name = this.getNameFromFC(name);
      var error = this.formError[name];
      if (error === false || typeof error == "undefined") {
        return false;
      }
      return true;
    },
    // #########################################################################
    // Functions For Transaction Tab
    setTabEnabledUpToSelf() {
      var tabsToEnable = [];
      for (var i in this.transactionTabData) {
        var tab = this.transactionTabData[i].id;
        tabsToEnable.push(tab);
        if (tab == this.tabId) {
          break;
        }
      }
      //console.log("setTabEnabledUpToSelf",tabsToEnable);
      this.setEnabledTab(tabsToEnable);
    },
    setEnabledTab(data) {
      this.transSetEnabledTab(data);
    },
    setNextTabEnabled() {
      this.transAddEnabledTab(this.transactionNextTabId);
    },
    setNextTabDisabled() {
      this.transRemoveEnabledTab(this.transactionNextTabId);
    },
    addEnabledTab(tabId) {
      this.transAddEnabledTab(tabId);
    },
    removeEnabledTab(tabId) {
      this.transRemoveEnabledTab(tabId);
    },
    addHiddenTab(tabId) {
      this.transAddHiddenTab(tabId);
    },
    removeHiddenTab(tabId) {
      this.transRemoveHiddenTab(tabId);
    },
    // #########################################################################
    // Functions For Transaction MetaData
    // general
    getTransMeta(key) {
      return this.transactionMetaData[key];
    },
    setTransMeta(key, value) {
      this.transSetMetaData({
        key: key,
        value: value
      });
    },
    setIsModeOffline(bool) {
      this.setTransMeta(TransMeta.IS_MODE_OFFLINE, bool);
    },
    isModeOffline() {
      if (!IsOfflineEnable) {
        return false;
      }
      return this.transactionMetaData[TransMeta.IS_MODE_OFFLINE] == true;
    },
    getStartTime() {
      // YYYY-MM-DD-HH.MM.SS.XXXXXX
      // set in tab-parent-general-helper
      return this.transactionMetaData[TransMeta.TIME_START];
    },
    getEndTime() {
      var cur = this.transactionMetaData[TransMeta.TIME_END];
      if (typeof cur === "undefined" || cur == "" || cur == null) {
        this.setEndTime();
      }
      return this.transactionMetaData[TransMeta.TIME_END];
    },
    getUpdateTime(isTimeOnly) {
      // set update time kalau takde lagi
      var cur = this.transactionMetaData[TransMeta.TIME_UPDATE];
      if (typeof cur === "undefined" || cur == "" || cur == null) {
        this.setUpdateTime();
      }

      var ret = this.transactionMetaData[TransMeta.TIME_UPDATE];
      if (typeof isTimeOnly !== "undefined" && isTimeOnly) {
        try {
          ret = ret.split(" ");
          ret = ret[1];
        } catch (err) {
          console.error("getUpdateTime err", err);
        }
      }
      return ret;
    },
    setEndTime() {
      this.transSetMetaData({
        key: TransMeta.TIME_END,
        value: TimeHelper.getTimeStringNow()
      });
    },
    setUpdateTime() {
      this.transSetMetaData({
        key: TransMeta.TIME_UPDATE,
        value: TimeHelper.getTimeStringNow()
      });
    },
    getTransBreadcrumbs() {
      return this.transactionMetaData[TransMeta.BREADCRUMBS];
    },
    // #########################################################################
    // Printing function 
    getParentUrl() {
      var url = null;
      try {
        var breads = this.getTransBreadcrumbs();
        if (Array.isArray(breads)) {
          url = breads[breads.length - 2].url;
        }
      } catch (err) {
        console.error("getParentUrl err");
        url = null;
      }

      return url
    },
    transaksiSelesai() {
      let closeable = isProd ? false : true;
      this.startPrinting([], closeable);
    },
    startPrintingPreview(data) {
      let openPreview = true;
      this.startPrinting(data, false, null, null, openPreview);
      console.log("startPrintingPreview");
    },
    startPrinting(data, closeable, chainTrans, chainParam, openPreview) {
      if (typeof closeable === "undefined") {
        closeable = false;
      }

      // override for production,
      // takleh close popup printing
      if (isProd) {
        closeable = false;
      }

      var title = (data.length > 0) ? "Cetakan" : "Transaksi Selesai";

      this.openPopup(title, PrintingPopup, {
        data: data,
        parentUrl: this.getParentUrl(),
        chainTrans: chainTrans,
        chainParam: chainParam,
        openPreview: openPreview
      }, closeable);
    },
    //################################
    //list data
    setListDataValue(name, value) {
      this.setFormValue(name, JSON.stringify(value));
    },
    setListDataValueByTab(tab, name, value) {
      this.setFormValueByTab(tab, name, JSON.stringify(value));
    },
    addListDataValue(name, value) {
      var oriVal = this.getListDataValue(name);
      oriVal.push(value);
      this.setFormValue(name, JSON.stringify(oriVal));
    },
    getListDataValue(name) {
      var data = this.getFormValue(name);
      try {
        data = JSON.parse(data);
      } catch (err) {
        data = [];
      }

      return data;
    },
    getListDataValueByTab(tab, name) {
      var data = this.getFormValueByTab(tab, name);
      try {
        data = JSON.parse(data);
      } catch (err) {
        data = [];
      }

      return data;
    },
    openListDataPopup(title, data, headerMap, onRowClick, closeable) {
      if (typeof closeable === "undefined") {
        closeable = false;
      }


      var firstData = data[0];
      var header = [];
      try {
        for (var k in firstData) {
          header.push(headerMap[k]);
        }
      } catch (err) {}

      this.openPopup(title, ListTable, {
        data: data,
        header: header,
        onRowClick: onRowClick
      }, closeable);

    },
    getFormDataForJournal() {
      var isForJournal = true;
      return this.getFormDataForPrinting([], [], false, isForJournal);
    },
    addUserInfoPrinting(formData) {
      // add user information here
      //var transName = this.transactionTransName;
      var user = this.authUser;
      formData[PrintingHelper.MetaData.USER_ID] = user.OPER_ID;
      formData[PrintingHelper.MetaData.BRANCH_CODE] = user.BRANCH_CODE;
      formData[PrintingHelper.MetaData.PC_ID] = user.PC_ID;

      // todos
      //formData[PrintingHelper.MetaData.TRANS_CODE] = transName.substring(1, transName.length);
      formData[PrintingHelper.MetaData.TRANS_CODE] = getTransactionTransCode(this);

      //formData[PrintingHelper.MetaData.DATE_TODAY] = FormatHelper.dateToPrint(TimeHelper.getDateValueToday());
      // SIT Log validasi printing guna format date dd/mm/yyy
      formData[PrintingHelper.MetaData.DATE_TODAY] = TimeHelper.getDateValueToday();
      formData[PrintingHelper.MetaData.TIME_UPDATE] = this.getUpdateTime(true);

      return formData;
    },
    createPrintingFormData(formData, fcArr) {
      var toRet = {};
      for (var i in fcArr) {
        var name = this.getNameFromFC(fcArr[i])
        toRet[name] = formData[name];
      }

      toRet = this.addUserInfoPrinting(toRet);
      return toRet;
    },
    getFormDataForPrinting(tabOverride, selectTab, noReformat, isForJournal) {
      noReformat = (typeof noReformat === "undefined") ? true : noReformat;
      var transName = this.transactionTransName;
      var obj = this.getAllFormDataByTab((index) => {
        return `${transName}_T${index}`;
      }, noReformat, isForJournal);

      //console.log("getFormDataForPrinting",JSON.parse(JSON.stringify(obj)));

      // selectTab
      if (Array.isArray(selectTab) && selectTab.length > 0) {
        var newObj = {};

        for (var i in selectTab) {
          newObj[selectTab[i]] = obj[selectTab[i]];
        }

        obj = newObj;
      }

      var toRet = {};
      for (var i in obj) {
        var tData = obj[i];
        for (var name in tData) {
          if (typeof toRet[name] === "undefined") {
            //console.warn("duplication of FID " + name);
          }
          toRet[name] = tData[name];
        }
      }

      // override
      if (typeof tabOverride === "undefined") {
        tabOverride = [];
      }

      if (typeof tabOverride === "string") {
        tabOverride = [tabOverride];
      }

      for (var i in tabOverride) {
        var tData = obj[tabOverride[i]];
        for (var name in tData) {
          toRet[name] = tData[name];
        }
      }

      toRet = this.addUserInfoPrinting(toRet);
      return toRet;
    },
    // #########################################################################
    // Fingerprint function 
    startFingerprint(successHandler, errHandler, closeHandler, isOperatorValid) {
      let closeable = false;
      isOperatorValid = typeof isOperatorValid === "undefined" ? false : isOperatorValid;
      this.openPopup("Semakan Kelulusan", FingerprintPopup, {
          isOperatorValid: isOperatorValid,
          success: successHandler,
          error: penyelia_id => {
            this.alertError(
              "Pengesahan Penyelia Gagal. Sila Cuba Sekali Lagi"
            );
            errHandler();
            this.popupClose();
          },
          onClose: closeHandler
        },
        closeable);
    },
    // #########################################################################
    // Function to populate data (involves formatting)
    fixJournalDataString(txnFldStr) {
      if (typeof txnFldStr == "string") {
        txnFldStr = txnFldStr.replaceAll(":NULL,", ":\"\",");
        txnFldStr = txnFldStr.replaceAll(":TRUE,", ":\"true\",");
        txnFldStr = txnFldStr.replaceAll(":FALSE,", ":\"false\",");
        txnFldStr = txnFldStr.escapeSpecialChars();
      }

      return txnFldStr;
    },
    // need to handle value array
    // soap data -> form field
    setFormValueFromSoapData(data, mapping) {

      this.saveAllToStore();
      var fcMap = this.transactionFcMap;
      var fcChildren = this.transactionFcChildren;

      //console.log(JSON.stringify(fcMap));
      for (var i in mapping) {
        var tabId = mapping[i]["tab"];
        var entity = mapping[i]["entity"];
        var tabData = data[entity][0];
        for (var key in tabData) {
          var fcObject = fcMap[tabId][key];

          // kalau undefined, cari parent
          if (typeof fcObject === "undefined") {
            var parentName = fcChildren[tabId][key];
            fcObject = fcMap[tabId][parentName];
          }

          // kalau undefined lagi mmg takde lah tu,
          // response dari backend takde
          if (typeof fcObject === "undefined") {
            console.error(`Data from backend ${key} does not exist in tab ${tabId}`);
            continue;
          }

          // to handle fc object with children
          if (typeof fcObject.children !== "undefined" && Array.isArray(fcObject.children)) {
            var keyParent = fcChildren[tabId][key];
            var valArray = this.getValueArrayFromSoapData(tabData, fcObject.children, fcObject.childrenType);
            this.setFormValueByTab(tabId, keyParent, valArray);

            if (fcObject.hasCheckboxFn) {
              // set balik old val multiple
              var keyParent = fcChildren[tabId][key];
              keyParent = this.old_name(keyParent);
              // get old value
              let childrenOldVal = [];
              for (var i in fcObject.children) {
                childrenOldVal[i] = this.old_name(fcObject.children[i]);
              }
              var valArray = this.getValueArrayFromSoapData(tabData, childrenOldVal, fcObject.childrenType);
              this.setFormValueByTab(tabId, keyParent, valArray);

              // set balik checkbox multiple
              keyParent = fcChildren[tabId][key];
              let cbKey = this.cb_name(keyParent)
              var val = tabData[cbKey];
              this.setFormValueByTab(tabId, cbKey, val);
            }

          } else {
            var val = tabData[key];
            if (!Array.isArray(val)) {
              val = FormatHelper.reformatDbToValue(fcObject, val);
            }
            this.setFormValueByTab(tabId, key, val);
            //console.log(tabId, key, val);


            if (fcObject.hasCheckboxFn) {
              // set balik old val 
              let oldKey = this.old_name(key)
              var val = tabData[oldKey];
              if (!Array.isArray(val)) {
                val = FormatHelper.reformatDbToValue(fcObject, val);
              }
              this.setFormValueByTab(tabId, oldKey, val);

              // set balik checkbox
              let cbKey = this.cb_name(key)
              var val = tabData[cbKey];
              this.setFormValueByTab(tabId, cbKey, val);
            }

          }
        }
      }
    },
    keluarKeMenuUtama() {
      this.startPrinting([], true);
    },
    // ###############################################
    // LESEN HELPER - START
    addParamForLesen(param, key) {
      param[LesenInWs] = param[key];
      return param;
    },
    setIsLesenNegeriAll(index, bool) {
      let name = ReserveFcName.IsLesenNegeriAll + index;
      this.setFormValue(name, bool)
    },
    getIsLesenNegeriAll(index) {
      let name = ReserveFcName.IsLesenNegeriAll + index;
      let val = this.getFormValue(name);

      if (typeof val === "undefined") {
        return true;
      }
      return val;
    },
    // LESEN HELPER - END
    // ###############################################
    // form field -> soap request
    addUserParamForKemaskini(param, applNoFc, addExtraData, customUnix, customTxnCode) {
      if (typeof param == "undefined") {
        param = {};
      }

      var user = this.authUser;
      param = {
        ...param,
        InUsers: {
          OperId: user.OPER_ID
        },
        InBranch: {
          BranchCode: user.BRANCH_CODE
        },
        InWsJpnGeneral: {
          Wsid: user.PC_ID,
          //TransactionCode: this.transactionTransCode,
          TransactionCode: getTransactionTransCode(this),
        },
      }

      // to cater yang amik dari sini utk tgtx
      // let wsSkc = "InWsSkc"
      // if(typeof param[wsSkc] === "undefined"){
      //   param[wsSkc] = {};
      // }
      // param[wsSkc]["Fid1457KodUrusniaga"] = this.transactionTransCode;

      if (typeof applNoFc != "undefined") {
        // param = this.addJournalParamForKemaskini(applNoFc, param, addExtraData, customUnix, customTxnCode);
      }
      return param;
    },
    isSkipFormData(tabName, fcObject, noReformat, isForJournal) {
      let nameUppercase = fcObject.name.toUpperCase();

      // 0. filter out yang empty
      if (this.isFormValueEmptyByTab(tabName, fcObject) && !noReformat && fcObject.hasCheckboxFn !== true) {
        return true;
      }

      // 1. filter out yang jenis gambar
      if (nameUppercase.indexOf("GAMBAR") >= 0) {
        return true;
      }
      if (nameUppercase.indexOf("PHOTO") >= 0) {
        return true;
      }
      if (fcObject.formatType == FormatHelper.FormatType.IMAGE) {
        return true;
      }

      // 2. jenis lesen temporary, remove dari data,
      // kecuali utk journal kita nak letak dlm data
      if (!isForJournal) {
        for (var k in LesenTemporaryFCName) {
          let keyLesen = LesenTemporaryFCName[k].toUpperCase();
          if (nameUppercase.indexOf(keyLesen) == 0) {
            return true;
          }
        }
      }

      return false;

    },
    // no reformat - true : printing
    // no reformat - false : journal dan txn2 
    // isForJournal - true utk journal je
    getAllFormDataByTab(createTabParentKey, noReformat, isForJournal) {

      this.saveAllToStore();
      var obj = {};
      if (typeof createTabParentKey === "undefined") {
        alert("Please provide createTabParentKey function to use this.getAllFormDataByTab");
        return {}
      }

      if (typeof noReformat === "undefined") {
        noReformat = false;
      }

      if (typeof isForJournal === "undefined") {
        isForJournal = false;
      }

      var tabIndex = 1;
      for (var tId in this.FC) {
        var parentTab = createTabParentKey(tabIndex)
        var tabName = getTabNameFromFc(this.transactionTabData, this.FC, tId);
        obj[parentTab] = {};
        for (var _fc in this.FC[tId]) {
          var fcObject = this.FC[tId][_fc]

          if (this.isSkipFormData(tabName, fcObject, noReformat, isForJournal)) {
            continue;
          }

          // to handle fc object with children
          if (typeof fcObject.children !== "undefined" && Array.isArray(fcObject.children)) {
            //var ref = this.getFormRefByTab(tabName, fcObject);
            var val = this.getFormValueByTab(tabName, fcObject);
            if (val == null) {
              val = [];
            }
            var vals = this.getSoapDataFromValueArray(fcObject.children, val, fcObject.childrenType);
            for (var k in vals) {
              obj[parentTab][k] = vals[k];
            }

            // ########################################
            // additonal for hasCheckboxFn
            if (fcObject.hasCheckboxFn) {
              // get cb value
              let cbName = this.cb_name(fcObject.name)
              obj[parentTab][cbName] = this.getFormValueByTab(tabName, cbName);

              // get old value
              let childrenOldVal = [];
              for (var i in fcObject.children) {
                childrenOldVal[i] = this.old_name(fcObject.children[i]);
              }
              let oldName = this.old_name(fcObject.name)
              var val = this.getFormValueByTab(tabName, oldName);
              if (val == null) {
                val = [];
              }
              var vals = this.getSoapDataFromValueArray(childrenOldVal, val, fcObject.childrenType);
              for (var k in vals) {
                obj[parentTab][k] = vals[k];
              }
            }

          } else {
            //var ref = this.getFormRefByTab(tabName, fcObject);
            var val = this.getFormValueByTab(tabName, fcObject);
            if (!noReformat) {
              val = FormatHelper.reformatValueToDb(fcObject, val);
            }
            obj[parentTab][fcObject.name] = val;

            // ########################################
            // additonal for hasCheckboxFn
            if (fcObject.hasCheckboxFn) {
              let cbName = this.cb_name(fcObject.name)
              obj[parentTab][cbName] = this.getFormValueByTab(tabName, cbName);
              let oldName = this.old_name(fcObject.name)
              obj[parentTab][oldName] = this.getFormValueByTab(tabName, oldName);
            }


          }
        }
        tabIndex++;
      }

      return obj;
    },
    getValueArrayFromSoapData(tabData, parentFcChildren, parentFcChildrenType) {
      // console.log("tabData", tabData);
      // console.log("parentFcChildren", parentFcChildren);
      // console.log("parentRef", parentRef);

      var arr = [];
      for (var i in parentFcChildren) {
        var key = parentFcChildren[i];
        var val = tabData[key];

        // for checkbox
        if (parentFcChildrenType == ChildrenType.CHECKBOX) {
          if (val == "1") {
            arr.push(key);
          }
        }
        // for count more than 1
        else {
          // console.log("valll",val);
          val = FormatHelper.decodeHTMLEntities(val);
          // console.log("valll",val);
          // console.log("----------------------------");

          arr.push(val);
        }
      }

      // console.log("arr", arr);
      // console.log("---------------------------------------")
      // console.log("---------------------------------------")

      return arr;
    },
    getSoapDataFromValueArray(parentFcChildren, parentValue, parentFcChildrenType) {
      //console.log("parentFcChildren", parentFcChildren);
      //console.log("parentValue", parentValue);
      //console.log("parentRef", parentRef);

      var obj = {};
      for (var i in parentFcChildren) {
        var key = parentFcChildren[i];
        var val = "";

        // for checkbox
        if (parentFcChildrenType == ChildrenType.CHECKBOX) {
          val = "0";
          if (parentValue.indexOf(key) >= 0) {
            val = "1";
          }
        }
        // for count more than 1
        else {
          val = parentValue[i];
          if (typeof val == "undefined" || val == null) {
            val = "";
          }
        }

        obj[key] = val;
      }

      //console.log("obj", obj);
      //console.log("---------------------------------------")
      //console.log("---------------------------------------")

      return obj;
    },
    /**
     * 
     * @param {String} tabName 
     * @param {FcObject} focusTo 
     */
    goToTab(tabName, focusTo) {
      let state = this.transactionState;
      let index = null;
      for (var i in state.tabData) {
        if (state.tabData[i].id == tabName) {
          index = i;
          break;
        }
      }

      if (index == null) {
        mes = "Tab Does Not Exist";
        console.log(mes);
        return false;
      } else {
        let isTabEnabled = state.tabEnabled.indexOf(tabName) >= 0;
        if (!isTabEnabled) {
          mes = "Tab Is Not Enabled Currently";
          console.log(mes);
          return false;
        }
      }

      // on the tab that we want to go, focus to
      if (typeof focusTo === "undefined") {
        focusTo = null;
      }
      this.transSetFocusOnInit(focusTo);

      index = Number.parseInt(index);
      if (isNaN(index)) {
        console.error("goToTab, Index is not A Number");
        return false;
      }

      this.transChangeTab(index);
    },
    focusOnInit() {
      let fc = this.transactionFocusOnInit;
      if (fc !== null) {
        this.focusToFormField(fc);
        // reset back to null
        this.transSetFocusOnInit(null);
        return true;
      }
      return false;
    },
    // #########################################################################
    // kunci Carian function
    isDokumenMalaysia(tabId, fcKpt, fcJenisDkmn) {
      this.saveAllToStore();
      // kalau kpt empty dan jenis dokumen bukan dlm Dokumen Malaysia
      if (this.isFormValueEmptyByTab(tabId, fcKpt) &&
        DokumenMalaysia.indexOf(this.getFormValueByTab(tabId, fcJenisDkmn)) <= -1) {
        return false;
      } else {
        return true;
      }
    },
    openDuplicationKunciCarian(dataDuplicate, PreKunci, PostKunci, tabNo) {
      // create on click
      const onClick = d => {
        var FC = this.FC;
        var docNo = d[DuplWs.NoDaftarLahir];
        var kptNo = d[DuplWs.NoKpt];
        var kppNo = d[DuplWs.NoKpp];

        //console.log("onclick openDuplicationKunciCarian", d);

        if (typeof docNo !== "string") {
          docNo = "";
        }
        if (typeof kppNo !== "string") {
          kppNo = "";
        }

        var isDocDupl = docNo.replaceAll(" ", "") != "";
        var isKppDupl = kppNo.replaceAll(" ", "") != "";

        // ###############################
        // duplication kat anak
        var kanakDupl =
          isDocDupl &&
          this.getFormValue(FC[tabNo][PreKunci.NO_DOK + PostKunci.KANAK]) ==
          docNo;

        if (kanakDupl) {
          //console.log("Duplication for kanak");
          var kptFc = FC[tabNo][PreKunci.NO_KPT + PostKunci.KANAK];
          this.setFormValue(kptFc, kptNo);
          this.setFormDisabled(kptFc, false);
        }

        // ###############################
        // duplication kat ibu
        var ibuDupl =
          (isDocDupl &&
            this.getFormValue(FC[tabNo][PreKunci.NO_DOK + PostKunci.IBU]) ==
            docNo) ||
          (isKppDupl &&
            this.getFormValue(FC[tabNo][PreKunci.NO_KPP + PostKunci.IBU]) == kppNo);

        if (ibuDupl) {
          //console.log("Duplication for ibu");
          var kptFc = FC[tabNo][PreKunci.NO_KPT + PostKunci.IBU];
          this.setFormValue(kptFc, kptNo);
          this.setFormDisabled(kptFc, false);
        }

        // ###############################
        // duplication kat bapa
        var bapaDupl =
          (isDocDupl &&
            this.getFormValue(FC[tabNo][PreKunci.NO_DOK + PostKunci.BAPA]) ==
            docNo) ||
          (isKppDupl &&
            this.getFormValue(FC[tabNo][PreKunci.NO_KPP + PostKunci.BAPA]) == kppNo);

        if (bapaDupl) {
          //console.log("Duplication for bapa");
          var kptFc = FC[tabNo][PreKunci.NO_KPT + PostKunci.BAPA];
          this.setFormValue(kptFc, kptNo);
          this.setFormDisabled(kptFc, false);
        }

        // ###############################
        // duplication kat pemohon
        var pemohonDupl =
          (isDocDupl &&
            this.getFormValue(FC[tabNo][PreKunci.NO_DOK + PostKunci.PEMOHON]) ==
            docNo) ||
          (isKppDupl &&
            this.getFormValue(FC[tabNo][PreKunci.NO_KPP + PostKunci.PEMOHON]) == kppNo);

        if (pemohonDupl) {
          //console.log("Duplication for pemohon");
          var kptFc = FC[tabNo][PreKunci.NO_KPT + PostKunci.PEMOHON];
          this.setFormValue(kptFc, kptNo);
          this.setFormDisabled(kptFc, false);
        }

        // close popup first
        this.popupClose();

        // do pertanyaan again with changed kunci carian
        this.pertanyaanOnClick();
      };

      // kena ada kpt dulu
      //filter Duplicate Data first
      var newDataDuplicate = [];
      for (var d in dataDuplicate) {
        var isHasValue = false;
        //for (var k in dataDuplicate[d]) {
        var val = dataDuplicate[d][DuplWs.NoKpt];
        if (val.replaceAll(" ", "") != "") {
          isHasValue = true;
        }
        //}
        if (isHasValue) {
          newDataDuplicate.push(dataDuplicate[d]);
        }
      }

      if (newDataDuplicate.length <= 0) {
        return false;
      }

      // kalau ada satu je array trus pilih
      if (newDataDuplicate.length == 1) {
        onClick(dataDuplicate[0]);
        return false;
      }

      var headerMap = {};
      headerMap[DuplWs.NoKpt] = "No KPT";
      headerMap[DuplWs.NoDaftarLahir] = "No Daftar Lahir";
      headerMap[DuplWs.NoKpp] = "No Kpp";
      headerMap[DuplWs.Nama] = "Nama";
      headerMap[DuplWs.TarikhLahir] = "Tarikh Lahir";
      headerMap[DuplWs.DaerahLapor] = "Daerah Lapor";
      headerMap[DuplWs.RekodStatus] = "Rekod Status";
      headerMap[DuplWs.StatusPengesahan] = "Status Pengesahan";

      this.openListDataPopup(
        "Senarai Duplikasi",
        newDataDuplicate,
        headerMap,
        onClick,
        true
      );

      return true;
    },
    copyValueFromOtherTab(srcTab, srcArrFc, srcToFc) {
      for (var i in srcArrFc) {
        this.setFormValue(srcToFc[i], this.getFormValueByTab(srcTab, srcArrFc[i]));
      }
    },
    copyPemohonDetail(pemohonFc, sourceFc, isDefacto) {
      if (sourceFc == null) {
        for (var k in pemohonFc) {
          this.setFormValue(pemohonFc[k], "");
          this.setFormDisabled(pemohonFc[k], false);
          this.setFormRequired(pemohonFc[k], false);
        }
        this.setFormDisabled(pemohonFc.negaraPengeluar, true);
        return;
      }

      // SIT copy sume value and state straight dari source
      this.setFormValue(
        pemohonFc.noKpt,
        this.getFormValue(sourceFc.noKpt)
      );
      console.log(this.getFormValue(pemohonFc.noKpt), pemohonFc.noKpt.name);
      this.setFormValue(
        pemohonFc.noKpp,
        this.getFormValue(sourceFc.noKpp)
      );
      this.setFormValue(
        pemohonFc.noDokumen,
        this.getFormValue(sourceFc.noDokumen)
      );
      this.setFormValue(
        pemohonFc.jenisDokumen,
        this.getFormValue(sourceFc.jenisDokumen)
      );
      this.setFormValue(
        pemohonFc.negaraPengeluar,
        this.getFormValue(sourceFc.negaraPengeluar)
      );

      // New Defacto
      isDefacto = typeof isDefacto === "undefined" ? false : isDefacto
      if (isDefacto) {
        this.setFormValue(
          pemohonFc.hubungan,
          this.getFormValue(sourceFc.hubungan)
        );
        this.setFormValue(
          pemohonFc.kunciCarian,
          this.getFormValue(sourceFc.kunciCarian)
        );
      }

      // utk mahkamah je copy state
      if (!isDefacto) {
        for (var k in sourceFc) {
          var disabled = this.formDisabled[sourceFc[k].name];
          var required = this.formRequired[sourceFc[k].name];
          this.setFormDisabled(pemohonFc[k], disabled)
          this.setFormRequired(pemohonFc[k], required)
        }
      }


      // nak cater yg pemohon takde kpp tapi mak or ayah ada kpp
      if (typeof pemohonFc.noKpp === "undefined") {
        if (!this.isFormValueEmpty(sourceFc.noKpp)) {
          this.setFormValue(pemohonFc.noDokumen, this.getFormValue(sourceFc.noKpp));
          this.setFormValue(pemohonFc.jenisDokumen, DokumenKpp);
          this.setFormValue(pemohonFc.negaraPengeluar, MalaysiaCode);
        }
      }
    },
    checkIsKunciCarianValid(fcNoKpt,
      fcNoKpp,
      fcNoDkmn,
      fcJenisDkmn,
      fcNegaraPengeluar,
    ) {

      let allFc = [fcNoKpt,
        fcNoKpp,
        fcNoDkmn,
        fcJenisDkmn,
        fcNegaraPengeluar
      ]

      //console.log("allFc", this.objectConsoleLog(allFc))
      for (var i in allFc) {
        if (this.isFormValueValid(allFc[i])) {

          //console.log("form value valid", allFc[i].name)

          let dontChangeState = true;
          let fcHubungan = {};
          let forSkc = false;

          let isValid = this.kunciCarianOnChange(allFc[i].name,
            fcNoKpt,
            fcNoDkmn,
            fcJenisDkmn,
            fcNegaraPengeluar,
            fcNoKpp,
            dontChangeState,
            fcHubungan,
            forSkc);

          //console.log(isValid);

          if (isValid) {
            return true;
          }
        }
      }

      return false;
    },
    // return true if there is change of value
    // return false if value is empty
    kunciCarianOnChange(
      nameOnChange,
      fcNoKpt,
      fcNoDkmn,
      fcJenisDkmn,
      fcNegaraPengeluar,
      fcNoKpp,
      dontChangeState,
      fcHubungan,
      forSkc
    ) {

      // dontChangeState mean we only want whether kunci carian exist or not
      // dont change disabled enabled or reset value to empty
      forSkc = typeof forSkc === "undefined" ? false : forSkc;
      dontChangeState = typeof dontChangeState === "undefined" ? false : dontChangeState;
      fcHubungan = typeof fcHubungan === "undefined" ? {} : fcHubungan;

      let initialState = {};
      let allFc = [fcNoKpt,
        fcNoDkmn,
        fcJenisDkmn,
        fcNegaraPengeluar,
        fcNoKpp,
        dontChangeState,
        fcHubungan,
      ];

      // set initial state
      for (var i in allFc) {
        if (typeof allFc[i] !== "undefined" && allFc[i] != null) {
          let name = allFc[i].name
          initialState[name] = {
            disabled: this.getFormDisabled(name),
            required: this.getFormRequired(name),
          }
        }
      }

      const resetAllToInitialState = () => {
        for (var i in allFc) {
          let fc = allFc[i];
          // set to optional
          this.setFormDisabled(fc, false);

          // set to disabled
          if (initialState[fc.name].disabled == true) {
            this.setFormDisabled(fc, true);
          }

          // set to required
          if (initialState[fc.name].required == true) {
            this.setFormRequired(fc, true);
          }
        }
      }

      // dia yang on change, dan dia ada value
      const isTheOne = (name, fc) => {
        return name == fc.name && !this.isFormValueEmpty(fc) && !this.isFormHasError(fc)
      }

      const isTheOneEmpty = (name, fc) => {
        return name == fc.name && this.isFormValueEmpty(fc)
      }
      // console.log("---------------------------------");
      // console.log(nameOnChange);
      // console.log(fcNoKpt);
      // console.log(fcNoDkmn);
      // console.log(fcJenisDkmn);
      // console.log(fcNegaraPengeluar);
      // console.log(fcNoKpp);
      // console.log("---------------------------------");
      // set to empty obj if null
      fcNoKpt = fcNoKpt == null ? {} : fcNoKpt;
      fcNoDkmn = fcNoDkmn == null ? {} : fcNoDkmn;
      fcJenisDkmn = fcJenisDkmn == null ? {} : fcJenisDkmn;
      fcNegaraPengeluar = fcNegaraPengeluar == null ? {} : fcNegaraPengeluar;
      fcNoKpp = fcNoKpp == null ? {} : fcNoKpp;

      // add for skc only -- on empty val jenis dok n negara peng dont make disabled
      // why did i put this on the first place?
      // if (forSkc) {
      //   if (isTheOneEmpty(nameOnChange, fcJenisDkmn) || isTheOneEmpty(nameOnChange, fcNegaraPengeluar)) {
      //     return false;
      //   }
      // }

      // do when empty
      if (isTheOneEmpty(nameOnChange, fcNoKpt) || isTheOneEmpty(nameOnChange, fcNoDkmn) || isTheOneEmpty(nameOnChange, fcNoKpp)) {

        if (!dontChangeState) {
          this.setFormValue(fcNoKpt, "");
          this.setFormValue(fcNoKpp, "");
          this.setFormValue(fcNoDkmn, "");
          this.setFormValue(fcJenisDkmn, "");
          this.setFormValue(fcNegaraPengeluar, "");
          this.setFormValue(fcHubungan, "");
        }
      }

      // set all to enable first
      if (!dontChangeState) {
        this.setFormDisabled(fcNoKpt, false);
        this.setFormDisabled(fcNoKpp, false);
        this.setFormDisabled(fcNoDkmn, false);
        this.setFormDisabled(fcJenisDkmn, false);

        // add for skc only - set jenis dokumen to disabled on reset
        if (forSkc) {
          this.setFormDisabled(fcJenisDkmn, true);
        }

        this.setFormDisabled(fcNegaraPengeluar, true);

        this.setFormRequired(fcNoDkmn, false);
        this.setFormRequired(fcJenisDkmn, false);
        this.setFormRequired(fcNegaraPengeluar, false);
      }

      // determine which kunci carian is used
      var isKpt = isTheOne(nameOnChange, fcNoKpt);
      var isKpp = isTheOne(nameOnChange, fcNoKpp);
      var isNoDkmn = isTheOne(nameOnChange, fcNoDkmn) || isTheOne(nameOnChange, fcJenisDkmn) || isTheOne(nameOnChange, fcNegaraPengeluar);

      if (!dontChangeState) {
        if (isKpt) {
          //console.log("isKpt");
          this.setFormDisabled(fcNoKpp, true);
          this.setFormDisabled(fcNoDkmn, true);
          this.setFormDisabled(fcJenisDkmn, true);
          this.setFormDisabled(fcNegaraPengeluar, true);

          this.setFormValue(fcNoKpp, "");
          this.setFormValue(fcNoDkmn, "");
          this.setFormValue(fcJenisDkmn, "");
          this.setFormValue(fcNegaraPengeluar, "");

        } else if (isNoDkmn) {
          //console.log("fcNoDkmn");

          this.setFormDisabled(fcNoKpt, true);
          this.setFormDisabled(fcNoKpp, true);
          this.setFormValue(fcNoKpt, "");
          this.setFormValue(fcNoKpp, "");
          this.setFormRequired(fcNoDkmn, true);
          this.setFormRequired(fcJenisDkmn, true);


          // kalau jenis dokumen on change buat validation ni
          if (nameOnChange === fcJenisDkmn.name || nameOnChange === fcNoDkmn.name) {

            // add for skc only -- bila on change no dok baru bukak jenis dok
            if (forSkc) {
              if (nameOnChange === fcNoDkmn.name) {
                this.setFormRequired(fcJenisDkmn, true);
              }
            }

            var valueJenisDokumen = this.getFormValue(fcJenisDkmn);
            if (DokumenMalaysia.indexOf(valueJenisDokumen) >= 0) {
              if (nameOnChange === fcJenisDkmn.name) {
                this.setFormValue(fcNegaraPengeluar, MalaysiaCode);
              }
              this.setFormDisabled(fcNegaraPengeluar, true);
            } else {
              if (nameOnChange === fcJenisDkmn.name) {
                this.setFormValue(fcNegaraPengeluar, "");
              }
              this.setFormRequired(fcNegaraPengeluar, true);
            }


          } else if (nameOnChange === fcNegaraPengeluar.name) {
            this.setFormRequired(fcNegaraPengeluar, true);
          }

        } else if (isKpp) {
          //console.log("isKpp");

          this.setFormDisabled(fcNoKpt, true);
          this.setFormDisabled(fcNoDkmn, true);
          this.setFormDisabled(fcJenisDkmn, true);
          this.setFormDisabled(fcNegaraPengeluar, true);

          this.setFormValue(fcNoKpt, "");
          this.setFormValue(fcNoDkmn, "");
          this.setFormValue(fcJenisDkmn, "");
          this.setFormValue(fcNegaraPengeluar, "");
        }

        // if value empty for jenis dokumen
        if (nameOnChange === fcJenisDkmn.name && this.isFormValueEmpty(fcJenisDkmn)) {
          this.setFormValue(fcNegaraPengeluar, "");
        }

        if (nameOnChange === fcNoDkmn.name && this.isFormValueEmpty(fcNoDkmn)) {
          this.setFormValue(fcJenisDkmn, "");
          this.setFormValue(fcNegaraPengeluar, "");
        }
      }



      // kalau no dokumen dah okay, n yg change to jenis dok and neg peng, and value dia empty
      // utk override jadi optional balik sume
      // Pre Pilot - Yong
      if (kCarian_isOnEmptyButHasNoDokumen(this, {
          nameOnChange: nameOnChange,
          noDok: fcNoDkmn,
          jenisDok: fcJenisDkmn,
          negPeng: fcNegaraPengeluar
        })) {
        resetAllToInitialState();
      }

      if (isKpt || isKpp || isNoDkmn) {
        // for no dokumen all 3 are needed
        if (isNoDkmn) {
          if (!this.isFormValueEmpty(fcNoDkmn) && !this.isFormValueEmpty(fcJenisDkmn) && !this.isFormValueEmpty(fcNegaraPengeluar)) {
            return true;
          } else {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }
    },

    // #########################################################################
    // Photo
    loadImageByKpt(fc, kptNo, {
      isMale,
      isFemale
    }) {
      // kalau tak empty
      // debug
      if (!this.isFormValueEmpty(fc)) {
        let val = this.getFormValue(fc);
        if (val != PhotoHelper.PhotoDefault.Male && val != PhotoHelper.PhotoDefault.Female) {
          console.log("loadImageByKpt -> fc tak empty and bukan default")
          return;
        }
      }

      const setDefaultPhoto = () => {
        var defaultPhoto = "";
        if (isMale) {
          defaultPhoto = PhotoHelper.PhotoDefault.Male;
        } else if (isFemale) {
          defaultPhoto = PhotoHelper.PhotoDefault.Female;
        } else {
          defaultPhoto = PhotoHelper.PhotoDefault.Male;
        }
        this.setFormValue(fc, defaultPhoto);
      }

      setDefaultPhoto();

      PhotoHelper.loadPhotoByKpt(kptNo, (photo64) => {
        this.setFormValue(fc, photo64);
      }, err => {
        console.error("err loadImageByKpt", err);
        //setDefaultPhoto();
      })
    },
    // #########################################################################
    // Journal translog function 
    addToSirenBis({
      noPermohonan
    }) {
      let dataAll = this.getFormDataForJournal();
      let noPermohonanVal = dataAll[noPermohonan.name];

      let data = createSirenBisParam(this, {
        noPermohonan: noPermohonanVal
      });

      ApiHelper.localTransRequest(ApiHelper.LocalAction.CRT_SIREN_BIS, data, (res) => {

      }, (err) => {

      })
    },
    /*
    kalau isRawData is true,
    maksudnya kena cari dalam out entity and in index [0]
    */
    getJournalTxnFld(data, isRawData) {
      isRawData = typeof isRawData == "undefined" ? true : isRawData;
      try {
        if (isRawData) {
          data = data[TWJR.OutEntity][0];
        }
        var txnFld1 = data[TWJR.WjrTxnFld1];
        var txnFld2 = data[TWJR.WjrTxnFld2];
        txnFld1 = (typeof txnFld1 !== "string") ? "" : txnFld1;
        txnFld2 = (typeof txnFld2 !== "string") ? "" : txnFld2;

        let txnFldStr = txnFld1 + txnFld2
        txnFldStr = this.fixJournalDataString(txnFldStr)

        var dataObj = JSON.parse(txnFldStr);
        return dataObj;
      } catch (err) {
        console.error("getJournalTxnFld ->", err);
        return {};
      }
    },
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
      } else if (key.indexOf(CheckboxFn.PRE_CHECKBOX) == 0) {
        standardKey = CheckboxFn.PRE_CHECKBOX + this.getStandardFcName(key.replace(CheckboxFn.PRE_CHECKBOX, ""));
      } else if (key.indexOf(CheckboxFn.PRE_OLDVAL) == 0) {
        standardKey = CheckboxFn.PRE_OLDVAL + this.getStandardFcName(key.replace(CheckboxFn.PRE_OLDVAL, ""));
      } else {
        // hantar yang telah di uppercasekan
        standardKey = key;
      }
      return standardKey;
    },
    setFormValueFromWebJournal(data, skipFcArr) {
      const isSkipName = (skipNameArr, name) => {
        return skipNameArr.indexOf(name) >= 0;
      }

      // const getStandardFcName = (name) => {
      //   // - Fid1001NoPermohonan -> Fid1001

      //   let standardKey = name;
      //   let key = name.toUpperCase();
      //   if (key.indexOf("FID") == 0) {
      //     // get all number after FID
      //     let fidNum = "";
      //     for (var idx = 3; idx < key.length; idx++) {
      //       let number = key[idx];
      //       number = Number.parseInt(number);
      //       if (!isNaN(number)) {
      //         fidNum += number;
      //       } else {
      //         break;
      //       }
      //     }
      //     standardKey = "Fid" + fidNum;
      //   } else {
      //     // hantar yang telah di uppercasekan
      //     standardKey = key;
      //   }
      //   return standardKey;
      // }

      const getStandardFcMap = (dataObj) => {
        /**
         {Fid1001 : Fid1001NoPermohonan}
        */
        let toRet = {};
        for (var k in dataObj) {
          let standardKey = this.getStandardFcName(k);
          toRet[standardKey] = k;
        }
        return toRet;
      }

      const getValHelper = (dataObj, name, standardFc) => {
        // fix name ikut object
        let standardName = this.getStandardFcName(name);
        name = standardFc[standardName];

        var val = dataObj[name];

        if (typeof val === "undefined") {
          return null;
        }

        return val;
      }

      // Start process setFormValueFromWebJournal
      try {
        let skipNameArr = [];
        if (Array.isArray(skipFcArr)) {
          for (var i in skipFcArr) {
            skipNameArr.push(skipFcArr[i].name);
          }
        }
        var dataObj = this.getJournalTxnFld(data);
        //console.log(dataObj);

        let standardFc = getStandardFcMap(dataObj);
        //console.log(standardFc);

        var transName = this.transactionTransName;
        var mapping = [];
        var rawData = [];

        for (var tab in this.FC) {
          var tabFcs = this.FC[tab];
          var tabFcObj = {};
          mapping.push({
            tab: transName + "_" + tab,
            entity: tab
          });

          for (var fcKey in tabFcs) {
            var fcObj = tabFcs[fcKey];
            if (typeof fcObj.children !== "undefined" && fcObj.formatType != FormatHelper.FormatType.LIST_TABLE) {
              for (var chIndex in fcObj.children) {
                let ch = fcObj.children[chIndex];
                let _nameForRaw = ch;
                if (!isSkipName(skipNameArr, ch)) {
                  tabFcObj[_nameForRaw] = getValHelper(dataObj, _nameForRaw, standardFc);
                }
              }

              // for old val multiple
              if (fcObj.hasCheckboxFn) {
                for (var chIndex in fcObj.children) {
                  let ch = fcObj.children[chIndex];
                  let _nameForRaw = this.old_name(ch);
                  tabFcObj[_nameForRaw] = getValHelper(dataObj, _nameForRaw, standardFc);
                }
              }

            } else {
              let _nameForRaw = fcObj.name;
              if (!isSkipName(skipNameArr, fcObj.name)) {
                tabFcObj[_nameForRaw] = getValHelper(dataObj, _nameForRaw, standardFc);
              }

              // for old val single
              if (fcObj.hasCheckboxFn) {
                let _nameForOld = this.old_name(fcObj.name);
                tabFcObj[_nameForOld] = getValHelper(dataObj, _nameForOld, standardFc);
              }

            }


            // for checkbox
            if (fcObj.hasCheckboxFn) {
              let _nameForCb = this.cb_name(fcObj.name);
              console.log("_nameForCb", _nameForCb)
              console.log("dataObj", dataObj)
              console.log("standardFc", standardFc)
              tabFcObj[_nameForCb] = getValHelper(dataObj, _nameForCb, standardFc);
            }

            rawData[tab] = [tabFcObj];
          }
        }

        console.log("rawData", rawData);
        // console.log("mapping", mapping);

        this.setFormValueFromSoapData(rawData, mapping);

      } catch (err) {
        console.error("Err setFormValueFromWebJournal", err);
      }
    },
    skcAddToWebJournal(applNoFc, {
      isOfflineUpdate,
      paymentInd,
      confirmInd,
      inquiryInd,
      customTxnCode,
      success,
      error
    }) {

      const fixParam = (param) => {
        if (typeof paymentInd !== "undefined") {
          param[TWTR.InEntity][TWTR.WtrPymtInd] = paymentInd;
        }
        if (typeof confirmInd !== "undefined") {
          param[TWTR.InEntity][TWTR.WtrConfInd] = confirmInd;
        }
        if (typeof inquiryInd !== "undefined") {
          param[TWTR.InEntity][TWTR.WtrInqInd] = inquiryInd;
        }
        return param;
      }

      var isSkipWas = false;

      // kalau takde handler success, 
      // kita assume dia gabung dgn txn update
      if (typeof success === "undefined") {
        isSkipWas = true;
      }

      this.addToWebJournal(applNoFc, undefined, undefined, customTxnCode, undefined, success, error, fixParam, isSkipWas, isOfflineUpdate);
    },
    addToWebJournal(applNoFc, addExtraData, customUnix, customTxnCode, isDebug, successHandler, errorHandler, fixParamHandler, isSkipWas, isOfflineUpdate, isSkipSiren) {
      isSkipSiren = typeof isSkipSiren === "undefined" ? false : isSkipSiren;

      if (!isSkipSiren) {
        // add to siren bis here
        this.addToSirenBis({
          noPermohonan: applNoFc
        });
      }

      let data = this.getFormDataForJournal();

      if (typeof addExtraData !== "undefined" && addExtraData !== null) {
        data = addExtraData(data);
      }

      isSkipWas = typeof isSkipWas === "undefined" ? true : isSkipWas;
      isOfflineUpdate = typeof isOfflineUpdate === "undefined" ? false : isOfflineUpdate;

      if (typeof customUnix === "undefined" || customUnix == "" || customUnix == null) {
        customUnix = TimeHelper.getUnixTimestampNow();
      }

      var param = {}
      param[TWJR.InEntity] = createTwjrParam(this, data, data[applNoFc.name], customUnix, customTxnCode);
      param[TWTR.InEntity] = createTwtrParam(this, data, data[applNoFc.name], customUnix, customTxnCode);


      if (typeof fixParamHandler !== "undefined" && fixParamHandler !== null) {
        param = fixParamHandler(param);
      }

      console.log("addToWebJournal punya param -- function ni akan insert dlm TWJR and TWTR trus");
      console.log(JSON.parse(JSON.stringify(param)));

      isDebug = typeof isDebug === "undefined" ? false : isDebug;
      if (isDebug) {
        return;
      }

      // OFFLINE
      // if (IsUseWas && HasOffline.indexOf(this.transactionTransCode) >= 0) {
      //   param[TWJR.InEntity][TWJR.WjrTxnOnlInd] = "0";
      //   param[TWTR.InEntity][TWTR.WtrTxnOnlInd] = "0";
      //   ApiHelper.soapRequest({
      //     webService: WebJournal.webService,
      //     method: WebJournal.method,
      //     param: param,
      //     responseEntity: [],
      //     success: (data, warning) => {
      //       // if (warning != null) {
      //       //   this.alertWarning(warning);
      //       // }
      //     },
      //     error: err => {
      //       if (err !== null) {
      //         console.error("Error in addToWebJournal BRANCH", err);
      //       }
      //       //this.alertError(err);
      //     }
      //   });
      // }

      // ONLINE
      param[TWJR.InEntity][TWJR.WjrTxnOnlInd] = "1";
      param[TWTR.InEntity][TWTR.WtrTxnOnlInd] = "1";

      // masukkan param journal dalam store 
      // so that soapRequest utk update boleh ambil data ni 
      // dan letak dlm import dia
      this.transSetJournalData(param);



      if (isOfflineUpdate) {
        ApiHelper.insertJournalOffline(param, successHandler, errorHandler);
        return;
      }

      // yang normal dlm txn akan isSkipWas = true
      // skcAddToWebJournal -> isSkipWas  = false (tapi kalau tkde success handler, kita assume dia nk gabung ngn update)
      // kita update ke was kalaau tak migrate journal lagi 
      // atau isSkipWas set kepada false (by default isSkipWas akan jadi true, dalam skc je dia set kpd false)
      if (!isSkipWas || !isMigrateJournal) {
        ApiHelper.soapRequest({
          webService: IsUseWas ? WebJournal.webServiceWas : WebJournal.webService,
          method: WebJournal.method,
          param: param,
          responseEntity: [],
          success: (data, warning) => {
            // if (warning != null) {
            //   this.alertWarning(warning);
            // }
            if (successHandler) {
              successHandler(data);
            }
          },
          error: err => {
            if (errorHandler) {
              errorHandler(err);
            }
            if (err !== null) {
              console.error("Error in addToWebJournal WAS", err);
            }
            //this.alertError(err);
          }
        });
      }

    },
    // #########################################################################
    // Other function
    // focus to the field that has no value and return false
    // return true if all has value
    isAllRequiredHasValue(nameArr) {
      for (var i in nameArr) {
        var name = nameArr[i];
        name = this.getNameFromFC(name);
        if (this.isFormValueEmpty(name)) {
          this.alertError("Sila isi semua ruang yang diperlukan", () => {
            this.focusToFormField(name);
          });
          return false;
        }
      }
      return true;
    },
    isAtLeastOneValid(nameArr) {
      for (var i in nameArr) {
        if (this.isFormValueValid(nameArr[i])) {
          return true;
        }
      }
      return false;
    },
    // we assume mmg nameArr ni sume required
    isAllValueValid(nameArr) {
      //console.log("isAllValueValid", JSON.parse(JSON.stringify(nameArr)));

      for (var i in nameArr) {
        var name = nameArr[i];
        // kalau ada yang tak valid trus return false
        if (!this.isFormValueValid(name)) {
          return false;
        }
      }
      return true;
    },
    // nameArr taksemestinya required, kena check dulu
    isAllRequiredValueValid(nameArrAll) {
      let reqArr = [];
      for (var i in nameArrAll) {
        let valReq = this.getFormRequired(nameArrAll[i])
        if (valReq == true || (Array.isArray(valReq) && valReq[0] == true)) {
          reqArr.push(nameArrAll[i]);
        }
      }

      return this.isAllValueValid(reqArr);
    },
    getNameFromFC(name) {
      if (typeof name === "undefined" || name == null) {
        return "";
      }

      if (typeof name !== "string") {
        return name.name;
      }

      return name;
    },
    setThisData(key, name, value) {
      name = this.getNameFromFC(name);
      var tab = this.tabId;
      // first time not in store yet
      //var fromStore = this.transactionFormObjectByName(key, tab, name);
      //console.log("fromStore", fromStore);
      //console.log("fromStore", this[key][name]);
      //this.transSetFormObjectByName({ key: key, tab: tab, name: name, data: value })
      //return;
      if (this.transactionFormObjectByName(key, tab, name) == null || key == "formRef") {
        //console.log("asdasd",key,name,value);
        //console.log("fromStore", this[key], name, value);
        this.$set(this[key], name, value)
      }
      // recreate from store
      else {
        this.transSetFormObjectByName({
          key: key,
          tab: tab,
          name: name,
          data: value
        })
      }
    },
    getOtherTabData(tab, key, name) {
      name = this.getNameFromFC(name);
      return this.transactionFormObjectByName(key, tab, name);
    },
    setOtherTabData(tab, key, name, value) {
      name = this.getNameFromFC(name);

      //console.log("setOtherTabData", tab, key, name, value)
      // first time not in store yet
      // if (this.transactionFormObjectByName(key, tab, name) == null) {
      //     this.$set(this[key], name, value)
      // }
      // // recreate from store
      // else {
      this.transSetFormObjectByName({
        key: key,
        tab: tab,
        name: name,
        data: value
      })
      //}
    },
    // if ref is array we cannot save in store,
    // so for radiobox, we only save ref that the user select
    getRefFromRaw(ref, value) {
      var toRet = ref;
      if (Array.isArray(ref)) {
        // check if checkbox
        if (value == null) {
          for (var i in ref) {
            if (ref[i].checked == true) {
              value = ref[i].value;
            }
          }
        }

        for (var i in ref) {
          if (ref[i].value == value) {
            toRet = ref[i];
            break;
          }
        }
      }

      return toRet;
    },

    onChange(name, value, error, ref) {
      name = this.getNameFromFC(name);

      if (value !== null && typeof value !== "undefined") {
        this.setFormValue(name, value);
      }

      if (error !== null && typeof error !== "undefined") {
        this.setFormError(name, error);
      }
      this.setFormRef(name, this.getRefFromRaw(ref, value));
    },
    getFormObjectFromStore(key) {
      return this.transactionFormObject(key, this.tabId);
    },
    setFormObjectToStore(key) {
      this.transSetFormObject({
        key: key,
        tab: this.tabId,
        data: this[key]
      });
    },

    // #########################################################################
    // Hook
    // Tab 2 created -> Tab 1 before destroy -> Tab 2 Mounted 
    startCreated(FC) {
      //console.log("startCreated");
      // tabId need to be set first
      this.tabId = this.transactionCurrentTabId;
      this.FC = FC;

      // setFc Mapping Here
      this.transInitFcMap(FC);
    },
    startMounted() {
      //console.log("startMounted");
      // need to be here sebab masa before destroy akan set value utk tab lain
      this.formValue = this.getFormObjectFromStore("formValue");
      this.formDisabled = this.getFormObjectFromStore("formDisabled");
      this.formRequired = this.getFormObjectFromStore("formRequired");
      this.formError = this.getFormObjectFromStore("formError");

      if (this.initializeTab) {
        this.initializeTab();
      } else {
        console.error("initializeTab is not defined for", this.tabId);
      }

      try {
        this.focusOnInit();
      } catch (err) {
        console.log("Error in StartMounted when try focusOnInit")
      }
    },
    startBeforeDestroy() {
      //console.log("startBeforeDestroy");
      if (this.nextTabValidation) {
        this.nextTabValidation();
      } else {
        console.error("nextTabValidation is not defined for", this.tabId);
      }
      this.saveAllToStore();
    },
    saveAllToStore() {
      this.setFormObjectToStore("formRef");
      this.setFormObjectToStore("formValue");
      this.setFormObjectToStore("formDisabled");
      this.setFormObjectToStore("formRequired");
      this.setFormObjectToStore("formError");
    },
    addJournalParamForKemaskini(applNoFc, param, addExtraData, customUnix, customTxnCode) {

      let data = this.getFormDataForJournal();

      if (typeof param == "undefined") {
        param = {};
      }

      if (typeof addExtraData !== "undefined" && addExtraData !== null) {
        data = addExtraData(data);
      };

      if (typeof customUnix === "undefined" || customUnix == "" || customUnix == null) {
        customUnix = TimeHelper.getUnixTimestampNow();
      };

      param[TWJR.InEntity] = createTwjrParam(this, data, data[applNoFc.name], customUnix, customTxnCode);
      param[TWTR.InEntity] = createTwtrParam(this, data, data[applNoFc.name], customUnix, customTxnCode);

      // OFFLINE
      if (IsUseWas && HasOffline.indexOf(this.transactionTransCode) >= 0) {
        param[TWJR.InEntity][TWJR.WjrTxnOnlInd] = "0";
        param[TWTR.InEntity][TWTR.WtrTxnOnlInd] = "0";
      } else {
        param[TWJR.InEntity][TWJR.WjrTxnOnlInd] = "1";
        param[TWTR.InEntity][TWTR.WtrTxnOnlInd] = "1";
      };

      return param;

    },

    //validasi branch code
    validasiBranchCode(fcNoPermohonan) {
      if (!this.isFormValueValid(fcNoPermohonan)) {
        return;
      }
      let noPer = this.getFormValue(fcNoPermohonan);

      if (noPer != "undefined") {
        let codeBranch = this.authUser.BRANCH_CODE;
        let valueSubstr = noPer.substr(0, 8);

        if (codeBranch != valueSubstr) {
          this.alertError("Hanya Cawangan Tempat Permohonan Sahaja Dibenarkan Membuat Pertanyaan Ini");
          this.focusToFormField(fcNoPermohonan);
          this.setFormValue(fcNoPermohonan, "");
          this.pertanyaanDisabled = true;
          console.log("pertanyaanBranch");
          return;
        }
      }
    },

    // #########################################################################
    // From Mutations
    ...mapMutations(getMutations())
  };
}
