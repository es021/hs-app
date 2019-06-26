export const AlertConst = {
  ERROR: "error",
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
}

// initial state
// shape: [{ id, quantity }]
const state = {
  data: [
    // {
    //   type: "info", // ["error","success","info"]
    //   content: "Alert Content",
    //   isOpen: false,
    //   closeHandler: () => {}
    // }
  ]

}

function getLastItem(state) {
  return state.data[state.data.length - 1];
}

// getters
const getters = {
  alertState: state => {
    if (state.data.length > 0) {
      return getLastItem(state);
    }

    return {};
  },
}

// actions
const actions = {

}

// mutations
const mutations = {
  alertOpen(state, {
    type,
    content,
    closeHandler
  }) {
    let _state = {};
    _state.type = type;
    _state.content = content;
    _state.isOpen = true;

    if (closeHandler) {
      _state.closeHandler = closeHandler;
    } else {
      _state.closeHandler = () => {};
    }

    state.data.push(_state);
  },

  alertClose(state) {
    state.isOpen = false;
    if (state.data.length > 0) {
      let lastItem = getLastItem(state);
      lastItem.closeHandler();
      state.data.pop();
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}


// #####################################
// alert_backup_single.js

/**

export const AlertConst = {
  ERROR: "error",
  SUCCESS: "success",
  INFO: "info",
  WARNING: "warning",
}

// initial state
// shape: [{ id, quantity }]
const state = {
  type: "info", // ["error","success","info"]
  content: "Alert Content",
  isOpen: false,
  closeHandler: () => {}
}

// getters
const getters = {
  alertState: state => state,
}

// actions
const actions = {

}

// mutations
const mutations = {
  alertOpen(state, {
    type,
    content,
    closeHandler
  }) {
    console.log("alertOpen", content)
    state.type = type;
    state.content = content;
    state.isOpen = true;

    if (closeHandler) {
      state.closeHandler = closeHandler;
    } else {
      state.closeHandler = () => {};
    }
  },
  alertClose(state) {
    state.isOpen = false;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}



*/