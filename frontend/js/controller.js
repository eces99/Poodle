console.log("controller.js");
/*"use strict";
var view = "Home";
var homePage = $("#homePage");
var createAppointmentPage = $("#createAppointmentPage");
*/

//Starting point for JQuery init
$(document).ready(function () {
  console.log("ready!");
  handleForm();
  $("#appointmentForm").submit(function (e) {
    e.preventDefault();
    submitdata(this);
  });
});

let beginTimes = [];

function handleForm() {
  console.log("handleForm1");
  let beginTimeList = document.getElementById("beginTimesList"); // Fixed the variable name
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

  document.getElementById("btn_add").addEventListener("click", function () {
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
  var formData = $(form).serializeArray().reduce(function (obj, item) {
    obj[item.name] = item.value;
    return obj;
  }, {});

  // Füge das `beginTimes` Array zum Datenobjekt hinzu
  formData.beginTime = beginTimes;

  // Daten für den AJAX-Aufruf vorbereiten
  var dataToSend = {
    method: "addAppointment",
    param: JSON.stringify(formData)
  };

  // AJAX-Aufruf ausführen
  $.ajax({
    type: "POST",
    url: "http://localhost/Poodle/backend/SimpleServer/serviceHandler.php",
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
    }
  });
}

