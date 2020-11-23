function Sound(path) {
    var audio = new Audio();
    audio.src = path;
    audio.autoplay = true;
}

let burrowUp = function() {
    let old = document.querySelector('.burrowUp');
    let number = Math.floor((Math.random() * 9) + 1);
    let newNode = document.querySelector(".g" + number);
    old.classList.remove('burrowUp');
    newNode.classList.add('burrowUp');
}

let play = document.getElementById('play');
let rePlay = document.getElementById('retry');
let i = 0;
let time = 3;


function startGame() {
    i = 0;
    console.log("start");
    document.querySelector('.gameRules').style.display = "none";
    setTimeout(endGame, 30000);


    var up = setInterval(burrowUp, 800);

    let clicks = document.querySelectorAll('.burrow-hole');
    let score = document.querySelector('.score')


    score.textContent = 0;

    for (let click of clicks) {
        click.onclick = function() {
            if (click.classList.contains('burrowUp')) {
                ++i;
                score.textContent = i;
                Sound('src/audio/hit.mp3')
                burrowUp();
            }
        }
    }

    let timeLeft = document.querySelector('.time');
    time = 30;
    timeLeft.textContent = time;

    function updateTimer() {
        --time;
        timeLeft.textContent = time;
        console.log(time);
        if (time <= 0) {
            clearInterval(timeIntrval);
            clearInterval(up);
        }
    }


    var timeIntrval = setInterval(updateTimer, 1000)
}

let reGame = function() {
    console.log("re");
    document.querySelector('.endGame').classList.add('none');
    document.querySelector('.endScore').textContent = document.querySelector('.score').textContent;
    document.querySelector('.gameBackground').classList.remove('none');
    document.querySelector('.score').textContent = 0;
    document.querySelector('.time').textContent = 30;
    startGame();
}

let endGame = function() {
    document.querySelector('.endGame').classList.remove('none');
    document.querySelector('.endScore').textContent = document.querySelector('.score').textContent;
    document.querySelector('.gameBackground').classList.add('none');

}

play.onclick = function() {
    startGame();
}

rePlay.onclick = function() {
    reGame();
}