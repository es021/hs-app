import {
  STORE_NAVI
} from '../config/app-config';

// normal will follow this format : key-[txnCode]
const SpecialTxnKey = {
  "SENARAI_KERJA": "senarai-kerja"
}

// guna kat breadcrumbs
export function generateBreacrumbsFromStore(txnCode) {
  //console.log("txnCode", txnCode)
  let store = getStoreNavi();
  if (store == null) {
    console.error(`Error generateBreacrumbsFromStore - store is NULL`);
    return null;
  }

  let keyMap = getKeyMapFromStore(store, txnCode);
  if (keyMap == null) {
    console.error(`Error generateBreacrumbsFromStore - keyMap is NULL`);
    return null;
  }

  try {
    let result = generateBreadcrumbRecursive(store, keyMap, []);
    let strResult = JSON.parse(JSON.stringify(result))
    console.log("generateBreadcrumbRecursive success", strResult);
    return result;
  } catch (err) {
    console.error("generateBreadcrumbRecursive error", err);
    return null
  }
}

/**
 breadcrumbs: [
        { label: "Urusniaga Utama", url: "urusniaga-utama" },
        { label: "Pengangkatan eJPN", url: "pengangkatan-ejpn" },
        {
          label: "Pendaftaran Pengangkatan Mahkamah",
          url: "pengangkatan-ejpn-pendaftaran-pengangkatan-mahkamah"
        },
        { label: "Penerimaan Permohonan Pengangkatan", url: null }
      ],
 */
function getKeyMapFromStore(store, txnCode) {
  try {
    if (typeof SpecialTxnKey[txnCode] !== "undefined") {
      return SpecialTxnKey[txnCode]
    }

    // find txn code from map
    for (var key in store.map) {
      if (key.indexOf(txnCode) >= 0) {
        return key;
      }
    }
  } catch (err) {
    console.error("generateBreacrumbsFromStore error", err);
    return null;
  }
}

function generateBreadcrumbRecursive(store, startKeyMap, result) {
  let objMap = store.map[startKeyMap];
  let parentKeyMap = objMap.parent;

  let url = result.length == 0 ? null : startKeyMap;
  result.unshift({
    label: objMap.label,
    url: url
  });

  //   console.log("recursive");
  //   console.log("startKeyMap", startKeyMap);
  //   console.log("objMap", objMap);

  if (parentKeyMap == null) {
    return result;
  } else {
    startKeyMap = parentKeyMap;
    return generateBreadcrumbRecursive(store, startKeyMap, result);
  }
}

function getStoreNavi() {
  // default state if not exist
  var state = null;
  try {
    var storeStr = localStorage.getItem(STORE_NAVI);
    if (storeStr == "{}") {
      return state;
    }
    var store = JSON.parse(storeStr);
    if (store == null || typeof store === "undefined") {
      return state;
    } else {
      return store;
    }
  } catch (err) {
    console.error("getStoreNavi error", err);
    return state;
  }
}
