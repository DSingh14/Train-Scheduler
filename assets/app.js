var firebaseConfig = {
    apiKey: "AIzaSyCkWhit9IWzWLRXK1i7KQNbYCGya49MvHk",
    authDomain: "firstfirebaseproject-14a45.firebaseapp.com",
    databaseURL: "https://firstfirebaseproject-14a45.firebaseio.com",
    projectId: "firstfirebaseproject-14a45",
    storageBucket: "firstfirebaseproject-14a45.appspot.com",
    messagingSenderId: "863724609195",
    appId: "1:863724609195:web:33c43d8f3bb947c9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// capture button click
$("train-input").on("click", function (event) {
    // prevent page form refersing when form tries to submit
    event.preventDefault();
    // variables to store and capture input into Add train
    var trainName = $("#train-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var time = moment($("#time-input").val().trim(), "HH:mm");
    var frequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding Train data
    var newTraininput = {
        name: trainName,
        destination: destination,
        time: time,
        frequency: frequency
    };
    // Uploads train data to the database
    database.ref().push(newTraininput);
    // Clears all of the text-boxes
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

