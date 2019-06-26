// #########################################################
// Transaction Helper
import store from '../store'; // path to your Vuex store
import {
  getStore
} from '../store'; // path to your Vuex store
import {
  HomePage,
  ServerConsoleErrorLogUrl,
  isProd
} from '../config/app-config';
import {
  postRequest
} from './api-helper';

export function splitText(text, maxLen, count) {
  var toRet = [];
  if (typeof text !== "string") {
    text = "";
  }

  var start = 0;
  var end = maxLen;
  for (var i = 0; i < count; i++) {
    toRet.push(text.substring(start, end));
    start = end;
    end = maxLen * (i + 2);
  }

  return toRet;
}


export function generateNamaRingkas(namaPenuh) {
  const LEN = [27, 27, 26];
  var toRet = ["", "", ""];
  var nameArr = namaPenuh.split(" ");

  var index = 0;
  for (var i in nameArr) {
    var toAdd = nameArr[i];
    if (toRet[index] != "") {
      toAdd = " " + toAdd;
    }

    if (toRet[index].length + toAdd.length <= LEN[index]) {
      // add to current line WITH space
      toRet[index] += toAdd;
    } else {
      // add to next line WITHOUT space
      index++;
      if (typeof toRet[index] === "undefined") {
        break;
      }
      toRet[index] += nameArr[i];
    }
  }
  return toRet;
}

export function generateInitialName(fcNama, _this) {
  let namaPenuh = _this.getFormValue(fcNama);
  let namaArr = namaPenuh.split(" ");
  let namaInit = "";

  for (var i in namaArr) {
    namaInit += namaArr[i].substr(0, 1);
  }

  return namaInit;
}

export function generateNoPermohonan() {
  var d = new Date();
  var user = getStore("auth", "authUser");
  var cawangan = user.BRANCH_CODE;
  var pcid = user.PC_ID;

  var noPermohonan = cawangan + '-' + d.getFullYear() + '' +
    ('0' + (d.getMonth() + 1)).slice(-2) + '' + ('0' + d.getDate()).slice(-2) +
    '-' + ('0' + d.getHours()).slice(-2) + '' + ('0' + d.getMinutes()).slice(-2) +
    '' + ('0' + d.getSeconds()).slice(-2) + '-' + pcid.slice(-2);

  return noPermohonan;
}

export function getBranchCode() {
  var user = getStore("auth", "authUser");
  return user.BRANCH_CODE;
}

//#######################################################################################
//#######################################################################################
export function generateNaviUrl(pageId) {
  return HomePage + pageId;
}

export const createGetParam = data => {
  var toRet = "?";
  for (var k in data) {
    toRet += k + "=" + data[k] + "&";
  }
  toRet = toRet.substring(0, toRet.length - 1);
  return toRet;
};

export function _GET(sParam) {
  try {
    var sPageURL = decodeURIComponent(window.location.href);
    var getParam = sPageURL.split("?")[1];
    var sURLVariables = getParam.split('&');
    var sParameterName;
    var i;
    var toRet = null;
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === sParam) {
        toRet = sParameterName[1] === undefined ? true : sParameterName[1];
        break;
      }
    }
    return toRet;
  } catch (err) {
    console.log("GET err", err);
    return null;
  }

}

export function convertDecToHex(n) {
  try {
    n = Number.parseInt(n);
    return n.toString(16);
  } catch (err) {
    console.error("Err convertDecToHex", err, n)
    return "";
  }
}


export function convertDecToBinary(n) {
  try {
    n = Number.parseInt(n);
    return n.toString(2);
  } catch (err) {
    console.error("Err convertDecToBinary", err, n)
    return "";
  }
}


export function convertBinaryToDec(n) {
  try {
    return parseInt(n, 2);
  } catch (err) {
    console.error("Err convertBinaryToDec", err, n)
    return "";
  }
}

String.prototype.convertToNumberLength = function (len) {
  var num = Number.parseInt(this);
  if (isNaN(num)) {
    return this;
  }
  var numStr = num + "";
  return numStr.padStart(len, "0");
}


String.prototype.replaceAll = function (search, replace) {
  return this.replace(new RegExp(search, 'g'), replace);
}

String.prototype.capitalize = function () {
  const main = (str, delim, toLowerCaseFirst = true) => {
    let temp = str;
    if(toLowerCaseFirst){
      temp = str.toLowerCase();
    }

    let arr = temp.split(delim);
    let toRet = "";
    for (var i in arr) {
      let str = arr[i];
      str = str.charAt(0).toUpperCase() + str.substr(1);
      if (i > 0) {
        toRet += delim;
      }
      toRet += str;
    }

    return toRet;
  }

  let toRet = "";
  toRet = main(this, " ");
  toRet = main(toRet, "\n", false);
  return toRet;
}


String.prototype.escapeSpecialChars = function () {
  return this.replace(/\\n/g, "\\n").replace(/\\N/g, "\\n");
}

if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;
    padString = String((typeof padString !== 'undefined' ? padString : ' '));
    if (this.length > targetLength) {
      return String(this);
    } else {
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
      }
      return padString.slice(0, targetLength) + String(this);
    }
  };
}


//#########################################################
// ---------- Window Popup ------------------------------ 
var windowPopups = {};
export const WINDOW_ID = "JPN_WINDOW";
export const WINDOW_ID_HELP = "WINDOW_ID_HELP";
// function createYourWindow(paramWinId){
//     var yourWindow = someExtGetElement(WINDOW_ID) ;
//     if ( !yourWindow ){
//       // create your window here
//       yourWindow = new Ext.Window ...
//     }
//     yourWindow.show()
//   }


export function openWindowPopup(url, id, width, height, top, left) {

  closeWindowPopup(id);

  // var left = document.getElementById("jpn-left-bar").offsetWidth;
  // var width = screen.width - left;
  // var top = 100;
  // var height = screen.height - 200;

  // fullscreen
  width = (!width) ? screen.width : width;
  height = (!height) ? screen.height : height;
  top = (!top) ? 0 : top;
  left = (!left) ? 0 : left;

  id = (typeof id === "undefined") ? WINDOW_ID : id;

  var windowPopup = window.open(
    url,
    id,
    `toolbar=no,scrollbars=yes,resizable=no,top=${top},left=${left},width=${width},height=${height}`,
    true
  );

  windowPopups[id] = windowPopup;

  return windowPopup;

  //setTimeout(function(){windowPopup.focus()},1000);
  //window.open('javascript:void window.focus()', WINDOW_ID, '');

  // the following will only work if it's the same domain, else subject to SOP -
  // so in the case of initially opening it with google, this won't work!
  //myWindow.document.location.href = "/example/test.html";
}


// export function openWindowPopup2(url) {
//     //var myWindow = window.open(url, WINDOW_ID);
//     closeWindowPopup();
//     var left = document.getElementById("jpn-left-bar").offsetWidth;
//     //var width = document.getElementById("app-content").clientWidth - left;
//     var width = screen.width - left;

//     var top = 100;

//     var height = screen.height - 200;
//     //var height = window.innerHeight;

//     windowPopup = window.open(
//         url,
//         "_blank",
//         `menubar=no,status=no,toolbar=no,scrollbars=yes,alwaysRaised=yes,resizable=no,top=${top},left=${left},width=${width},height=${height}`,
//         true
//     );

//     setTimeout(function(){windowPopup.focus();},1000);
//    // windowPopup.focus();

//     // the following will only work if it's the same domain, else subject to SOP -
//     // so in the case of initially opening it with google, this won't work!
//     //myWindow.document.location.href = "/example/test.html";
// }

export function closeWindowPopup(id) {
  id = (typeof id === "undefined") ? WINDOW_ID : id;
  var windowPopup = windowPopups[id];

  if (typeof windowPopup !== "undefined" && windowPopup !== null) {
    var r = windowPopup.close();
    console.log("close", r);
  }
}

/**
 * calculate age from DOB. DOB format: dd/mm/yyyy
 * @param {String date: dd/mm/yyyy} dateString 
 * @param {String date: dd/mm/yyyy} dateTodayCustom 
 */
export function getAge(dateString, dateTodayCustom) {
  dateString = dateString.substr(3, 2) + '/' + dateString.substr(0, 2) + '/' + dateString.substr(6, 4);
  let today = new Date();

  if (typeof dateTodayCustom !== "undefined") {
    dateTodayCustom = dateTodayCustom.substr(3, 2) + '/' + dateTodayCustom.substr(0, 2) + '/' + dateTodayCustom.substr(6, 4);
    today = new Date(dateTodayCustom);
  }

  let birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  // if(isNaN(age)){
  //   age = "";
  // }

  return age;
}

export function decodeHtml(str) {
  var txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

export function encodeHtml(str) {
  let encodedStr = str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return encodedStr;
}

// WjrAplNo => WJR_APL_NO
export function convertCamelCaseToUnderline(k) {
  if (typeof k !== "string") {
    return "";
  }
  return k.split(/(?=[A-Z])/).join("_").toUpperCase();
}

// WJR_APL_NO => WjrAplNo
export function convertUnderlineToCamelCase(k) {
  if (typeof k !== "string") {
    return "";
  }
  k = k.toLowerCase();
  let arr = k.split("_");
  for (var i in arr) {
    arr[i] = arr[i].capitalize();
  }
  return arr.join("");
}

export function convertCamelCaseToUnderline_ALLKEY(obj) {
  let toRet = {};
  for (var k in obj) {
    toRet[convertCamelCaseToUnderline(k)] = obj[k];
  }

  return toRet;
}

export function convertUnderlineToCamelCase_ALLKEY(obj) {
  let toRet = {};
  for (var k in obj) {
    toRet[convertUnderlineToCamelCase(k)] = obj[k];
  }

  return toRet;
}
