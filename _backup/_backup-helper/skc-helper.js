// ########  Import #####################################################
import {
  FormatType,
  ChildrenType,
} from './format-helper';

import * as OnChangeHelper from './on-change-helper';

import {
  IsUseWas,
  Is_CR_Enable
} from '../config/app-config';

import {
  DokumenKadPengenalanKertas,
  DokumenKadPengenalanPlastik,
  MalaysiaCode,
  DokumenMalaysia,
  DokumenBukanMalaysia,
} from '../config/trans-config';

import * as ApiHelper from './api-helper';
import * as FormatHelper from './format-helper';
import * as UtilHelper from './util-helper';
import * as TimeHelper from "./time-helper";

// ###########################################################################################################
// ########  Kunci Carian ####################################################################################

const TEMPOH_HARI_VALID = 22;
const KUNCI_CARIAN = "KunciCarian";
const KUNCI_CARIAN_STR = "Wzs21KunciCarianStr";
const KUNCI_CARIAN_CHANGED = "Wzs21KunciCarianChanged";

export const Type = {
  BAPA_ANGKAT: "BAPA_ANGKAT",
  IBU_ANGKAT: "IBU_ANGKAT",
  KANAK: "KANAK",
  LELAKI: "LELAKI",
  PEREMPUAN: "PEREMPUAN",
  SAKSI_1: "SAKSI_1",
  SAKSI_2: "SAKSI_2",
  PENJAGA_LELAKI: "PENJAGA_LELAKI",
  PENJAGA_PEREMPUAN: "PENJAGA_PEREMPUAN",
  PENDAFTAR: "PENDAFTAR",
  PEMILIK: "PEMILIK",
  PEMBANTAH: "PEMBANTAH",
  PEMOHON: "PEMOHON",
  PEMBATAL: "PEMBATAL",
  PASANGAN: "PASANGAN",
  TRIBUNAL: "TRIBUNAL",
}

export const TypeLabel = {
  LELAKI: "Lelaki",
  PEREMPUAN: "Perempuan",
  SAKSI_1: "Saksi 1",
  SAKSI_2: "Saksi 2",
  PENJAGA_LELAKI: "Bapa/Ibu/Penjaga Lelaki",
  PENJAGA_PEREMPUAN: "Bapa/Ibu/Penjaga Perempuan",
  PENDAFTAR: "Pendaftar/Pegawai",
  PEMILIK: "Pemilik",
  PEMBANTAH: "Pembantah",
  PEMOHON: "Pemohon",
  PEMBATAL: "Pembatal",
  PASANGAN: "Pasangan",
  TRIBUNAL: "Tribunal",
}

export function getKunciCarianString(_this, {
  kpt,
  noDok,
  jenisDok,
  negaraPeng,
  kpp,
}) {
  let str = "";
  if (!_this.isFormValueEmpty(kpt)) {
    str += _this.getFormValue(kpt) + "::";
  }
  if (!_this.isFormValueEmpty(kpp)) {
    str += _this.getFormValue(kpp) + "::";
  }
  if (!_this.isFormValueEmpty(noDok)) {
    str += _this.getFormValue(noDok) + "::";
  }
  if (!_this.isFormValueEmpty(jenisDok)) {
    str += _this.getFormValue(jenisDok) + "::";
  }
  if (!_this.isFormValueEmpty(negaraPeng)) {
    str += _this.getFormValue(negaraPeng) + "::";
  }
  return str;
}

export function initKunciCarianHiddenFromOtherTab(_this, {
  keys,
  sourceTab
}) {
  // init kunci carian hidden lelaki n perempuan
  for (var k in keys) {
    for (var innerKey in keys[k]) {
      if (innerKey !== "type") {
        let fc = keys[k][innerKey];
        _this.setFormValue(fc, _this.getFormValueByTab(sourceTab, fc));
      }
    }
  }
}

export function isKunciCarianChanged(_this, type) {
  return _this.getFormValue(KUNCI_CARIAN_CHANGED + type) === true;
}

export function resetKunciCarianChanged(_this, type) {
  _this.setFormValue(KUNCI_CARIAN_CHANGED + type, false);
}

export function isKunciCarianValidByValue(_this, kcObjects) {
  if (!Array.isArray(kcObjects)) {
    kcObjects = [kcObjects];
  }

  for (var i in kcObjects) {
    let obj = kcObjects[i];

    if (_this.isFormValueValid(obj.kpt)) {
      // do nothing
    } else if (_this.isFormValueValid(obj.noDok) &&
      _this.isFormValueValid(obj.jenisDok) &&
      _this.isFormValueValid(obj.negaraPeng)) {
      // do nothing
    } else {
      return false;
    }
  }

  return true;
}

export function isKunciCarianValid(_this, type) {
  if (Array.isArray(type)) {
    for (var i in type) {
      if (_this.getFormValue(KUNCI_CARIAN + type[i]) !== true) {
        return false
      }
    }
    return true;
  } else {
    return _this.getFormValue(KUNCI_CARIAN + type) === true;
  }
}

// need to use this sebab first time isFormValue not working
export function isChangedEmpty(val) {
  return (val == null || val == "" || typeof val === "undefined");
}

/**
 * 
 * @param {*} _this 
 * @param {Array} pairs  etc : [{kpt, jenisDok},{kpt, jenisDok},....] 
 */
export function isKunciCarianUnik(_this, {
  name,
  value,
  // utk yang changed
  type1,
  kpt1,
  noDok1,
  jenisDok1,
  negaraPeng1,
  // utk yg to compare with
  type2,
  kpt2,
  noDok2,
  jenisDok2,
  negaraPeng2,

  isDontEmpty
}) {
  let err = null;
  let toEmpty = null;

  let isFirstChanged = name == kpt1.name || name == noDok1.name;

  let entityChanged = isFirstChanged ? type1 : type2;
  var entityCompared = isFirstChanged ? type2 : type1;
  entityChanged = TypeLabel[entityChanged];
  entityCompared = TypeLabel[entityCompared];

  if (value == _this.getFormValue(kpt2)) {
    err = `Pertindihan No KPT ${entityChanged} - No KPT ${entityCompared}`;
    toEmpty = isFirstChanged ? kpt1 : kpt2;
    if (isChangedEmpty(value)) {
      return true;
    }
  }

  // check pertindihan no dokumen kena check tiga-tiga
  let valDok1 = _this.getFormValue(noDok1) + _this.getFormValue(jenisDok1) + _this.getFormValue(negaraPeng1)
  let valDok2 = _this.getFormValue(noDok2) + _this.getFormValue(jenisDok2) + _this.getFormValue(negaraPeng2)
  if (_this.isAllValueValid([noDok1, jenisDok1, negaraPeng1])) {

  }
  //if (value == _this.getFormValue(noDok2)) {
  if (valDok1 == valDok2 &&
    _this.isAllValueValid([noDok1, jenisDok1, negaraPeng1]) &&
    _this.isAllValueValid([noDok2, jenisDok2, negaraPeng2])) {
    err = `Pertindihan No Dokumen ${entityChanged} - No Dokumen ${entityCompared}`;
    //toEmpty = isFirstChanged ? noDok1 : noDok2;
    toEmpty = name;
    if (isChangedEmpty(value)) {
      return true;
    }
  }

  isDontEmpty = typeof isDontEmpty === "undefined" ? false : isDontEmpty;

  if (err !== null) {
    _this.alertError(err, () => {
      if (!isDontEmpty) {
        _this.setFormValue(toEmpty, "");
        _this.focusToFormField(toEmpty);
      }
    });

    return false;
  } else {
    return true;
  }
}

// ###########################################################################################################
// Validasi Kunci Carian 34XX50 #############################################################################

// log zila
function setKunciCarianStateOnEmptyAll(_this, {
  isRequired,
  isOptional,
  forceState,
  kpt,
  kpp,
  noDok,
  jenisDok,
  negaraPeng,
}) {
  let isAllEmpty = false;
  // get default initial state
  if (typeof kpp === "undefined") {
    isAllEmpty = (_this.getFormRequired(kpt) == true || _this.isFormOptional(kpt)) &&
      _this.isFormOptional(noDok)
  } else {
    isAllEmpty = (_this.getFormRequired(kpt) == true || _this.isFormOptional(kpt)) &&
      _this.isFormOptional(noDok) && _this.isFormOptional(kpp)
  }

  if (isAllEmpty || forceState == true) {
    if (isRequired == true) {
      _this.setFormRequired(kpt, true);
      _this.setFormRequired(kpp, true);
      _this.setFormRequired(noDok, true);
      _this.setFormRequired(jenisDok, true);
      _this.setFormRequired(negaraPeng, true);
    } else if (isOptional == true) {
      _this.setFormDisabled(kpt, false);
      _this.setFormDisabled(kpp, false);
      _this.setFormDisabled(noDok, false);
      _this.setFormDisabled(jenisDok, false);
      _this.setFormDisabled(negaraPeng, false);
    }
  }

  if (isAllEmpty) {
    _this.setFormDisabled(jenisDok, true);
    _this.setFormDisabled(negaraPeng, true);
  }


}

// will simulate the first one with data
export function initSimulateKunciCarian(_this, {
  kCarian,
  onChange,
  isRequired
}) {
  isRequired = typeof isRequired === "undefined" ? false : isRequired;

  // check if all valid
  let allFc = [kCarian.kpt, kCarian.noDok, kCarian.jenisDok, kCarian.negaraPeng];
  if (typeof kCarian.kpp !== "undefined") {
    allFc.push(kCarian.kpp);
  }

  if (_this.isAllValueValid(allFc)) {
    for (var i in allFc) {
      if (isRequired) {
        _this.setFormRequired(allFc[i], true);
      } else {
        _this.setFormOptional(allFc[i]);
      }
    }
  } else {
    for (var k in kCarian) {
      if (k != "type") {
        if (_this.isFormValueValid(kCarian[k])) {
          _this.simulateOnChange(kCarian[k], onChange);
          return;
        }
      }
    }
  }
}

// semua bukak
export function initKunciCarian_50(_this, {
  type,
  kpt,
  noDok,
  jenisDok,
  negaraPeng,
  kpp, // untuk saa fasa 2
  forceState,
  isRequired,
}) {
  if (type == Type.PENDAFTAR) {
    _this.setFormDisabled(kpt, true);
    _this.setFormValue(kpt, _this.authUser.KPT_NO);
  } else {
    //forceState = typeof forceState === "undefined" ? false : forceState;
    // if (forceState) {
    //   _this.setFormDisabled(kpt, false);
    //   _this.setFormDisabled(kpp, false);
    //   _this.setFormDisabled(noDok, false);
    //   _this.setFormDisabled(jenisDok, true);
    //   _this.setFormDisabled(negaraPeng, true);
    // } else {
    //   _this.setFormDisabledInitial(kpt, false);
    //   _this.setFormDisabledInitial(kpp, false);
    //   _this.setFormDisabledInitial(noDok, false);
    //   _this.setFormDisabledInitial(jenisDok, true);
    //   _this.setFormDisabledInitial(negaraPeng, true);
    // }

    let nameOnChange = _this.isFormValueEmpty(kpt) ? noDok.name : kpt.name;

    let isValid = _this.kunciCarianOnChange(
      nameOnChange,
      kpt,
      noDok,
      jenisDok,
      negaraPeng,
      kpp, // untuk saa fasa 2
      //undefined,
      true,
      undefined,
      true
    );
    _this.setFormValue(KUNCI_CARIAN + type, isValid);

    isRequired = typeof isRequired === "undefined" ? false : isRequired;
    if (isRequired) {
      setKunciCarianStateOnEmptyAll(_this, {
        isRequired: true,
        forceState: forceState,
        kpt: kpt,
        kpp: kpp,
        noDok: noDok,
        jenisDok: jenisDok,
        negaraPeng: negaraPeng
      })
    } else {
      setKunciCarianStateOnEmptyAll(_this, {
        isOptional: true,
        forceState: forceState,
        kpt: kpt,
        kpp: kpp,
        noDok: noDok,
        jenisDok: jenisDok,
        negaraPeng: negaraPeng
      })
    }

    // console.log("---------------------------");
    // console.log("type", type);
    // console.log("nameOnChange", nameOnChange);
    // console.log("isValid", isValid);
  }
}


// semua protected
export function initKunciCarian_60(_this, {
  type,
  kpt,
  noDok,
  jenisDok,
  negaraPeng,
  kpp,
  forceState
}) {
  if (type == Type.PENDAFTAR) {
    _this.setFormDisabled(kpt, true);
    // _this.setFormValue(kpt, _this.authUser.KPT_NO);
  } else {

    let nameOnChange = _this.isFormValueEmpty(kpt) ? noDok.name : kpt.name;
    let isValid;

    forceState = typeof forceState === "undefined" ? false : forceState;
    if (forceState) {
      _this.setFormDisabled(kpt, true);
      _this.setFormDisabled(kpp, true);
      _this.setFormDisabled(noDok, true);
      _this.setFormDisabled(jenisDok, true);
      _this.setFormDisabled(negaraPeng, true);

      isValid = true;
    } else {
      _this.setFormDisabledInitial(kpt, true);
      _this.setFormDisabledInitial(kpp, true);
      _this.setFormDisabledInitial(noDok, true);
      _this.setFormDisabledInitial(jenisDok, true);
      _this.setFormDisabledInitial(negaraPeng, true);

      isValid = _this.kunciCarianOnChange(
        nameOnChange,
        kpt,
        noDok,
        jenisDok,
        negaraPeng,
        kpp,
        undefined,
        true,
        undefined,
        true
      );
    }

    _this.setFormValue(KUNCI_CARIAN + type, isValid);
  }
}

function validasiKpp(noDokValue) {
  if (noDokValue == null || noDokValue == "") {
    return null;
  }

  let err = null;
  let errKpp = 0;
  if (noDokValue == null) {
    errKpp = 1;
  } else {
    noDokValue += "";
    if (noDokValue.length <= 0 || noDokValue.length > 9) {
      errKpp = 2;
    } else if (noDokValue[0] == "A" && noDokValue.length != 8) {
      errKpp = 3;
    } else if (noDokValue[0] == "B" || (Number.parseInt(noDokValue[0]) <= 9 && Number.parseInt(noDokValue[0]) >= 0)) {
      if (noDokValue.length != 7 || noDokValue == "0000000") {
        errKpp = 4;
      }
    } else if (noDokValue[0] == "H" || noDokValue[0] == "K") {
      if (noDokValue.length != 7 && noDokValue.length != 8) {
        errKpp = 5;
      }
    } else if (["A", "B", "H", "K"].indexOf(noDokValue[0]) <= -1) {
      errKpp = 6;
    }
  }

  if (errKpp > 0) {
    //err = `No. Kad Pengenalan Plastik Tidak Sah (${errKpp})`;
    err = `No. Kad Pengenalan Plastik Tidak Sah`;
    console.error(`No. Kad Pengenalan Plastik Tidak Sah (${errKpp})`);
  }

  return err;
}

const RETAIN_STATE_KEY_ATTRIBUTE = "_kCarian_retainState";

function kCarian_retainStatePre(_this, {
  name,
  value,
  type,
  kpt,
  noDok,
  jenisDok,
  negaraPeng
}) {
  // simpan current value dan state
  _this[RETAIN_STATE_KEY_ATTRIBUTE] = {
    kpt: {
      value: _this.getFormValue(kpt),
      disabled: _this.getFormDisabled(kpt),
      required: _this.getFormRequired(kpt)
    },
    noDok: {
      value: _this.getFormValue(noDok),
      disabled: _this.getFormDisabled(noDok),
      required: _this.getFormRequired(noDok)
    },
    jenisDok: {
      value: _this.getFormValue(jenisDok),
      disabled: _this.getFormDisabled(jenisDok),
      required: _this.getFormRequired(jenisDok)
    },
    negaraPeng: {
      value: _this.getFormValue(negaraPeng),
      disabled: _this.getFormDisabled(negaraPeng),
      required: _this.getFormRequired(negaraPeng)
    }
  };
}

function kCarian_retainStatePost(_this, {
  name,
  value,
  type,
  kpt,
  noDok,
  jenisDok,
  negaraPeng
}) {
  const recoverValueAndState = (fc, tempObj) => {
    _this.setFormValue(fc, tempObj.value);
    if (tempObj.disabled === true) {
      _this.setFormDisabled(fc, true);
    } else if (tempObj.required === true) {
      _this.setFormRequired(fc, true);
    } else {
      _this.setFormOptional(fc);
    }
  };

  let kcTemp = _this[RETAIN_STATE_KEY_ATTRIBUTE];

  if (name == kpt.name) {
    recoverValueAndState(noDok, kcTemp.noDok);
    recoverValueAndState(jenisDok, kcTemp.jenisDok);
    recoverValueAndState(negaraPeng, kcTemp.negaraPeng);
  } else if (
    name == noDok.name ||
    name == jenisDok.name ||
    name == negaraPeng.name
  ) {
    recoverValueAndState(kpt, kcTemp.kpt);
  }
}

// ada alert pertindihan
// ada Validasi untuk setiap Kod Jenis Dokumen yang dipilih // TODO
export function onChangeKunciCarian_50(_this, {
  type,
  kpt,
  noDok,
  jenisDok,
  negaraPeng,
  kpp, // untuk saa fasa 2
  isRequired,
  name,
  value,
  error,
  ref,
  compareWith,
  isRetainState,
  tarikhTibaDiMalaysia // letak param ni kalau nk buat validasi tarikh tiba dimalaysia (1050 , 1060)
}) {
  if (value == null) {
    return isKunciCarianValid(_this, type);
  }

  if (typeof compareWith !== "undefined" && Array.isArray(compareWith)) {
    for (var k in compareWith) {
      var compare = compareWith[k];
      var isUnik = isKunciCarianUnik(_this, {
        name: name,
        value: value,
        type1: type,
        kpt1: kpt,
        noDok1: noDok,
        jenisDok1: jenisDok,
        negaraPeng1: negaraPeng,

        // compare with
        type2: compare.type,
        kpt2: compare.kpt,
        noDok2: compare.noDok,
        jenisDok2: compare.jenisDok,
        negaraPeng2: compare.negaraPeng,
      });
      if (!isUnik) {
        return false;
      }
    }
  }

  if (isRetainState === true) {
    kCarian_retainStatePre(_this, {
      name: name,
      value: value,
      type: type,
      kpt: kpt,
      noDok: noDok,
      jenisDok: jenisDok,
      negaraPeng: negaraPeng
    });
  }



  var err = null;
  if (name == jenisDok.name) {
    if (value == DokumenKadPengenalanKertas) {
      err = "Maklumkan Kepada Pemohon Untuk Menukar Kepada No. KPT Terlebih Dahulu Dengan Berurusan Dengan Bahagian Kad Pengenalan (BKP).";
    }
  }

  if (name == jenisDok.name || name == noDok.name) {
    let noDokValue = _this.getFormValue(noDok);
    let jenisDokValue = _this.getFormValue(jenisDok);

    //console.log(noDokValue);
    //console.log(jenisDokValue);

    if (jenisDokValue == DokumenKadPengenalanPlastik) {
      err = validasiKpp(noDokValue);
    }
  }

  // untuk saa fasa 2
  if (typeof kpp !== "undefined" && name == kpp.name) {
    err = validasiKpp(value);
  }

  if (err != null) {
    _this.alertError(err, () => {
      _this.setFormValue(name, "");
      ref.focus();
    });
    return false;
  }

  let forSkc = true;

  let isChange = _this.kunciCarianOnChange(
    name,
    kpt,
    noDok,
    jenisDok,
    negaraPeng,
    kpp, // untuk saa fasa 2
    //undefined,
    undefined,
    undefined,
    forSkc
  );
  _this.setFormValue(KUNCI_CARIAN + type, isChange);

  //validasi utk tarikhTibaDiMalaysia
  if (typeof tarikhTibaDiMalaysia !== "undefined") {
    var noKptVal = _this.getFormValue(kpt);
    var negPVal = _this.getFormValue(negaraPeng);
    // validation utk tarikh tiba di malaysia
    if (
      noKptVal != "" ||
      negPVal == MalaysiaCode ||
      !isKunciCarianValid(_this, type)
    ) {
      _this.setFormValue(tarikhTibaDiMalaysia, "");
      _this.setFormDisabled(tarikhTibaDiMalaysia, true);
    } else if (negPVal != "") {
      _this.setFormValue(tarikhTibaDiMalaysia, "");
      _this.setFormRequired(tarikhTibaDiMalaysia, true);
    }
  }

  // override to make them required
  isRequired = typeof isRequired === "undefined" ? false : isRequired;
  if (isRequired) {
    setKunciCarianStateOnEmptyAll(_this, {
      isRequired: true,
      kpt: kpt,
      kpp: kpp,
      noDok: noDok,
      jenisDok: jenisDok,
      negaraPeng: negaraPeng
    })
  } else {
    setKunciCarianStateOnEmptyAll(_this, {
      isOptional: true,
      kpt: kpt,
      kpp: kpp,
      noDok: noDok,
      jenisDok: jenisDok,
      negaraPeng: negaraPeng
    })
  }

  // check if is change
  let prevStr = _this.getFormValue(KUNCI_CARIAN_STR + type);;
  let curStr = getKunciCarianString(_this, {
    kpt: kpt,
    noDok: noDok,
    jenisDok: jenisDok,
    negaraPeng: negaraPeng,
    kpp: kpp,
  });
  _this.setFormValue(KUNCI_CARIAN_STR + type, curStr);
  _this.setFormValue(KUNCI_CARIAN_CHANGED + type, curStr != prevStr);



  if (isRetainState === true) {
    kCarian_retainStatePost(_this, {
      name: name,
      value: value,
      type: type,
      kpt: kpt,
      noDok: noDok,
      jenisDok: jenisDok,
      negaraPeng: negaraPeng
    });
  }


  return isChange;
}

// ##########################################################################################################
// Validasi Lelaki Perempuan

export function initTarafPerkahwinan(_this, {
  isLelaki,
  isPerempuan,

  // kegunaan pejabat
  tab1,
  T1_pemohon,
  T1_jenisKahwin,

  // lesen
  tab2,

  // current tab
  tarafKahwin,
  umur
}) {
  if (isLelaki != true && isPerempuan != true) {
    return;
  }

  let lesen = getLesenState(_this, tab2);

  let v_umur = _this.getFormValue(umur);
  let v_tarafKahwin = _this.getFormValue(tarafKahwin);
  let v_pemohon = _this.getFormValueByTab(tab1, T1_pemohon);
  let v_jenisKahwin = _this.getFormValueByTab(tab1, T1_jenisKahwin);
  let v_tarafKahwinDesc = _this.getFormSelectLabel(tarafKahwin);

  const TANPA_LESEN = "T";
  const DENGAN_LESEN = "L";

  const BELUM_KAHWIN = "1";
  const DUDA = "3";
  const JANDA = "4";
  const BALU = "5";

  let err = null;
  let tabToGo = null;
  let fcToFocus = null;
  let namaBorang = " - ";

  if (isLelaki && v_pemohon == "L") {
    if (v_umur >= 18 && v_umur < 21) {
      if (v_tarafKahwin == BELUM_KAHWIN) {
        if (v_jenisKahwin == TANPA_LESEN) {
          tabToGo = tab1;
          fcToFocus = T1_jenisKahwin;
          err = `Sila Pilih Jenis Perkahwinan Dengan Lesen`;
        } else if (v_jenisKahwin == DENGAN_LESEN) {
          if (!lesen.lelaki.checked) {
            tabToGo = tab2;
            fcToFocus = lesen.lelaki.name;
            namaBorang += lesen.lelaki.label;
            err = `Pilihan Jenis Lesen Mesti Dimasukkan`;
          }
        }
      } else if ([DUDA, BALU, JANDA].indexOf(v_tarafKahwin) >= 0) {
        if (v_jenisKahwin == DENGAN_LESEN) {
          if (lesen.lelaki.checked) {
            tabToGo = tab2;
            fcToFocus = lesen.lelaki.name;
            namaBorang += lesen.lelaki.label;
            err = `Set Perlu Lesen 01B Lelaki = ‘0’`;
          }
        }
      }
    } else {
      if (v_tarafKahwin == BELUM_KAHWIN) {
        if (v_jenisKahwin == DENGAN_LESEN) {
          if (lesen.lelaki.checked) {
            tabToGo = tab1;
            fcToFocus = T1_jenisKahwin;
            err = `Sila Pilih Jenis Perkahwinan Tanpa Lesen.`;
          }
        }
      }
    }
  } else if (isPerempuan && v_pemohon == "P") {
    // perlu 01B Perempuan
    if (v_umur >= 18 && v_umur < 21) {
      if (v_tarafKahwin == BELUM_KAHWIN) {
        if (v_jenisKahwin == TANPA_LESEN) {
          tabToGo = tab1;
          fcToFocus = T1_jenisKahwin;
          err = `Sila Pilih Jenis Perkahwinan Dengan Lesen`;
        } else if (v_jenisKahwin == DENGAN_LESEN) {
          if (!lesen.perempuan.checked) {
            tabToGo = tab2;
            fcToFocus = lesen.perempuan.name;
            namaBorang += lesen.perempuan.label;
            err = `Pilihan Jenis Lesen Mesti Dimasukkan`;
          }
        }
      }
    }
    // perlu 01D 16-18 tahun
    else if (v_umur >= 16 && v_umur < 18) {
      if (v_tarafKahwin == BELUM_KAHWIN) {
        if (v_jenisKahwin == TANPA_LESEN) {
          tabToGo = tab1;
          fcToFocus = T1_jenisKahwin;
          err = `Sila Pilih Jenis Perkahwinan Dengan Lesen`;
        } else if (v_jenisKahwin == DENGAN_LESEN) {
          if (!lesen.umur16to18.checked) {
            tabToGo = tab2;
            fcToFocus = lesen.umur16to18.name;
            namaBorang += lesen.umur16to18.label;
            err = `Pilihan Jenis Lesen Mesti Dimasukkan`;
          }
        }
      }
    }
  }

  if (err !== null) {
    _this.alertError(err + namaBorang, () => {
      _this.goToTab(tabToGo, fcToFocus);
    });
  }

  return err;
}

export function setUmur(_this, {
  fc_umur,
  v_tarikhLahir,
  v_tarikhMohon,
}) {

  if (v_tarikhLahir == "" || v_tarikhLahir == null) {
    console.error("[SkcHelper.setUmur] v_tarikhLahir empty");
    return;
  }

  if (v_tarikhMohon == "" || v_tarikhMohon == null) {
    console.error("[SkcHelper.setUmur] v_tarikhMohon empty");
    return;
  }

  let v_umur = UtilHelper.getAge(v_tarikhLahir, v_tarikhMohon);
  _this.setFormValue(fc_umur, v_umur);
}

// TODO
export function initUmur(_this, {
  isLelaki,
  isPerempuan,

  // kegunaan pejabat
  tab1,
  T1_jenisKahwin,
  T1_tarikhMohon,
  T1_pemohon,

  // lesen
  tab2,
  tarafKahwin,
  tarikhLahir,
  umur
}) {

  // TODO
  // 11.6.Jika "Tarikh Lahir" Perempuan dikosongkan nilai, sistem reset medan “Umur” Perempuan.

  let entity = "";
  if (isLelaki == true) {
    entity = "Lelaki";
  } else if (isPerempuan == true) {
    entity = "Perempuan";
  } else {
    return;
  }

  const TANPA_LESEN = "T";
  const DENGAN_LESEN = "L";
  const BELUM_BERKAHWIN = "1";
  const DUDA = "3";
  const JANDA = "4";
  const BALU = "5";

  let v_jenisKahwin = _this.getFormValueByTab(tab1, T1_jenisKahwin);
  let v_tarikhMohon = _this.getFormValueByTab(tab1, T1_tarikhMohon);
  let v_pemohon = _this.getFormValueByTab(tab1, T1_pemohon);
  let v_tarikhLahir = _this.getFormValue(tarikhLahir);
  let v_tarafKahwin = _this.getFormValue(tarafKahwin);
  _this.simulateOnChange(tarafKahwin);
  let v_tarafKahwinDesc = _this.getFormSelectLabel(tarafKahwin);

  if (typeof v_tarikhLahir === "string" && typeof v_tarikhMohon === "string") {
    let v_umur = UtilHelper.getAge(v_tarikhLahir, v_tarikhMohon);
    _this.setFormValue(umur, v_umur);
  }

  let lesen = getLesenState(_this, tab2);

  // console.log("initUmur ##############");
  // console.log("v_jenisKahwin", v_jenisKahwin);
  // console.log("v_tarafKahwinDesc", v_tarafKahwinDesc);
  // console.log("v_tarikhMohon", v_tarikhMohon);
  // console.log("v_tarikhLahir", v_tarikhLahir);
  // console.log("v_umur", v_umur);
  // console.log("v_pemohon", v_pemohon);
  // console.log("v_tarafKahwin", v_tarafKahwin);
  // console.log("lesen", lesen);

  let tabToGo = null;
  let fcToFocus = null;
  let err = null;

  if (v_pemohon == entity.substr(0, 1) || v_pemohon == "K") {
    if (v_jenisKahwin == TANPA_LESEN || ["1", "3", "4", "5", "6"].indexOf(v_jenisKahwin) >= 0) { // sham modify 7/5/2019
      if (v_umur < 21) {
        if (v_tarafKahwin == BELUM_BERKAHWIN) {
          err = `Umur Pemohon ${entity} Belum Mencapai 21 Tahun. Sila Pilih Jenis Perkahwinan Dengan Lesen.`;
          tabToGo = tab1;
          fcToFocus = T1_jenisKahwin;
        }
      }
    } else if (v_jenisKahwin == DENGAN_LESEN || v_jenisKahwin == "2") { // sham modify 7/5/2019
      let isLelakiLesenB = (isLelaki && lesen.lelaki.checked);
      let isPerempuanLesenB = (isPerempuan && lesen.perempuan.checked);

      if ((isLelaki && !lesen.lelaki.checked) && err == null) {
        if (v_umur >= 18 && v_umur < 21) {
          if (v_tarafKahwin == BELUM_BERKAHWIN) {
            let code = lesen.lelaki.label;
            err = `Pemohon ${entity} Berumur Kurang Dari 21 Tahun ` + code;
            tabToGo = tab2;
            fcToFocus = lesen.lelaki.name;
          }
        }
      }

      if ((isPerempuan && !lesen.perempuan.checked) && err == null) {
        if (v_umur >= 18 && v_umur < 21) {
          if (v_tarafKahwin == BELUM_BERKAHWIN) {
            let code = lesen.perempuan.label;
            err = `Pemohon ${entity} Berumur Kurang Dari 21 Tahun ` + code;
            tabToGo = tab2;
            fcToFocus = lesen.perempuan.name;
          }
        }
      }

      if ((isPerempuan && !lesen.umur16to18.checked) && err == null) {
        if (v_tarafKahwin == BELUM_BERKAHWIN) {
          if (v_umur >= 16 && v_umur < 18) {
            let code = lesen.umur16to18.label;
            err = `Pemohon ${entity} Berumur Kurang Dari 18 Tahun` + code;
            tabToGo = tab2;
            fcToFocus = lesen.umur16to18.name;
          }
        }
      }

      if ((isLelakiLesenB || isPerempuanLesenB) && err == null) {
        let lesenJantina = isLelaki ? lesen.lelaki : lesen.perempuan;
        let code = isLelaki ? lesen.lelaki.label : lesen.perempuan.label;

        if (v_tarafKahwin == BELUM_BERKAHWIN) {
          if (v_umur >= 21) {
            tabToGo = tab2;
            fcToFocus = lesenJantina.name;
            err = `Pemohon ${entity} Berumur Lebih 21 Tahun ` + code;
          } else if (v_umur < 18) {
            tabToGo = tab2;
            fcToFocus = lesenJantina.name;
            err = `Pemohon ${entity} Berumur Kurang Dari 18 Tahun `;
          }
        } else if ([DUDA, BALU, JANDA].indexOf(v_tarafKahwin) >= 0) {
          tabToGo = tab1;
          fcToFocus = T1_jenisKahwin;
          err = `Pemohon ${entity} Berstatus ${v_tarafKahwinDesc}. Sila Pilih Jenis Perkahwinan Tanpa Lesen.` + code;
        }
      } else if ((lesen.khas.checked || lesen.taliSaudara.checked || lesen.luarPej.checked) && err == null) {
        if (v_umur >= 18 && v_umur < 21) {
          if (v_tarafKahwin == BELUM_BERKAHWIN) {
            if (!isPerempuanLesenB || !isLelakiLesenB && err == null) {
              let code = isLelaki ? lesen.lelaki.label : lesen.perempuan.label;
              err = `Pemohon ${entity} Berumur Kurang Dari 21 Tahun ` + code;
              tabToGo = tab2;
              if (lesen.khas.checked) {
                fcToFocus = lesen.khas.name;
              } else if (lesen.taliSaudara.checked) {
                fcToFocus = lesen.taliSaudara.name;
              } else if (lesen.luarPej.checked) {
                fcToFocus = lesen.luarPej.name;
              }
            }
          } else if ([DUDA, BALU, JANDA].indexOf(v_tarafKahwin) >= 0) {
            if (v_umur < 18 || v_umur > 21) {
              tabToGo = tab1;
              fcToFocus = T1_jenisKahwin;
              err = `Pemohon ${entity} Berstatus ${v_tarafKahwinDesc}. Sila Pilih Jenis Perkahwinan Tanpa Lesen.`;
            }
          }
        } else if (v_umur >= 16 && v_umur <= 18) {
          if (v_tarafKahwin == BELUM_BERKAHWIN) {
            if (!lesen.umur16to18.checked && err == null) {
              let code = lesen.umur16to18.label;
              err = `Pemohon ${entity} Berumur Kurang Dari 16 Tahun ` + code;
              tabToGo = tab2;
              fcToFocus = lesen.umur16to18.name;
            }
          }
        }
      }

      if (isPerempuan && lesen.umur16to18.checked && err == null) {
        let code = " (01D)";
        if (v_tarafKahwin == BELUM_BERKAHWIN) {
          if (v_umur >= 18) {
            tabToGo = tab2;
            err = `${entity} Mesti Berumur Genap 16 Tahun Tetapi Kurang Dari 18 Tahun` + code;
            fcToFocus = lesen.umur16to18.name;
          } else if (v_umur < 16) {
            tabToGo = tab2;
            err = `${entity} Berumur Kurang dari 16 Tahun` + code;
            fcToFocus = lesen.umur16to18.name;
          }
        } else if ([DUDA, BALU, JANDA].indexOf(v_tarafKahwin) >= 0) {
          if (v_umur >= 16 && v_umur < 18) {
            tabToGo = tab2;
            fcToFocus = lesen.lelaki.name;
            err = `Set Perlu Lesen 01D Perempuan = ‘0’`;
          } else if (v_umur >= 21) {
            tabToGo = tab1;
            fcToFocus = T1_jenisKahwin;
            err = `Pemohon ${entity} Berstatus ${v_tarafKahwinDesc}. Sila Pilih Jenis Perkahwinan Tanpa Lesen.` + code;
          }
        }
      }
    }

    if (err !== null) {
      _this.alertError(err, () => {
        _this.goToTab(tabToGo, fcToFocus);
      });
    }
  }

  return err;
  // console.log("initUmur ##############");

}

export function initPenjaga(_this, {
  tabKunciCarian,
  kc_kpt,
  kc_noDok,
  kc_jenisDok,
  kc_negPeng,

  //current tab
  penjaga_nama,
  penjaga_pertalian,
  penjaga_tarikh,
  mahkamah_mahkamah,
  mahkamah_noRujukan,
  mahkamah_tarikh
}) {
  let hasKpt = !_this.isFormValueEmptyByTab(tabKunciCarian, kc_kpt);
  let hasNoDok = !_this.isFormValueEmptyByTab(tabKunciCarian, kc_noDok);
  let valJenisDok = _this.getFormValueByTab(tabKunciCarian, kc_jenisDok);

  let toRequired = [];
  let toDisabled = [];

  // condition 1
  if (hasKpt || (hasNoDok && DokumenMalaysia.indexOf(valJenisDok) >= 0)) {
    toRequired = [
      penjaga_pertalian,
      penjaga_tarikh,
    ];

    toDisabled = [
      penjaga_nama,
      mahkamah_mahkamah,
      mahkamah_noRujukan,
      mahkamah_tarikh
    ];
  }
  // condition 2
  else if (hasNoDok && DokumenBukanMalaysia.indexOf(valJenisDok) >= 0) {
    toRequired = [
      penjaga_nama,
      penjaga_pertalian,
      penjaga_tarikh,
    ];

    toDisabled = [
      mahkamah_mahkamah,
      mahkamah_noRujukan,
      mahkamah_tarikh
    ];
  }
  // condition 3
  else if (!hasKpt && !hasNoDok) {
    toRequired = [
      mahkamah_mahkamah,
      mahkamah_noRujukan,
      mahkamah_tarikh
    ];

    toDisabled = [
      penjaga_nama,
      penjaga_pertalian,
      penjaga_tarikh,
    ];
  }

  // set required
  for (var i in toRequired) {
    let fc = toRequired[i];
    let v = true;
    if (typeof fc.children !== "undefined") {
      v = [true, false, false];
    }
    _this.setFormRequired(fc, v);
  }

  // set disabled
  for (var i in toDisabled) {
    let fc = toDisabled[i];
    _this.setFormDisabled(fc, true);
  }

  return toRequired;
}

export function initTabLelakiPerempuan(_this, {
  tabKunciCarian,
  kc_kpt,
  kc_noDok,
  kc_jenisDok,
  kc_negPeng,

  fcArr,
  nama,
  namaBapa,
  alamat,
  poskod,
  bandar,
  negeri,
  noTel,
  tarikhLahir,
  umur,
  warganegara,
  negDomisil,
  pekerjaan,
  agama,
  tarafKahwin
}) {
  console.log("initTabLelakiPerempuan");
  let hasKpt = !_this.isFormValueEmptyByTab(tabKunciCarian, kc_kpt);
  let noKpt = _this.isFormValueEmptyByTab(tabKunciCarian, kc_kpt);
  let hasNoDok = !_this.isFormValueEmptyByTab(tabKunciCarian, kc_noDok);
  let noNoDok = _this.isFormValueEmptyByTab(tabKunciCarian, kc_noDok);
  let valJenisDok = _this.getFormValueByTab(tabKunciCarian, kc_jenisDok);
  let noJenisDok = _this.isFormValueEmptyByTab(tabKunciCarian, kc_jenisDok);

  let toRequired = [];
  let toDisabled = [];


  // condition 2
  if (hasNoDok && ["01", "03", "07", "10", "91", "92"].indexOf(valJenisDok) >= 0) {
    console.log("CONDITION 2")
    let inToReq = [alamat.name, negeri.name, pekerjaan.name];
    let inToDis = [nama.name, tarikhLahir.name, umur.name, warganegara.name, tarafKahwin.name, agama.name];
    for (var i in fcArr) {
      let fc = fcArr[i];
      let name = fc.name;
      if (inToReq.indexOf(name) >= 0) {
        toRequired.push(fc)
      } else if (inToDis.indexOf(name) >= 0) {
        toDisabled.push(fc)
      }
    }
  }
  // condition 3
  else if (hasNoDok && ["02", "28", "29", "30", "99"].indexOf(valJenisDok) >= 0) {
    // CR Production 
    // agama kat tab lelaki n perempuan nak mandatory kalau tak jenis dok bukan malaysia 

    console.log("CONDITION 3")
    // let inToReq = [nama.name, alamat.name, negeri.name, tarikhLahir.name, warganegara.name, pekerjaan.name, tarafKahwin.name,
    //   // NewCRAgama
    //   //agama.name
    // ];
    // let inToDis = [
    //   umur.name, agama.name //- NewCRAgama
    // ];

    let inToReq = [];
    let inToDis = [];
    if (Is_CR_Enable.SKC_AgamaRequired) {
      inToReq = [
        nama.name, alamat.name, negeri.name, tarikhLahir.name,
        warganegara.name, pekerjaan.name, tarafKahwin.name,
        agama.name
      ];
      inToDis = [
        umur.name
      ];
    } else {
      inToReq = [
        nama.name, alamat.name, negeri.name, tarikhLahir.name,
        warganegara.name, pekerjaan.name, tarafKahwin.name
      ];
      inToDis = [
        umur.name,
        agama.name
      ];
    }

    for (var i in fcArr) {
      let fc = fcArr[i];
      let name = fc.name;
      if (inToReq.indexOf(name) >= 0) {
        toRequired.push(fc)
      } else if (inToDis.indexOf(name) >= 0) {
        toDisabled.push(fc)
      } else { }
    }
  }
  // condition 1
  else if (hasKpt || (hasNoDok && ["93"].indexOf(valJenisDok) >= 0)) {
    console.log("CONDITION 1")
    let inToReq = [pekerjaan.name];
    let inToOpt = [namaBapa.name, noTel.name, negDomisil.name];
    for (var i in fcArr) {
      let fc = fcArr[i];
      let name = fc.name;
      if (inToReq.indexOf(name) >= 0) {
        toRequired.push(fc)
      } else if (inToOpt.indexOf(name) >= 0) { } else {
        toDisabled.push(fc)
      }
    }
  }
  // condition 4
  else if (noKpt && noNoDok && noJenisDok) {
    console.log("CONDITION 4")
    let inToReq = [nama.name, alamat.name, negeri.name, tarikhLahir.name, warganegara.name, pekerjaan.name, tarafKahwin.name];
    let inToDis = [umur.name, agama.name];
    for (var i in fcArr) {
      let fc = fcArr[i];
      let name = fc.name;
      if (inToReq.indexOf(name) >= 0) {
        toRequired.push(fc)
      } else if (inToDis.indexOf(name) >= 0) {
        toDisabled.push(fc)
      } else { }
    }
  }

  // set all optional dulu
  for (var i in fcArr) {
    _this.setFormDisabled(fcArr[i], false);
    _this.setFormRequired(fcArr[i], false);
  }

  // set required
  for (var i in toRequired) {
    let fc = toRequired[i];
    let v = true;
    if (typeof fc.children !== "undefined") {
      v = [true, false, false];
    }
    _this.setFormRequired(fc, v);
  }

  // set disabled
  for (var i in toDisabled) {
    let fc = toDisabled[i];
    _this.setFormDisabled(fc, true);
  }


  return toRequired;

}

// ##########################################################################################################
// Validasi Permohonan Perkahwinan


export function onChangeTarikhPerkahwinan(_this, {
  name,
  value,
  error,
  ref,

  // kegunaan pejabat
  tab1,
  T1_jenisKahwin,
  T1_tarikhMohon,

  // tab lesen
  tab2,

  // current tab
  tarikhPerkahwinan
}) {

  _this.setFormRequired(tarikhPerkahwinan, true);

  if (value == null) {
    return;
  }

  const isTempohHariValidDariMohon = (v_tarikhMohon, v_tarikhKahwin) => {
    let offset = TEMPOH_HARI_VALID - 1;
    let footer = `<br><br>Tarikh Permohonan - <b>${v_tarikhMohon}</b>`;
    if (TimeHelper.isDatePeriodDayTrue(v_tarikhMohon, v_tarikhKahwin, offset)) {
      return `Tarikh Perkahwinan Tidak Sah 
        (Mesti Melebihi ${offset} Hari Tidak Termasuk Tarikh Permohonan) 
        Kecuali Mempunyai Lesen JPN.KC01C 
        ${footer}`;
    }
    return null;
  }

  const isDalamEnamBulanDariMohon = (v_tarikhMohon, v_tarikhKahwin) => {
    let footer = `<br><br>Tarikh Permohonan - <b>${v_tarikhMohon}</b>`;
    if (!TimeHelper.isDatePeriodMonthTrue(v_tarikhMohon, v_tarikhKahwin, 6)) {
      return `Tarikh Perkahwinan Tidak Sah 
        (Mesti Dalam Tempoh 6 Bulan Daripada Tarikh Permohonan)
        ${footer}`;
    }
    return null;

  }

  // let v_jenisKahwin = _this.getFormValueByTab(tab1, T1_jenisKahwin);
  // let v_tarikhMohon = _this.getFormValueByTab(tab1, T1_tarikhMohon);
  let v_jenisKahwin = _this.getFormValueGlobal(tab1, T1_jenisKahwin);
  let v_tarikhMohon = _this.getFormValueGlobal(tab1, T1_tarikhMohon);

  let v_tarikhKahwin = value;
  let isValid = _this.isFormValueValid(tarikhPerkahwinan);
  let err = null;

  // console.log("******* onChangeTarikhPerkahwinan ******")
  // console.log("v_jenisKahwin", v_jenisKahwin);
  // console.log("v_tarikhMohon", v_tarikhMohon);  
  // console.log("v_tarikhKahwin", v_tarikhKahwin);
  // console.log("isValid", isValid);
  // console.log("******* onChangeTarikhPerkahwinan ******")

  if (v_jenisKahwin == "T" && isValid) {
    if (OnChangeHelper.tarikhKurangTarikhCawangan(_this, name, value, error, ref, () => {
      _this.setFormValue(tarikhPerkahwinan, "");
    })) {
      return;
    }
    err = isTempohHariValidDariMohon(v_tarikhMohon, v_tarikhKahwin);
    if (err == null) {
      err = isDalamEnamBulanDariMohon(v_tarikhMohon, v_tarikhKahwin);
    }
  }
  /**
   * Tempoh yang valid utk tarikh perkahwinan dengan lesen
    [TARIKH LULUS] -------- [TARIKH KAHWIN] --------- [Sebulan Selepas TARIKH LULUS]
   */
  else if (v_jenisKahwin == "L" && isValid) {
    console.log("SINI LA");
    let lesen = getLesenState(_this, tab2);
    let tarikhLulusArr = getLesenValArr(_this, {
      tabName: tab2,
      fieldName: LesenTemporaryFCName.FidTarikhLulus,
      includeRow: true,
    });

    for (var i in tarikhLulusArr) {
      let tarikLulus = tarikhLulusArr[i].value;
      let lesenKey = tarikhLulusArr[i].key;
      let lesenLabel = lesen[lesenKey].label
      let footer = `<br><br>Tarikh Lulus Lesen - <b>${tarikLulus}</b>`;

      if (TimeHelper.isDateBigger(tarikLulus, v_tarikhKahwin)) {
        err = `Tarikh Lulus Lesen Melebihi Tarikh Perkahwinan - LESEN ${lesenLabel}
          ${footer}`;
      }
    }

    if (err == null) {
      if (lesen.taliSaudara.checked || lesen.khas.checked || lesen.umur16to18.checked || lesen.luarPej.checked) {
        for (var i in tarikhLulusArr) {
          let tarikLulus = tarikhLulusArr[i].value;
          let lesenKey = tarikhLulusArr[i].key;
          let lesenLabel = lesen[lesenKey].label;
          let footer = `<br><br>Tarikh Lulus Lesen - <b>${tarikLulus}</b>`;

          // lesen tak boleh lebih dari sebulan
          if (!TimeHelper.isDatePeriodMonthTrue(tarikLulus, v_tarikhKahwin, 1)) {
            err = `Tempoh Sah Laku Lesen ${lesenLabel} Telah Tamat Semasa Tarikh Perkahwinan
            ${footer}`;
          }
        }
      }
    }

    if (err == null && !lesen.khas.checked) {
      if (lesen.umur16to18.checked || lesen.taliSaudara.checked ||
        lesen.luarPej.checked || lesen.lelaki.checked ||
        lesen.perempuan.checked) {
        err = isTempohHariValidDariMohon(v_tarikhMohon, v_tarikhKahwin);
        if (err == null) {
          err = isDalamEnamBulanDariMohon(v_tarikhMohon, v_tarikhKahwin);
        }
      }
    }

    if (err == null && (lesen.lelaki.checked || lesen.perempuan.checked)) {
      err = isDalamEnamBulanDariMohon(v_tarikhMohon, v_tarikhKahwin);
    }

  }

  // kurang tarikh sistem
  if (err == null) {
    if (OnChangeHelper.tarikhKurangTarikhCawangan(_this, name, value, error, ref, () => {
      _this.setFormValue(tarikhPerkahwinan, "");
    })) {
      return;
    }
  }

  if (err !== null) {
    err += `<div style="margin-top:4px;">Tarikh Perkahwinan - <b>${value}</b><br></div>`;
    _this.alertError(err, () => {
      _this.setFormValue(tarikhPerkahwinan, "");
      return false;
    })
  } else {
    return true;
  }

}

export function initNegeriUpacaraDibenarkan(_this, {
  tab1,
  T1_jenisKahwin,

  tab2,

  negeriUpacaraDibenarkan,
}) {

  let v_jenisKahwin = _this.getFormValueByTab(tab1, T1_jenisKahwin);
  let lesen = getLesenState(_this, tab2);
  let negeri = "";

  // let negeriKebenaranArr = getLesenValArr(_this, {
  //   tabName: tab2,
  //   fieldName: LesenTemporaryFCName.FidNegeriKebenaran
  // })

  if (v_jenisKahwin == "T") {
    _this.setFormDisabled(negeriUpacaraDibenarkan, true);
    _this.setFormValue(negeriUpacaraDibenarkan, "");
  } else if (v_jenisKahwin == "L") {

    if (lesen.khas.checked && lesen.luarPej.checked) {
      negeri = lesen.luarPej.negeriKebenaran;
    } else if (lesen.khas.checked && !lesen.luarPej.checked) {
      negeri = lesen.khas.negeriKebenaran;
    }
    console.log("negeri ", negeri);

    _this.setFormValue(negeriUpacaraDibenarkan, negeri);

    // // _this.setFormDisabled(negeriUpacaraDibenarkan, true);
    // if (negeriKebenaranArr.length > 0) {
    //   let negeri = negeriKebenaranArr[0];
    // }
  }

}

export function initTarikhTamatSiaran(_this, {
  tab1,
  T1_jenisKahwin,
  T1_tarikhPermohonan,

  tab2,

  //current tab
  tarikhTamatSiaran
}) {
  // sentiasa protect
  _this.setFormDisabled(tarikhTamatSiaran, true);
  let v_jenisKahwin = _this.getFormValueByTab(tab1, T1_jenisKahwin);
  let v_tarikhMohon = _this.getFormValueByTab(tab1, T1_tarikhPermohonan);
  let lesen = getLesenState(_this, tab2);

  // console.log("initTarikhTamatSiaran ->", "v_jenisKahwin", v_jenisKahwin)
  // console.log("initTarikhTamatSiaran ->", "v_tarikhMohon", v_tarikhMohon)

  let val = "";
  let isAfterValidDays = false;
  // tanpa lesen
  if (v_jenisKahwin == "T") {
    isAfterValidDays = true;
  }
  // dengan lesen
  else if (v_jenisKahwin == "L") {
    // kalau tak checked lesen khas
    if (!lesen.khas.checked) {
      isAfterValidDays = true;
    }
  }

  if (isAfterValidDays) {
    // minus 1 sebab termasuk tarikh mohon
    let offset = TEMPOH_HARI_VALID - 1;
    val = TimeHelper.getDateAfterDays(v_tarikhMohon, offset);
  }

  // console.log("isAfterValidDays", isAfterValidDays)
  // console.log("val", val)

  _this.setFormValue(tarikhTamatSiaran, val);
}

export function onChangeTempatPerkahwinan(_this, {
  tab1,
  T1_jenisKahwin,

  tab2,

  // onchange
  name,
  value,
  error,
  ref,

  //current tab
  tempatPerkahwinan,
  tempatPerkahwinanLain,
}) {

  let lesen = getLesenState(_this, tab2);

  let v_tempatPerkahwinan = _this.getFormValue(tempatPerkahwinan);
  let v_jenisKahwin = _this.getFormValueByTab(tab1, T1_jenisKahwin);
  let negeriKebenaranArr = getLesenValArr(_this, {
    tabName: tab2,
    fieldName: LesenTemporaryFCName.FidNegeriKebenaran
  })

  const resetTempatPerkahwinanLain = () => {
    _this.setFormDisabled(tempatPerkahwinanLain, true);
    _this.setFormValue(tempatPerkahwinanLain, "");
  }

  let toRequired = [];
  let toDisabled = [];
  let errToDisplay = null;

  if (v_jenisKahwin == "T" || v_jenisKahwin == "1") {
    resetTempatPerkahwinanLain();
    toRequired = [tempatPerkahwinan];
  } else if (v_jenisKahwin == "L" || v_jenisKahwin == "2") {
    if (lesen.luarPej.checked) {
      _this.setFormDisabled(tempatPerkahwinan, true);
      _this.setFormValue(tempatPerkahwinan, "");
      toRequired = [tempatPerkahwinanLain];
    } else {
      resetTempatPerkahwinanLain();
      toRequired = [tempatPerkahwinan];
      // kalau tak wujud dalam negeri kebenaran lesen. kita buat error
      if (negeriKebenaranArr.length > 0 && value != "" && value !== null) {
        if (typeof v_tempatPerkahwinan == "string") {
          let codeNegeri = v_tempatPerkahwinan.substring(0, 2);
          if (negeriKebenaranArr.indexOf(codeNegeri) <= -1) {
            errToDisplay = `Negeri Tempat Perkahwinan Mesti Sama Dengan Negeri Upacara Dibenarkan (Tab Lesen)`;
          }
        }
      }

      // kalau tak empty tempat kawin, tempat kawin lain kena protect
      // if (!_this.isFormValueEmpty(tempatPerkahwinan)) {
      //   resetTempatPerkahwinanLain();
      // }
    }
  }

  // console.log("**** onChangeTempatPerkahwinan *********")
  // console.log("negeriKebenaranArr", negeriKebenaranArr);
  // console.log("v_tempatPerkahwinan", v_tempatPerkahwinan);
  // console.log("v_jenisKahwin", v_jenisKahwin);
  // console.log("errToDisplay", errToDisplay);
  // console.log("**** onChangeTempatPerkahwinan *********")

  // papar error if any
  if (errToDisplay != null) {
    _this.alertError(errToDisplay, () => {
      _this.setFormValue(tempatPerkahwinan, "");
      resetTempatPerkahwinanLain();
    })
  }

  // set required
  for (var i in toRequired) {
    let fc = toRequired[i];
    _this.setFormRequired(fc, true);
  }

  // set disabled
  for (var i in toDisabled) {
    let fc = toDisabled[i];
    _this.setFormDisabled(fc, true);
  }

  return toRequired;
}

// ###########################################################################################################
// Validasi Utk Lesen ########################################################################################

export const LesenDataset = {
  jenisLesen1A: [{
    value: "3",
    label: "SEK.11(6)/BORANG 01A (TALI PERSAUDARAAN)"
  }],
  jenisLesen1BL: [{
    value: "5",
    label: "SEK.12/BORANG 01B LELAKI (18-21 TAHUN)"
  }],
  jenisLesen1BP: [{
    value: "6",
    label: "SEK.12/BORANG 01B PEREMPUAN (18-21 TAHUN)"
  }],
  jenisLesen1C: [{
    value: "1",
    label: "SEK.21(1)/BORANG 01C (LESEN KHAS)"
  }],
  jenisLesen1D: [{
    value: "2",
    label: "SEK.21(2)/BORANG 01D (16-18 TAHUN)"
  }],
  jenisLesen1E: [{
    value: "4",
    label: "SEK.21(3)/BORANG 01E (LUAR PEJABAT)"
  }],
  diluluskanOleh: [{
    value: "",
    label: "---SILA PILIH---"
  },
  {
    value: "1",
    label: "1 - KETUA MENTERI"
  },
  {
    value: "2",
    label: "2 - PENDAFTAR BESAR"
  },
  {
    value: "3",
    label: "3 - PENOLONG PENDAFTAR BESAR"
  },
  {
    value: "4",
    label: "4 - PENGUASA NEGERI"
  },
  {
    value: "5",
    label: "5 - DUTA/PESURUHJAYA TINGGI/KONSUL MALAYSIA"
  },
  {
    value: "6",
    label: "6 - HAKIM MAHKAMAH TINGGI"
  },
  ]
}

export const LesenInWs = "InWsLesen";
export const LesenTemporaryFCName = {
  FidJenisLesen: "jenisLesen",
  FidTarikhLulus: "tarikhLulus",
  FidDiluluskanOleh: "diluluskanOleh",
  FidNegeriKebenaran: "negeriKebenaran",
}

// Grouping untuk 5 jenis lesen
export const LesenFcOriginal = {
  jenisLesen1A: {
    label: "Jenis Lesen",
    name: "Fid1405Borang01a",
    len: 1
  },
  jenisLesen1BL: {
    label: "Jenis Lesen",
    name: "Fid1409Borang01bL",
    len: 1
  },
  jenisLesen1BP: {
    label: "Jenis Lesen",
    name: "Fid1411Borang01bP",
    len: 1
  },
  jenisLesen1C: {
    label: "Jenis Lesen",
    name: "Fid1401Borang01c",
    len: 1
  },
  jenisLesen1D: {
    label: "Jenis Lesen",
    name: "Fid1403Borang01d",
    len: 1
  },
  jenisLesen1E: {
    label: "Jenis Lesen",
    name: "Fid1407Borang01e",
    len: 1
  },

  //#####################################
  // utk insert or update to DB
  jenisLesen1: {
    label: "Jenis Lesen",
    name: "Fid4889JenisLesen1",
    len: 30
  },
  jenisLesen2: {
    label: "Jenis Lesen",
    name: "Fid4891JenisLesen2",
    len: 30
  },
  jenisLesen3: {
    label: "Jenis Lesen",
    name: "Fid4893JenisLesen3",
    len: 30
  },
  jenisLesen4: {
    label: "Jenis Lesen",
    name: "Fid4895JenisLesen4",
    len: 30
  },
  jenisLesen5: {
    label: "Jenis Lesen",
    name: "Fid7545JenisLesen5",
    len: 30
  },

  tarikhLulus1: {
    label: "Tarikh Lulus",
    name: "Fid4905TarikhLulus1",
    len: 10,
    formatType: FormatType.DATE
  },
  tarikhLulus2: {
    label: "Tarikh Lulus",
    name: "Fid4907TarikhLulus2",
    len: 10,
    formatType: FormatType.DATE
  },
  tarikhLulus3: {
    label: "Tarikh Lulus",
    name: "Fid4909TarikhLulus3",
    len: 10,
    formatType: FormatType.DATE
  },
  tarikhLulus4: {
    label: "Tarikh Lulus",
    name: "Fid4911TarikhLulus4",
    len: 10,
    formatType: FormatType.DATE
  },
  tarikhLulus5: {
    label: "Tarikh Lulus",
    name: "Fid7549TarikhLulus5",
    len: 10,
    formatType: FormatType.DATE
  },

  diluluskan1: {
    label: "Diluluskan Oleh",
    name: "Fid4913DiluluskanOleh1",
    len: 1
  },
  keteranganDiluluskan1: {
    label: "Keterangan Diluluskan Oleh",
    name: "Fid7789KeteranganDiluluskan1",
    len: 24
  },
  diluluskan2: {
    label: "Diluluskan Oleh",
    name: "Fid4915DiluluskanOleh2",
    len: 1
  },
  keteranganDiluluskan2: {
    label: "Keterangan Diluluskan Oleh",
    name: "Fid7791KeteranganDiluluskan2",
    len: 24
  },
  diluluskan3: {
    label: "Diluluskan Oleh",
    name: "Fid4917DiluluskanOleh3",
    len: 1
  },
  keteranganDiluluskan3: {
    label: "Keterangan Diluluskan Oleh",
    name: "Fid7793KeteranganDiluluskan3",
    len: 24
  },
  diluluskan4: {
    label: "Diluluskan Oleh",
    name: "Fid4919DiluluskanOleh4",
    len: 1
  },
  keteranganDiluluskan4: {
    label: "Keterangan Diluluskan Oleh",
    name: "Fid7795KeteranganDiluluskan4",
    len: 24
  },
  diluluskan5: {
    label: "Diluluskan Oleh",
    name: "Fid7551DiluluskanOleh5",
    len: 1
  },
  keteranganDiluluskan5: {
    label: "Keterangan Diluluskan Oleh",
    name: "Fid7797KeteranganDiluluskan5",
    len: 24
  },

  negeriKebenaran1: {
    label: "Negeri Kebenaran",
    name: "Fid7553NegeriKebenaran1",
    len: 2
  },
  keteranganNegeriKebenaran1: {
    label: "Keterangan Negeri Kebenaran",
    name: "Fid7585KeteranganNegeri1",
    len: 40
  },
  negeriKebenaran2: {
    label: "Negeri Kebenaran",
    name: "Fid7555NegeriKebenaran2",
    len: 2
  },
  keteranganNegeriKebenaran2: {
    label: "Keterangan Negeri Kebenaran",
    name: "Fid7587KeteranganNegeri2",
    len: 40
  },
  negeriKebenaran3: {
    label: "Negeri Kebenaran",
    name: "Fid7557NegeriKebenaran3",
    len: 1
  },
  keteranganNegeriKebenaran3: {
    label: "Keterangan Negeri Kebenaran",
    name: "Fid7589KeteranganNegeri3",
    len: 40
  },
  negeriKebenaran4: {
    label: "Negeri Kebenaran",
    name: "Fid7559NegeriKebenaran4",
    len: 1
  },
  keteranganNegeriKebenaran4: {
    label: "Keterangan Negeri Kebenaran",
    name: "Fid7591KeteranganNegeri4",
    len: 40
  },
  negeriKebenaran5: {
    label: "Negeri Kebenaran",
    name: "Fid7561NegeriKebenaran5",
    len: 1
  },
  keteranganNegeriKebenaran5: {
    label: "Keterangan Negeri Kebenaran",
    name: "Fid7593KeteranganNegeri5",
    len: 40
  },
}

export function addHasCheckboxFn(fcs){
  for(var i in fcs){
    fcs[i].hasCheckboxFn = true;
  }
  return fcs;
}

export const LesenTemporaryFC = {
  // TEMP  -- jenis Lesen -- buang children utk set data from web journal
  _temp_jenisLesen1: {
    name: "jenisLesen1",
    // children: ["3"],
    // childrenType: ChildrenType.CHECKBOX
  },
  _temp_jenisLesen2: {
    name: "jenisLesen2",
    // children: ["5"],
    // childrenType: ChildrenType.CHECKBOX
  },
  _temp_jenisLesen3: {
    name: "jenisLesen3",
    // children: ["6"],
    // childrenType: ChildrenType.CHECKBOX
  },
  _temp_jenisLesen4: {
    name: "jenisLesen4",
    // children: ["1"],
    // childrenType: ChildrenType.CHECKBOX
  },
  _temp_jenisLesen5: {
    name: "jenisLesen5",
    // children: ["2"],
    // childrenType: ChildrenType.CHECKBOX
  },
  _temp_jenisLesen6: {
    name: "jenisLesen6",
    // children: ["4"],
    // childrenType: ChildrenType.CHECKBOX
  },

  // TEMP  -- tarikh lulus
  _temp_tarikhLulus1: {
    name: "tarikhLulus1",
    formatType: FormatType.DATE
  },
  _temp_tarikhLulus2: {
    name: "tarikhLulus2",
    formatType: FormatType.DATE
  },
  _temp_tarikhLulus3: {
    name: "tarikhLulus3",
    formatType: FormatType.DATE
  },
  _temp_tarikhLulus4: {
    name: "tarikhLulus4",
    formatType: FormatType.DATE
  },
  _temp_tarikhLulus5: {
    name: "tarikhLulus5",
    formatType: FormatType.DATE
  },
  _temp_tarikhLulus6: {
    name: "tarikhLulus6",
    formatType: FormatType.DATE
  },

  // TEMP  -- diluluskan oleh
  _temp_diluluskanOleh1: {
    name: "diluluskanOleh1",
  },
  _temp_diluluskanOleh2: {
    name: "diluluskanOleh2",
  },
  _temp_diluluskanOleh3: {
    name: "diluluskanOleh3",
  },
  _temp_diluluskanOleh4: {
    name: "diluluskanOleh4",
  },
  _temp_diluluskanOleh5: {
    name: "diluluskanOleh5",
  },
  _temp_diluluskanOleh6: {
    name: "diluluskanOleh6",
  },

  // TEMP  -- negeri kebenaran
  _temp_negeriKebenaran1: {
    name: "negeriKebenaran1",
  },
  _temp_negeriKebenaran2: {
    name: "negeriKebenaran2",
  },
  _temp_negeriKebenaran3: {
    name: "negeriKebenaran3",
  },
  _temp_negeriKebenaran4: {
    name: "negeriKebenaran4",
  },
  _temp_negeriKebenaran5: {
    name: "negeriKebenaran5",
  },
  _temp_negeriKebenaran6: {
    name: "negeriKebenaran6",
  },
}

// ###################################################################
// Function Helper Untuk Lesen
// ###################################################################

const BILANGAN_LESEN = 6;


/** From PC Kak Salina */
export function disabledAllLesen(_this, tabLesen) {
  for (var index = 1; index <= BILANGAN_LESEN; index++) {
    _this.setFormDisabledByTab(tabLesen, LesenTemporaryFCName.FidJenisLesen + index, true);
    _this.setFormDisabledByTab(tabLesen, LesenTemporaryFCName.FidTarikhLulus + index, true);
    _this.setFormDisabledByTab(tabLesen, LesenTemporaryFCName.FidDiluluskanOleh + index, true);
    _this.setFormDisabledByTab(tabLesen, LesenTemporaryFCName.FidNegeriKebenaran + index, true);
  }
}

/** From PC Kak Salina */
export function emptyAllLesen(_this, tabLesen) {
  for (var index = 1; index <= BILANGAN_LESEN; index++) {
    _this.setFormValueByTab(tabLesen, LesenTemporaryFCName.FidJenisLesen + index, null);
    _this.setFormValueByTab(tabLesen, LesenTemporaryFCName.FidTarikhLulus + index, null);
    _this.setFormValueByTab(tabLesen, LesenTemporaryFCName.FidDiluluskanOleh + index, null);
    _this.setFormValueByTab(tabLesen, LesenTemporaryFCName.FidNegeriKebenaran + index, null);
  }
}

/** From PC Kak Salina */
export function setLesenTempFromDB(_this, {
  rawData,
  tabLesen,
}) {
  emptyAllLesen(_this, tabLesen);

  let Ori = LesenFcOriginal;

  let arrFcValue = [Ori.jenisLesen1, Ori.jenisLesen2, Ori.jenisLesen3, Ori.jenisLesen4, Ori.jenisLesen5];
  let arrValue = [];
  for (var i in arrFcValue) {
    if (arrFcValue[i] != "") {
      arrValue.push(rawData[arrFcValue[i].name]);
    }
  }

  let lesen = getLesenState(_this, tabLesen);


  // special case for valueJenis = 6 (lesen perempuan)
  // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa
  if (rawData[Ori.jenisLesen1BP.name] == "1") {
    arrValue.push(lesen.perempuan.valueJenis);
  }

  for (var k in lesen) {
    let _lsn = lesen[k];
    let valueMap = _lsn.valueJenis;

    if (valueMap > "5") {
      valueMap = "5";
    }

    // kalau ada dlm arr value, maksudnya dia checked
    if (arrValue.indexOf(_lsn.valueJenis) >= 0) {
      let oriNameTarikhLulus = Ori["tarikhLulus" + valueMap].name;
      let oriNameDiluluskanOleh = Ori["diluluskan" + valueMap].name;
      let oriNameNegeriKebenaran = Ori["negeriKebenaran" + valueMap].name;

      let oriTarikhLulus = rawData[oriNameTarikhLulus];
      if (oriTarikhLulus == "00000000") {
        oriTarikhLulus = "";
      } else {
        oriTarikhLulus = FormatHelper.dbToDate(oriTarikhLulus);
      }

      let oriDiluluskanOleh = rawData[oriNameDiluluskanOleh];
      let oriNegeriKebenaran = rawData[oriNameNegeriKebenaran];

      // console.log(oriNameTarikhLulus, oriNameDiluluskanOleh, oriNameNegeriKebenaran)
      // console.log(k, _lsn.valueJenis, oriTarikhLulus, oriDiluluskanOleh, oriNegeriKebenaran);
      // console.log("_lsn", _lsn)
      // console.log(k, "valueMap", valueMap);
      // console.log("arrValue", arrValue)

      _this.setFormValueByTab(tabLesen, _lsn.name, [_lsn.valueJenis]);
      _this.setFormValueByTab(tabLesen, _lsn.nameTarikhLulus, oriTarikhLulus);
      _this.setFormValueByTab(tabLesen, _lsn.nameDiluluskanOleh, oriDiluluskanOleh);
      _this.setFormValueByTab(tabLesen, _lsn.nameNegeriKebenaran, oriNegeriKebenaran);
    }
  }
}

export function isJenisLesenChecked(_this, tabName, rowNumber) {
  let name = LesenTemporaryFCName.FidJenisLesen + rowNumber;
  if (_this.transactionCurrentTabId == tabName) {
    return !_this.isFormValueEmpty(name);
  } else {
    return !_this.isFormValueEmptyByTab(tabName, name);
  }
}

/**
 * Used in onChange JenisPemohon in Tab 1
 * To Reset Temp Lesen Value and Original Lesen Value
 */
export function resetAllLesenValue(_this, tabName) {
  for (var k in LesenTemporaryFC) {
    let fc = LesenTemporaryFC[k];
    _this.setFormValueByTab(tabName, fc, null);
  }

  for (var k in LesenFcOriginal) {
    let fc = LesenFcOriginal[k];
    _this.setFormValueByTab(tabName, fc, null);
  }

  for (var i = 1; i <= BILANGAN_LESEN; i++) {
    _this.setFormDisabledByTab(tabName, LesenTemporaryFCName.FidJenisLesen + i, false);
    _this.setFormDisabledByTab(tabName, LesenTemporaryFCName.FidTarikhLulus + i, true);
    _this.setFormDisabledByTab(tabName, LesenTemporaryFCName.FidDiluluskanOleh + i, true);
    _this.setFormDisabledByTab(tabName, LesenTemporaryFCName.FidNegeriKebenaran + i, true);

    _this.setFormRequiredByTab(tabName, LesenTemporaryFCName.FidJenisLesen + i, false);
    _this.setFormRequiredByTab(tabName, LesenTemporaryFCName.FidTarikhLulus + i, false);
    _this.setFormRequiredByTab(tabName, LesenTemporaryFCName.FidDiluluskanOleh + i, false);
    _this.setFormRequiredByTab(tabName, LesenTemporaryFCName.FidNegeriKebenaran + i, false);


  }
}

export function getLesenKey(index) {
  let list = ["",
    "taliSaudara",
    "lelaki",
    "perempuan",
    "khas",
    "umur16to18",
    "luarPej"
  ];
  return list[index];
}


/**
4411000	12/30/1996 12:00:00 AM	P/'MOHONAN PERKAHWINAN LESEN SEK.21(1)-HASIL NEGER	87237	10000
4411001	12/30/1996 12:00:00 AM	P/'MOHONAN PERKAHWINAN LESEN SEK.21(2)-HASIL NEGER	87237	1000
4411002	12/30/1996 12:00:00 AM	P/'MOHONAN PERKAHWINAN LESEN SEK.11(6)-HASIL NEGER	87237	200
4411003	12/30/1996 12:00:00 AM	P/'MOHONAN PERKAHWINAN LESEN SEK.21(3)-HASIL NEGER	87237	50000
4411004	12/30/1996 12:00:00 AM	P/'MOHONAN PERKAHWINAN LESEN SEK.12 - HASIL NEGERI	87237	0
4411010	12/30/1996 12:00:00 AM	PERMOHONAN PERKAHWINAN LESEN SEK.21(1) - HASIL JPN	71304	10000
4411011	12/30/1996 12:00:00 AM	PERMOHONAN PERKAHWINAN LESEN SEK.21(2) - HASIL JPN	71304	1000
4411012	12/30/1996 12:00:00 AM	PERMOHONAN PERKAHWINAN LESEN SEK.11(6) - HASIL JPN	71304	200
4411013	12/30/1996 12:00:00 AM	PERMOHONAN PERKAHWINAN LESEN SEK.21(3) - HASIL JPN	71304	50000
4411014	12/30/1996 12:00:00 AM	PERMOHONAN PERKAHWINAN LESEN SEK.12 - HASIL JPN	71304	0
*/

export function getLesenState(_this, tab2) {
  let lesen = {
    taliSaudara: {
      checked: isJenisLesenChecked(_this, tab2, 1),
      name: LesenTemporaryFCName.FidJenisLesen + "1",
      nameTarikhLulus: LesenTemporaryFCName.FidTarikhLulus + "1",
      nameDiluluskanOleh: LesenTemporaryFCName.FidDiluluskanOleh + "1",
      nameNegeriKebenaran: LesenTemporaryFCName.FidNegeriKebenaran + "1",
      valueJenis: "3",

      label: "SEK.11(6)/BORANG 01A (TALI PERSAUDARAAN)",

      tarikhLulus: _this.getFormValueByTab(tab2, LesenTemporaryFCName.FidTarikhLulus + "1"),
      diluluskanOleh: _this.getFormValueByTab(tab2, LesenTemporaryFCName.FidDiluluskanOleh + "1"),
      negeriKebenaran: _this.getFormValueByTab(tab2, LesenTemporaryFCName.FidNegeriKebenaran + "1"),

      hasilNegeri: "4411002",
      hasilJpn: "4411012",
    },
    lelaki: {
      checked: isJenisLesenChecked(_this, tab2, 2),
      name: LesenTemporaryFCName.FidJenisLesen + "2",
      nameTarikhLulus: LesenTemporaryFCName.FidTarikhLulus + "2",
      nameDiluluskanOleh: LesenTemporaryFCName.FidDiluluskanOleh + "2",
      nameNegeriKebenaran: LesenTemporaryFCName.FidNegeriKebenaran + "2",
      valueJenis: "5",

      label: "SEK.12/BORANG 01B LELAKI (18-21 TAHUN)",

      tarikhLulus: _this.getFormValueByTab(tab2, LesenTemporaryFCName.FidTarikhLulus + "2"),
      diluluskanOleh: _this.getFormValueByTab(tab2, LesenTemporaryFCName.FidDiluluskanOleh + "2"),
      negeriKebenaran: _this.getFormValueByTab(tab2, LesenTemporaryFCName.FidNegeriKebenaran + "2"),

      hasilNegeri: "4411004",
      hasilJpn: "4411014",
    },
    perempuan: {
      checked: isJenisLesenChecked(_this, tab2, 3),
      name: LesenTemporaryFCName.FidJenisLesen + "3",
      nameTarikhLulus: LesenTemporaryFCName.FidTarikhLulus + "3",
      nameDiluluskanOleh: LesenTemporaryFCName.FidDiluluskanOleh + "3",
      nameNegeriKebenaran: LesenTemporaryFCName.FidNegeriKebenaran + "3",
      valueJenis: "6",

      label: "SEK.12/BORANG 01B PEREMPUAN (18-21 TAHUN)",

      tarikhLulus: _this.getFormValueByTab(tab2, LesenTemporaryFCName.FidTarikhLulus + "3"),
      diluluskanOleh: _this.getFormValueByTab(tab2, LesenTemporaryFCName.FidDiluluskanOleh + "3"),
      negeriKebenaran: _this.getFormValueByTab(tab2, LesenTemporaryFCName.FidNegeriKebenaran + "3"),

      hasilNegeri: "4411004",
      hasilJpn: "4411014",
    },
    khas: {
      checked: isJenisLesenChecked(_this, tab2, 4),
      name: LesenTemporaryFCName.FidJenisLesen + "4",
      nameTarikhLulus: LesenTemporaryFCName.FidTarikhLulus + "4",
      nameDiluluskanOleh: LesenTemporaryFCName.FidDiluluskanOleh + "4",
      nameNegeriKebenaran: LesenTemporaryFCName.FidNegeriKebenaran + "4",
      valueJenis: "1",

      label: "SEK.21(1)/BORANG 01C (LESEN KHAS)",

      tarikhLulus: _this.getFormValueByTab(tab2, LesenTemporaryFCName.FidTarikhLulus + "4"),
      diluluskanOleh: _this.getFormValueByTab(tab2, LesenTemporaryFCName.FidDiluluskanOleh + "4"),
      negeriKebenaran: _this.getFormValueByTab(tab2, LesenTemporaryFCName.FidNegeriKebenaran + "4"),

      hasilNegeri: "4411000",
      hasilJpn: "4411010",
    },
    umur16to18: {
      checked: isJenisLesenChecked(_this, tab2, 5),
      name: LesenTemporaryFCName.FidJenisLesen + "5",
      nameTarikhLulus: LesenTemporaryFCName.FidTarikhLulus + "5",
      nameDiluluskanOleh: LesenTemporaryFCName.FidDiluluskanOleh + "5",
      nameNegeriKebenaran: LesenTemporaryFCName.FidNegeriKebenaran + "5",
      valueJenis: "2",

      label: "SEK.21(2)/BORANG 01D (16-18 TAHUN)",

      tarikhLulus: _this.getFormValueByTab(tab2, LesenTemporaryFCName.FidTarikhLulus + "5"),
      diluluskanOleh: _this.getFormValueByTab(tab2, LesenTemporaryFCName.FidDiluluskanOleh + "5"),
      negeriKebenaran: _this.getFormValueByTab(tab2, LesenTemporaryFCName.FidNegeriKebenaran + "5"),

      hasilNegeri: "4411001",
      hasilJpn: "4411011",
    },
    luarPej: {
      checked: isJenisLesenChecked(_this, tab2, 6),
      name: LesenTemporaryFCName.FidJenisLesen + "6",
      nameTarikhLulus: LesenTemporaryFCName.FidTarikhLulus + "6",
      nameDiluluskanOleh: LesenTemporaryFCName.FidDiluluskanOleh + "6",
      nameNegeriKebenaran: LesenTemporaryFCName.FidNegeriKebenaran + "6",
      valueJenis: "4",

      label: "SEK.21(3)/BORANG 01E (LUAR PEJABAT)",

      tarikhLulus: _this.getFormValueByTab(tab2, LesenTemporaryFCName.FidTarikhLulus + "6"),
      diluluskanOleh: _this.getFormValueByTab(tab2, LesenTemporaryFCName.FidDiluluskanOleh + "6"),
      negeriKebenaran: _this.getFormValueByTab(tab2, LesenTemporaryFCName.FidNegeriKebenaran + "6"),

      hasilNegeri: "4411003",
      hasilJpn: "4411013",
    }
  };

  return lesen;
}


export function getLesenCheckedStr(_this, tab2) {
  let lesen = getLesenState(_this, tab2);
  let lesenArrChecked = [];
  for (var key in lesen) {
    if (lesen[key].checked == true) {
      lesenArrChecked.push(key);
    }
  }
  return JSON.stringify(lesenArrChecked);
}


export function getLesenValArr(_this, {
  tabName,
  fieldName, // dari LesenTemporaryFCName je //LesenTemporaryFCName.FidNegeriKebenaran etc
  includeRow
}) {
  includeRow = typeof includeRow === "undefined" ? false : includeRow;

  let toRet = [];
  for (var i = 1; i <= BILANGAN_LESEN; i++) {
    let fc = fieldName + i;
    //console.log(fc, tabName, _this.getFormValueByTab(tabName, fc));
    if (!_this.isFormValueEmptyByTab(tabName, fc)) {
      let val = _this.getFormValueByTab(tabName, fc)
      if (includeRow) {
        toRet.push({
          key: getLesenKey(i),
          value: val
        });
      } else {
        toRet.push(val);
      }
    }
  }

  return toRet;
}

/**
 * Used In initializeTab for Tab Lesen
 * To Simulate State From Before
 */
export function initializeLesen(_this, {
  onChangeLesen
}) {
  for (var i = 1; i <= 6; i++) {

    // untuk cater value undefined
    let v = _this.getFormValue(LesenTemporaryFCName.FidJenisLesen + i);
    if (typeof v === "undefined") {
      _this.setFormValue(LesenTemporaryFCName.FidJenisLesen + i, []);
    }

    _this.simulateOnChange(LesenTemporaryFCName.FidJenisLesen + i, onChangeLesen);
  }
}

export function isAllLesenDisabled(_this) {
  let isAllDisabled = true;
  for (var i = 1; i <= 6; i++) {
    let vBool = _this.getFormDisabled(LesenTemporaryFCName.FidJenisLesen + i);
    if (vBool != true) {
      isAllDisabled = false;
      break;
    }
  }
  return isAllDisabled;
}


/**
 * Used in OnChange for all Lesen Field 
 * @param {*} _this 
 * @param {*} 
 * @return {negeriUpacara, isAllValid} 
 */
export function onChangeLesen(_this, {
  name,
  value,
  error,
  ref,

  //temp name
  FidJenisLesen,
  FidTarikhLulus,
  FidDiluluskanOleh,
  FidNegeriKebenaran,

  // extra
  jenisPemohon, // L,P,K   //var jenisPemohon = _this.getFormValueByTab("T341050_T1", FC.T1.pemohon);
  tarikhPermohonan, // let tPm = _this.getFormValueByTab( "T341050_T1", FC.T1.tarikhPermohonan);
  tarikhPerkahwinan, // let tPk = _this.getFormValueByTab("T341050_T7",FC.T7.tarikhPerkahwinan);
  negeriUpacara, //  var negeriUpacara = _this.getFormValueByTab( "T341050_T7", FC.T7.negeriUpacara );
  txnCode,
}) {

  txnCode = typeof txnCode === "undefined" ? _this.transactionTransCode : txnCode;

  // control isLesenAllNegeri
  // true => Ref008StateAll
  // false => Ref008State
  if (name.indexOf(FidDiluluskanOleh) >= 0) {
    let indexLesen = name.replace(FidDiluluskanOleh, "");
    if (value == "5") {
      _this.setIsLesenNegeriAll(indexLesen, true);
    } else {
      _this.setIsLesenNegeriAll(indexLesen, false);
    }
  }

  // this function will be called after alert error  emptykan value form
  const resetValueAndValidate = () => {
    _this.setFormValue(name, "");
    if (isAllLesenValid(_this)) {
      _this.setNextTabEnabled();
    } else {
      _this.setTabEnabledUpToSelf();
    }
  }

  if (["345350", "345360"].indexOf(txnCode) >= 0) {
    if (name.indexOf(FidTarikhLulus) >= 0) {
      if (OnChangeHelper.tarikhMelebihiTarikhSistem(_this, name, value, error, ref, () => {
        resetValueAndValidate();
      })) {
        return;
      }
    }
  }

  let negeriUpacaraBaru = negeriUpacara;

  // reinitialize row
  // make the other 3 disabled
  if (name.indexOf(FidJenisLesen) == 0) {
    let index = name.replace(FidJenisLesen, "");
    if (typeof value !== "undefined" && value !== null && !value[0]) {
      // reset value kalau tak di checked
      _this.setFormValue(FidTarikhLulus + index, "");
      _this.setFormValue(FidDiluluskanOleh + index, "");
      _this.setFormValue(FidNegeriKebenaran + index, "");
    }

    // by default buat sume disabled,
    // nnti validation bawah akan setelkan yg lain
    _this.setFormDisabled(FidTarikhLulus + index, true);
    _this.setFormDisabled(FidDiluluskanOleh + index, true);
    _this.setFormDisabled(FidNegeriKebenaran + index, true);
  }

  if (typeof value === "undefined" || value == null) {
    return true;
  }

  var jenisLesen1 = undefined;
  if (_this.getFormValue(FidJenisLesen + 1) != undefined) {
    jenisLesen1 = _this.getFormValue(FidJenisLesen + 1)[0];
  }
  var jenisLesen2 = undefined;
  if (_this.getFormValue(FidJenisLesen + 2) != undefined) {
    jenisLesen2 = _this.getFormValue(FidJenisLesen + 2)[0];
  }
  var jenisLesen3 = undefined;
  if (_this.getFormValue(FidJenisLesen + 3) != undefined) {
    jenisLesen3 = _this.getFormValue(FidJenisLesen + 3)[0];
  }
  var jenisLesen4 = undefined;
  if (_this.getFormValue(FidJenisLesen + 4) != undefined) {
    jenisLesen4 = _this.getFormValue(FidJenisLesen + 4)[0];
  }
  var jenisLesen5 = undefined;
  if (_this.getFormValue(FidJenisLesen + 5) != undefined) {
    jenisLesen5 = _this.getFormValue(FidJenisLesen + 5)[0];
  }
  var jenisLesen6 = undefined;
  if (_this.getFormValue(FidJenisLesen + 6) != undefined) {
    jenisLesen6 = _this.getFormValue(FidJenisLesen + 6)[0];
  }

  // Borang 01A
  if (name == FidJenisLesen + 1) {
    if (value[0]) {
      _this.setFormDisabled(FidTarikhLulus + 1, false);
      _this.setFormRequired(FidTarikhLulus + 1, true);
      _this.setFormDisabled(FidDiluluskanOleh + 1, false);
    } else {
      _this.setFormDisabled(FidTarikhLulus + 1, true);
      _this.setFormValue(FidTarikhLulus + 1, "");
      _this.setFormDisabled(FidDiluluskanOleh + 1, true);
      _this.setFormValue(FidDiluluskanOleh + 1, "");
    }
  }
  // Borang 01BL
  if (name == FidJenisLesen + 2) {
    if (value[0]) {
      if (jenisPemohon == "P") {
        _this.alertError("Pemohon Tidak Boleh Memohon Jenis Lesen Ini");
        _this.setFormDisabled(FidJenisLesen + 2, true);
        _this.setFormValue(FidJenisLesen + 2, undefined);
      }
    }
  }
  // Borang 01BP
  if (name == FidJenisLesen + 3) {
    if (value[0]) {
      if (jenisPemohon == "L") {
        _this.alertError("Pemohon Tidak Boleh Memohon Jenis Lesen Ini");
        _this.setFormDisabled(FidJenisLesen + 3, true);
        _this.setFormValue(FidJenisLesen + 3, undefined);
      } else {
        if (jenisLesen5 == undefined) { } else {
          _this.alertError(
            "Lesen JPN.KC01D dan JPN.KC01B (Perempuan) Tidak Boleh Wujud Serentak"
          );
          _this.setFormDisabled(FidJenisLesen + 3, true);
          _this.setFormValue(FidJenisLesen + 3, undefined);
        }
      }
    } else {
      _this.setFormDisabled(FidJenisLesen + 5, false);
    }
  }

  // Borang 01C
  if (name == FidJenisLesen + 4) {
    if (value[0]) {
      if (jenisPemohon == "K") {
        _this.setFormRequired(FidTarikhLulus + 4, true);
        _this.setFormDisabled(FidDiluluskanOleh + 4, false);
        _this.setFormRequired(FidNegeriKebenaran + 4, true);
        if (!_this.isFormValueEmpty(FidNegeriKebenaran + 6)) {
          _this.setFormValue(FidNegeriKebenaran + 4, _this.getFormValue(FidNegeriKebenaran + 6));
        }
      } else {
        _this.alertError("Pemohon Tidak Boleh Memohon Jenis Lesen Ini");
        _this.setFormDisabled(FidJenisLesen + 4, true);
        _this.setFormValue(FidJenisLesen + 4, undefined);
      }
    } else {
      _this.setFormDisabled(FidTarikhLulus + 4, true);
      _this.setFormValue(FidTarikhLulus + 4, "");
      _this.setFormDisabled(FidDiluluskanOleh + 4, true);
      _this.setFormValue(FidDiluluskanOleh + 4, "");
      _this.setFormDisabled(FidNegeriKebenaran + 4, true);
      _this.setFormValue(FidNegeriKebenaran + 4, "");
    }
  }
  // Borang 01D
  if (name == FidJenisLesen + 5) {
    if (value[0]) {
      if (jenisPemohon == "L") {
        _this.alertError("Pemohon Lelaki Tidak Boleh Memohon Jenis Lesen Ini");
        _this.setFormDisabled(FidJenisLesen + 5, true);
        _this.setFormValue(FidJenisLesen + 5, undefined);
        _this.setFormDisabled(FidNegeriKebenaran + 5, true);
        _this.setFormValue(FidNegeriKebenaran + 5, "");
      } else {
        if (jenisLesen3 == undefined) {
          _this.setFormDisabled(FidJenisLesen + 3, true);
          _this.setFormValue(FidJenisLesen + 3, undefined);

          _this.setFormRequired(FidTarikhLulus + 5, true);
          _this.setFormDisabled(FidDiluluskanOleh + 5, false);
          _this.setFormRequired(FidNegeriKebenaran + 5, true);
        } else {
          _this.alertError(
            "Lesen JPN.KC01D dan JPN.KC01B (Perempuan) Tidak Boleh Wujud Serentak"
          );
          _this.setFormDisabled(FidJenisLesen + 5, true);
          _this.setFormValue(FidJenisLesen + 5, undefined);
        }
      }
    } else {
      _this.setFormDisabled(FidJenisLesen + 3, false);

      _this.setFormDisabled(FidTarikhLulus + 5, true);
      _this.setFormValue(FidTarikhLulus + 5, "");
      _this.setFormDisabled(FidDiluluskanOleh + 5, true);
      _this.setFormValue(FidDiluluskanOleh + 5, "");
      _this.setFormDisabled(FidNegeriKebenaran + 5, true);
      _this.setFormValue(FidNegeriKebenaran + 5, "");
    }
  }
  // Borang 01E
  if (name == FidJenisLesen + 6) {
    if (value[0]) {
      _this.setFormRequired(FidTarikhLulus + 6, true);
      _this.setFormDisabled(FidDiluluskanOleh + 6, false);
      _this.setFormRequired(FidNegeriKebenaran + 6, true);
      if (!_this.isFormValueEmpty(FidNegeriKebenaran + 4)) {
        _this.setFormValue(FidNegeriKebenaran + 6, _this.getFormValue(FidNegeriKebenaran + 4));
      }
    } else {
      _this.setFormDisabled(FidTarikhLulus + 6, true);
      _this.setFormValue(FidTarikhLulus + 6, "");
      _this.setFormDisabled(FidDiluluskanOleh + 6, true);
      _this.setFormValue(FidDiluluskanOleh + 6, "");
      _this.setFormDisabled(FidNegeriKebenaran + 6, true);
      _this.setFormValue(FidNegeriKebenaran + 6, "");
    }
  }

  // ##########################

  if (
    name == FidTarikhLulus + 1 ||
    name == FidTarikhLulus + 4 ||
    name == FidTarikhLulus + 5 ||
    name == FidTarikhLulus + 6
  ) {
    if (value) {
      // Tarikh Cawangan
      let tCw = TimeHelper.getDateValueToday();

      // Tarikh Permohonan
      let tPm = tarikhPermohonan;

      // Tarikh Perkahwinan
      let tPk = tarikhPerkahwinan;

      // console.log("tarikhLulus >>> ", value);
      // console.log("tCw >>> ", tCw);
      // console.log("tPm >>> ", tPm);
      // console.log("tPk >>> ", tPk);

      if (TimeHelper.getDayDiff(tCw, value) > 0) {
        _this.alertError("Tarikh Melebihi Tarikh Sistem", () => {
          resetValueAndValidate();
        });
      }

      if (txnCode == '341560') {
        if (tPk) {
          if (TimeHelper.getDayDiff(tPk, value) > 0) {
            _this.alertWarning(
              "Tarikh Lulus Melebihi Tarikh Perkahwinan",
              () => {
                // resetValueAndValidate();
              }
            );
          }
        }
        if (TimeHelper.getDayDiff(tPm, value) > 0) {
          let footer = `<br><br>Tarikh Lulus - <b>${value}</b>`;
          footer += `<br>Tarikh Permohonan - <b>${tPm}</b>`;
          _this.alertWarning(
            `Tarikh Lulus Melebihi Tarikh Permohonan ${footer}`,
            () => {
              // resetValueAndValidate();
            }
          );
        }
      } else {
        if (tPk) {
          if (TimeHelper.getDayDiff(tPk, value) > 0) {
            _this.alertError(
              "Tarikh Lulus Melebihi Tarikh Perkahwinan",
              () => {
                resetValueAndValidate();
              }
            );
          }
        }
        if (TimeHelper.getDayDiff(tPm, value) > 0) {
          let footer = `<br><br>Tarikh Lulus - <b>${value}</b>`;
          footer += `<br>Tarikh Permohonan - <b>${tPm}</b>`;

          // modify by sham 30/4/2019
          if (txnCode == "343150" || txnCode == "343250" || txnCode == "343650" || txnCode == "343160" || txnCode == "343260") {
            _this.alertError(
              `Tarikh Lulus Melebihi Tarikh Permohonan ${footer}`,
              () => {
                resetValueAndValidate();
              }
            );
          } else {
            _this.alertWarning(
              `Tarikh Lulus Melebihi Tarikh Permohonan ${footer}`,
              () => {
                // resetValueAndValidate();
              }
            );
          }
        }
        _this.focusToFormField(name);
      }

    } else {
      _this.alertError("Medan Ini Mesti DiIsi");
    }
  }

  if (name == FidNegeriKebenaran + 4 ||
    name == FidNegeriKebenaran + 5 ||
    name == FidNegeriKebenaran + 6
  ) {

    let negC = _this.getFormValue(FidNegeriKebenaran + 4);
    // let negD = _this.getFormValue(FidNegeriKebenaran + 5);
    let negE = _this.getFormValue(FidNegeriKebenaran + 6);

    if (!_this.isValueEmpty(jenisLesen4) && !_this.isValueEmpty(jenisLesen6)) {
      if (negC != negE) {
        _this.alertError("Negeri Kebenaran Mesti Sama", () => {
          _this.setFormValue(name, "");
        });
      }
    }

    console.log("Negeri Upacara", value, negeriUpacaraBaru);
  }

  // ###############
  // return for onChangeLesen
  let toReturn = {
    negeriUpacara: negeriUpacaraBaru,
    isAllValid: isAllLesenValid(_this)
  };

  return toReturn;
}

export function initLesenforPerakuan(_this, lesenC, tabL, noPerakuanL, tabP, noPerakuanP) {
  let lesen = !_this.isValueEmpty(lesenC);
  let hasNoPerakuanL = !_this.isFormValueEmptyByTab(tabL, noPerakuanL);
  let hasNoPerakuanP = !_this.isFormValueEmptyByTab(tabP, noPerakuanP);
  let tabToGo = "";
  let fcToFocus = "";
  let status = true;

  if ((hasNoPerakuanL || hasNoPerakuanP) && lesen) {
    _this.alertWarning("Lesen Sek.21(1) Tidak Perlu No. Perakuan. Semak Medan No. Perakuan",
      () => {
        // _this.setFormValue(_this.FidJenisLesen + 4, "");
        // _this.setFormValue(_this.FidTarikhLulus + 4, "");
        // _this.setFormValue(_this.FidDiluluskanOleh + 4, "");
        // _this.setFormValue(_this.FidNegeriKebenaran + 4, "");
        _this.setFormDisabled(_this.FidTarikhLulus + 4, true);
        _this.setFormDisabled(_this.FidDiluluskanOleh + 4, true);
        _this.setFormDisabled(_this.FidNegeriKebenaran + 4, true);
        status = false;
      });
  }

  console.log(!lesen, !hasNoPerakuanL, !hasNoPerakuanP);
  if ((!hasNoPerakuanL || !hasNoPerakuanP) && !lesen) {
    _this.alertWarning("Pastikan No. Perakuan Lelaki/Perempuan Dimasukkan",
      () => {
        // if (!hasNoPerakuanL) {
        //   tabToGo = tabL;
        //   _this.setFormDisabledByTab(tabL, noPerakuanL, false);
        //   fcToFocus = noPerakuanL;
        // } else if (!hasNoPerakuanP) {
        //   tabToGo = tabP;
        //   _this.setFormDisabledByTab(tabP, noPerakuanP, false);
        //   fcToFocus = noPerakuanP;
        // }
        // _this.goToTab(tabToGo, fcToFocus);
        status = false;
      });
  }

  return status;
}

export function isAllLesenValid(_this) {

  // TODO
  // salah satu lesen kena checked
  let lesen = getLesenState(_this, _this.transactionCurrentTabId);
  let oneChecked = false;
  for (var i in lesen) {
    if (lesen[i].checked == true) {
      oneChecked = true;
      break;
    }
  }

  if (!oneChecked) {
    return false;
  }

  //console.log("check required");
  //console.log(JSON.parse(JSON.stringify(_this.formRequired)));
  return _this.isAllRequiredValueValid(LesenTemporaryFC);

  // let requiredArr = [];
  // for (var i = 1; i <= 6; i++) {
  //   for (var k in LesenTemporaryFCName) {
  //     let fcName = LesenTemporaryFCName[k] + i;
  //     if (_this.getFormRequired(fcName) === true) {
  //       console.log(">>", fcName);
  //       console.log(">>>>>>",_this.getFormRequired(fcName))
  //       requiredArr.push(fcName);
  //     }
  //   }
  // }

  // console.log(">>", _this.isAllValueValid(requiredArr), requiredArr);

  // return _this.isAllValueValid(requiredArr);
}

/**
 * Used in On Destroy Lesen Tab
 * To assign From Temp To Real FC to be insert or updated to Backend
 * @param {*} _this 
 * @param {*}  
 */
export function assignTempLesenToReal(_this, {
  FcLesen, // FC.T2

  //temp name
  FidJenisLesen,
  FidTarikhLulus,
  FidDiluluskanOleh,
  FidNegeriKebenaran,
}) {
  var jenisLesen = [];
  var tarikhLulus = [];
  var diluluskanOleh = [];
  var negeriKebenaran = [];

  if (
    _this.getFormValue(FidJenisLesen + 1) != undefined ||
    _this.getFormValue(FidJenisLesen + 1) == ""
  ) {
    jenisLesen[0] = _this.getFormValue(FidJenisLesen + 1)[0];
    tarikhLulus[0] = _this.getFormValue(FidTarikhLulus + 1);
    diluluskanOleh[0] = _this.getFormValue(FidDiluluskanOleh + 1);
    negeriKebenaran[0] = _this.getFormValue(FidNegeriKebenaran + 1);
    _this.setFormValue(FcLesen.jenisLesen1A, jenisLesen[0]);
    // console.log("FcLesen.jenisLesen1A >>> ", _this.getFormValue(FcLesen.jenisLesen1A));
    // jenisLesen1 = _this.getFormValue(FidJenisLesen+1)[0];
  }
  if (
    _this.getFormValue(FidJenisLesen + 2) != undefined ||
    _this.getFormValue(FidJenisLesen + 2) == ""
  ) {
    jenisLesen[1] = _this.getFormValue(FidJenisLesen + 2)[0];
    tarikhLulus[1] = _this.getFormValue(FidTarikhLulus + 2);
    diluluskanOleh[1] = _this.getFormValue(FidDiluluskanOleh + 2);
    negeriKebenaran[1] = _this.getFormValue(FidNegeriKebenaran + 2);
    _this.setFormValue(FcLesen.jenisLesen1BL, jenisLesen[1]);
    // console.log("FcLesen.jenisLesen1BL >>> ", _this.getFormValue(FcLesen.jenisLesen1BL));
    // jenisLesen2 = _this.getFormValue(FidJenisLesen+2)[0];
  }
  if (
    _this.getFormValue(FidJenisLesen + 3) != undefined ||
    _this.getFormValue(FidJenisLesen + 3) == ""
  ) {
    jenisLesen[2] = _this.getFormValue(FidJenisLesen + 3)[0];
    tarikhLulus[2] = _this.getFormValue(FidTarikhLulus + 3);
    diluluskanOleh[2] = _this.getFormValue(FidDiluluskanOleh + 3);
    negeriKebenaran[2] = _this.getFormValue(FidNegeriKebenaran + 3);
    _this.setFormValue(FcLesen.jenisLesen1BP, jenisLesen[2]);
    // console.log("FcLesen.jenisLesen1BP >>> ", _this.getFormValue(FcLesen.jenisLesen1BP));
    // jenisLesen3 = _this.getFormValue(FidJenisLesen+3)[0];
  }
  if (
    _this.getFormValue(FidJenisLesen + 4) != undefined ||
    _this.getFormValue(FidJenisLesen + 4) == ""
  ) {
    jenisLesen[3] = _this.getFormValue(FidJenisLesen + 4)[0];
    tarikhLulus[3] = _this.getFormValue(FidTarikhLulus + 4);
    diluluskanOleh[3] = _this.getFormValue(FidDiluluskanOleh + 4);
    negeriKebenaran[3] = _this.getFormValue(FidNegeriKebenaran + 4);
    _this.setFormValue(FcLesen.jenisLesen1C, jenisLesen[3]);
    // console.log("FcLesen.jenisLesen1C >>> ", _this.getFormValue(FcLesen.jenisLesen1C));
    // jenisLesen4 = _this.getFormValue(FidJenisLesen+4)[0];
  }
  if (
    _this.getFormValue(FidJenisLesen + 5) != undefined ||
    _this.getFormValue(FidJenisLesen + 5) == ""
  ) {
    jenisLesen[4] = _this.getFormValue(FidJenisLesen + 5)[0];
    tarikhLulus[4] = _this.getFormValue(FidTarikhLulus + 5);
    diluluskanOleh[4] = _this.getFormValue(FidDiluluskanOleh + 5);
    negeriKebenaran[4] = _this.getFormValue(FidNegeriKebenaran + 5);
    _this.setFormValue(FcLesen.jenisLesen1D, jenisLesen[4]);
    // console.log("FcLesen.jenisLesen1D >>> ", _this.getFormValue(FcLesen.jenisLesen1D));
    // jenisLesen5 = _this.getFormValue(FidJenisLesen+5)[0];
  }
  if (
    _this.getFormValue(FidJenisLesen + 6) != undefined ||
    _this.getFormValue(FidJenisLesen + 6) == ""
  ) {
    jenisLesen[5] = _this.getFormValue(FidJenisLesen + 6)[0];
    tarikhLulus[5] = _this.getFormValue(FidTarikhLulus + 6);
    diluluskanOleh[5] = _this.getFormValue(FidDiluluskanOleh + 6);
    negeriKebenaran[5] = _this.getFormValue(FidNegeriKebenaran + 6);
    _this.setFormValue(FcLesen.jenisLesen1E, jenisLesen[5]);
    // console.log("FcLesen.jenisLesen1E >>> ", _this.getFormValue(FcLesen.jenisLesen1E));
    // jenisLesen6 = _this.getFormValue(FidJenisLesen+6)[0];
  }

  _this.setFormValue(FcLesen.jenisLesen1, "");
  _this.setFormValue(FcLesen.jenisLesen2, "");
  _this.setFormValue(FcLesen.jenisLesen3, "");
  _this.setFormValue(FcLesen.jenisLesen4, "");
  _this.setFormValue(FcLesen.jenisLesen5, "");

  for (var i = 0; i < jenisLesen.length; i++) {
    // console.log("jenisLesen"+(i+1)+" >>> ",jenisLesen[i]);
    if (jenisLesen[i] != undefined || jenisLesen[i] == "") {
      if (
        _this.getFormValue(FcLesen.jenisLesen1) == undefined ||
        _this.getFormValue(FcLesen.jenisLesen1) == ""
      ) {
        _this.setFormValue(FcLesen.jenisLesen1, jenisLesen[i]);
        _this.setFormValue(FcLesen.tarikhLulus1, tarikhLulus[i]);
        _this.setFormValue(FcLesen.diluluskan1, diluluskanOleh[i]);
        _this.setFormValue(FcLesen.negeriKebenaran1, negeriKebenaran[i]);
      } else {
        if (
          _this.getFormValue(FcLesen.jenisLesen2) == undefined ||
          _this.getFormValue(FcLesen.jenisLesen2) == ""
        ) {
          _this.setFormValue(FcLesen.jenisLesen2, jenisLesen[i]);
          _this.setFormValue(FcLesen.tarikhLulus2, tarikhLulus[i]);
          _this.setFormValue(FcLesen.diluluskan2, diluluskanOleh[i]);
          _this.setFormValue(FcLesen.negeriKebenaran2, negeriKebenaran[i]);
        } else {
          if (
            _this.getFormValue(FcLesen.jenisLesen3) == undefined ||
            _this.getFormValue(FcLesen.jenisLesen3) == ""
          ) {
            _this.setFormValue(FcLesen.jenisLesen3, jenisLesen[i]);
            _this.setFormValue(FcLesen.tarikhLulus3, tarikhLulus[i]);
            _this.setFormValue(FcLesen.diluluskan3, diluluskanOleh[i]);
            _this.setFormValue(FcLesen.negeriKebenaran3, negeriKebenaran[i]);
          } else {
            if (
              _this.getFormValue(FcLesen.jenisLesen4) == undefined ||
              _this.getFormValue(FcLesen.jenisLesen4) == ""
            ) {
              _this.setFormValue(FcLesen.jenisLesen4, jenisLesen[i]);
              _this.setFormValue(FcLesen.tarikhLulus4, tarikhLulus[i]);
              _this.setFormValue(FcLesen.diluluskan4, diluluskanOleh[i]);
              _this.setFormValue(FcLesen.negeriKebenaran4, negeriKebenaran[i]);
            } else {
              if (
                _this.getFormValue(FcLesen.jenisLesen5) == undefined ||
                _this.getFormValue(FcLesen.jenisLesen5) == ""
              ) {
                _this.setFormValue(FcLesen.jenisLesen5, jenisLesen[i]);
                _this.setFormValue(FcLesen.tarikhLulus5, tarikhLulus[i]);
                _this.setFormValue(FcLesen.diluluskan5, diluluskanOleh[i]);
                _this.setFormValue(FcLesen.negeriKebenaran5, negeriKebenaran[i]);
              }
            }
          }
        }
      }
    }
  }
  var j = _this.getFormDataForJournal();
  console.log("journal", j)
}



/**
 * 
 * @param {*} _this 
 * @param {*} param1 
 * @return false kalau TAKDE masalah
 * @return true kalau ADA masalah
 */
export function tarikhTibaOnChange(_this, {
  name,
  value,
  error,
  ref,

  tab1,
  T1_jenisPerkahwinan,
  T1_tarikhPermohonan,

  tab2,
  alertHandler

}) {

  if (value == null || value == "") {
    return;
  }

  if (OnChangeHelper.tarikhMelebihiTarikhSistem(_this, name, value, error, ref, alertHandler)) {
    return;
  }
  const TEMPOH_SAH_LAKU = 7;
  const ERR_SAH_LAKU_MESSAGE = "Tarikh Tiba Di Malaysia Kurang Dari <b>Tempoh Sah Laku</b> Menetap Di Malaysia"

  let err = null;
  let jenisK = _this.getFormValueByTab(tab1, T1_jenisPerkahwinan);
  let tarikhMohon = _this.getFormValueByTab(tab1, T1_tarikhPermohonan);
  let hasErrSahLaku = TimeHelper.isDatePeriodDayTrue(value, tarikhMohon, TEMPOH_SAH_LAKU);

  // lebih tarikh permohonan
  if (TimeHelper.isDateBigger(value, tarikhMohon) || tarikhMohon == value) {
    err = "Tarikh Tiba Di Malaysia <b>Tidak Boleh Lebih Daripada Tarikh Permohonan</b>";
  } else {
    // tanpa lesen
    if (jenisK == "T") {
      if (hasErrSahLaku) {
        err = ERR_SAH_LAKU_MESSAGE;
      }
    }
    // dengan lesen
    else if (jenisK == "L") {
      // Jika medan “SEK.21(1)/BORANG 01C (LESEN KHAS)” TIDAK ditanda
      if (!isJenisLesenChecked(_this, tab2, 4)) {
        if (hasErrSahLaku) {
          err = ERR_SAH_LAKU_MESSAGE;
        }
      }
    }
  }

  console.log("err", err)
  return OnChangeHelper.displayErrorAndFocus(_this, name, err, ref, alertHandler);
}


// #######################################################################
// Global Inquiry

// skc parameter
// TODO - Moon

// Validasi capaian rekod ke pangkalan data TWTR_WEB_TXN dan TWJR_WEB_JOURNAL
export function inquiryJournal(_this, {
  noPermohonan,
  txnCode,
  txnCodeInq_1,
  txnCodeInq_2,
  txnCodeInq_3,
  txnCodeInq_4,
  txnCodeInq_5,
  overrideUseMockData,
  mockData,
  success,
  error
}) {

  let txnCodeReal = _this.transactionTransCode;
  let noPer = FormatHelper.noPermohonanToDb(
    _this.getFormValue(noPermohonan)
  );

  let param = {
    InWsInputJournalSkc: {
      NoPermohonan: noPer,
      KodUrusniagaDerived: txnCode,
      KodUrusniagaReal: txnCodeReal,
      KodUrusniagaInq1: txnCodeInq_1,
      KodUrusniagaInq2: txnCodeInq_2,
      KodUrusniagaInq3: txnCodeInq_3,
      KodUrusniagaInq4: txnCodeInq_4,
      KodUrusniagaInq5: txnCodeInq_5,
    }
  };

  ApiHelper.soapRequest({
    overrideUseMockData: overrideUseMockData,
    mockData: mockData,
    //webService: IsUseWas ? "" : "SoapSkcJournal",
    //method: "SkcIjournalDb2",
    webService: IsUseWas ? "JOURNAL2/IJOURNAL2_INQ" : "SoapJournalInq",
    method: "Ijournal2Inq",
    param: param,
    responseEntity: ["OutTwjrWebJournal"],
    success: success,
    error: error
  });
}

export function updateTwtr(_this, {
  noPermohonan, // value from get
  confirmInd,
  paymentInd,
  inquiryInd,
  overrideUseMockData,
  mockData,
  success,
  error,
}) {
  let noPer = FormatHelper.noPermohonanToDb(noPermohonan);

  let txnCodeReal = _this.transactionTransCode;
  let lastTwo = txnCodeReal.substring(txnCodeReal.length - 2);

  let isForBayaran = "";
  let isForConfirm = "";

  //34xx60
  if (lastTwo == "60") {
    isForConfirm = "1";
  }

  //34xx00 & 34xx08
  if (lastTwo == "00" || lastTwo == "08") {
    isForBayaran = "1";
  }

  if (isForBayaran == "" && isForConfirm == "") {
    console.log("RETURN FROM updateTwtr")
    return;
  }

  let unixNow = TimeHelper.getUnixTimestampNow();
  let updDt = TimeHelper.getDateTimeForSoap(unixNow);
  let updUid = _this.authUser.OPER_ID

  let param = {
    InIndBayaranWsGeneral: {
      Char1: isForBayaran
    },
    InIndPengesahanWsGeneral: {
      Char1: isForConfirm
    },
    InTwtrWebTxn: {
      WtrPymtInd: paymentInd,
      WtrConfInd: confirmInd,
      WtrInqInd: inquiryInd,
      WtrUpdUid: updUid,
      WtrUpdDt: updDt,
    },
    // InWsSkc: {
    //   Fid1001NoPermohonanUrusniaga: noPer,
    //   KodUrusniagaSemasa: txnCode
    // }
  };

  ApiHelper.soapRequest({
    overrideUseMockData: overrideUseMockData,
    mockData: mockData,
    webService: IsUseWas ? "" : "SoapJournalTwtrUpd",
    method: "UjournaltwtrUpdate",
    param: param,
    responseEntity: [],
    success: success,
    error: error
  });
}

// #######################################################
// IN 
// backendData -> {
//   outWsName : [{}]
// }
//
// OUT 
// backendData -> {
//   outWsName : [{kptFc:"",noDokFc:"",....}]
// }
export function fixBEDataKunciCarian(_this, {
  kunciCarian,
  backendData,
  outWsName
}) {
  for (var i in kunciCarian) {
    let kcObj = kunciCarian[i];
    for (var k in kcObj) {
      if (k == "type") {
        continue;
      }

      let fc = kcObj[k];
      if (!_this.isFormValueEmpty(fc)) {
        backendData[outWsName][0][fc.name] = _this.getFormValue(fc);
      }
    }
  }

  return backendData;
}


export function fixBEDataIfEmpty(_this, {
  fc,
  value,
  backendData,
  outWsName
}) {
  try {
    if (typeof backendData[outWsName][0][fc.name] == "undefined" || backendData[outWsName][0][fc.name] == "") {
      backendData[outWsName][0][fc.name] = value;
    }
  } catch (err) {
    console.error("[SKC Helper fixBEDataIfEmpty]", err);
  }

  return backendData
}

// Validation SEMAKAN NAMES
export function initSemakanNAMES(_this, tabKunciCarian, kc_kpt, kc_noDok, kc_jenisDok,
  semakanNAMES, tarikhNAMES, indSarawak, tarikhLulus, txnCode) {

  let toRequired = [];
  let hasKpt = !_this.isFormValueEmptyByTab(tabKunciCarian, kc_kpt);
  let hasNoDok = !_this.isFormValueEmptyByTab(tabKunciCarian, kc_noDok);
  let valJenisDok = _this.getFormValueByTab(tabKunciCarian, kc_jenisDok);
  let valIndSwk = _this.getFormValue(indSarawak);

  console.log("initSemakanNAMES >> ", hasKpt, hasNoDok, valIndSwk);

  _this.setFormDisabled(semakanNAMES, true);
  _this.setFormDisabled(tarikhNAMES, true);
  _this.setFormDisabled(tarikhLulus, true);

  if (hasKpt || (hasNoDok && DokumenMalaysia.indexOf(valJenisDok) >= 0)) {
    if (valIndSwk == "K") {
      toRequired.push(semakanNAMES, tarikhNAMES);
      _this.setFormRequired(semakanNAMES, true);
      _this.setFormRequired(tarikhNAMES, true);
      if (txnCode == "60") {
        if (!_this.isFormValueEmpty(tarikhNAMES)) {
          _this.setFormRequired(tarikhLulus, true);
          toRequired.push(tarikhLulus);
        }
      }
      _this.setFormValue(semakanNAMES, "1");
    } else {
      _this.setFormValue(semakanNAMES, "0");
    }
  }

  return toRequired;
}

// ##################################################
// Tarikh Panggilan
const ListValueTarikhKehadiran = "ListValueTarikhKehadiran";
export function onChangeTarikhKehadiran(_this, name, value, err, ref, {
  fc_jumlahPanggilan
}) {
  _this.onChange(name, value, err, ref);

  if (value == null) {
    return;
  }

  console.log("onChangeTarikhKehadiran");
  console.log(name);
  let currentJumlahPanggilan = _this.getFormValue(fc_jumlahPanggilan);
  if (isNaN(currentJumlahPanggilan)) {
    currentJumlahPanggilan = 0;
  }

  let listValue = _this.getFormValue(ListValueTarikhKehadiran);
  if (typeof listValue !== "string") {
    listValue = "";
  }

  if (_this.isFormValueValid(name)) {
    if (listValue.indexOf(name) <= -1) { // untuk cek field id ada ke tak ListValueTarikhKehadiran
      currentJumlahPanggilan++;
      listValue += name;
    }
  } else {
    if (listValue.indexOf(name) >= 0) { // untuk cek field id ada ke tak ListValueTarikhKehadiran
      currentJumlahPanggilan--;
      listValue = listValue.replaceAll(name, "");
    }
  }

  _this.setFormValue(fc_jumlahPanggilan, currentJumlahPanggilan);
  _this.setFormValue(ListValueTarikhKehadiran, listValue);
}

// ##################################################
// Kehadiran [Hadir atau Tidak hadir]
const ListValueKehadiran = "ListValueKehadiran";
const ListValueKehadiranTidak = "ListValueKehadiranTidak";
export function onChangeKehadiran(_this, name, value, err, ref, {
  fc_jumlahKehadiran,
  fc_jumlahKehadiranTidak
}) {
  _this.onChange(name, value, err, ref);

  if (value == null) {
    return;
  }

  console.log("onChangeKehadiran");
  console.log(name);
  let currentJumlahKehadiran = _this.getFormValue(fc_jumlahKehadiran);
  let currentJumlahKehadiranTidak = _this.getFormValue(fc_jumlahKehadiranTidak);

  if (isNaN(currentJumlahKehadiran)) {

    currentJumlahKehadiran = 0;
    currentJumlahKehadiranTidak = 0;
  }

  let listValueY = _this.getFormValue(ListValueKehadiran);
  let listValueT = _this.getFormValue(ListValueKehadiranTidak);
  if (typeof listValueY !== "string") {
    listValueY = "";
    listValueT = "";
  }

  if (value == 'T') {
    if (_this.isFormValueValid(name)) {

      if (listValueT.indexOf(name) <= -1) { // untuk cek field id ada ke tak ListValueKehadiran

        currentJumlahKehadiranTidak++;
        listValueT += name;


      }
      if (listValueY.indexOf(name) >= 0) { // untuk cek field id ada ke tak ListValueKehadiran

        currentJumlahKehadiran--;
        listValueY = listValueY.replaceAll(name, "");


      }

    }

  } else {
    if (listValueT.indexOf(name) >= 0) { // untuk cek field id ada ke tak ListValueKehadiran


      currentJumlahKehadiranTidak--;
      listValueT = listValueT.replaceAll(name, "");


    }
    if (listValueY.indexOf(name) <= -1) { // untuk cek field id ada ke tak ListValueKehadiran
      currentJumlahKehadiran++;
      listValueY += name;

    }

  }


  _this.setFormValue(fc_jumlahKehadiran, currentJumlahKehadiran, fc_jumlahKehadiranTidak, currentJumlahKehadiranTidak);
  _this.setFormValue(ListValueKehadiran, listValueY, ListValueKehadiranTidak, listValueT);
  _this.setFormValue(fc_jumlahKehadiranTidak, currentJumlahKehadiranTidak);
  _this.setFormValue(ListValueKehadiranTidak, listValueT);
}



export function TarikhPangilanFcName(type) {

  const crtFid = (fid, fidName) => {
    return `Fid${fid}${fidName}`;
  }

  var isLelaki = type == Type.LELAKI;

  return {
    //Sistem row 1
    sistem_bil_1: {
      name: "sistem_bil_1",
    },
    sistem_trkh_pangilan_1: {
      name: crtFid(isLelaki ? "6285" : "5865", "SistemPanggilan"),
      len: 10,
      formatType: FormatType.DATE,
    },
    sistem_kehadiran_1: {
      name: crtFid(isLelaki ? "1623" : "1635", "SistemKehadiran"),
      len: 1
    },

    //Sistem row 2
    sistem_bil_2: {
      name: "sistem_bil_2",
    },
    sistem_trkh_pangilan_2: {
      name: crtFid(isLelaki ? "6287" : "5867", "SistemPanggilan"),
      len: 10,
      formatType: FormatType.DATE,
    },
    sistem_kehadiran_2: {
      name: crtFid(isLelaki ? "1625" : "1637", "SistemKehadiran"),
      len: 1
    },

    //Sistem row 3
    sistem_bil_3: {
      name: "sistem_bil_3",
    },
    sistem_trkh_pangilan_3: {
      name: crtFid(isLelaki ? "6289" : "1449", "SistemPanggilan"),
      len: 10,
      formatType: FormatType.DATE,
    },
    sistem_kehadiran_3: {
      name: crtFid(isLelaki ? "1627" : "1639", "SistemKehadiran"),
      len: 1
    },

    //Sistem row 4
    sistem_bil_4: {
      name: "sistem_bil_4",
    },
    sistem_trkh_pangilan_4: {
      name: crtFid(isLelaki ? "1343" : "1465", "SistemPanggilan"),
      len: 10,
      formatType: FormatType.DATE,
    },
    sistem_kehadiran_4: {
      name: crtFid(isLelaki ? "1629" : "1641", "SistemKehadiran"),
      len: 1
    },

    //Sistem row 5
    sistem_bil_5: {
      name: "sistem_bil_5",
    },
    sistem_trkh_pangilan_5: {
      name: crtFid(isLelaki ? "1353" : "1483", "SistemPanggilan"),
      len: 10,
      formatType: FormatType.DATE,
    },
    sistem_kehadiran_5: {
      name: crtFid(isLelaki ? "1631" : "1643", "SistemKehadiran"),
      len: 1
    },

    //Sistem row 6
    sistem_bil_6: {
      name: "sistem_bil_6",
    },
    sistem_trkh_pangilan_6: {
      name: crtFid(isLelaki ? "1367" : "1487", "SistemPanggilan"),
      len: 10,
      formatType: FormatType.DATE,
    },
    sistem_kehadiran_6: {
      name: crtFid(isLelaki ? "1633" : "1645", "SistemKehadiran"),
      len: 1
    },

    //////////////////////////////////////////

    //Sebenar row 1
    sebenar_bil_1: {
      name: "sebenar_bil_1",
    },
    sebenar_trkh_pangilan_1: {
      name: crtFid(isLelaki ? "7731" : "7737", "SebenarPanggilan"),
      len: 10,
      formatType: FormatType.DATE,
    },
    sebenar_kehadiran_1: {
      name: crtFid(isLelaki ? "7967" : "7979", "SebenarKehadiran"),
      len: 1
    },

    //Sebenar row 2
    sebenar_bil_2: {
      name: "sebenar_bil_2",
    },
    sebenar_trkh_pangilan_2: {
      name: crtFid(isLelaki ? "2345" : "7739", "SebenarPanggilan"),
      len: 10,
      formatType: FormatType.DATE,
    },
    sebenar_kehadiran_2: {
      name: crtFid(isLelaki ? "7969" : "7981", "SebenarKehadiran"),
      len: 1
    },

    //Sebenar row 3
    sebenar_bil_3: {
      name: "sebenar_bil_3",
    },
    sebenar_trkh_pangilan_3: {
      name: crtFid(isLelaki ? "1371" : "1527", "SebenarPanggilan"),
      len: 10,
      formatType: FormatType.DATE,
    },
    sebenar_kehadiran_3: {
      name: crtFid(isLelaki ? "7971" : "7983", "SebenarKehadiran"),
      len: 1
    },

    //Sebenar row 4
    sebenar_bil_4: {
      name: "sebenar_bil_4",
    },
    sebenar_trkh_pangilan_4: {
      name: crtFid(isLelaki ? "1383" : "1549", "SebenarPanggilan"),
      len: 10,
      formatType: FormatType.DATE,
    },
    sebenar_kehadiran_4: {
      name: crtFid(isLelaki ? "7973" : "7985", "SebenarKehadiran"),
      len: 1
    },

    //Sebenar row 5
    sebenar_bil_5: {
      name: "sebenar_bil_5",
    },
    sebenar_trkh_pangilan_5: {
      name: crtFid(isLelaki ? "1427" : "1551", "SebenarPanggilan"),
      len: 10,
      formatType: FormatType.DATE,
    },
    sebenar_kehadiran_5: {
      name: crtFid(isLelaki ? "7975" : "7987", "SebenarKehadiran"),
      len: 1
    },

    //Sebenar row 6
    sebenar_bil_6: {
      name: "sebenar_bil_6",
    },
    sebenar_trkh_pangilan_6: {
      name: crtFid(isLelaki ? "7733" : "1559", "SebenarPanggilan"),
      len: 10,
      formatType: FormatType.DATE,
    },
    sebenar_kehadiran_6: {
      name: crtFid(isLelaki ? "7977" : "7989", "SebenarKehadiran"),
      len: 1
    },


  }
}

// ##################################################
// Tribunal Jenis Dokumen & Negara Pengeluar

export function initMaklumatTribunalSebenar(_this, {
  type,
  kpt,
  noDok,
  jenisDok,
  negaraPeng,
  kpt_map,
  noDok_map,
  jenisDok_map,
  negaraPeng_map,
  isRequired
}, { onChange }) {

  // 1. copy value over from sistem
  let fcMap = [
    { from: kpt_map, to: kpt },
    { from: noDok_map, to: noDok },
    { from: jenisDok_map, to: jenisDok },
    { from: negaraPeng_map, to: negaraPeng },
  ];
  for (var i in fcMap) {
    let sistemVal = _this.getFormValue(fcMap[i].from);
    _this.setFormValue(fcMap[i].to, sistemVal);
  }

  // 2. simulate to get the correct state
  initSimulateKunciCarian(_this, {
    kCarian: {
      type: type,
      kpt: kpt,
      noDok: noDok,
      jenisDok: jenisDok,
      negaraPeng: negaraPeng,
    },
    onChange: onChange,
    isRequired: isRequired
  })
}

export function TribunalDokumenPengeluarFcName(customName) {

  return {

    //Sistem row 1
    sistem_bil_1: {
      name: "sistem_bil_1",
    },
    sistem_kpt_1: {
      name: "Fid5519SistemKpt",
      len: 12
    },
    sistem_doc_lain_1: {
      name: "Fid8047SistemDocLain",
      len: 25
    },
    sistem_jenis_doc_1: {
      name: "Fid8043SistemJeniDoc",
      len: 2
    },
    sistem_neg_pgeluar_1: {
      name: "Fid4827SistemNegPengeluar",
      len: 2
    },
    sistem_nama_ahli_1: {
      name: "Fid4641SistemNamaAhli",
      len: 50
    },

    //Sistem row 2
    sistem_bil_2: {
      name: "sistem_bil_2",
    },
    sistem_kpt_2: {
      name: "Fid5811SistemKpt",
      len: 12
    },
    sistem_doc_lain_2: {
      name: "Fid8085SistemDocLain",
      len: 25
    },
    sistem_jenis_doc_2: {
      name: "Fid8081SistemJeniDoc",
      len: 2
    },
    sistem_neg_pgeluar_2: {
      name: "Fid4828SistemNegPengeluar",
      len: 2
    },
    sistem_nama_ahli_2: {
      name: "Fid5163SistemNamaAhli",
      len: 50
    },

    //Sistem row 3
    sistem_bil_3: {
      name: "sistem_bil_3",
    },
    sistem_kpt_3: {
      name: "Fid6365SistemKpt",
      len: 12
    },
    sistem_doc_lain_3: {
      name: "Fid1059SistemDocLain",
      len: 25
    },
    sistem_jenis_doc_3: {
      name: "Fid1055SistemJeniDoc",
      len: 2
    },
    sistem_neg_pgeluar_3: {
      name: "Fid4319SistemNegPengeluar",
      len: 2
    },
    sistem_nama_ahli_3: {
      name: "Fid5271SistemNamaAhli",
      len: 50
    },

    //Sistem row 4
    sistem_bil_4: {
      name: "sistem_bil_4",
    },
    sistem_kpt_4: {
      name: "Fid7825SistemKpt",
      len: 12
    },
    sistem_doc_lain_4: {
      name: "Fid1081SistemDocLain",
      len: 25
    },
    sistem_jenis_doc_4: {
      name: "Fid1077SistemJeniDoc",
      len: 2
    },
    sistem_neg_pgeluar_4: {
      name: "Fid4320SistemNegPengeluar",
      len: 2
    },
    sistem_nama_ahli_4: {
      name: "Fid5465SistemNamaAhli",
      len: 50
    },

    //Sistem row 5
    sistem_bil_5: {
      name: "sistem_bil_5",
    },
    sistem_kpt_5: {
      name: "Fid1185SistemKpt",
      len: 12
    },
    sistem_doc_lain_5: {
      name: "Fid1191SistemDocLain",
      len: 25
    },
    sistem_jenis_doc_5: {
      name: "Fid1187SistemJeniDoc",
      len: 2
    },
    sistem_neg_pgeluar_5: {
      name: "Fid4323SistemNegPengeluar",
      len: 2
    },
    sistem_nama_ahli_5: {
      name: "Fid1203SistemNamaAhli",
      len: 50
    },




    //////////////////////////////////////////

    //sebenar row 1
    sebenar_bil_1: {
      name: "sebenar_bil_1",
      len: 1
    },
    sebenar_kpt_1: {
      name: "Fid1053SebenarKpt",
      len: 12
    },
    sebenar_doc_lain_1: {
      name: "Fid3019SebenarDocLain",
      len: 25
    },
    sebenar_jenis_doc_1: {
      name: "Fid2197SebenarJeniDoc",
      len: 2
    },
    sebenar_neg_pgeluar_1: {
      name: "Fid4324SebenarNegPengeluar",
      len: 2
    },
    sebenar_nama_ahli_1: {
      name: "Fid1072SebenarNamaAhli",
      len: 50
    },

    //sebenar row 2
    sebenar_bil_2: {
      name: "sebenar_bil_2",
      len: 1
    },
    sebenar_kpt_2: {
      name: "Fid1075SebenarKpt",
      len: 12
    },
    sebenar_doc_lain_2: {
      name: "Fid2357SebenarDocLain",
      len: 25
    },
    sebenar_jenis_doc_2: {
      name: "Fid1921SebenarJeniDoc",
      len: 2
    },
    sebenar_neg_pgeluar_2: {
      name: "Fid4327SebenarNegPengeluar",
      len: 2
    },
    sebenar_nama_ahli_2: {
      name: "Fid109Sebenar4NamaAhli",
      len: 50
    },

    //sebenar row 3
    sebenar_bil_3: {
      name: "sebenar_bil_3",
      len: 1
    },
    sebenar_kpt_3: {
      name: "Fid1143SebenarKpt",
      len: 12
    },
    sebenar_doc_lain_3: {
      name: "Fid1149SebenarDocLain",
      len: 25
    },
    sebenar_jenis_doc_3: {
      name: "Fid1145SebenarJeniDoc",
      len: 2
    },
    sebenar_neg_pgeluar_3: {
      name: "Fid4328SebenarNegPengeluar",
      len: 2
    },
    sebenar_nama_ahli_3: {
      name: "Fid1162SebenarNamaAhli",
      len: 50
    },

    //sebenar row 4
    sebenar_bil_4: {
      name: "sebenar_bil_4",
      len: 1
    },
    sebenar_kpt_4: {
      name: "Fid1381SebenarKpt",
      len: 12
    },
    sebenar_doc_lain_4: {
      name: "Fid2201SebenarDocLain",
      len: 25
    },
    sebenar_jenis_doc_4: {
      name: "Fid2005SebenarJeniDoc",
      len: 2
    },
    sebenar_neg_pgeluar_4: {
      name: "Fid4331SebenarNegPengeluar",
      len: 2
    },
    sebenar_nama_ahli_4: {
      name: "Fid2388SebenarNamaAhli",
      len: 50
    },

    //sebenar row 5
    sebenar_bil_5: {
      name: "sebenar_bil_5",
      len: 1
    },
    sebenar_kpt_5: {
      name: "Fid1303SebenarKpt",
      len: 12
    },
    sebenar_doc_lain_5: {
      name: "Fid1247SebenarDocLain",
      len: 25
    },
    sebenar_jenis_doc_5: {
      name: "Fid1307SebenarJeniDoc",
      len: 2
    },
    sebenar_neg_pgeluar_5: {
      name: "Fid4332SebenarNegPengeluar",
      len: 2
    },
    sebenar_nama_ahli_5: {
      name: "Fid1322SebenarNamaAhli",
      len: 50
    },

  }
}

// ##################################################
// Masalah Perkahwinan Tribunal
export function MasalahPerkahwinanFcName(customName) {

  return {
    //sistem row 1
    sistem_bil_1: {
      name: "sistem_bil_1",
      len: 1
    },

    sistem_mslh_prkhwin_1: {
      name: "Fid7901SistemMslhPrkhwin",
      len: 2
    },

    //sistem row 2
    sistem_bil_2: {
      name: "sistem_bil_2",
      len: 1
    },

    sistem_mslh_prkhwin_2: {
      name: "Fid7905SistemMslhPrkhwin",
      len: 2
    },
    //sistem row 3
    sistem_bil_3: {
      name: "sistem_bil_3",
      len: 1
    },

    sistem_mslh_prkhwin_3: {
      name: "Fid7909SistemMslhPrkhwin",
      len: 2
    },
    //sistem row 4
    sistem_bil_4: {
      name: "sistem_bil_4",
      len: 1
    },

    sistem_mslh_prkhwin_4: {
      name: "Fid7913SistemMslhPrkhwin",
      len: 2
    },
    //sistem row 5
    sistem_bil_5: {
      name: "sistem_bil_5",
      len: 1
    },

    sistem_mslh_prkhwin_5: {
      name: "Fid7917SistemMslhPrkhwin",
      len: 2
    },

    ///////////////////////////////////////////////////////

    //sebenar row 1

    sebenar_bil_1: {
      name: "sebenar_bil_1",
      len: 1
    },

    sebenar_mslh_prkhwin_1: {
      name: "Fid7933SebenarMslhPrkhwin",
      len: 2
    },

    //sebenar row 2
    sebenar_bil_2: {
      name: "sebenar_bil_2",
      len: 1
    },

    sebenar_mslh_prkhwin_2: {
      name: "Fid7939SebenarMslhPrkhwin",
      len: 2
    },
    //sebenar row 3
    sebenar_bil_3: {
      name: "sebenar_bil_3",
      len: 1
    },

    sebenar_mslh_prkhwin_3: {
      name: "Fid7943SebenarMslhPrkhwin",
      len: 2
    },
    //sebenar row 4
    sebenar_bil_4: {
      name: "sebenar_bil_4",
      len: 1
    },

    sebenar_mslh_prkhwin_4: {
      name: "Fid7947SebenarMslhPrkhwin",
      len: 2
    },
    //sebenar row 5
    sebenar_bil_5: {
      name: "sebenar_bil_5",
      len: 1
    },

    sebenar_mslh_prkhwin_5: {
      name: "Fid7951SebenarMslhPrkhwin",
      len: 2
    },
  }
}
