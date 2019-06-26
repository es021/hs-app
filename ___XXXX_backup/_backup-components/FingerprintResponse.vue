
<template>
  <div>
    <div v-if="isFingerprint">
      <br><br>
      <div v-if="showMessage">
        <div v-if="response == '1'">
          <h1 :style="{color:'rgb(26, 161, 0)'}">Pengesahan Berjaya
            <br><small>Kemaskini Sedang Dijalankan</small>
          </h1>
        </div>
        <div v-else>
          <h1 :style="{color:'#DD252C'}">Pengesahan Gagal
            <br><small>Sila Cuba Sekali Lagi</small>
          </h1>
        </div>
        <h2 :style="{color:'grey'}">
          Sila tutup window ini untuk kembali ke urusniaga
        </h2>
      </div>
    </div>
  </div>
  <!--
      Fingerprint Response<br>
      {{response}}
    -->
</template>

<script>
import { _GET, openWindowPopup } from "../helper/util-helper";
import { STORE_FINGERPRINT, STORE_WINDOW_NAME } from "../config/app-config";

export default {
  name: "FingerprintResponse",
  data() {
    return {
      response: "",
      isFingerprint: false,
      showMessage: false
    };
  },
  created() {
    var res = _GET("name");
    if (res !== null) {
      this.isFingerprint = true;
    } else {
      return;
    }
    res = res.replace("#", "");
    res = res.replace("/", "");
    this.response = res;

    var toStore = {
      err: null,
      res: null
    };

    if (this.response !== null) {
      // set to localhost as response
      toStore.res = this.response;
    } else {
      // set to localhost as error
      toStore.err = window.location.href;
    }
    localStorage.setItem(STORE_FINGERPRINT, JSON.stringify(toStore));

    this.showMessage = true;

    console.log("here");
    // need to enable 'dom.allow_scripts_to_close_windows' kat firefox about:config
    window.close();
  },
  mounted() {}
};
</script>
