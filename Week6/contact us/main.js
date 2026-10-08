
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
  import { getDatabase, ref, set, get, push } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

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


// Function to write user data to Firebase Realtime Database
// Function to write user data with unique ID
function writeUserData(name, email, message) {
  // Create a reference to 'users' collection
  const contactRef = ref(database, 'users');
  const newContactRef = push(contactRef); 


  // push() generates a unique key for the new child
  //const newUserRef = push(usersRef);

  // set() stores the data at that unique location
  set(newContactRef, {
    name: name,
    email: email,
    message: message
  })
  .then(() => {
    console.log("Message sent successfully:");
  })
  .catch((error) => {
    console.error("Error sending message:", error);
  });
}

// Expose the function to the global scope so it can be accessed from HTML (e.g., via button click)
window.writeUserData = writeUserData;


// ref(db, 'users') points to the users path.
// get(userRef) gets the data at that path.
// snapshot.forEach(...) loops over each child node (each user).
// childsnapshot.val() gives the actual data (name and email), which is printed.
function readUser(){
    const userRef = ref(database,'users')
    get(userRef).then((snapshot)=>{
        snapshot.forEach((childsnapshot)=>{
            console.log(childsnapshot.val());
        })
    })
}
//readUser()
window.readUser = readUser;
