  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
  import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

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

  function writeUserData(userId, userData) {
    set(ref(database, "users/" + userId), userData)
      .then(() => {
        document.getElementById("statusMessage").textContent =
          `User ${userId} added successfully.`;
        console.log(`User ${userId} added:`, userData);
      })
      .catch((error) => {
        console.error(`Failed to add user ${userId}:`, error);
        document.getElementById("statusMessage").textContent =
          `Failed to add user ${userId}. Check the console for details.`;
      });
  }

  function readUserData(userId) {
    get(ref(database, `users/${userId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(`User ${userId} data:`, snapshot.val());
        } else {
          console.warn(`No data found for user ${userId}.`);
        }
      })
      .catch((error) => {
        console.error(`Failed to read data for user ${userId}:`, error);
      });
  }

  window.writeUserData = writeUserData;
  window.readUserData = readUserData;

  document.querySelectorAll("[data-user-id]").forEach((button) => {
    button.addEventListener("click", () => {
      readUserData(button.dataset.userId);
    });
  });