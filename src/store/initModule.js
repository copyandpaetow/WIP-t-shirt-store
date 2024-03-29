/** VUEX init module**/

const fb = require("@/api/firebaseConfig.js");

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    loading: { primaryData: false, secondaryData: false }
  },
  // -----------------------------------------------------------------
  getters: {
    getLoadingState: state => {
      return state.loading.primaryData;
    },
    getCompleteLoadingState: state => {
      if (state.loading.primaryData || state.loading.secondaryData) {
        return true;
      }
      return false;
    }
  },
  // -----------------------------------------------------------------
  mutations: {
    INIT_loading(state, loading) {
      //set the current state to that of the index
      state.loading[loading.step] = loading.status;
    }
  },
  // -----------------------------------------------------------------
  actions: {
    INIT_store: async ({ dispatch, commit }) => {
      console.log("init store");
      //init loading
      commit("INIT_loading", { step: "primaryData", status: true });
      commit("INIT_loading", { step: "secondaryData", status: true });

      //load data

      //load product data first
      let loadProductData = await dispatch("INIT_restoreData", "product");
      let setProductData = await dispatch(
        "productModule/PRODUCT_setData",
        loadProductData,
        {
          root: true
        }
      );

      //load colors
      let loadColorData = await dispatch("INIT_restoreData", "colors");
      let setColorData = await dispatch(
        "productModule/COLORS_setData",
        loadColorData,
        {
          root: true
        }
      );

      //check for local user info and restore this first
      let checkForLocalUserSave = await dispatch(
        "userModule/INIT_userSaveLocal",
        null,
        {
          root: true
        }
      );

      //set the first loading step to false again => everything else can be loaded afterwards
      let finishInitalRestore = await commit("INIT_loading", {
        step: "primaryData",
        status: false
      });

      //load additional data
      let loadSupportData = await dispatch("INIT_restoreData", "support");
      let setSupportData = await dispatch(
        "productModule/SUPPORT_setData",
        loadSupportData,
        {
          root: true
        }
      );

      //get user data from remote
      let checkForRemoteUserSave = await dispatch("INIT_userSaveRemote");

      let startTime = await dispatch("timeModule/TIME_init", null, {
        root: true
      });

      let finishFullRestore = await commit("INIT_loading", {
        step: "secondaryData",
        status: false
      });

      let finishLoading = await console.log("everything is loaded");
      return [
        finishFullRestore,
        setProductData,
        setColorData,
        checkForLocalUserSave,
        finishInitalRestore,
        setSupportData,
        checkForRemoteUserSave,
        startTime,
        finishLoading
      ];
    },

    INIT_restoreData: async ({ dispatch }, section) => {
      let localSave = localStorage.getItem(`t-shirt-store_${section}`);
      if (localSave) {
        console.log(`restored ${section} data from local save`);
        return JSON.parse(localSave);
      }
      let remoteSave = await dispatch("INIT_queryFirebase", section);
      let saveLocaly = dispatch("INIT_saveLocaly", {
        type: section,
        data: remoteSave
      });

      return [remoteSave, saveLocaly];
    },
    INIT_queryFirebase: section => {
      console.log(`retrieving ${section} remotly`);
      return fb.storeCollection
        .doc(section)
        .get()
        .then(result => {
          return result.data()[section];
        });
    },
    INIT_saveLocaly: section => {
      console.log(`saving ${section.type} localy`);
      localStorage.setItem(
        `t-shirt-store_${section.type}`,
        JSON.stringify(section.data)
      );
    },

    INIT_userSaveRemote: async ({ dispatch }) => {
      //check if user is present
      let userAuthState = await fb.auth.onAuthStateChanged(async user => {
        if (!user) {
          //if not,return early
          console.log("no user present");
          return;
        }
        console.log("page was reloaded, user is present");

        //reset user data
        let restoreUser = await dispatch("authModule/AUTH_PageReload", user, {
          root: true
        });

        //check for a remote save and overwrite the store
        let restoreData = await dispatch(
          "userModule/USER_getCurrentOrder",
          user,
          {
            root: true
          }
        );

        return [restoreUser, restoreData];
      });
      return userAuthState;
    }
  }
};
