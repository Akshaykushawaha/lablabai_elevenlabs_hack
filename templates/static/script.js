// script.js

// Toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - (window.innerHeight * 0.55);
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // Active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // Active sections for animation on scroll
            sec.classList.add('show-animate');
        }
        // If you want animation that repeats on scroll, use this
        else {
            sec.classList.remove('show-animate');
        }
    });

    // Sticky navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // Animation footer on scroll
    let footer = document.querySelector('footer');
    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
};

// Audio recording and saving
let mediaRecorder;
let audioChunks = [];
let recordedAudioUrl;

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const saveBtn = document.getElementById("saveBtn");
const playBtn = document.getElementById("playBtn");
const playBtnout = document.getElementById("playBtnout");

startBtn.addEventListener("click", startRecording);
stopBtn.addEventListener("click", stopRecording);
saveBtn.addEventListener("click", saveRecording);
playBtn.addEventListener("click", playRecording);
playBtnout.addEventListener("click", playRecordingout);

function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = function (event) {
                if (event.data.size > 0) {
                    audioChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = function () {
                const blob = new Blob(audioChunks, { type: 'audio/wav' });
                recordedAudioUrl = URL.createObjectURL(blob);

                audioChunks = [];
                saveBtn.disabled = false;
                playBtn.disabled = false;

                const audio = new Audio(recordedAudioUrl);
                audio.controls = true;
                document.body.appendChild(audio);
            };

            mediaRecorder.start();
            startBtn.disabled = true;
            stopBtn.disabled = false;
        })
        .catch(function (err) {
            console.error("Error accessing the microphone:", err);
        });
}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }
}

function saveRecording() {
    if (recordedAudioUrl) {
        const a = document.createElement('a');
        a.href = recordedAudioUrl;
        a.download = 'recording.wav';
        document.body.appendChild(a);
        a.click();
    }
}

function playRecording() {
    if (recordedAudioUrl) {
        const audio = new Audio(recordedAudioUrl);
        audio.controls = true;
        audio.play();
        document.body.appendChild(audio);
    }
}

function playRecordingout() {
    const recordedAudioUrlout = "test.mp3"; // Set the URL of the audio file "test.mp3"
    if (recordedAudioUrlout) {
        const audio1 = new Audio(recordedAudioUrlout);
        audio1.controls = true;
        audio1.play();
        document.body.appendChild(audio1);
    }
}

function showOptions() {
    var mainSelect = document.getElementById("mainSelect");
    var option1Div = document.getElementById("option1Div");
    var option2Div = document.getElementById("option2Div");

    if (mainSelect.value === "option1") {
        option1Div.style.display = "block";
        option2Div.style.display = "none";
    } else if (mainSelect.value === "option2") {
        option1Div.style.display = "none";
        option2Div.style.display = "block";
    } else {
        option1Div.style.display = "none";
        option2Div.style.display = "none";
    }
}


//let vt ="";
function submitForm() {
    var userInput = document.getElementById("user-input").value;
    var Launguage = document.getElementById("Launguage").value;
    fetch('/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_input: userInput,
            Launguage: Launguage,
        }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("user-output").textContent = data.user_output || "The output will be displayed here";;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function trainForm() {
    var userInput = document.getElementById("user-input").value;
    fetch('/train', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_input: userInput,
        }),
    })
    .catch(error => {
        console.error('Error:', error);
    });
}