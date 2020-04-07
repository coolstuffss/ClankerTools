const { remote } = require('electron');
var $ = require("jquery");

$('#minimize-btn-container').on('click', function() {
    remote.getCurrentWindow().minimize()
})

$('#min-max-button').on('click', function() {
    const currentWindow = remote.getCurrentWindow()
    if(currentWindow.isMaximized()) {
      currentWindow.unmaximize()
    } else {
      currentWindow.maximize()
    }
  })

$('#close-button').on('click', function() {
  remote.app.quit()
})