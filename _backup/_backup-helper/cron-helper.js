import {
  getRequest
} from './api-helper';

import {
  getDateTodayForLS
} from './time-helper';

import {
  ServerUpdateRefUrl,
  STORE_UPDATE_REF,
  IsAutoUpdateRefEnabled,
} from '../config/app-config';

// #########################################################
// Helper Function

const DefaultLocalStorage = {
  res: "",
  lastFetch: "",
  hasError: false
}

function __getLocalStorage(storeName) {
  var obj = localStorage.getItem(storeName);
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


function __setLocalStorage(storeName, res, hasError) {
  let lastFetch = getDateTodayForLS();
  let obj = {
    res: res,
    lastFetch: lastFetch,
    hasError: hasError
  }
  localStorage.setItem(storeName, JSON.stringify(obj));
}

function __isSkip(storeName) {
  let obj = __getLocalStorage(storeName);
  let dateToday = getDateTodayForLS();

  if (obj.hasError == true) {
    return false;
  }

  if (obj.lastFetch == dateToday) {
    console.info(`Skip ${storeName}`);
    console.info(`Last ${storeName} Done On ` + obj.lastFetch);
    if (obj.hasError) {
      console.info(`[WARNING] Last ${storeName} Has Error`);
    }
    return true;
  } else {
    return false;
  }
}

// #########################################################
// Cron Function

export function updateRef(successHandler, errorHandler) {
  if (!IsAutoUpdateRefEnabled) {
    return;
  }
  successHandler = typeof successHandler === "undefined" ? () => {} : successHandler;
  errorHandler = typeof errorHandler === "undefined" ? () => {} : errorHandler;

  if (__isSkip(STORE_UPDATE_REF)) {
    successHandler();
    return;
  }

  let url = ServerUpdateRefUrl;
  getRequest({
    url: url,
    success: (res) => {
      console.log("updateRef", res);
      __setLocalStorage(STORE_UPDATE_REF, res, false);
      successHandler();
    },
    error: (err) => {
      __setLocalStorage(STORE_UPDATE_REF, err, true);
      errorHandler();
    }
  })
}
