<template>
  <div class="jpn-nav-bar">
    <div :style="{textAlign:'left'}"> 
      <button v-if="!isTabHidden(d.id)" @click="changeIndex(i)" 
        :disabled="isTabDisabled(d.id)"
        :class="{active: i == transactionState.currentTabIndex}" 
        class="jnv-item" v-for="(d,i) in data" :key="d.id">
        {{d.label}}
      </button>
    </div>  
    <div :style="{textAlign:'right'}"> 
      <button class="jnv-item jnv-right"
        @click="openHelp()"><span :style="{padding:'0px 5px'}">?</span>
      </button><button class="jnv-item jnv-right" 
        @click="changeIndex(transactionState.currentTabIndex - 1)" 
        :disabled="!isPrevEnabled()"><<
      </button><button 
        @click="changeIndex(transactionState.currentTabIndex + 1)" 
        class="jnv-item jnv-right" 
        :disabled="!isNextEnabled()">>></button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { openWindowPopup, WINDOW_ID_HELP } from "../helper/util-helper";
import { HelpUrl, IsOfflineEnable } from "../config/app-config";

import { TransMeta } from "../store/modules/transaction";

export default {
  name: "AppNavBar",
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      IsOfflineEnable : IsOfflineEnable
    };
  },
  created() {
    window.addEventListener("keyup", ev => {
      if (ev.altKey) {
        switch (ev.code) {
          case "Period": // >
            if (this.isNextEnabled()) {
              this.changeIndex(this.transactionState.currentTabIndex + 1);
            }
            break;
          case "Comma": // <
            if (this.isPrevEnabled()) {
              this.changeIndex(this.transactionState.currentTabIndex - 1);
            }
            break;
          case "Slash": // ?
            this.openHelp();
            break;
        }
      }
    });
  },
  computed: {
    ...mapGetters([
      "transactionState",
      "transactionTransName",
      "transactionNextTabId",
      "transactionPrevTabId",
      "transactionMetaData"
    ])
  },

  methods: {
    getIsModeOffline() {
      return this.transactionMetaData[TransMeta.IS_MODE_OFFLINE] === true;
    },
    ...mapMutations([
      "transChangeTab",
      "transSetNextEnabled",
      "transSetPrevEnabled"
    ]),

    openHelp() {
      var url = HelpUrl + "/" + this.transactionTransName + ".pdf";
      openWindowPopup(url, WINDOW_ID_HELP);
    },
    changeIndex(i) {
      // fix to cater hidden on next and prev button
      // check whether i is hidden or not
      if (this.isTabIndexHidden(i)) {
        if (i > this.transactionState.currentTabIndex) {
          i++;
        } else {
          i--;
        }
      }

      if (this.transactionState.currentTabIndex == i) {
        return;
      }

      if (i > this.data.length - 1) {
        return;
      }

      if (i < 0) {
        return;
      }

      //console.log("change index", i);

      this.transChangeTab(i);
    },
    isTabHidden(id) {
      return this.transactionState.tabHidden.indexOf(id) >= 0;
    },
    isTabDisabled(id) {
      return this.transactionState.tabEnabled.indexOf(id) <= -1;
    },

    isTabIndexHidden(i) {
      let tabObj = this.transactionState.tabData[i];
      if (typeof tabObj !== "undefined") {
        let id = tabObj.id;
        return this.isTabHidden(id);
      }
      return false;
    },
    getTabIdByIndex(i) {
      let tabObj = this.transactionState.tabData[i];
      if (typeof tabObj !== "undefined") {
        let id = tabObj.id;
        return id;
      }
      return 0;
    },
    isNextEnabled() {
      try {
        let total = this.data.length;
        let current = this.transactionState.currentTabIndex;
        let nextIndex = 0;
        for (var i = current + 1; i <= total; i++) {
          //console.log("i",i);
          //console.log("this.isTabIndexHidden(i)",this.isTabIndexHidden(i));
          if (!this.isTabIndexHidden(i)) {
            nextIndex = i;
            break;
          }
        }

        var state = this.transactionState;
        //var nextId = this.transactionNextTabId;
        var nextId = this.getTabIdByIndex(nextIndex);
        //console.log("nextId", nextId);
        return state.tabEnabled.indexOf(nextId) >= 0;
      } catch (err) {
        return false;
      }
    },
    isPrevEnabled() {
      try {
        let total = this.data.length;
        let current = this.transactionState.currentTabIndex;
        let prevIndex = 0;
        for (var i = current - 1; i >= 0; i--) {
          //console.log("i",i);
          //console.log("this.isTabIndexHidden(i)",this.isTabIndexHidden(i));
          if (!this.isTabIndexHidden(i)) {
            prevIndex = i;
            break;
          }
        }

        var state = this.transactionState;
        //var prevId = this.transactionPrevTabId;
        var prevId = this.getTabIdByIndex(prevIndex);
        //console.log("prevId", prevId);
        return state.tabEnabled.indexOf(prevId) >= 0;
      } catch (err) {
        return false;
      }
    }
  }
};
</script>

