// edit from prod
// get build time
import {
  isMigrateCaGenByTxn,
  isMigrateJournalByTxn,
  isResitAutoPrintByTxn,
  isNewSelectByTxn
} from "./migrate-config";
let buildTime = process.env.BUILD_TIME;

//buildTime = 1556185193;

console.log("init buildTime", buildTime)
if (typeof buildTime === "undefined") {
  buildTime = Math.round((new Date()).getTime() / 1000);
}

export const BUILD_TIME = buildTime;
console.log("BUILD_TIME", BUILD_TIME);

/*
process.env.BUILD_PATH
*/
console.log("BUILD_PATH", process.env.BUILD_PATH);


export const isProd = process.env.NODE_ENV == "production";
export const BranchIp = (isProd ? location.origin : "http://localhost:8080");
const Domain = isProd ? location.origin : "http://localhost:8081";
// export const BranchIp = "http://10.23.191.124:8080";
// const Domain = "http://10.23.191.124:8080";

//export const MykidExpressRestUrl = "http://10.23.193.84:95/api/eJPNmyKidExpress";
// ip mds put in server app
export const MykidExpressRestUrl = BranchIp + "/soap-middleware/mykid-mds.jsp";

// dinamik mock data
export const MockDataGetUrl = BranchIp + `/soap-middleware/mock-data-get.jsp`;
export const MockDataCreateUrl = BranchIp + `/soap-middleware/mock-data-create.jsp`;

//export const SoapRefWebService = "SoapWebService";
export const SoapRefWebService = "SoapRefFull";

export const getRefTableAssetUrl = (refCode) => {
  //return "http://10.23.191.124:8080" + `/soap-middleware/get-ref.jsp?ref-code=${refCode}`;
  // FIX STOPPER
  if (!isProd) {
    return BranchIp + `/soap-middleware/get-ref.jsp?ref-code=${refCode}`;
  } else {
    let date = new Date();
    let dateStr = date.getFullYear() + "" + (date.getMonth() + 1) + "" + date.getDate();
    //console.log(date.getDate());
    return BranchIp + `/soap-middleware/ref/ref-${refCode}.xml?date=${dateStr}`;
  }
}

const ALWAYS_TRUE = true;
const ALWAYS_FALSE = false;

export const IsUseWas = isProd ? ALWAYS_TRUE : true;
export const IsUseNewRef = isProd ? ALWAYS_TRUE : true;
export const IsUseMockData = isProd ? ALWAYS_FALSE : false;
export const IsTestingTomcat = isProd ? ALWAYS_FALSE : false; // point ke ejpn-webservice and IsSkipLoadRef true
export const IsSkipLoadRef = isProd ? ALWAYS_FALSE : (IsTestingTomcat ? ALWAYS_TRUE : ALWAYS_FALSE); // discard error load ref

const localWebserviceName = IsTestingTomcat ? "ejpn-webservice" : "home-webservice";
//##################################################################################################

// untuk SKC Prod kita override utk guna mock data for now
//export const IsOverrideUseMockData = isProd && IS_SKC ? true : false;
export const IsOverrideUseMockData = ALWAYS_FALSE;

export const RefNewEntity = "RefEntity";
export const RefNewCode = "Code";
export const RefNewDesc = "Desc";
export const RefNewEtc = "Etc";

export const SoapMiddlewareUrl = (isProd ? location.origin : "http://10.23.191.124:8080") + "/soap-middleware/action.jsp";
//export const SoapMiddlewareUrl = (i0sProd ? location.origin : "http://10.23.171.71:8080") + "/soap-middleware/action.jsp";
//export const SoapMiddlewareUrl = (isProd ? location.origin : "http://10.23.189.90:8080") + "/soap-middleware/action.jsp";

export const ServerConsoleErrorLogUrl = BranchIp + "/soap-middleware/console-error.jsp";
export const ServerUpdateRefUrl = BranchIp + "/soap-middleware/update-server-ref.jsp?updateWas=1";
export const ServerTimeUrl = BranchIp + "/soap-middleware/current-time.jsp";
export const SoapSuccessEntity = "OutWsGeneral";
export const SoapSuccessAttrText = "Char50";
export const SoapErrorEntity = "OutWsError";

//new for skc
export const SoapErrorAttrName = "MessageName";
export const SoapErrorAttrText = "MessageText";
export const SoapErrorAttrIndicator = "MessageIndicator";
export const SoapErrorIndicatorWarning = "2"; // amaran
export const SoapErrorIndicatorError = "1"; //ralat
export const SoapErrorBreakLine = "\\*\\*\\*";

export const AppRoot = isProd ? `${Domain}/jpn-transformasi` : Domain;
export const WebServiceRoot = isProd ? `${Domain}/${localWebserviceName}` : `http://localhost:8080/${localWebserviceName}`;
export const TransRoot = AppRoot + "/#/transaction";
export const PrintingAutoRoot = AppRoot + "/#/printing-auto";

export const SoapUrlRoot = BranchIp + "/axis/services/";
export const HomeWebServiceRoot = BranchIp + `/${localWebserviceName}`;

export const PrintingUrl = BranchIp + `/${localWebserviceName}/print/jpn-printing`;

export const HelpUrl = BranchIp + "/ejpn-help";

export const HomeRoot = `${Domain}/home/#/`;
export const HomePage = `${Domain}/home/#/page/`;

export const AppPath = {
  Asset: AppRoot + "/asset",
  Dataset: AppRoot + "/dataset"
};

export const STORE_AUTH = "JPN-LOCAL-STORAGE-AUTH";
export const STORE_FINGERPRINT = "JPN-LOCAL-STORAGE-FINGERPRINT";
export const STORE_MYKID = "JPN-LOCAL-STORAGE-MYKID";
export const STORE_NAVI = "JPN-LOCAL-STORAGE-NAVI";
export const STORE_ADMIN = "JPN-LOCAL-STORAGE-ADMIN";
export const STORE_OFFSET_TIME = "JPN-LOCAL-STORAGE-OFFSET-TIME";
export const STORE_PRINT_ID = "JPN-LOCAL-STORAGE-PRINT-ID";
export const STORE_PRINT_DATA = "JPN-LOCAL-STORAGE-PRINT-DATA";
export const STORE_UPDATE_REF = "JPN-LOCAL-STORAGE-UPDATE-REF";
