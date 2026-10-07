// ===== Playlist =====
// Apni mp3 files ko "songs" naam ke folder mein rakh kar yahan path likhein
const playlist = [
  { title: 'Song One', artist: 'Artist A', src: 'songs/song1.mp3' },
  { title: 'Song Two', artist: 'Artist B', src: 'songs/song2.mp3' },
  { title: 'Song Three', artist: 'Artist C', src: 'songs/song3.mp3' }
];

let currentIndex = 0;

// Zaroori elements select karna
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');
const titleEl = document.getElementById('song-title');
const artistEl = document.getElementById('song-artist');

// Current song load karna
function loadSong(index) {
  const song = playlist[index];
  audio.src = song.src;
  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;
}

// Play / Pause toggle
function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = '⏸';
  } else {
    audio.pause();
    playBtn.textContent = '▶';
  }
}

// Next song
function nextSong() {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadSong(currentIndex);
  audio.play();
  playBtn.textContent = '⏸';
}

// Previous song
function prevSong() {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentIndex);
  audio.play();
  playBtn.textContent = '⏸';
}

// Time ko "0:00" format mein convert karna
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

// Progress bar aur time update karna (audio chalte waqt baar baar chalta hai)
audio.addEventListener('timeupdate', function () {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
  }
});

// User progress bar drag kare to gaana us point par jump kare
progress.addEventListener('input', function () {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume control
volumeSlider.addEventListener('input', function () {
  audio.volume = volumeSlider.value;
});

// Gaana khatam hote hi agla gaana khud chal jaye (autoplay bonus)
audio.addEventListener('ended', nextSong);

// Button clicks se functions jorna
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

// Page load hote hi pehla gaana load karna
loadSong(currentIndex);
