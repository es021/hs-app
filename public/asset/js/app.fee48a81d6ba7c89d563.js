webpackJsonp([1],{NHnr:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("7+uW"),r={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{attrs:{id:"app"}},[n("AppPopup"),this._v(" "),n("AppAlert"),this._v(" "),n("AppHeader"),this._v(" "),n("div",{staticClass:"app-content"},[n("router-view")],1)],1)},staticRenderFns:[]};var o=e("VU/8")({name:"App",mounted:function(){},methods:{}},r,!1,function(t){e("tY2g")},null,null).exports,i=e("/ocq"),s={name:"default",data:function(){return{}},created:function(){console.log("page home")},mounted:function(){},methods:{loadConfiguration:function(){}}},l={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,n=this._self._c||t;return n("div",[this._v("\n    Page Home\n      "),n("div",{staticClass:"card-panel teal lighten-2"},[this._v("test")])])}]},c=e("VU/8")(s,l,!1,null,null,null).exports,u={render:function(){var t=this.$createElement;return(this._self._c||t)("div",[this._v("\n    404 Page Not Found\n")])},staticRenderFns:[]},d=e("VU/8")({name:"default",data:function(){return{}},created:function(){},mounted:function(){},methods:{}},u,!1,null,null,null).exports;a.a.use(i.a);var p=new i.a({routes:[{path:"/",name:"PageHome",component:c},{path:"/not-found",name:"PageNotFound",component:d},{path:"/*",name:"PageNotFound",component:d}]}),v=e("Dd8w"),f=e.n(v),b=e("NYxO"),h={name:"JpnHeader",props:{loggedIn:{type:Boolean,default:!0}},data:function(){return{}},computed:f()({},Object(b.b)(["authUser"])),mounted:function(){},methods:{}},j={render:function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"app-header",attrs:{id:"app-header"}},[a("div",{staticClass:"h-left"},[a("router-link",{attrs:{to:"/"}},[a("img",{staticClass:"logo",staticStyle:{height:"60px",margin:"0 10px"},attrs:{src:e("c1hy")}})]),t._v(" "),a("div",{staticClass:"detail"},[a("router-link",{staticClass:"title",attrs:{to:"/"}},[t._v("\n                Jabatan Pendaftaran Negara\n            ")]),t._v(" "),a("div",{staticClass:"subtitle"},[t._v("\n                Kementerian Dalam Negeri\n            ")])],1)],1),t._v(" "),a("div",{staticClass:"h-right"},[a("div",{staticClass:"user-info"},[a("div",{staticClass:"ui-name"},[t._v(t._s(t.authUser.OPER_ID))]),t._v(" "),a("div",{staticClass:"ui-desc"},[t._v(t._s(t.authUser.BRANCH_CODE))]),t._v(" "),a("div",{staticClass:"ui-desc"},[t._v(t._s(t.authUser.PC_ID))])])])])},staticRenderFns:[]},m=e("VU/8")(h,j,!1,null,null,null).exports,W={ERROR:"error",SUCCESS:"success",INFO:"info",WARNING:"warning"};function C(t){return t.data[t.data.length-1]}var T={state:{data:[]},getters:{alertState:function(t){return t.data.length>0?C(t):{}}},actions:{},mutations:{alertOpen:function(t,n){var e=n.type,a=n.content,r=n.closeHandler,o={};o.type=e,o.content=a,o.isOpen=!0,o.closeHandler=r||function(){},t.data.push(o)},alertClose:function(t){(t.isOpen=!1,t.data.length>0)&&(C(t).closeHandler(),t.data.pop())}}},g={name:"AppAlert",computed:f()({},Object(b.b)({state:"alertState"})),created:function(){var t=this;window.addEventListener("keyup",function(n){"NumpadEnter"!=n.code&&"Enter"!=n.code||t.close()})},data:function(){return{AlertConst:W}},methods:f()({},Object(b.c)({alertClose:"alertClose"}),{close:function(){this.alertClose()}})},_={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return t.state.isOpen?e("div",{class:"app-alert "+t.state.type},[e("div",{staticClass:"aa-bg"}),t._v(" "),e("div",{staticClass:"aa-body"},[e("div",{staticClass:"aa-header"},[t.state.type==t.AlertConst.ERROR?e("span",{key:t.state.type},[t._v("\n          Ralat\n        ")]):t._e(),t._v(" "),t.state.type==t.AlertConst.SUCCESS?e("span",{key:t.state.type},[t._v("\n          Berjaya\n        ")]):t._e(),t._v(" "),t.state.type==t.AlertConst.INFO?e("span",{key:t.state.type},[t._v("\n          Makluman\n        ")]):t._e(),t._v(" "),t.state.type==t.AlertConst.WARNING?e("span",{key:t.state.type},[t._v("\n          Amaran\n        ")]):t._e(),t._v(" "),e("a",{staticClass:"btn btn-link aa-close",on:{click:t.close}},[e("b",[t._v("X")])])]),t._v(" "),e("div",{staticClass:"aa-content"},[e("div",{domProps:{innerHTML:t._s(t.state.content)}}),t._v(" "),e("button",{staticClass:"btn btn-xs btn-grey",on:{click:t.close}},[t._v("Ok")])])])]):t._e()},staticRenderFns:[]},A=e("VU/8")(g,_,!1,null,null,null).exports,O={name:"AppPopup",computed:f()({},Object(b.b)({state:"popupState"})),methods:f()({},Object(b.c)({close:"popupClose"}))},I={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return t.state.isOpen?e("div",{staticClass:"app-popup"},[e("div",{staticClass:"ap-bg"}),t._v(" "),e("div",{staticClass:"ap-body"},[e("div",{staticClass:"ap-header"},[t._v("\n        "+t._s(t.state.title)+"\n        "),t.state.closeable?e("a",{staticClass:"btn btn-link ap-close",on:{click:t.close}},[e("b",[t._v("X")])]):t._e()]),t._v(" "),e("div",{staticClass:"ap-content"},[e(t.state.content,t._b({tag:"component"},"component",t.state.prop,!1))],1)])]):t._e()},staticRenderFns:[]},R=e("VU/8")(O,I,!1,null,null,null).exports,D=(e("0lrd"),e("X0eL"),{state:{isOpen:!1,title:"Popup Title",content:null,prop:{},closeable:!0},getters:{popupState:function(t){return t}},actions:{},mutations:{popupOpen:function(t,n){var e=n.title,a=n.content,r=n.prop,o=n.closeable;t.title=e,t.content=a,t.closeable=o,t.prop=r,t.isOpen=!0},popupClose:function(t){t.isOpen=!1}}}),x=(e("mvHQ"),e("gBtx")),y=e.n(x);var E=1561522935;console.log("init buildTime",E),void 0===E&&(E=Math.round((new Date).getTime()/1e3));var N=E;console.log("BUILD_TIME",N),console.log("BUILD_PATH","C:\\xampp\\htdocs\\hs-app\\build\\build.js");var S=!0,L=(S&&location.origin,S&&location.origin,S&&location.origin,"JPN-LOCAL-STORAGE-AUTH");e("pFYg");var F="T.HARI",H="T.MALAM",M="AM",P="PM";[].concat([M,P],[F,H]);String.prototype.convertToNumberLength=function(t){var n=y()(this);return isNaN(n)?this:(n+"").padStart(t,"0")},String.prototype.replaceAll=function(t,n){return this.replace(new RegExp(t,"g"),n)},String.prototype.capitalize=function(){var t=function(t,n){var e=t;(!(arguments.length>2&&void 0!==arguments[2])||arguments[2])&&(e=t.toLowerCase());var a=e.split(n),r="";for(var o in a){var i=a[o];i=i.charAt(0).toUpperCase()+i.substr(1),o>0&&(r+=n),r+=i}return r};return t(t(this," "),"\n",!1)},String.prototype.escapeSpecialChars=function(){return this.replace(/\\n/g,"\\n").replace(/\\N/g,"\\n")},String.prototype.padStart||(String.prototype.padStart=function(t,n){return t>>=0,n=String(void 0!==n?n:" "),this.length>t?String(this):((t-=this.length)>n.length&&(n+=n.repeat(t/n.length)),n.slice(0,t)+String(this))});var k="--SILA PILIH--";var U={TxnFldLen:4e3,OutEntity:"OutTwjrWebJournal",InEntity:"InTwjrWebJournal",WjrBrchCd:"WjrBrchCd",WjrTxnDt:"WjrTxnDt",WjrCreDt:"WjrCreDt",WjrMachNo:"WjrMachNo",WjrTxnCode:"WjrTxnCode",WjrAplNo:"WjrAplNo",WjrIpAddr:"WjrIpAddr",WjrOperId:"WjrOpUid",WjrOperCls:"WjrOpCls",WjrOperLvl:"WjrOpLvl",WjrTxnFld1:"WjrTxnFld1",WjrTxnFld2:"WjrTxnFld2",WjrOpHscno:"WjrOpHscno",WjrTxnMode:"WjrTxnMode",WjrTxnVer:"WjrTxnVer",WjrRptGrp1:"WjrRptGrp1",WjrRptGrp2:"WjrRptGrp2",WjrRptGrp3:"WjrRptGrp3",WjrRptGrp4:"WjrRptGrp4",WjrRptGrp5:"WjrRptGrp5",WjrSessionId:"WjrSessionId",WjrRvsDt:"WjrRvsDt",WjrRvsMachNo:"WjrRvsMachNo",WjrRvsCode:"WjrRvsCode",WjrAuthId:"WjrAuthId",WjrAuthLvl:"WjrAuthLvl",WjrAuthCls:"WjrAuthCls",WjrDeptId:"WjrDeptId",WjrTdfInd1:"WjrTdfInd1",WjrTdfInd2:"WjrTdfInd2",WjrTxnInd1:"WjrTxnInd1",WjrReceiptNo:"WjrReceiptNo",WjrTxnOnlInd:"WjrTxnOnlInd",WjrAmtCtr:"WjrAmtCtr",WjrAmtLen:"WjrAmtLen",WjrVflLen:"WjrVflLen"};U.WjrTxnFld2,U.WjrTxnVer,U.WjrDeptId,U.WjrMachNo,U.WjrRvsMachNo,U.WjrSessionId,U.WjrRvsCode,U.WjrOperCls,U.WjrAuthCls,U.WjrAmtCtr,U.WjrTxnOnlInd,U.WjrAmtLen,U.WjrVflLen,U.WjrBrchCd,U.WjrAplNo,U.WjrIpAddr,U.WjrTxnMode,U.WjrTxnCode,U.WjrTxnFld1,U.WjrOperId,U.WjrOperLvl,U.WjrAuthId,U.WjrAuthLvl,U.WjrOpHscno,U.WjrTxnDt,U.WjrRvsDt,U.WjrCreDt;function V(t){var n=document.createElement("textarea");return n.innerHTML=t,n.value}var w="breadcrumbs",B=["is_mode_offline"];function G(t){var n=t[0].id,e=n.split("_");for(var a in n="",e)a!=e.length-1&&(a>0&&(n+="_"),n+=e[a]);return n}function J(t){return G(t).replace("T","")}function $(t,n,e){var a=G(t);return a+="_"+e}function Y(t,n,e,a,r,o,i){var s=[];for(var l in void 0===i&&(i=!1),i||s.push({value:"",label:k}),void 0===o&&(o=!1),n){var c=n[l];if((void 0===r||r(c))&&""!=c[e].replaceAll(" ","")){c[a]=V(c[a]);var u="";u=c[e]==c[a]||o?c[a]:c[e]+" - "+c[a],s.push({value:c[e],label:u})}}return s=function(t,n){var e=[];if(t.indexOf("Ref071")>=0){var a=[],r={};for(var o in n){var i=n[o],s=i.value;a.push(s),r[s]=i}for(var o in a=a.sort())e.push(r[a[o]])}else e=n;return e}(t,s)}function X(t,n,e){var a="formRequired"==n&&"TTEMPLATE_T2"==e;a&&console.log("getFormObjectByName",n,e,name);try{var r=t[n][e];return a&&(console.log(t[n]),console.log(t[n].TTEMPLATE_T2)),void 0===r?{}:r}catch(t){return{}}}function q(t,n,e,a){var r=X(t,n,e);try{var o=r[a];return void 0===o?null:o}catch(t){return null}}var Q={state:{journalData:{},focusOnInit:null,tabEnabled:[],tabData:[{id:""}],tabHidden:[],metaData:{},currentTabIndex:0,formRef:{},formValue:{},formDisabled:{},formRequired:{},formError:{},fcMap:null,fcChildren:null,dataset:{branch:[{value:"Cawangan HQ",label:"Cawangan HQ"},{value:"Cawangan Lain",label:"Cawangan Lain"}],jantina:[{value:"L",label:"Lelaki"},{value:"P",label:"Perempuan"}]},refTable:{}},getters:{transactionJournalData:function(t){return t.journalData},transactionFocusOnInit:function(t){return t.focusOnInit},transactionState:function(t){return t},transactionMetaData:function(t){return t.metaData},transactionDataset:function(t){return t.dataset},transactionTabData:function(t){return t.tabData},transactionTabEnabled:function(t){return t.tabEnabled},transactionTransClass:function(t){return G(t.tabData)[2]},transactionTransCode:function(t){return J(t.tabData)},transactionTransName:function(t){return G(t.tabData)},transactionTransFullName:function(t){var n=t.metaData[w],e=n[n.length-1].label;try{var a=J(t.tabData);e=e.replaceAll(a+" - ","")}catch(t){}return e},transactionFcMap:function(t){return t.fcMap},transactionFcChildren:function(t){return t.fcChildren},transactionCurrentTabId:function(t){try{return t.tabData[t.currentTabIndex].id}catch(t){return null}},transactionNextTabId:function(t){try{for(var n=1,e=t.tabData[t.currentTabIndex+n].id;t.tabHidden.indexOf(e)>=0;)if(n++,e=t.tabData[t.currentTabIndex+n].id,t.currentTabIndex+n>=t.tabData.length){e=null;break}return e}catch(t){return null}},transactionPrevTabId:function(t){try{for(var n=1,e=t.tabData[t.currentTabIndex-n].id;t.tabHidden.indexOf(e)>=0;)if(n--,e=t.tabData[t.currentTabIndex-n].id,t.currentTabIndex-n>=-1){e=null;break}return e}catch(t){return null}},transactionRefTableMap:function(t){return function(n,e){var a=e.value,r=e.label,o=e.isEtc;try{a="Code",r="Desc",(o=void 0!==o&&o)&&(r="Etc");var i=t.refTable[n];if(void 0===i)return[];if(void 0!==a&&void 0!==r){var s=Y(n,i,a,r,void 0,!0,void 0);for(var l in i={},s){var c=s[l];i[c.value]=c.label}}return i}catch(t){return{}}}},transactionRefTableRaw:function(t){return function(n){return t.refTable[n]}},transactionRefTable:function(t){return function(n,e,a){var r=e.value,o=e.label,i=e.overrideGlobalFilter,s=e.isNoDefault;try{i=void 0!==i&&i,r="Code",o="Desc";var l=t.refTable[n];return void 0===l?[]:(void 0!==r&&void 0!==o&&(i||(l=function(t,n,e,a){var r=null,o=[];if("Ref008State"==t&&(r=["","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16"]),null!==r)for(var i in n){var s=n[i][e];r.indexOf(s)>=0&&o.push(n[i])}else o=n;return o}(n,l,r)),l=Y(n,l,r,o,a,void 0,s)),l)}catch(t){return[]}}},transactionFormErrorByName:function(t){return function(n,e){return q(t,"formError",n,e)}},transactionFormValueByName:function(t){return function(n,e){return q(t,"formValue",n,e)}},transactionFormObjectByName:function(t){return function(n,e,a){return q(t,n,e,a)}},transactionFormObject:function(t){return function(n,e){return X(t,n,e)}},transactionFormValue:function(t){return function(n,e){return q(t,"formValue",n,e)}}},actions:{},mutations:{transInitFcMap:function(t,n){if(null===t.fcMap){var e={},a={};for(var r in n){var o=n[r],i=$(t.tabData,0,r);for(var s in e[i]={},a[i]={},o){var l=o[s];if(e[i][l.name]=l,void 0!==l.children&&Array.isArray(l.children))for(var c in l.children)a[i][l.children[c]]=l.name}}t.fcChildren=a,t.fcMap=e}},transSetJournalData:function(t,n){t.journalData=n},transChangeTab:function(t,n){t.currentTabIndex=n},transSetEnabledTab:function(t,n){t.tabEnabled=n},transAddHiddenTab:function(t,n){t.tabHidden.indexOf(n)<=-1&&t.tabHidden.push(n)},transRemoveHiddenTab:function(t,n){var e=t.tabHidden.indexOf(n);e>=0&&t.tabHidden.splice(e,1)},transAddEnabledTab:function(t,n){t.tabEnabled.indexOf(n)<=-1&&t.tabEnabled.push(n)},transRemoveEnabledTab:function(t,n){var e=t.tabEnabled.indexOf(n);e>=0&&t.tabEnabled.splice(e,1)},transSetTabData:function(t,n){t.tabData=n},transSetRefTable:function(t,n){var e=n.key,a=n.data;t.refTable[e]=a},transSetFormObject:function(t,n){var e=n.key,a=n.tab,r=n.data;t[e][a]=r},transSetFormObjectByName:function(t,n){var e=n.key,r=n.tab,o=n.name,i=n.data;void 0===t[e]&&a.a.set(t,e,{}),void 0===t[e][r]&&a.a.set(t[e],r,{}),a.a.set(t[e][r],o,i)},transSetMetaData:function(t,n){var e=n.key,a=n.value;(void 0===t.metaData[e]||B.indexOf(e)>=0)&&(t.metaData[e]=a)},transUpdateMetaData:function(t,n){var e=n.key,a=n.value;t.metaData[e]=a},transSetFocusOnInit:function(t,n){t.focusOnInit=n}}};var K=function(){var t={user:{BRANCH_CODE:"16011011",PC_ID:"020",OPER_ID:"EJPN003",OPER_NAME:"OPER 2 PUNYA NAMA",KPT_NO:"930718115423",OPER_LVL4:"10110011",OPER_LVL8:"10110011",BRANCH_NAME:"DEV EJPN"},login_time:1526865746,authenticated:!0};try{var n=localStorage.getItem(L);if("{}"==n)return t;var e=JSON.parse(n);return console.log(e),null==e||void 0===e?t:e}catch(n){return console.log("getStoreAuth error",n),t}}();console.log(K);var z={modules:{popup:D,transaction:Q,auth:{state:K,getters:{authState:function(t){return t},authUser:function(t){return t.user}},actions:{},mutations:{}},alert:T},strict:!1},Z=z;a.a.config.productionTip=!1,a.a.component("AppHeader",m),a.a.component("AppPopup",R),a.a.component("AppAlert",A),console.log("production"),a.a.use(b.a);var tt=new b.a.Store(Z);new a.a({el:"#app",store:tt,router:p,components:{App:o},template:"<App/>"})},X0eL:function(t,n){},c1hy:function(t,n,e){t.exports=e.p+"asset/img/jpn-logo-sm.7eea626.jpg"},tY2g:function(t,n){}},["NHnr"]);