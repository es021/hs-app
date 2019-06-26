import {
  PrintingUrl
} from '../config/app-config';
import {
  DokumenMalaysia,
  DokumenPolis,
  DokumenTentera,
  MalaysiaCode
} from "../config/trans-config";
import {
  decodeHtml
} from "./util-helper";
import * as SkcHelper from "./skc-helper";

export const ID = {

}

export const MULTIPLE_PAGE = "MULTIPLE_PAGE";
export const MULTIPLE_PARAM = "MULTIPLE_PARAM";
export const MULTIPLE_PARAM_DELIM = ";";

export const MetaData = {
  USER_ID: "USER_ID",
  BRANCH_CODE: "BRANCH_CODE",
  TIME_UPDATE: "TIME_UPDATE",
  DATE_TODAY: "DATE_TODAY",
  PC_ID: "PC_ID",
  TRANS_CODE: "TRANS_CODE",
}

const noInfo = "Maklumat Tidak Berkenaan";

/**
 * reformat dan gabungkan alamat
 * @param {Object}  component this
 * @param {FC}      alamat1 
 * @param {FC}      alamat2 
 * @param {FC}      alamat3 
 * @param {FC}      poskod 
 * @param {FC}      bandar 
 * @param {FC}      negeri 
-- isBreakLine = true
ALAMAT 1,
ALAMAT 2,
ALAMAT 3,
20050 JOHOR BAHRU,
JOHOR.


-- isBreakLine = false
ALAMAT 1, ALAMAT 2, ALAMAT 3, 20050 JOHOR BAHRU, JOHOR.
 */

export function combineAddressNoComma(_this, tabName, alamatFc, poskodFc, bandarFc, negeriFc, isBreakLine) {
  return combineAddress(_this, tabName, alamatFc, poskodFc, bandarFc, negeriFc, isBreakLine, false);
}

export function combineAddressNoDot(_this, tabName, alamatFc, poskodFc, bandarFc, negeriFc, isBreakLine) {
  let address = combineAddress(_this, tabName, alamatFc, poskodFc, bandarFc, negeriFc, isBreakLine, false);
  // let addressLen = address.length;
  // address = address.substring(0, addressLen - 1);
  return address;
}

export function combineAddress(_this, tabName, alamatFc, poskodFc, bandarFc, negeriFc, isBreakLine, isComma) {
  isBreakLine = typeof isBreakLine === "undefined" ? false : isBreakLine;
  isComma = typeof isComma === "undefined" ? true : isComma;

  let alamatArr = _this.getFormValueByTab(tabName, alamatFc);

  if (!Array.isArray(alamatArr)) {
    alamatArr = ["", "", ""];
  }

  let alamat1 = alamatArr[0];
  let alamat2 = alamatArr[1];
  let alamat3 = alamatArr[2];
  let poskod = _this.getFormValueByTab(tabName, poskodFc);
  let bandar = _this.getFormSelectLabelByTab(tabName, bandarFc);
  let negeri = _this.getFormSelectLabelByTab(tabName, negeriFc);

  let endChar;
  //endChar = isBreakLine ? ",\n" : ", ";
  endChar = isComma ? "," : "";
  endChar += isBreakLine ? "\n" : " ";

  let alamat = '';

  if (alamat1 !== '' && alamat1 != null) {
    alamat += alamat1 + endChar;
  }

  if (alamat2 !== '' && alamat2 != null) {
    alamat += alamat2 + endChar;
  }

  if (alamat3 !== '' && alamat3 != null) {
    alamat += alamat3 + endChar;
  }

  let hasPoskod = false;
  if (poskod !== '' && poskod != null) {
    //alamat += poskod + ' ' + bandar + endChar;
    alamat += poskod;
    hasPoskod = true;
  }

  if (bandar !== '' && bandar != null) {
    if (hasPoskod) {
      alamat += ' ';
    }
    alamat += bandar + endChar;
  } else {
    // kalau ad negeri baru letak endChar
    if (negeri !== '' && negeri != null) {
      alamat += endChar;
    }
  }

  if (negeri !== '' && negeri != null) {
    alamat += negeri + (isComma ? '.' : "");
  }


  // trim endChar yang last skali
  let lenEndChar = endChar.length;
  let lastChar = alamat.substr(alamat.length - lenEndChar);
  if (lastChar == endChar) {
    alamat = alamat.substr(0, alamat.length - lenEndChar);
  }

  // return formData;
  console.log("combine address", alamat);
  return alamat;
}


export function combineLesen(_this, tabName, jenisLesen1, jenisLesen2, jenisLesen3, jenisLesen4, jenisLesen5, isBreakLine) {
  isBreakLine = typeof isBreakLine === "undefined" ? false : isBreakLine;
  let jL = "";
  let jLFc = [jenisLesen1, jenisLesen2, jenisLesen3, jenisLesen4, jenisLesen5];
  for (var i in jLFc) {
    let isLesenNotEmpty = !_this.isFormValueEmptyByTab(tabName, jLFc[i]);
    let lesen_v = _this.getFormValueByTab(tabName, jLFc[i]);
    if (isLesenNotEmpty) {
      for (var j in SkcHelper.LesenDataset) {
        let lesen = SkcHelper.LesenDataset[j];
        if (lesen_v == lesen[0].value) {
          if (isBreakLine == false) {
            jL = jL + ", " + lesen[0].label;
          } else {
            jL = jL + "\n" + lesen[0].label;
          }
        }
      }
    }
  }
  return jL.substring(1);
}

// export function combineAddress(alamat1, alamat2, alamat3, poskod, bandar, negeri) {

//   // let alamat1 = formData[pAlamat1.name];
//   // let alamat2 = formData[pAlamat2.name];
//   // let alamat3 = formData[pAlamat3.name];
//   // let poskod = formData[pPoskod.name];
//   // let bandar = formData[pBandar.name];
//   // let negeri = formData[pNegeri.name];

//   let alamat = alamat1 + ',\\n';

//   if (alamat2 !== '')
//     alamat += alamat2 + ',\\n';
//   if (alamat3 !== '')
//     alamat += alamat3 + ',\\n';
//   if (poskod !== '')
//     alamat += poskod + ' ' + bandar + ",\\n";
//   // if (bandar !== '')
//   //   alamat += bandar;
//   if (negeri !== '')
//     alamat += negeri;

//   // formData[pAlamat1.name] = alamat;

//   // return formData;
//   return alamat;
// }

// // return one liner dokumen pengenalan by priority
// // 1. No Pengenalan Polis / Tentera
// // 2. No KPT
// // 3. No KPP
// // 4. No Dokumen Lain2
// export function dokumenPengenalanToPrint(
//   component, tabName, pKpt, pKpp, pNoDokLain, pJenDok, pNegaraPengeluar) {

//   let noDokLain = component.getFormValueByTab(tabName, pNoDokLain);
//   let jenDok = component.getFormSelectLabelByTab(tabName, pJenDok);
//   let negaraPengeluar = component.getFormSelectLabelByTab(tabName, pNegaraPengeluar);
//   let negaraPengeluarCode = component.getFormValueByTab(tabName, pNegaraPengeluar);
//   if (negaraPengeluarCode == MalaysiaCode) {
//     negaraPengeluar = "";
//   }

//   let jenDokCode = component.getFormValueByTab(tabName, pJenDok);

//   if (jenDokCode == DokumenPolis || jenDokCode == DokumenTentera) {
//     return noDokLain + " " + jenDok + " " + negaraPengeluar;
//   } else if (!component.isFormValueEmptyByTab(tabName, pKpt)) {
//     return component.getFormValueByTab(tabName, pKpt);
//   } else if (!component.isFormValueEmptyByTab(tabName, pKpp)) {
//     return component.getFormValueByTab(tabName, pKpp);
//   } else if (!component.isFormValueEmptyByTab(tabName, pNoDokLain)) {
//     return noDokLain + " " + jenDok + " " + negaraPengeluar;
//   }

//   return "";
// }


// return one liner dokumen pengenalan by priority
// 1. No Dokumen Malaysia
// 2. No KPT
// 3. No KPP
// 4. No Dokumen Lain2
export function dokumenPengenalanToPrint(
  component, tabName, pKpt, pKpp, pNoDokLain, pJenDok, pNegaraPengeluar) {

  let noDokLain = component.getFormValueByTab(tabName, pNoDokLain);
  let jenDok = component.getFormSelectLabelByTab(tabName, pJenDok);
  let negaraPengeluar = component.getFormSelectLabelByTab(tabName, pNegaraPengeluar);
  let negaraPengeluarCode = component.getFormValueByTab(tabName, pNegaraPengeluar);
  if (negaraPengeluarCode == MalaysiaCode) {
    negaraPengeluar = "";
  }
  //let jenDokCode = component.getFormValueByTab(tabName, pJenDok);

  if (negaraPengeluarCode == MalaysiaCode) {
    return noDokLain + " " + jenDok + " " + negaraPengeluar;
  } else if (!component.isFormValueEmptyByTab(tabName, pKpt)) {
    return component.getFormValueByTab(tabName, pKpt);
  } else if (!component.isFormValueEmptyByTab(tabName, pKpp)) {
    return component.getFormValueByTab(tabName, pKpp);
  } else if (!component.isFormValueEmptyByTab(tabName, pNoDokLain)) {
    return noDokLain + " " + jenDok + " " + negaraPengeluar;
  }

  return "";
}


/**
 * create html table code
 * [{label:"",value:""},{label:"",value:""}]
 * @param {object value to print} data 
 * @param {object table size} param1 
 */
export function createHtmlInfoTable(data, {
  labelWidth, // 110px
  tableWidth, // 400px
  fontSize, //10px
  isBold
}) {
  labelWidth = typeof labelWidth === "undefined" ? "110px" : labelWidth;
  tableWidth = typeof tableWidth === "undefined" ? "400px" : tableWidth;
  fontSize = typeof fontSize === "undefined" ? "10px" : fontSize;
  isBold = typeof isBold === "undefined" ? false : isBold;

  let infoTable = "";
  for (var i in data) {
    let label = data[i]["label"];
    let value = data[i]["value"]

    if (typeof value !== "string") {
      value = "";
    }
    value = value.toUpperCase();
    let dot = ":";
    if (value == null || typeof value === "undefined" || value == "") {
      dot = "";
    }
    if (isBold) {
      infoTable += `<tr>
        <td valign="top" style="text-align: left; width: ${labelWidth};">${label}</td>
        <td valign="top" style="text-align: left; width: 9px;">${dot}</td>
        <td valign="top" style="text-align: left;"  style="font-weight: bold" >${value}</td>
      </tr>`;
    } else {
      infoTable += `<tr>
      <td valign="top" style="text-align: left; width: ${labelWidth};">${label}</td>
      <td valign="top" style="text-align: left; width: 9px;">${dot}</td>
      <td valign="top" style="text-align: left;">${value}</td>
    </tr>`;
    }
  }
  console.log("isBold > ", isBold);
  infoTable = `<table style="font-size:${fontSize}; font-family: Arial; border-spacing: -5px; width: ${tableWidth};">${infoTable}</table>`;

  // console.log(infoTable);
  return infoTable;
}

/**
 * 
 * @param {*} headers 
 * @param {*} datas 
 * @param {parentDiv, table, headerTr, headerTd, bodyTrOdd, bodyTrEven, bodyTd} customStyle 
 * @param {isMergeCol} rowConfig 
 */
export function createHtmlTable(headers, datas, customStyle, rowConfig) {
  let style = {
    parentDiv: "font-family: Arial, Helvetica, sans-serif;",
    table: "border-collapse: collapse; border-spacing: 0; width: 100%; border: 1px solid blue;",
    headerTr: "background: #4e4e4e; color: white; font-weight: bold;",
    headerTd: "padding:0px 7px;",
    bodyTrOdd: "background: white;",
    bodyTrEven: "background: #e7e7e7;",
    bodyTd: "padding:0px 7px;",
  };

  if (typeof customStyle !== "undefined") {
    style = {
      ...style,
      ...customStyle
    }
  }

  rowConfig = typeof rowConfig === "undefined" ? [] : rowConfig;

  let headerText = "";
  for (var i in headers) {
    headerText += `<td style="${style.headerTd}">${headers[i]}</td>`;
  }

  let bodyText = "";
  for (var i in datas) {
    let d = datas[i];
    let styleBody = (i % 2 == 0) ? style.bodyTrEven : style.bodyTrOdd;
    let config = rowConfig[i];
    let toAdd = "";

    if (typeof config !== "undefined") {
      if (config.isMergeCol) {
        toAdd += `<tr style="${styleBody}">`;

        if (typeof config.mergeDivision !== "undefined") {
          // rowConfig[i] = {
          //   isMergeCol: true,
          //   mergeDivision: [8, 1],
          //   mergeText: ["Total Amaun", row.totalAmaun]
          // };
          for (var divIndex in config.mergeDivision) {
            let colspan = `colspan="${config.mergeDivision[divIndex]}"`;
            toAdd += `<td ${colspan} style="${style.bodyTd}">${config.mergeText[divIndex]}</td>`;
          }
        } else {
          for (var j in d) {
            let colspan = j == 0 ? `colspan="${headers.length}"` : "";
            toAdd += `<td ${colspan} style="${style.bodyTd}">${d[j]}</td>`;
          }
        }
        toAdd += "</tr>";
      }
    } else {
      toAdd += `<tr style="${styleBody}">`;
      for (var j in d) {
        toAdd += `<td style="${style.bodyTd}">${d[j]}</td>`;
      }
      toAdd += "</tr>";
    }

    bodyText += toAdd;
  }

  let r = `<div style="${style.parentDiv}">
    <table style="${style.table}">
      <thead>
        <tr style="${style.headerTr}">
          ${headerText}
        </tr>
      </thead>
      <tbody>
        ${bodyText}
      </tbody>
    </table>
  </div>`;

  console.log(r);
  return r;

}

/**
 * tukar format kpt dari tanpa - kepada ada -
 * @param {string kpt} kpt 
 */
export function printKpt(kpt) {


  if (kpt == "" || kpt == null || typeof kpt === "undefined") {
    return kpt;
  }

  // if (typeof (kpt) != "string") {
  //   return false;
  //     }

  kpt = kpt.replaceAll('-', '');
  kpt = kpt.substr(0, 6) + `-` + kpt.substr(6, 2) + `-` + kpt.substr(8, 4);
  return kpt;
}

/**
 * Priority pada no dokumen - no kpp - no kpt
 * @param {Object}  component this
 * @param {FC}      tab
 * @param {FC}      noKpt 
 * @param {FC}      noKpp 
 * @param {FC}      noDokumen 
 * @param {FC}      jenisDokumen 
 * @param {FC}      negaraPengeluar 
 **/
export function getId(
  componentThis, tabName, noKpt, noKpp, noDokumen, jenisDokumen, negaraPengeluar
) {
  let id;
  let noDok = componentThis.getFormValueByTab(tabName, noDokumen);
  let noKPP = componentThis.getFormValueByTab(tabName, noKpp);
  let noKPT = componentThis.getFormValueByTab(tabName, noKpt);

  if (noDok) {
    let jDok = componentThis.getFormValueByTab(tabName, jenisDokumen);
    let jenDok = componentThis.getFormSelectLabelByTab(tabName, jenisDokumen);
    let negPengeluar = componentThis.getFormSelectLabelByTab(tabName, negaraPengeluar);

    if (DokumenMalaysia.indexOf(jDok) >= 0) {
      id = noDok + " " + jenDok;
    } else {
      id = noDok + " " + jenDok + " " + negPengeluar;
    }
  } else if (noKPP) {
    id = noKPP;
  } else {
    let kptTarikh = noKPT.substr(0, 6);
    let kptKod = noKPT.substr(6, 2);
    let kptID = noKPT.substr(8, 4);
    id = kptTarikh + "-" + kptKod + "-" + kptID;
  }
  return id;
}


/**
 * prepare maklumat kunci carian
 * @param {FC}      kpt 
 * @param {FC}      kpp 
 * @param {FC}      noDokLain 
 * @param {FC}      jenDok 
 * @param {FC}      negaraPengeluar 
 * @param {this}    component 
 * @param {Object}  formData 
 * @param {String}  tabName 
 */
export function kunciCarianToPrint(
  formData, component, pKpt, pKpp, pNoDokLain, pJenDok, pNegaraPengeluar, pTabName
) {

  let kpt = formData[pKpt.name]
  let kpp = formData[pKpp.name];
  let noDokLain = formData[pNoDokLain.name];
  let jenDok = formData[pJenDok.name];
  let negaraPengeluar = formData[pNegaraPengeluar.name];
  let jenDokCd = component.getFormValueByTab(tabName, pJenDok);

  //format untuk field kpt
  if (kpt === '' && kpp === '')
    formData[pKpt.name] = noInfo;
  else
    formData[pKpt.name] = kpt + '<br>' + kpp;

  //format untuk field no dokumen lain
  if (DokumenMalaysia.indexOf(jenDokCd) >= 0)
    formData[pNoDokLain.name] = noDokLain + ' ' + jenDok;
  else
    formData[pNoDokLain.name] = noDokLain + ' ' + jenDok + '<br>' + negaraPengeluar;

  return formData;
}


/**
 * @author Wan Zulsarhan
 * @desc untuk guna printing template yang sama dgn txn lain, so fc pun kena adopt dari txn yang original
 * @param {*} obj 
 * @param {*} otherFc 
 * 
 * @example 
 * in obj => {Fid1001NoPer : "123"}
 * in otherFc => {T1 : {noPermohonan : {name: "Fid1001NoPermohonan", label: "No Permohonan" } } , T2 : {} ...}
 * out newObj => {Fid1001NoPermohonan : "123"}
 */
export function mapObjectWithOtherFc(_this, obj, otherFc) {
  // 1. listkan sume fc from other fc
  let map = {};
  for (var tab in otherFc) {
    let tabFc = otherFc[tab];
    for (var fcKey in tabFc) {
      let fc = tabFc[fcKey];
      if (typeof fc.children !== "undefined") {
        for (var indexCh in fc.children) {
          let name = fc.children[indexCh];
          let standard = _this.getStandardFcName(name);
          map[standard] = name;
        }
      } else {
        let name = fc.name;
        let standard = _this.getStandardFcName(name);
        map[standard] = name;
      }
    }
  }

  // 2. start mapping
  let newObj = {};
  for (var fcName in obj) {
    let standard = _this.getStandardFcName(fcName);
    let fcOther = map[standard];
    newObj[fcOther] = obj[fcName];
  }

  // console.log("ori obj", obj);
  // console.log("map", map);
  // console.log("new obj", newObj);

  return newObj;
}

// #######################################################

// printing helper used in printing popup n printing iframe
export function createField(name, value, parent) {
  value = fixEmptyData(value);

  var hiddenField = document.createElement("input");
  hiddenField.setAttribute("type", "hidden");
  hiddenField.setAttribute("name", name);
  hiddenField.setAttribute("value", value);
  parent.appendChild(hiddenField);
}
export function fixEmptyData(value) {
  // SIT jangan letak '-'
  if (value == "" || value == null || typeof value == "undefined") {
    // return "-";
    return "";
  } else {
    return value;
  }
}
export function getForm(reportId, formData) {
  var form = document.createElement("form");
  form.setAttribute("method", "post");
  form.setAttribute("action", PrintingUrl);
  createField("ReportName", reportId, form);

  //console.log("ReportData", JSON.stringify(formData));
  //console.log("ReportData", formData);

  // fix formData
  for (var i in formData) {
    formData[i] = fixEmptyData(formData[i]);

    // fix html entities
    let v = formData[i];
    if (typeof v == "string") {
      if (v.indexOf(">") <= -1 && v.indexOf("<") <= -1) {
        formData[i] = decodeHtml(v);
      }
    }
  }

  createField("ReportData", JSON.stringify(formData), form);
  return form;
}


export function generateBreakLine(str, len, lineNum) {
  var LEN = [];
  var arrRes = [];
  for (var i = 0; i < lineNum; i++) {
    arrRes.push("");
    LEN.push(len);
  }
  var arrTemp = str.split(" ");

  var index = 0;
  for (var i in arrTemp) {
    var toAdd = arrTemp[i];
    if (arrRes[index] != "") {
      toAdd = " " + toAdd;
    }

    if (arrRes[index].length + toAdd.length <= LEN[index]) {
      // add to current line WITH space
      arrRes[index] += toAdd;
    } else {
      // add to next line WITHOUT space
      index++;
      if (typeof arrRes[index] === "undefined") {
        break;
      }
      arrRes[index] += arrTemp[i];
    }
  }


  let toRet = "";
  for (var i in arrRes) {
    if (arrRes[i] != "") {
      if (i > 0) {
        toRet += "<br>";
      }
      toRet += arrRes[i];
    }
  }
  return toRet;
}
