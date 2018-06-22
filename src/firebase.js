// Import the Firebase modules that you need in your app.
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';

// Initalize and export Firebase.
const config = {
  apiKey: 'AIzaSyCQ2zK7jODGBSPS4GX0o59n2WE_QNWZfEU',
  authDomain: 'api-project-172383522181.firebaseapp.com',
  databaseURL: 'https://api-project-172383522181.firebaseio.com',
  projectId: 'api-project-172383522181',
  storageBucket: 'api-project-172383522181.appspot.com',
  messagingSenderId: '172383522181',
};

export default firebase.initializeApp(config);
