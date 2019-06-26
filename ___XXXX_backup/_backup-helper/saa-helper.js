import * as UtilHelper from './util-helper';
import * as ApiHelper from './api-helper';
import * as TimeHelper from "./time-helper";

import {
  IsUseWas,
  IsMyKidEnable,
  IsEnableNamaTetuan
} from "../config/app-config";

import {
  DokumenMalaysia,
  DokumenPassport,
  PanggilanTetuan,
  HubunganPeguamCode,
  HubunganIbuAngkatCode,
  HubunganBapaAngkatCode,
  HubunganIbuDeFacto,
  HubunganBapaDeFacto,
  JenisPengangkatan
} from "../config/trans-config";

// end of import
// ##########################################################################

export function isDefacto(_this, {
  tabName,
  fc_jenisPengangkatan
}) {
  let val = "";
  if (typeof tabName === "undefined") {
    val = _this.getFormValue(fc_jenisPengangkatan);
  } else {
    val = _this.getFormValueByTab(tabName, fc_jenisPengangkatan);
  }
  //console.log("val",val);
  if (val == JenisPengangkatan.DE_FACTO) {
    return true;
  } else if (val == JenisPengangkatan.MAHKAMAH) {
    return false;
  }

  return undefined;
}

export function fixPassportHolder(_this, {
  jenisDoc,
  tarafPenduduk,
  tarafWarganegara,
  valueTarafPenduduk,
  valueTarafWarganegara,
}) {

  valueTarafPenduduk = typeof valueTarafPenduduk === "undefined" ? "X" : valueTarafPenduduk;
  valueTarafWarganegara = typeof valueTarafWarganegara === "undefined" ? "0" : valueTarafWarganegara;

  // FIX FOR PASSPORT HOLDER -- SIT
  if (_this.getFormValue(jenisDoc) == DokumenPassport) {
    _this.setFormValue(tarafPenduduk, valueTarafPenduduk);
    _this.setFormValue(tarafWarganegara, valueTarafWarganegara);
    _this.setFormDisabled(tarafPenduduk, true);
    _this.setFormDisabled(tarafWarganegara, true);
  }
}

export function pendaftaranInitUmur(_this, {
  tab1,
  T1_tarikhMohon,

  // current tab
  umur,
  tarikhLahir
}) {
  let v_tarikhMohon = _this.getFormValueByTab(tab1, T1_tarikhMohon);
  let v_tarikhLahir = _this.getFormValue(tarikhLahir);
  // console.log("v_tarikhMohon", v_tarikhMohon);
  // console.log("v_tarikhLahir", v_tarikhLahir);

  /// masa init jangan ubah
  if (v_tarikhLahir == null) {
    return;
  }

  let v_umur = UtilHelper.getAge(v_tarikhLahir, v_tarikhMohon);
  // console.log("v_umur", v_umur);
  if (!isNaN(v_umur) && v_umur > 0) {
    _this.setFormValue(umur, v_umur);
  } else {
    if (isNaN(v_umur)) {
      _this.setFormValue(umur, "");
    } else {
      _this.setFormValue(umur, "0");
    }
  }
}

// UAT - 70 -- global 
// used in 2050, 2060, 2070
export function validateIbuBapaAngkat(_this, {
  kpt,
  kpp,
  noDok,
  fcArr,
  fcArrStart,
  fcArrEnd
}) {
  let kunciCarianExist = _this.isFormValueValid(kpt) ||
    _this.isFormValueValid(kpp) || _this.isFormValueValid(noDok);

  if (!kunciCarianExist) {
    _this.doFromFcToFc(fcArr, fcArrStart, fcArrEnd, (fc) => {
      _this.setFormDisabled(fc, true);
      _this.setFormValue(fc, null);
    })
  }

  return kunciCarianExist;
}

// ##########################################################################
// MEMOHON MY KID PUNYA VALIDASI

export function onClickSemakMemohonMyKid(_this, {
  fc_isValidMemohonMyKid,
  fc_kptKanak2,
  tab_kptKanak2,
  finishHandler
}) {
  console.log("onClickSemakMemohonMyKid");

  const finishLoad = (isValid) => {
    if (isValid) {
      _this.setFormValue(fc_isValidMemohonMyKid, true);
    } else {
      _this.setFormValue(fc_isValidMemohonMyKid, false);
    }

    finishHandler();
  }


  let kptKanak = "";
  if (typeof tab_kptKanak2 === "string") {
    kptKanak = _this.getFormValueByTab(tab_kptKanak2, fc_kptKanak2)
  } else {
    kptKanak = _this.getFormValue(fc_kptKanak2)
  }

  if (kptKanak == "" || kptKanak == null || typeof kptKanak === "undefined") {
    _this.alertError("KPT Kanak-Kanak Tidak Wujud");
    finishLoad(false);
    return;
  }

  //console.log("kptKanak", kptKanak);

  let param = {}
  param["InTbmaMykidApl"] = {
    BmaHscNo: kptKanak, // mandatory
    BmaAplStatCd: "",
  }

  param["InTbmyMykid"] = {
    BmyHscNo: kptKanak, // mandatory
    BmyActInd: "",
    BmyRecStatCd: "",
  }

  _this.pertanyaanLoading = true;
  ApiHelper.soapRequest({
    // mockData: {
    //   OutSomething: [{
    //     isValid: false
    //   }]
    // },
    webService: IsUseWas ? "SAAMYKID/SEMAK_MYKID" : "SoapSemakMykid",
    method: "SemakMykid",
    param: param,
    responseEntity: [],
    success: (data, warning) => {
      console.log(data)
      _this.pertanyaanLoading = false;
      _this.alertSuccess(`Semakan Berjaya.<br>Kanak-kanak Layak Memohon MyKid`, () => {
        if (warning != null) {
          _this.alertWarning(warning);
        }
      });
      finishLoad(true);
    },
    error: err => {
      _this.pertanyaanLoading = false;
      _this.alertError(err);
      finishLoad(false);
    }
  });
}

// utuk fasa satu kita setkan je diabled and tidak
export function disableInginMemohonMyKid(_this, inginMemohonMyKid) {
  console.log("[SAA Helper] - Override Ingin Memohon My Kid - Tidak (SAA FASA 1)")
  _this.setFormDisabled(inginMemohonMyKid, true);
  _this.setFormValue(inginMemohonMyKid, "0");
}

export function initMemohonMyKid(_this, {
  fc_isValidMemohonMyKid,
  fc_memohonMyKid,
  onChangeMemohonMyKid
}) {
  _this.setFormValueInitial(fc_isValidMemohonMyKid, false);

  // dapatkan initial value dulu
  let isValidMohonMyKid = _this.getFormValue(fc_isValidMemohonMyKid);
  let memohonMyKid = _this.getFormValue(fc_memohonMyKid);

  // trigger on change
  _this.simulateOnChange(fc_memohonMyKid, onChangeMemohonMyKid)

  // check kalau semakan sudah dibuat
  if (memohonMyKid == "1") {
    if (isValidMohonMyKid == true) {
      console.log("semakan sudah dibuat dan telah berjaya")
      _this.setFormValue(fc_isValidMemohonMyKid, isValidMohonMyKid)
    }
  }
}


export function onChangeMemohonMyKid(_this, {
  name,
  value,
  error,
  ref,
  isValidateNextTab,
  isValidateBtnKemaskini,
  fc_isValidMemohonMyKid,
}) {

  if (value == null) {
    return;
  }


  isValidateNextTab = typeof isValidateNextTab === "undefined" ? false : isValidateNextTab;
  isValidateBtnKemaskini = typeof isValidateBtnKemaskini === "undefined" ? false : isValidateBtnKemaskini;
  // console.log("isValidateNextTab", isValidateNextTab);
  // console.log("isValidateBtnKemaskini", isValidateBtnKemaskini);
  // console.log("value", value);

  // fc ni akan digunakan kat validate next tab or validate btn kemaskini masing
  if (value == "1") {
    _this.setFormValue(fc_isValidMemohonMyKid, false);
    _this.semakDisabled = false;
  } else {
    _this.setFormValue(fc_isValidMemohonMyKid, true);
    _this.semakDisabled = true;
  }

  if (isValidateNextTab) {
    if (value == "1") {
      _this.setNextTabDisabled();
    } else {
      _this.setNextTabEnabled();
    }
  }

  if (isValidateBtnKemaskini) {
    if (value == "1") {
      _this.kemaskiniDisabled = true;
    } else {
      _this.kemaskiniDisabled = false;
    }
  }
}


//const TarafWarganegaraBukan = "0";
const TarafWarganegaraBukan = "X";
export function isValidMohonMyKid(tarafWarganegara, tarikhLahir) {
  console.log("isValidMohonMyKid", tarafWarganegara, tarikhLahir);
  /// kalau bukan warganegera trus je tak boleh
  if (tarafWarganegara == TarafWarganegaraBukan) {
    return false;
  }

  if (typeof tarikhLahir === "undefined") {
    return true;
  }

  let umur = "";
  try {
    umur = UtilHelper.getAge(tarikhLahir);
  } catch (err) {
    return true;
  }

  console.log("umur", tarikhLahir, umur);

  let umurInt = Number.parseInt(umur);
  if (isNaN(umurInt)) {
    return true;
  } else {
    if (umurInt > 11) {
      return false;
    } else {
      return true;
    }
  }
}

/**
 * 
 */
// set // insert kpt kalau dapat dari backend
export function kunciCarianSetKptFromBackend(_this, {
  kptKanak,
  kptIbu,
  kptBapa,
  kptPemohon,
  backendData
}) {
  let kptArr = [kptKanak,
    kptIbu,
    kptBapa,
    kptPemohon
  ];
  for (var i in kptArr) {
    let kpt = kptArr[i];
    if(typeof kpt === "undefined"){
      continue;
    } 
    if (_this.isFormValueEmpty(kpt)) {
      let kptVal = backendData[kpt.name];
      if (typeof kptVal !== "undefined" && kptVal != null) {
        if (kptVal.replaceAll(" ", "") !== "") {
          _this.setFormValue(kpt, kptVal);
        }
      }
    }
  }
}

/**
 * Use in 2050, 2060, 2070 -- Tab 8 - Pemohon Dan MyKid
 * SAA 2 - 1050, 1060, 1070 -- Tab 7 - Pemohon
 * @param {*} _this 
 * @param {*} param1 
 */
export function pendaftaranOnChangeInginDapatkanMyKid(_this, {
  name,
  value,
  error,
  ref,
  tab6,
  T6_nama,
  T8_onChange_dapatkanMyKid, // _this.customOnChange.inginDapatkanKadMyKid
  T8_Knk_dapatkanMyKid,
  T8_Knk_namaPenuh,
  T8_Knk_namaRingkas,
  T8_Knk_pejabatKutipan,
}) {

  console.log(value, "inginDapatkanKadMyKid");
  //alert (value);
  if (value == null) {
    return false;
  }

  if (value == "1") {
    // debug
    // _this.setFormValueByTab(
    //  tab6,
    //   T6_nama,
    //   "WAN ZULSARHAN WAN SHAARI BIN WAN ISMAIL WAN ZULSARHAN WAN SHAARI BIN WAN ISMAIL  WAN ZULSARHAN WAN SHAARI BIN WAN ISMAIL "
    // );

    var namaPenuh = _this.getFormValueByTab(tab6, T6_nama);
    console.log("panjang nama penuh", namaPenuh.length);

    if (namaPenuh.length <= 80) {
      _this.setFormValue(T8_Knk_namaPenuh, namaPenuh);
      var namaRingkasArr = UtilHelper.generateNamaRingkas(namaPenuh);
      _this.setFormRequired(T8_Knk_namaRingkas, [true, false, false]);
      _this.setFormValue(T8_Knk_namaRingkas, namaRingkasArr);
      _this.setFormValue(T8_Knk_pejabatKutipan, _this.authUser.BRANCH_CODE);
      _this.setFormDisabled(T8_Knk_pejabatKutipan, true);

      _this.setFormDisabled(T8_Knk_namaPenuh, true);
      if (namaPenuh.length > 27) {
        // kalau nama lebih dari 27 baru bukak
        _this.setFormRequired(T8_Knk_namaRingkas, [true, false, false]);
      } else {
        // kalau kurang atau sama kita disabled je.
        _this.setFormDisabled(T8_Knk_namaRingkas, true);
      }
      return true;

    } else {
      _this.alertError(
        "Nama penuh melebihi 80 abjad. Sila Ubah Nama Penuh Kanak Kanak di Tab 'Kanak-Kanak Selepas Pengangkatan'",
        () => {
          _this.setFormValue(T8_Knk_dapatkanMyKid, "0");
          _this.simulateOnChange(T8_Knk_dapatkanMyKid, T8_onChange_dapatkanMyKid);
        }
      );
      return false;
    }
  } else if (value == "0") {
    _this.setFormDisabled(T8_Knk_namaPenuh, true);
    _this.setFormDisabled(T8_Knk_namaRingkas, true);
    _this.setFormDisabled(T8_Knk_pejabatKutipan, true);
    _this.setFormValue(T8_Knk_namaPenuh, "");
    _this.setFormValue(T8_Knk_namaRingkas, ["", "", ""]);
    _this.setFormValue(T8_Knk_pejabatKutipan, "");
  } else {
    return false;
  }

  return true;
}


/**
 * Use in 2050, 2060, 2070 -- Tab 8 - Pemohon Dan MyKid
 * SAA 2 -1050, 1060, 1070 -- Tab 7 - Pemohon Dan Mykid
 * @param {*} _this 
 * @param {*} param1 
 */
export function pendaftaranInitTab8(_this, {
  // kunci carian
  tab2,
  T2_Pmhn_hubungan,
  T2_Pmhn_hubungan_Check_Box,
  T2_Pmhn_kpt,
  T2_Pmhn_kpp,
  T2_Pmhn_noDok,
  T2_Pmhn_jenisDok,
  T2_Pmhn_negPeng,

  // maklumat ibu bapa angkat
  tab4,
  T4_Ibu_Nama,
  T4_Bapa_Nama,

  // Kanak2 Selepas Pengangkatan
  tab6,
  T6_nama,
  T6_tarafWarganegara,
  T6_tarikhLahir,

  // maklumat Tetuan
  tab7,
  T7_Tt_nama,
  T7_Tt_alamat,
  T7_Tt_poskod,
  T7_Tt_bandar,
  T7_Tt_negeri,

  // Pemohon dan Mykid
  T8_onChange_dapatkanMyKid, // _this.customOnChange.inginDapatkanKadMyKid
  T8_Knk_dapatkanMyKid,
  T8_Knk_namaPenuh,
  T8_Knk_namaRingkas,
  T8_Knk_pejabatKutipan,

  T8_Pmhn_noKpt,
  T8_Pmhn_noDok,
  T8_Pmhn_jenisDok,
  T8_Pmhn_negPeng,
  T8_Pmhn_nama,
  T8_Pmhn_alamat,
  T8_Pmhn_poskod,
  T8_Pmhn_bandar,
  T8_Pmhn_negeri,

  // newMyKid
  T8_Knk_isValidDapatkanMyKid,

  isDefacto
}) {
  isDefacto = typeof isDefacto === "undefined" ? false : isDefacto
  T2_Pmhn_hubungan_Check_Box = typeof T2_Pmhn_hubungan_Check_Box === "undefined" ? null : T2_Pmhn_hubungan_Check_Box

  let toRequired = [];
  // nama penuh dan nama ringkas jika ingin dapatkan mykid - Tidak
  _this.setFormValueInitial(T8_Knk_dapatkanMyKid, "0");
  _this.setFormRequiredInitial(T8_Knk_dapatkanMyKid, true);
  _this.setFormValueInitial(T8_Knk_namaPenuh, null);
  _this.setFormValueInitial(T8_Knk_namaRingkas, []);
  _this.setFormValueInitial(T8_Knk_pejabatKutipan, null);

  // #####################################
  // set kunci carian disabled and take value dari tab 2
  var copyFromTab2 = [{
      from: T2_Pmhn_kpt,
      to: T8_Pmhn_noKpt
    },
    {
      from: T2_Pmhn_noDok,
      to: T8_Pmhn_noDok
    },
    {
      from: T2_Pmhn_jenisDok,
      to: T8_Pmhn_jenisDok
    },
    {
      from: T2_Pmhn_negPeng,
      to: T8_Pmhn_negPeng
    }
  ]

  for (var i in copyFromTab2) {
    let t2Fc = copyFromTab2[i]["from"];
    let t8Fc = copyFromTab2[i]["to"];
    _this.setFormDisabled(t8Fc, true);
    _this.setFormValue(t8Fc, _this.getFormValueByTab(tab2, t2Fc));
  }

  // ##########################################
  // Amik makumat pemohon accordingly
  let jenisPemohon = _this.getFormValueByTab(tab2, T2_Pmhn_hubungan)
  let jenisPemohonCheckBox = _this.getFormValueByTab(tab2, T2_Pmhn_hubungan_Check_Box)

  // validation nama pemohon bergantung kepada no kpt
  // tapi utuk case peguam kita buat dia disabled
  // if (_this.isFormValueValid(T8_Pmhn_noKpt)) {
  //   _this.setFormDisabled(T8_Pmhn_nama, true);
  // } else {
  //   _this.setFormRequired(T8_Pmhn_nama, true);
  // }


  // pemohon Peguam
  if (jenisPemohon == HubunganPeguamCode) {
    // UAT - 80
    // nama dan dokumen pengenalan pun amik dari tetuan
    _this.setFormValue(T8_Pmhn_nama, _this.getFormValueByTab(tab7, T7_Tt_nama));
    _this.setFormValue(T8_Pmhn_alamat, _this.getFormValueByTab(tab7, T7_Tt_alamat));
    _this.setFormValue(T8_Pmhn_poskod, _this.getFormValueByTab(tab7, T7_Tt_poskod));
    _this.setFormValue(T8_Pmhn_bandar, _this.getFormValueByTab(tab7, T7_Tt_bandar));
    _this.setFormValue(T8_Pmhn_negeri, _this.getFormValueByTab(tab7, T7_Tt_negeri));

    _this.setFormDisabled(T8_Pmhn_nama, true);
    _this.setFormDisabled(T8_Pmhn_alamat, true);
    _this.setFormDisabled(T8_Pmhn_poskod, true);
    _this.setFormDisabled(T8_Pmhn_bandar, true);
    _this.setFormDisabled(T8_Pmhn_negeri, true);

  } else {
    // default alamat pemohon sume bukak
    // _this.setFormDisabled(T8_Pmhn_alamat, false);
    // _this.setFormRequired(T8_Pmhn_poskod, true);
    // _this.setFormRequired(T8_Pmhn_bandar, true);
    // _this.setFormRequired(T8_Pmhn_negeri, true);
    toRequired.push(T8_Pmhn_alamat);
    toRequired.push(T8_Pmhn_alamat);
    toRequired.push(T8_Pmhn_poskod);
    toRequired.push(T8_Pmhn_bandar);
    toRequired.push(T8_Pmhn_negeri);

    _this.setFormDisabled(T8_Pmhn_nama, true);

    if ((!isDefacto && jenisPemohon == HubunganIbuAngkatCode) || (isDefacto && jenisPemohonCheckBox == HubunganIbuAngkatCode)) {
      _this.setFormValue(T8_Pmhn_nama, _this.getFormValueByTab(tab4, T4_Ibu_Nama));
    }
    // pemohon Bapa Angkat
    else if ((!isDefacto && jenisPemohon == HubunganBapaAngkatCode) || (isDefacto && jenisPemohonCheckBox == HubunganBapaDeFacto)) {
      _this.setFormValue(T8_Pmhn_nama, _this.getFormValueByTab(tab4, T4_Bapa_Nama));
    }

    console.log("jenis pemohon cb> ", jenisPemohonCheckBox);
    console.log("HubunganIbuDeFacto> ", HubunganIbuDeFacto);
    console.log("jenis pemohon > ", jenisPemohon);
  }

  for (var i in toRequired) {
    let valReq = true;
    if (typeof toRequired[i].children !== "undefined") {
      valReq = [true, false, false];
    }
    _this.setFormRequired(toRequired[i], valReq);
  }

  // check dulu current full name sama tak dgn tab 6.
  // kalau tak sama baru simulate
  // SIT -- LOG

  if (
    _this.getFormValue(T8_Knk_namaPenuh) !=
    _this.getFormValueByTab(tab6, T6_nama)
  ) {
    _this.simulateOnChange(T8_Knk_dapatkanMyKid, T8_onChange_dapatkanMyKid);
  }

  // UAT - 102
  let tarafWarganegara = _this.getFormValueByTab(tab6, T6_tarafWarganegara);
  let tarikhLahir = _this.getFormValueByTab(tab6, T6_tarikhLahir);

  if (!isValidMohonMyKid(tarafWarganegara, tarikhLahir)) {
    console.log("[SAA Helper] Kanak2 TAK VALID memohon my kid", tarafWarganegara, tarikhLahir);
    _this.setFormDisabled(T8_Knk_dapatkanMyKid, true);
    _this.setFormValue(T8_Knk_dapatkanMyKid, "0");
  } else {
    console.log("[SAA Helper] Kanak2 VALID memohon my kid");
    _this.setFormDisabled(T8_Knk_dapatkanMyKid, false);
    _this.setFormValueInitial(T8_Knk_dapatkanMyKid, "0");
  }

  // fasa 1 disabled ingin memohonmykid
  //disableInginMemohonMyKid(_this, T8_Knk_dapatkanMyKid);
  //_this.simulateOnChange(T8_Knk_dapatkanMyKid, T8_onChange_dapatkanMyKid);

  if (IsMyKidEnable) {
    // newMyKid
    initMemohonMyKid(_this, {
      fc_isValidMemohonMyKid: T8_Knk_isValidDapatkanMyKid,
      fc_memohonMyKid: T8_Knk_dapatkanMyKid,
      onChangeMemohonMyKid: T8_onChange_dapatkanMyKid
    });
  } else {
    // newMyKid -- comment disabled
    // fasa 1
    disableInginMemohonMyKid(_this, T8_Knk_dapatkanMyKid);
  }

  return toRequired;
}

/**
 * Use in 2050, 2060, 2070 -- Tab 7 - Mahkamah Dan Tetuan
 * @param {*} _this 
 * @param {*} param1 
 */
export function pendaftaranInitTab7(_this, {
  T7_Mh_tarikhSurat,
  T7_Mh_alamat,
  T7_Mh_poskod,
  T7_Mh_bandar,
  T7_Mh_negeri,

  T7_Tt_nama,
  T7_Tt_nama2,
  T7_Tt_panggilan,
  T7_Tt_alamat,
  T7_Tt_poskod,
  T7_Tt_bandar,
  T7_Tt_negeri,
}) {

  // UAT - 5
  let toRequired = [
    T7_Mh_tarikhSurat,
    T7_Mh_alamat,
    T7_Mh_poskod,
    T7_Mh_bandar,
    T7_Mh_negeri,
    T7_Tt_alamat,
    T7_Tt_poskod,
    T7_Tt_bandar,
    T7_Tt_negeri,
    T7_Tt_nama // UAT - 63
  ];

  if (IsEnableNamaTetuan) { // enable tetuan baru
    console.log("masuk enable nama tetuan");
    console.log("nama 2", T7_Tt_nama2);
    _this.setFormRequired(T7_Tt_nama2, true);
    toRequired.push(T7_Tt_nama2);
  } else { // set default value panggilan tetuan
    _this.setFormValue(T7_Tt_panggilan, PanggilanTetuan);
    _this.setFormDisabled(T7_Tt_panggilan, true);
  }

  for (var i in toRequired) {
    let val = true;
    if (typeof toRequired[i].children !== "undefined") {
      val = [true, false, false];
    }
    _this.setFormRequired(toRequired[i], val);
  }

  return toRequired;
}

/**
 * Use in 2050, 2060, 2070 -- Tab 6 - Kanak Kanak Selepas Pengangkatan
 * @param {*} _this 
 * @param {*} param1 
 */
export function pendaftaranInitTab6(_this, {
  tab2,
  T2_Knk_kpt,
  T2_Knk_jenisDok,

  tab4,
  T4_agamaBapaAngkat,
  T4_agamaIbuAngkat,

  T6_FC_Arr,
  T6_jenisDoc,
  T6_tempatPendaftaran,
  T6_tarikhMulaDipelihara,
  T6_nama,
  T6_jenisTarikhLahir,
  T6_tarikhLahir,
  T6_jantina,
  T6_agama,
  T6_waktuLahir,
  T6_tempatKelahiran,
  T6_negeriKelahiran,
  T6_negaraKelahiran,
  T6_keturunan,
  T6_alamat,
  T6_poskod,
  T6_bandar,
  T6_negeri,
  T6_tarafWarganegara,

}) {

  let requiredField = [];

  for (var i in T6_FC_Arr) {
    var fc = T6_FC_Arr[i];
    //_this.setFormDisabledInitial(fc, true);
    _this.setFormDisabled(fc, true);
  }

  // set for optional
  var toOptional = [
    // UAT - 62
    T6_tarikhMulaDipelihara,
    // UAT - 19
    // T6_alamat,
    // T6_poskod,
    // T6_bandar,
    // T6_negeri,
  ];

  for (var i in toOptional) {
    _this.setFormDisabled(toOptional[i], false);
  }

  // UAT - 62
  // buang tarikhMulaDipelihara dari required
  //this.requiredField.push(FC.T6.tarikhMulaDipelihara);

  requiredField.push(T6_nama);

  if (!_this.isDokumenMalaysia(tab2, T2_Knk_kpt, T2_Knk_jenisDok)) {
    // set required and optional
    var toRequiredKanak = [
      T6_nama,
      T6_jenisTarikhLahir,
      T6_tarikhLahir,
      T6_jantina,
      T6_agama,
    ];

    var toOptional = [
      T6_waktuLahir,
      T6_agama,
      T6_tempatKelahiran,
      // T6_negeriKelahiran,
      // T6_negaraKelahiran,
      T6_keturunan,
      // UAT - 19
      // T6_alamat,
      // T6_poskod,
      // T6_bandar,
      // T6_negeri,
    ];

    for (var i in toOptional) {
      _this.setFormDisabled(toOptional[i], false);
    }

    requiredField.push(...toRequiredKanak);
  }

  // set agama ikut agama bapa atau ibu 
  // 15/04/2019 : dah taknak mcm nie 

  // if (!_this.isFormValueEmptyByTab(tab4, T4_agamaBapaAngkat)) {
  //   _this.setFormValueInitial(T6_agama, _this.getFormValueByTab(tab4, T4_agamaBapaAngkat));

  // } else if (!_this.isFormValueEmptyByTab(tab4, T4_agamaIbuAngkat)) {
  //   _this.setFormValueInitial(T6_agama, _this.getFormValueByTab(tab4, T4_agamaIbuAngkat));

  // } else {
  //   _this.setFormValueInitial(T6_agama, "");

  // }

  // UAT  - 19
  requiredField.push(...[T6_alamat, T6_poskod, T6_bandar, T6_negeri]);

  // make all required here
  for (var i in requiredField) {
    let val = true;
    if (typeof requiredField[i].children !== "undefined") {
      val = [true, false, false];
    }
    _this.setFormRequired(requiredField[i], val);
  }

  // SIT
  // UAT - 4
  // _this.setFormValueInitial(
  //   FC.T6.nama,
  //   _this.getFormValueByTab("T382050_T3", FC.T3.nama)
  // );

  // UAT - 69
  /**
   * Taraf Warganegara Semasa Kelahiran berstatus Q-Belum Ditentukan, Taraf Warganegara Selepas Pengangkatan masih Q
   * Taraf Warganegara perlu auto ditukarkan kepada X-Bukan Warganegara (Pending surat dari BKA)
   */
  if (_this.getFormValue(T6_tarafWarganegara) == "Q") {
    _this.setFormValue(T6_tarafWarganegara, "X");
  }

  const setMalaysia = () => {
    let negeri = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16"
    ];
    let malaysia =
      negeri.indexOf(_this.getFormValue(T6_negeriKelahiran)) >= 0;
    if (malaysia) {
      _this.setFormValue(T6_negaraKelahiran, "3000");
    }
  }

  // amik dari 2060
  setMalaysia();
  //hardcode tempat pendaftaran
  _this.setFormValueInitial(T6_tempatPendaftaran, _this.authUser.BRANCH_CODE);


  // Fix UAT
  fixPassportHolder(_this, {
    jenisDoc: T6_jenisDoc,
    tarafPenduduk: {},
    tarafWarganegara: T6_tarafWarganegara,
    valueTarafWarganegara: "X",
  });

  return requiredField;
}


/**
 * Use in 2050, 2060, 2070 -- Tab 4 - Ibu Bapa Angkat
 * @param {*} _this 
 * @param {*} param1 
 */
export function pendaftaranInitTab4(_this, {
  tab2,
  T2_Ibu_kpt,
  T2_Ibu_jenisDoc,
  T2_Bapa_kpt,
  T2_Bapa_jenisDoc,

  T4_FC_Arr,

  T4_Ibu_kpt,
  T4_Ibu_kpp,
  T4_Ibu_noDoc,

  T4_Ibu_jenisDoc,
  T4_Ibu_nama,
  T4_Ibu_tarikhLahir,
  T4_Ibu_umur,
  T4_Ibu_agama,
  T4_Ibu_keturunan,
  T4_Ibu_perkerjaan,
  T4_Ibu_tarafPenduduk,
  T4_Ibu_tarafWarganegara,
  T4_Ibu_statusPengesahan,

  T4_Bapa_kpt,
  T4_Bapa_kpp,
  T4_Bapa_noDoc,

  T4_Bapa_jenisDoc,
  T4_Bapa_nama,
  T4_Bapa_tarikhLahir,
  T4_Bapa_umur,
  T4_Bapa_agama,
  T4_Bapa_keturunan,
  T4_Bapa_perkerjaan,
  T4_Bapa_tarafPenduduk,
  T4_Bapa_tarafWarganegara,
  T4_Bapa_statusPengesahan,

  // isDefacto
}) {

  for (var i in T4_FC_Arr) {
    var fc = T4_FC_Arr[i];
    _this.setFormDisabled(fc, true);
  }

  let requiredField = [];
  // if value KPT ibu kosong
  if (_this.isFormValueEmptyByTab(tab2, T2_Ibu_kpt)) {
    var jenisDoc = _this.getFormValueByTab(
      tab2,
      T2_Ibu_jenisDoc
    );

    var isDocMas = DokumenMalaysia.indexOf(T2_Ibu_jenisDoc) >= 0;
    let isDocValid = _this.isFormValueValid(T4_Ibu_jenisDoc);

    console.log("isDocValid ibu", isDocValid);
    if (!isDocMas && isDocValid) {
      // // set required
      var toRequired = [T4_Ibu_nama];
      for (var i in toRequired) {
        _this.setFormRequired(toRequired[i], true);
      }
      requiredField.push(...toRequired);

      // set editable
      var toOptional = [
        T4_Ibu_tarikhLahir,
        T4_Ibu_umur,
        T4_Ibu_agama,
        T4_Ibu_keturunan,
        T4_Ibu_perkerjaan,
        T4_Ibu_tarafPenduduk,
        T4_Ibu_tarafWarganegara,
        // T4_Ibu_statusPengesahan,
      ];
      for (var i in toOptional) {
        _this.setFormDisabled(toOptional[i], false);
      }
    }
  }

  // if value KPT bapa kosong
  if (_this.isFormValueEmptyByTab(tab2, T2_Bapa_kpt)) {
    var jenisDoc = _this.getFormValueByTab(
      tab2,
      T2_Bapa_jenisDoc
    );
    var isDocMas = DokumenMalaysia.indexOf(jenisDoc) >= 0;
    let isDocValid = _this.isFormValueValid(T4_Bapa_jenisDoc);
    console.log("isDocValid bapa", isDocValid);
    if (!isDocMas && isDocValid) {
      // // set required
      var toRequired = [T4_Bapa_nama];
      for (var i in toRequired) {
        _this.setFormRequired(toRequired[i], true);
      }
      requiredField.push(...toRequired);

      // set editable
      var toOptional = [
        //FC.T4.namaBapaAngkat,
        T4_Bapa_tarikhLahir,
        T4_Bapa_umur,
        T4_Bapa_agama,
        T4_Bapa_keturunan,
        T4_Bapa_perkerjaan,
        T4_Bapa_tarafPenduduk,
        T4_Bapa_tarafWarganegara,
        // T4_Bapa_statusPengesahan,
      ];
      for (var i in toOptional) {
        _this.setFormDisabled(toOptional[i], false);
      }
    }
  }




  // FIX FOR PASSPORT HOLDER -- SIT
  // fix for passport holder ibu
  // if (_this.getFormValue(T4_Ibu_jenisDoc) == DokumenPassport) {
  //   _this.setFormValue(T4_Ibu_tarafPenduduk, "X");
  //   _this.setFormValue(T4_Ibu_tarafWarganegara, "0");
  //   _this.setFormDisabled(T4_Ibu_tarafPenduduk, true);
  //   _this.setFormDisabled(T4_Ibu_tarafWarganegara, true);
  // }
  // // fix for passport holder bapa
  // if (
  //   _this.getFormValue(T4_Bapa_jenisDoc) == DokumenPassport
  // ) {
  //   _this.setFormValue(T4_Bapa_tarafPenduduk, "X");
  //   _this.setFormValue(T4_Bapa_tarafWarganegara, "0");
  //   _this.setFormDisabled(T4_Bapa_tarafPenduduk, true);
  //   _this.setFormDisabled(T4_Bapa_tarafWarganegara, true);
  // }

  fixPassportHolder(_this, {
    jenisDoc: T4_Ibu_jenisDoc,
    tarafPenduduk: T4_Ibu_tarafPenduduk,
    tarafWarganegara: T4_Ibu_tarafWarganegara
  });

  fixPassportHolder(_this, {
    jenisDoc: T4_Bapa_jenisDoc,
    tarafPenduduk: T4_Bapa_tarafPenduduk,
    tarafWarganegara: T4_Bapa_tarafWarganegara
  });

  // UAT - 70
  let isIbuValid = validateIbuBapaAngkat(_this, {
    kpt: T4_Ibu_kpt,
    kpp: T4_Ibu_kpp,
    noDok: T4_Ibu_noDoc,
    fcArr: T4_FC_Arr,
    fcArrStart: T4_Ibu_kpt,
    fcArrEnd: T4_Ibu_statusPengesahan
  });

  // UAT - 70
  let isBapaValid = validateIbuBapaAngkat(_this, {
    kpt: T4_Bapa_kpt,
    kpp: T4_Bapa_kpp,
    noDok: T4_Bapa_noDoc,
    fcArr: T4_FC_Arr,
    fcArrStart: T4_Bapa_kpt,
    fcArrEnd: T4_Bapa_statusPengesahan
  });

  // UAT - 25
  // pekerjaan required
  if (isBapaValid) {
    requiredField.push(T4_Bapa_perkerjaan);
    _this.setFormRequired(T4_Bapa_perkerjaan, true);
  }
  if (isIbuValid) {
    requiredField.push(T4_Ibu_perkerjaan);
    _this.setFormRequired(T4_Ibu_perkerjaan, true);
  }


  // kosongkan sume field yg tak berkenaaan
  // UAT 
  // tiba2 ada umur even takde maklumat lain (2060)
  let ibuValid = _this.isFormValueValid(T4_Ibu_kpt) ||
    _this.isFormValueValid(T4_Ibu_noDoc) ||
    _this.isFormValueValid(T4_Ibu_kpp);

  let bapaValid = _this.isFormValueValid(T4_Bapa_kpt) ||
    _this.isFormValueValid(T4_Bapa_noDoc) ||
    _this.isFormValueValid(T4_Bapa_kpp);

  let toEmpty = [];
  if (!ibuValid) {
    toEmpty.push(...[T4_Ibu_umur]);
  }

  if (!bapaValid) {
    toEmpty.push(...[T4_Bapa_umur]);
  }

  for (var i in toEmpty) {
    _this.setFormValue(toEmpty[i], null);
  }



  return requiredField;
}


// ##########################################################
export function kCarian_getHubunganDefactoForExisiting(_this, {
  ibu_kpt,
  ibu_kpp,
  ibu_noDok,
  ibu_jenisDok,
  ibu_negaraPeng,

  bapa_kpt,
  bapa_kpp,
  bapa_noDok,
  bapa_jenisDok,
  bapa_negaraPeng,

  p_kpt,
  p_kpp,
  p_noDok,
  p_jenisDok,
  p_negaraPeng,
}) {
  const isSame = (fc1, fc2) => {
    console.log("isSame -------------------------------")
    console.log(fc1.name, _this.getFormValue(fc1));
    console.log(fc2.name, _this.getFormValue(fc2));
    return _this.isFormValueValid(fc1) &&
      _this.isFormValueValid(fc2) &&
      _this.getFormValue(fc1) == _this.getFormValue(fc2)
  }

  if (isSame(p_kpt, ibu_kpt) || isSame(p_kpp, ibu_kpp) ||
    (isSame(p_noDok, ibu_noDok) && isSame(p_jenisDok, ibu_jenisDok) && isSame(p_negaraPeng, ibu_negaraPeng))) {
    return HubunganIbuAngkatCode;
  }

  if (isSame(p_kpt, bapa_kpt) || isSame(p_kpp, bapa_kpp) ||
    (isSame(p_noDok, bapa_noDok) && isSame(p_jenisDok, bapa_jenisDok) && isSame(p_negaraPeng, bapa_negaraPeng))) {
    return HubunganBapaAngkatCode;
  }

  return "";
}


export function kCarian_initTabWithExistingValue(_this, {
  isDefacto,

  isForCarian,

  knk_kc,
  knk_kpt,
  knk_kpp,
  knk_noDok,
  knk_jenisDok,
  knk_negaraPeng,

  ibu_kc,
  ibu_kpt,
  ibu_kpp,
  ibu_noDok,
  ibu_jenisDok,
  ibu_negaraPeng,
  ibu_hubungan,

  bapa_kc,
  bapa_kpt,
  bapa_kpp,
  bapa_noDok,
  bapa_jenisDok,
  bapa_negaraPeng,
  bapa_hubungan,

  p_kc,
  p_kpt,
  p_kpp,
  p_noDok,
  p_jenisDok,
  p_negaraPeng,
  p_hubungan,
}) {

  isForCarian = typeof isForCarian === "undefined" ? false : isForCarian;

  let kanak = {
    kc: knk_kc,
    kpt: knk_kpt,
    kpp: knk_kpp,
    noDok: knk_noDok,
    jenisDok: knk_jenisDok,
    negaraPeng: knk_negaraPeng,
  }
  let ibu = {
    kc: ibu_kc,
    kpt: ibu_kpt,
    kpp: ibu_kpp,
    noDok: ibu_noDok,
    jenisDok: ibu_jenisDok,
    negaraPeng: ibu_negaraPeng,
    hubungan: ibu_hubungan,
  }
  let bapa = {
    kc: bapa_kc,
    kpt: bapa_kpt,
    kpp: bapa_kpp,
    noDok: bapa_noDok,
    jenisDok: bapa_jenisDok,
    negaraPeng: bapa_negaraPeng,
    hubungan: bapa_hubungan,
  }
  let pemohon = {
    kc: p_kc,
    kpt: p_kpt,
    kpp: p_kpp,
    noDok: p_noDok,
    jenisDok: p_jenisDok,
    negaraPeng: p_negaraPeng,
    hubungan: p_hubungan,
  }


  // set kunci carian indicator and set state hubungan dengan pemilik
  let allKc = [kanak, ibu, bapa, pemohon];
  for (var i in allKc) {
    let kcObj = allKc[i];
    let isValid = _this.checkIsKunciCarianValid(
      kcObj.kpt,
      kcObj.kpp,
      kcObj.noDok,
      kcObj.jenisDok,
      kcObj.negaraPeng,
    );
    _this.setFormValue(kcObj.kc, isValid);

    // set state hubungan dengan pemilik
    if (!isForCarian) {
      if (isDefacto) {
        if (isValid) {
          _this.setFormRequired(kcObj.hubungan, true);
        } else {
          _this.setFormDisabled(kcObj.hubungan, true);
        }
      }
    }
  }

  if (!isForCarian) {
    _this.setFormDisabled(p_hubungan, true);
  }
}


export function kCarian_setKunciCarianKpt(_this, {
  dataCurrentTab,
  PreKunci,
  PostKunci,
  tabNo,
  FC,
  hubunganFc,
  hubunganOnChange
}) {
  //set only if current kpt is empty
  dataCurrentTab = dataCurrentTab[0];
  //var FC = _this.FC;

  var kptFcArr = [
    PostKunci.KANAK, PostKunci.IBU, PostKunci.BAPA, PostKunci.PEMOHON
  ];

  for (var i in kptFcArr) {

    var fcKpt = FC[tabNo][PreKunci.NO_KPT + kptFcArr[i]];
    var fcKunci = PreKunci.KUNCI + kptFcArr[i];
    var hasKunciCarian = _this.getFormValue(fcKunci);
    if (_this.isFormValueEmpty(fcKpt) && hasKunciCarian) {
      console.log(hasKunciCarian, fcKpt.name, "empty", dataCurrentTab[fcKpt.name]);
      _this.setFormValue(fcKpt, dataCurrentTab[fcKpt.name]);
      //_this.setFormDisabled(fcKpt, false);
      _this.setFormDisabled(fcKpt, true);
    }
  }

  // simulate hubungan pemohon utk copy over data
  let hubunganVal = _this.getFormValue(hubunganFc);
  if (
    hubunganVal == HubunganIbuAngkatCode ||
    hubunganVal == HubunganBapaAngkatCode
  ) {
    _this.simulateOnChange(hubunganFc, hubunganOnChange);
  }
}

export function kCarian_isKunciCarianValid(_this, {
  noKpt,
  noKpp,
  noDokumen,
  jenisDokumen,
  negaraPengeluar
}) {
  if (_this.isFormValueValid(noKpt)) {
    return true;
  }

  if (_this.isFormValueValid(noKpp)) {
    return true;
  }

  if (_this.isAllValueValid([noDokumen, jenisDokumen, negaraPengeluar])) {
    return true;
  }

  return false;
}

export function kCarian_resetInvalidKunciCarian(_this, {
  kptKanak,
  kptIbu,
  kptBapa,
  kptPemohon
}) {

  let arr = [kptKanak,
    kptIbu,
    kptBapa,
    kptPemohon
  ]

  for (var i in arr) {
    if (!_this.isFormValueValid(arr[i])) {
      _this.setFormValue(arr[i], "");
    }
  }
}

export function kCarian_isOnEmptyButHasNoDokumen(_this, {
  nameOnChange,
  noDok,
  jenisDok,
  negPeng
}) {
  if (_this.isFormValueValid(noDok)) {
    if (nameOnChange == jenisDok.name && _this.isFormValueEmpty(jenisDok)) {
      return true;
    }
    if (nameOnChange == negPeng.name && _this.isFormValueEmpty(negPeng)) {
      return true;
    }
  }

  return false;
}

export function kCarian_resetHubunganPemohon(_this, {
  name,
  hubunganFc,
  hubunganCode,
  hubunganOnChange,

  fcNoDkmn,
  fcJenisDkmn,
  fcNegPeng
}) {
  // function ni akan dipanggil masa onChange is false kat kunci carian,
  // so kalau kita kosongkan jenis dokumen or negera pengeluar pun dia akan masuk
  // tapi kita tak nak reset value hubungan kalau kes cmtu
  // so kita letak checking 'isOnEmptyButHasNoDokumen'

  if (_this.getFormValue(hubunganFc) == hubunganCode && !_this.isFormValueValid(name)) {
    if (!kCarian_isOnEmptyButHasNoDokumen(_this, {
        nameOnChange: name,
        noDok: fcNoDkmn,
        jenisDok: fcJenisDkmn,
        negPeng: fcNegPeng
      })) {
      _this.setFormValue(hubunganFc, "");
      _this.simulateOnChange(
        hubunganFc,
        hubunganOnChange
      );
    }
  }
}

export function kCarian_onChangeIbuBapaKandung(_this, {
  name,
  value,
  error,
  ref,

  // fc current
  jenisDokumen,
  tarafPenduduk,
  tarafWarganegara
}) {

  if (jenisDokumen.name == name) {
    if (value == DokumenPassport) {
      _this.setFormValue(tarafPenduduk, "X");
      _this.setFormValue(tarafWarganegara, "0");
      _this.setFormDisabled(tarafPenduduk, true);
      _this.setFormDisabled(tarafWarganegara, true);
    } else {
      _this.setFormValue(tarafPenduduk, "");
      _this.setFormValue(tarafWarganegara, "");
      _this.setFormDisabled(tarafPenduduk, false);
      _this.setFormDisabled(tarafWarganegara, false);
    }
  }

}

export function kCarian_onChangeIbuBapa(_this, {
  PreKunci,
  PostKunci,
  type,
  name,
  value,
  error,
  ref,
  FC_TAB,

  hubunganCode,
  hubunganOnChange,

  kunciCarianHelper,
}) {
  var isChange = kunciCarianHelper(
    PostKunci[type],
    name,
    value,
    error,
    ref
  );

  _this.setFormValue(
    PreKunci.KUNCI + PostKunci[type],
    isChange
  );

  //SIT reset balik hubungan dgn pemilik
  if (!isChange) {
    kCarian_resetHubunganPemohon(_this, {
      name: name,
      hubunganFc: FC_TAB[PreKunci.HUBUNGAN + PostKunci.PEMOHON],
      hubunganCode: hubunganCode,
      hubunganOnChange: hubunganOnChange,
      fcNoDkmn: FC_TAB[PreKunci.NO_DOK + PostKunci[type]],
      fcJenisDkmn: FC_TAB[PreKunci.JENIS_DOK + PostKunci[type]],
      fcNegPeng: FC_TAB[PreKunci.NEG_PENG + PostKunci[type]]
    });
  }

  return isChange;
}

export function validasiTarikhMulaDipelihara(_this, {
  tarikhLahir,
  tarikhMulaDipelihara,
  tabTarikhMohon,
  tarikhPermohonan,
  errHandler,
  successHandler
}) {
  let err = null;
  let v_tarikhLahir = _this.getFormValue(tarikhLahir);
  let v_tarikhMulaDipelihara = _this.getFormValue(tarikhMulaDipelihara);
  let v_tarikhPermohonan = _this.getFormValueByTab(tabTarikhMohon, tarikhPermohonan);
  let tarikhMulaDipeliharaDb = TimeHelper.dateConvertValueToDb(v_tarikhMulaDipelihara);
  let tarikhPermohonanDb = TimeHelper.dateConvertValueToDb(v_tarikhPermohonan);
  let currDate = TimeHelper.getDateValueToday();
  let currDateDb = TimeHelper.getDateDbToday();

  let currMonth = currDateDb.substr(4, 2);
  let currDay = currDateDb.substr(6, 8);
  let currYear = currDateDb.substr(0, 4);

  let peliharaMonth = tarikhMulaDipeliharaDb.substr(4, 2);
  let peliharaDay = tarikhMulaDipeliharaDb.substr(6, 8);
  let peliharaYear = tarikhMulaDipeliharaDb.substr(0, 4);

  let permohonanMonth = tarikhPermohonanDb.substr(4, 2);
  let permohonanDay = tarikhPermohonanDb.substr(6, 8);
  let permohonanYear = tarikhPermohonanDb.substr(0, 4);

  // console.log("currYear > ", currYear);
  console.log("peliharaYear > ", peliharaYear);
  console.log("peliharaDay > ", peliharaDay);
  console.log("permohonanYear > ", permohonanYear);
  console.log("permohonanMonth > ", permohonanMonth);
  console.log("permohonanDay > ", permohonanDay);
  const errMes = "Anak Angkat Mesti Dipelihara Sekurang-kurangnya 2 Tahun";


  if (permohonanYear - peliharaYear < 2) {
    console.log("masuk > SALAH YEAR!")
    err = errMes;
    // _this.alertError("Anak Angkat Mesti Dipelihara Sekurang-kurangnya 2 Tahun");
    // _this.setFormValue(tarikhMulaDipelihara, "");
    // _this.focusToFormField(tarikhMulaDipelihara);
    // _this.setNextTabDisabled();
  } else if (permohonanYear - peliharaYear == 2) {
    if (permohonanMonth < peliharaMonth) {
      console.log("masuk > SALAH MONTH!")
      err = errMes;

      // _this.alertError("Anak Angkat Mesti Dipelihara Sekurang-kurangnya 2 Tahun");
      // _this.setFormValue(tarikhMulaDipelihara, "");
      // _this.focusToFormField(tarikhMulaDipelihara);
      // _this.setNextTabDisabled();
    } else if (permohonanMonth == peliharaMonth) {
      if (permohonanDay < peliharaDay) {
        console.log("masuk > SALAH DAY!")
        err = errMes;
        // _this.alertError("Anak Angkat Mesti Dipelihara Sekurang-kurangnya 2 Tahun");
        // _this.setFormValue(tarikhMulaDipelihara, "");
        // _this.focusToFormField(tarikhMulaDipelihara);
        // _this.setNextTabDisabled();
      }
    }
  }

  // console.log("v_tarikhLahir",v_tarikhLahir);
  // console.log("v_tarikhMulaDipelihara",v_tarikhMulaDipelihara);
  let tLahir = TimeHelper.isDateBigger(v_tarikhLahir, v_tarikhMulaDipelihara);
  // console.log("tLahir", v_tarikhLahir);
  // console.log("v_tarikhMulaDipelihara", v_tarikhMulaDipelihara);
  // console.log("tLahir", tLahir);
  // console.log("err", err);
  if (err == null && tLahir) {
    // if (v_tarikhMulaDipelihara != null && tLahir) {
    err = "Tarikh Lahir Melebihi Tarikh Mula Dipelihara"
  }

  if (err != null) {
    _this.alertError(err, () => {
      _this.setFormValue(tarikhMulaDipelihara, "");
      _this.focusToFormField(tarikhMulaDipelihara);
      errHandler(err)
    });
  } else {
    successHandler()
  }

}


// ############## AGAMA
export function validateAgamaIslam(_this, {
  knk_tab_agama,
  knk_fc_agama,

  ibu_tab_agama,
  ibu_fc_agama,

  bapa_tab_agama,
  bapa_fc_agama,

  okHandler
}) {
  okHandler = typeof okHandler === "undefined" ? () => {} : okHandler;
  const ISLAM = "1";
  let v_knk = _this.getFormValueGlobal(knk_tab_agama, knk_fc_agama);
  let v_ibu = _this.getFormValueGlobal(ibu_tab_agama, ibu_fc_agama);
  let v_bapa = _this.getFormValueGlobal(bapa_tab_agama, bapa_fc_agama);

  let empty_knk = _this.isFormValueEmptyGlobal(knk_tab_agama, knk_fc_agama);
  let empty_ibu = _this.isFormValueEmptyGlobal(ibu_tab_agama, ibu_fc_agama);
  let empty_bapa = _this.isFormValueEmptyGlobal(bapa_tab_agama, bapa_fc_agama);

  let parentBukanIslam = false;
  if (!empty_ibu && !empty_bapa) {
    parentBukanIslam = v_ibu != ISLAM || v_bapa != ISLAM
  } else if (!empty_ibu) {
    parentBukanIslam = v_ibu != ISLAM
  } else if (!empty_bapa) {
    parentBukanIslam = v_bapa != ISLAM
  }

  if (parentBukanIslam) {
    if (!empty_knk && v_knk == ISLAM) {
      _this.alertError("SAA0063E 'Pastikan Ibu Bapa angkat beragama Islam'", okHandler);
      return false;
    }
  }

  return true;
}
