const play = document.getElementById("play");
const music = document.querySelector("audio");
const img = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
let progress = document.getElementById("progress");
let currentTimeUpdate = document.getElementById("current_time");
let durationTime = document.getElementById("duration");
const progress_div = document.getElementById("progress_div");
const loop = document.getElementById("loop");
const mute = document.getElementById("mute");

const songs = [
  {
    name: "chogada",
    title: "Chogada Tara",
    artist: "Darshan Raval",
    img: "image-1",
  },
  {
    name: "coca-cola-tu",
    title: "Coca-Cola-Tu",
    artist: "Tony Kakkar",
    img: "image-2",
  },
  {
    name: "give-me",
    title: "Some-Sunshine",
    artist: "Sharman-Joshi",
    img: "image-3",
  },
  {
    name: "Perfect",
    title: "Perfect",
    artist: "Ed Sheeran",
    img: "image-1",
  },
  {
    name: "humsafar",
    title: "Humsufar",
    artist: "Akhil Sachdeva",
    img: "image-4",
  },
  {
    name: "namo",
    title: "Namo-Namo",
    artist: "Amit Tridevi",
    img: "image-2",
  },
  {
    name: "zing-zing-zingat",
    title: "Zingaat",
    artist: "Ajay Atul",
    img: "image-3",
  },
];

let isPlaying = false;
const playMusic = () => {
  isPlaying = true;
  music.play();
  play.classList.replace("fa-play", "fa-pause");
  img.classList.add("anime");
  play.title = "pause";
};

const pauseMusic = () => {
  isPlaying = false;
  music.pause();
  play.classList.replace("fa-pause", "fa-play");
  img.classList.remove("anime");
  play.title = "play";
};

play.addEventListener("click", () => {
  isPlaying ? pauseMusic() : playMusic();
});

// Changing music data

const loadSong = (songs) => {
  title.textContent = songs.title;
  artist.textContent = songs.artist;
  music.src = "Music/" + songs.name + ".mp3";
  img.src = "Images/" + songs.img + ".jpg";
};

let songIndex = 0;
const nextSong = () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};

onloadFun = () => loadSong(songs[0]);

const prevSong = () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};

// Looping a music

const replaySong = () => {
  loop.classList.toggle("active");
  if (loop.classList.contains("active")) {
    music.loop = true;
    loop.title = "Unloop";
  } else {
    music.loop = false;
    loop.title = "Loop";
    music.addEventListener("ended", nextSong);
  }
};

// mute the audio

const muteAudio = () => {
  mute.classList.toggle("active");
  if (mute.classList.contains("active")) {
    music.muted = true;
    mute.title = "Unmute";
  } else {
    music.muted = false;
    mute.title = "mute";
  }
};

// Progress JS

// search - time update audio event
music.addEventListener("timeupdate", (event) => {
  const { currentTime, duration } = event.srcElement;
  // Percentage
  let progressTime = (currentTime / duration) * 100;
  progress.style.width = `${progressTime}%`;

  // current time update:
  let minuteCurrentTime = Math.floor(currentTime / 60);
  let secondCurrentTime = Math.floor(currentTime % 60);
  if (secondCurrentTime < 10) {
    secondCurrentTime = `0${secondCurrentTime}`;
  }
  currentTimeUpdate.textContent = `${minuteCurrentTime}:${secondCurrentTime}`;

  // music duration update
  let minuteDuration = Math.floor(duration / 60);
  let secondDuration = Math.floor(duration % 60);
  if (secondDuration < 10) {
    secondDuration = `0${secondDuration}`;
  }
  if (duration) {
    durationTime.textContent = `${minuteDuration}:${secondDuration}`;
  }
});

// progress on click functionality
progress_div.addEventListener("click", (event) => {
  const { duration } = music;
  let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
  music.currentTime = move_progress;
});

music.addEventListener("ended", nextSong);

// If the music get completed it will automatically play the next one.

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);
