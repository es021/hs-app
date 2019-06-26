import Vue from 'vue';
import {
  SelectDefault
} from '../../config/trans-config';

export const TransMeta = {
  IS_MODE_OFFLINE: "is_mode_offline",
  IS_TXN_BAYARAN: "is_txn_bayaran",
  TIME_START: "time_start",
  TIME_END: "time_end",
  TIME_UPDATE: "time_update",
  BREADCRUMBS: "breadcrumbs",
  IS_USE_SERVER_MOCK_DATA: "is_use_server_mock_data",
  MOCK_DATA_NAME: "mock_data_name"
}

const NotConstantMeta = [TransMeta.IS_MODE_OFFLINE];

import {
  decodeHTMLEntities
} from '../../helper/format-helper';

import {
  getRefCode
} from '../../helper/api-helper';

import {
  RefNewCode,
  RefNewDesc,
  RefNewEtc,
  IsUseNewRef
} from '../../config/app-config';

const state = {
  journalData: {},
  focusOnInit: null, // this is used during on init tab trus focus
  tabEnabled: [], // store id of all tab that is enabled now
  tabData: [{
    id: ""
  }], // store all tab in this transaction
  tabHidden: [], // store id of all tab that is hidden now
  metaData: {},
  currentTabIndex: 0,
  formRef: {},
  formValue: {},
  formDisabled: {},
  formRequired: {},
  formError: {},
  fcMap: null,
  fcChildren: null,
  dataset: {
    branch: [{
        value: "Cawangan HQ",
        label: "Cawangan HQ"
      },
      {
        value: "Cawangan Lain",
        label: "Cawangan Lain"
      }
    ],
    jantina: [{
        value: "L",
        label: "Lelaki"
      },
      {
        value: "P",
        label: "Perempuan"
      }
    ],
  },
  refTable: {}
}

/// ########################################################
/// HELPER FUNCTION 



function getTransName(tabData) {
  var transName = tabData[0].id;
  let transNameArr = transName.split("_");
  // transName = transName[0];

  transName = "";
  for (var i in transNameArr) {
    if (i == transNameArr.length - 1) {
      continue;
    }
    if (i > 0) {
      transName += "_";
    }
    transName += transNameArr[i];
  }

  return transName;
}

function getTransCode(tabData) {
  var transName = getTransName(tabData);
  var code = transName.replace("T", "");
  return code;
}

function getTransClass(tabData) {
  var transName = getTransName(tabData);
  var cls = transName[2];
  return cls;
}

export function getTabNameFromFc(tabData, FC, tab) {
  var transName = getTransName(tabData)
  var tabName = transName += "_" + tab;
  return tabName;
}

function getGlobalSort(name, data) {
  let toRet = [];

  if (name.indexOf("Ref071") >= 0) {
    let arrVal = [];
    let objVal = {};
    for (var i in data) {
      let row = data[i];
      let v = row["value"];
      arrVal.push(v)
      objVal[v] = row;
    }
    arrVal = arrVal.sort();
    for (var i in arrVal) {
      toRet.push(objVal[arrVal[i]]);
    }

  } else {
    toRet = data;
  }

  return toRet;
}

// global filter data from database
function getGlobalRefFilter(name, data, value, label) {
  var validCode = null;
  var toRet = [];

  if (name == "Ref008State") {
    validCode = ["", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16"];
  }

  if (validCode !== null) {
    for (var i in data) {
      var code = data[i][value];
      if (validCode.indexOf(code) >= 0) {
        toRet.push(data[i]);
      }
    }
  } else {
    toRet = data;
  }

  //console.log(name, toRet);
  return toRet;
}

function refToSelectData(name, data, value, label, filter, isForMap, isNoDefault) {
  var toRet = [];

  if (typeof isNoDefault === "undefined") {
    isNoDefault = false
  }

  if (!isNoDefault) {
    toRet.push({
      value: "",
      label: SelectDefault
    });
  }


  if (typeof isForMap === "undefined") {
    isForMap = false
  }

  // sort

  for (var i in data) {
    var d = data[i];

    if (typeof filter !== "undefined") {
      if (!filter(d)) {
        continue;
      }
    }


    if (d[value].replaceAll(" ", "") == "") {
      continue;
    }

    d[label] = decodeHTMLEntities(d[label]);

    var labelStr = "";
    if (d[value] != d[label] && !isForMap) {
      labelStr = d[value] + " - " + d[label];
    } else {
      labelStr = d[label]
    }

    toRet.push({
      value: d[value],
      label: labelStr
    });
  }


  toRet = getGlobalSort(name, toRet);


  return toRet;
}




function getFormObject(state, key, tab) {
  var debug = key == "formRequired" && tab == "TTEMPLATE_T2"
  if (debug) {
    console.log("getFormObjectByName", key, tab, name);
  }

  try {
    var toRet = state[key][tab];
    if (debug) {
      console.log(state[key]);
      console.log(state[key]["TTEMPLATE_T2"]);
    }
    if (typeof toRet === "undefined") {
      return {};
    }
    return toRet;
  } catch (err) {
    return {};
  }
}

function getFormObjectByName(state, key, tab, name) {
  //var debug = tab == "T382000_T1" && name == "noPermohonan" && key == "formValue";
  var data = getFormObject(state, key, tab);
  //console.log(data);
  try {
    var toRet = data[name];
    //console.log(toRet);
    if (typeof toRet === "undefined") {
      return null;
    }

    return toRet;
  } catch (err) {
    return null;
  }
}

/// ########################################################
// getters

const getters = {
  transactionJournalData: state => state.journalData,
  transactionFocusOnInit: state => state.focusOnInit,
  transactionState: state => state,
  transactionMetaData: state => state.metaData,
  transactionDataset: state => state.dataset,
  transactionTabData: state => state.tabData,
  transactionTabEnabled: state => state.tabEnabled,
  transactionTransClass: state => {
    return getTransClass(state.tabData);
  },
  transactionTransCode: state => {
    return getTransCode(state.tabData);
  },
  transactionTransName: state => {
    return getTransName(state.tabData);
  },
  transactionTransFullName: state => {
    var bc = state.metaData[TransMeta.BREADCRUMBS];
    let fullName = bc[bc.length - 1].label;
    try {
      let transCode = getTransCode(state.tabData);
      fullName = fullName.replaceAll(transCode + " - ", "");
    } catch (err) {}
    return fullName;
  },
  transactionFcMap: (state) => {
    return state.fcMap;
  },
  transactionFcChildren: (state) => {
    return state.fcChildren;
  },
  transactionCurrentTabId: (state) => {
    try {
      return state.tabData[state.currentTabIndex].id
    } catch (err) {
      return null;
    }
  },
  transactionNextTabId: (state) => {
    try {
      var i = 1;
      var tabId = state.tabData[state.currentTabIndex + i].id;
      while (state.tabHidden.indexOf(tabId) >= 0) {
        i++;
        tabId = state.tabData[state.currentTabIndex + i].id;
        if (state.currentTabIndex + i >= state.tabData.length) {
          tabId = null;
          break;
        }
      }
      //console.log("state.tabData[state.currentTabIndex]", state.tabData[state.currentTabIndex]);
      //console.log("transactionNextTabId", tabId);
      return tabId;
    } catch (err) {
      return null;
    }
  },
  transactionPrevTabId: (state) => {
    try {
      var i = 1;
      var tabId = state.tabData[state.currentTabIndex - i].id;
      while (state.tabHidden.indexOf(tabId) >= 0) {
        i--;
        tabId = state.tabData[state.currentTabIndex - i].id;
        if (state.currentTabIndex - i >= -1) {
          tabId = null;
          break;
        }
      }
      return tabId;
    } catch (err) {
      return null;
    }
  },
  transactionRefTableMap: (state) => (name, {
    value,
    label,
    isEtc
  }) => {
    try {
      if (IsUseNewRef) {
        value = RefNewCode;
        label = RefNewDesc;
      }

      isEtc = typeof isEtc === "undefined" ? false : isEtc;
      if (isEtc) {
        label = RefNewEtc;
      }

      var toRet = state.refTable[name];
      if (typeof toRet === "undefined") {
        return [];
      } else {

        if (typeof value !== "undefined" && typeof label !== "undefined") {
          var selectArr = refToSelectData(name, toRet, value, label, undefined, true, undefined);
          toRet = {};
          for (var i in selectArr) {
            var sel = selectArr[i];
            toRet[sel.value] = sel.label;
          }
        }
        return toRet;
      }
    } catch (err) {
      return {};
    }
  },
  transactionRefTableRaw: (state) => (name) => {
    return state.refTable[name];
  },
  transactionRefTable: (state) => (name, {
    value,
    label,
    overrideGlobalFilter,
    isNoDefault
  }, filter) => {
    try {
      overrideGlobalFilter = typeof overrideGlobalFilter === "undefined" ? false : overrideGlobalFilter
      if (IsUseNewRef) {
        value = RefNewCode;
        label = RefNewDesc;
      }
      var toRet = state.refTable[name];

      if (typeof toRet === "undefined") {
        return [];
      } else {
        if (typeof value !== "undefined" && typeof label !== "undefined") {
          if (!overrideGlobalFilter) {
            //console.log("overrideGlobalFilter",overrideGlobalFilter);
            toRet = getGlobalRefFilter(name, toRet, value, label);
          }
          toRet = refToSelectData(name, toRet, value, label, filter, undefined, isNoDefault);
        }
        return toRet;
      }
    } catch (err) {
      return [];
    }
  },
  transactionFormErrorByName: (state) => (tab, name) => {
    return getFormObjectByName(state, "formError", tab, name);
  },
  transactionFormValueByName: (state) => (tab, name) => {
    return getFormObjectByName(state, "formValue", tab, name);
  },
  transactionFormObjectByName: (state) => (key, tab, name) => {
    return getFormObjectByName(state, key, tab, name);
  },
  transactionFormObject: (state) => (key, tab) => {
    return getFormObject(state, key, tab);
  },

  // used in form field
  transactionFormValue: (state) => (tab, name) => {
    return getFormObjectByName(state, "formValue", tab, name);
  },
}

/// ########################################################
// getters
const mutations = {
  transInitFcMap(state, FC) {
    if (state.fcMap === null) {
      var obj = {};
      var objChildren = {};

      for (var tab in FC) {
        var fcByTab = FC[tab];
        var tabName = getTabNameFromFc(state.tabData, FC, tab);
        obj[tabName] = {};
        objChildren[tabName] = {};
        for (var key in fcByTab) {
          var fcObj = fcByTab[key];
          obj[tabName][fcObj.name] = fcObj;
          // set fc children
          if (typeof fcObj.children !== "undefined" && Array.isArray(fcObj.children)) {
            for (var j in fcObj.children) {
              objChildren[tabName][fcObj.children[j]] = fcObj.name;
            }
          }
        }
      }

      state.fcChildren = objChildren;
      state.fcMap = obj;
    }
  },
  // transInitFcMap(state, FC) {
  //   if (state.fcMap === null) {
  //     var obj = {};
  //     for (var tab in FC) {
  //       var fcByTab = FC[tab];
  //       var tabName = getTabNameFromFc(state.tabData, FC, tab);
  //       for (var key in fcByTab) {
  //         var fid = fcByTab[key].name;
  //         if (typeof obj[fid] !== "undefined") {
  //           console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  //           console.error(`There are duplication of field id '${fid}' in ${obj[fid]} and ${tabName}. Please check field-config.js`)
  //         }
  //         obj[fid] = tabName;
  //       }
  //     }
  //     state.fcMap = obj;
  //   }
  // },
  transSetJournalData(state, data) {
    state.journalData = data;
  },
  transChangeTab(state, index) {
    state.currentTabIndex = index;
  },
  transSetEnabledTab(state, tabEnabled) {
    state.tabEnabled = tabEnabled;
  },
  transAddHiddenTab(state, id) {
    if (state.tabHidden.indexOf(id) <= -1) {
      state.tabHidden.push(id);
    }
  },
  transRemoveHiddenTab(state, id) {
    var index = state.tabHidden.indexOf(id);
    if (index >= 0) {
      state.tabHidden.splice(index, 1);
    }
  },
  transAddEnabledTab(state, id) {
    //console.log("transAddEnabledTab")
    if (state.tabEnabled.indexOf(id) <= -1) {
      state.tabEnabled.push(id);
    }
  },
  transRemoveEnabledTab(state, id) {
    var index = state.tabEnabled.indexOf(id);
    if (index >= 0) {
      state.tabEnabled.splice(index, 1);
    }
  },
  transSetTabData(state, tabData) {
    state.tabData = tabData;
  },
  transSetRefTable(state, {
    key,
    data
  }) {
    state.refTable[key] = data;
  },
  transSetFormObject(state, {
    key,
    tab,
    data
  }) {
    //console.log("transSetFormValue", key, tab, data);
    state[key][tab] = data;
  },
  transSetFormObjectByName(state, {
    key,
    tab,
    name,
    data
  }) {
    //console.log("transSetFormValue", key, tab, data);
    if (typeof state[key] == "undefined") {
      //state[key] = {};
      Vue.set(state, key, {})
    }
    if (typeof state[key][tab] == "undefined") {
      Vue.set(state[key], tab, {})
    }

    Vue.set(state[key][tab], name, data);
    //console.log(key, tab, name, data);
  },
  transSetMetaData(state, {
    key,
    value
  }) {
    if (typeof state.metaData[key] == "undefined" || NotConstantMeta.indexOf(key) >= 0) {
      state.metaData[key] = value;
    }
  },
  transUpdateMetaData(state, {
    key,
    value
  }) {
    state.metaData[key] = value;
  },
  transSetFocusOnInit(state, fc) {
    state.focusOnInit = fc;
  },
}

/// ########################################################
// actions
const actions = {

}

export default {
  state,
  getters,
  actions,
  mutations
}
