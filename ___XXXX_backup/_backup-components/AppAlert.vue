<template>
 <div v-if="state.isOpen" :class="`app-alert ${state.type}`">
    <div class="aa-bg"></div> 
    <div class="aa-body">
      <div class="aa-header">
        <span v-if="state.type == AlertConst.ERROR" :key="state.type">
          Ralat
        </span>
        <span v-if="state.type == AlertConst.SUCCESS" :key="state.type">
          Berjaya
        </span>
        <span v-if="state.type == AlertConst.INFO" :key="state.type">
          Makluman
        </span>
        <span v-if="state.type == AlertConst.WARNING" :key="state.type">
          Amaran
        </span>
        <a class="btn btn-link aa-close" @click="close"><b>X</b></a>
      </div>
      <div class="aa-content">
        <div v-html="state.content"></div>
        <button class="btn btn-xs btn-grey" @click="close">Ok</button>
      </div>
    </div>
</div>
</template>

<script>
import { AlertConst } from "../store/modules/alert";

import { mapGetters, mapMutations } from "vuex";
export default {
  name: "AppAlert",
  computed: {
    ...mapGetters({ state: "alertState" })
  },
  created() {
    window.addEventListener("keyup", ev => {
      if (ev.code == "NumpadEnter" || ev.code == "Enter") {
        this.close();
      }
    });
  },
  data() {
    return {
      AlertConst: AlertConst
    };
  },
  methods: {
    ...mapMutations({ alertClose: "alertClose" }),
    close() {
      this.alertClose();
    }
  }
};

// AppAlert_backup_single.vue
/**
 
 <template>
 <div v-if="state.isOpen" :class="`app-alert ${state.type}`">
    <div class="aa-bg"></div> 
    <div class="aa-body">
      <div class="aa-header">
        <span v-if="state.type == AlertConst.ERROR" :key="state.type">
          Ralat
        </span>
        <span v-if="state.type == AlertConst.SUCCESS" :key="state.type">
          Berjaya
        </span>
        <span v-if="state.type == AlertConst.INFO" :key="state.type">
          Makluman
        </span>
        <span v-if="state.type == AlertConst.WARNING" :key="state.type">
          Amaran
        </span>
        <a class="btn btn-link aa-close" @click="close"><b>X</b></a>
      </div>
      <div class="aa-content">
        <div v-html="state.content"></div>
        <button class="btn btn-xs btn-grey" @click="close">Ok</button>
      </div>
    </div>
</div>
</template>

<script>
import { AlertConst } from "../store/modules/alert";

import { mapGetters, mapMutations } from "vuex";
export default {
  name: "AppAlert",
  computed: {
    ...mapGetters({ state: "alertState" })
  },
  created() {
    window.addEventListener("keyup", ev => {
      if (ev.code == "NumpadEnter" || ev.code == "Enter") {
        this.close();
      }
    });
  },
  data() {
    return {
      AlertConst: AlertConst
    };
  },
  methods: {
    ...mapMutations({ alertClose: "alertClose" }),
    close() {
      this.alertClose();
      this.state.closeHandler();
    }
  }
};

 */
</script>

