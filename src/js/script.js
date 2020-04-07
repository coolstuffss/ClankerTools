var $ = require("jquery");
const fs = require('fs');

$('.content').css('display', 'none');

//mp4 files /[.=]mp4/g
//K:\SERIE TV\Star Wars - The Clone Wars\S05
/*
$('#search').on('click', () => {
    const files = fs.readdirSync($('#InputPath').val());
    var i = 0;
    $('#vidcont1').html('');
    for (let filePath of files) {
        if (filePath.match(/[.=]mp4/g)) {

        }
        $('#PathFound').append(`<option value="${filePath}"> 
                                        ${filePath} 
                                </option>`);
    }

});
*/
const videoContainer = document.querySelector('.video-container');
const video = document.querySelector('.video-container video');

const controlsContainer = document.querySelector('.video-container .controls-container');

const playPauseButton = document.querySelector('.video-container .controls button.play-pause');
const volumeButton = document.querySelector('.video-container .controls button.volume');
const fullScreenButton = document.querySelector('.video-container .controls button.full-screen');
const pipButton = document.querySelector('.video-container .controls button.picture-in-picture');

const playButton = playPauseButton.querySelector('.playing');
const pauseButton = playPauseButton.querySelector('.paused');
const fullVolumeButton = volumeButton.querySelector('.full-volume');
const mutedButton = volumeButton.querySelector('.muted');
const maximizeButton = fullScreenButton.querySelector('.maximize');
const minimizeButton = fullScreenButton.querySelector('.minimize');


const progressBar = document.querySelector('.video-container .progress-controls .progress-bar');
const watchedBar = document.querySelector('.video-container .progress-controls .progress-bar .watched-bar');
const timeLeft = document.querySelector('.video-container .progress-controls .time-remaining');

let controlsTimeout;
let previewTimeout;
controlsContainer.style.opacity = '0';
watchedBar.style.width = '0px';
pauseButton.style.display = 'none';
minimizeButton.style.display = 'none';

const displayControls = () => {
    controlsContainer.style.opacity = '1';
    document.body.style.cursor = 'initial';
    /*if (controlsTimeout) {
        clearTimeout(controlsTimeout);
    }
    controlsTimeout = setTimeout(() => {
        controlsContainer.style.opacity = '0';
        document.body.style.cursor = 'none';
    }, 5000);*/
};

const playPause = () => {
    if (video.paused) {
        video.play();
        playButton.style.display = 'none';
        pauseButton.style.display = '';
    } else {
        video.pause();
        playButton.style.display = '';
        pauseButton.style.display = 'none';
    }
};

const toggleMute = () => {
    video.muted = !video.muted;
    if (video.muted) {
        fullVolumeButton.style.display = 'none';
        mutedButton.style.display = '';
    } else {
        fullVolumeButton.style.display = '';
        mutedButton.style.display = 'none';
    }
};

const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
};

const activatePiP = () => {
    if (document.pictureInPictureElement) {
        document
            .exitPictureInPicture()
            .catch(error => {
                // Error handling
            })
    } else {
        if ('pictureInPictureEnabled' in document) {
            video.requestPictureInPicture();
        } else pipButton.disabled = true;
    }
}

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        maximizeButton.style.display = '';
        minimizeButton.style.display = 'none';
    } else {
        maximizeButton.style.display = 'none';
        minimizeButton.style.display = '';
    }
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'Space') {
        playPause();
    }
    if (event.code === 'KeyM') {
        toggleMute();
    }
    if (event.code === 'KeyF') {
        toggleFullScreen();
    }
    if (event.code === 'ArrowRight') {
        video.currentTime += 10;
    }
    if (event.code === 'ArrowLeft') {
        video.currentTime -= 10;
    }
    if (event.code === 'ArrowUp') {
        if (video.volume < 1) video.volume -= 0.05;
    }
    if (event.code === 'ArrowDown') {
        if (video.volume > 0) video.volume -= 0.05;
    }
    displayControls();
});

document.addEventListener('mousemove', () => {
    displayControls();
});

video.addEventListener('timeupdate', () => {
    watchedBar.style.width = ((video.currentTime / video.duration) * 100) + '%';
    // TODO: calculate hours as well...
    const totalSecondsRemaining = video.duration - video.currentTime;
    // THANK YOU: BEGANOVICH
    const time = new Date(null);
    time.setSeconds(totalSecondsRemaining);
    let hours = null;

    if (totalSecondsRemaining >= 3600) {
        hours = (time.getHours().toString()).padStart('2', '0');
    }

    let minutes = (time.getMinutes().toString()).padStart('2', '0');
    let seconds = (time.getSeconds().toString()).padStart('2', '0');

    timeLeft.textContent = `-${hours > 0 ? hours : ''}${minutes}:${seconds}`;
});

progressBar.addEventListener('click', (event) => {
    const pos = (event.pageX - (progressBar.offsetLeft + progressBar.offsetParent.offsetLeft)) / progressBar.offsetWidth;
    video.currentTime = pos * video.duration;
    //alert(`pos:${pos};currentTime:${pos * video.duration}`)
    //alert(event.clientX)
    $('.preview').css('left', event.clientX - ($('.preview').outerWidth() / 2));
    
});

const videoSrc = $('.video-container video').attr('src');
var videoPrev = document.createElement('video');
videoPrev.src = videoSrc;

progressBar.addEventListener('mousemove', async (event) => {
    await displayPreviewBox(event);
});

async function displayPreviewBox(event){
    $('.preview').css('opacity','1');
    if (previewTimeout) {
        clearTimeout(previewTimeout);
    }
    previewTimeout = setTimeout(() => {
        $('.preview').css('opacity','0');
    }, 2000);
    
    const pos = (event.pageX - (progressBar.offsetLeft + progressBar.offsetParent.offsetLeft)) / progressBar.offsetWidth;
    
    var left = event.clientX - ($('.preview').outerWidth() / 2);
    //left < 0 ? (left > $('body').width() ? $('body').width() - ($('.preview').outerWidth() / 2) : 0) : left
    
    if(left < 0){
        left = 10;
    }else if(left > ($('body').outerWidth() - $('.preview').outerWidth())){
        //console.log(`outer=${$('body').outerWidth()}\ninner:${$('body').width()}`)
        left = $('body').width() - ($('.preview').outerWidth()) - 10;
    }else{
        left;
    }

    $('.preview').css('left', left);
    
    var top = $('.progress-bar').offset().top - $('.preview').outerHeight() - 5;
    $('.preview').css('top', top);

    const currentTime = (new Date((pos * video.duration) * 1000).toISOString().substr(11, 8));
    //console.log(currentTime);
    $('#preview-time').html(currentTime != "00:00" ? currentTime.replace('00:','') : currentTime);
    await updatePreview(videoPrev,pos * video.duration);
}

async function updatePreview(videoPrev,time) {
    const canvas = document.getElementById('preview');
    var ctx = canvas.getContext('2d');
    $('#preview').css('width','200');
    $('#preview').css('height','112.5');
    var size = {
        width: canvas.width,
        height: canvas.height
    }

    videoPrev.currentTime = time;

    ctx.drawImage(videoPrev, 0, 0, size.width, size.height);
    //console.log(`src=${videoSrc}\ncanvas{width:${size.width},height:${size.height}}`)
}

progressBar.addEventListener('mousemoveend', () => {
    $('.preview').css('opacity', '0');
})

playPauseButton.addEventListener('click', playPause);

volumeButton.addEventListener('click', toggleMute);

pipButton.addEventListener('click', activatePiP);

fullScreenButton.addEventListener('click', toggleFullScreen);

