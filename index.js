let countdown = 4;
let score = 0;
let timer = 5;
let prevTimer = 0;
let gameWindow = document.querySelector(".game");
let mainGameWindow = document.querySelector('.game-window');
let countdownElement = document.createElement('div');
countdownElement.classList.add('countdown-btn');
let gameStart = document.querySelector(".game-start");
let mainMenu = document.querySelector('.main-menu');
let countdownWindow = document.querySelector('.countdown-window');
let scoreElement = document.querySelector('.score');
let timerElement = document.querySelector('.timer');
let playScreen = document.querySelector('.play-screen');
scoreElement.textContent = `Score: ${score}`;
timerElement.textContent = `Timer: ${timer}`;
gameoverElement = document.querySelector('.game-over');
gameoverMessage = document.querySelector('.game-over-message');
let playAgain = document.querySelector('.play-again');
let backToMainMenu = document.querySelector('.back-to-mm');
let minute1 = document.querySelector('.m1');
let minute2 = document.querySelector('.m2');
let minute3 = document.querySelector('.m3');
let resultScore = {};
let resultScreen = document.querySelector('.result-screen')
let inputVal = document.querySelector('.username');
let results = document.querySelector('.results');
let submit = document.querySelector('.submit');
let back = document.querySelector('.back');



gameStart.addEventListener('click', () => {
    mainMenu.style.display = "none";
    gameWindow.style.display = "block";
    count();
})

const count = () => {
    let countdownInterval = setInterval(() => countdownDecrement(), 1000);
}

const countdownDecrement = () => {
    if (countdown > 0) {
        countdown -= 1;
        countdownElement.textContent = countdown;
        countdownWindow.appendChild(countdownElement);
    }

    if (countdown < 1) {
        gameWindow.removeChild(countdownWindow);
        spawner();
    }
    
} 

const timerDecrement = () => {
    timer -= 1;
    timerElement.textContent = `Timer: ${timer}`;
}

const spawner = () => {
    let s = 3;
    for (i = 0; i < s; i++) {
        let coords = getRandomPosition();
        let size = getRandomSize();
        let target = document.createElement('div');
        target.classList.add('target');
        playScreen.appendChild(target);
        target.style.position = "absolute";
        target.style.left = `${coords.left}%`;
        target.style.bottom = `${coords.bottom}%`;
        target.style.width = `${size}px`;
        target.style.height = `${size}px`;
        target.style.borderRadius = "50%"

        target.addEventListener('click', () => {
            let coords = getRandomPosition();
            let size = getRandomSize();
            target.style.left = `${coords.left}%`;
            target.style.bottom = `${coords.bottom}%`;
            target.style.width = `${size}px`;
            target.style.height = `${size}px`;
            target.style.borderRadius = "50%"
            score += 10;
            scoreElement.textContent = `Score: ${score}`;
        })
    }

    let timerCD = timer * 1000;

    let timeCountdown = setInterval(() => timerDecrement(), 1000);

    setTimeout(() => clearInterval(timeCountdown), timerCD);
    setTimeout(() => {
        gameoverElement.style.display = "block";
        gameoverMessage.textContent = `GAME OVER, YOUR SCORE: ${score}`
    }, timerCD)
}

const getRandomPosition = () => {
    let leftPosition, bottomPosition;

    leftPosition = Math.random() * (100 - 10) + 10;
    bottomPosition = Math.random() * (100 - 10) + 10;
    return {left: leftPosition, bottom: bottomPosition};
}

const getRandomSize = () => {
    let randomSize = Math.random() * (100 - 10) + 10;
    return randomSize;
}

playAgain.addEventListener('click', () => {
    score = 0;
    timer = prevTimer;
    scoreElement.textContent = `Score: ${score}`;
    timerElement.textContent = `Timer: ${timer}`;
    gameoverElement.style.display = "none";
    gameWindow.style.display = "block";
    playScreen.innerHTML = '';
    spawner();
});

minute1.addEventListener('click', () => {
    prevTimer = 60;
    timer = 60;
    timerElement.textContent = `Timer: ${timer}`;
})

minute2.addEventListener('click', () => {
    prevTimer = 120;
    timer = 120;
    timerElement.textContent = `Timer: ${timer}`;
})

minute3.addEventListener('click', () => {
    prevTimer = 180;
    timer = 180;
    timerElement.textContent = `Timer: ${timer}`;
})

submit.addEventListener('click', () => {
    let user = inputVal.value;
    resultScore[user] = score;

    let keysSorted = Object.keys(resultScore).sort(function(a,b){return score[a]-score[b]});
    let propsSorted = Object.keys(resultScore).sort(function(a,b){return score[a]-score[b]}).map(key => score[key]);

    for(i = 0; i < 10; ++i){
        let newLi = document.createElement('div');
        newLi.classList.add(`topLi`);
        newLi.textContent = `${keysSorted[i]} - ${propsSorted[i]}`;
        results.appendChild(newLi);

        if (keysSorted[i] == undefined){
            newLi.textContent = '';
        }
    }

    resultScreen.style.display = "block";
});

back.addEventListener('click', () => {
    resultScreen.style.display = "none";
})
