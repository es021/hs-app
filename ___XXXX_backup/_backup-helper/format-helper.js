import * as TimeHelper from './time-helper';

// ###########################################
// const
export const FormatType = {
  NO_PERMOHONAN: "noPermohonan",
  DATE: "date",
  TIME: "time",
  LIST_TABLE: "listTable",
  IMAGE: "image"
}

export const ChildrenType = {
  CHECKBOX: "checkbox",
  TEXT: "text",
  NUMBER: "number",
  DATE: "date",
  TIME: "time",
}

// ###########################################
// Formatter

export function noPermohonan(input) {
  if (input == "" || input == null || typeof input === "undefined") {
    return input;
  }

  if (input.indexOf("-") >= 0) {
    input = input.replaceAll("-", "");
  }

  // 8-8-6-2
  if (input.length == 24) {
    var branch = input.substring(0, 8);
    var date = input.substring(8, 16);
    var time = input.substring(16, 22);
    var pc = input.substring(22, 24);
    return `${branch}-${date}-${time}-${pc}`;
  }

  return input;
}


// ###########################################
// value to db

export function noPermohonanToDb(input) {
  if (input == null) {
    return "";
  }
  return input.replaceAll("-", "");
}

export function timeToDb(input) {
  return TimeHelper.timeConvertValueToDb(input);
}

export function dateToDb(input) {
  return TimeHelper.dateConvertValueToDb(input);
}

// in : 20190114170907000000
// out : 14/01/2019 05:09 PM
export function dbToDateTime(input) {
  if (typeof input === "string") {
    let date = input.substr(0, 8);
    let time = input.substr(8, 14);
    let toRet = dbToDate(date) + " " + dbToTime(time);
    return toRet;
  }

  return input;
}

// in : 2019-05-30 11:10:56.0
// out : 201905301110560
export function mssqlDateToDbDate(input) {
  // in : 2019-05-30 11:10:56.0
  // out : 201905301110560
  if (typeof input === "string") {
    return input.replaceAll("-", "")
      .replaceAll(" ", "")
      .replaceAll(":", "")
      .replaceAll(",", "");
  }
  return "";
}



// ###########################################
// value to print

export function timeToPrint(input) {
  return TimeHelper.timeConvertValueToPrint(input);
}

export function dateToPrint(input) {
  return TimeHelper.dateConvertValueToPrint(input);
}


///#######################################
// db to value
export function dbToNegeriCode(input) {
  // kalau backend hantar more than 2 length dia
  if (typeof input === "string") {
    if (input.length > 2) {
      input = input.substr(2);
    }
  }
  return input;
}

export function dbToNoPermohonan(input) {
  return noPermohonan(input);
}

export function dbToTime(input, includeSecond) {
  return TimeHelper.timeConvertDbToValue(input, includeSecond);
}

export function dbToDate(input) {
  return TimeHelper.dateConvertDbToValue(input);
}

// ################################################################
// Parent function

// SIT
// &amp; -> &
export function decodeHTMLEntities(text) {
  var el = document.createElement('textarea');
  el.innerHTML = text;
  var decode = el.value;
  return decode;
}

export function reformatDbToValue(fcObject, value) {
  if (value == null || typeof value === "undefined" || value == "") {
    return value;
  }

  if (fcObject == null || typeof fcObject === "undefined" || fcObject == "") {
    return value;
  }

  if (value == "0") {
    return value;
  }

  if (typeof value === "string") {
    if (value.replaceAll("0", "") == "") {
      return null;
    }
  }

  var formatType = fcObject.formatType;
  switch (formatType) {
    case FormatType.DATE:
      value = dbToDate(value);
      break;
    case FormatType.TIME:
      value = dbToTime(value);
      break;
    case FormatType.NO_PERMOHONAN:
      value = dbToNoPermohonan(value);
      break;
  }

  value = decodeHTMLEntities(value);

  return value;
}

export function reformatValueToDb(fcObject, value) {
  if (value == null || typeof value === "undefined" || value == "") {
    return value;
  }

  if (fcObject == null || typeof fcObject === "undefined" || fcObject == "") {
    return value;
  }

  var formatType = fcObject.formatType;
  switch (formatType) {
    case FormatType.DATE:
      value = dateToDb(value);
      break;
    case FormatType.TIME:
      value = timeToDb(value);
      break;
    case FormatType.NO_PERMOHONAN:
      value = noPermohonanToDb(value);
      break;
  }


  return value;
}
