// ################################################
// constant

export const KeypressType = {
  ALPHANUMERIC: "ALPHANUMERIC",
  ALPHANUMERIC_WITH_DASH_SLASH: "ALPHANUMERIC_WITH_DASH_SLASH",
  NUMERIC_WITH_DASH_SLASH: "NUMERIC_WITH_DASH_SLASH",
}

// -()/.

const BASIC = [
  "Backspace",
  "Delete",
  "Tab",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Control"
];

const NUMBER = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

function getAlphaArr() {
  var toRet = [];
  for (var i = 0; i < 26; i++) {
    var lowerCase = String.fromCharCode(i + 97);
    var upperCase = String.fromCharCode(i + 65);
    toRet.push(lowerCase);
    toRet.push(upperCase);
  }

  return toRet;
}

const ALPHA = getAlphaArr();

const CONTROL_ALLOW = [
  "c", "C", "v", "V", "x", "X", "a", "A"
];

// ################################################
// helper function 
var isControlDown = false;

export function onKeyUp(event) {
  var charKey = event.key;
  if (charKey == "Control") {
    isControlDown = false;
  }
}


function doValidation(keys, event) {
  var charKey = event.key;
  if (charKey == "Control") {
    isControlDown = true;
  } else if (isControlDown && CONTROL_ALLOW.indexOf(charKey) >= 0) {
    return true;
  } else if (keys.indexOf(charKey) >= 0) {
    return true;
  } else {
    return false;
  }
}


function addAddon(keys, addon) {
  if (typeof addon !== "undefined") {
    return [
      ...keys,
      ...addon
    ]
  }

  return keys;
}

// ################################################
// usable function from outside
export function isBasicOnly(event, addon) {
  var keys = [
    ...BASIC
  ];

  keys = addAddon(keys, addon);
  return doValidation(keys, event);
}

export function isNumberOnly(event, addon) {
  var keys = [
    ...BASIC,
    ...NUMBER
  ];

  keys = addAddon(keys, addon);
  return doValidation(keys, event);
};

export function isAlphanumericOnly(event, addon) {
  var keys = [
    ...BASIC,
    ...NUMBER,
    ...ALPHA
  ];

  keys = addAddon(keys, addon);
  return doValidation(keys, event);
};
