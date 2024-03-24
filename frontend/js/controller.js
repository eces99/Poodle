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
        submitdata($("#appointmentForm").serialize());
    });
});

function submitdata(data) {
    console.log(data);
    $.ajax({
        type: "POST",
        url: "http://localhost/Poodle/backend/SimpleServer/serviceHandler.php",
        cache: false,
        data: {method: "addAppointment", param: data},
        dataType: "json",
        success: function(response) {
            alert(response);
        }
    });
}
