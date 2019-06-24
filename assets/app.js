
// $(document).ready(function () {
var firebaseConfig = {
    apiKey: "AIzaSyD8euGvr84eKjnHm3I9S9nzROj4MUAOfF0",
    authDomain: "train-890ec.firebaseapp.com",
    databaseURL: "https://train-890ec.firebaseio.com",
    projectId: "train-890ec",
    storageBucket: "",
    messagingSenderId: "174520281911",
    appId: "1:174520281911:web:04d206477edaa8e5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();


// capture button click
$("#add-train-btn").on("click", function (event) {
    // prevent page form refersing when form tries to submit
    event.preventDefault();
    // variables to store and capture input into Add train
    var trainInput = $("#train-input").val().trim();
    var destinationInput = $("#destination-input").val().trim();
    var timeInput = moment($("#firstTrain-input").val().trim(), "HH:mm");
    var frequencyInput = $("#frequency-input").val().trim();
    console.log(trainInput, destinationInput, timeInput);

    // Creates local "temporary" object for holding Train data
    // Uploads train data to the database
    database.ref().push({
        name: trainInput,
        destination: destinationInput,
        time: timeInput.format("HH:mm"),
        frequency: frequencyInput,
    });
});

database.ref().on("child_added", function (childSnapshot) {

    console.log(childSnapshot.val());
    // Store everything into a variable.
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var time = childSnapshot.val().time;
    console.log(name, destination, frequency);

    //append data to table
    $("#info-entry").append(
        "<tr><td>" + childSnapshot.val().name +
        "</td><td>" + childSnapshot.val().destination +
        "</td><td>" + childSnapshot.val().frequency +
        "</td><td>" +
        "</td><td>" +
        // "<td '>" + Next Arrival +
        // "<td '>" + Minutes Away + " minutes until arrival" + 
        "</td></tr>");


});
// });
