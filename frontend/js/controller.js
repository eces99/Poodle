//Starting point for JQuery init
/*$(document).ready(function () {
    $("#searchResult").hide();
    $("#btn_Search").click(function (e) {
       loaddata($("#seachfield").val());
    });

});

function loaddata(searchterm) {

    $.ajax({
        type: "GET",
        url: "../serviceHandler.php",
        cache: false,
        data: {method: "queryPersonByName", param: searchterm},
        dataType: "json",
        success: function (response) {
            
            $("#noOfentries").val(response.length);
            $("#searchResult").show(1000).delay(1000).hide(1000);
        }
        
    });
}*/

//Starting point for JQuery init
$(document).ready(function() {
    $("#appointmentForm").submit(function(e) {
        e.preventDefault();
        submitdata(this);
    });
});

function submitdata(form) {
    var data = $(form).serializeArray().reduce(function(obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/Poodle/backend/SimpleServer/serviceHandler.php",
        cache: false,
        data: {method: "addAppointment", param: JSON.stringify(data)},
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(response) {
            alert(JSON.stringify(response));
        }
    });
}
        // Function to fetch and display appointments
        function fetchAppointments() {
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/Poodle/backend/SimpleServer/serviceHandler.php",
                data: { method: "queryAppointments" },
                dataType: "json",
                success: function(response) {
                    displayAppointments(response);
                },
                error: function(xhr, status, error) {
                    console.error('Error fetching appointments:', error);
                }
            });
        }
    
        // Function to display appointments in a table
        function displayAppointments(appointments) {
            var table = "<table><tr><th>Appointment ID</th><th>Title</th><th>Place</th><th>Info</th><th>Begin Time</th><th>Duration</th></tr>";
            appointments.forEach(function(appointment) {
                    appointment.forEach(function(appt) {
                table += "<tr><td>" + appt.id + "</td><td>" + appt.title + "</td><td>" + appt.place + "</td><td>" + appt.info + "</td><td>" + appt.beginTime + "</td><td>" + appt.duration + "</td></tr>";
                    });
            });
            table += "</table>";
            $("#appointmentList").html(table);
        }
    
        // Fetch appointments when the page loads
        fetchAppointments();

    
