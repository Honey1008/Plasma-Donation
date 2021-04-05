  import firebase from 'firebase/app';
  import 'firebase/firestore';
  import 'firebase/auth';
  
  var firebaseConfig = {
    apiKey: "AIzaSyCz4hnL8JXDzkJ_0bRqMH8phz7XWrcX8DQ",
    authDomain: "plasma-donation-d9fb8.firebaseapp.com",
    projectId: "plasma-donation-d9fb8",
    storageBucket: "plasma-donation-d9fb8.appspot.com",
    messagingSenderId: "349890065582",
    appId: "1:349890065582:web:5e112ab7c5e4665101e93f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ timestampsInSnapshots: true });

  export default firebase;