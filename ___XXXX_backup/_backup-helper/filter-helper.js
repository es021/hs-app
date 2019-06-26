import {
  IsUseNewRef,
  RefNewCode,
  RefNewDesc,
  IsDeFactoEnable
} from '../config/app-config';

import {
  HubunganIbuAngkatCode,
  HubunganBapaAngkatCode,
  HubunganPeguamCode,
  DokumenMalaysia,
  MalaysiaCode
} from '../config/trans-config'

export function ref009City(data, negeriCode) {
  var code = IsUseNewRef ? RefNewCode : "R009CityCd";
  var desc = IsUseNewRef ? RefNewDesc : "R009CityDesc";

  if (negeriCode == "" || negeriCode == null || typeof negeriCode == "undefined") {
    return true;
  }

  if (data[code].substring(0, 2) == negeriCode) {
    return true;
  } else {
    return false
  }
}

export function ref012District(data, negeriCode) {
  var code = IsUseNewRef ? RefNewCode : "R012DistrictCd";
  var desc = IsUseNewRef ? RefNewDesc : "R012DistrictDesc";

  if (negeriCode == "" || negeriCode == null || typeof negeriCode == "undefined") {
    return true;
  }

  if (data[code].substring(0, 2) == negeriCode) {
    return true;
  } else {
    return false
  }
}

export function ref013CourtCd(data, jenisMahkamahCode, jenisMahkamahLabel) {
  var code = IsUseNewRef ? RefNewCode : "R013CourtCd";
  var desc = IsUseNewRef ? RefNewDesc : "R013CourtDesc";

  if (jenisMahkamahCode == "" || jenisMahkamahCode == null || typeof jenisMahkamahCode == "undefined") {
    return true;
  }

  // dua ni takde dalam list
  if (jenisMahkamahLabel.indexOf("ADAT") >= 0 || jenisMahkamahLabel.indexOf("SYARIAH") >= 0) {
    return true;
  }

  let labelDesc = data[desc];
  jenisMahkamahLabel = jenisMahkamahLabel.replaceAll("SESYEN", "SEKSYEN");
  labelDesc = labelDesc.replaceAll("SESYEN", "SEKSYEN");

  if (labelDesc.indexOf(jenisMahkamahLabel) >= 0) {
    return true;
  }

  return false
}

// ##################################################################
// Filter Hubungan Dengan Pemilik Untuk SAA

const HubunganDeFacto = ["02", "03", "07", "10", "11", "13"];
const HubunganDeFactoIbu = ["02", "07", "11", "13"];
const HubunganDeFactoBapa = ["03", "07", "10", "13"];
const HubunganMahkamahIbu = ["02", "04", "07", "09", "11", "12", "13"];
const HubunganMahkamahBapa = ["03", "04", "07", "08", "10", "12", "13"];
const HubunganMahkamahPemohon = [HubunganIbuAngkatCode,
  HubunganBapaAngkatCode,
  HubunganPeguamCode,
];

function hubunganGeneral(data, isDefacto, dataDefacto, dataMahkamah, additionalData) {

  let valids = [];
  //console.log("isDefacto",isDefacto);
  if (IsDeFactoEnable && typeof isDefacto === "undefined") {
    valids = [...dataDefacto, ...dataMahkamah, ]
  } else {
    valids = isDefacto ? dataDefacto : dataMahkamah
  }

  additionalData = typeof additionalData === "undefined" ? [] : additionalData;
  valids = [...valids, ...additionalData];

  // console.log(valids);
  var code = IsUseNewRef ? RefNewCode : "R023RltnCd";
  return valids.indexOf(data[code]) >= 0;
}

export function hubunganIbuAngkat(data, isDefacto, additionalData) {
  return hubunganGeneral(data, isDefacto, HubunganDeFactoIbu, HubunganMahkamahIbu, additionalData)
}

export function hubunganBapaAngkat(data, isDefacto, additionalData) {
  return hubunganGeneral(data, isDefacto, HubunganDeFactoBapa, HubunganMahkamahBapa, additionalData)
}

export function hubunganPemohon(data, isDefacto, additionalData) {
  return hubunganGeneral(data, isDefacto, HubunganDeFacto, HubunganMahkamahPemohon, additionalData)
}

// export function hubunganIbuAngkat(data, isDefacto) {
//   isDefacto = typeof isDefacto === "undefined" ? false : isDefacto;
//   //  var valids = ["02", "04", "07", "09", "11", "12", "13", "14", "16"]
//   // Pembetulan untuk keluarkan data CUCU dan ANAK dari senarai hubungan
//   let valids = isDefacto ? HubunganDeFacto : HubunganMahkamahIbu
//   var code = IsUseNewRef ? RefNewCode : "R023RltnCd";
//   return valids.indexOf(data[code]) >= 0;
// }

// export function hubunganBapaAngkat(data, isDefacto) {
//   isDefacto = typeof isDefacto === "undefined" ? false : isDefacto;
//   //var valids = ["03", "04", "07", "08", "10", "12", "13", "14", "16"]
//   // Pembetulan untuk keluarkan data CUCU dan ANAK dari senarai hubungan
//   let valids = isDefacto ? HubunganDeFacto : HubunganMahkamahBapa
//   var code = IsUseNewRef ? RefNewCode : "R023RltnCd";
//   return valids.indexOf(data[code]) >= 0;
// }

// export function hubunganPemohon(data, isDefacto) {
//   isDefacto = typeof isDefacto === "undefined" ? false : isDefacto;
//   let valids = isDefacto ? HubunganDeFacto : HubunganMahkamahPemohon
//   var code = IsUseNewRef ? RefNewCode : "R023RltnCd";
//   return valids.indexOf(data[code]) >= 0;
// }

// ##################################################################
// Filter Agama

export function saaAgama(data, isDefacto) {
  isDefacto = typeof isDefacto === "undefined" ? false : isDefacto;
  let notValid = [];
  if (isDefacto) {
    notValid = []
  } else {
    notValid = ["1"]; // kalau mahkamah, agama islam tak leh
  }
  return notValid.indexOf(data[RefNewCode]) <= -1;
  //var valids = ["2", "3", "4", "5", "6", "7", "A", "B", "C"];
  //return valids.indexOf(data[RefNewCode]) >= 0;
}

export function jenisDokumenBukanMalaysia(data) {
  var notValids = DokumenMalaysia;
  return notValids.indexOf(data[RefNewCode]) <= -1;
}

// ###############################################
// UTK SKC kita assume sume guna NEW REF
export function skcJenisDokumen(data) {
  var valids = ["01", "02", "03", "07", "10", "28", "29", "30", "91", "92", "93", "94", "99"];
  return valids.indexOf(data[RefNewCode]) >= 0;
}

export function skcKodTarafKahwin(data, valids) {
  return valids.indexOf(data[RefNewCode]) >= 0;
}

export function skcAgama(data) {
  var valids = ["2", "3", "4", "5", "6", "7", "A", "B", "C"];
  return valids.indexOf(data[RefNewCode]) >= 0;
}

export function skcTarafKahwinLelaki(data) {
  var valids = ["1", "3"];
  return valids.indexOf(data[RefNewCode]) >= 0;
}

export function skcTarafKahwinLelakiJenisRekod2(data) {
  var valids = ["1","2","3","6"];
  return valids.indexOf(data[RefNewCode]) >= 0;
}

export function skcTarafKahwinPerempuan(data) {
  var valids = ["1", "4", "5"];
  return valids.indexOf(data[RefNewCode]) >= 0;
}

export function skcTarafKahwinPerempuanJenisRekod2(data) {
  var valids = ["1","2","4","5","6"];
  return valids.indexOf(data[RefNewCode]) >= 0;
}

export function skcPertalian(data) {
  var valids = ["02", "03", "04"];
  return valids.indexOf(data[RefNewCode]) >= 0;
}

export function skcJenisLantikan(data) {
  var valids = ["1", "2", "3"];
  return valids.indexOf(data[RefNewCode]) >= 0;
}
export function skcJenisLantikanTribunal(data) {
  var valids = ["1", "2", "3"];
  return valids.indexOf(data[RefNewCode]) >= 0;
}
export function skcJenisLantikanPendamai(data) {
  var valids = ["1", "2"];
  return valids.indexOf(data[RefNewCode]) >= 0;
}

export function skcKodPejPermohonan(data) {
  var valids = ["1","5","6","7","8"];
  let code = data[RefNewCode];
  return (valids.indexOf(code[4]) >= 0) ;
}
// ["1","5","6","7","8"].indexOf(value[4]) < 0 

export function negaraPengeluar(data, val_jenisDokumen) {
  var notValid = DokumenMalaysia.indexOf(val_jenisDokumen) >= 0 ? [] : [MalaysiaCode];
  if (val_jenisDokumen == "" || val_jenisDokumen == null) {
    notValid = [];
  }

  return notValid.indexOf(data[RefNewCode]) <= -1;
}
