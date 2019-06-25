
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

    // Current Time and frequency(function parses a string argument and returns an integer)
    var frequency = parseInt(frequency)
    var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    var dateConvert = moment(childSnapshot.val().time, "HHmm").subtract(1, "years");

    //console.log("DATE CONVERTED: " + dateConvert);
    // First Train Time (pushed back 1 year to make sure it comes before current time)
    var traintimeInput = moment(time, "HH:mm").subtract(1, "years");
    console.log(traintimeInput);

    var trainTime = moment(dateConvert).format("HHmm");

    //console.log("Train time : " + trainTime);

    //difference bw the times
    var timeConvert = moment(trainTime, "HHmm").subtract(1, "years");
    var timeDifference = moment().diff(moment(timeConvert), "minutes");

    //console.log("Difference in time: " + timeDifference);

    //remainder
    var timeRemaining = timeDifference % frequency;

    //console.log("Time remaining: " + timeRemaining);

    //time until next train
    var timeAway = frequency - timeRemaining;

    //console.log("Minutes until next train: " + timeAway);

    //next train arrival
    var nextArrival = moment().add(timeAway, "minutes");

    //console.log("Arrival time: " + moment(nextArrival).format("HHmm"));

    var arrivalDisplay = moment(nextArrival).format("HHmm");

    //append data to table
    $("#info-entry").append(
        "<tr><td>" + childSnapshot.val().name +
        "</td><td>" + childSnapshot.val().destination +
        "</td><td>" + childSnapshot.val().frequency +
        // "</td><td>" +
        "</td><td>" + arrivalDisplay +
        "</td><td>" + timeAway + " minutes until arrival" +
        "</td></tr>");


});
// });
