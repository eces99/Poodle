$(document).ready(function () {
  console.log("ready!");
  var homePage = $("#home-page");
  var createPage = $("#create-page");
  var selectedAppointmentSection = $("#selected-appointment-section"); // Get the selected appointment section

  $(".home-link").on("click", function () {
      changeView("home");
  });
  $(".create-link").on("click", function () {
      changeView("create");
  });

  function changeView(newView) {
      if (newView === "home") {
          homePage.show();
          createPage.hide();
          selectedAppointmentSection.hide(); // Hide the selected appointment section on the home page
          getAppointments(); // Fetch appointments for the home page
      } else if (newView === "create") {
          createPage.show();
          homePage.hide();
          selectedAppointmentSection.hide(); // Hide the selected appointment section on the create page
      }
  }

  // Initial view setup
  changeView("home");
  handleForm();
  $("#appointmentForm").submit(function (e) {
      e.preventDefault();
      submitdata(this);
  });
});

// Your existing code...


let beginTimes = [];

function handleForm() {
  console.log("handleForm1");
  let beginTimeList = document.getElementById("beginTimesList");
  document.getElementById("btn_add").addEventListener("click", function () {
    console.log("handleForm2");
    let beginTime = document.getElementById("beginTime").value;
    if (beginTime) {
      beginTimes.push(beginTime);
      document.getElementById("beginTime").value = ""; // Clear the input field
      beginTimeList.innerHTML += "<li>" + beginTime + "</li>"; // Correctly append new list item
    }
    console.log(beginTimes);
  });
}

function submitdata(form) {
  // Serialisiere das Formular zu einem Objekt
  var formData = $(form)
    .serializeArray()
    .reduce(function (obj, item) {
      obj[item.name] = item.value;
      return obj;
    }, {});

  // Füge das `beginTimes` Array zum Datenobjekt hinzu
  formData.beginTime = beginTimes;

  // Daten für den AJAX-Aufruf vorbereiten
  var dataToSend = {
    method: "addAppointment",
    param: JSON.stringify(formData),
  };

  // AJAX-Aufruf ausführen zum Hinzufügen eines Termins
  $.ajax({
    type: "POST",
    url: "http://localhost:8080/Poodle/backend/SimpleServer/serviceHandler.php",
    cache: false,
    data: dataToSend,
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function (response) {
      alert(JSON.stringify(response));
    },
    error: function (xhr, status, error) {
      console.error("Error: " + error);
      console.error("Status: " + status);
      console.error(xhr);
    },
  });
}

function getAppointments() {
    $.ajax({
      type: "GET",
      url: "http://localhost:8080/Poodle/backend/SimpleServer/serviceHandler.php",
      cache: true, // Setze cache auf true
      data: { method: "getAppointments" },
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      success: function (response) {
        console.log("Here I am: ");
        try {
          var data = JSON.parse(response);
          displayData(data);
        } catch (e) {
          console.error("Parsing error:", e);
        }
      },
      error: function (xhr, status, error) {
        console.log("No, here I am: ");
        console.error("Error: " + error);
        console.error("Status: " + status);
        console.error("XHR: ", xhr);
      },
    });
  }

function getTerminSlots(appointment_id, callback) {
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/Poodle/backend/SimpleServer/serviceHandler.php",
    cache: true, // Set cache to true
    data: { method: "getTerminSlots", appointment_id: appointment_id },
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function (response) {
      try {
        var data = JSON.parse(response);
        callback(null, data);
        console.log("Terminslots: ", data);
      } catch (e) {
        console.error("Parsing error:", e);
        callback(e);
      }
    },
    error: function (xhr, status, error) {
      console.error("Error: " + error);
      console.error("Status: " + status);
      callback(error);
    },
  });
}
/*
function displayData(data) {
  $("#appointmentsList").empty();
  data.forEach(function(appointment) {
    var listItem = $("<li>" + appointment.title + "</li>");
    var details = $("<div class='details' style='display: none;'></div>");
    listItem.append(details);
    listItem.click(function() {
      if (!details.text()) {
        getTerminSlots(appointment.id, function(error, terminslots) {
          if (error) {
            console.error("Error fetching terminslots:", error);
          } else {
            // Group slots by date
            var slotsByDate = {};
            terminslots.forEach(function(terminslot) {
              var date = new Date(terminslot.beginTime).toLocaleDateString();
              if (!slotsByDate[date]) {
                slotsByDate[date] = [];
              }
              slotsByDate[date].push(terminslot);
            });

            // Build a string to display terminslots grouped by date
            var terminslotsInfo = "Terminslots:<br>";
            for (var date in slotsByDate) {
              terminslotsInfo += "- Date: " + date + "<br>";
              slotsByDate[date].forEach(function(terminslot) {
                terminslotsInfo += "&emsp;Time: " + terminslot.beginTime.split(" ")[1] + "<br>";
              });
            }

            // Append appointment and terminslots info to details
            details.html("Info: " + appointment.info + "<br>" + terminslotsInfo);
          }
        });
      }
      details.toggle();
    });
    $("#appointmentsList").append(listItem);
  });
}
*/

// Add click event handler for appointment items
function displayData(data) {
  $("#appointmentsList").empty();
  data.forEach(function(appointment) {
      var listItem = $("<li>" + appointment.title + "</li>");
      var details = $("<div class='details' style='display: none;'></div>");
      listItem.append(details);
      listItem.click(function() {
          if (!details.text()) {
              getTerminSlots(appointment.id, function(error, terminslots) {
                  if (error) {
                      console.error("Error fetching terminslots:", error);
                  } else {
                      // Display selected appointment details and voting options
                      displaySelectedAppointment(appointment, terminslots);
                  }
              });
          }
          details.toggle();
      });
      $("#appointmentsList").append(listItem);
  });
}

var selectedAppointmentId = null;


// Function to display selected appointment details and voting options
function displaySelectedAppointment(appointment, terminslots) {
  selectedAppointmentId = appointment.id;
  // Construct appointment details HTML
  var appointmentDetailsHtml = "<p><strong>Title:</strong> " + appointment.title + "</p>";
  appointmentDetailsHtml += "<p><strong>Place:</strong> " + appointment.place + "</p>";
  appointmentDetailsHtml += "<p><strong>Additional Information:</strong> " + appointment.info + "</p>";

  // Display appointment details
  $("#selected-appointment-details").html(appointmentDetailsHtml);

  // Construct voting options HTML
  var votingOptionsHtml = "<h4>Select Timeslots:</h4>";
  terminslots.forEach(function(terminslot) {
      votingOptionsHtml += "<div class='form-check'>";
      votingOptionsHtml += "<input class='form-check-input' type='checkbox' value='" + terminslot.id + "' id='slot" + terminslot.id + "'>";
      votingOptionsHtml += "<label class='form-check-label' for='slot" + terminslot.id + "'>" + terminslot.beginTime + "</label>";
      votingOptionsHtml += "</div>";
  });

  // Display voting options
  $("#voting-section").html(votingOptionsHtml);

  // Show the selected appointment section
  $("#selected-appointment-section").show();
}

// Function to submit voting data
document.getElementById("submit-vote").addEventListener("click", submitVoting);

function submitVoting() {
  console.log("submitVoting");
  // Get the selected checkboxes
  var selectedSlots = [];
  $('input[type="checkbox"]:checked').each(function() {
    selectedSlots.push($(this).val());
  });

  // Get other form data
  var username = $("#name").val();
  var comment = $("#comment").val();

  // Construct the votingData object
  var votingData = {
    appointment_id: selectedAppointmentId,
    slot_id: selectedSlots,
    username: username,
    comment: comment
  };
  $.ajax({
    type: "POST",
    url: "http://localhost:8080/Poodle/backend/SimpleServer/serviceHandler.php",
    data: {
      method: "addVoting",
      param: JSON.stringify(votingData)
    },
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function (response) {
      alert("Voting added successfully");
      // Handle success response if needed
    },
    error: function (xhr, status, error) {
      console.error("Error: " + error);
      console.error("Status: " + status);
      console.error(xhr.responseText);
      //alert("Failed to add voting. Please try again later.");
      // Handle error response if needed
    }
  });
}
