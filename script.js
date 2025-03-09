function showResponse() {
    document.getElementById("response").style.display = "block";
}

function saveSelectedDate() {
    let selectedDate = document.getElementById("ibis-date").value;
    if (selectedDate) {
        set(ref(window.database, "selectedDate"), {
            date: selectedDate
        }).then(() => {
            console.log("✅ Date saved:", selectedDate);
            document.getElementById("saved-date").innerHTML = `Previously Selected Date: <span>${selectedDate}</span>`;
        }).catch(error => console.error("❌ Error saving date:", error));
    }
}

function loadPreviousDate() {
    get(ref(window.database, "selectedDate"))
    .then(snapshot => {
        if (snapshot.exists()) {
            let savedDate = snapshot.val().date;
            document.getElementById("saved-date").innerHTML = `Previously Selected Date: <span>${savedDate}</span>`;
        } else {
            console.log("ℹ️ No saved date found.");
        }
    })
    .catch(error => console.error("❌ Firebase read error:", error));
}

document.getElementById("ibis-date").addEventListener("change", saveSelectedDate);
window.onload = loadPreviousDate;
