
<template>
  <div class="jpn-breadcrumbs">
    <div class="jb-item" @click="onClick(d.url)" v-for="(d,i) in viewData" :key="i">
      <div v-if="i > 0" class="jbi-arrow-back"></div>
      <div class="jbi-label">{{d.label}}</div>
      <div class="jbi-arrow"></div>

    </div>
  </div>
</template>

<script>
import { HomePage, IsNewBreadcrumbs } from "../config/app-config";
import { generateNaviUrl } from "../helper/util-helper";
import * as NaviHelper from "../helper/navi-helper";
import { mapGetters, mapMutations } from "vuex";
import { TransMeta } from "../store/modules/transaction";

export default {
  name: "AppBreadcrumbs",
  props: {
    data: {
      type: Array,
      default: []
    },
    text: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      viewData: []
    };
  },
  computed: {
    ...mapGetters(["transactionTransCode"])
  },
  mounted() {
    let viewData = null;

    if (IsNewBreadcrumbs) {
      viewData = NaviHelper.generateBreacrumbsFromStore(
        this.transactionTransCode
      );
    }

    this.viewData = viewData != null ? viewData : this.data;
    this.setBreadcrumbs(this.viewData);
  },
  methods: {
    setBreadcrumbs(breadcrumbs) {
      this.transSetMetaData({
        key: TransMeta.BREADCRUMBS,
        value: breadcrumbs
      });
    },
    onClick(url) {
      if (url == null || typeof url === "undefined" || url == "") {
        return;
      }
      window.location = generateNaviUrl(url);
    },
    ...mapMutations(["transSetMetaData"])
  }
};
</script>
