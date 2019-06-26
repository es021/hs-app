// non export just extends prototype
String.prototype.replaceAll = function (search, replacement, ignoreCase = false) {
  var i = (ignoreCase) ? "i" : "";
  var target = this;
  return target.replace(new RegExp(search, `${i}g`), replacement);
};


String.prototype.convertToNumberLength = function (len) {
  var num = Number.parseInt(this);
  if (isNaN(num)) {
    return this;
  }
  var numStr = num + "";
  return numStr.padStart(len, "0");
}


String.prototype.replaceAll = function (search, replace) {
  return this.replace(new RegExp(search, 'g'), replace);
}

String.prototype.capitalize = function () {
  const main = (str, delim, toLowerCaseFirst = true) => {
    let temp = str;
    if (toLowerCaseFirst) {
      temp = str.toLowerCase();
    }

    let arr = temp.split(delim);
    let toRet = "";
    for (var i in arr) {
      let str = arr[i];
      str = str.charAt(0).toUpperCase() + str.substr(1);
      if (i > 0) {
        toRet += delim;
      }
      toRet += str;
    }

    return toRet;
  }

  let toRet = "";
  toRet = main(this, " ");
  toRet = main(toRet, "\n", false);
  return toRet;
}


String.prototype.escapeSpecialChars = function () {
  return this.replace(/\\n/g, "\\n").replace(/\\N/g, "\\n");
}

if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;
    padString = String((typeof padString !== 'undefined' ? padString : ' '));
    if (this.length > targetLength) {
      return String(this);
    } else {
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
      }
      return padString.slice(0, targetLength) + String(this);
    }
  };
}
