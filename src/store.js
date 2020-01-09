import { createStore, combineReducers, compose } from "redux";
// import firebase from "firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";

// Reducers
// @todo

const firebaseConfig = {
  apiKey: "AIzaSyAYzbFjuG6uLqfwehnyF5OElHq5THbKJFs",
  authDomain: "customer-panel-2c804.firebaseapp.com",
  databaseURL: "https://customer-panel-2c804.firebaseio.com",
  projectId: "customer-panel-2c804",
  storageBucket: "customer-panel-2c804.appspot.com",
  messagingSenderId: "854534878588",
  appId: "1:854534878588:web:de58286e8909241888a0f9"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

//Init firebase instance
firebase.initializeApp(firebaseConfig);
//Init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

//Check fro settings in localStorage
if (localStorage.getItem("settings") == null) {
  //Default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };

  //Set to localStorage
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

//Create initial state
const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };

//Create store
// const store = createStoreWithFirebase(
//   rootReducer,
//   initialState,
//   compose(
//     reactReduxFirebase(firebase),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

// Only chrome can handle the redux dev tool
// redux compose cannot handle a null or undefined middleware
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  window.navigator.userAgent.includes("Chrome")
    ? compose(
        reactReduxFirebase(firebase),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    : compose(reactReduxFirebase(firebase))
);

export default store;
