// import addSong from './music.js'

const keys = document.querySelectorAll('.key')

const c = document.getElementById("C")
const slider = document.querySelector('.slider')
const sidebar_list = document.querySelector('.sidebar_list')
const note_pic = document.querySelector('.note_pic')
const ln = document.querySelector('#ln');


const songs = ['Hallelujah','Ave Maria', 'The Elder Scrolls V', 'And so it goes', 'Requiem d-moll', 'Joy to the world', 'Cantate Domino', 'Daemon irrepit callidus', 'Silent night',  'Dragonborn (Skyrim Theme)', 'Psalm 150', 'Soon ah will be done', 'Marsz weselny']
const songs2 = ['Hallelujah', 'Soon ah will be done', 'Cantate Domino', 'Dragonborn (Skyrim Theme)', 'Marsz weselny'];
songs.sort();
for(let i=0; i<songs.length; i++) {
    addSong(songs[i]);
}
let allList = document.querySelectorAll(".dd")
for(let i=0; i<songs.length; i++) {
    for(let j=0; j<songs2.length; j++) {
        if (allList[i].textContent === songs2[j]) {
            allList[i].style.color =  '#F5C284FF';
        }
    }
}

note_pic.style.backgroundImage= 'url(../resources/pic_notes/C.png)'
note_pic.style.display = "block"

keys.forEach(key => {
    // console.log(key.dataset.note)
    key.addEventListener('mousedown', () => {
        playNote(key)
        console.log(key.dataset.note)
        note_pic.style.backgroundImage= `url(../resources/pic_notes/${key.dataset.note}.png)`
        note_pic.style.display = "block"
    })
    key.addEventListener('mouseup', () => {
        stopNote(key)
        note_pic.style.backgroundImage= `url(../resources/pic_notes/${key.dataset.note}.png)`
    })

})
let clicker = 0;

slider.addEventListener('click', () => {
    if(clicker%2 === 0) {
        keys.forEach(key => {
            const nota = key.dataset.note
            const nota_key = key.dataset.id
            key.innerHTML = `<div class="text_piano"><h4>${nota_key}</h4><h3>${nota}</h3></div>`
        })
    }
    else {
        keys.forEach(key => {
            const nota = key.dataset.note
            key.innerHTML = `<h3></h3>`
        })
    }
    clicker++

})
const setLoc = (tit, voice) => {
    window.location.href = '../index.html'
    loadSong(tit, voice)
}

function playNote(key) {
    const noteAudio = document.getElementById(key.dataset.note)
    noteAudio.play()
}

function stopNote(key) {
    const noteAudio = document.getElementById(key.dataset.note)
    noteAudio.pause()
    noteAudio.currentTime = 0
}
// bg_w = "inset 0 0 20px 0 #1f1d19";
const bg_w = "#f8c374"
const bg_b = "#60441b"
window.addEventListener('keydown', e => {
    if(e.key.toLowerCase() ==='z') {
        document.querySelector('.C').style.backgroundColor = bg_w
        document.getElementById('C').play()
    }
    else if(e.key === ',') {
        document.querySelector('.C2').style.backgroundColor = bg_w
        document.getElementById('C2').play()
    }
    else if(e.key.toLowerCase() === 'x') {
        document.querySelector('.D').style.backgroundColor = bg_w
        document.getElementById('D').play()
    }
    else if(e.key.toLowerCase() === '.') {
        document.querySelector('.D2').style.backgroundColor = bg_w
        document.getElementById('D2').play()
    }
    else if(e.key === 'c') {
        document.querySelector('.E').style.backgroundColor = bg_w
        document.getElementById('E').play()
    }
    else if(e.key === '/') {
        document.querySelector('.E2').style.backgroundColor = bg_w
        document.getElementById('E2').play()
    }
    else if(e.key.toLowerCase() === 'v') {
        document.querySelector('.F').style.backgroundColor = bg_w
        document.getElementById('F').play()
    }
    else if(e.key.toLowerCase() === 'b') {
        document.querySelector('.G').style.backgroundColor = bg_w
        document.getElementById('G').play()
    }
    else if(e.key.toLowerCase() === 'n') {
        document.querySelector('.A').style.backgroundColor = bg_w
        document.getElementById('A').play()
    }
    else if(e.key.toLowerCase() === 'm') {
        document.querySelector('.B').style.backgroundColor = bg_w
        document.getElementById('B').play()
    }
    else if(e.key.toLowerCase() === 's') {
        document.querySelector('.Db').style.backgroundColor = bg_b
        document.getElementById('Db').play()
    }
    else if(e.key.toLowerCase() === 'l') {
        document.querySelector('.Db2').style.backgroundColor = bg_b
        document.getElementById('Db2').play()
    }
    else if(e.key.toLowerCase() === 'd') {
        document.querySelector('.Eb').style.backgroundColor = bg_b
        document.getElementById('Eb').play()
    }
    else if(e.key === ';') {
        document.querySelector('.Eb2').style.backgroundColor = bg_b
        document.getElementById('Eb2').play()
    }
    else if(e.key.toLowerCase() === 'g') {
        document.querySelector('.Gb').style.backgroundColor = bg_b
        document.getElementById('Gb').play()
    }
    else if(e.key.toLowerCase() === 'h') {
        document.querySelector('.Ab').style.backgroundColor = bg_b
        document.getElementById('Ab').play()
    }
    else if(e.key.toLowerCase() === 'j') {
        document.querySelector('.Bb').style.backgroundColor = bg_b
        document.getElementById('Bb').play()
    }

})

function keyup_fun(note,col) {
    document.querySelector(`.`+ note).style.backgroundColor = col
    document.getElementById(note).pause()
    document.getElementById(note).currentTime = 0;
}
let col_w = "white"
let col_b = "black"
window.addEventListener('keyup', e => {
    if(e.key.toLowerCase() ==='z') {
        keyup_fun('C',col_w)
    }
    else if(e.key ===',') {
        keyup_fun('C2',col_w)
    }
    else if(e.key.toLowerCase() === 'x') {
        keyup_fun('D',col_w)
    }
    else if(e.key === '.') {
        keyup_fun('D2',col_w)
    }
    else if(e.key.toLowerCase() === 'c') {
        keyup_fun('E',col_w)
    }
    else if(e.key === '/') {
        keyup_fun('E2',col_w)
    }
    else if(e.key.toLowerCase() === 'v') {
        keyup_fun('F',col_w)
    }
    else if(e.key.toLowerCase() === 'b') {
        keyup_fun('G',col_w)
    }
    else if(e.key.toLowerCase() === 'n') {
        keyup_fun('A',col_w)
    }
    else if(e.key.toLowerCase() === 'm') {
        keyup_fun('B',col_w)
    }
    else if(e.key.toLowerCase() === 's') {
        keyup_fun('Db',col_b)
    }
    else if(e.key.toLowerCase() === 'l') {
        keyup_fun('Db2',col_b)
    }
    else if(e.key === 'd') {
        keyup_fun('Eb',col_b)
    }
    else if(e.key === ';') {
        keyup_fun('Eb2',col_b)
    }
    else if(e.key.toLowerCase() === 'g') {
        keyup_fun('Gb',col_b)
    }
    else if(e.key.toLowerCase() === 'h') {
        keyup_fun('Ab',col_b)
    }
    else if(e.key.toLowerCase() === 'j') {
        keyup_fun('Bb',col_b)
    }
})

function addSong(title){
    let lista = document.createElement('li')
    lista.classList.add("dropdown")
    lista.classList.add("nav-item")
    lista.classList.add("lista_muz")
    lista.style.display = 'block'
    lista.id = title
    lista.innerHTML = ` <a class="nav-link dropdown-toggle dd"  data-toggle="dropdown" href="#">${title}<b class="caret"></b></a>
        <div class="dropdown-menu">
            <a href="#" class="dropdown-item" onclick="window.location.href = '../index.html'">soprano</a>
            <a href="#" class="dropdown-item" onclick="window.location.href = '../index.html'">alto</a>
            <a href="#" class="dropdown-item" onclick="window.location.href = '../index.html'">tenor</a>
            <a href="#" class="dropdown-item" onclick="window.location.href = '../index.html'">bass</a>
        </div>`
    sidebar_list.appendChild(lista)
}



function hideSidebar() {
    let sid = document.querySelector('.sidebar')
    if(sid.style.transform === "translate(0px, -960px)" || sid.style.transform === 'translate(0,0)') {
        document.querySelector('.hide_bar').innerText = 'Hide searcher';
        sid.style.transform = "translate(0,0px)"
    }
    else {
        sid.style.transition = '1.5s'
        sid.style.transform = "translate(0,-960px)"
        document.querySelector('.hide_bar').innerText = 'Show searcher'
    }
}