import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAbUGUJ7yX6qbY6WZhq6oEkASbdXYB1xfU",
  authDomain: "angular6crud-b13e9.firebaseapp.com",
  databaseURL: "https://angular6crud-b13e9.firebaseio.com",
  projectId: "angular6crud-b13e9",
  storageBucket: "angular6crud-b13e9.appspot.com",
  messagingSenderId: "961801010543",
  appId: "1:961801010543:web:33a688bec72bdd4568bc9a"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
