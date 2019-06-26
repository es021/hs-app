import {
  isDateBigger,
  isDateBiggerToday,
  isDateSmallerToday,
  getDateValueToday
} from './time-helper';

import {
  AgamaTiadaCode
} from '../config/trans-config';

import * as FilterHelper from './filter-helper';

// on-change-helper ni tak sama dgn global validate helper
// dia biasanya masa onchange, dan dia passed this ke function ni

// return FALSE if takde masalah -> teruskan kat caller
// return TRUE if ada masalah -> RETURN kat caller
// if(function){
//  return
// }

const hasVal = (val) => {
  return val !== "" && typeof val !== "undefined" && val != null;
}

const onChangeRow3 = (componentThis, entity, name, value, error, ref, alertHandler) => {
  if (componentThis.isFormValueEmpty(name)) {
    return false;
  }

  // takleh skip kena masuk satu2
  var hasHole = false;

  // ada last tapi yg first or yg tngah takde
  if (hasVal(value[2]) && (!hasVal(value[1]) || !hasVal(value[0]))) {
    hasHole = true;
  }

  // ada tngah tp first takde
  if (hasVal(value[1]) && !hasVal(value[0])) {
    hasHole = true;
  }

  // kalau ada hole, kosong kan from start ada hole dan seterusnya
  var newVal = [];
  var stopFilling = false;
  var indexHole = -1;
  if (hasHole) {
    for (var i in value) {
      // kalau start takde value, stop filling
      if (!hasVal(value[i]) && !stopFilling) {
        indexHole = i;
        stopFilling = true;
      }
      if (stopFilling) {
        newVal[i] = "";
      } else {
        newVal[i] = value[i];
      }
    }
    //console.log(hasHole, value, newVal);
    var LINES_STR = ["PERTAMA", "KEDUA", "KETIGA"];
    componentThis.alertError(`Masukkan ${entity} Di Baris ${LINES_STR[indexHole]} Dahulu`, () => {
      componentThis.setFormValue(name, newVal);
      ref[indexHole][0].focus();

      if (typeof alertHandler !== "undefined") {
        alertHandler();
      }
    })
    return true;
  }

  return false;
}

export function displayErrorAndFocus(componentThis, name, err, ref, closeHandler) {
  if (err !== null) {
    componentThis.alertError(err, () => {
      ref.focus();
      componentThis.setFormValue(name, "");
      if (typeof closeHandler !== "undefined") {
        closeHandler();
      }
    });
    return true;
  }

  return false;
}

function displayWarningAndFocus(componentThis, warning, ref) {
  if (warning !== null) {
    componentThis.alertWarning(warning, () => {
      ref.focus();
    });
  }

  return false;
}

// #################################################################################################
// List of On Change Helper

export function kpt(_this, name, value, error, ref, {
  isMale,
  isFemale,
  customWarning
}) {
  let input = value;
  customWarning = (typeof customWarning === "undefined") ? null : customWarning;
  isMale = (typeof isMale === "undefined") ? false : isMale;
  isFemale = (typeof isFemale === "undefined") ? false : isFemale;

  
  if (_this.isFormValueValid(name) && (isMale || isFemale)) {
    let warning = null;

    var lastDigit = input[input.length - 1];
    lastDigit = Number.parseInt(lastDigit);
    var isEven = lastDigit % 2 == 0;
  
    //lelaki kena no odd
    if (isMale && isEven) {
      warning = customWarning == null ? "No Kpt Tidak Sah Untuk Lelaki" : customWarning;
    }

    //perempuan kena no even
    if (isFemale && !isEven) {
      warning = customWarning == null ? "No Kpt Tidak Sah Untuk Perempuan" : customWarning;
    }

    if (warning != null) {
      _this.alertWarning(warning)
    }
  }
}

export function kodMahkamah(componentThis, name, value, error, ref, {
  mapJenisMahkamah,
  fcJenisMahkamah
}) {
  if (value == null || value == "") {
    return false;
  }
  let label = componentThis.getFormSelectLabel(name);
  label = label.replaceAll("SESYEN", "SEKSYEN");

  let code = "";
  for (var i in mapJenisMahkamah) {
    let jenisMahkamah = mapJenisMahkamah[i];
    jenisMahkamah = jenisMahkamah.replaceAll("SESYEN", "SEKSYEN");
    if (label.indexOf(jenisMahkamah) >= 0) {
      code = i;
      break;
    }
  }
  componentThis.setFormValue(fcJenisMahkamah, code);

  return false;
}

export function alamat(componentThis, name, value, error, ref, alertHandler) {
  return onChangeRow3(componentThis, "Alamat", name, value, error, ref, alertHandler);
}

export function namaRingkas(componentThis, name, value, error, ref, alertHandler) {
  return onChangeRow3(componentThis, "Nama Ringkas", name, value, error, ref, alertHandler);
}

export function negeri(componentThis, name, value, error, ref) {
  componentThis.filterBandar = data => {
    return FilterHelper.ref009City(data, value);
  };

  return false;
}

export function bandar(componentThis, name, value, error, ref, fcNegeri) {
  if (value == null || value == "") {
    return false;
  }
  var codeNegeri = value.substring(0, 2);
  componentThis.setFormValue(fcNegeri, codeNegeri);

  return false;
}

export function poskod(componentThis, name, value, error, ref) {
  if (value == null || value == "") {
    return false;
  }

  let v = value + "";
  let err = null;
  if (v.length != 5) {
    err = "Masukkan Poskod Yang Betul (5 digit)";
  }

  return displayErrorAndFocus(componentThis, name, err, ref);
}

export function tarikhLahir(componentThis, name, value, error, ref) {
  let err = null;
  if (isDateBiggerToday(value)) {
    err = "Tarikh Melebihi Tarikh Cawangan";
  }

  return displayErrorAndFocus(componentThis, name, err, ref);
}

export function agama(componentThis, name, value, error, ref) {
  let warning = null;
  if (value == AgamaTiadaCode) {
    warning = "Agama Adalah TIADA AGAMA, Pastikan Kod Agama Adalah Betul";
  }

  return displayWarningAndFocus(componentThis, warning, ref);
}

export function jantinaPemohon(componentThis, name, value, error, ref) {
  if (value == null || value == "") {
    return false;
  }

  let warning = null;
  if (value == "K") {
    warning = "Anda Telah Memilih Pemohon = Kedua-dua";
  }

  return displayWarningAndFocus(componentThis, warning, ref);
}

/**
 * compare cawangan semasa dgn cawangan dari no permohonan
 * @param {this} componentThis 
 * @param {name} name 
 * @param {value} value 
 * @param {error} error 
 * @param {ref} ref 
 */
export function semakCawanganNoPermohonan(componentThis, name, value, error, ref) {

  if (typeof (value) != "string")
    return false;

  let currentBranch = componentThis.authUser.BRANCH_CODE;
  let branchNoPermohonan = value.substr(0, 8);
  let err = "";

  if (currentBranch != branchNoPermohonan) {
    err = "Urusniaga tidak dibenarkan kerana kod cawangan tidak sama dengan cawangan permohonan";
    return displayErrorAndFocus(componentThis, name, err, ref);
  } else
    return false;
}


export function tarikhMelebihiTarikhSistem(componentThis, name, value, error, ref, closeHandler, customError) {
  let err = null;
  let tarikhSistem = getDateValueToday()
  if (value == null) {
    return;
  }
  if (isDateBigger(value, tarikhSistem)) {
    if (typeof customError !== "undefined") {
      err = customError;
    } else {
      err = `Tarikh Melebihi Tarikh Sistem (${tarikhSistem})`;
    }
  }
  return displayErrorAndFocus(componentThis, name, err, ref, closeHandler);
}


export function tarikhKurangTarikhSistem(componentThis, name, value, error, ref, closeHandler, customError) {
  let err = null;
  let tarikhSistem = getDateValueToday()
  if (value == null) {
    return;
  }
  if (isDateBigger(tarikhSistem, value)) {
    if (typeof customError !== "undefined") {
      err = customError;
    } else {
      err = `Tarikh Kurang Tarikh Sistem (${tarikhSistem})`;
    }
  }
  return displayErrorAndFocus(componentThis, name, err, ref, closeHandler);
}


export function tarikhMelebihiTarikhFormField(componentThis, name, value, error, ref, closeHandler, {
  compareVal,
  compareLabel
}) {
  if (compareVal == null || compareVal == "") {
    return;
  }
  let err = null;
  if (isDateBigger(value, compareVal)) {
    err = `Tarikh Melebihi ${compareLabel} (${compareVal})`;
  }
  return displayErrorAndFocus(componentThis, name, err, ref, closeHandler);
}


export function tarikhKurangTarikhFormField(componentThis, name, value, error, ref, errKedutaan, closeHandler, {
  compareVal,
  compareLabel
}) {
  if (compareVal == null || compareVal == "") {
    return;
  }
  let err = null;

  if(componentThis.transactionTransCode == "385010" || componentThis.transactionTransCode == "381050" || componentThis.transactionTransCode == "381060"){ //untuk saa2 5010/1050/1060 : 16052019
    if (isDateBigger(compareVal, value)) { 
    err = "Tarikh Prosiding Kurang Daripada Tarikh Permohonan"
    } 
  } else {
    if (isDateBigger(compareVal, value) || compareVal == value) {
      if (errKedutaan == true) {
        err = `Tarikh Mula Lantikan adalah (${compareVal}). Sila Masukkan ${compareLabel} Yang Baru!`;
      } else {
        err = `${compareLabel} Asal adalah (${compareVal}). Sila Masukkan ${compareLabel} Yang Baru!`;
      }
    }
  }
  return displayErrorAndFocus(componentThis, name, err, ref, closeHandler);
}

export function tarikhKurangTarikhCawangan(componentThis, name, value, error, ref, closeHandler) {
  let err = null;
  let tarikhCawangan = getDateValueToday()
  if (value == null) {
    return;
  }
  if (!isDateBiggerToday(value) && value !== tarikhCawangan && !componentThis.isFormValueEmpty(name)) {
    err = `Tarikh Kurang Daripada Tarikh Cawangan (${tarikhCawangan})`;
  }
  return displayErrorAndFocus(componentThis, name, err, ref, closeHandler);
}
