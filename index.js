

const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/PunchmadeDev/Financial-Magician.mp3',
        displayName: 'Financial Magician',
        cover: 'assets/PunchmadeDev/Financial-Magician.png',
        artist: 'Punchmade Dev',
    },
    {
        path: 'assets/PINKBLXXD/Rick-Owens-Freestyle.mp3',
        displayName: 'Rick Owens Freestyle ',
        cover: 'assets/PINKBLXXD/Rick-Owens-Freestyle.jpg',
        artist: 'PINKBLXXD, Lungskull',
    },
    {
        path: 'assets/Mind Gone/Mind Gone.mp3',
        displayName: 'Mind Gone',
        cover: 'assets/Mind Gone/Mind Gone.jpg',
        artist: 'Hurricane Wisdom, Dthang',
    },
    {
        path: 'assets/Montana99/I Cant.mp3',
        displayName: 'I Cant (Sped Up)',
        cover: 'assets/Montana99/I Cant.jpg',
        artist: 'Montana99',
    },
    {
        path: 'assets/PunchmadeDev/ImRichYourPoor.mp3',
        displayName: 'Im Rich Your Poor',
        cover: 'assets/PunchmadeDev/ImRichYourPoor.jpg',
        artist: 'Punchmade Dev',
    },
    {
        path: 'assets/Bloodhound Lil Jeff/Should of Saw It.mp3',
        displayName: 'Should of Saw It',
        cover: 'assets/Bloodhound Lil Jeff/Should of Saw It.jpg',
        artist: 'Bloodhound Lil Jeff',
    },
    {
        path: 'assets/Lijay/Live Laugh Love Freaks.mp3',
        displayName: 'Live Laugh Love Freaks',
        cover: 'assets/Lijay/Live Laugh Love Freaks.jpg',
        artist: 'Lijay',
    },
    {
        path: 'assets/So Supa/Baked Chicken.mp3',
        displayName: 'Baked Chicken',
        cover: 'assets/So Supa/Baked Chicken.jpg',
        artist: 'So Supa',
    },
    {
        path: 'assets/yvngGuda/Jersey Club Freestyle.mp3',
        displayName: 'Jersey Club Freestyle',
        cover: 'assets/yvngGuda/Jersey Club Freestyle.jpg',
        artist: 'yvngGuda, Liyl Phresh',
    },
    {
        path: 'assets/skii07/Okay.mp3',
        displayName: 'Okay',
        cover: 'assets/skii07/Okay.jpg',
        artist: 'skii07',
    },
    {
        path: 'assets/frxsh/I Love You.mp3',
        displayName: 'I Love You',
        cover: 'assets/frxsh/I Love You.jpg',
        artist: 'frxsh',
    },
    {
        path: 'assets/yuno/yuno.mp3',
        displayName: 'yuno',
        cover: 'assets/yuno/yuno.png',
        artist: 'Jaybexo',
    },
    {
        path: 'assets/Duwap Kaine/Disagree.mp3',
        displayName: 'Disagree',
        cover: 'assets/Duwap Kaine/Disagree.png',
        artist: 'Duwap Kaine',
    },
    {
        path: 'assets/benihxnx/intro.mp3',
        displayName: 'intro',
        cover: 'assets/benihxnx/intro.png',
        artist: 'benihxnx',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);