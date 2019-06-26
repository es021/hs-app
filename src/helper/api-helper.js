//TODO soap request here
import * as TimeHelper from './time-helper';
import {
  isProd,
} from '../config/app-config';

import {
  WebJournal,
  TWJR,
  TWTR,
  fixTwjrSpecialChar,
  TwjrConfig
} from '../config/trans-config';

import {
  getStore
} from '../store/index';
import {
  TransMeta
} from '../store/modules/transaction';

export const SoapErrorString = ["<faultcode>soapenv:Server</faultcode>", "java.beans.PropertyVetoException", "SOAPException", "Errorjava", "ProxyException"];


export function getRequest({
  url,
  success,
  error
}) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, true);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      success(xhttp.responseText)
    }
    // FIX STOPPER
    else if (this.readyState == 4 && this.status == 500) {
      error("");
    }
  };
  xhttp.onerror = function (e) {
    error(e);
  };
  xhttp.send();
}

function serialize(obj, prefix) {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}

export function postRequest({
  url,
  data,
  success,
  error
}) {
  ////console.log("post request", url)
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        success(xhttp.responseText)
      } else {
        error(xhttp.responseText);
      }
    }
  };
  xhttp.onerror = function (e) {
    error(e);
  };

  xhttp.send(serialize(data));
}
