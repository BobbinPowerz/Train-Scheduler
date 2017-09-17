
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

console.log("hi");

 var database = firebase.database();

 // 2. Button for adding Employees
$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();
  // Grabs user input
  var trainName = $("#employee-name-input").val().trim();
  var dest = $("#role-input").val().trim();
  var firstTime = $("#start-input").val();
  //var firstTime = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
  var frequency = $("#rate-input").val().trim();
  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    dest: dest,
    firstTime: firstTime,
    frequency: frequency
  };
  // Uploads employee data to the database
  database.ref().push(newTrain);
  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.firstTime);
  console.log(newTrain.frequency);
  // Alert
  // alert("Employee successfully added");
  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});
// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var dest = childSnapshot.val().dest;
  var firstTime = childSnapshot.val().firstTime;
  var frequency = childSnapshot.val().frequency;
  // Employee Info
  console.log(trainName);
  console.log(dest);
  console.log(firstTime);
  console.log(frequency);
  // Prettify the employee start
  // var empStartPretty = moment.unix(empStart).format("MM/DD/YY");
  // // Calculate the months worked using hardcore math
  // // To calculate the months worked
  // var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  // console.log(empMonths);
  // // Calculate the total billed rate
  // var empBilled = empMonths * empRate;
  // console.log(empBilled);
  // Add each train's data into the table
  $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + dest + "</td><td>" + firstTime + "</td><td>" + frequency + "</td></tr>");
});
// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016
// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case