const music = document.querySelector('audio'),
    prevBtn = document.querySelector('.play-prev'),
    playBtn = document.querySelector('.play'),
    nextBtn = document.querySelector('.play-next'),
    current = document.getElementById('current-time'),
    durationTime = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    progressContainer = document.getElementById('progress-container'),
    artist = document.querySelector('.artist'),
    title = document.querySelector('.title'),
    volumeContainer = document.getElementById('volume-progress-container'),
    volumeProgress = document.getElementById('volume-progress'),
    volumeIcon = document.querySelector('.volume-icon'),
    playlist = document.querySelector('.play-list');

const songs = [
    {
        name: 'MacDeMarcoMyKindofWoman',
        displayName: 'My Kind Of Woman',
        artist: 'Mac DeMarco',
    },
    {
        name: 'NurnbergAbdymi',
        displayName: 'Abdymi',
        artist: 'Nurnberg',
    },
    {
        name: 'SurfCurseLabyrinth',
        displayName: 'Labyrinth',
        artist: 'Surf Curse',
    },
    
];

//creating playlist
function playlistFunction(){
    for (let i=0; i<songs.length;i++){
      let li = document.createElement('li');
      li.classList.add(`songNumber${i}`);
      li.innerHTML = `${songs[i].displayName} - ${songs[i].artist}`;
      playlist.appendChild(li);
      let div = document.createElement('div');
      div.classList.add('small_play');
      li.appendChild(div);
    }
}


playlistFunction();
// check if play
let isPlaying = false;
    // Play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('play','pause');
    music.play();
}
    // Pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('pause','play');
    music.pause();
}
let songIndex = 0;

function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `./assets/music/${song.name}.mp3`;
    /// подчеркивает активный элменет в плейлисте
    for (let j=0;j<songs.length;j++){
        let currentColor = document.querySelector(`.songNumber${j}`);
        if (j == songIndex){
            currentColor.style.color = `darkcyan`;
        } else {
            currentColor.style.color = `white`; 
        }
    }
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

loadSong(songs[songIndex]);

// Progress bar 
function updateProgressBar(event) {
    if (isPlaying){
        const{ duration, currentTime} = event.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;

        }
        if (durationSeconds) {
            durationTime.textContent = `${durationMinutes}:${durationSeconds}`;
        }
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
    current.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

///set progress
function setProgress(event){
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
}


//volume

let lastVolume = 1;
function changeVolume(event){
    let volume = event.offsetX/volumeContainer.offsetWidth;
    if (volume < 0.1) {
        volume = 0;
    }
    if (volume > 0.9) {
        volume = 1;
    }
    volumeProgress.style.width = `${volume * 100}%`;
    music.volume = volume;
    if (volume === 0){
        volumeIcon.classList.replace('volume-icon','volume-icon-off');
      }
      else{
        volumeIcon.classList.replace('volume-icon-off','volume-icon');
      }
    lastVolume = volume;
}

function mute() {
    if (music.volume){
        lastVolume = music.volume;
        music.volume = 0;
        volumeProgress.style.width = 0;
        volumeIcon.classList.replace('volume-icon','volume-icon-off');
    }
    else{
        music.volume = lastVolume;
        volumeProgress.style.width = `${lastVolume * 100}%`;
        volumeIcon.classList.replace('volume-icon-off','volume-icon');
    }
}
//Event listeners
//smallPlayBtn.addEventListener('click',() => (isPlaying ? pauseSong() : playSong()));
document.querySelectorAll(".small_play").forEach(small_play => 
    small_play.addEventListener('click',() => (isPlaying ? pauseSong() : playSong())));
playBtn.addEventListener('click',() => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgress);
volumeContainer.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', mute);