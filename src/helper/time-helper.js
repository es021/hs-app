import {
  ServerTimeUrl,
  STORE_OFFSET_TIME
} from "../config/app-config";

import {
  getRequest
} from './api-helper';


// ############################################################
// function for syncing time with server 
// Syncing will only be done once a day

const DefaultLocalStorage = {
  offset: 0,
  lastFetch: "",
  hasError: false
}

function getOffsetLocalStorage() {
  let obj = getLocalStorage();
  return obj.offset;
}

function getLocalStorage() {
  var obj = localStorage.getItem(STORE_OFFSET_TIME);
  try {
    if (obj == null) {
      return DefaultLocalStorage;
    }
    obj = JSON.parse(obj);
  } catch (err) {
    return DefaultLocalStorage;
  }
  return obj;
}

export function getDateTodayForLS() {
  // determine how often synching is done
  var date = new Date();
  var y = date.getFullYear();
  var m = pad(date.getMonth() + 1, 2);
  var d = pad(date.getDate(), 2);
  //var hour = date.getHours();
  return `${y}-${m}-${d}`;
}

function setOffsetLocalStorage(offset, hasError) {
  let lastFetch = getDateTodayForLS();
  let obj = {
    offset: offset,
    lastFetch: lastFetch,
    hasError: hasError
  }
  localStorage.setItem(STORE_OFFSET_TIME, JSON.stringify(obj));
}

function getServerTime() {
  try {
    var offset = getOffsetLocalStorage();
    offset = Number.parseInt(offset);
    var date = new Date();
    date.setTime(date.getTime() + offset);
    return date;
  } catch (err) {
    console.log("Error [getServerTime]", err);
    return new Date();
  }
}


function isSkipFetchServerTime() {
  let obj = getLocalStorage();
  let dateToday = getDateTodayForLS();
  if (obj.lastFetch == dateToday) {
    console.info("Skip Synching With Server Time");
    console.info("Last Synching Done On " + obj.lastFetch);
    if (obj.hasError) {
      console.info("[WARNING] Last Synching Has Error");
    }
    return true;
  } else {
    return false;
  }
}


export function getJbossServerTime(successHandler, errorHandler) {
  if (isSkipFetchServerTime()) {
    successHandler();
    return;
  }

  let url = ServerTimeUrl;
  getRequest({
    url: url,
    success: (res) => {

      let dateStr = res;
      let serverDate = new Date(Date.parse(dateStr));
      var serverTimeMillisGMT = Date.parse(serverDate.toUTCString());
      var localMillisUTC = Date.parse(new Date().toUTCString());
      let offset = serverTimeMillisGMT - localMillisUTC;

      // console.log(serverTimeMillisGMT);
      // console.log(localMillisUTC);
      console.log("Server Time Now >>> ", dateStr);
      console.log("Client Offset With Server Time >>> ", offset);

      // if less than offset network throttling we just ignore offset
      let OFFSET_THROTTLING = 10000; // 10 seconds;
      if (offset <= OFFSET_THROTTLING) {
        offset = 0;
      }
      setOffsetLocalStorage(offset, false);
      successHandler();
    },
    error: (err) => {
      console.error("Error In Fetching Server Time", err);
      setOffsetLocalStorage(0, true);
      errorHandler();
    }
  })
}

// #############################################################
//  New Function to replace new Date() used in this time-helper

function getNewDate() {
  return getServerTime();
}

// #####################################  #######################
//  function for input type date


// input : none
// output : YYYY-MM-DD-HH.MI.SS
export function getDatetimeCaGenNow() {
  return getTimeString(getUnixTimestampNow(), false, true);
}

// input : none
// output : YYYYMMDD
export function getDateDbToday() {
  //var date = new Date();
  var date = getNewDate();
  var y = date.getFullYear();
  var m = pad(date.getMonth() + 1, 2);
  var d = pad(date.getDate(), 2);
  return y + m + d;
}

// input : none
// output : DD/MM/YYYY
export function getDateValueToday() {
  //var date = new Date();
  var date = getNewDate();

  var y = date.getFullYear();
  var m = pad(date.getMonth() + 1, 2);
  var d = pad(date.getDate(), 2);

  return d + "/" + m + "/" + y;
}

// input : YYYYMMDD, YYYY-MM-DD, YYYY/MM/DD
// output : DD/MM/YYYY
export function dateConvertDbToValue(val) {
  if (val == "" || val == null || typeof val === "undefined") {
    return "";
  }

  if (val.indexOf("/") >= 0) {
    return val;
  } else if (val.indexOf("-") >= 0) {
    val = val.replace("-", "/");
    val = val.replace("-", "/");
    return val;
  } else {
    var y = val.substring(0, 4);
    var m = val.substring(4, 6);
    var d = val.substring(6, 8);
    return d + "/" + m + "/" + y;
  }
}


// input : DDMMYYYY
// output : DD/MM/YYYY
export function dateConvertFormatDayMonthYear(val) {
  if (val == "" || val == null || typeof val === "undefined") {
    return "";
  }

  if (val.indexOf("/") >= 0) {
    return val;
  } else if (val.indexOf("-") >= 0) {
    val = val.replace("-", "/");
    val = val.replace("-", "/");
    return val;
  } else {
    var d = val.substring(0, 2);
    var m = val.substring(2, 4);
    var y = val.substring(4, 8);
    return d + "/" + m + "/" + y;
  }
}

// input DD/MM/YYYY
// output YYYYMMDD
export function dateConvertValueToDb(val) {
  if (val == "" || val == null || typeof val === "undefined") {
    return "";
  }

  var toRet = "";
  try {
    var valArr = val.split("/");
    toRet = valArr[2] + valArr[1] + valArr[0];
  } catch (err) {
    toRet = "";
    console.error("dateConvertValueToDb err", err);
  }

  return toRet;
}

// ############################################################
// input DD/MM/YYYY
// output 12 Mac 2018
export function dateConvertValueToPrint(val) {
  if (val == "" || val == null || typeof val === "undefined") {
    return "";
  }

  var toRet = "";
  try {
    var valArr = val.split("/");
    var d = valArr[0];
    var m = Number.parseInt(valArr[1]);
    var y = valArr[2];
    var months = ["", "Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"];
    return d + " " + months[m] + " " + y
  } catch (err) {
    toRet = "";
    console.error("dateConvertValueToPrint err", err);
  }

  return toRet;
}

// ############################################################
// input DD/MM/YYYY
// output 12 March 2018
export function dateConvertValueToPrintEng(val) {
  if (val == "" || val == null || typeof val === "undefined") {
    return "";
  }

  var toRet = "";
  try {
    var valArr = val.split("/");
    var d = valArr[0];
    var m = Number.parseInt(valArr[1]);
    var y = valArr[2];
    var months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return d + " " + months[m] + " " + y
  } catch (err) {
    toRet = "";
    console.error("dateConvertValueToPrint err", err);
  }

  return toRet;
}

// ############################################################
//  function for input type time
const T_HARI = "T.HARI";
const T_MALAM = "T.MALAM";
const AM = "AM";
const PM = "PM";
export const ArrAmPmNormal = [AM, PM];
export const ArrAmPmSpecial = [T_HARI, T_MALAM];
export const ArrAmPmAll = [...ArrAmPmNormal, ...ArrAmPmSpecial];


// input : HH:MM AM/PM/T.HARI/T.MALAM
// output : HHMM (eg 2030 ) 4 char in 23 hour
export function timeConvertValueToDb(value) {
  if (value.indexOf(T_MALAM) >= 0) {
    return "0000";
  } else if (value.indexOf(T_HARI) >= 0) {
    return "1200";
  } else {
    var add12Hour = false;
    if (value.indexOf(PM) >= 0) {
      if (value.indexOf("12:") <= -1) {
        add12Hour = true;
      }
    }

    value = value.replace(AM, "");
    value = value.replace(PM, "");
    value = value.replace(" ", "");
    value = value.replace(":", "");

    if (add12Hour) {
      value = Number.parseInt(value) + 1200;
    }

    return value + "";
  }
}

// console.log("test", timeConvertValueToDb("12:38 PM"));


// input : HH:MM AM/PM/T.HARI/T.MALAM
// output : HH:MM <letak space dua> AM/PM/T.HARI/T.MALAM
export function timeConvertValueToPrint(value) {
  for (var i in ArrAmPmAll) {
    try {
      var aa = ArrAmPmAll[i]
      if (value.indexOf(aa) >= 0) {
        return value.replaceAll(aa, " " + aa);
      }
    } catch (err) {
      return "";
    }
  }
  return value;
}


// input : HHMM (eg 2030 ) 4 char in 23 hour
// output : HH:MM AM/PM/T.HARI/T.MALAM
// if includeSecond == true ? HH:MM:SS AM/PM/T.HARI/T.MALAM
export function timeConvertDbToValue(db, includeSecond) {
  if (typeof db === "undefined" || db == null || db == "") {
    return "";
  }

  includeSecond = typeof includeSecond === "undefined" ? false : includeSecond;

  var h = db.substring(0, 2);
  h = Number.parseInt(h);
  var m = db.substring(2, 4);
  m = Number.parseInt(m);
  var am_pm = "";

  var s = "";
  if (includeSecond) {
    s = db.substring(4, 6);
  }

  if (h == 0 && m == 0) {
    am_pm = T_MALAM;
    h = 12;
  } else if (h == 12 && m == 0) {
    am_pm = T_HARI;
  } else {
    if (h < 12) {
      am_pm = AM;
    } else if (h == 12) {
      am_pm = PM;
    } else {
      h -= 12;
      am_pm = PM;
    }
  }

  if (h < 10) {
    h = "0" + h;
  }
  if (m < 10) {
    m = "0" + m;
  }

  let toRet = "";
  if (includeSecond) {
    toRet = h + ":" + m + ":" + s + " " + am_pm;
  } else {
    toRet = h + ":" + m + " " + am_pm;
  }

  return toRet;
}

// input : none
// output : {hour,min,am_pm}
export function getInputObjectFromNow() {
  // init from current time
  //var time = new Date();
  var time = getNewDate();
  var hour = time.getHours();
  var min = time.getMinutes();
  var am_pm = "AM";

  if (hour > 12) {
    am_pm = "PM";
    hour = hour - 12;
  }

  if (hour < 10) {
    hour = "0" + hour;
  }

  if (min < 10) {
    min = "0" + min;
  }

  return {
    hour: hour,
    min: min,
    am_pm: am_pm,
  };
}

// input : HH:MM AM/PM/T.HARI/T.MALAM
// output : {hour,min,am_pm}
export function getInputObjectFromValue(value) {
  var vArr = value.split(" ");
  var am_pm = vArr[1];

  vArr = vArr[0].split(":");
  var hour = vArr[0];
  var min = vArr[1];

  return {
    hour: hour,
    min: min,
    am_pm: am_pm,
  };
}

// input : {hour,min,am_pm}
// output : HH:MM AM/PM/T.HARI/T.MALAM
export function getValueFromInputObject(hour, min, am_pm) {
  var val = hour + ":" + min + " " + am_pm;
  return val;
}


// ################################################
// Timestamp
export function timestampConvertDbToSoap(input) {
  // input : 20180925100756000000
  // output : 2018-09-25-10.07.56.000000
  try {
    var toRet = input.substring(0, 4);
    toRet += "-";
    toRet += input.substring(4, 6);
    toRet += "-";
    toRet += input.substring(6, 8);
    toRet += "-";
    toRet += input.substring(8, 10);
    toRet += ".";
    toRet += input.substring(10, 12);
    toRet += ".";
    toRet += input.substring(12, 14);
    toRet += ".";
    toRet += input.substring(14);

    return toRet

  } catch (err) {
    console.error(err);
    return "";
  }
}

// ################################################
// other stuff
export function getUnixTimestampNow() {
  //var dt =  new Date();
  var dt = getNewDate();
  return Math.round(dt.getTime() / 1000);
}

function pad(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

export function getTimeString(unix, soapFormat, caGenFormat, mssqlFormat) {
  var date = new Date(unix * 1000);

  soapFormat = typeof soapFormat === "undefined" ? false : soapFormat;
  caGenFormat = typeof caGenFormat === "undefined" ? false : caGenFormat;
  mssqlFormat = typeof mssqlFormat === "undefined" ? false : mssqlFormat;

  var y = date.getFullYear();
  var m = pad(date.getMonth() + 1, 2);
  var d = pad(date.getDate(), 2);
  var h = pad(date.getHours(), 2);
  var min = pad(date.getMinutes(), 2);
  var s = pad(date.getSeconds(), 2);

  if (soapFormat) {
    // soap
    return `${y}${m}${d}${h}${min}${s}000000`;
  } else if (caGenFormat) {
    // ca gen timestamp(text)
    return `${y}-${m}-${d}-${h}.${min}.${s}`;
  } else if (mssqlFormat) {
    return `${y}-${m}-${d} ${h}:${min}:${s}`;
  } else {
    return `${d}/${m}/${y} ${h}:${min}:${s}`;
  }
}

export function getTimeStringNow(dbFormat) {
  return getTimeString(getUnixTimestampNow(), dbFormat);
}


export function getDateTimeForCaGen(unix) {
  // in : unix or nothing
  // out :  yyyy-MM-dd-HH.mm.ss
  if (typeof unix === "undefined") {
    unix = getUnixTimestampNow();
  }

  return getTimeString(unix, false, true);
}


export function convertTimeSoapToTimeMssql(timeStr) {
  // in : yyyyMMddHHmmssSSSSSS 
  // out : yyyy-MM-dd HH:mm:ss
  let y = timeStr.substring(0, 4)
  let m = timeStr.substring(4, 6)
  let d = timeStr.substring(6, 8)
  let h = timeStr.substring(8, 10)
  let min = timeStr.substring(10, 12)
  let s = timeStr.substring(12, 14)

  return `${y}-${m}-${d} ${h}:${min}:${s}`;
}

export function getDateTimeForSoap(unix) {
  // in : unix or nothing
  // out :  yyyyMMddHHmmssSSSSSS
  if (typeof unix === "undefined") {
    unix = getUnixTimestampNow();
  }
  return getTimeString(unix, true, false);
}


export function getDateTimeForMssql(unix) {
  // in : unix or nothing
  // out :  yyyy-MM-dd HH:mm:ss
  if (typeof unix === "undefined") {
    unix = getUnixTimestampNow();
  }
  return getTimeString(unix, false, false, true);
}

/**
 * dapatkan tarikh selepas hari yang ditetapkan
 * @param {Date, String}    startDate 
 * @param {Integer}         days 
 */
export function getDateAfterDays(startDate, days) {

  let endDate, dd, mm, yyyy;
  let isStartDateString = typeof startDate === "string" ? true : false;

  if (isStartDateString) {
    startDate = new Date(startDate.substr(3, 2) + '/' + startDate.substr(0, 2) + '/' + startDate.substr(6, 4));
  }

  endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + days);

  dd = endDate.getDate();
  mm = endDate.getMonth() + 1;
  yyyy = endDate.getFullYear();

  if (dd < 10)
    dd = '0' + dd;

  if (mm < 10)
    mm = '0' + mm;

  endDate = dd + '/' + mm + '/' + yyyy;

  return endDate;
}

//##############################################################
///  compare date ###############################################

export function isDateBigger(big, small) {
  try {
    var bigArr = big.split("/");
    var smallArr = small.split("/");

    if (bigArr[2] < smallArr[2]) {
      return false
    } else if (bigArr[2] > smallArr[2]) {
      return true
    }

    if (bigArr[1] < smallArr[1]) {
      return false
    } else if (bigArr[1] > smallArr[1]) {
      return true
    }

    if (bigArr[0] < smallArr[0]) {
      return false
    } else if (bigArr[0] > smallArr[0]) {
      return true
    }

    if (big == small) {
      return false;
    }

    return true;

  } catch (err) {
    console.error("isDateBigger err", err);
  }
}



export function isDateSmallerToday(input) {
  return isDateBigger(
    getDateValueToday(),
    input
  );
}

export function isDateBiggerToday(input) {
  return isDateBigger(
    input,
    getDateValueToday()
  );
}

function restructDate(val) {
  let arr = val.split("/");
  return arr[2] + "/" + arr[1] + "/" + arr[0];
}

export function getDayDiff(dateStr1, dateStr2) {
  try {
    let date1 = new Date(restructDate(dateStr1));
    let date2 = new Date(restructDate(dateStr2));
    let timeDiff = date2.getTime() - date1.getTime();
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  } catch (err) {
    console.error("getDayDiff err", dateStr1, dateStr2, err);
    return 0;
  }
}

//Guna T343350_T6
export function getMonthDiff(dateStr1, dateStr2) {
  try {
    let date1 = new Date(restructDate(dateStr1));
    let date2 = new Date(restructDate(dateStr2));
    // let timeDiff = date2.getTime() - date1.getTime();yyy
    let d1Y = date1.getFullYear();
    let d2Y = date2.getFullYear();
    let d1M = date1.getMonth();
    let d2M = date2.getMonth();
    // let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    let monthDays = Math.ceil(d2M + 12 * d2Y) - (d1M + 12 * d1Y) + 1;
    return monthDays;
  } catch (err) {
    console.error("monthDays err", dateStr1, dateStr2, err);
    return 0;
  }
}

//Guna T343350_T6
export function getYearDiff(dateStr1, dateStr2) {
  try {
    let date1 = new Date(restructDate(dateStr1));
    let date2 = new Date(restructDate(dateStr2));
    let year = Math.ceil(date2.getFullYear() - date1.getFullYear());
    return year;
  } catch (err) {
    console.error("getYearDiff err", dateStr1, dateStr2, err);
    return 0;
  }
}

/**
 * 
 * @param {*} startDate 
 * @param {*} endDate 
 * @param {*} duration 
 * @return Kalau endDate Dalam Tempoh duration, return true
 */
export function isDatePeriodDayTrue(startDate, endDate, duration) {
  try {
    let countDuration = getDayDiff(startDate, endDate);
    // kena ada bracket before negate
    return !(countDuration > duration);
  } catch (err) {
    console.error("isDatePeriodTrue err", startDate, endDate, duration);
    return false;
  }
}

/**
 * semak endDate mesti selepas assign month dari startDate
 * @param {string date} startDate 
 * @param {string date} endDate 
 * @param {int} months 
 */
export function isDatePeriodMonthTrue(startDate, endDate, months) {
  let arrDate1, arrDate2;
  let countMonths;
  arrDate1 = startDate.split("/");
  arrDate2 = endDate.split("/");
  //filter year
  if (arrDate2[2] === arrDate1[2]) {
    countMonths = arrDate2[1] - arrDate1[1];
  } else if (arrDate2[2] > arrDate1[2]) {
    countMonths = (12 - (Number(arrDate1[1]) + 1)) + Number(arrDate2[1]) + 1;
  } else {
    return false;
  }
  //compare months
  if (countMonths < months) {
    return true;
  } else if (countMonths == months) {
    if (arrDate1[0] >= arrDate2[0])
      return true;
    else
      return false;
  } else {
    return false;
  }

}

/**
 * semak tarikh perkahwinan dalam tempoh sah atau tidak
 * @param {string date} startDate 
 * @param {string date} endDate 
 * @param {int} months 
 */
export function validateTarikhPerkahwinan(startDate, endDate, months) {
  return !isDateBigger(startDate, endDate, months);
}

export function getDateAfterMonths(startDate, months) {

  let endDate, dd, mm, yyyy;
  let isStartDateString = typeof startDate === "string" ? true : false;

  if (isStartDateString) {
    startDate = new Date(startDate.substr(3, 2) + '/' + startDate.substr(0, 2) + '/' + startDate.substr(6, 4));
  }

  endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + months);


  dd = endDate.getDate();
  mm = endDate.getMonth() + 1;
  yyyy = endDate.getFullYear();

  if (dd < 10)
    dd = '0' + dd;

  if (mm < 10)
    mm = '0' + mm;

  endDate = dd + '/' + mm + '/' + yyyy;

  console.log("endDate >>", endDate);

  return endDate;
}
