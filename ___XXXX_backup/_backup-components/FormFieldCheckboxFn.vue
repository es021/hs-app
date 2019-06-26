<!-- DO NOT CHANGE ANYTHING HERE 
        :valueArray="Array.isArray(valueArray) ? cb_value : undefined" 
        :value="!Array.isArray(valueArray) ? old_value : undefined" 

-->
<template>
<div class="form-field-checkbox-fn">
      <div class="ffcf-checkbox" :title="'Original Value | ' + old_value">
        <FormField type="checkbox"
          :isHidden="cb_hidden"
          :hideLabel="true"
          :isVertical="true"
          :name="cb_name" 
          :label="cb_name"
          :valueArray="cb_value" 
          :disabled="false"
          :required="false"
          :dataset="[{label: '', value:'1'}]"
          @onChange="cb_onChange"></FormField>
      </div>
    
      <div class="ffcf-old-val">
        <FormField type="text"
          :isHidden="true"
          :hideLabel="true"
          :isVertical="true"
          :name="old_name" 
          :label="old_name"
          :value="old_value" 
          :disabled="true"
          :required="false"
          @onChange="old_onChange"></FormField>
      </div>
      <div class="ffcf-main">
        <FormField 
          :decimal="decimal" 
          :rows="rows" 
          :isExactLen="isExactLen" 
          :hasCheckboxFn="hasCheckboxFn" 
          :isCaseSensitive="isCaseSensitive" 
          :unit="unit" 
          :inputStyle="inputStyle" 
          :keypressType="keypressType" 
          :formatType="formatType" 
          :format="format" 
          :hideLabel="hideLabel" 
          :inFormFieldBox="inFormFieldBox" 
          :isHidden="isHidden" 
          :isVertical="isVertical" 
          :len="len" 
          :count="count" 
          :value="value" 
          :disabled="disabled || !isChecked()"
          :required="required" 
          :valueArray="valueArray" 
          :type="type" 
          :name="name" 
          :step="step" 
          :label="label" 
          :placeholder="placeholder" 
          :dataset="dataset" 
          :validate="validate" 
          :labelWidth="labelWidth" 
          @onChange="onChange"></FormField>
      </div>

</div>
</template>

<script>
export default {
  name: "FormFieldBox",
  data() {
    return {
      //cb_name: "CHECKBOX_" + this.name
    };
  },
  props: {
    _this: {
      type: String,
      default: null
    },
    cb_hidden: {
      type: Boolean,
      default: false
    },
    cb_name: {
      type: String,
      default: null
    },
    cb_value: {
      type: [String, Number, Array, Boolean],
      default: null
    },
    old_name: {
      type: String,
      default: null
    },
    old_value: {
      type: [String, Number, Array, Boolean],
      default: null
    },

    // ##########################
    decimal: {
      type: Number,
      default: null
    },
    rows: {
      type: Number,
      default: 3
    },
    isExactLen: {
      type: Boolean,
      default: false
    },
    hasCheckboxFn: {
      type: Boolean,
      default: false
    },
    isCaseSensitive: {
      type: Boolean,
      default: false
    },
    // unit kat belakang, eg : tahun, ringgit etc
    unit: {
      type: String,
      default: null
    },
    // style utk input
    inputStyle: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // utk limitkan key apa yg boleh di press
    keypressType: {
      type: String,
      default: null
    },
    formatType: {
      type: String,
      default: null
    },
    format: {
      type: Function,
      default: val => {
        return val;
      }
    },
    hideLabel: {
      type: Boolean,
      default: false
    },
    inFormFieldBox: {
      type: Boolean,
      default: false
    },
    isHidden: {
      type: Boolean,
      default: false
    },
    isVertical: {
      type: Boolean,
      default: false
    },
    len: {
      type: [Number, Array],
      default: null
    },
    count: {
      type: [String, Number],
      default: 1
    },
    value: {
      type: [String, Number, Array, Boolean], // {value:""}
      default: null
    },
    disabled: {
      type: [Boolean, Array],
      default: false
    },
    required: {
      type: [Boolean, Array],
      default: false
    },
    valueArray: {
      type: Array, // {value:""}
      default: () => {
        return [];
      }
    },
    type: {
      type: String
    },
    name: {
      type: String
    },
    step: {
      type: String,
      default: "any"
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    dataset: {
      // must follow this -- {value, label}
      // can be used in select, radio box, check box
      type: Array,
      default: () => {
        return [];
      }
    },
    validate: {
      type: Function,
      default: input => {
        //console.log("default validate");
        return false;
      }
    },
    labelWidth: {
      type: Number,
      default: 30
    }
  },
  created() {},
  methods: {
    isChecked(value) {
      value = typeof value === "undefined" ? this.cb_value : value;
      if (Array.isArray(value) && value.length > 0 && value[0] == "1") {
        return true;
      }

      return false;
    },
    cb_onChange(name, value, error, ref) {
      this.$emit("cb_onChange", name, value, error, ref);
      // if (!this.isChecked(value)) {
      //   //console.log("copy balik");
      //   // old to val;
      // }
    },
    old_onChange(name, value, error, ref) {
      this.$emit("old_onChange", name, value, error, ref);
    },
    onChange(name, value, error, ref) {
      this.$emit("onChange", name, value, error, ref);
    }
  }
};
</script>

