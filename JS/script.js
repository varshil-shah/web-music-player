const play = document.getElementById("play");
const music = document.querySelector("audio");
const img = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

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

const loadSong = (songs) => {
  title.textContent = songs.title;
  artist.textContent = songs.artist;
  music.src = "Music/" + songs.name + ".mp3";
  img.src = "Images/" + songs.img + ".jpg";
};

window.onload(loadSong(songs[0]));

let isPlaying = false;
const playMusic = () => {
  isPlaying = true;
  music.play();
  play.classList.replace("fa-play", "fa-pause");
  img.classList.add("anime");
};

const pauseMusic = () => {
  isPlaying = false;
  music.pause();
  play.classList.replace("fa-pause", "fa-play");
  img.classList.remove("anime");
};

play.addEventListener("click", () => {
  isPlaying ? pauseMusic() : playMusic();
});

// Changing music data

let songIndex = 0;
const nextSong = () => {
  // formula
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};

const prevSong = () => {
  // formula
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  // 1 = (1-1+6) % 6 = 0
  // 2 = (2-1+6) = 7%6 = 1
  loadSong(songs[songIndex]);
  playMusic();
};

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);
