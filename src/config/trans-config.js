import * as TimeHelper from '../helper/time-helper';
import {
  convertBinaryToDec,
  convertDecToHex,
  encodeHtml
} from '../helper/util-helper';
import {
  isProd
} from './app-config';


// 385010, 385036
export const JenisPengangkatan = {
  MAHKAMAH: "1",
  DE_FACTO: "2"
}


export const JenisPengangkatanMahkamah = ["1", "3", "4", "C", "D", "E", "F", "G", "H"]

// 384350
export const KategoriPengujudan = {
  DAFTAR_SEMULA: "1",
  WUJUD_REKOD: "2",
  KEMASKINI_REKOD: "3",
}

// 345350
export const KategoriPengujudanSKC = {
  PERMOHONAN_CARIAN: "1",
  REKOD_BELUM_WUJUD: "2",
}


// 384350
export const JenisPerintah = {
  MAHKAMAH: "1",
  PEJABAT_DAERAH: "2",
}

export const ReserveFcName = {
  IsLesenNegeriAll: "TabGeneralHelper.isLesenNegeriAll",
}

export const DokumenMalaysia = ["01", "03", "05", "07", "10", "91", "92", "93"];
export const DokumenBukanMalaysia = ["02", "28", "29", "30", "99"];
export const DokumenPassport = "02";
export const DokumenKpp = "91";

export const PanggilanTetuan = "PEGUAMBELA DAN PEGUAMCARA";

export const MalaysiaCode = "3000";
export const RekodBkaSah = ["8", "9", "A"];
export const HubunganSendiri = "01";
export const HubunganPenjagaCode = "04"
export const HubunganIbuAngkatCode = "05"
export const HubunganBapaAngkatCode = "06"
export const HubunganIbuDeFacto = "05"
export const HubunganBapaDeFacto = "06"
export const HubunganPeguamCode = "18" // Firma Guaman

// new for skc
export const DokumenKadPengenalanKertas = "94";
export const DokumenKadPengenalanPlastik = "91";
export const DokumenKadPengenalanTinggi = "95";

export const DokumenPolis = "93";
export const DokumenTentera = "92";

export const AgamaTiadaCode = "6";


//export const HubunganPeguamCode = "16" // Firma Guaman

export const NoTel = {
  AnakAngkat: "0388807836/7816/7829/7815/7821"
};

export const JenisBorang = {
  JenisBorangJPN: "4150 PERMOHONAN CARIAN"
};

export const NamaBorang = {
  NamaBorangJPN: "JPN.002"
};

export const TxnPair = {
  341150: 341050,
  341250: 343950
};

export const HasOffline = [
  //SAA
  "385010",
  "385012",
  "382000",
  "382008",
  "383000",
  "383008",
  "384000",
  "384008",
  "385042",
  "381200",
  "381208",
  "385046",
  "383100",
  "383108",
  "383300",
  "383308",
  "385036",
];

export const ModulPindaan = [
  // SAA
  "385012", // Penerimaan Permohonan Pindaan Maklumat Pengangkatan
  "383250", // Permohonan Pindaan Maklumat Pengangkatan Mahkamah (Kesilapan Fakta)
  "383260", // Pengesahan Pindaan Maklumat Pengangkatan Mahkamah (Kesilapan Fakta)
  "383270", // Cetakan Sijil Pindaan Maklumat Pengangkatan Mahkamah
  "386150", // Penyelenggaraan Nombor Siri Sijil Pengangkatan
  "385150", // Pembatalan Daftar dan Cetakan Semula Sijil Pengangkatan
]


//export const SelectDefault = "";
export const SelectDefault = "--SILA PILIH--";

export const HqBranchCode = '16011011';
export const RegisterPlaceDataset = [{
    value: "",
    label: SelectDefault
  },
  {
    value: HqBranchCode,
    label: `${HqBranchCode} - JPN MALAYSIA PUTRAJAYA`
  }
];

export const TransLevel = {
  SAA: "8",
  SKC: "4"
}

export const KemaskiniBerjayaMes = "Kemaskini Telah Berjaya";

export const DuplWs = {
  OutEntity: "OutGWsDuplicate",
  NoKpt: "NoKpt",
  NoDaftarLahir: "NoDaftarLahir",
  NoKpp: "NoKpp",
  Nama: "Nama",
  TarikhLahir: "TarikhLahir",
  DaerahLapor: "DaerahLapor",
  RekodStatus: "RekodStatus",
  StatusPengesahan: "StatusPengesahan",
}

// ##################################################################################
// Web Journal

export const WebJournal = {
  webService: "SoapJournalCreate",
  webServiceWas: "JOURNAL/IJOURNAL_CREATE",
  method: "IjournalCreate",

  // webService: "SoapSaaJournal", 
  // webServiceWas: "SJOURNAL/SAA_JOURNAL",
  // method: "SaaJournal",
}

export const TWTR = {
  InEntity: "InTwtrWebTxn",

  WtrTxnVer: "WtrTxnVer",
  WtrDeptId: "WtrDeptId",
  WtrBrchCd: "WtrBrchCd", //
  WtrTxnDt: "WtrTxnDt", // current timestamp
  WtrMachNo: "WtrMachNo", //
  WtrRefDt: "WtrRefDt", // current timestamp
  WtrRefMachNo: "WtrRefMachNo",
  WtrAplNo: "WtrAplNo", // apllication no
  WtrTxnCode: "WtrTxnCode", //
  WtrTxnOnlInd: "WtrTxnOnlInd",
  WtrPymtInd: "WtrPymtInd",
  WtrConfInd: "WtrConfInd",
  WtrInqInd: "WtrInqInd",
  WtrCreUid: "WtrCreUid", //
  WtrUpdUid: "WtrUpdUid", //
  WtrCreDt: "WtrCreDt", // current timestamp
  WtrUpdDt: "WtrUpdDt", // current timestamp
}



export function twtrAddIndicator(par, transCode) {
  transCode += "";
  let lastChar = transCode[transCode.length - 1];
  let lastChar2 = transCode[transCode.length - 2] + lastChar;

  let pymt = "0";
  let conf = "0";
  let inq = "0";

  // payment indicator
  if (lastChar2 == "00") {
    pymt = "1";
  }

  // confirmation indicator
  if (lastChar2 == "60") {
    conf = "1";
  }

  // inquiry indicator
  // utk SAA assume sume online (FASA 1)
  inq = "1";

  par[TWTR.WtrPymtInd] = pymt;
  par[TWTR.WtrConfInd] = conf;
  par[TWTR.WtrInqInd] = inq;

  return par;
}


export function createTwtrParam(componentThis, data, applNo, customUnix, customTxnCode) {
  var user = componentThis.authUser;
  var par = {}
  par[TWTR.WtrTxnVer] = "1";
  par[TWTR.WtrDeptId] = "1";

  par[TWTR.WtrAplNo] = applNo;
  par[TWTR.WtrBrchCd] = user.BRANCH_CODE;
  par[TWTR.WtrMachNo] = user.PC_ID;
  par[TWTR.WtrTxnDt] = TimeHelper.getDateTimeForSoap(customUnix);
  par[TWTR.WtrRefDt] = par[TWTR.WtrTxnDt];
  par[TWTR.WtrCreDt] = par[TWTR.WtrTxnDt];
  par[TWTR.WtrUpdDt] = par[TWTR.WtrTxnDt];

  // todos
  par[TWTR.WtrTxnCode] = getTransactionTransCode(componentThis);

  if (typeof customTxnCode !== "undefined" && customTxnCode != null) {
    par[TWTR.WtrTxnCode] = customTxnCode;
  }

  // indicator
  par = twtrAddIndicator(par, par[TWTR.WtrTxnCode]);

  par[TWTR.WtrCreUid] = user.OPER_ID;
  par[TWTR.WtrUpdUid] = user.OPER_ID;
  return par;
}

export const TGTX = {
  InEntity: "InTgtxTxnHistory",
  GtxAplNo: "GtxAplNo",
  GtxCertNo: "GtxCertNo"
}


export const TWJR = {
  TxnFldLen: 4000,
  OutEntity: "OutTwjrWebJournal",
  InEntity: "InTwjrWebJournal",
  WjrBrchCd: "WjrBrchCd", // branch code
  WjrTxnDt: "WjrTxnDt", // current timestamp
  WjrCreDt: "WjrCreDt",

  WjrMachNo: "WjrMachNo", //  small int 2 je
  WjrTxnCode: "WjrTxnCode", // 382050
  WjrAplNo: "WjrAplNo", // application no
  WjrIpAddr: "WjrIpAddr", // ip address -- client computer
  WjrOperId: "WjrOpUid", // oper id
  WjrOperCls: "WjrOpCls", // oper class 1 - 16 // small int
  WjrOperLvl: "WjrOpLvl", // oper lvl // 8 byte 11110000
  WjrTxnFld1: "WjrTxnFld1", // form data 1 4000
  WjrTxnFld2: "WjrTxnFld2", // form data 2 4000
  WjrOpHscno: "WjrOpHscno", // oper kpt

  // baru tambah utk spc translog
  WjrTxnMode: "WjrTxnMode",
  WjrTxnVer: "WjrTxnVer",

  WjrRptGrp1: "WjrRptGrp1",
  WjrRptGrp2: "WjrRptGrp2",
  WjrRptGrp3: "WjrRptGrp3",
  WjrRptGrp4: "WjrRptGrp4",
  WjrRptGrp5: "WjrRptGrp5",

  WjrSessionId: "WjrSessionId",

  // utk txn pembatalan 38xx08
  WjrRvsDt: "WjrRvsDt",
  WjrRvsMachNo: "WjrRvsMachNo",
  WjrRvsCode: "WjrRvsCode",
  WjrAuthId: "WjrAuthId",
  WjrAuthLvl: "WjrAuthLvl",
  WjrAuthCls: "WjrAuthCls",

  WjrDeptId: "WjrDeptId", // 1

  WjrTdfInd1: "WjrTdfInd1",
  WjrTdfInd2: "WjrTdfInd2",
  WjrTxnInd1: "WjrTxnInd1",

  WjrReceiptNo: "WjrReceiptNo",

  WjrTxnOnlInd: "WjrTxnOnlInd",
  WjrAmtCtr: "WjrAmtCtr",
  WjrAmtLen: "WjrAmtLen",
  WjrVflLen: "WjrVflLen",
}



/**
 * 
WJR_TXN_VER smallint NOT NULL,
WJR_DEPT_ID smallint NOT NULL,
WJR_MACH_NO smallint NOT NULL,
WJR_RVS_MACH_NO smallint NOT NULL,
WJR_SESSION_ID smallint NOT NULL,
WJR_RVS_CODE smallint NOT NULL,
WJR_OP_CLS smallint NOT NULL,
WJR_AUTH_CLS smallint NOT NULL,
WJR_AMT_CTR smallint NOT NULL,
WJR_AMT_LEN smallint NOT NULL,
WJR_TXN_ONL_IND smallint NOT NULL,
WJR_VFL_LEN int NOT NULL,

WJR_BRCH_CD char(8) NOT NULL,
WJR_APL_NO char(24) NOT NULL,
WJR_IP_ADDR char(16) NOT NULL,
WJR_TXN_MODE char(1) NOT NULL,
WJR_TXN_CODE char(6) NOT NULL,
WJR_TXN_FLD1 varchar(4094) NOT NULL,
WJR_OP_UID char(8) NOT NULL,
WJR_OP_LVL char(8) NOT NULL,
WJR_AUTH_ID char(8) NOT NULL,
WJR_AUTH_LVL char(8) NOT NULL,
WJR_OP_HSCNO char(12) NOT NULL,

WJR_TXN_DT datetime(3) NOT NULL,
WJR_RVS_DT datetime(3) NOT NULL,
WJR_CRE_DT datetime(3) NOT NULL,

 */
export const TwjrConfig = {
  CharCaseInsensitive: [
    TWJR.WjrTxnFld2
  ],
  IntNotNull: [
    TWJR.WjrTxnVer,
    TWJR.WjrDeptId,
    TWJR.WjrMachNo,
    TWJR.WjrRvsMachNo,
    TWJR.WjrSessionId,
    TWJR.WjrRvsCode,
    TWJR.WjrOperCls,
    TWJR.WjrAuthCls,
    TWJR.WjrAmtCtr,
    TWJR.WjrTxnOnlInd,
    TWJR.WjrAmtLen,
    TWJR.WjrVflLen,
  ],
  CharNotNull: [
    TWJR.WjrBrchCd,
    TWJR.WjrAplNo,
    TWJR.WjrIpAddr,
    TWJR.WjrTxnMode,
    TWJR.WjrTxnCode,
    TWJR.WjrTxnFld1,
    TWJR.WjrOperId,
    TWJR.WjrOperLvl,
    TWJR.WjrAuthId,
    TWJR.WjrAuthLvl,
    TWJR.WjrOpHscno,
  ],
  DateTimeNotNull: [
    TWJR.WjrTxnDt,
    TWJR.WjrRvsDt,
    TWJR.WjrCreDt,
  ]
}

// dalam db dia smallint
export function twjrAddIndicator(par, transCode) {

  transCode += "";
  let lastChar = transCode[transCode.length - 1];
  let lastChar2 = transCode[transCode.length - 2] + lastChar;
  let isTxnBayar = lastChar2 == "00";

  // FIX PILOT
  let isTxnBatal = lastChar2 == "08";

  let isModulBayar = isTxnBayar || isTxnBatal;
  let isTxnOffline = HasOffline.indexOf(transCode) >= 0;
  let isTxnCorrection = ModulPindaan.indexOf(transCode) >= 0;

  // ########################################################
  // Tdf Ind 1
  let tdfInd1_arr = ["0", "0", "0", "0", "0", "0", "0", "0"];

  // 0. reversal txn
  if (isTxnBatal) {
    tdfInd1_arr[0] = "1";
  }

  // 1. only update the branch server
  // do nothing

  // 2. update both branch and central database
  if (isTxnOffline) {
    tdfInd1_arr[2] = "1";
  }

  // 3. requires authorisation
  if (isTxnBatal) {
    tdfInd1_arr[3] = "1";
  }

  // 4. financial txn
  if (isModulBayar) {
    tdfInd1_arr[4] = "1";
  }

  // 5. Do not generate financial receipt number
  if (isModulBayar) {
    tdfInd1_arr[5] = "1";
  }

  // 6. txn is image and flow (NOT USED) - set to 0
  // do nothing

  // 7. (NOT USED) - set to 0
  // do nothing

  // ########################################################
  // Tdf Ind 2
  let tdfInd2_arr = ["0", "0", "0", "0", "0", "0", "0", "0"];

  // 0. reversal txn can be done
  if (isTxnBayar) {
    tdfInd2_arr[0] = "1";
  }

  // 1. Txn can be done even if Offline during inquiry
  if (isTxnOffline) {
    tdfInd2_arr[1] = "1";
  }

  // 2. txn can be done only Online during inquiry
  if (!isTxnOffline) {
    tdfInd2_arr[2] = "1";
  }

  // 3. this txn can be have a reentry txn. (NOT USED) - 0
  // do nothing

  // 4. this txn can be cancelled by host (NOT USED) - 0 
  // do nothing

  // 5. thix txn can be a backdated txn (NOT USED) - 0
  // do nothing

  // 6. thix txn can be an error correction txn (NOT USED) - 0
  // do nothing

  // 7. this txn can be performed w/o connection to branch (Standalone) (NOT USED) - 0
  // do nothing

  // ########################################################
  // Txn Ind 1
  let txnInd1_arr = ["0", "0", "0", "0", "0", "0", "0", "0"];

  // 0. dh upload ke host - 1 | blum upload ke host - 0
  txnInd1_arr[0] = "1";

  // 1. was updated to host online - 1 |  was updated offline - 0
  txnInd1_arr[1] = "1";

  // 2. performed in TRAINING mode - 1 | performed in PRODUCTION mode - 0
  txnInd1_arr[2] = "0";

  // 3. performed in error correction mode - 1 | NOT performed in error correction mode - 0
  // pindaan ?
  if (isTxnCorrection) {
    txnInd1_arr[3] = "1";
  }


  // 4. (NOT USED) - 0
  // do nothing

  // 5. performed using online validate - 1 | NOT used online validate - 0 (NOT USED) - 0
  // do nothing

  // 6. performed stand alone, no access to server - 1 | not performed stand alone - 0 (NOT USED)
  // do nothing

  // 7. performed in TRAINING mode - 1 | performed in PRODUCTION mode - 0
  txnInd1_arr[7] = "0";

  // console.log("lastChar", lastChar);
  // console.log("lastChar2", lastChar2);
  // console.log("tdfInd1_arr", tdfInd1_arr);
  // console.log("tdfInd2_arr", tdfInd2_arr);
  // console.log("txnInd1_arr", txnInd1_arr);

  let tdfInd1_str = "";
  let tdfInd2_str = "";
  let txnInd1_str = "";

  for (var i in tdfInd1_arr) {
    tdfInd1_str += tdfInd1_arr[i];
    tdfInd2_str += tdfInd2_arr[i];
    txnInd1_str += txnInd1_arr[i];
  }

  par[TWJR.WjrTdfInd1] = convertBinaryToDec(tdfInd1_str);
  par[TWJR.WjrTdfInd2] = convertBinaryToDec(tdfInd2_str);
  par[TWJR.WjrTxnInd1] = convertBinaryToDec(txnInd1_str);

  return par;
}

function helperGetMode(transCode) {
  transCode += "";
  let lastChar = transCode[transCode.length - 1];
  let lastChar2 = transCode[transCode.length - 2] + lastChar;

  let mode = "";
  // FIX PILOT
  if (lastChar2 == "08") {
    mode = "R" // reversal
  } else if (ModulPindaan.indexOf(transCode) >= 0) {
    mode = "C" // correction
  } else {
    mode = "N" // normal
  }

  return mode;
}

export function twjrAddMode(par, transCode) {
  let mode = helperGetMode(transCode);
  par[TWJR.WjrTxnMode] = mode;
  return par;
}

// NewAddReceiptToWjrReceiptNo
export function twjrAddReceipt(_this, par, transCode) {
  transCode += "";
  let lastChar = transCode[transCode.length - 1];
  let lastChar2 = transCode[transCode.length - 2] + lastChar;

  if (lastChar2 == "00") {
    if (!_this.isFormValueEmpty(TWJR.WjrReceiptNo)) {
      par[TWJR.WjrReceiptNo] = _this.getFormValue(TWJR.WjrReceiptNo)
    }
  }

  return par;
}

export function twjrAddPembatalan(_this, par, transCode) {
  transCode += "";
  let lastChar = transCode[transCode.length - 1];
  let lastChar2 = transCode[transCode.length - 2] + lastChar;

  // FIX PILOT
  if (lastChar2 == "08") {
    if (!_this.isFormValueEmpty(TWJR.WjrAuthId)) {
      par[TWJR.WjrAuthId] = _this.getFormValue(TWJR.WjrAuthId)
    }
    if (!_this.isFormValueEmpty(TWJR.WjrAuthCls)) {
      par[TWJR.WjrAuthCls] = _this.getFormValue(TWJR.WjrAuthCls)
    }
    if (!_this.isFormValueEmpty(TWJR.WjrAuthLvl)) {
      par[TWJR.WjrAuthLvl] = _this.getFormValue(TWJR.WjrAuthLvl)
    }

    // tak tau nk letak apa
    par[TWJR.WjrRvsCode] = "0";

    par[TWJR.WjrRvsDt] = par[TWJR.WjrTxnDt];
    par[TWJR.WjrRvsMachNo] = _this.authUser.PC_ID;
  }

  return par;
}

export function twjrAddRptGroup(_this, par, transCode, txnData) {
  transCode += "";
  let lastChar = transCode[transCode.length - 1];
  let lastChar2 = transCode[transCode.length - 2] + lastChar;

  // ##############################################
  // add Report Group 1
  try {
    // lulus - 1 | Tangguh,KIV,gagal - 3
    const STS_LULUS = "1";
    const STS_TAK_LULUS = "3";
    let rptGrp1 = null;
    if (transCode == "382060") {
      // "F8145"
      let status = _this.getFormValueByTab("T382060_T8", _this.FC.T8.statusKelulusan);
      rptGrp1 = status == "1" ? STS_LULUS : STS_TAK_LULUS;
    }

    if (rptGrp1 != null) {
      par[TWJR.WjrRptGrp1] = rptGrp1;
    }
  } catch (err) {}

  // ##############################################
  // add Report Group 2
  // Email Kak Kam 23 Oct 2018
  let rptGrp1 = null;
  let rptGrp2 = null;
  let rptGrp3 = null;

  // ####################################
  // SAA Fasa 1
  if (transCode == "382070") {
    rptGrp2 = "81";
  }
  if (transCode == "384050") {
    rptGrp2 = "80";
  }
  if (transCode == "385150") {
    rptGrp2 = "80";
  }

  // ####################################
  // SAA Fasa 2
  if (transCode == "381250") {
    rptGrp2 = "81";
  }

  // ####################################
  // SKC Fasa 1
  if (transCode == "347050") {
    // SKC Fasa 2
    let jenisCetakan = txnData["Fid1275JCetakan"];
    let jenisCabutan = txnData["Fid8147SemakanJCabutan"];

    console.log("WjrRptGrp >> jCetak - jCabutan", jenisCetakan, jenisCabutan);

    if (jenisCetakan == "1") {
      rptGrp3 = "41";
    } else if (jenisCetakan == "2") {
      rptGrp2 = "43";
    } else if (jenisCetakan == "5") {
      rptGrp2 = "45";
    } else if (jenisCetakan == "6") {
      if (jenisCabutan == "3") {
        rptGrp2 = "46";
      }
    } else if (["4", "7", "8", "9", "10", "11"].indexOf(jenisCetakan) >= 0) {
      if (jenisCabutan == "1") {
        rptGrp2 = "42";
      } else if (jenisCabutan == "2") {
        rptGrp2 = "44";
      }
    }
  }
  if (transCode == "341450") {
    rptGrp2 = "40";
  }
  if (transCode == "347850") {
    //rptGrp2 = "0";
  }
  if (transCode == "347450") {
    rptGrp2 = "40";
  }
  if (transCode == "341560") {
    rptGrp2 = "41";
  }
  if (transCode == "341550") {
    //rptGrp2 = "0";
  }

  // ####################################
  // SKC Fasa 2
  if (transCode == "343360") {
    let jenisKahwin = txnData["Fid4943JenisPerkahwinan"];
    let keputusan = txnData["Fid1813Keputusan"];

    if (jenisKahwin == "3") {
      rptGrp1 = "42";
    } else if (jenisKahwin == "4") {
      rptGrp1 = "43";
    } else if (jenisKahwin == "5") {
      rptGrp1 = "44";
    } else {
      rptGrp1 = "0";
    }

    if (keputusan == "T") {
      rptGrp1 = "40";
    }

    // rptGrp2 = "0";
  }
  if (transCode == "345060") {
    let jenisCabutan = txnData["Fid4515SemakanJenisCetakan"];
    if (jenisCabutan == "1") {
      rptGrp2 = "42";
    } else if (jenisCabutan == "2") {
      rptGrp2 = "44";
    } else if (jenisCabutan == "3") {
      rptGrp2 = "46";
    }
  }

  if (rptGrp2 != null) {
    par[TWJR.WjrRptGrp2] = rptGrp2
  }
  if (rptGrp3 != null) {
    par[TWJR.WjrRptGrp3] = rptGrp3
  }

  return par
}

export function fixTwjrSpecialChar(str) {
  str = str.replace(`":null,`, `":"",`);
  str = str.replace(`":false,`, `":"false",`);
  str = str.replace(`":true,`, `":"true",`);
  return str;
}

export function createTwjrParam(componentThis, data, applNo, customUnix, customTxnCode) {
  var user = componentThis.authUser;

  var par = {}
  var operCls = componentThis.transactionTransClass;
  var operLvl = user["OPER_LVL" + operCls];

  par[TWJR.WjrAplNo] = applNo;
  par[TWJR.WjrBrchCd] = user.BRANCH_CODE;
  par[TWJR.WjrOpHscno] = user.KPT_NO;

  // current time
  par[TWJR.WjrTxnDt] = TimeHelper.getDateTimeForSoap(customUnix);

  //buang dulu. takpe ke
  // kalau buang nnti error kat local
  // so local kena letak
  if (!isProd) {
    par[TWJR.WjrRvsDt] = par[TWJR.WjrTxnDt];
  }

  par[TWJR.WjrCreDt] = par[TWJR.WjrTxnDt];
  //"20180812151515000000"; //yyyyMMddHHmmssSSSSSS

  par[TWJR.WjrMachNo] = user.PC_ID;
  par[TWJR.WjrOperId] = user.OPER_ID;
  par[TWJR.WjrOperCls] = operCls;
  par[TWJR.WjrOperLvl] = operLvl;

  // todos
  var transCode = getTransactionTransCode(componentThis);

  if (typeof customTxnCode !== "undefined" && customTxnCode != null) {
    transCode = customTxnCode;
  }
  // small int, 4 only
  //transCode = transCode.substring(2);
  par[TWJR.WjrTxnCode] = Number.parseInt(transCode);


  // ip address
  par[TWJR.WjrIpAddr] = window.location.host;
  par[TWJR.WjrIpAddr] = par[TWJR.WjrIpAddr].substring(0, 16);

  par[TWJR.WjrTxnVer] = "1";
  par[TWJR.WjrDeptId] = "1";

  par = twjrAddRptGroup(componentThis, par, transCode, data);
  par = twjrAddPembatalan(componentThis, par, transCode);
  par = twjrAddReceipt(componentThis, par, transCode); // NewAddReceiptToWjrReceiptNo
  par = twjrAddMode(par, transCode);
  par = twjrAddIndicator(par, transCode);

  // txn field
  var txnFld = JSON.stringify(data);

  // new to preven error in JSON parse
  // IsOfflineEnable
  txnFld = fixTwjrSpecialChar(txnFld);

  // bug fix offline tak masuk
  txnFld = encodeHtml(txnFld);

  var txnFld1 = "";
  var txnFld2 = "";
  if (txnFld.length > TWJR.TxnFldLen) {
    // first part
    txnFld1 = txnFld.substring(0, TWJR.TxnFldLen);
    // second part
    txnFld2 = txnFld.substring(TWJR.TxnFldLen);
  } else {
    txnFld1 = txnFld;
  }

  par[TWJR.WjrTxnFld1] = txnFld1;
  par[TWJR.WjrTxnFld2] = txnFld2;

  return par;
}


export const SBTxnInfoWs = {
  webService: "SoapSaaSirenbis",
  method: "SirenbisTxnInfo",
  InEntity: "InWsTxnInfo",
  ExtInd: "ExtInd",
  ApplNo: "ApplNo",
  TxnTimeIn: "TxnTimeIn", // time login utk transaction
  AuthId: "AuthId",
  OperId: "OperId",
  TxnCode: "TxnCode", // binary (3)
  TxnMode: "TxnMode",
  BranchCode: "BranchCode",
  TimeMachNo: "TimeMachNo",
  TxnTimeOut: "TxnTimeOut", // time habis transaction. habis kemaskini
  TxnDate: "TxnDate", // tarikh semasa
}

export const SirenBis = {
  //TimeMachNo: "TimeMachNo",

  ExtInd: "ext_ind",
  ApplNo: "appl_no",
  TxnDate: "txn_date", // tarikh semasa -- date today
  TxnTimeIn: "txn_time_in", // time login utk transaction - time sahaja - 074239
  TxnTimeOut: "txn_time_out", // time habis transaction. habis kemaskini - time sahaja - 074239
  AuthId: "auth_id",
  OperId: "oper_id",
  TxnMode: "txn_mode",
  BranchCode: "branch_code",
  TxnCode: "txn_code", // binary (3) -- hex
  TxnMachNo: "txn_mach_no", // -- hex
}

export function sirenAddAuthId(_this, par, transCode) {
  transCode += "";
  let lastChar = transCode[transCode.length - 1];
  let lastChar2 = transCode[transCode.length - 2] + lastChar;

  if (lastChar2 == "08") {
    if (!_this.isFormValueEmpty(TWJR.WjrAuthId)) {
      par[SirenBis.AuthId] = _this.getFormValue(TWJR.WjrAuthId)
    }
  }

  if (typeof par[SirenBis.AuthId] === "undefined") {
    par[SirenBis.AuthId] = "";
  }

  return par;
}


// used to insert txn code in Siren
export function getTransactionTransCode(_this) {
  let oriTxnCode = _this.transactionTransCode;

  // bayaran - luar negara / adat / ordinan
  if (oriTxnCode == "343300") {
    return _this.getFormValueGlobal("T343300_T1", _this.FC.T1.txnCodeOriginal3300);
  }

  // pembatalan bayaran - luar negara / adat / ordinan
  // 343300, 343400, 343500
  if (oriTxnCode == "343308") {
    let txnBayaran = _this.getFormValueGlobal("T343308_T2", _this.FC.T2.txnCodeOriginal3300);
    if (typeof txnBayaran === "string") {
      txnBayaran = txnBayaran.replaceAll("00", "08")
    }
    return txnBayaran;
  }

  if (oriTxnCode == "343350") {
    let jenMar = _this.getFormValueGlobal("T343350_T1", _this.FC.T1.jenisPerkahwinan);
    let txnCode = "";

    if (jenMar == "3") {
      txnCode = "343350";
    } else if (jenMar == "4") {
      txnCode = "343450";
    } else if (jenMar == "5") {
      txnCode = "343550";
    }

    return txnCode;
  }



  if (oriTxnCode == "343360") {
    let marType = _this.getFormValueGlobal("T343360_T1", _this.FC.T1.jenisPerkahwinan);
    let txnCode = "";

    if (marType == "3") {
      txnCode = "343360";
    } else if (marType == "4") {
      txnCode = "343460";
    } else if (marType == "5") {
      txnCode = "343560";
    }

    return txnCode;
  }

  // sham modify 30/5/2019
  if (oriTxnCode == "343150") {
    return _this.getFormValueGlobal("T343150_T1", _this.FC.T1.hiddenTxnCode);
  }
  // sham modify 30/5/2019
  if (oriTxnCode == "343160") {
    return _this.getFormValueGlobal("T343160_T1", _this.FC.T1.hiddenTxnCode);
  }

  return oriTxnCode;
}



export function createSirenBisParam(_this, {
  noPermohonan
}) {

  let data = {};

  // todos
  let transCode = getTransactionTransCode(_this);

  let startTime = _this.getStartTime();
  startTime = startTime.substr(11);
  startTime = startTime.replaceAll(":", "");

  let endTime = _this.getEndTime();
  endTime = endTime.substr(11);
  endTime = endTime.replaceAll(":", "");

  data[SirenBis.ExtInd] = "0";
  data[SirenBis.ApplNo] = noPermohonan;
  data[SirenBis.TxnDate] = TimeHelper.getDateDbToday();
  data[SirenBis.TxnTimeIn] = startTime;
  data[SirenBis.TxnTimeOut] = endTime;
  //data[SirenBis.AuthId] = typeof authId === "undefined" ? "" : authId;
  data[SirenBis.OperId] = _this.authUser.OPER_ID;
  data[SirenBis.TxnMode] = helperGetMode(transCode);
  data[SirenBis.BranchCode] = _this.authUser.BRANCH_CODE;

  // hex
  // data[SirenBis.TxnCode] = "0x" + convertDecToHex(transCode);
  // data[SirenBis.TxnMachNo] = "0x" + convertDecToHex(_this.authUser.PC_ID);
  data[SirenBis.TxnCode] = "0x" + transCode;

  try {
    data[SirenBis.TxnMachNo] = "0x" + _this.authUser.PC_ID.convertToNumberLength(2);
  } catch (err) {
    data[SirenBis.TxnMachNo] = "0x00";
  }

  data = sirenAddAuthId(_this, data, transCode);

  return data;
}
