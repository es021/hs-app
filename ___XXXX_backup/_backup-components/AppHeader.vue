<template>
  <div id="app-header" class="app-header">
    <div class="h-left">
        <router-link to="/">
          <img class="logo"
            :src="require('../image/jpn-logo-sm.jpg')" 
            style="height: 60px; margin:0 10px;" />
        </router-link>
        <div class="detail">
            <router-link class="title" to="/">
                Jabatan Pendaftaran Negara
            </router-link>
            <div class="subtitle">
                Kementerian Dalam Negeri
            </div>
        </div>
    </div>
    <div class="h-right">
       <div class="user-info">
        <div class="ui-name">{{authUser["OPER_ID"]}}</div>
        <div class="ui-desc">{{authUser["BRANCH_CODE"]}}</div>
        <div class="ui-desc">{{authUser["PC_ID"]}}</div>
      </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "JpnHeader",
  props: {
    loggedIn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["authUser"])
  },
  mounted() {},
  methods: {}
};
</script>
