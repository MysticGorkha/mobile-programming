  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
  import { getDatabase, ref, set, get, update, remove } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

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


  function writeUserData(userId, firstname, lastname, email, phone, address, age, gender, nationality, occupation) {
    // Get the database instance
    // const db = getDatabase();
  
    // Create a reference/points to 'users/{userId}' and set the data (name and email)
 set(ref(database, 'users/' + userId), {
      fname: firstname,      
      lname: lastname,
      email: email,
      phone: phone,
      address: address,
      age: age,
      gender: gender,
      nationality: nationality,
      occupation: occupation
    });
  }

  window.writeUserData = writeUserData;
   writeUserData(1, "Abiral", "Khanal", "abiral@example.com", "1234567890", "123 Main St", 25, "Male", "Nepalese", "Engineer");
   writeUserData(2, "Prabhat", "Shrestha", "prabhat@example.com", "0987654321", "456 Oak Ave", 30, "Male", "Nepalese", "Teacher");
   writeUserData(3, "Sita", "Thapa", "sita@example.com", "1111111111", "789 Pine Rd", 28, "Female", "Nepalese", "Doctor");
   writeUserData(4, "Ram", "Gurung", "ram@example.com", "2222222222", "012 Elm St", 35, "Male", "Nepalese", "Lawyer");
   writeUserData(5, "Maya", "Rai", "maya@example.com", "3333333333", "345 Maple Dr", 22, "Female", "Nepalese", "Designer");
  
  window.readUserData = function readUserData(userId) {
    