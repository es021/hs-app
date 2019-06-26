<!-- DO NOT CHANGE ANYTHING HERE -->
<template>
  <div class="form-field" :class="{error:hasError(),hidden:isHidden}" :style="parentStyle">
    <div class="ff-flex">
      <div class="ff-label" @mousedown="onClickCopyValue()"
        :style="labelStyle" :title="`${name} | ${value} | ${valueArray}`">   
        <div :class="`ff-tooltip ${isTooltipHide ? 'hidden' : ''}`">
          {{tooltipText}}
        </div>  
        
        <!-- <div v-if="hasCheckboxFn">
          <span>{{cb_oldVal}}</span>
          <input
              @change="cb_onChange"   
              type="checkbox" :name="cb_name"  :ref="cb_name" 
              :checked="cb_isChecked()">
        </div>        -->

        {{label}}
      </div>
      <div class="ff-item" :style="itemStyle" :class="{'auto-height':isCheckbox() || isRadiobox()}">
        <img v-if="isImage()"  :style="imageStyle" :src="`data:image/png;base64,`+ value" />
        <input v-if="isInput() && count == 1"  
          :style="inputStyle"
          :format-type="formatType" 
          @focus="onFocus()"
          @blur="onBlur()"
          @keydown="onKeyDown($event)"  
          @keyup="onKeyUp($event)"
          :ref="name" @change="onChange" :maxlength="len" 
          :class="{required:required}" :disabled="disabled" 
          :value="value" :type="'text'" :name="name" 
          :placeholder="isNumber() && !disabled ? 'Sila isi nombor sahaja' :placeholder"
          :step="step"/>

        <textarea v-if="isTextarea()"  
          :style="inputStyle"
          :format-type="formatType" 
          @focus="onFocus()"
          @blur="onBlur()"
          @keydown="onKeyDown($event)"  
          @keyup="onKeyUp($event)"
          :ref="name" @change="onChange" :maxlength="len" :rows="rows"
          :class="{required:required}" :disabled="disabled" 
          :name="name" :value="value">
        </textarea>

        <!--for more than 1 field -->
        <!--<input v-if="count > 1" v-for="(d,i) in arrForCount" @keydown="onKeyDown($event)" :key="`${name}_${i+1}`" :ref="`${name}_${i+1}`" @change="onChange" 
          :class="{required:required}" class="ff-extra" :disabled="disabled" :value="valueArray[i]" 
          :type="'text'" 
          :format-type="formatType" 
          :name="`${name}_${i+1}`" 
          :step="step"
          :placeholder="placeholder"/> -->

         <input v-if="count > 1" v-for="(d,i) in arrForCount" @keydown="onKeyDown($event)" 
          :key="`${name}_${i+1}`" :ref="`${name}_${i+1}`" @change="onChange" 
          class="ff-extra" 
          :style="inputStyle"
          :class="{required:Array.isArray(required) ? required[i] : required}" 
          :disabled="Array.isArray(disabled) ? disabled[i] : disabled" 
          :value="Array.isArray(valueArray) ? valueArray[i] : null" 
          :type="'text'" 
          :maxlength="Array.isArray(len) ? len[i] : len" 
          :format-type="formatType" 
          :name="`${name}_${i+1}`" 
          :step="step"
          :placeholder="placeholder"/> 

        <!-- type we use input because we already use pickaday lib !-->
        <!-- if we use type date here will mess up state apa ntah -->
         <input  v-if="isDate()" @keydown="onKeyDown($event)" :ref="name" @change="onChange" 
          :class="{required:required}" :style="inputStyle" :disabled="disabled" :value="value" type="input" :format-type="type" :name="name" 
          :placeholder="placeholder"/>

        <!-- TIME TEMPLATE START #############################################################################################-->
        <input v-if="isTime()" :maxlength="4" @keydown="onKeyDown($event)" @focus="setTimeShow(true)" @blur="timeInputBlur($event)" :ref="name" @change="onChange" 
          :class="{required:required}" :disabled="disabled" :style="inputStyle" :value="value" type="input" :format-type="type" :name="name" 
          :placeholder="placeholder"/>
        <div v-if="isTime() && timeShow" class="ff-time"> 
            <div class="ff-time-item">
              <div class="ff-time-arrow" @click="updateTime('hour','add',true)"><i class="fa fa-angle-double-up "></i></div>
              <div class="ff-time-arrow" @click="updateTime('hour','add')"><i class="fa fa-angle-up "></i></div>
              <div class="ff-time-label">{{timeHour}}</div>
              <div class="ff-time-arrow" @click="updateTime('hour','minus')"><i class="fa fa-angle-down"></i></div>
              <div class="ff-time-arrow" @click="updateTime('hour','minus',true)"><i class="fa fa-angle-double-down"></i></div>
            </div>
            <div class="ff-time-item">
              <div class="ff-time-arrow" @click="updateTime('minute','add',true)"><i class="fa fa-angle-double-up"></i></div>
              <div class="ff-time-arrow" @click="updateTime('minute','add')"><i class="fa fa-angle-up "></i></div>
              <div class="ff-time-label">{{timeMin}}</div>
              <div class="ff-time-arrow" @click="updateTime('minute','minus')"><i class="fa fa-angle-down"></i></div>
              <div class="ff-time-arrow" @click="updateTime('minute','minus',true)"><i class="fa fa-angle-double-down"></i></div>
            </div>
            <div class="ff-time-item">
              <div class="ff-time-arrow" @click="updateTime('am_pm','add')"><i class="fa fa-angle-up"></i></div>
              <div class="ff-time-label">{{timeAmPm}}</div>
              <div class="ff-time-arrow" @click="updateTime('am_pm','minus')"><i class="fa fa-angle-down"></i></div>
            </div>
            <div class="ff-time-item">
              <div class="ff-time-action" @click="actionTime('ok')"><i class="fa fa-check-circle color-green"></i></div>
              <div class="ff-time-action" @click="actionTime('close')"><i class="fa fa-times-circle color-red"></i></div>
            </div>
        </div>
        <!-- TIME TEMPLATE END #############################################################################################-->

        <select v-if="isSelect() && !IsNewFormSelect"  :ref="name" @change="onChange" 
          :class="{required:required, textHidden:isValueEmpty() && disabled}" 
          :disabled="disabled" :value="value" :name="name">
          <option v-if="d !== null" v-for="(d,i) in dataset" :key="`${name}_${i}`" :value="d.value">
            {{d.label}}
          </option>
        </select>
        <!-- New Select Auto Suggest As User Type -->
        <!-- <span v-if="isSelect() && IsNewFormSelect">
            {{viewDataset}}
        </span> -->
        <span v-if="isSelect() && IsNewFormSelect">
            {{selectTyping}}
        </span>
        <!-- :key="keySelectNew" -->
        <select :id="name" v-if="isSelect() && IsNewFormSelect"  @blur="onSelectBlur()" @mousedown="onSelectClick()" 
          :ref="name" @change="onChange" @keydown="onSelectTyping($event)"
          :class="{
            required:required, 
            filterOpen : isFilterSelectOpen, 
            textHidden:isValueEmpty() && disabled
          }" 
          :disabled="disabled" :value="value" :name="name">
          <option v-if="d !== null" v-for="(d,i) in viewDataset" :key="`${name}_${i}`" :value="d.value" @keydown="onSelectTyping($event)">
            {{d.label}}
          </option>
        </select>

         <div class="box-container"  :class="{'ff-disabled':disabled,'ff-required':required, 'ff-vertical':isVertical}" v-if="isRadiobox()">
           <div v-for="(d,i) in dataset" class="radiobox-container" :key="`${name}_${i}`">
             <input :title="d.label" :disabled="disabled" :class="{required:required}" @change="onChange" type="radio" :name="name" 
             :ref="name" :value="d.value" :checked="d.value == value">
             <b v-if="d.value == value">{{d.label}}</b>
             <span v-else>{{d.label}}</span>
           </div>
        </div>

        <div class="box-container"  
          :class="{'ff-disabled':!Array.isArray(disabled) && disabled == true,'ff-required':required, 'ff-vertical':isVertical}" v-if="isCheckbox()">
           <div v-for="(d,i) in dataset" class="checkbox-container" :key="`${name}_${i}`">
             <input :disabled="(!Array.isArray(disabled) && disabled == true) || (Array.isArray && disabled[i] == true)" 
              :class="{required:required}" @change="onChange"   
              type="checkbox" :name="name"  :ref="name" :value="d.value" 
              :checked="Array.isArray(valueArray) ? valueArray.indexOf(d.value) >= 0 : false">
             <b v-if="Array.isArray(valueArray) ? valueArray.indexOf(d.value) >= 0 : false">{{d.label}}</b>
             <span v-else>{{d.label}}</span>
           </div>
        </div>

      </div>
      <div v-if="hasUnit()" class="ff-label ff-unit">
        {{unit}}
      </div>
    </div>
    <div  :style="itemStyle"  v-if="hasError()" class="ff-error">{{error}}</div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Pikaday from "pikaday";
import * as GlobalValidate from "../helper/global-validate-helper";
import * as KeypressEvent from "../helper/keypress-event-helper";
import * as TimeHelper from "../helper/time-helper";
import {
  IsCopyNoPermohonanEnable,
  IsNewFormSelect
} from "../config/app-config";
import * as FormatHelper from "../helper/format-helper";
import { TransMeta } from "../store/modules/transaction";

function getTimeData() {
  return {
    timeShow: false,
    timeHour: null,
    timeMin: null,
    timeAmPm: null,
    timeOri: {
      hour: null,
      min: null,
      am_pm: null
    },
    isTimeSpecial: false,
    timeBoxClicked: false,
    timeArrAmPm: TimeHelper.ArrAmPmAll
  };
}

function getTimeMethods() {
  return {
    timeInputBlur(ev) {
      var className = ev.explicitOriginalTarget.offsetParent.className;
      if (className != "ff-time") {
        this.setTimeShow(false);
      }
    },
    initTime() {
      if (
        this.value == null ||
        this.value == "" ||
        typeof this.value === "undefined"
      ) {
        // init from current time
        var obj = TimeHelper.getInputObjectFromNow();
        this.timeHour = obj.hour;
        this.timeMin = obj.min;
        this.timeAmPm = obj.am_pm;
      } else {
        var obj = TimeHelper.getInputObjectFromValue(this.value);
        this.timeHour = obj.hour;
        this.timeMin = obj.min;
        this.timeAmPm = obj.am_pm;
      }

      this.updateAmPm();
    },
    updateAmPm() {
      if (this.timeHour == "12" && this.timeMin == "00") {
        this.timeArrAmPm = TimeHelper.ArrAmPmSpecial;

        if (TimeHelper.ArrAmPmSpecial.indexOf(this.timeAmPm) <= -1) {
          this.timeAmPm = TimeHelper.ArrAmPmSpecial[0];
        }
      } else {
        this.timeArrAmPm = TimeHelper.ArrAmPmNormal;

        if (TimeHelper.ArrAmPmNormal.indexOf(this.timeAmPm) <= -1) {
          this.timeAmPm = TimeHelper.ArrAmPmNormal[0];
        }
      }
    },
    actionTime(type) {
      var val = TimeHelper.getValueFromInputObject(
        this.timeHour,
        this.timeMin,
        this.timeAmPm
      );

      if (type == "ok") {
        this.doOnChange(val);
        this.setTimeShow(false);
      } else if (type == "close") {
        this.setTimeShow(false);
        this.timeCloseHandler();
      }
    },
    timeCloseHandler() {
      this.timeHour = this.timeOri.hour;
      this.timeMin = this.timeOri.min;
      this.timeAmPm = this.timeOri.am_pm;
    },
    setTimeShow(timeShow) {
      this.initTime();
      this.timeShow = timeShow;
      if (this.timeShow) {
        this.timeOri = {
          hour: this.timeHour,
          min: this.timeMin,
          am_pm: this.timeAmPm
        };
      }
    },
    updateTime(time, operation, extra) {
      const MAX_HOUR = 12;
      const MIN_HOUR = 1;
      const MAX_MIN = 59;
      const MIN_MIN = 0;

      this.timeHour = Number.parseInt(this.timeHour);
      this.timeMin = Number.parseInt(this.timeMin);

      extra = typeof extra !== "undefined" ? extra : false;

      if (time == "hour") {
        if (operation == "add") {
          this.timeHour = this.timeHour + (extra ? 2 : 1);
        } else if (operation == "minus") {
          this.timeHour = this.timeHour - (extra ? 2 : 1);
        }
      } else if (time == "minute") {
        if (operation == "add") {
          this.timeMin = this.timeMin + (extra ? 10 : 1);
        } else if (operation == "minus") {
          this.timeMin = this.timeMin - (extra ? 10 : 1);
        }
      } else if (time == "am_pm") {
        var index = this.timeArrAmPm.indexOf(this.timeAmPm);
        var oriIndex = index;
        if (operation == "add") {
          index++;
        } else if (operation == "minus") {
          index--;
        }

        if (index >= this.timeArrAmPm.length) {
          index = 0;
        } else if (index < 0) {
          index = this.timeArrAmPm.length - 1;
        }

        this.timeAmPm = this.timeArrAmPm[index];
      }

      // threshold hour
      if (this.timeHour < MIN_HOUR) {
        this.timeHour = MAX_HOUR;
      }

      if (this.timeHour > MAX_HOUR) {
        this.timeHour = MIN_HOUR;
      }

      // threshold min
      if (this.timeMin < MIN_MIN) {
        this.timeMin = MAX_MIN;
      }

      if (this.timeMin > MAX_MIN) {
        this.timeMin = MIN_MIN;
      }

      // padding to string
      if (this.timeHour < 10) {
        this.timeHour = "0" + this.timeHour;
      }
      if (this.timeMin < 10) {
        this.timeMin = "0" + this.timeMin;
      }

      this.updateAmPm();
    }
  };
}

export default {
  name: "FormField",
  //keyItem : "",
  props: {
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
  // watch prop change
  watch: {
    dataset: {
      handler: function(value, oldValue) {
        if (IsNewFormSelect && this.isSelect()) {
          this.viewDataset = value;
          //this.updateViewDataset(true);
          //this.updateKeyItem();
        }
      }
    },
    value: {
      handler: function(value, oldValue) {
        //console.log(value, oldValue);
        this.onPropValueChange(value, oldValue);
      }
    },
    valueArray: {
      handler: function(value, oldValue) {
        //console.log(value, oldValue);

        // if (value == null) {
        //   value = [];
        // }
        this.onPropValueChange(value, oldValue);
      }
    }
  },
  data() {
    return {
      // ######################
      // checkboxFn start
      // cb_oldVal: null,
      // cb_onChange: ref => {
      //   console.log("cb_onChange");
      //   // console.log("cb_onChange");
      //   // console.log("ref.target.checked", ref.target.checked);
      //   this.setFormValue(this.cb_name, ref.target.checked);
      // },
      // cb_name: null,
      // cb_init: () => {
      //   console.log("cb_init");
      //   if (this.hasCheckboxFn) {
      //     if (this.cb_name == null) {
      //       this.cb_name = this.cb_getCheckboxName();
      //     }
      //   }
      // },
      // cb_isChecked: () => {
      //   this.cb_init();
      //   let tab = this.transactionCurrentTabId;
      //   console.log(
      //     "cb_isChecked",
      //     tab,
      //     this.cb_name,
      //     this.transactionFormValue(tab, this.cb_name)
      //   );
      //   return this.transactionFormValue(tab, this.cb_name) == true;
      // },
      // cb_getCheckboxName: () => {
      //   return `CHECKBOX_` + this.name;
      // },
      // cb_getOldValName: () => {
      //   return `OLDVAL_` + this.name;
      // },
      // ######################
      IsNewFormSelect: IsNewFormSelect,
      selectTyping: "",
      keySelectNew: "selectNew" + this.name, // + this.name + Date.now(),
      isFilterSelectOpen: false,
      isDoResetViewDataset: false,
      selectIndexArr: {},
      viewDataset: [],

      ...getTimeData(),
      tooltipText: null,
      isTooltipHide: true,
      imageStyle: {
        height: "313px",
        width: "auto",
        border: "solid 1px #ccc"
      },
      labelStyle: {},
      itemStyle: {},
      parentStyle: {},
      error: false,
      currentValue: null,
      arrForCount: []
    };
  },
  created() {
    if (IsNewFormSelect) {
      //this.updateKeyItem();
      this.viewDataset = this.dataset;
    }

    // create arr for count
    if (this.count > 1) {
      for (var i = 0; i < this.count; i++) {
        this.arrForCount.push("");
      }
    }

    if (this.isTime()) {
      this.initTime();
    }

    // if has unit kena ad offset
    var offsetLabelWidth = this.hasUnit() ? 6 : 0;

    //console.log(labelWidth);
    this.labelStyle = { width: this.labelWidth + offsetLabelWidth + "%" };
    this.itemStyle = { width: 100 - this.labelWidth + "%" };

    // hidelabel
    if (this.hideLabel || this.isImage()) {
      this.labelStyle = { display: "none" };
      this.itemStyle = { width: "100%" };
    }

    if (this.inFormFieldBox) {
      this.parentStyle = { width: "100%", border: "none", marginBottom: "0px" };
    }

    if (this.isImage()) {
      this.itemStyle["textAlign"] = "center";
      this.parentStyle["border"] = "none";
    }

    this.doValidation();
  },

  mounted() {
    //this.cb_init();

    if (this.isDate()) {
      this.addCalendar(this.$refs[this.name]);
    }

    // check error in store and initialize
    this.error = this.transactionFormErrorByName(
      this.transactionCurrentTabId,
      this.name
    );

    //this.updateViewDataset()

    this.$emit("onChange", this.name, null, null, this.$refs[this.name]);
  },
  methods: {
    // ##############################################
    setThisData(key, name, value) {
      var tab = this.transactionCurrentTabId;
      this.transSetFormObjectByName({
        key: key,
        tab: tab,
        name: name,
        data: value
      });
    },
    setFormValue(name, value) {
      this.setThisData("formValue", name, value);
    },
    // ##############################################
    resetViewDataset() {
      this.selectTyping = "";
      this.updateViewDataset();
    },
    // isWatch = false
    updateViewDataset() {
      //this.keySelectNew = "selectNew" + this.name + Date.now();
      //this.keySelectNew = "selectNew" + this.selectTyping;
      //console.log("keySelectNew", this.keySelectNew);
      this.isFilterSelectOpen =
        this.selectTyping != "" && this.selectTyping != null;

      // check kalau filter jadi ke tak
      let countFiltered = 0;
      if (IsNewFormSelect) {
        //this.viewDataset = [];
        this.$set(this, "selectIndexArr", {});
        this.$set(this, "viewDataset", []);
        //console.log(JSON.parse(JSON.stringify(this.viewDataset)));

        // if (isWatch && (this.selectTyping == "" || this.selectTyping == null)) {
        //   this.viewDataset = this.dataset;
        //   countFiltered = this.dataset.length;
        // } else {
        for (var i in this.dataset) {
          let r = this.dataset[i];
          this.selectIndexArr[r.value] = i;

          var add = false;

          if (!this.isFilterSelectOpen) {
            add = true;
          }
          if (r.value.indexOf(this.selectTyping) == 0) {
            countFiltered++;
            add = true;
          }
          if (add) {
            this.viewDataset.push(this.dataset[i]);
          }
        }
        //}

        //console.log("countFiltered", countFiltered);

        if (countFiltered <= 1) {
          // todos
          this.isDoResetViewDataset = true;
        }

        // adjust size
        let ref = this.$refs[this.name];
        if (this.isFilterSelectOpen) {
          let maxSize = 5;
          ref.size = countFiltered > maxSize ? maxSize : countFiltered;
        } else {
          ref.size = 1;
        }

        //console.log("selectTyping", this.selectTyping);
        //console.log(JSON.parse(JSON.stringify(this.viewDataset)));
      }
    },
    //##########################################################
    // Copy Function - Click On Label
    copyToClipboard(label, str) {
      console.log("copyToClipboard", str);
      var el = document.createElement("textarea");
      el.value = str;
      el.setAttribute("readonly", "");
      el.style = { position: "absolute", left: "-99999px" };
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);

      this.tooltipText = `Value '${label}' copied to clipboard`;
      this.isTooltipHide = false;
      setTimeout(() => {
        this.isTooltipHide = true;
      }, 2000);
    },
    onClickCopyValue() {
      if (!IsCopyNoPermohonanEnable) {
        return;
      }

      switch (this.formatType) {
        case FormatHelper.FormatType.NO_PERMOHONAN:
          let val = this.currentValue;
          if (typeof val === "string") {
            val = val.replaceAll("-", "");
            if (val != "") {
              this.copyToClipboard(this.label, val);
            }
          }
          break;
      }
    },
    //##########################################################
    ...getTimeMethods(),
    //##########################################################
    // Event Base Function
    onSelectBlur() {
      if (this.isFilterSelectOpen) {
        this.resetViewDataset();
        // to be used in onChange()
        this.isDoResetViewDataset = true;
        this.doOnChange();
      }
    },
    onSelectClick() {
      if (this.isFilterSelectOpen) {
        // to be used in onChange()
        this.isDoResetViewDataset = true;
      }
    },
    onSelectTyping(e) {
      console.log("onSelectTyping", e);
      let k = e.key;
      switch (k) {
        case "Backspace":
          this.selectTyping = this.selectTyping.substr(
            0,
            this.selectTyping.length - 1
          );
          break;
        case "Enter":
          break;
        default:
          if (k.length == 1) {
            this.selectTyping += k;
          }
          break;
      }

      this.updateViewDataset();
    },
    onBlur() {
      switch (this.formatType) {
        case FormatHelper.FormatType.NO_PERMOHONAN:
          this.doOnChange();
          break;
      }
    },
    onFocus() {
      switch (this.formatType) {
        case FormatHelper.FormatType.NO_PERMOHONAN:
          this.doOnChange(this.currentValue.replaceAll("-", ""));
          break;
      }
    },
    onKeyUp(ev) {
      KeypressEvent.onKeyUp(ev);
      return false;
    },
    onKeyDown(ev) {
      switch (this.type) {
        case "time":
          if (KeypressEvent.isNumberOnly(ev)) {
            return false;
          } else {
            ev.preventDefault();
          }
          break;
        case "date":
          if (KeypressEvent.isNumberOnly(ev)) {
            return false;
          } else {
            ev.preventDefault();
          }
          break;
        case "number":
          if (KeypressEvent.isNumberOnly(ev, ["."])) {
            return false;
          } else {
            ev.preventDefault();
          }
          break;
        default:
          // check for keypressType
          switch (this.keypressType) {
            case KeypressEvent.KeypressType.ALPHANUMERIC:
              if (KeypressEvent.isAlphanumericOnly(ev, [])) {
                return false;
              } else {
                ev.preventDefault();
              }
              break;
            case KeypressEvent.KeypressType.ALPHANUMERIC_WITH_DASH_SLASH:
              if (
                KeypressEvent.isAlphanumericOnly(ev, [
                  "-",
                  "/",
                  "(",
                  ")",
                  ".",
                  ":",
                  " "
                ])
              ) {
                return false;
              } else {
                ev.preventDefault();
              }
              break;
            case KeypressEvent.KeypressType.NUMERIC_WITH_DASH_SLASH:
              if (KeypressEvent.isNumberOnly(ev, ["-", "/"])) {
                return false;
              } else {
                ev.preventDefault();
              }
              break;
            default:
              return false;
          }
          return false;
      }
    },
    //##########################################################
    // on Change Function
    onPropValueChange(value, oldValue) {
      //console.log("propchange", value, oldValue);
      this.currentValue = value;
      this.doValidation();
    },
    doOnChange(value) {
      if (typeof value === "undefined" || value == null) {
        value = this.getRefValue();
        value = this.format(value);
        value = this.capitalize(value);
      }

      this.currentValue = value;
      this.doValidation();

      var ref = this.$refs[this.name];
      if (this.isRadiobox()) {
        // only send the one that we select
        if (Array.isArray(ref)) {
          for (var i in ref) {
            if (ref[i].value == value) {
              ref = ref[i];
              break;
            }
          }
        }
      } else if (this.isNumber()) {
        // New Form Field Decimal
        if (this.isNumberDecimal()) {
          // conver to 2 decimal place
          let nmbr = Number.parseFloat(this.currentValue);
          if (isNaN(nmbr)) {
            this.currentValue = "0.00";
          } else {
            this.currentValue = nmbr.toFixed(this.decimal);
          }
        }
      } else if (this.count > 1) {
        ref = [];
        for (var k = 1; k <= this.count; k++) {
          ref.push(this.$refs[this.name + "_" + k]);
        }
      }

      this.$emit("onChange", this.name, this.currentValue, this.error, ref);
      this.setSelectedIndexManually();
    },
    onChange() {
      this.doOnChange(null);
      this.setSelectedIndexManually();
    },
    setSelectedIndexManually() {
      if (IsNewFormSelect) {
        if (this.isDoResetViewDataset) {
          //console.log("select", this.currentValue);
          this.resetViewDataset();
          this.isDoResetViewDataset = false;

          // set selected index manually
          let ref = this.$refs[this.name];
          //console.log("ref", ref.selectedIndex);
          //console.log(ref);

          setTimeout(() => {
            ref.selectedIndex = this.selectIndexArr[this.value];
          }, 100);
        }
      }
    },
    //##########################################################
    // Other Function
    addCalendar(el) {
      try {
        if (el != null && typeof el !== "undefined") {
          var picker = new Pikaday({
            field: el,
            format: "DD/MM/YYYY",
            onOpen: function() {},
            onSelect: function() {}
          });
        }
      } catch (err) {
        console.log("addCalendar err", err);
      }
    },
    doValidation() {
      if (
        this.currentValue !== null &&
        this.currentValue != "" &&
        typeof this.currentValue !== "undefined"
      ) {
        if (this.isDate()) {
          this.error = GlobalValidate.date(this.currentValue);
          if (this.error == false) {
            this.error = this.validate(this.currentValue);
          }
        } else if (this.isTime()) {
          this.error = GlobalValidate.time(this.currentValue);
          if (this.error == false) {
            this.error = this.validate(this.currentValue);
          }
        } else if (this.isExactLen) {
          this.error = GlobalValidate.exactLen(this.currentValue, this.len);
          if (this.error == false) {
            this.error = this.validate(this.currentValue);
          }
        } else {
          this.error = this.validate(this.currentValue);
        }
      } else {
        this.error = false;
      }
    },
    capitalize(value) {
      if (this.isSelect() || this.isCheckbox() || this.isRadiobox()) {
        return value;
      }
      if (typeof value === "string") {
        //todo
        if (!this.isCaseSensitive) {
          value = value.toUpperCase();
        }
      } else if (Array.isArray(value)) {
        for (var i in value) {
          if (typeof value[i] === "string") {
            let valueArr = value[i];
            if (!this.isCaseSensitive) {
              valueArr = valueArr.toUpperCase();
            }
            value[i] = valueArr;
          }
        }
      }
      return value;
    },
    getRefValue() {
      var ref = this.$refs[this.name];
      var val = null;

      if (this.isCheckbox()) {
        val = [];
        for (var i in ref) {
          if (ref[i].checked == true) {
            val.push(ref[i].value);
          }
        }
      } else if (this.count > 1) {
        val = [];
        for (var k = 1; k <= this.count; k++) {
          var ref = this.$refs[this.name + "_" + k];
          for (var i in ref) {
            val.push(ref[i].value);
          }
        }
      } else if (this.isRadiobox()) {
        for (var i in ref) {
          if (ref[i].checked == true) {
            val = ref[i].value;
          }
        }
      } else if (this.isNumber()) {
        // we are using type text for number also
        val = ref.value;
        // if (val.indexOf(".") >= 0) {
        //   val = Number.parseFloat(val);
        // } else {
        //   val = Number.parseInt(val);
        // }

        // if (isNaN(val)) {
        //   val = "";
        // }
      } else if (this.isTime()) {
        val = ref.value;
        if (val.length == 4) {
          val = TimeHelper.timeConvertDbToValue(val);
        }
      } else if (this.isDate()) {
        val = ref.value;
        //console.log("val",val)
        //val = TimeHelper.dateConvertDbToValue(val);
        val = TimeHelper.dateConvertFormatDayMonthYear(val);
      } else {
        val = ref.value;
      }

      return val;
    },
    //##########################################################
    // Boolean Function

    hasUnit() {
      return (
        this.unit !== null &&
        this.unit !== "" &&
        typeof this.unit !== "undefined"
      );
    },
    hasError() {
      return (
        this.error !== true &&
        this.error !== false &&
        this.error !== "" &&
        this.error !== null &&
        typeof this.error !== "undefined"
      );
    },
    isValueEmpty() {
      return (
        this.value == "" ||
        this.value == null ||
        typeof this.value === "undefined"
      );
    },
    isInput() {
      return ["text", "number"].indexOf(this.type) >= 0;
    },
    isTextarea() {
      return this.type == "textarea";
    },
    isText() {
      return this.type == "text";
    },
    isNumber() {
      return this.type == "number";
    },
    // New Form Field Decimal
    isNumberDecimal() {
      return this.decimal != null && this.decimal > 0;
    },
    isTime() {
      return this.type == "time";
    },
    isDate() {
      return this.type == "date";
    },
    isSelect() {
      return this.type == "select";
    },
    isRadiobox() {
      return this.type == "radiobox";
    },
    isCheckbox() {
      return this.type == "checkbox";
    },
    isImage() {
      return this.type == "image";
    },
    ...mapMutations(["transSaveFormData", "transSetFormObjectByName"])
  },
  computed: {
    ...mapGetters([
      "transactionCurrentTabId",
      "transactionFormDataValue",
      "transactionFormErrorByName",
      "transactionFormValue",
      "transactionMetaData"
    ])
  }
};
</script>

