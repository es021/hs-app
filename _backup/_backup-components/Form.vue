<template>
  <div class="app-form">
    <form class="jpn-form" @submit.prevent="submit">
      <!-- Username -->
      <div v-for="(i,key) in items" v-bind:key="key" class="form-item">
        <div class="form-label">
          {{i.label}}
          <span v-if="i.required">*</span>
        </div>
        <div class="form-input">
          <input :type="i.type" :ref="key" :disabled="i.disabled" v-model="formData[key]" :placeholder="i.placeholder">
        </div>
        <div class="form-error" v-if="formError[key]">{{formError[key]}}</div>
      </div>
      <!-- Error -->
      <div v-if="err != null" class="form-item error">
        <span v-html="err"></span>
      </div>
      <div v-if="success" class="form-item success">
        <span v-html="successMes"></span>
      </div>
      <!-- Submit -->
      <div class="form-item submit">
        <button class="btn btn-lg btn-blue" :disabled="loading" type="submit">
          <span v-if="loading">Please Wait..</span>
          <span v-else>Submit</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
  function objectAssign(ori, newObj) {
    var ret = {};

    for (var k in ori) {
      ret[k] = ori[k];
    }

    for (var k in newObj) {
      ret[k] = newObj[k];
    }

    return ret;
  }

  export default {
    name: "Form",
    data: () => {
      return {
        formData: {},
        formError: {},
        err: null,
        success: false,
        loading: false
      };
    },
    props: {
      itemKey: {
        type: String
      },
      successMes: {
        type: String,
        default: "Form Successfully Submitted"
      },
      items: {
        type: Object
      },
      defaultValue: {
        type: Object,
        default: () => {
          return {};
        }
      },
      onSubmit: {
        type: Function,
        default: data => {
          console.log(JSON.stringify(this.formData));
        }
      }
    },
    mounted() {
      this.formData = objectAssign(this.formData, this.defaultValue);
      // this.formError = objectAssign(this.formError, newObj);
    },
    methods: {
      filter() {
        var hasErr = false;
        for (var k in this.items) {
          var i = this.items[k];
          var d = this.formData[k];

          if (i.required) {
            if (d == "" || typeof d === "undefined") {
              var newObj = {};
              newObj[k] = "This field is required";
              this.formError = objectAssign(this.formError, newObj);
              hasErr = true;
            }
          }
        }
        return hasErr;
      },
      onSuccess(res) {
        console.log("onSuccess", res);
        this.success = true;
        this.loading = false;
      },
      onError(err) {
        console.log("onError", err);
        this.loading = false;
        this.err = "<b>Submission Failed</b><br>" + err;
      },
      submit() {
        this.formError = {};
        this.success = false;
        this.err = null;

        var err = this.filter();
        if (err === false) {
          this.loading = true;
          this.onSubmit(this.formData, this.onSuccess, this.onError);
        }
      }
    }
  };

</script>
