import * as ApiHelper from './api-helper';

import {
  IsUseWas,
  isProd,
  RefNewCode,
  RefNewDesc,
  IS_SKC,
  IsResitAutoPrint
} from '../config/app-config';

import * as TimeHelper from './time-helper'

import {
  SelectDefault,
  DokumenMalaysia
} from '../config/trans-config';

// 382000, 341100, 349010, 385030
export const ResitTemplate = IsResitAutoPrint ? "CETAKAN_RESIT_GLOBAL_AUTO" : "CETAKAN_RESIT_GLOBAL";

export const DeleteLogo = `<i class="fa fa-trash-alt" style="opacity: 0.7;"></i>`;

export const JournalAttr = {
  listTableDataLesen: "LISTTABLEDATALESEN",
  listTableDataPreviousLesen: "LISTTABLEDATAPREVIOUSLESEN",
}

export function updReceiptNo(branchCode, success, error) {
  var param = {};
  param[ApiHelper.LocalActionParam.BranchCode] = branchCode;
  ApiHelper.localTransRequest(ApiHelper.LocalAction.UPD_RECEIPT_NO, param, success, error)
}

export function inqPaymentCfg(branchCode, success, error) {
  var param = {};
  param[ApiHelper.LocalActionParam.BranchCode] = branchCode;
  ApiHelper.localTransRequest(ApiHelper.LocalAction.INQ_PAYMENT_CFG, param, success, error)
}

export function crtAplnInfo(param, success, error) {
  ApiHelper.localTransRequest(ApiHelper.LocalAction.CRT_APLN_INFO, param, success, error)
}

export function crtPcsDetails(param, success, error) {
  ApiHelper.localTransRequest(ApiHelper.LocalAction.CRT_PCS_DETAILS, param, success, error)
}

export function cancelPcsDetails(param, success, error) {
  ApiHelper.localTransRequest(ApiHelper.LocalAction.CANCEL_PCS_DETAILS, param, success, error)
}


export function inqReceiptNo(branchCode, success, error) {
  var param = {};
  param[ApiHelper.LocalActionParam.BranchCode] = branchCode;

  ApiHelper.localTransRequest(ApiHelper.LocalAction.INQ_RECEIPT_NO, param, res => {
    try {
      //D18-000156
      var header = res[0].RECEIPTHEADER;
      var lastNo = res[0].LASTRECEIPTNO;
      lastNo = (lastNo + 1) + "";
      var receiptNo = header + "-" + lastNo.padStart(6, "0");
      success(receiptNo);
      updReceiptNo(branchCode, res => {}, err => {});
    } catch (err) {
      console.error("inqReceiptNo", err);
      error("Error Generate Receipt No " + err);
    }
  }, error)
}

export const PrintConst = {
  AMAUN_1: "AMAUN_1", // New Kecuali Resit
  AMAUN_2: "AMAUN_2", // New Kecuali Resit
  AMAUN_TEXT: "AMAUN_TEXT",
  AMAUN_DESC: "AMAUN_DESC",
  NO_RESIT: "NO_RESIT",
  TRANS_NAME: "TRANS_NAME",
  AG_CODE: "AG_CODE",
  ID_PEMBATAL: "ID_PEMBATAL",
  BATAL_PC_ID: "BATAL_PC_ID",
  BATAL_TIME: "BATAL_TIME",
  BATAL_TXN_CODE: "BATAL_TXN_CODE",
}

export function fixJournalPrintParam(formData) {
  let capitalize = [PrintConst.AMAUN_TEXT, PrintConst.TRANS_NAME];
  for (var i in capitalize) {
    let data = formData[capitalize[i]];
    if (typeof data === "string") {
      formData[capitalize[i]] = data.capitalize();
    }
  }

  return formData;
}



// #########################################################
// Backend
export const KelasCek = {
  "0": "Cek Tempatan",
  "1": "Cek Bandar Besar (3 Hari)",
  "2": "Cek Bandar Besar (5 Hari)",
  "3": "Cek Bandar Kecil",
  "4": "Cek Sendiri (Bank In)",
}

export const FieldLen = {
  // utk backend
  //WANG_POS: 28, // cukupkan 28 fill dgn spaces
  //CEK: 23, // 2spaces depan

  CEK: 16, // 2spaces depan
  MIN_CEK: 14,
  K_WANG: 15,
  MIN_K_WANG: 8,
  WANG_POS: 15,
  MIN_WANG_POS: 10,

  AMAUN: 10,
  AGEN_REV_DET: 17,
  KAD_APPRV_CD: 6,
  KAD_RET_REF_NO: 6
}

export const PCS_DET = {
  APPLID: "APPLID",
  TXNSERNO: "TXNSERNO",
  TXNSOURCE: "TXNSOURCE",
  BRANCHCODEJPN: "BRANCHCODEJPN",
  TXNCODE: "TXNCODE",
  TXNDES: "TXNDES",
  TXNDATETIME: "TXNDATETIME",
  TXNMODE: "TXNMODE",
  PAYMSERNO1: "PAYMSERNO1",
  RECEIPTNO: "RECEIPTNO",
  RECEIPTTYPE: "RECEIPTTYPE",
  RECEIPTDATETIME: "RECEIPTDATETIME",
  OPERATORID: "OPERATORID",
  SESSIONDATE: "SESSIONDATE",
  SESSIONNO: "SESSIONNO",
  PAYMENTMODE1: "PAYMENTMODE1",
  PAYMENTMODE2: "PAYMENTMODE2",
  PAYMENTMODE1AMT: "PAYMENTMODE1AMT",
  PAYMENTMODE2AMT: "PAYMENTMODE2AMT",
  SUPERVISORID: "SUPERVISORID",
  SUPERVISORREMARKS: "SUPERVISORREMARKS",
  AGENCYREVNCODECOUNT: "AGENCYREVNCODECOUNT",
  AGENCYREVNCODEDETAILS: "AGENCYREVNCODEDETAILS",
  AGREVENUECODE: "AGREVENUECODE",
  FEEREDUCTIONFLAG: "FEEREDUCTIONFLAG",
  ORIGAGENCYREVNCODEDETAILS: "ORIGAGENCYREVNCODEDETAILS",
  CHQDETAILS1: "CHQDETAILS1",
  CHQDETAILS2: "CHQDETAILS2",
  POCOUNT: "POCOUNT",
  PODETAILS: "PODETAILS",
  CADID: "CADID",
  CARDNO: "CARDNO",
  RETREFNO: "RETREFNO",
  APPROVALCODE: "APPROVALCODE",
  CENTRALCADID: "CENTRALCADID",
  SENDFLAG: "SENDFLAG",
  SENDDATETIME: "SENDDATETIME",
  PAYMSERNO2: "PAYMSERNO2",
  ACKPAYMODE1AMT: "ACKPAYMODE1AMT",
  ACKPAYMODE2AMT: "ACKPAYMODE2AMT",
  COLLSTMTNO1: "COLLSTMTNO1",
  COLLSTMTNO2: "COLLSTMTNO2",
  AGENCYCODEPCS: "AGENCYCODEPCS",
  UPLOADDATETIME: "UPLOADDATETIME",
  REPORTINGBRANCH: "REPORTINGBRANCH",
  SERVICECHARGEAMT: "SERVICECHARGEAMT",
  GSTAMT: "GSTAMT"
}

export const APLN_INFO = {
  APPLID: "APPLID",
  TXNSOURCE: "TXNSOURCE",
  IDTYPE: "IDTYPE",
  IDNO: "IDNO",
  NAME: "NAME",
  ADDRESSLINE1: "ADDRESSLINE1",
  ADDRESSLINE2: "ADDRESSLINE2",
  ADDRESSLINE3: "ADDRESSLINE3",
  ADDRESSLINE4: "ADDRESSLINE4",
  COLLCENTER: "COLLCENTER"
}

export const TGPD_COM = {
  WsName: "InWsTgpdCom",
  GpdApplid: "GpdApplid",
  GpdTxnSrc: "GpdTxnSrc",
  GpdTxnCode: "GpdTxnCode",
  GpdBrchCdJpn: "GpdBrchCdJpn",
  GpdTxnDesc: "GpdTxnDesc",
  GpdTxnDt: "GpdTxnDt", // timestamp
  GpdTxnMode: "GpdTxnMode",
  GpdReceiptNo: "GpdReceiptNo", // running no get from local table branch K18-000123 last 6 is runnning no
  GpdRcptDt: "GpdRcptDt", // timestamp
  GpdOpUid: "GpdOpUid", // oper id

  // same with journal
  GpdTxnTime: "GpdTxnTime", // timestamp

  GpdAplcnId: "GpdAplcnId", // mykad / no dokumen lain
  GpdAplcnIdTy: "GpdAplcnIdTy", // dokumen type
  GpdAplcnName: "GpdAplcnName",
  GpdAplcnAddr1: "GpdAplcnAddr1",
  GpdAplcnAddr2: "GpdAplcnAddr2",
  GpdAplcnAddr3: "GpdAplcnAddr3",
  GpdAplcnAddr4: "GpdAplcnAddr4",

  GpdSessionDt: "GpdSessionDt", // date - today
  GpdSessionNo: "GpdSessionNo",
  GpdRcptType: "GpdRcptType", // K for JPN

  // New Fw 2 - TGPD_COM
  GpdFeeReductFlag: "GpdFeeReductFlag",
  GpdFeeReductAmt: "GpdFeeReductAmt",
  GpdAckPayAmt1: "GpdAckPayAmt1", // kena test jboss boleh terima tak
  GpdAckPayAmt2: "GpdAckPayAmt2",

}



export const TGPD_DYM = {
  WsName: "WsTgpdDyn",
  GpdPymtMode1: "GpdPymtMode1",
  GpdPymtMode2: "GpdPymtMode2",
  GpdPymtMode1Amt: "GpdPymtMode1Amt",
  GpdPymtMode2Amt: "GpdPymtMode2Amt",
  GpdSvrId: "GpdSvrId", // pengecualian
  GpdSvrRemarks: "GpdSvrRemarks", // sebab pengecualian
  GpdSvrRemarksCd: "GpdSvrRemarksCd", // sebab pengecualian code

  // detail utk check letak sini 
  GpdChqDet1: "GpdChqDet1", // cek detal for check or jenis kad for kad
  GpdChqDet2: "GpdChqDet2",

  // kena buat inquiry baru utk dpt kan data dari ref table 17
  GpdAgenCdPcs: "GpdAgenCdPcs", // 265 -- constant
  GpdAgenRevcd: "GpdAgenRevcd", // 71301 agcode  ref021  // 72 -> 17 
  GpdAgenRevcdCnt: "GpdAgenRevcdCnt", // count 
  GpdAgenRevcdDet: "GpdAgenRevcdDet", // 7 + 10 (revcd + pad(amount,"0"))

  // po postal order -- wang pos -- dia satu row je
  GpdPoCnt: "GpdPoCnt", // brapa bnyak wang pos
  GpdPoDet: "GpdPoDet", // append sume kat sini detail dia

  // new column
  // new for kad kredit and debit
  GpdCadId: "GpdCadId", // no terminal
  GpdCardNo: "GpdCardNo", // no kad
  GpdRetRefNo: "GpdRetRefNo", // No Trace / No Invois
  GpdAprvCd: "GpdAprvCd", // Kod Pengesahan
  GpdCtrlCadId: "GpdCtrlCadId", // EPAY_BANK_INFO.BANKSHORTNAME
  GpdSendFlag: "GpdSendFlag",

  // ikut mcm txn dt and txn time
  GpdSendDt: "GpdSendDt",
  GpdSendTime: "GpdSendTime",

  GpdMdrChrgAmt: "GpdMdrChrgAmt", // kira percentage from amount
  GpdGstChrgAmt: "GpdGstChrgAmt", // KK - kira from percentage dari total amount | KD - Y or N

  // 18-9-2018
  // tambah lagiiii
  GpdOriAgenRevcdDet: "GpdOriAgenRevcdDet",
  GpdTxnSelNo: "GpdTxnSelNo"
}

// #########################################################
export const Conf = {
  JUMLAH_AA: 5,
  JPN_AGEN_CD_PCS: 265
}

export const AgCode = {
  AnakAngkat: 71301,
  Kematian: 71301,
  Kelahiran: 71301,
  KahwinCerai: 71304,
  Warganegara: 71305,
  MyKad: 71310,
}

export const numberFormater = (input) => {
  var toRet = "";
  input = input + "";
  var total = null;
  var cent = "";

  if (input.indexOf(".") >= 0) {
    var inputArr = input.split(".");
    total = inputArr[0];
    cent = inputArr[1];
  } else {
    total = input;
  }

  if (cent.length == 0) {
    cent = "00";
  }
  if (cent.length == 1) {
    cent += "0";
  }

  return total + "." + cent;
}

export const numberToWord = (input) => {
  const inWords = (num) => {
    var a = ['', 'satu ', 'dua ', 'tiga ', 'empat ', 'lima ', 'enam ', 'tujuh ', 'lapan ', 'sembilan ', 'sepuluh ', 'sebelas ', 'dua belas ', 'tiga belas ', 'empat belas ', 'lima belas ', 'enam belas ', 'tujuh belas ', 'lapan belas ', 'sembilan belas '];
    var b = ['', '', 'dua puluh', 'tiga puluh', 'empat puluh', 'lima puluh', 'enam puluh', 'tujuh puluh', 'lapan puluh', 'sembilan puluh'];

    if ((num = num.toString()).length > 9) return input;
    var n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = '';
    //str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    //str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'ribu ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'ratus ' : '';
    //str += (n[5] != 0) ? ((str != '') ? 'dan ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + '' : '';
    str += (n[5] != 0) ? ((str != '') ? '' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + '' : '';
    return str;
  }

  input = input + "";
  var total = null;
  var cent = null;
  if (input.indexOf(".") >= 0) {
    var inputArr = input.split(".");
    total = inputArr[0];
    cent = inputArr[1];
  } else {
    total = input;
  }

  var toRet = inWords(total);
  toRet += "ringgit";
  if (cent != null) {
    if (cent.length == 1) {
      cent += "0";
    }
    var centText = inWords(cent);
    if (centText != "") {
      toRet += " " + centText + "sen";
    }
  }

  toRet = toRet + " sahaja";
  var split = toRet.split(" ");
  toRet = "";
  for (var i in split) {
    toRet += split[i].capitalize() + " ";
  }

  return toRet.capitalize();
}

export const ListTableHeader = [
  "Cara Bayaran",
  "No Dokumen / Maklumat Bayaran",
  "Tarikh Dokumen Bayaran",
  "Jumlah (RM)"
];


export const Const = {
  // Jenis Kad
  JKAD_VISA: {
    label: "Visa",
    code: "Kad Kredit Visa",
  },
  JKAD_MASTER: {
    label: "Master",
    code: "Kad Kredit MasterCard",
  },
  JKAD_DEBIT: {
    label: "MyDebit",
    code: "Kad Debit",
  },
  // kod kecualian
  PERLU_BAYARAN: {
    label: "PERLU BAYARAN",
    code: "PERLU_BAYARAN",
  },
  PENGECUALIAN_BAYARAN: {
    label: "PENGECUALIAN BAYARAN",
    code: "PENGECUALIAN_BAYARAN",
  },
  // New Mode SKC
  TIDAK_PERLU_DIBAYAR: {
    label: "TIDAK PERLU DIBAYAR",
    code: "TIDAK_PERLU_DIBAYAR",
  },
  // cara bayaran need to be insert to db as code
  FREE_CHARGE: {
    label: "FREE CHARGE",
    code: "FC",
  },
  FREE_WAIVE: {
    label: "FREE WAIVE",
    code: "FW",
  },
  // cara bayaran need to be displayed in select
  TUNAI: {
    label: "TUNAI",
    code: "TU",
  },
  CEK: {
    label: "CEK",
    code: "CK",
  },
  WANG_POS: {
    label: "WANG POS",
    code: "WP",
  },
  KIRIMAN_WANG: {
    label: "KIRIMAN WANG",
    code: "KW",
  },
  KAD_KREDIT: {
    label: "KAD KREDIT",
    code: "KR",
  },
  KAD_DEBIT: {
    label: "KAD DEBIT",
    code: "KD",
  },
  // not exist yet
  DRAF_BANK: {
    label: "DRAF BANK",
    code: "DB",
  },
  ELECT_TRANS: {
    label: "ELECTRONIC TRANSACTION",
    code: "ET",
  }
}

export function getConstKey(code) {
  for (var i in Const) {
    if (Const[i].code == code) {
      return i;
    }
  }
  return code;
}

export function getConstCode(label) {
  for (var i in Const) {
    if (Const[i].label == label) {
      return Const[i].code;
    }
  }
  return label;
}
export function getConstLabel(code) {
  for (var i in Const) {
    if (Const[i].code == code) {
      return Const[i].label;
    }
  }
  return code;
};

export const CARA_BAYARAN_SINGLE = [Const.TUNAI.code, Const.KAD_DEBIT.code, Const.KAD_KREDIT.code, Const.ELECT_TRANS.code];

export const Dataset = {
  jenis_kad_kredit: [{
      value: "",
      label: SelectDefault
    },
    {
      value: Const.JKAD_VISA.code,
      label: Const.JKAD_VISA.label
    },
    {
      value: Const.JKAD_MASTER.code,
      label: Const.JKAD_MASTER.label
    },
  ],
  jenis_kad_debit: [{
      value: "",
      label: SelectDefault
    },
    {
      value: Const.JKAD_DEBIT.code,
      label: Const.JKAD_DEBIT.label
    }
  ],
  kod_kecualian: [{
      value: "",
      label: SelectDefault
    },
    {
      value: Const.PERLU_BAYARAN.code,
      label: Const.PERLU_BAYARAN.label
    },
    {
      value: Const.PENGECUALIAN_BAYARAN.code,
      label: Const.PENGECUALIAN_BAYARAN.label
    },
    // New Mode SKC
    IS_SKC ? {
      value: Const.TIDAK_PERLU_DIBAYAR.code,
      label: Const.TIDAK_PERLU_DIBAYAR.label
    } : null
  ],
  cara_bayaran: [{
      value: "",
      label: SelectDefault
    },
    {
      value: Const.TUNAI.code,
      label: Const.TUNAI.label
    },
    {
      value: Const.CEK.code,
      label: Const.CEK.label
    },
    {
      value: Const.DRAF_BANK.code,
      label: Const.DRAF_BANK.label
    },
    {
      value: Const.WANG_POS.code,
      label: Const.WANG_POS.label
    },
    {
      value: Const.KIRIMAN_WANG.code,
      label: Const.KIRIMAN_WANG.label
    },
    {
      value: Const.KAD_KREDIT.code,
      label: Const.KAD_KREDIT.label
    },
    {
      value: Const.KAD_DEBIT.code,
      label: Const.KAD_DEBIT.label
    },
    {
      value: Const.ELECT_TRANS.code,
      label: Const.ELECT_TRANS.label
    }
  ]
};


export const FcPopup = {
  TUNAI: ["tunai_perlu", "tunai_diterima", "tunai_baki", "tunai_jumlah"],
  CEK: ["cek_perlu", "cek_no", "cek_tarikh", "cek_amaun"],
  DRAF_BANK: ["db_perlu", "db_no", "db_tarikh", "db_amaun"],
  WANG_POS: ["pos_perlu", "pos_no", "pos_tarikh", "pos_amaun"],
  KIRIMAN_WANG: ["kirim_perlu", "kirim_no", "kirim_tarikh", "kirim_amaun"],
  KAD_KREDIT: ["kk_perlu",
    "kk_no_terminal",
    "kk_jenis_kad",
    "kk_no_kad",
    "kk_no_trace",
    "kk_kod_sah",
    "kk_amaun"
  ],
  KAD_DEBIT: ["kd_perlu",
    "kd_no_terminal",
    "kd_jenis_kad",
    "kd_no_kad",
    "kd_no_trace",
    "kd_kod_sah",
    "kd_amaun"
  ],
  ELECT_TRANS: ["et_perlu", "et_no", "et_tarikh", "et_amaun"],
}

// ####################################################################
// Semak Pemohon
import * as SkcHelper from './skc-helper';

export function isSemakPemohonDisabled(_this, {
  kunciCarian,
}) {
  if (SkcHelper.isKunciCarianValid(_this, kunciCarian.type)) {
    return false;
  } else {
    return true;
  }
}

export function initSemakPemohon(_this, {
  kunciCarian,
  infoPemohon
}) {
  _this.semakPemohonDisabled = true;

  _this.setFormRequired(kunciCarian.kpt, false);
  _this.setFormRequired(kunciCarian.noDok, false);
  _this.setFormRequired(kunciCarian.jenisDok, false);
  _this.setFormRequired(kunciCarian.negaraPeng, false);

  // _this.setFormRequired(kunciCarian.kpt, true);
  // _this.setFormRequired(kunciCarian.noDok, true);
  // _this.setFormRequired(kunciCarian.jenisDok, true);
  // _this.setFormRequired(kunciCarian.negaraPeng, true);
  // _this.setFormDisabled(kunciCarian.kpt, false);
  // _this.setFormDisabled(kunciCarian.noDok, false);
  // _this.setFormDisabled(kunciCarian.jenisDok, false);
  // _this.setFormDisabled(kunciCarian.negaraPeng, false);

  // set info required kpd disabled balik
  for (var i in infoPemohon) {
    //_this.setFormDisabled(infoPemohon[i], true);
    // Fix Rasyid 2019-02-14 (2)
    // bukak field alamat
    _this.setFormDisabled(infoPemohon[i], false);
  }
}


/*
<OutWsSkc>
  <JDokumenPemohon> </JDokumenPemohon>
  <Fid4179Alamat1P> </Fid4179Alamat1P>
  <Fid4181Alamat2P> </Fid4181Alamat2P>
  <Fid4183Alamat3P> </Fid4183Alamat3P>
  <Fid4187PoskodP>00000</Fid4187PoskodP>
  <Fid4193BandarP>00000</Fid4193BandarP>
  <Fid4201NegeriP>0000</Fid4201NegeriP>
  <NamaPemohon />
  <NoDokPemohon> </NoDokPemohon>
  <NoDokumenPemohon> </NoDokumenPemohon>
  <NoKptPemohon> </NoKptPemohon>
</OutWsSkc>
*/
export function semakPemohonOnClick(_this, {
  kunciCarian,
  success,
  error,
}) {
  //this.pertanyaanLoading = true;
  let jenisDok = _this.getFormValue(kunciCarian.jenisDok)
  const LABEL = "PH semakPemohonOnClick";
  let param = {
    InWsSkc: {
      NoKptPemohon: _this.getFormValue(kunciCarian.kpt),
      NoDokumenPemohon: _this.getFormValue(kunciCarian.noDok),
      JDokumenPemohon: jenisDok,
    }
  };

  let isDokumenMalaysia = _this.isFormValueValid(kunciCarian.kpt) ||
    (_this.isFormValueValid(kunciCarian.noDok) && DokumenMalaysia.indexOf(jenisDok) >= 0);

  ApiHelper.soapRequest({
    webService: IsUseWas ? "INQPRSON/INQ_PERSON" : "",
    method: "InqPerson",
    param: param,
    responseEntity: ["OutWsSkc"],
    success: data => {
      console.log(LABEL, "success");
      let rawData = data["OutWsSkc"][0];
      let toRet = {
        kpt: rawData["NoKptPemohon"],
        nama: rawData["NamaPemohon"],
        alamat1: rawData["Fid4179Alamat1P"],
        alamat2: rawData["Fid4181Alamat2P"],
        alamat3: rawData["Fid4183Alamat3P"],
        poskod: rawData["Fid4187PoskodP"],
        bandar: rawData["Fid4193BandarP"],
        negeri: rawData["Fid4201NegeriP"],
      }

      // sanitize data
      if (toRet.poskod == "00000") {
        toRet.poskod = "";
      }
      if (toRet.bandar == "00000") {
        toRet.bandar = "";
      }
      if (toRet.negeri == "0000") {
        toRet.negeri = "";
      }


      toRet.bandar = toRet.bandar.convertToNumberLength(4);
      toRet.negeri = toRet.negeri.convertToNumberLength(2);

      // check if empty - utk case dok malaysia n kpt
      if (isDokumenMalaysia) {
        if (toRet.nama == "" && toRet.alamat1 == "" && toRet.poskod == "") {
          console.log(LABEL, "Error Frontend");
          error("Rekod Tidak Wujud");
          return;
        }
      }

      success(toRet, isDokumenMalaysia);
    },
    error: err => {
      console.log(LABEL, "Error Backend");
      error(err);
    }
  });
}

// ####################################################################
// ####################################################################
// isTxnCode
function isTxnCode(_this, txnCode) {
  return _this.transactionTransCode == txnCode;
}

// ##############################################
// SAA
// bayaran
export function is382000(_this) {
  return isTxnCode(_this, "382000");
}
export function is382008(_this) {
  return isTxnCode(_this, "382008");
}
export function is383000(_this) {
  return isTxnCode(_this, "383000");
}
export function is383008(_this) {
  return isTxnCode(_this, "383008");
}
export function is384000(_this) {
  return isTxnCode(_this, "384000");
}
export function is384008(_this) {
  return isTxnCode(_this, "384008");
}
// ##############################################
// SAA2
// bayaran
export function is381200(_this) {
  return isTxnCode(_this, "381200");
}
export function is381208(_this) {
  return isTxnCode(_this, "381208");
}
export function is383100(_this) {
  return isTxnCode(_this, "383100");
}
export function is383108(_this) {
  return isTxnCode(_this, "383108");
}
export function is383300(_this) {
  return isTxnCode(_this, "383300");
}
export function is383308(_this) {
  return isTxnCode(_this, "383308");
}
export function is384100(_this) {
  return isTxnCode(_this, "384100");
}
export function is384108(_this) {
  return isTxnCode(_this, "384108");
}
export function is382100(_this) {
  return isTxnCode(_this, "382100");
}
export function is382108(_this) {
  return isTxnCode(_this, "382108");
}
// ##############################################
// SKC
// bayaran
export function is341100(_this) {
  return isTxnCode(_this, "341100");
}
export function is341400(_this) {
  return isTxnCode(_this, "341400");
}
export function is341500(_this) {
  return isTxnCode(_this, "341500");
}
export function is342000(_this) {
  return isTxnCode(_this, "342000");
}
// batal
export function is341108(_this) {
  return isTxnCode(_this, "341108");
}
export function is341408(_this) {
  return isTxnCode(_this, "341408");
}
export function is341508(_this) {
  return isTxnCode(_this, "341508");
}
export function is342008(_this) {
  return isTxnCode(_this, "342008");
}
// ##############################################
// SKC2
// bayaran
export function is343100(_this) {
  return isTxnCode(_this, "343100");
}
export function is343300(_this) {
  return isTxnCode(_this, "343300");
}
export function is345000(_this) {
  return isTxnCode(_this, "345000");
}
export function is345100(_this) {
  return isTxnCode(_this, "345100");
}
export function is345600(_this) {
  return isTxnCode(_this, "345600");
}
// batal
export function is343108(_this) {
  return isTxnCode(_this, "343108");
}
export function is343308(_this) {
  return isTxnCode(_this, "343308");
}
export function is345008(_this) {
  return isTxnCode(_this, "345008");
}
export function is345108(_this) {
  return isTxnCode(_this, "345108");
}
export function is345608(_this) {
  return isTxnCode(_this, "345608");
}
// ##############################################
// SKC3
// bayaran
export function is344000(_this) {
  return isTxnCode(_this, "344000");
}
export function is344200(_this) {
  return isTxnCode(_this, "344200");
}
export function is344300(_this) {
  return isTxnCode(_this, "344300");
}
export function is346100(_this) {
  return isTxnCode(_this, "346100");
}
export function is346400(_this) {
  return isTxnCode(_this, "346400");
}
export function is347500(_this) {
  return isTxnCode(_this, "347500");
}
export function is347900(_this) {
  return isTxnCode(_this, "347900");
}

// batal
export function is344008(_this) {
  return isTxnCode(_this, "344008");
}
export function is344208(_this) {
  return isTxnCode(_this, "344208");
}
export function is344308(_this) {
  return isTxnCode(_this, "344308");
}
export function is346108(_this) {
  return isTxnCode(_this, "346108");
}
export function is346408(_this) {
  return isTxnCode(_this, "346408");
}
export function is347508(_this) {
  return isTxnCode(_this, "347508");
}
export function is347908(_this) {
  return isTxnCode(_this, "347908");
}

// #######################################################################
// ############################ HELPER FUNCITON ##########################
export function loadPaymentRevCode(_this, {
  MockData,
  tab2Name,
  txnCode,
  T2_kodAgensi,
  T2_jumlahPerluDibayar,
  T2_kodHasil,
  finishHandler
}) {
  ApiHelper.soapRequest({
    mockData: MockData.OnLoad,
    webService: IsUseWas ?
      "I3820001/I3820001_BAYARAN_PENGANGKATAN" : "SoapSaa20001",
    method: "I3820001BayaranPengangkatan",
    param: {
      InWsRefMappingRevenue: {
        TxnCd: txnCode
      }
    },
    responseEntity: ["OutWsRefRevenue"],
    success: data => {
      // dalam sen
      console.log(data["OutWsRefRevenue"]);
      var revPyment = data["OutWsRefRevenue"][0]["RevPymt"];
      revPyment = Number.parseInt(revPyment) / 100;
      _this.setFormValueByTab(
        tab2Name,
        T2_jumlahPerluDibayar,
        revPyment
      );

      // ag code
      var agensiCd = data["OutWsRefRevenue"][0]["AgTreasuaryCd"];
      agensiCd = Number.parseInt(agensiCd);
      _this.setFormValueByTab(tab2Name, T2_kodAgensi, agensiCd);

      // kod hasil
      var hasilCd = data["OutWsRefRevenue"][0]["RevCd"];
      hasilCd = Number.parseInt(hasilCd);
      _this.setFormValueByTab(tab2Name, T2_kodHasil, hasilCd);

      finishHandler();
    },
    error: err => {
      //_this.pertanyaanLoading = false;
      finishHandler();
      console.error("[loadPaymentConfig]", err);

      // sebab 341100 ada kat getLesenState()
      if (!is341100(_this)) {
        _this.alertError("<h4>Ralat Ref072 Mapping Txn Rev</h4>" + err);
      } else {
        // TO FIX - BAYARAN HARDCODE
        // for now just hardcode je sementara masih belum boleh masuk dlm db2
        // revenue
        _this.setFormValueByTab(tab2Name, T2_jumlahPerluDibayar, 20);

        // ag code
        _this.setFormValueByTab(tab2Name, T2_kodAgensi, "71304");

        // kod hasil
        _this.setFormValueByTab(tab2Name, T2_kodHasil, "4434000");
      }

      // if (!IS_SKC) {
      //   _this.alertError(err);
      // } else {
      //   // TO FIX - BAYARAN HARDCODE
      //   // for now just hardcode je sementara masih belum boleh masuk dlm db2
      //   // revenue
      //   _this.setFormValueByTab(tab2Name, T2_jumlahPerluDibayar, 20);

      //   // ag code
      //   _this.setFormValueByTab(tab2Name, T2_kodAgensi, "71304");

      //   // kod hasil
      //   _this.setFormValueByTab(tab2Name, T2_kodHasil, "4434000");
      // }
    }
  });
}


export function loadPaymentConfig(_this, {
  T1_noPermohonan,
  T1_lesenKutipan,
  MockData,
  tab2Name,
  T2_kodAgensi,
  T2_sessionNo,
  T2_bankShortName,
  T2_gstRate,
  T2_gstStat,
  T2_mdrCreditMaster,
  T2_mdrCreditVisa,
  T2_mdrDebit,
  T2_jumlahPerluDibayar,
  T2_kodHasil,
  T2_sessionStartTime,
  finishLoadHandler,

  // New Kira Servis Charge
  T2_fixedKrVisa,
  T2_fixedKrMaster,
  T2_fixedDebit,
}) {
  _this.setFormRequired(T1_noPermohonan, true);

  if (!_this.isFormValueEmptyByTab(tab2Name, T2_kodAgensi)) {
    return;
  }

  _this.pertanyaanLoading = true;

  var loaded = 0;
  const totalToLoad = 3;
  const finishLoad = () => {
    loaded++;
    if (loaded >= totalToLoad) {
      _this.pertanyaanLoading = false;

      if (finishLoadHandler) {
        finishLoadHandler();
      }
    }
  };

  // #######
  // load from local -- staff session
  let paramSSession = {};
  let curDate = TimeHelper.getDateDbToday();
  curDate =
    curDate.substring(0, 4) +
    "-" +
    curDate.substring(4, 6) +
    "-" +
    curDate.substring(6, 8);

  paramSSession[ApiHelper.LocalActionParam.CurrentDate] = curDate;
  paramSSession[
    ApiHelper.LocalActionParam.BranchCode
  ] = _this.authUser.BRANCH_CODE;
  paramSSession["USERID"] = _this.authUser.OPER_ID;
  paramSSession["SESSIONSTAT"] = "O";

  ApiHelper.localTransRequest(
    ApiHelper.LocalAction.INQ_STAFF_SESSION,
    paramSSession,
    res => {
      let err =
        "Terimaan Bayaran Tidak Boleh Dilakukan. Sesi Telah Ditutup. Sila Buka Sesi Baru Di IJPN";
      if (!isProd) {
        err += "<br><small>(IJPNCMN.IJPN.STAFF_SESSION)</small>";
      }

      let sessionStart = "";
      let sessionNo = "";
      let showErr = false;
      if (res.length <= 0) {
        showErr = true;
        // if (isProd) {
        //   // kalau prod trus show error
        //   showErr = true;
        // } else {
        //   // kalau bukan prod kita letak je mock data
        //   sessionStart = "2019-01-04 15:00:20.0";
        //   sessionNo = 1;
        // }
      } else {
        sessionStart = res[0]["SESSIONSTARTDATETIME"];
        sessionNo = res[0]["SESSIONNO"];
      }

      // set value tp tab 2
      _this.setFormValueByTab(
        tab2Name,
        T2_sessionStartTime,
        sessionStart
      );
      _this.setFormValueByTab(tab2Name, T2_sessionNo, sessionNo);

      if (showErr) {
        _this.alertError(err);
        _this.setFormDisabled(T1_noPermohonan, true);

        if (typeof T1_lesenKutipan !== "undefined") {
          _this.setFormDisabled(T1_lesenKutipan, true);
        }

        _this.pertanyaanDisabled = true;
        _this.setNextTabDisabled();
        _this.pertanyaanLoading = false;
      } else {
        finishLoad();
      }
    },
    err => {
      console.log(err);
      finishLoad();
    }
  );

  // #######
  // load from local -- configuration for kad payment and list of terminal
  inqPaymentCfg(
    _this.authUser.BRANCH_CODE,
    res => {
      var terminalList = [];
      for (var i in res) {
        var r = res[i];

        // create list for ref
        var terminalItem = {};
        terminalItem[RefNewCode] = r["CADID"];
        terminalItem[RefNewDesc] = r["CADID"];

        // New Kira Servis Charge
        if (typeof terminalItem[RefNewCode] === "undefined") {
          terminalItem[RefNewCode] = r["CAD_INFO_CADID"];
          terminalItem[RefNewDesc] = r["CAD_INFO_CADID"];
        }

        terminalList.push(terminalItem);

        if (i == 0) {
          // New Kira Servis Charge
          const COL_FIXED = {
            KR_VISA: "FIXEDMDRCCVISA",
            KR_MASTER: "FIXEDMDRCCMASTER",
            DEBIT: "FIXEDMDRDC",
          }
          r[COL_FIXED.KR_VISA] = typeof r[COL_FIXED.KR_VISA] !== "undefined" ? r[COL_FIXED.KR_VISA] : 0;
          r[COL_FIXED.KR_MASTER] = typeof r[COL_FIXED.KR_MASTER] !== "undefined" ? r[COL_FIXED.KR_MASTER] : 0;
          r[COL_FIXED.DEBIT] = typeof r[COL_FIXED.DEBIT] !== "undefined" ? r[COL_FIXED.DEBIT] : 0;

          // New Kira Servis Charge
          if (typeof T2_fixedKrVisa !== "undefined") {
            _this.setFormValueByTab(
              tab2Name,
              T2_fixedKrVisa,
              r[COL_FIXED.KR_VISA]
            );
          }
          // New Kira Servis Charge
          if (typeof T2_fixedKrMaster !== "undefined") {
            _this.setFormValueByTab(
              tab2Name,
              T2_fixedKrMaster,
              r[COL_FIXED.KR_MASTER]
            );
          }
          // New Kira Servis Charge
          if (typeof T2_fixedDebit !== "undefined") {
            _this.setFormValueByTab(
              tab2Name,
              T2_fixedDebit,
              r[COL_FIXED.DEBIT]
            );
          }

          _this.setFormValueByTab(
            tab2Name,
            T2_bankShortName,
            r["BANKSHORTNAME"]
          );
          _this.setFormValueByTab(
            tab2Name,
            T2_gstRate,
            r["GSTRATE"]
          );
          _this.setFormValueByTab(
            tab2Name,
            T2_gstStat,
            r["DCGSTSTAT"]
          );
          _this.setFormValueByTab(
            tab2Name,
            T2_mdrCreditMaster,
            r["MDRCCMASTER"]
          );
          _this.setFormValueByTab(
            tab2Name,
            T2_mdrCreditVisa,
            r["MDRCCVISA"]
          );
          _this.setFormValueByTab(tab2Name, T2_mdrDebit, r["MDRDC"]);
        }
      }

      _this.transSetRefTable({
        key: "terminalList",
        data: terminalList
      });

      finishLoad();
    },
    err => {
      //_this.pertanyaanLoading = false;
      console.log("inqPaymentCfg", err)
      finishLoad();
      _this.alertError("Error in inqPaymentCfg", JSON.stringify(err));
    }
  );

  loadPaymentRevCode(_this, {
    MockData: MockData,
    tab2Name: tab2Name,
    txnCode: _this.transactionTransCode,
    T2_kodAgensi: T2_kodAgensi,
    T2_jumlahPerluDibayar: T2_jumlahPerluDibayar,
    T2_kodHasil: T2_kodHasil,
    finishHandler: finishLoad
  });
}


export const Config343300 = {
  LUAR_NEGARA: {
    originalTxnCode : "343300",
    code: "3",
    revCode: "4433000",
    revCodeDenda12Bulan: "4433001",
    revCodeDenda1Tahun: "4433002"
  },
  ADAT_AGAMA_LAZIM: {
    originalTxnCode : "343400",
    code: "4",
    revCode: "4434000"
  },
  ORDINAN_1952: {
    originalTxnCode : "343500",
    code: "5",
    revCode: "4435000"
  }
};
