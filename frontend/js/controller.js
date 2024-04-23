$(document).ready(function () {
  console.log("ready!");
  var homePage = $("#home-page");
  var createPage = $("#create-page");

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
      getAppointments();  // Rufe Termine ab, wenn die Home-Ansicht aktiviert wird
    } else if (newView === "create") {
      createPage.show();
      homePage.hide();
    }
  }

  // Initialisiere die Home-Ansicht und lade die Termine
  changeView("home");
  handleForm();
  $("#appointmentForm").submit(function (e) {
    e.preventDefault();
    submitdata(this);
  });
});

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
