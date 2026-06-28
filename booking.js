// TODO: Replace this configuration with your unique Firebase settings from Console
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase App
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Form Interaction Elements
const bookingForm = document.getElementById('bookingForm');
const statusMessage = document.getElementById('statusMessage');

bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('guestName').value;
    const email = document.getElementById('guestEmail').value;
    
    // Correctly fetches the value from the selected radio button group
    const room = document.querySelector('input[name="roomType"]:checked').value;
    const checkInDate = document.getElementById('checkIn').value;

    statusMessage.innerText = "Processing your reservation...";
    statusMessage.style.color = "#1a252f";

    // Submits Directly to cloud database collection
    db.collection("hotelBookings").add({
        guestName: name,
        guestEmail: email,
        roomType: room,
        checkIn: checkInDate,
        bookedAt: new Date()
    })
    .then(function(docRef) {
        statusMessage.innerText = `Success! Your reservation ID is: ${docRef.id}`;
        statusMessage.style.color = "#27ae60";
        bookingForm.reset();
    })
    .catch(function(error) {
        console.error("Firestore Error: ", error);
        statusMessage.innerText = "Booking failed. Please confirm database setup.";
        statusMessage.style.color = "#c0392b";
    });
});