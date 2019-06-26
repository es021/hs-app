// all functions here will either return false 
// or if there is error, will return string
//import store from '../store/index'; // path to your Vuex store
//const authUser = store.modules.auth.getters.authUser;
const Err = {
  fieldLength: (input, length, unit) => {
    unit = (typeof unit === "undefined") ? "aksara" : unit;
    return `Medan ini hendaklah mengandungi ${length} ${unit}. ${unit.capitalize()} yang diisi : ${input.length}`;
  },
  numberOnly: () => {
    return "Medan ini hendaklah hanya mengandungi angka";
  }
};

export function resitBayaran(input) {
  if (input == "" || input == null || typeof input === "undefined") {
    return false;
  }

  let err = "No Resit Tidak Sah. Sila ikut format 'AYY-XXXXXX' atau 'AYYXXXXXX' (eg:D18-000021 / D18000021)";
  let hasErr = false;

  let indexDash = input.indexOf("-");
  // ada dash tapi bukan dkt char 4
  if (indexDash != 3 && indexDash >= 0) {
    hasErr = true
  }

  if (hasErr) {
    return err;
  }

  return false;
}

// ############################################
// Date Validation 
export function date(input) {
  if (input == "" || input == null || typeof input === "undefined") {
    return false;
  }

  var generalErr = `'${input}' is not a valid date. Please follow format DD/MM/YYYY`;

  if (input.indexOf("/") <= -1) {
    return generalErr
  }

  var inArr = input.split("/");
  if (inArr.length !== 3) {
    return generalErr
  }

  if (inArr[0].length !== 2 || inArr[1].length !== 2 || inArr[2].length !== 4) {
    return generalErr;
  }

  var y = Number.parseInt(inArr[2]);
  var m = Number.parseInt(inArr[1]);
  var d = Number.parseInt(inArr[0]);

  if (m > 12) {
    return generalErr;
  }

  if (d > 31) {
    return generalErr;
  }

  return false;
}



// ############################################
// Time Validation 

import {
  ArrAmPmAll
} from './time-helper';
import {
  IS_SKC
} from '../config/app-config';
export function time(input) {
  var generalErr = `'${input}' is not a valid time. Please follow format HH:MM followed by one ${ArrAmPmAll}`;

  try {
    if (input.indexOf(":") <= -1) {
      return generalErr + " (err 1)";
    }

    var inArr = input.split(":");
    if (inArr.length !== 2) {
      return generalErr + " (err 3)";
    }

    if (inArr[0].length !== 2) {
      return generalErr + " (err 4)";
    }

    var inArr2 = inArr[1].split(" ");
    if (inArr2[0].length !== 2) {
      return generalErr + " (err 5)";
    }

    if (ArrAmPmAll.indexOf(inArr2[1]) <= -1) {
      return generalErr + " (err 6)";
    }

  } catch (err) {
    console.error("GlobalValidate err", err);
    return generalErr + " (err 7)";
  }
  return false;
}


// ############################################
// Bussiness Validation 
export function poskod(input) {
  if (input.length !== 5) {
    return Err.fieldLength(input, 5, "nombor");
  }
  return false
}

export function noPermohonan(input) {
  var test = input.replaceAll("-", "");
  if (test.length !== 24) {
    return Err.fieldLength(test, 24, "nombor");
  }
  return false
}

export function exactLen(input, len) {
  if (input.length !== len) {
    return Err.fieldLength(input, len);
  }

  return false;
}

export function noDaftar(input) {
  //console.log(store.modules.auth.state.user);
  if (isNaN(input)) {
    return Err.numberOnly();
  }

  if (input.length !== 15) {
    return Err.fieldLength(input, 15);
  }
  return false
}



export function noKptMale(input, customError) {
  return noKpt(input, true, false, customError);
}

export function noKptFemale(input, customError) {
  return noKpt(input, false, true, customError);
}

export function noKpt(input,
  isMale,
  isFemale,
  customError
) {
  if (input.length !== 12) {
    return Err.fieldLength(input, 12, "nombor");
  }

  // 1. validation first tgok jantina
  customError = (typeof customError === "undefined") ? null : customError;
  isMale = (typeof isMale === "undefined") ? false : isMale;
  isFemale = (typeof isFemale === "undefined") ? false : isFemale;

  // kena buang sebab taknak jadi error, nak jadi warning je,
  // kena letak dalam on change
  if (IS_SKC) {
    if (isMale || isFemale) {
      var lastDigit = input[input.length - 1];
      lastDigit = Number.parseInt(lastDigit);
      var isEven = lastDigit % 2 == 0;

      //lelaki kena no odd
      if (isMale && isEven) {
        let innerErr = customError == null ? "No Kpt Tidak Sah Untuk Lelaki" : customError;
        return innerErr;
      }

      //perempuan kena no even
      if (isFemale && !isEven) {
        let innerErr = customError == null ? "No Kpt Tidak Sah Untuk Perempuan" : customError;
        return innerErr;
      }
    }
  }

  // 2. validation yg lagi complex
  var errMes = "No Kpt Tidak Sah";
  var NoKPT = input;
  var KPTLength = NoKPT.length;
  var weight = ['2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2', '0'];
  var nTotal = 0;
  var nCheckDigit;

  if ((NoKPT.substr(2, 1) == "0" && NoKPT.substr(3, 1) != "0") || (NoKPT.substr(2, 1) == "1" && NoKPT.substr(3, 1) <= "2")) {
    for (var i = 0; i < KPTLength; i++) {
      var cICNo = NoKPT[i];
      var nICNo = parseInt(cICNo) * weight[i];
      nTotal += nICNo;
    }

    var nRemainder = nTotal % 11;
    var nK = 1 - nRemainder;

    if (nK > -1)
      nCheckDigit = nK;
    else
      nCheckDigit = nK + 11;

    if (nK != -1 && nCheckDigit == cICNo) {
      return false;
    } else {
      return errMes;
    }
  } else {
    return errMes;
  }
}
