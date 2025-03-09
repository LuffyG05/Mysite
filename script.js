// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCj8F3qHWUSL3tmLS945tHkOSFJnpRkG1I",
    authDomain: "apps-f4aae.firebaseapp.com",
    databaseURL: "https://apps-f4aae-default-rtdb.firebaseio.com",
    projectId: "apps-f4aae",
    storageBucket: "apps-f4aae.appspot.com",
    messagingSenderId: "710315506427",
    appId: "1:710315506427:web:3cee5897e7aba83bdc0e5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to Save Date to Firebase
function saveSelectedDate() {
    let selectedDate = document.getElementById("ibis-date").value;

    if (selectedDate) {
        set(ref(database, "selectedDate"), {
            date: selectedDate
        })
        .then(() => console.log("✅ Date saved successfully:", selectedDate))
        .catch(error => console.error("❌ Firebase write error:", error));
    } else {
        console.error("⚠️ No date selected!");
    }
}

// Function to Load Previously Selected Date from Firebase
function loadPreviousDate() {
    const dbRef = ref(database);
    get(child(dbRef, "selectedDate"))
    .then((snapshot) => {
        if (snapshot.exists()) {
            let savedDate = snapshot.val().date;
            document.getElementById("saved-date").innerHTML = `Previously Selected Date: <span>${savedDate}</span>`;
        } else {
            console.log("ℹ️ No saved date found.");
        }
    })
    .catch(error => console.error("❌ Firebase read error:", error));
}

// Attach Event Listener
document.getElementById("ibis-date").addEventListener("change", saveSelectedDate);

// Load the previously saved date on page load
window.onload = loadPreviousDate;
