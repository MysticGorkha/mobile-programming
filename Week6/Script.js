  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
  import { getDatabase } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCmeAI-c0Cxc-7yR1Pc-6QTCOx6L56AFKQ",
    authDomain: "mobile-programming-2acad.firebaseapp.com",
    projectId: "mobile-programming-2acad",
    storageBucket: "mobile-programming-2acad.firebasestorage.app",
    messagingSenderId: "86011043142",
    appId: "1:86011043142:web:063c03acf4d094fbe5d947"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  console.log(database);