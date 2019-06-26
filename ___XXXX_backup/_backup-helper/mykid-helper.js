export const MockRawData =
  "00DT84170        181010102066AQILA HUMAIRA BINTI AIDY AKMAL                                                                                                                        PWARGANEGARA      SELANGOR                      52A JALAN BS 1/1              BUKIT SAUJANA                 BANDAR SAUJANA UTAMA          47000SUNGAI BULOH                  SELANGOR                      ISLAM         ISLAM         20181010232900ANDORRA WOMEN AND CHILDREN HOSPITAL     SERI KEMBANGAN SELANGOR                 20181018AQILA HUMAIRA BINTI AIDY AKMAL                                                                                                                        52A JALAN BS 1/1              BUKIT SAUJANA                 BANDAR SAUJANA UTAMA          47000 SUNGAI BULOH                  SELANGOR                      890524045312                                                                 HAZIRAH BINTI KAMARUDZAMAN                                                                                                                            00000029WARGANEGARA            MELAYU                        890721105513                                                                 AIDY AKMAL BIN SABTU                                                                                                                                  00000029WARGANEGARA            MELAYU                        JPN MALAYSIA PUTRAJAYA                            ";
import {
  BranchIp,
  STORE_MYKID,
  isProd,
  MykidExpressRestUrl
} from "../config/app-config";

import {
  soapRequest,
  postRequest,
  localTransRequest,
  LocalAction
} from "../helper/api-helper";

import {
  openWindowPopup,
  closeWindowPopup,
  convertUnderlineToCamelCase
} from "../helper/util-helper";

export function initMykid(_this, {
  kpt,
  success,
  error
}) {
  const ERR = "ERR_MYKID_EJPN__";
  let close = "0";

  // remove existing store if any
  localStorage.removeItem(STORE_MYKID);

  var appUrl =
    BranchIp +
    `/mykid/index.html` +
    `?kpt=${kpt}` +
    `&store=${STORE_MYKID}` +
    `&error=${ERR}` +
    `&close=${close}`;

  // open popup
  var width = 200,
    height = 200,
    top = 50,
    left = 50;
  var windowPopup = openWindowPopup(
    appUrl,
    STORE_MYKID,
    width,
    height,
    top,
    left
  );

  // read from store every 0.5 secs
  var interval = setInterval(() => {
    var raw = localStorage.getItem(STORE_MYKID);

    // debug
    if (!isProd) {
      raw = MockRawData;
      //raw = ERR + "Error Test Debug";
    }

    console.log("check", raw);
    if (raw !== null) {
      windowPopup.close();
      clearInterval(interval);
      if (raw.indexOf(ERR) == 0) {
        error(raw.replaceAll(ERR, ""));
        return;
      }

      if (raw == "") {
        error("Empty Response From Cip");
        return;
      }

      success(raw);
      return;
    }
  }, 500);
}

export function parseMyKidInfo(raw) {
  let err = null;
  let myKid_111 = "";
  let myKid_222 = "";

  if (typeof raw !== "string") {
    err = "Parameter 'raw' is not a string";
  } else if (raw.substr(0, 3) == "IPT") {
    err = raw.substr(0, 7);
  } else {
    myKid_111 = raw.substr(2, 409); //komen if hardcode
    myKid_222 = raw.substring(410, raw.length); //komen if hardcode
  }

  let obj = {
    error: err,

    // child info
    c_birthcertno: myKid_111.substr(0, 15).trim(),
    c_kptno: myKid_111.substr(15, 12).trim(),
    c_name: myKid_111.substr(27, 150).trim(),
    c_gender: myKid_111.substr(177, 1).trim(),
    c_citizenship: myKid_111.substr(178, 17).trim(),
    c_birthstate: myKid_111.substr(195, 30).trim(),
    c_dateofbirth: myKid_222.substr(0, 8).trim(),
    c_timeofbirth: myKid_222.substr(8, 6).trim(),
    c_placeofbirth1: myKid_222.substr(14, 40).trim(),
    c_placeofbirth2: myKid_222.substr(54, 40).trim(),
    c_dateofregister: myKid_222.substr(94, 8).trim(),
    //---
    c_address1: myKid_111.substr(225, 30).trim(),
    c_address2: myKid_111.substr(255, 30).trim(),
    c_address3: myKid_111.substr(285, 30).trim(),
    c_postcode: myKid_111.substr(315, 5).trim(),
    c_city: myKid_111.substr(320, 30).trim(),
    c_state: myKid_111.substr(350, 30).trim(),
    c_registration_loc: myKid_222.substr(984, 50).trim(),
    //---
    c_newnameofchild: myKid_222.substr(102, 149).trim(),
    c_newaddress1: myKid_222.substr(252, 30).trim(),
    c_newaddress2: myKid_222.substr(282, 30).trim(),
    c_newaddress3: myKid_222.substr(312, 30).trim(),
    c_newpostcode: myKid_222.substr(342, 6).trim(),
    c_newcity: myKid_222.substr(348, 30).trim(),
    c_newstate: myKid_222.substr(378, 30).trim(),

    // ##########################################
    // mother info
    m_kpt: myKid_222.substr(408, 12).trim(),
    m_otherid: myKid_222.substr(420, 15).trim(),
    m_doctype: myKid_222.substr(435, 50).trim(),
    m_name: myKid_222.substr(485, 150).trim(),
    //m_dateofbirth: myKid_222.substr(635, 8).trim(),
    m_age: myKid_222.substr(635, 8).trim(),
    m_citizen: myKid_222.substr(643, 23).trim(),
    m_race: myKid_222.substr(666, 30).trim(),
    m_religion: myKid_111.substr(394, 14).trim(),

    // ##########################################
    // father info
    f_kpt: myKid_222.substr(696, 12).trim(),
    f_otherid: myKid_222.substr(708, 15).trim(),
    f_doctype: myKid_222.substr(723, 50).trim(),
    f_name: myKid_222.substr(773, 150).trim(),
    //f_dateofbirth: myKid_222.substr(923, 8).trim(),
    f_age: myKid_222.substr(923, 8).trim(),
    f_citizen: myKid_222.substr(931, 23).trim(),
    f_race: myKid_222.substr(954, 30).trim(),
    f_religion: myKid_111.substr(380, 14).trim()
  };

  return obj;
}

/**
* lepas kemaskini, dapat data from backend, 
1. pastu panggil localTrans untuk insert MDS.MYKIDDBE
2. panggile rest call (Teoh) from MDS server -- dapatkan node package dari teoh
381250, 382070, 387050, 386650, 386550
*/

export const InBMA = "InTbmaMykidApl"
export const OutBMA = "OutTbmaMykidApl";
export const OutBMY = "OutTbmyMykid";



export function updateMykidExpress_restCall(_this, {
  kptNo,
  finishHandler
}) {
  // 2.  panggil rest call (Teoh) from MDS server -----------------------------
  let restData = {
    id: kptNo // c_hscno
  };

  postRequest({
    url: MykidExpressRestUrl,
    data: restData,
    success: data => {
      if (finishHandler) {
        finishHandler();
      }
    },
    error: err => {
      //_this.alertError(err);
      console.error(MykidExpressRestUrl + " " + err);
      if (finishHandler) {
        finishHandler();
      }
    }
  });
}


export function updateMykidExpress_localRequest(_this, {
  data,
  finishHandler
}) {


  // 0. helper function -------------------------------------------------------
  const removeHscIfHasDocType = ({
    param,
    hsc,
    doc_ty
  }) => {
    if (param[doc_ty] != "" && param[doc_ty] != null && typeof param[doc_ty] !== "undefined") {
      param[hsc] = "";
    }
    return param;
  }

  const getValFromDb2 = (obj, db2, defaultVal) => {
    let v = "";
    if (Array.isArray(db2)) {
      for (var i in db2) {
        let vFromArr = obj[db2[i]];
        if (typeof vFromArr !== "undefined") {
          v += vFromArr + " ";
        }
      }
    } else if (typeof db2 === "string") {
      let isTime = db2.toLowerCase().indexOf("time") >= 0;
      let isDate = db2.toLowerCase().indexOf("date") >= 0;
      //console.log(db2, "isTime", isTime, "isDate", isDate);
      // todo kalau ada formating time date tak betul

      v = obj[db2];
    } else if (typeof db2 === "undefined" || db2 === null) {
      v = defaultVal;
    }

    return v;
  }

  // 1. panggil localTrans untuk insert MDS.MYKIDDBE -----------------------------
  let mdsParam = {};

  let bmaObj = data[OutBMA];
  bmaObj = bmaObj[0];
  if (typeof bmaObj === "undefined") {
    console.error(OutBMA + " object not found in response.");
  }

  let bmyObj = data[OutBMY];
  bmyObj = bmyObj[0];
  if (typeof bmyObj === "undefined") {
    console.error(OutBMY + " object not found in response.");
  }


  for (var mssqlCol in MYKIDDBE) {
    let mapObj = MYKIDDBE[mssqlCol];
    let vFromDb2 = "";
    if (mapObj.isBmy == true) {
      vFromDb2 = getValFromDb2(bmyObj, mapObj.db2, mapObj.default);
    } else {
      vFromDb2 = getValFromDb2(bmaObj, mapObj.db2, mapObj.default);
    }

    //replace undefined
    if (typeof vFromDb2 === "undefined") {
      vFromDb2 = "";
    }
    //trim
    vFromDb2 = vFromDb2.trim();

    // pad start
    if (MYKIDDBEConfig.PadZero.indexOf(mssqlCol) >= 0) {
      if (typeof vFromDb2 === "string") {
        vFromDb2 = vFromDb2.padStart(mapObj.len, "0");
      }
    }

    // fix len
    vFromDb2 = vFromDb2.substr(0, mapObj.len)
    mdsParam[mssqlCol] = vFromDb2;
  }

  // fix param hsc no
  mdsParam = removeHscIfHasDocType({
    param: mdsParam,
    hsc: "m_hscno",
    doc_ty: "m_doc_ty",
  })
  mdsParam = removeHscIfHasDocType({
    param: mdsParam,
    hsc: "f_hscno",
    doc_ty: "f_doc_ty",
  })

  console.log("mdsParam", mdsParam);

  localTransRequest(LocalAction.CRT_MDS_MYKID, mdsParam,
    data => {
      let kptNo = mdsParam["c_hscno"];
      updateMykidExpress_restCall(_this, {
        kptNo: kptNo,
        finishHandler: finishHandler
      })
    }, err => {
      //_this.alertError(err);
      console.error(LocalAction.CRT_MDS_MYKID + " " + err);
    });
}

export function updateMykidExpress(_this, {
  aplNo,
  finishHandler
}) {
  if (typeof aplNo === "string") {
    aplNo.replaceAll("-", "");
  }

  let param = {};
  param[InBMA] = {
    BmaAplNo: aplNo
  }

  soapRequest({
    webService: "MYKID/INQ_MYKID_EXPRESS",
    method: "InqMykidExpress",
    param: param,
    responseEntity: [
      OutBMA,
      OutBMY
    ],
    success: (data) => {
      console.log("data");
      updateMykidExpress_localRequest(_this, {
        data: data,
        finishHandler: finishHandler
      })
    },
    error: err => {
      console.error("updateMykidExpress " + err);
    }
  });
}

export const MYKIDDBEConfig = {
  CharNotNull: ["create_date",
    "create_time",
    "c_hscno",
    "apl_no",
  ],
  PadZero: [
    "c_bir_ctry_cd",
    "c_city_code",
    "c_state_code",
    "f_race_code",
    "m_race_code",
    "m_city_code",
    "m_state_code",
    "reg_plc_cd",
    "col_br_cd",
    "c_bir_stadist",
    "m_id_ctry",
  ]
}

export const MYKIDDBE = {
  create_date: {
    db2: "BmaCreDt",
    len: 8
  },
  create_time: {
    db2: "BmaCreTm",
    len: 6
  },
  c_hscno: {
    db2: "BmaHscNo",
    len: 12
  },
  apl_no: {
    db2: "BmaAplNo",
    len: 24
  },
  bc_no: {
    db2: "BmaBcNo",
    len: 15
  },
  c_name: {
    db2: "BmaChdName",
    len: 150
  },
  c_birthdate: {
    db2: "BmaBirthdate",
    len: 8
  },
  c_birthtime: {
    db2: "BmaTimeOfBir",
    len: 6
  },
  c_birthplace: {
    db2: ["BmaBirPlc1", "BmaBirPlc2"],
    len: 80
  },
  c_sex: {
    db2: "BmaBirSexCd",
    len: 1
  },
  c_citizenship: {
    db2: "BmaCitStatCd",
    len: 1
  },
  c_bir_ctry_cd: {
    db2: "BmaBirCtryCd",
    len: 2
  },
  c_address1: {
    db2: "BmaCurAddr1",
    len: 30
  },
  c_address2: {
    db2: "BmaCurAddr2",
    len: 30
  },
  c_address3: {
    db2: "BmaCurAddr3",
    len: 30
  },
  c_postcode: {
    db2: "BmaCurPostcd",
    len: 5
  },
  c_city_code: {
    db2: "BmaCurCityCd",
    len: 4
  },
  c_state_code: {
    db2: "BmaCurStateCd",
    len: 2
  },
  c_cur_name: {
    db2: "BmaCurChdName",
    len: 150
  },
  c_sname1: {
    db2: "BmyShortname1",
    len: 30,
    isBmy: true
  },
  c_sname2: {
    db2: "BmyShortname2",
    len: 30,
    isBmy: true
  },
  c_sname3: {
    db2: "BmyShortname3",
    len: 30,
    isBmy: true
  },
  f_hscno: {
    db2: "BmaFaId",
    len: 12
  },
  f_name: {
    db2: "BmaFaName",
    len: 150
  },
  f_birthdate: {
    db2: "BmaFaBirthdate",
    len: 8
  },
  f_doc_no: {
    db2: "BmaFaId",
    len: 15
  },
  f_doc_ty: {
    db2: "BmaFaIdTy",
    len: 2
  },
  f_res_stat_cd: {
    db2: "BmaFaResStatCd",
    len: 1
  },
  f_race_code: {
    db2: "BmaFaRaceCd",
    len: 4
  },
  f_rel_cd: {
    db2: "BmaFaRelCd",
    len: 1
  },
  m_hscno: {
    db2: "BmaMoId",
    len: 12
  },
  m_name: {
    db2: "BmaMoName",
    len: 150
  },
  m_birthdate: {
    db2: "BmaMoBirthdate",
    len: 8
  },
  m_doc_no: {
    db2: "BmaMoId",
    len: 15
  },
  m_doc_ty: {
    db2: "BmaMoIdTy",
    len: 2
  },
  m_res_stat_cd: {
    db2: "BmaMoResStatCd",
    len: 1
  },
  m_race_code: {
    db2: "BmaMoRaceCd",
    len: 4
  },
  m_rel_cd: {
    db2: "BmaMoRelCd",
    len: 1
  },
  m_address1: {
    db2: "BmaMoAddr1",
    len: 30
  },
  m_address2: {
    db2: "BmaMoAddr2",
    len: 30
  },
  m_address3: {
    db2: "BmaMoAddr3",
    len: 30
  },
  m_postcode: {
    db2: "BmaMoPostcd",
    len: 5
  },
  m_city_code: {
    db2: "BmaMoCityCd",
    len: 4
  },
  m_state_code: {
    db2: "BmaMoStateCd",
    len: 2
  },
  reg_plc_cd: {
    db2: "BmaProPlcCd",
    len: 8
  },
  reg_date: {
    db2: "BmaBirRegDt",
    len: 8
  },
  col_br_cd: {
    db2: "BmaColPlcCd",
    len: 8
  },
  ver_no: {
    db2: "BmaVerNo",
    len: 2
  },
  fa_age: {
    db2: "BmyFaAge",
    len: 3,
    isBmy: true
  },
  mo_age: {
    db2: "BmyMoAge",
    len: 3,
    isBmy: true
  },
  c_bir_stadist: {
    db2: "BmaBirStadistCd",
    len: 4
  },
  c_act_ind: {
    db2: "BmyActInd",
    len: 2,
    isBmy: true
  },
  c_mykid_ind: {
    db2: "BmaMykidInd",
    len: 1
  },
  c_rel_cd: {
    db2: "BmaChdRelCd",
    len: 1
  },
  card_ver_no: {
    db2: "BmaCardVerNo",
    len: 2
  },
  rec_ind: {
    db2: null,
    default: "0",
    len: 1
  },
  m_id_ctry: {
    db2: "BmaMoIdCtry",
    len: 4
  },
  m_name1: {
    db2: "BmaMoName1",
    len: 30
  },
  m_name2: {
    db2: "BmaMoName2",
    len: 30
  },
  m_name3: {
    db2: "BmaMoName3",
    len: 20
  }
};


export function generateMappingMssql() {
  let str = `create_date	Character	8	BMA_CRE_DT
create_time	Character	6	BMA_CRE_TM
c_hscno 	Character	12	BMA_HSC_NO
apl_no 	Character	24	BMA_APL_NO
bc_no 	Character	15	BMA_BC_NO
c_name 	Character	150	BMA_CHD_NAME
c_birthdate 	Character	8	BMA_BIRTHDATE
c_birthtime 	Character	6	BMA_TIME_OF_BIR
c_birthplace 	Character	80	BMA_BIR_PLC1+BMA_BIR_PLC2
c_sex 	Character	1	BMA_BIR_SEX_CD
c_citizenship 	Character	1	BMA_CIT_STAT_CD
c_bir_ctry_cd 	Character	2	BMA_BIR_CTRY_CD
c_address1 	Character	30	BMA_CUR_ADDR1
c_address2 	Character	30	BMA_CUR_ADDR2
c_address3 	Character	30	BMA_CUR_ADDR3
c_postcode 	Character	5	BMA_CUR_POSTCD
c_city_code 	Character	4	BMA_CUR_CITY_CD
c_state_code 	Character	2	BMA_CUR_STATE_CD
c_cur_name 	Character	150	BMA_CUR_CHD_NAME
c_sname1 	Character	30	BMY_SHORTNAME1
c_sname2 	Character	30	BMY_SHORTNAME2
c_sname3 	Character	30	BMY_SHORTNAME3
f_hscno 	Character	12	BMA_FA_ID
f_name 	Character	150	BMA_FA_NAME
f_birthdate 	Character	8	BMA_FA_BIRTHDATE
f_doc_no 	Character	15	BMA_FA_ID
f_doc_ty 	Character	2	BMA_FA_ID_TY
f_res_stat_cd 	Character	1	BMA_FA_RES_STAT_CD
f_race_code 	Character	4	BMA_FA_RACE_CD
f_rel_cd 	Character	1	BMA_FA_REL_CD
m_hscno 	Character	12	BMA_MO_ID
m_name 	Character	150	BMA_MO_NAME
m_birthdate 	Character	8	BMA_MO_BIRTHDATE
m_doc_no 	Character	15	BMA_MO_ID
m_doc_ty 	Character	2	BMA_MO_ID_TY
m_res_stat_cd 	Character	1	BMA_MO_RES_STAT_CD
m_race_code 	Character	4	BMA_MO_RACE_CD
m_rel_cd 	Character	1	BMA_MO_REL_CD
m_address1 	Character	30	BMA_MO_ADDR1
m_address2 	Character	30	BMA_MO_ADDR2
m_address3 	Character	30	BMA_MO_ADDR3
m_postcode 	Character	5	BMA_MO_POSTCD
m_city_code 	Character	4	BMA_MO_CITY_CD
m_state_code 	Character	2	BMA_MO_STATE_CD
reg_plc_cd 	Character	8	BMA_PRO_PLC_CD
reg_date 	Character	8	BMA_BIR_REG_DT
col_br_cd 	Character	8	BMA_COL_PLC_CD
ver_no 	Character	2	BMA_VER_NO
fa_age 	Character	3	BMY_FA_AGE
mo_age 	Character	3	BMY_MO_AGE
c_bir_stadist 	Character	4	BMA_BIR_STADIST_CD
c_act_ind	Character	2	BMY_ACT_IND
c_mykid_ind	Character	1	BMA_MYKID_IND
c_rel_cd 	Character	1	BMA_CHD_REL_CD
card_ver_no 	Character	2	BMA_CARD_VER_NO
m_id_ctry 	Character	4	BMA_MO_ID_CTRY
m_name1 	Character	30	BMA_MO_NAME1
m_name2 	Character	30	BMA_MO_NAME2
m_name3 	Character	20	BMA_MO_NAME3`;

  let arr = str.split("\n");
  let map = {};
  for (var i in arr) {
    let r = arr[i];
    let _temp = r.split("\t");
    let col_mssql = _temp[0].trim();
    let len = Number.parseInt(_temp[2].trim());
    let col_db2 = _temp[3].trim();
    let isBmy = col_db2.indexOf("BMY") >= 0;

    if (col_db2.indexOf("+") >= 0) {
      col_db2 = col_db2.split("+");
      for (var i in col_db2) {
        col_db2[i] = convertUnderlineToCamelCase(col_db2[i]);
      }
    } else {
      col_db2 = convertUnderlineToCamelCase(col_db2);
    }

    map[col_mssql] = {
      db2: col_db2,
      len: len
    };

    if (isBmy) {
      map[col_mssql]["isBmy"] = true;
    }
  }

  console.log(map);
  return map;
}
