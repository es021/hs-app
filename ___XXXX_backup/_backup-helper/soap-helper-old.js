import {
  SoapErrorEntity,
  SoapSuccessEntity,
  SoapSuccessAttrText,
  SoapErrorAttrText,
  SoapErrorAttrIndicator,
  SoapErrorIndicatorError,
  SoapErrorIndicatorWarning,
} from "../config/app-config";

/*****************************************************************************\

 Javascript "SOAP Client" library

 @version: 1.4 - 2005.12.10
 @author: Matteo Casati, Ihar Voitka - http://www.guru4.net/
 @description: (1) SOAPClientParameters.add() method returns 'this' pointer.
               (2) "_getElementsByTagName" method added for xpath queries.
               (3) "_getXmlHttpPrefix" refactored to "_getXmlHttpProgID" (full 
                   ActiveX ProgID).
               
 @version: 1.3 - 2005.12.06
 @author: Matteo Casati - http://www.guru4.net/
 @description: callback function now receives (as second - optional - parameter) 
               the SOAP response too. Thanks to Ihar Voitka.
               
 @version: 1.2 - 2005.12.02
 @author: Matteo Casati - http://www.guru4.net/
 @description: (1) fixed update in v. 1.1 for no string params.
               (2) the "_loadWsdl" method has been updated to fix a bug when 
               the wsdl is cached and the call is sync. Thanks to Linh Hoang.
               
 @version: 1.1 - 2005.11.11
 @author: Matteo Casati - http://www.guru4.net/
 @description: the SOAPClientParameters.toXML method has been updated to allow
               special characters ("<", ">" and "&"). Thanks to Linh Hoang.

 @version: 1.0 - 2005.09.08
 @author: Matteo Casati - http://www.guru4.net/
 @notes: first release.

\*****************************************************************************/

export function SOAPClientParameters(paramObj) {

  var _pl = new Array();
  var _text = "";
  var obj = this;
  this.createParameterText = function (paramObj) {
    var res = "";
    for (var k in paramObj) {
      var p = paramObj[k];
      if (typeof p === "object") {
        p = obj.createParameterText(p);
      }
      res += "<" + k + ">" + p + "</" + k + ">";
    }
    return res;
  }

  this.add = function (name, value) {
    _pl[name] = value;
    return this;
  }
  this.setText = function (txt) {
    _text = txt;
  }
  this.toXml = function () {
    if (_text != "") {
      return _text;
    }

    var xml = "";
    for (var p in _pl) {
      if (typeof (_pl[p]) != "function") {
        //xml += "<" + p + ">" + _pl[p].toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</" + p + ">";
        xml += "<" + p + ">" + _pl[p] + "</" + p + ">";
      }
    }
    return xml;
  }

  // Added by Wan Zulsarhan
  if (typeof paramObj !== "undefined") {
    this.setText(this.createParameterText(paramObj));
  }

}

var SOAPClientClass = function () {
  // private: wsdl cache
  this.SOAPClient_cacheWsdl = new Array();

}

SOAPClientClass.prototype.getResponseData = function (xmlRes, responseEntity, responseField) {
  console.log(responseField, "responseField ");
  if (responseField == null || typeof responseField == "undefined" || !Array.isArray(responseField)) {
    responseField = [];
  }
  var data = [];
  var xmlResponse = xmlRes.documentElement;
  var fullNodeList = xmlResponse.getElementsByTagName(responseEntity);
  for (var i = 0; i < fullNodeList.length; i++) {
    var d = {};
    var children = fullNodeList[i].children;

    for (var j = 0; j < children.length; j++) {
      var child = children[j];
      var column = child.localName;

      if (responseField.length > 0 && responseField.indexOf(column) <= -1) {
        continue;
      }

      var val = child.innerHTML;
      // trim initial spaces and end spaces
      val = val.trim();
      d[column] = val;
    }
    data.push(d);
  }

  return data;
}

// responseEntity can be type array
SOAPClientClass.prototype.doSoap = function (url, method, param, responseEntity, responseField, successHandler, errHandler) {
  SOAPClient.invoke(url, method, param, true, function (o, xmlRes) {
    var errorWarning = SOAPClient.getErrorWarning(xmlRes);
    if (errorWarning.error !== null) {
      errHandler(errorWarning.error);
    } else {
      if (responseEntity == null || typeof responseEntity == "string" || !Array.isArray(responseEntity)) {
        responseEntity = [responseEntity];
      }

      if (responseField == null || typeof responseField == "undefined") {
        responseField = {};
      }

      var data = {};
      for (var i in responseEntity) {
        data[responseEntity[i]] = SOAPClient.getResponseData(xmlRes, responseEntity[i], responseField[responseEntity[i]]);
      }

      var successMes = SOAPClient.getSuccessMes(xmlRes);
      successHandler(data, errorWarning.warning, successMes);
    }

  });
}


SOAPClientClass.prototype.getSuccessMes = function (xmlRes) {
  var success = null;
  try {
    var xmlResponse = xmlRes.documentElement;
    var el = xmlResponse.getElementsByTagName(SoapSuccessEntity);
    if (typeof el[0] !== "undefined") {
      success = el[0].getElementsByTagName(SoapSuccessAttrText)[0].innerHTML;
    }
  } catch (err) {
    console.error("getSuccessMes", err);
    success = null;
  }
  return success
}

SOAPClientClass.prototype.getErrorWarning = function (xmlRes) {
  var text = null;
  var indicator = null;

  try {
    var xmlResponse = xmlRes.documentElement;
    if (xmlResponse.innerHTML.indexOf("ProxyException") >= 0) {
      return {
        warning: null,
        error: "Request Failed. Please check backend response in network console",
      };
    }

    var el = xmlResponse.getElementsByTagName(SoapErrorEntity);

    // try get text and indicator here
    if (typeof el[0] !== "undefined") {
      try {
        text = el[0].getElementsByTagName(SoapErrorAttrText)[0].innerHTML;
      } catch (err) {
        text = null;
      }

      try {
        indicator = el[0].getElementsByTagName(SoapErrorAttrIndicator)[0].innerHTML;
      } catch (err) {
        indicator = null;
      }
    }

    if (text == "") {
      text = null;
    }

    if (indicator == "") {
      indicator = null;
    }

  } catch (err) {
    console.error("getErrorWarning", err);
    text = null;
    indicator = null;
  }

  // by default just make it as error
  if (indicator == null) {
    indicator = SoapErrorIndicatorError;
  }

  return {
    warning: indicator == SoapErrorIndicatorWarning ? text : null,
    error: indicator == SoapErrorIndicatorError ? text : null,
  };

}

SOAPClientClass.prototype.invoke = function (url, method, parameters, async, callback) {
  if (async)
    SOAPClient._loadWsdl(url, method, parameters, async, callback);
  else
    return SOAPClient._loadWsdl(url, method, parameters, async, callback);
}



// private: invoke async
SOAPClientClass.prototype._loadWsdl = function (url, method, parameters, async, callback) {
  // load from cache?
  var wsdl = this.SOAPClient_cacheWsdl[url];

  if (wsdl + "" != "" && wsdl + "" != "undefined")
    return SOAPClient._sendSoapRequest(url, method, parameters, async, callback, wsdl);
  // get wsdl
  var xmlHttp = SOAPClient._getXmlHttp();
  xmlHttp.open("GET", url + "?wsdl", async);
  if (async) {
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4)
        SOAPClient._onLoadWsdl(url, method, parameters, async, callback, xmlHttp);
    }
  }
  xmlHttp.send(null);
  if (!async)
    return SOAPClient._onLoadWsdl(url, method, parameters, async, callback, xmlHttp);
}
SOAPClientClass.prototype._onLoadWsdl = function (url, method, parameters, async, callback, req) {
  var wsdl = req.responseXML;
  this.SOAPClient_cacheWsdl[url] = wsdl; // save a copy in cache
  return SOAPClient._sendSoapRequest(url, method, parameters, async, callback, wsdl);
}
SOAPClientClass.prototype._sendSoapRequest = function (url, method, parameters, async, callback, wsdl) {
  // get namespace
  var ns = (wsdl.documentElement.attributes["targetNamespace"] + "" == "undefined") ? wsdl.documentElement.attributes.getNamedItem("targetNamespace").nodeValue : wsdl.documentElement.attributes["targetNamespace"].value;
  // build SOAP request
  var sr =
    "<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
    "<soap:Envelope " +
    "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
    "xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" " +
    "xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
    "<soap:Body>" +
    "<" + method + " xmlns=\"" + ns + "\">" +
    parameters.toXml() +
    "</" + method + "></soap:Body></soap:Envelope>";
  // send request
  var xmlHttp = SOAPClient._getXmlHttp();
  xmlHttp.open("POST", url, async);
  var soapaction = ((ns.lastIndexOf("/") != ns.length - 1) ? ns + "/" : ns) + method;
  xmlHttp.setRequestHeader("SOAPAction", soapaction);
  xmlHttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
  if (async) {
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4)
        SOAPClient._onSendSoapRequest(method, async, callback, wsdl, xmlHttp);
    }
  }
  xmlHttp.send(sr);
  if (!async)
    return SOAPClient._onSendSoapRequest(method, async, callback, wsdl, xmlHttp);
}
SOAPClientClass.prototype._onSendSoapRequest = function (method, async, callback, wsdl, req) {
  var o = null;
  var nd = SOAPClient._getElementsByTagName(req.responseXML, method + "Result");
  if (nd.length == 0) {
    if (req.responseXML.getElementsByTagName("faultcode").length > 0)
      throw new Error(500, req.responseXML.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue);
  } else
    o = SOAPClient._soapresult2object(nd[0], wsdl);
  if (callback)
    callback(o, req.responseXML);
  if (!async)
    return o;
}

// private: utils
SOAPClientClass.prototype._getElementsByTagName = function (document, tagName) {
  try {
    // trying to get node omitting any namespaces (latest versions of MSXML.XMLDocument)
    return document.selectNodes(".//*[local-name()=\"" + tagName + "\"]");
  } catch (ex) {}
  // old XML parser support
  return document.getElementsByTagName(tagName);
}

SOAPClientClass.prototype._soapresult2object = function (node, wsdl) {
  return SOAPClient._node2object(node, wsdl);
}
SOAPClientClass.prototype._node2object = function (node, wsdl) {
  // null node
  if (node == null)
    return null;
  // text node
  if (node.nodeType == 3 || node.nodeType == 4)
    return SOAPClient._extractValue(node, wsdl);
  // leaf node
  if (node.childNodes.length == 1 && (node.childNodes[0].nodeType == 3 || node.childNodes[0].nodeType == 4))
    return SOAPClient._node2object(node.childNodes[0], wsdl);
  var isarray = SOAPClient._getTypeFromWsdl(node.nodeName, wsdl).toLowerCase().indexOf("arrayof") != -1;
  // object node
  if (!isarray) {
    var obj = null;
    if (node.hasChildNodes())
      obj = new Object();
    for (var i = 0; i < node.childNodes.length; i++) {
      var p = SOAPClient._node2object(node.childNodes[i], wsdl);
      obj[node.childNodes[i].nodeName] = p;
    }
    return obj;
  }
  // list node
  else {
    // create node ref
    var l = new Array();
    for (var i = 0; i < node.childNodes.length; i++)
      l[l.length] = SOAPClient._node2object(node.childNodes[i], wsdl);
    return l;
  }
  return null;
}
SOAPClientClass.prototype._extractValue = function (node, wsdl) {
  var value = node.nodeValue;
  switch (SOAPClient._getTypeFromWsdl(node.parentNode.nodeName, wsdl).toLowerCase()) {
    default:
      case "s:string":
      return (value != null) ? value + "" : "";
    case "s:boolean":
        return value + "" == "true";
    case "s:int":
        case "s:long":
        return (value != null) ? parseInt(value + "", 10) : 0;
    case "s:double":
        return (value != null) ? parseFloat(value + "") : 0;
    case "s:datetime":
        if (value == null)
          return null;
        else {
          value = value + "";
          value = value.substring(0, value.lastIndexOf("."));
          value = value.replace(/T/gi, " ");
          value = value.replace(/-/gi, "/");
          var d = new Date();
          d.setTime(Date.parse(value));
          return d;
        }
  }
}
SOAPClientClass.prototype._getTypeFromWsdl = function (elementname, wsdl) {
  var ell = wsdl.getElementsByTagName("s:element"); // IE
  if (ell.length == 0)
    ell = wsdl.getElementsByTagName("element"); // MOZ
  for (var i = 0; i < ell.length; i++) {
    if (ell[i].attributes["name"] + "" == "undefined") // IE
    {
      if (ell[i].attributes.getNamedItem("name") != null && ell[i].attributes.getNamedItem("name").nodeValue == elementname && ell[i].attributes.getNamedItem("type") != null)
        return ell[i].attributes.getNamedItem("type").nodeValue;
    } else // MOZ
    {
      if (ell[i].attributes["name"] != null && ell[i].attributes["name"].value == elementname && ell[i].attributes["type"] != null)
        return ell[i].attributes["type"].value;
    }
  }
  return "";
}
// private: xmlhttp factory
SOAPClientClass.prototype._getXmlHttp = function () {
  try {
    if (window.XMLHttpRequest) {
      var req = new XMLHttpRequest();
      // some versions of Moz do not support the readyState property and the onreadystate event so we patch it!
      if (req.readyState == null) {
        req.readyState = 1;
        req.addEventListener("load",
          function () {
            req.readyState = 4;
            if (typeof req.onreadystatechange == "function")
              req.onreadystatechange();
          },
          false);
      }
      return req;
    }
    if (window.ActiveXObject)
      return new ActiveXObject(SOAPClient._getXmlHttpProgID());
  } catch (ex) {}
  throw new Error("Your browser does not support XmlHttp objects");
}
SOAPClientClass.prototype._getXmlHttpProgID = function () {
  if (SOAPClient._getXmlHttpProgID.progid)
    return SOAPClient._getXmlHttpProgID.progid;
  var progids = ["Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
  var o;
  for (var i = 0; i < progids.length; i++) {
    try {
      o = new ActiveXObject(progids[i]);
      return SOAPClient._getXmlHttpProgID.progid = progids[i];
    } catch (ex) {};
  }
  throw new Error("Could not find an installed XML parser");
}

export var SOAPClient = new SOAPClientClass();
