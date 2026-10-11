
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
  import { getDatabase, ref, set, get, push } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCmeAI-c0Cxc-7yR1Pc-6QTCOx6L56AFKQ",
    authDomain: "mobile-programming-2acad.firebaseapp.com",
    projectId: "mobile-programming-2acad",
    storageBucket: "mobile-programming-2acad.firebasestorage.app",
    messagingSenderId: "86011043142",
    appId: "1:86011043142:web:063c03acf4d094fbe5d947" };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

function writeUserData(name, email, message) {
  const contactRef = ref(database, 'users');
  const newContactRef = push(contactRef);

  set(newContactRef, {
    name: name,
    email: email,
    message: message,
  }).catch((error) => {
    console.error("Error sending message:", error);
  });
}

window.writeUserData = writeUserData;
