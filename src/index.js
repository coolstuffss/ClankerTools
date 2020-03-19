var resultInJson = undefined;

$(document).ready(() => {
    $('#callAPI').click(() => {
        fetch('https://localhost:5001/api/weatherforecast', {metod: 'GET'})
        .then( res => res.json() )
        .then( result => {
            result.forEach(element => {
                $('div').append('<hr>');
                $('div').append('<br>' + element.date);
                $('div').append('<br>' + element.temperatureC);
                $('div').append('<br>' + element.temperatureF);
                $('div').append('<br>' + element.summary);
            });
        });
    });
});