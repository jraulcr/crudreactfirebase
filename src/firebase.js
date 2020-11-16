import firebase from 'firebase';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyATDaozkNZCwwP1U0FtbS2S6Rk8zO4BgoY",
    authDomain: "crud-firebase-9baae.firebaseapp.com",
    databaseURL: "https://crud-firebase-9baae.firebaseio.com",
    projectId: "crud-firebase-9baae",
    storageBucket: "crud-firebase-9baae.appspot.com",
    messagingSenderId: "310358078110",
    appId: "1:310358078110:web:b2ce043769926183d4818f"
  };

  // Initialize Firebase
  var fireDB = firebase.initializeApp(firebaseConfig);

  export default fireDB.database().ref();