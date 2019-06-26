// ###################################################
// Indicator

const IsDailyCoEnable = true;
var IsNewHall = true;

// Indicator
// ###################################################

console.log("environment - " + process.env.NODE_ENV);
var isProd = (process.env.NODE_ENV === "production"); // that is deployed to server
var isProdLocal = (process.env.NODE_ENV === "production-local"); // build for local server
const SocketUrl = (isProd) ? `https://seedsjobfairapp.com/socket` : "http://localhost:6000";

const RootPath = (isProd) ? "/cf" : "";
const AppPath = RootPath + "/app";
var SiteUrl = (isProd) ? `https://seedsjobfairapp.com/cf` : "http://localhost:4000";
var AssetUrl = (isProd) ? `https://seedsjobfairapp.com/public` : SiteUrl;
var UploadUrl = AssetUrl + "/upload";
var StaticUrl = AssetUrl + "/static";
var ImageUrl = AssetUrl + "/asset/image";
var DocumentUrl = AssetUrl + "/asset/document";
var AudioUrl = AssetUrl + "/asset/audio";
var DailyCoCreateRoomUrl = SiteUrl + "/daily-co/create-room";


var RootUrl = (process.env.NODE_ENV === "development-wp") ? "http://localhost" : "http://localhost:88";
if (isProd) {
  RootUrl = `https://seedsjobfairapp.com`;
}

var LandingUrl = `https://seedsjobfairapp.com`;

var PHPApi = (isProd) ? `https://seedsjobfairapp.com/php-api/` : RootUrl + `/cf-app/server/php-api/`;
var WPAjaxApi = (isProd) ? "https://seedsjobfairapp.com/career-fair/wp-admin/admin-ajax.php" : RootUrl + "/career-fair/wp-admin/admin-ajax.php";

const AppConfig = {
  Name: `Virtual Career Fair ${(new Date()).getYear() + 1900}`,
  Desc: "Powered by Seeds Job Fair",
  Url: (isProd || isProdLocal) ? PHPApi : "http://localhost:8080",
  Api: SiteUrl,
  PHPApi: PHPApi,
  FbAppId: "315194262317447",
  WPAjaxApi: WPAjaxApi,
  FbUrl: "https://www.fb.com/innovaseedssolutions",
  WwwUrl: "https://seedsjobfairapp.com"
};


const ImgConfig = {
  AppIcon: AssetUrl + "/asset/image/icon-transparent.png",
  IsIcon: AssetUrl + "/asset/image/innovaseed.png",
  IsIconInverse: AssetUrl + "/asset/image/innovaseed_inverse.png",
  DefUser: AssetUrl + "/asset/image/default-user.png",
  DefCompany: AssetUrl + "/asset/image/default-company.jpg",
  DefCompanyBanner: AssetUrl + "/asset/image/default-company-banner.jpg",
  DefUserBanner: AssetUrl + "/asset/image/default-user-banner.jpg",
  getFlag: (country, size) => AssetUrl + `/asset/image/flags/${size}/${country}.png`, // www.icondrawer.com -- flag
  getBanner: (filename) => AssetUrl + `/asset/image/banner/${filename}`,
  getLogo: (filename) => AssetUrl + `/asset/image/logo/${filename}`
};

const TestUser = [136,
  137,
  222, 223, 224, 225, 226, 227, 316, 317, 318, 319,
  320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334,
  335, 336, 337, 338, 339, 340, 341, 342
];
const OverrideComingSoonUser = [136, 137]
const SupportUserID = 681;

const STORE_AUTH = "HS-APP-STORAGE-AUTH";

module.exports = {
  STORE_AUTH,
  IsDailyCoEnable,
  DailyCoCreateRoomUrl,
  SocketUrl,
  LandingUrl,
  DocumentUrl,
  TestUser,
  OverrideComingSoonUser,
  RootPath,
  AppPath,
  StaticUrl,
  SupportUserID,
  SiteUrl,
  AudioUrl,
  UploadUrl,
  AppConfig,
  ImgConfig,
  ImageUrl,
  IsNewHall
};