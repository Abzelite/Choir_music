const musicContainer = document.querySelector('.mc')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const begin = document.querySelector('#beg')
const audio_song = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const prog_icon = document.querySelector('.prog_icon')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')

//changing notes and music
const page1 = document.querySelector('.pag1')
const page2 = document.querySelector('.pag2')
const text = document.querySelector('.mtext')
const text_title = document.querySelector('.song_title')
const sidebar_list = document.querySelector('.sidebar_list')
const sidebar = document.querySelector('.sidebar')
const searchers = document.querySelector('#search')
const searcher_butt= document.querySelector('#search_butt')
const tit= document.querySelector('#title')
const li = document.getElementsByClassName("lista_muz")

//right buttons
const allbutton = document.querySelector('.all_button')
const solobutton = document.querySelector('.solo_button')
const solovo = document.querySelector('#solo')
const allvo = document.querySelector('#all')

const saveaudio = document.querySelector('.save_audio')
const savenotes = document.querySelector('.save_notes')

let begin_time = document.querySelector('.time_begin')
let ending_time = document.querySelector('.time_end')
let speaker = document.querySelector('#speaker')
let c_volume = document.querySelector('.control-volume')
const numberInput = document.querySelector('input[type="number"]')

const start_rec = document.querySelector('#start_rec')
const stop_rec = document.querySelector('#stop_rec')
const play_rec = document.querySelector('#play_rec')

let save_rec = document.querySelector('.save_rec')
let rec_text = document.querySelector('.record-text2')
let rec_tex = document.querySelector('.record-text')

let audio_dur = null;
let songIndex;
let voi;
let isPlaying = false

//Song titles
const songs = ['Hallelujah','Ave Maria', 'The Elder Scrolls V', 'And so it goes', 'Requiem d-moll', 'Joy to the world', 'Cantate Domino', 'Daemon irrepit callidus', 'Silent night',  'Dragonborn (Skyrim Theme)', 'Psalm 150', 'Soon ah will be done', 'Marsz weselny']
//const songs = ['Hallelujah', 'Soon ah will be done', 'Cantate Domino', 'Dragonborn (Skyrim Theme)', 'Marsz weselny']
const voices = ['soprano', 'alto', 'tenor', 'bass']

// Keep track of songs
songs.sort();
// Initially load song info DOM
for(let i=0; i<songs.length; i++) {
    addSong(songs[i])
}
// Dodanie aktualnego utworu do local storage
if(localStorage.getItem('SI') !== null) {
    songIndex = songs.indexOf(localStorage.getItem('SI'))
}
else {
    songIndex = songs.indexOf("Cantate Domino")
}
// Dodanie aktualnego głosu do local storage
if(localStorage.getItem('VOICE') !== null) {
    voi = voices.indexOf(localStorage.getItem('VOICE'))
}
else {
    voi = voices.indexOf("alto")
}
loadSong(songs[songIndex], voices[voi]).then()

audio_song.onloadedmetadata = function() {
    audio_dur = audio_song.duration
};
// Update song details
async function loadSong(song, voice) {

    localStorage.setItem('SI', `${song}`)
    localStorage.setItem('VOICE', `${voice}`)
    voi = voices.indexOf(voice)
    title.innerText = song
    tit.innerText = song + " - " + voice

    const logFileText = async file => {
        const response = await fetch(file)
        return await response.text()
    }
    text.textContent = await logFileText(`resources/texts/${song}.txt`)
    text_title.textContent = `${song}`
    if(text.textContent === '<!doctype html><title>404 Not Found</title><h1 style="text-align: center">404 Not Found</h1>')
        text.textContent = 'Tekst nie został jeszcze umieszczony'
    let fil = checkFileExist(`notes/${song}/${song+'_'+voice}.mp3`)
    console.log(fil)
    pauseSong();
    toBegin();
    if(fil) {

        audio_song.src = `notes/${song}/${song + '_' + voice}.mp3`
        //audio_sop.src = `notes/${song}/${song + '_' + 'soprano'}.mp3`
        audio_dur = audio_song.duration;

    }
    let fil2 = checkFileExist(`resources/notes/${song}/${song + '_' + voice + '_1'}.png`)
    if(fil2) {
        page1.style.display = 'inline'
        page2.style.display = 'inline'
        page1.src = `resources/notes/${song}/${song + '_' + voice + '_1'}.png`
        page2.src = `resources/notes/${song}/${song + '_' + voice + '_2'}.png`
    }
    else {
        page1.style.display = 'none'
        page2.style.display = 'none'
    }

}

let output = false;
const http = new XMLHttpRequest();

function checkFileExist(url) {
        http.open('HEAD', url, false);
        http.send();
        if (http.status === 200) {
            console.log("File exists");
            output = true;
        } else {
            console.log("File doesn't exists");
            output = false;
        }
        return output
}
function addSong(title){
    let lista = document.createElement('li')
    lista.classList.add("dropdown")
    lista.classList.add("nav-item")
    lista.classList.add("lista_muz")
    lista.style.display = 'block'
    lista.id = title
    lista.innerHTML = ` <a class="nav-link dropdown-toggle"  data-toggle="dropdown" href="#">${title}<b class="caret"></b></a>
        <div class="dropdown-menu voices-menu">
            <a href="#" class="dropdown-item" onclick="loadSong('${title}', 'soprano')">soprano</a>
            <a href="#" class="dropdown-item" onclick="loadSong('${title}', 'alto')">alto</a>
            <a href="#" class="dropdown-item" onclick="loadSong('${title}', 'tenor')">tenor</a>
            <a href="#" class="dropdown-item" onclick="loadSong('${title}', 'bass')">bass</a>
        </div>`
    sidebar_list.appendChild(lista)
}


function playSong() {
    isPlaying = true
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio_song.play();


}
function pauseSong() {
    isPlaying = false
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    audio_song.pause()
}

function toBegin() {
    audio_song.currentTime = 0
}
audio_song.onended = function () {
    pauseSong()
    toBegin();
};

function prevSong() {
    songIndex--
    if(songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex], voices[voi]).then()
}

function nextSong() {
    console.log("next")
    songIndex++
    if(songIndex > songs.length - 1) {
        songIndex = 0
    }
    console.log(voices[voi])
    loadSong(songs[songIndex], voices[voi]).then()
}
function formatSecondsAsTime(secs, format) {
    let hr  = Math.floor(secs / 3600);
    let min = Math.floor((secs - (hr * 3600))/60);
    let sec = Math.floor(secs - (hr * 3600) -  (min * 60));

    if (min < 10){
        min = "0" + min;
    }
    if (sec < 10){
        sec  = "0" + sec;
    }

    return min + ':' + sec;
}
// Przesuwanie się paska progresu
function updateProgress(e) {
    const {duration, currentTime} = e.target
    const progressPercent = (currentTime / duration) * 100
    progress.style.width =  `${progressPercent}%`
    prog_icon.style.left = `${progressPercent - 1.5}%`
    begin_time.innerText =   formatSecondsAsTime(currentTime);
    rec_text.innerText = `Recording...  ${begin_time.innerText}`
    if (isNaN(duration)){
        begin_time.innerHTML = '00:00';
        ending_time.innerHTML = '00:00';
    }
    else{
        begin_time.innerHTML = formatSecondsAsTime(currentTime);
        ending_time.innerHTML = formatSecondsAsTime(duration);
    }
}

// Ustawienie ręczne progressu dla paska muzyki
function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio_song.duration
    audio_song.currentTime = (clickX / width) * duration
    begin_time.value = audio_song.currentTime;
}
function hideSidebar() {
    let sid = document.querySelector('.sidebar')
    console.log(sid.style.transform)
    if(sid.style.transform === "translate(0px, -960px)" || sid.style.transform === 'translate(0,0)') {
        document.querySelector('.hide_bar').innerText = 'Hide searcher';
        document.querySelector('.all_button').style.visibility = 'hidden'
        document.querySelector('.solo_button').style.visibility = 'hidden'
        document.querySelector('#curr_no').style.visibility = 'hidden'
        document.querySelector('#currentNote').style.visibility = 'hidden'
        sid.style.transform = "translate(0,0px)"
    }
    else {
        sid.style.transition = '1.5s'
        sid.style.transform = "translate(0,-960px)"

        document.querySelector('.hide_bar').innerText = 'Show searcher'
        document.querySelector('.all_button').style.visibility = 'visible'
        document.querySelector('.solo_button').style.visibility = 'visible'
        document.querySelector('#curr_no').style.visibility = 'visible'
        document.querySelector('#currentNote').style.visibility = 'visible'
        console.log(document.querySelector('#currentNote').style.display)

    }
}

// Wyszukiwanie lupka
function searchEngine2() {
    const text = searchers.value.toLowerCase();
    Array.prototype.forEach.call(sidebar_list.children, el => {
        const task = el.textContent
        if(task.toLowerCase().indexOf(text) !== -1) {
            el.style.display = 'block'
        } else {
            el.style.display = 'none'
        }
    })
}
// Event listeners
playBtn.addEventListener('click', () =>{
    const isPlaying = musicContainer.classList.contains('play')
    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

// Wyszukiwanie automatyczne
const searchEngine = e => {
    const text = e.target.value.toLowerCase();
    let c = 0
    Array.prototype.forEach.call(sidebar_list.children, el => {
        const task = el.textContent
        if(task.toLowerCase().indexOf(text) !== -1) {
            el.style.display = 'block'
        } else {
            el.style.display = 'none'
            c+=1
        }
    })
        let info = document.createElement('h5')
        info.classList.add("not_found")
        info.innerText = "No results"
        if(sidebar_list.children.length === c && sidebar.children.length < 4) {
            sidebar.appendChild(info);
        }
    if (c !== 14 && sidebar.children.length > 3){
        sidebar.removeChild(sidebar.lastChild)
    }
}

// Suwak głośnosci dźwięku
function handleInputChange(e) {
    let target = e.target
    if (e.target.type !== 'range') {
        target = document.getElementById('range')
    }
    const min = target.min
    const max = target.max
    const val = target.value

    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}
numberInput.addEventListener('input', handleInputChange)

//Obsluga głośności dźwięku
let old_val
const volumeControl = document.querySelector("#volume");
volumeControl.addEventListener("input", (e) => {
        handleInputChange(e)
        old_val = numberInput.value
        //gainNode.gain.value = numberInput.value;
        audio_song.volume = numberInput.value/100;
        console.log( speaker.querySelector('i.fas').classList[0])
        if(audio_song.volume < 0.5 && audio_song.volume > 0) {
            if(speaker.querySelector('i.fas').classList.contains("fa-volume-high"))
                speaker.querySelector('i.fas').classList.remove('fa-volume-high')
            if(speaker.querySelector('i.fas').classList.contains("fa-volume-off"))
                speaker.querySelector('i.fas').classList.remove('fa-volume-off')
            speaker.querySelector('i.fas').classList.add('fa-volume-low')
        }
        else if (audio_song.volume === 0){
            if(speaker.querySelector('i.fas').classList.contains("fa-volume-low"))
            speaker.querySelector('i.fas').classList.remove('fa-volume-low')
            speaker.querySelector('i.fas').classList.add('fa-volume-off')
        }
        else {
            if(speaker.querySelector('i.fas').classList.contains("fa-volume-low"))
            speaker.querySelector('i.fas').classList.remove('fa-volume-low')
            speaker.querySelector('i.fas').classList.add('fa-volume-high')
        }
    },
    false
);

speaker.addEventListener('click', () => {
    console.log(numberInput.value)
    if (speaker.querySelector('i.fas').classList.contains("fa-volume-high")) {
        speaker.querySelector('i.fas').classList.remove('fa-volume-high')
        numberInput.value = 0
        audio_song.volume = 0
        volumeControl.style.backgroundSize = '0 100%'
        speaker.querySelector('i.fas').classList.add('fa-volume-off')
    } else if (speaker.querySelector('i.fas').classList.contains("fa-volume-low")) {
        speaker.querySelector('i.fas').classList.remove('fa-volume-low')
        numberInput.value = 0
        audio_song.volume = 0
        speaker.querySelector('i.fas').classList.add('fa-volume-off')
        c_volume.value = 0;
    } else {
        numberInput.value = old_val
        audio_song.volume = numberInput.value / 100;
        volumeControl.value = old_val;

        speaker.querySelector('i.fas').classList.remove('fa-volume-off')
        speaker.querySelector('i.fas').classList.add('fa-volume-high')
        volumeControl.style.backgroundSize = `${old_val}% 100%`
    }
})

function setPlaybackRate(el) {
    const option = el.value;
    audio_song.playbackRate = option;
    if (option === 'esc') return
    console.log(option);
}

function playAllVoices() {
    $("#solo").attr('src', './../resources/images/solo.png');
    $("#all").attr('src', './../resources/images/all2.png');
    let song = localStorage.getItem("SI");
    let curr_time = audio_song.currentTime;
    audio_song.src = `notes/${song}/${song + '_' + 'all'}.mp3`

    if (playBtn.querySelector('i.fas').classList.contains('fa-pause')) {
        audio_song.currentTime = curr_time;
        audio_song.play()
        console.log(audio_song.onended)
    }
}

function playOneVoice() {
    $("#solo").attr('src', './../resources/images/solo2.png');
    $("#all").attr('src', './../resources/images/all.png');
    let song = localStorage.getItem("SI");
    let v = localStorage.getItem('VOICE');
    let curr_time = audio_song.currentTime;
    audio_song.src = `notes/${song}/${song + '_' + v}.mp3`

    if (playBtn.querySelector('i.fas').classList.contains('fa-pause')) {
        audio_song.currentTime = curr_time;
        audio_song.play()
        console.log(audio_song.currentTime)
        console.log(audio_song.duration)
        if (audio_song.currentTime === audio_song.duration) {
            pauseSong()
        }
    }
}

function saveFile(path_in, path_out) {
        const l = document.createElement('a');
        l.href = path_in;
        l.setAttribute('download', `${path_out}`);
        document.getElementsByTagName("body")[0].appendChild(l);
// Firefox
        if (document.createEvent) {
            const event = document.createEvent("MouseEvents");
            event.initEvent("click", true, true);
            l.dispatchEvent(event);
        }
// IE
        else if (l.click) {
            l.click();
        }
        l.parentNode.removeChild(l);

}
function saveNotes() {
    for(let i=1; i<3; i++) {
        let into = `resources/notes/${localStorage.getItem('SI')}/${localStorage.getItem('SI') + '_' + localStorage.getItem('VOICE') + '_' + `${i}`}.png`;
        let outo = `${localStorage.getItem('SI') + '_' + localStorage.getItem('VOICE') + '_' + i}.png`;
        saveFile(into, outo);
    }
}
function saveAudio() {
    let into = `notes/${localStorage.getItem('SI')}/${localStorage.getItem('SI')+'_'+localStorage.getItem('VOICE')}.mp3`;
    let outo = `${localStorage.getItem('SI') + '_' +localStorage.getItem('VOICE')}.mp3`;
    saveFile(into, outo);
}

let chunk = []
let mediaRecorder
let blob,audio_url,audio2
let context = new AudioContext()
navigator.mediaDevices.getUserMedia({audio:true})
    .then(stream => {

        mediaRecorder = new MediaRecorder(stream)
        mediaRecorder.ondataavailable = (e) => {
            chunk.push(e.data)
        }
        mediaRecorder.onstop = () => {
            const blob = new Blob(chunk, {'type': 'audio/ogg; codecs=opus'})
            audio_url = window.URL.createObjectURL(blob)
            audio2 = new Audio(audio_url)
            audio2.setAttribute("controls",'1')
            audio2.setAttribute("class",'audio2')
            audio2.style.margin = '20px'
            audio2.onplay = () => {
                toBegin()
                initAudio(stream)
                audio_song.play()
            }
            audio2.onended = () => {
                audio_song.pause()
            }
            audio2.onpause = () => {
                audio_song.pause()
            }
            play_rec.appendChild(audio2)
        }
    })

//https://stackoverflow.com/questions/16949768/how-can-i-reduce-the-noise-of-a-microphone-input-with-the-web-audio-api
let compresor,filter
function initAudio(stream) {
    compresor = context.createDynamicsCompressor()
    compresor.threshold.value = -50;
    compresor.knee.value = 40;
    compresor.ratio.value = 12;
    compresor.reduction= -20;
    compresor.attack.value = 0;
    compresor.release.value = 0.25;

    filter = context.createBiquadFilter()
    filter.Q.value = 8.30;
    filter.frequency.value;
    filter.gain.value = 3.0;
    filter.type = 'bandpass';
    filter.connect(compresor);

    compresor.connect(context.destination)
    filter.connect(context.destination)

    mediaStreamSource = context.createMediaStreamSource(stream)
    mediaStreamSource.connect(filter)

}

function saveRec() {
    console.log(audio2.src)
    let into = audio_url;
    let outo = 'recording.mp3'
    saveFile(into,outo)
}

start_rec.onclick = () => {
    if(play_rec.hasChildNodes()) {
        play_rec.removeChild(play_rec.firstChild)
        chunk = []
        save_rec.style.display = 'none'
        rec_text.style.display = 'none'
    }
    console.log(mediaRecorder.state)
    if(mediaRecorder.state !== 'recording') {
        toBegin()
        audio_song.play()
        mediaRecorder.start()
        console.log(begin_time.innerText)
        rec_text.style.display = 'block'
        rec_tex.textContent = 'Press square to stop recording'
    }
}
stop_rec.onclick = () => {
    if(mediaRecorder.state !== 'inactive') {
        audio_song.pause()
        mediaRecorder.stop()
        save_rec.style.display = 'block'
        rec_tex.textContent = 'Press circle to start recording'
    }
    console.log(mediaRecorder.state)
}

//https://github.com/ml5js/ml5-library/blob/main/examples/javascript/PitchDetection/PitchDetection/model/group3-shard1of1
// TONER
let stream;
const scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
let currentNote = '';
// taken from p5.Sound
function freqToMidi(f) {
    const mathlog2 = Math.log(f / 440) / Math.log(2);
    return Math.round(12 * mathlog2) + 69;
}
/*function map(n, start1, stop1, start2, stop2) {
    return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
}*/
async function setup() {
    audioContext = new AudioContext();
    stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
    });
    startPitch(stream, audioContext);
}
setup().then()


function startPitch(stream, audioContext) {
    pitch = ml5.pitchDetection('./model/', audioContext, stream, modelLoaded);
}

function modelLoaded() {
    getPitch();
}

function getPitch() {
    audioContext.resume().then()
    pitch.getPitch(function (err, frequency) {
        if (frequency) {
            const midiNum = freqToMidi(frequency);
            currentNote = scale[midiNum % 12];
            document.querySelector('#currentNote').textContent = currentNote;
            if (window.screen.width >600) {
                if (document.querySelector('#currentNote').textContent.length === 2) {
                    document.querySelector('#currentNote').style.right = '-35px'
                } else {
                    document.querySelector('#currentNote').style.right = '-28px'
                }
            }
            else {
                if (document.querySelector('#currentNote').textContent.length === 2) {
                    document.querySelector('#currentNote').style.right = '10px'
                } else {
                    document.querySelector('#currentNote').style.right = '7px'
                }
            }

        }
        getPitch();
    })
}



function dist(x1, y1, x2, y2) {
    return Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2));
}
// STEROWANIE KLAWIATURĄ
window.addEventListener('keyup', e => {
    if(e.keyCode === 32) {
        if(isPlaying)
        { pauseSong()
        }
        else {
            playSong()
        }
    }
    if(e.keyCode === 37 && audio_song.currentTime > 0) {
        audio_song.currentTime -=5;
    }
    if(e.keyCode === 39) {
        audio_song.currentTime +=5;
    }
})
window.onkeydown = function(e) {
    return e.keyCode !== 32;
};



// LISTENERS
allbutton.addEventListener('click', playAllVoices)
solobutton.addEventListener('click', playOneVoice)
searchers.addEventListener('keyup', searchEngine)
searcher_butt.addEventListener('click', searchEngine2)
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
begin.addEventListener('click', toBegin)
audio_song.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)
savenotes.addEventListener('click', saveNotes)
saveaudio.addEventListener('click', saveAudio)
save_rec.addEventListener('click', saveRec)