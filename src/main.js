import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

//register all component
import AppContainer from './components/AppContainer'
import AppBanner from './components/AppBanner'
import AppHeader from './components/AppHeader'
import AppAlert from './components/AppAlert'
import AppPopup from './components/AppPopup'
import LoaderCircular from './components/LoaderCircular'

Vue.component('AppContainer', AppContainer);
Vue.component('AppBanner', AppBanner);
Vue.component('AppHeader', AppHeader);
Vue.component('AppPopup', AppPopup);
Vue.component('AppAlert', AppAlert);
Vue.component('LoaderCircular', LoaderCircular);


// External Library
import 'materialize-css'
import 'materialize-css/dist/css/materialize.css'

// Internal Style
// const scss = [
//   "app", "form", "button", "content", "loading",
//   "general", "header", "popup", "form-field",
//   "group-box", "pikaday", "layout", "list-table",
//   "alert", "nav-bar", "breadcrumb"
// ];

const scss = ["helper","header", "content"];
scss.map((d, i) => {
  require(`./style/${d}.scss`);
})

// const css = ["fontawesome-all.min"];
// css.map((d, i) => {
//   require(`./style/css/${d}.css`);
// })

// import JpnContent from '@/components/JpnContent'
// import AppPopupSlot from '@/components/AppPopupSlot'
// import AppDebug from '@/components/AppDebug'
// import AppBreadcrumbs from '@/components/AppBreadcrumbs'
// import AppNavBar from '@/components/AppNavBar'
// import AppLoading from '@/components/AppLoading'
// import AppActionTab from '@/components/AppActionTab'
// import FormField from '@/components/FormField'
// import FormFieldCheckboxFn from '@/components/FormFieldCheckboxFn'
// import FormFieldBox from '@/components/FormFieldBox'
// import GroupBox from '@/components/GroupBox'
// import MockDataBuilder from '@/components/MockDataBuilder'
// import FcBuilder from '@/components/FcBuilder'

// import LayoutRow from '@/components/LayoutRow'
// import LayoutColLeft from '@/components/LayoutColLeft'
// import LayoutColRight from '@/components/LayoutColRight'
// import LayoutColFull from '@/components/LayoutColFull'
// import LayoutColCenter from '@/components/LayoutColCenter'
// import ListTable from '@/components/ListTable'
// import TableStatic from '@/components/TableStatic'
// import Form from '@/components/Form'
// import ManageNavi from '@/components/ManageNavi'
// import TableData from '@/components/TableData'
// import AppConfigPopup from '@/components/AppConfigPopup'

// Vue.component('AppConfigPopup', AppConfigPopup);
// Vue.component('MockDataBuilder', MockDataBuilder);
// Vue.component('FcBuilder', FcBuilder);
// Vue.component('JpnContent', JpnContent);
// Vue.component('AppPopupSlot', AppPopupSlot);
// Vue.component('AppAlert', AppAlert);
// Vue.component('AppDebug', AppDebug);
// Vue.component('AppBreadcrumbs', AppBreadcrumbs);
// Vue.component('AppNavBar', AppNavBar);
// Vue.component('AppLoading', AppLoading);
// Vue.component('AppActionTab', AppActionTab);
// Vue.component('FormField', FormField);
// Vue.component('FormFieldCheckboxFn', FormFieldCheckboxFn);
// Vue.component('FormFieldBox', FormFieldBox);
// Vue.component('GroupBox', GroupBox);
// Vue.component('LayoutRow', LayoutRow);
// Vue.component('LayoutColLeft', LayoutColLeft);
// Vue.component('LayoutColRight', LayoutColRight);
// Vue.component('LayoutColFull', LayoutColFull);
// Vue.component('LayoutColCenter', LayoutColCenter);
// Vue.component('ListTable', ListTable);
// Vue.component('TableStatic', TableStatic);
// Vue.component('Form', Form);
// Vue.component('ManageNavi', ManageNavi);
// Vue.component('TableData', TableData);

console.log(process.env.NODE_ENV);

// vuex setup
import Vuex from 'vuex';
Vue.use(Vuex);
import storeObj from './store';
const store = new Vuex.Store(storeObj);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // provide the store using the "store" option.
  // this will inject the store instance to all child components.
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
