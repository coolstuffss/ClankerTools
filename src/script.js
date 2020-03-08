const fs = require('fs');

$('#search').on('click', () => {
    const files = fs.readdirSync($('#InputPath').val());

    for (let filePath of files) {
        $('#PathFound').append(`<option value="${filePath}"> 
                                        ${filePath} 
                                </option>`);
    }

});