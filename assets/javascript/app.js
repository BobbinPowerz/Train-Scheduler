
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDFZdktjMzmQz1osIVckMPbEMPsiIvR1lk",
    authDomain: "trainscheduler-3caeb.firebaseapp.com",
    databaseURL: "https://trainscheduler-3caeb.firebaseio.com",
    projectId: "trainscheduler-3caeb",
    storageBucket: "",
    messagingSenderId: "1098599814446"
  };
  firebase.initializeApp(config);

 var database = firebase.database();

 // Button to add new trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  // Grabs user input from the form
  var trainName = $("#train-name-input").val().trim();
  var dest = $("#destination-input").val().trim();
  var firstTime = $("#start-input").val();
  var frequency = $("#rate-input").val().trim();
  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    dest: dest,
    firstTime: firstTime,
    frequency: frequency
  };
  // Pushes train data to the database
  database.ref().push(newTrain);
  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.firstTime);
  console.log(newTrain.frequency);

  // Clears all of the text-boxes so that new values can be put into clear form
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// Create Firebase event on entree added for adding trains to the database and creating a row in the html 
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var dest = childSnapshot.val().dest;
  var firstTime = childSnapshot.val().firstTime;
  var frequency = childSnapshot.val().frequency;
  // Train Info
  console.log(trainName);
  console.log(dest);
  console.log(firstTime);
  console.log(frequency);

    // First Time pushed back a year and format in military time 
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(moment(firstTimeConverted).format("HH:mm"));
    // Current Time
    var current = moment();
    console.log("CURRENT TIME: " + moment(current).format("HH:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var remainder = diffTime % frequency;
    console.log(remainder);
    // Minute Until Train
    var minAway = frequency - remainder;
    console.log("MINUTES TILL TRAIN: " + minAway);
    // Next Train and time format back to am/pm
    var nextArriveCalc = moment().add(minAway, "minutes");
    var nextArrive = moment(nextArriveCalc).format("hh:mm a");
    // Creating a row of html elements to be displayed in the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + dest + "</td><td>" + "Every " + frequency + " minutes"+"</td><td>"+ minAway + " minutes" + "</td><td>"+ nextArrive + "</td></tr>");
});
