webpackJsonp([1],{"0+/4":function(t,e,a){const n=a("mtWM"),{AppConfig:s,StaticUrl:r}=a("2p8J"),o=a("mw3O"),i=s.Api+"/graphql?",l=function(t,e){return null!==e&&(void 0===t.response&&(t.response={}),t.response.data=e,"undefined"!=typeof alert?alert(e):console.error(e),Promise.reject(t))};function c(t){var e={headers:{"Content-Type":"application/x-www-form-urlencoded"},proxy:!1,params:{query:t,variables:null}};return n.post(i,{},e)}n.interceptors.response.use(t=>{var e=null;return t.config.url==i&&t.data.errors&&(e=`[GraphQL Error] ${t.data.errors[0].message}`),null!==e?l(t,e):t},t=>{var e=null;try{t.response.config.url==i&&(e=`[GraphQL Error] ${t.response.data.errors[0].message}`)}catch(a){e=`[Server Error] ${e=void 0===t.code?t.message:`${t.code} ${t.address}:${t.port}`}`}return null!==e?l(t,e):Promise.reject(t)}),t.exports={deleteAxios:function(t,e){var a={proxy:!1};return void 0!==e&&(a.headers=e),n.delete(t,a)},postAxios:function(t,e,a){var s={proxy:!1};return void 0!==a&&(s.headers=a),n.post(t,JSON.stringify(e),s)},getStaticAxios:function(t,e=null){var a=`${r}/${t}`;return null!==e&&(a+=`?v=${e}`),n.get(a,{proxy:!1}).then(t=>t.data,t=>{l(t,`Failed To Load Static Asset - ${a}`)})},getAxiosGraphQLQuery:c,graphql:function(t){return c(t).then(t=>t.data.data)},getPHPApiAxios:function(t,e){var a=s.PHPApi+`${t}.php`;return console.log(a),n.post(a,o.stringify(e),{proxy:!1})},getWpAjaxAxios:function(t,e,a=null,r=!1){var i={};return r?i=e:i.data=e,i.action=t,n.post(s.WPAjaxApi,o.stringify(i),{proxy:!1}).then(t=>{if(t.data.err)return t.data.err;var e=t.data.data;return void 0===e&&(e=t.data),null!==a&&a(e),e},t=>t.response.data)}}},"0SN5":function(t,e){},"2p8J":function(t,e,a){console.log("environment - production");var n="https://seedsjobfairapp.com/cf",s="https://seedsjobfairapp.com/public";var r="https://seedsjobfairapp.com/php-api/";const o={Name:`Virtual Career Fair ${(new Date).getYear()+1900}`,Desc:"Powered by Seeds Job Fair",Url:r,Api:n,PHPApi:r,FbAppId:"315194262317447",WPAjaxApi:"https://seedsjobfairapp.com/career-fair/wp-admin/admin-ajax.php",FbUrl:"https://www.fb.com/innovaseedssolutions",WwwUrl:"https://seedsjobfairapp.com"},i={AppIcon:s+"/asset/image/icon-transparent.png",IsIcon:s+"/asset/image/innovaseed.png",IsIconInverse:s+"/asset/image/innovaseed_inverse.png",DefUser:s+"/asset/image/default-user.png",DefCompany:s+"/asset/image/default-company.jpg",DefCompanyBanner:s+"/asset/image/default-company-banner.jpg",DefUserBanner:s+"/asset/image/default-user-banner.jpg",getFlag:(t,e)=>s+`/asset/image/flags/${e}/${t}.png`,getBanner:t=>s+`/asset/image/banner/${t}`,getLogo:t=>s+`/asset/image/logo/${t}`};t.exports={STORE_AUTH:"HS-APP-STORAGE-AUTH",IsDailyCoEnable:!0,DailyCoCreateRoomUrl:"https://seedsjobfairapp.com/cf/daily-co/create-room",SocketUrl:"https://seedsjobfairapp.com/socket",LandingUrl:"https://seedsjobfairapp.com",DocumentUrl:"https://seedsjobfairapp.com/public/asset/document",TestUser:[136,137,222,223,224,225,226,227,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342],OverrideComingSoonUser:[136,137],RootPath:"/cf",AppPath:"/cf/app",StaticUrl:"https://seedsjobfairapp.com/public/static",SupportUserID:681,SiteUrl:n,AudioUrl:"https://seedsjobfairapp.com/public/asset/audio",UploadUrl:"https://seedsjobfairapp.com/public/upload",AppConfig:o,ImgConfig:i,ImageUrl:"https://seedsjobfairapp.com/public/asset/image",IsNewHall:!0}},GeXX:function(t,e,a){var n={"./app.scss":"kufV","./content.scss":"wLcE","./define/_constant.scss":"0SN5","./define/_mixin.scss":"R0/S","./header.scss":"uqvh"};function s(t){return a(r(t))}function r(t){var e=n[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}s.keys=function(){return Object.keys(n)},s.resolve=r,t.exports=s,s.id="GeXX"},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("7+uW"),s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("AppPopup"),this._v(" "),e("AppAlert"),this._v(" "),e("AppHeader"),this._v(" "),e("div",{staticClass:"app-content"},[e("router-view")],1)],1)},staticRenderFns:[]};var r=a("VU/8")({name:"App",mounted:function(){},methods:{}},s,!1,function(t){a("pi3i")},null,null).exports,o=a("/ocq"),i=a("0+/4"),l={name:"default",data:function(){return{user:{},loading:!1}},created:function(){},mounted:function(){var t=this;this.loading=!0,i.graphql("query{\n        user(ID:136){\n          ID user_email first_name last_name\n        }\n      }").then(function(e){t.user=e.user,t.loading=!1,console.log(e)})},methods:{}},c={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("h3",[this._v("Home")]),this._v(" "),e("LoaderCircular",{attrs:{loading:this.loading,size:"small"}}),this._v("\n  "+this._s(this.user)+"\n  "),this._m(0)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"container"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col s12"},[e("div",{staticClass:"card-panel teal lighten-2"},[this._v("test")])])])])}]},p=a("VU/8")(l,c,!1,null,null,null).exports,u={render:function(){var t=this.$createElement;return(this._self._c||t)("div",[this._v("\n    404 Page Not Found\n")])},staticRenderFns:[]},d=a("VU/8")({name:"default",data:function(){return{}},created:function(){},mounted:function(){},methods:{}},u,!1,null,null,null).exports;n.a.use(o.a);var f=new o.a({routes:[{path:"/",name:"PageHome",component:p},{path:"/not-found",name:"PageNotFound",component:d},{path:"/*",name:"PageNotFound",component:d}]}),v=a("Dd8w"),m=a.n(v),h=a("NYxO"),g={name:"JpnHeader",props:{loggedIn:{type:Boolean,default:!0}},data:function(){return{}},computed:m()({},Object(h.b)(["authUser"])),mounted:function(){},methods:{}},_={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-header",attrs:{id:"app-header"}},[n("div",{staticClass:"h-left"},[n("router-link",{attrs:{to:"/"}},[n("img",{staticClass:"logo",staticStyle:{height:"60px",margin:"0 10px"},attrs:{src:a("c1hy")}})]),t._v(" "),n("div",{staticClass:"detail"},[n("router-link",{staticClass:"title",attrs:{to:"/"}},[t._v("\n                Jabatan Pendaftaran Negara\n            ")]),t._v(" "),n("div",{staticClass:"subtitle"},[t._v("\n                Kementerian Dalam Negeri\n            ")])],1)],1),t._v(" "),n("div",{staticClass:"h-right"},[n("div",{staticClass:"user-info"},[n("div",{staticClass:"ui-name"},[t._v(t._s(t.authUser.OPER_ID))]),t._v(" "),n("div",{staticClass:"ui-desc"},[t._v(t._s(t.authUser.BRANCH_CODE))]),t._v(" "),n("div",{staticClass:"ui-desc"},[t._v(t._s(t.authUser.PC_ID))])])])])},staticRenderFns:[]},C=a("VU/8")(g,_,!1,null,null,null).exports,b={ERROR:"error",SUCCESS:"success",INFO:"info",WARNING:"warning"};function A(t){return t.data[t.data.length-1]}var y={state:{data:[]},getters:{alertState:function(t){return t.data.length>0?A(t):{}}},actions:{},mutations:{alertOpen:function(t,e){var a=e.type,n=e.content,s=e.closeHandler,r={};r.type=a,r.content=n,r.isOpen=!0,r.closeHandler=s||function(){},t.data.push(r)},alertClose:function(t){(t.isOpen=!1,t.data.length>0)&&(A(t).closeHandler(),t.data.pop())}}},E={name:"AppAlert",computed:m()({},Object(h.b)({state:"alertState"})),created:function(){var t=this;window.addEventListener("keyup",function(e){"NumpadEnter"!=e.code&&"Enter"!=e.code||t.close()})},data:function(){return{AlertConst:b}},methods:m()({},Object(h.c)({alertClose:"alertClose"}),{close:function(){this.alertClose()}})},O={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.state.isOpen?a("div",{class:"app-alert "+t.state.type},[a("div",{staticClass:"aa-bg"}),t._v(" "),a("div",{staticClass:"aa-body"},[a("div",{staticClass:"aa-header"},[t.state.type==t.AlertConst.ERROR?a("span",{key:t.state.type},[t._v("\n          Ralat\n        ")]):t._e(),t._v(" "),t.state.type==t.AlertConst.SUCCESS?a("span",{key:t.state.type},[t._v("\n          Berjaya\n        ")]):t._e(),t._v(" "),t.state.type==t.AlertConst.INFO?a("span",{key:t.state.type},[t._v("\n          Makluman\n        ")]):t._e(),t._v(" "),t.state.type==t.AlertConst.WARNING?a("span",{key:t.state.type},[t._v("\n          Amaran\n        ")]):t._e(),t._v(" "),a("a",{staticClass:"btn btn-link aa-close",on:{click:t.close}},[a("b",[t._v("X")])])]),t._v(" "),a("div",{staticClass:"aa-content"},[a("div",{domProps:{innerHTML:t._s(t.state.content)}}),t._v(" "),a("button",{staticClass:"btn btn-xs btn-grey",on:{click:t.close}},[t._v("Ok")])])])]):t._e()},staticRenderFns:[]},P=a("VU/8")(E,O,!1,null,null,null).exports,U={name:"AppPopup",computed:m()({},Object(h.b)({state:"popupState"})),methods:m()({},Object(h.c)({close:"popupClose"}))},S={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.state.isOpen?a("div",{staticClass:"app-popup"},[a("div",{staticClass:"ap-bg"}),t._v(" "),a("div",{staticClass:"ap-body"},[a("div",{staticClass:"ap-header"},[t._v("\n        "+t._s(t.state.title)+"\n        "),t.state.closeable?a("a",{staticClass:"btn btn-link ap-close",on:{click:t.close}},[a("b",[t._v("X")])]):t._e()]),t._v(" "),a("div",{staticClass:"ap-content"},[a(t.state.content,t._b({tag:"component"},"component",t.state.prop,!1))],1)])]):t._e()},staticRenderFns:[]},x=a("VU/8")(U,S,!1,null,null,null).exports,j={name:"default",props:{size:{type:String,default:""},loading:{type:Boolean,default:!1}},data:function(){return{}},mounted:function(){}},R={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[this.loading?e("div",{class:"preloader-wrapper "+this.size+" active"},[this._m(0)]):this._e()])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"spinner-layer spinner-blue-only"},[e("div",{staticClass:"circle-clipper left"},[e("div",{staticClass:"circle"})]),e("div",{staticClass:"gap-patch"},[e("div",{staticClass:"circle"})]),e("div",{staticClass:"circle-clipper right"},[e("div",{staticClass:"circle"})])])}]},N=a("VU/8")(j,R,!1,null,null,null).exports,w=(a("0lrd"),a("X0eL"),{state:{isOpen:!1,title:"Popup Title",content:null,prop:{},closeable:!0},getters:{popupState:function(t){return t}},actions:{},mutations:{popupOpen:function(t,e){var a=e.title,n=e.content,s=e.prop,r=e.closeable;t.title=a,t.content=n,t.closeable=r,t.prop=s,t.isOpen=!0},popupClose:function(t){t.isOpen=!1}}}),$=a("2p8J");var I=function(){var t={user:{BRANCH_CODE:"16011011",PC_ID:"020",OPER_ID:"EJPN003",OPER_NAME:"OPER 2 PUNYA NAMA",KPT_NO:"930718115423",OPER_LVL4:"10110011",OPER_LVL8:"10110011",BRANCH_NAME:"DEV EJPN"},login_time:1526865746,authenticated:!0};try{var e=localStorage.getItem($.STORE_AUTH);if("{}"==e)return t;var a=JSON.parse(e);return console.log(a),null==a||void 0===a?t:a}catch(e){return console.log("getStoreAuth error",e),t}}();console.log(I);var H={modules:{popup:w,auth:{state:I,getters:{authState:function(t){return t},authUser:function(t){return t.user}},actions:{},mutations:{}},alert:y},strict:!1},k=H;n.a.config.productionTip=!1,n.a.component("AppHeader",C),n.a.component("AppPopup",x),n.a.component("AppAlert",P),n.a.component("LoaderCircular",N);["header","content"].map(function(t,e){a("GeXX")("./"+t+".scss")}),console.log("production"),n.a.use(h.a);var D=new h.a.Store(k);new n.a({el:"#app",store:D,router:f,components:{App:r},template:"<App/>"})},"R0/S":function(t,e){},X0eL:function(t,e){},c1hy:function(t,e,a){t.exports=a.p+"asset/img/jpn-logo-sm.7eea626.jpg"},kufV:function(t,e){},pi3i:function(t,e){},uqvh:function(t,e){},wLcE:function(t,e){}},["NHnr"]);