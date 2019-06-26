import * as ApiHelper from './api-helper';
import {
  TxnPair
} from '../config/trans-config';

export const getTransDesc = (mapTransCode, txnCode) => {
  var txnDesc = mapTransCode[txnCode];
  if (typeof txnDesc == "undefined") {
    txnCode = TxnPair[txnCode]
    txnDesc = mapTransCode[txnCode];
  }

  try {
    txnDesc = txnDesc.replaceAll(txnCode + " - ", "");
  } catch (err) {}

  return txnDesc;
}

export const DATA_NAME = "NAME";
export const DATA_DOCUMENT = "DOCUMENT";
export const DATA_SPC_KPT = "SPC_KPT";
export const DATA_SPC_NAME = "SPC_NAME";
export const findDataInJournal = (componentThis, rawData, type) => {
  // const fcNama = ["F1321"];
  // const fcKpt = ["F1303", "F1304"];
  // const fcDokumen = ["F1311", "F1312"];
  // const fcJenisDok = ["F1313", "F1314"];
  // const fcNegaraPengeluar = ["F1317", "F1318"];

  const fcNama = ["F1321", "Fid4153", "Fid4155"];
  const fcKpt = ["F1303", "F1304", "Fid4101", "Fid4103"];
  const fcDokumen = [
    "F1311",
    "F1312",
    "Fid4133",
    "Fid4135"
  ];
  const fcJenisDok = ["F1313", "F1314", "Fid4137", "Fid4141"];
  const fcNegaraPengeluar = [
    "F1317",
    "F1318",
    "Fid4145",
    "Fid4149"
  ];

  // for spc
  const fcKptSPC = ['F1621', 'F4101', 'F1249', "Fid4101"];
  const fcNamaSPC = ['F8019', 'F4153', "Fid4153"];

  let data = {};
  for (var key in rawData) {
    let standardName = componentThis.getStandardFcName(key);
    data[standardName] = rawData[key];
  }

  const findInFcs = (data, fcs) => {
    var toRetInner = null;
    for (var i in fcs) {
      let v = data[fcs[i]];
      if (typeof v !== "undefined" && v !== "") {
        toRetInner = v;
        return toRetInner
      }
    }

    return toRetInner;
  };

  var toRet = null;
  if (type == DATA_NAME) {
    toRet = findInFcs(data, fcNama);
  } else if (type == DATA_SPC_KPT) {
    toRet = findInFcs(data, fcKptSPC);

  } else if (type == DATA_SPC_NAME) {
    toRet = findInFcs(data, fcNamaSPC);

  } else if (type == DATA_DOCUMENT) {
    // cari kpt dulu
    toRet = findInFcs(data, fcKpt);

    // cari in dokumen plak
    if (toRet == null) {
      toRet = findInFcs(data, fcDokumen);
      var jenisDok = findInFcs(data, fcJenisDok);
      if (jenisDok !== null && jenisDok !== "") {
        jenisDok = componentThis.mapJenisDokumen[jenisDok];
        toRet += " (" + jenisDok + ")";
      }

      var negPeng = findInFcs(data, fcNegaraPengeluar);
      if (negPeng !== null && negPeng !== MalaysiaCode && negPeng !== "") {
        negPeng = componentThis.mapNegara[negPeng];
        toRet += " (" + negPeng + ")";
      }
    }
  }

  if (toRet == null) {
    toRet = "";
  }
  return toRet;
};

export const isSupervisor = (authUser, transLevel) => {
  const SVR_BIT = 3;
  var lvlByte = authUser['OPER_LVL' + transLevel];
  var auth = lvlByte[SVR_BIT - 1];

  console.log(transLevel, lvlByte, auth)
  return auth == "1";
}

export const getDefaultTxnCodeRange = (authUser) => {
  // kalau user tak pilih jenis transaksi apa
  // amik dari users punya level, sama ada anak angkat or kahwin cerai

  const isLevelValid = levelOper => {
    if (
      typeof levelOper !== "undefined" &&
      levelOper != "" &&
      levelOper.replaceAll("0", "") != ""
    ) {
      return true;
    }

    return false;
  };

  var start = "";
  var end = "";

  var oper4Valid = isLevelValid(authUser["OPER_LVL4"]);
  var oper8Valid = isLevelValid(authUser["OPER_LVL8"]);

  if (oper4Valid && oper8Valid) {
    start = "340000";
    end = "389999";
  } else if (oper4Valid) {
    start = "340000";
    end = "349999";
  } else if (oper8Valid) {
    start = "380000";
    end = "389999";
  }

  return {
    start: start,
    end: end
  };
}


export function loadTxnDesc(_this, {
  success,
  error
}) {
  ApiHelper.localAuthRequest(
    "getNavi", {
      version: "2121"
    },
    data => {
      let obj = {};
      for (var i in data) {
        var d = data[i];
        var code = d["NAVI_CODE"];
        if (code == "") {
          continue;
        }
        var numCode = Number.parseInt(code);
        if (!isNaN(numCode) && code.length == (numCode + "").length) {
          var label = d["NAVI_LABEL"];

          // replace
          try {
            label = label.replaceAll(code + " - ", "");
          } catch (err) {}


          obj[code] = label;
        }
      }

      // cater for txn pair
      for (var txn in TxnPair) {
        let sameTxn = TxnPair[txn];
        let label = obj[sameTxn];
        if (typeof label == "string") {
          obj[txn] = label;
        }
      }

      success(obj);
    },
    err => {
      error(err);
    }
  );
}
