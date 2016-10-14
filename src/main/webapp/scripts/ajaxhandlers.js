/**
 * Created by Mikkel on 29/09/16.
 */

$(document).ready(function(){

    var generateTable = function() {
        $.ajax({
            method: 'GET',
            url: 'http://localhost:8080/person-rest/api/persons/',
            success: function (data) {
                $.each(data, function (key, value) {
                    table = $('#persons tr:last');
                    table.after("<tr class='person_" + value.id + "'>" +
                        "<td class='id'>" + value.id + "</td><td>" +
                        value.firstName
                        + "</td><td>" +
                        value.lastName
                        + "</td><td>" +
                        value.phone
                        + "</td><td><button class='delete'>Delete</button></td></tr>");
                });
            }
        });
    };

    var resetTable = function(){
        $('#persons tr').has('td').remove();
    };


    generateTable();

    $("table").on("click", ".delete", function() {
        var id = $(this).closest('tr').children('.id').text();
        console.log(id);
        $.ajax({
            method: 'DELETE',
            url: "http://localhost:8080/person-rest/api/persons/" + id,
            success: function () {
                resetTable();
                generateTable();
            }
        });
    });

    $("#refresh").click(function(){
        resetTable();
        generateTable();
    });


    $("#add-user").click(function(){
        var firstName = $("#firstname-field").val();
        var lastName = $("#lastname-field").val();
        var phone = $("#phone-field").val();
        $.ajax({
            method: 'POST',
            url: "http://localhost:8080/person-rest/api/persons/",
            contentType: 'application/json',
            data: JSON.stringify({
               firstName:firstName,
                lastName:lastName,
                phone:phone
            }),
            success: function(){
                resetTable();
                generateTable();
            }
        });
    });


});