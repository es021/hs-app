function isCurrentTxnExist(arr) {
  for (var i in arr) {
    if (window.location.href.indexOf(arr[i]) >= 0) {
      return true;
    }
  }
  return false;
}

export function isNewSelectByTxn() {
  let arrTxn = ["384350", "384550"];
  return isCurrentTxnExist(arrTxn);
}

export function isResitAutoPrintByTxn() {
  let arrTxn = [
    // ###############
    // saa - 1
    "382000", "382008",
    "383000", "383008",
    "384000", "384008",
    //"385030", // cetakan semula boleh print bnyak kali
    // ###############
    // skc - 1
    "341100", "341108",
    "341400", "341408",
    "341500", "341508",
    "342000", "342008",
    //"349010", // cetakan semula boleh print bnyak kali
    // ###############
    // saa - 2
    "381200", "381208",
    "382100", "382108",
    "383100", "383108",
    "383300", "383308",
    "384100", "384108",
  ];
  return isCurrentTxnExist(arrTxn);
}

export function isMigrateCaGenByTxn() {
  let arrTxn = ["382050", "382060", "385026"];
  return isCurrentTxnExist(arrTxn);

}

export function isMigrateJournalByTxn() {
  let arrTxn = ["382050", "382000", "383000", "384000"];
  return isCurrentTxnExist(arrTxn);
}
