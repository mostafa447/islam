document.getElementById('quran-link').addEventListener('click', function(event) {
    event.preventDefault();
    toggleBackground('quran-link', 'sunnah-link');
});

document.getElementById('sunnah-link').addEventListener('click', function(event) {
    event.preventDefault();
    toggleBackground('sunnah-link', 'quran-link');
});

function toggleBackground(activeLinkId, inactiveLinkId) {
    document.getElementById(activeLinkId).classList.add('red-background');
    document.getElementById(inactiveLinkId).classList.remove('red-background');
}

function playlive(channel) {
    if(Hls.isSupported()) {
        var video = document.getElementById('livevideo');
        var hls = new Hls();
        hls.loadSource(`${channel}`);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function() {
            video.play();
        });
    }
}