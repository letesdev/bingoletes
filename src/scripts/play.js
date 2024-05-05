// Bingo board variables
var NB_NUMEROS = 80;
var bingo_board = null;

// Timer variables
var timer = null;
var timerRunning = false;
var bingo_speed = 3.5 * 1000;
var timerRuns = NB_NUMEROS + 1;
const pauseButton = document.getElementById('PauseButton');
const playButton = document.getElementById('PlayButton');

// Bingo board functions
function new_game(NB_NUMEROS) {
    // Genera una lista de números de 1 a NB_NUMEROS
    let bingo_play = Array.from({ length: NB_NUMEROS }, (_, i) => i + 1);

    // Baraja la lista de números
    for (let i = bingo_play.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [bingo_play[i], bingo_play[j]] = [bingo_play[j], bingo_play[i]];
    }

    let board = {
        NB_NUMEROS: NB_NUMEROS,
        bingo_play: bingo_play,
        current_index: 0,
        said_numbers: [],
    };
    //console.log(board["bingo_play"]);
    return board;
}

function pop_number(board) {
    board["said_numbers"].push(board["bingo_play"].pop());
    board["current_index"]++;
    //console.log(board["said_numbers"]);
}

// Timer functions
function stopTimer() {
    clearInterval(timer);
    //console.log("Timer paused.");
}

function TimerIntervalFunction() {
    pop_number(bingo_board);
    update_last_numbers_table(bingo_board["said_numbers"]);

    timerRuns -= 1;
    if (timerRuns <= 0) {
        stopTimer();
        alert("Bingo terminado!");
        window.location.href = "index.html";
    }
    say_number(bingo_board["said_numbers"][bingo_board["said_numbers"].length - 1],);
    update_bingo_table(bingo_board["said_numbers"][bingo_board["said_numbers"].length - 1])
}

function startTimer() {
    timer = setInterval(TimerIntervalFunction, bingo_speed);
}

// UI functions
function play_pause(event) {
    /* var audio = new Audio('../audio/79.mp3');
        audio.play(); */
    if (timerRunning == true) {
        console.log("pausing game...");
        stopTimer();
        timerRunning = !timerRunning;
        // bingo_status = false;
        pauseButton.classList.toggle("hidden");
        playButton.classList.toggle("hidden");
    } else {
        console.log("(re)starting game...");
        startTimer();
        timerRunning = !timerRunning;
        // bingo_status = true;
        pauseButton.classList.toggle("hidden");
        playButton.classList.toggle("hidden");
    }
}

function update_last_numbers_table(said_numbers) {
    let last_index = said_numbers.length;
    //document.getElementById("last_numbers_1").innerHTML = bingo_board["said_numbers"][last_index - 1];
    for (let i = 1; i < 6; i++) {
        //console.log(bingo_board["said_numbers"][last_index - i])
        if (said_numbers[last_index - i] != undefined) {
            let last_numbers_id = "last_numbers_" + i;
            //console.log(last_numbers_id);
            document.getElementById(last_numbers_id).innerHTML =
                said_numbers[last_index - i];
        }
    }
}

function update_bingo_table(said_number) {
    document.getElementById("number_" + said_number).classList.add("text-green-500");
}

function say_number(said_number) {
    var audio = new Audio("audio/" + said_number + ".mp3");
    audio.play();
}

// Game
document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        play_pause(event);
    }
});

bingo_board = new_game(NB_NUMEROS);
//play_pause();
pauseButton.addEventListener('click', play_pause);
playButton.addEventListener('click', play_pause);