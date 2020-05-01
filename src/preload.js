// const $ = require('jquery');
// const api = require('./../lib/apifetch');

// api.getAllTodos()
// .then(res => res.json())
// .then(result => {
//     result.forEach(element => {
//         $('#APIresponse').append('<div class="div-table-row" id="APIresponse">');
//         $('#APIresponse').append(`<div class="div-table-col">${element.id}</div>`);
//         $('#APIresponse').append(`<div class="div-table-col">${element.name}</div>`);
//         $('#APIresponse').append(`<div class="div-table-col">${element.stato}</div>`);
//         $('#APIresponse').append(`<div class="div-table-col">${element.dataInizio}</div>`);
//         $('#APIresponse').append(`<div class="div-table-col">${element.dataFine}</div>`);
//         $('#APIresponse').append('</div>');
//     });
// });

// fetch('https://localhost:5001/api/todo', {metod: 'GET'})
// .then( res => res.json() )
// .then( result => {
//     result.forEach(element => {
//         $('#APIresponse').append('<div class="div-table-row" id="APIresponse">');
//         $('#APIresponse').append(`<div class="div-table-col">${element.id}</div>`);
//         $('#APIresponse').append(`<div class="div-table-col">${element.name}</div>`);
//         $('#APIresponse').append(`<div class="div-table-col">${element.stato}</div>`);
//         $('#APIresponse').append(`<div class="div-table-col">${element.dataInizio}</div>`);
//         $('#APIresponse').append(`<div class="div-table-col">${element.dataFine}</div>`);
//         $('#APIresponse').append('</div>');
//     });
// });