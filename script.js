const video = document.getElementById("video");

const playBtn = document.getElementById("playBtn");
const bigPlay = document.getElementById("bigPlay");

const backBtn = document.getElementById("backBtn");
const forwardBtn = document.getElementById("forwardBtn");

const muteBtn = document.getElementById("muteBtn");

const volume = document.getElementById("volume");

const progress = document.getElementById("progress");

const time = document.getElementById("time");

const subtitleBtn = document.getElementById("subtitleBtn");

const fullscreenBtn =
    document.getElementById("fullscreenBtn");

const videoContainer =
    document.querySelector(".video-container");

const track =
    document.getElementById("subtitles");



/* =========================
   PLAY / PAUSE
========================= */

function togglePlay() {

    if (video.paused) {

        video.play();

    } else {

        video.pause();

    }

}


playBtn.addEventListener("click", togglePlay);

bigPlay.addEventListener("click", togglePlay);

video.addEventListener("click", togglePlay);



/* =========================
   UPDATE PLAY BUTTON
========================= */

video.addEventListener("play", () => {

    playBtn.textContent = "❚❚";

    bigPlay.textContent = "❚❚";

    videoContainer.classList.add("playing");

});


video.addEventListener("pause", () => {

    playBtn.textContent = "▶";

    bigPlay.textContent = "▶";

    videoContainer.classList.remove("playing");

});



/* =========================
   SKIP
========================= */

backBtn.addEventListener("click", () => {

    video.currentTime -= 10;

});


forwardBtn.addEventListener("click", () => {

    video.currentTime += 10;

});



/* =========================
   PROGRESS
========================= */

video.addEventListener("timeupdate", () => {

    if (!video.duration) return;

    const percentage =
        (video.currentTime / video.duration) * 100;

    progress.value = percentage;

    time.textContent =
        formatTime(video.currentTime)
        + " / "
        + formatTime(video.duration);

});


progress.addEventListener("input", () => {

    if (!video.duration) return;

    video.currentTime =
        (progress.value / 100) * video.duration;

});



/* =========================
   FORMAT TIME
========================= */

function formatTime(seconds) {

    if (isNaN(seconds)) return "00:00";

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        Math.floor(seconds % 60);

    return (
        String(minutes).padStart(2, "0")
        + ":"
        + String(secs).padStart(2, "0")
    );

}



/* =========================
   VOLUME
========================= */

volume.addEventListener("input", () => {

    video.volume = volume.value;

    video.muted = false;

    updateVolumeIcon();

});


/* =========================
   MUTE
========================= */

muteBtn.addEventListener("click", () => {

    video.muted = !video.muted;

    updateVolumeIcon();

});


function updateVolumeIcon() {

    if (video.muted || video.volume === 0) {

        muteBtn.textContent = "🔇";

    }

    else if (video.volume < 0.5) {

        muteBtn.textContent = "🔉";

    }

    else {

        muteBtn.textContent = "🔊";

    }

}



/* =========================
   SUBTITLES
========================= */

const textTrack = track.track;

textTrack.mode = "showing";

subtitleBtn.classList.add("active");


subtitleBtn.addEventListener("click", () => {

    if (textTrack.mode === "showing") {

        textTrack.mode = "hidden";

        subtitleBtn.classList.remove("active");

    }

    else {

        textTrack.mode = "showing";

        subtitleBtn.classList.add("active");

    }

});



/* =========================
   FULLSCREEN
========================= */

fullscreenBtn.addEventListener("click", () => {

    if (!document.fullscreenElement) {

        videoContainer.requestFullscreen();

    }

    else {

        document.exitFullscreen();

    }

});



/* =========================
   KEYBOARD
========================= */

document.addEventListener("keydown", (event) => {

    // Space

    if (
        event.code === "Space"
        &&
        document.activeElement.tagName !== "INPUT"
    ) {

        event.preventDefault();

        togglePlay();

    }


    // Arrow left

    if (event.code === "ArrowLeft") {

        video.currentTime -= 5;

    }


    // Arrow right

    if (event.code === "ArrowRight") {

        video.currentTime += 5;

    }


    // Mute

    if (event.code === "KeyM") {

        video.muted = !video.muted;

        updateVolumeIcon();

    }

});