const $ = require('jquery');

$(document).ready(() => {
    $('#callAPI').click(() => {
        fetch('https://localhost:5001/api/todo', {metod: 'GET'})
        .then( res => res.json() )
        .then( result => {
            result.forEach(element => {
                $('#apiResult').append('<hr>');
                $('#apiResult').append('<br>' + element.id);
                $('#apiResult').append('<br>' + element.name);
                $('#apiResult').append('<br>' + element.stato);
                $('#apiResult').append('<br>' + element.dataInizio);
                $('#apiResult').append('<br>' + element.dataFine);
            });
            $('#apiResult').append('<hr>');
        });
    });
});