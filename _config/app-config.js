const AppName = "App Name";
const AppDesc = "App Description";
// const AppName = "Kabel Kita";
// const AppDesc = "Benda Boleh Setel";
const isProd = (process.env.NODE_ENV === "production"); // that is deployed to server
const ServerPortDev = "7000";
const SiteUrl = (isProd) ? `https://seedsjobfairapp.com/cf` : `http://localhost:${ServerPortDev}`;
var AssetUrl = (isProd) ? `https://seedsjobfairapp.com/public` : SiteUrl;

console.log("environment - " + process.env.NODE_ENV);
const SocketUrl = (isProd) ? `https://seedsjobfairapp.com/socket` : "http://localhost:6000";

const RootPath = (isProd) ? "/cf" : "";
const AppPath = RootPath + "/app";
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

// const TestUser = [136,
//   137,
//   222, 223, 224, 225, 226, 227, 316, 317, 318, 319,
//   320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334,
//   335, 336, 337, 338, 339, 340, 341, 342
// ];
// const OverrideComingSoonUser = [136, 137]
// const SupportUserID = 681;

// const STORE_AUTH = "HS-APP-STORAGE-AUTH";

module.exports = {
  AppName,
  AppDesc,
  isProd,
  SiteUrl,
  ApiUrl: SiteUrl,
  getImgUploadUrl: (filename) => {
    return AssetUrl + "/upload/img/" + filename;
  }
};
