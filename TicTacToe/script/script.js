const statusDisplay = document.querySelector(".game-status")
const winner = document.getElementById("winner");
const modal = document.querySelector(".modal-container");
const resultMsg = document.getElementById("result-message");
const playerOneScore = document.getElementById("p1-score");
const playerTwoScore = document.getElementById("p2-score")
const turnContainer = document.getElementById("turn-container");
const btnContainer =document.querySelector(".btn-container");
const gameContainer = document.getElementById("game-container");
const playGameContainer = document.querySelector(".play-game");
const gameCell = gameContainer.querySelectorAll("div") //array of cells
const header = document.getElementById("tictactoe");
//const palaman1 = document.getElementById("palaman");
const palaman2 = document.getElementById("palaman2");
const palaman3 = document.getElementById("palaman3");

// buttons
const xBtn = document.getElementById("X");
const oBtn = document.getElementById("O");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restartBtn");
const historyBtn = document.getElementById("history-btn");
const playBtn = document.getElementById("playBtn");

let gameActive= false;
let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer;
let gameHistory = [];
let prevHistory= []
let xInitialScore = 0;
let oInitialScore = 0;

const winningMessage = () => `${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

statusDisplay.innerHTML = currentPlayerTurn();

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
    );
    
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
   }
    let moveLogs = {}

    moveLogs.index = clickedCell;
    moveLogs.turn = currentPlayer;
    gameHistory.push(moveLogs);
 
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        winner.innerHTML = winningMessage();
        resultMsg.innerHTML = "Congratulations!"

        if(currentPlayer === "X"){
            xInitialScore++
            playerOneScore.innerHTML = xInitialScore;
        } if(currentPlayer === "O"){
            oInitialScore++
            playerTwoScore.innerHTML = oInitialScore;
        }
        statusDisplay.innerHTML = `Game Over!`;
        gameActive = false;
        modal.style.display = "flex"
        palaman2.style.display = "none";
        palaman3.style.display = "none";
    
        return;
    }
    
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        winner.innerHTML = drawMessage();
        resultMsg.innerHTML = "Oops!"
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        modal.style.display = "flex"
        palaman2.style.display = "none";
        palaman3.style.display = "none";


        return;
    }
    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleRestartGame() {
    gameActive = false;
    //currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameCell.forEach(cell => cell.innerHTML = "");
    statusDisplay.innerHTML = currentPlayerTurn();
    turnContainer.style.display = "flex";
    statusDisplay.style.display = "none"
    modal.style.display = "none"
    gameContainer.style.display = "none";
    gameHistory.length = 0;
    prevHistory.length = 0;
};

//Play button 
function playGame(){
    turnContainer.style.display = "flex";
    playGameContainer.style.display ="none";
}
playBtn.addEventListener("click", playGame);

//Decides who takes the first move
function xTurn(){
    gameContainer.style.display = "grid";
    currentPlayer = "X";
    gameActive = true;
    turnContainer.style.display = "none";
    statusDisplay.style.display = "block";
    header.style.fontSize = "10vmin";
    header.style.margin = "0";
    //palaman1.style.display = "block";
    palaman2.style.display = "block";
    palaman3.style.display = "block";

    handlePlayerChange();
} 
xBtn.addEventListener("click", xTurn);

function oTurn(){
    gameContainer.style.display = "grid";
    currentPlayer = "O";
    gameActive = true;
    handlePlayerChange();
    turnContainer.style.display = "none";
    statusDisplay.style.display = "block"
    header.style.fontSize = "10vmin";
    header.style.margin = "0";
    //palaman1.style.display = "block";
    palaman2.style.display = "block";
    palaman3.style.display = "block";

}
oBtn.addEventListener("click", oTurn);

function displayHistory(){
    modal.style.display = "none";
    prevBtn.style.visibility = "visible";
    btnContainer.style.display = "flex";
}
historyBtn.addEventListener("click", displayHistory)


function prevMove(){
    nextBtn.style.visibility = "visible";
}
prevBtn.addEventListener("click", prevMove);

function restartGame(){
    gameActive = false;
    gameContainer.style.display = "none";
    btnContainer.style.display = "none";
    handleRestartGame();
}
restartBtn.addEventListener("click", restartGame);


gameCell.forEach(cell => {
    cell.addEventListener('click', handleCellClick)
});


prevBtn.addEventListener('click', () => {
    nextBtn.style.visibility = 'visible';
    
    if (gameHistory.length != 0) {
    let lastMove = gameHistory[gameHistory.length - 1];
    let lastCell = lastMove.index;
        lastCell.innerHTML = "";
        prevHistory.push(lastMove);
        gameHistory.pop();
        console.log(prevHistory);
        console.log(gameHistory);
    } if (gameHistory.length === 0) {
        prevBtn.style.visibility = 'hidden';
    }
});

nextBtn.addEventListener('click', () => {
    prevBtn.style.visibility = 'visible';
    if (prevHistory.length != 0) {
    let nextMove = prevHistory[prevHistory.length - 1];
    let nextCell = nextMove.index;
    let nextTurn = nextMove.turn;
        nextCell.innerHTML = nextTurn;
        gameHistory.push(nextMove);
        prevHistory.pop();
    } if (prevHistory.length === 0) {
        nextBtn.style.visibility = 'hidden';
    }
})

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('#new-game').addEventListener("click", handleRestartGame);

let firstName = "John";
let lastName = "Smith"
let sum = 1*52;
console.log(firstName.startsWith("J"));
console.log(lastName.endsWith("th"));
console.log(firstName.includes("Joh"));
console.log(lastName.includes("th"));
console.log(`${sum}`.repeat(5));

let years = [1, 2, 3, 4, 5];
var ages5 = years.map(function(el){
	return 2016 - el;
});
console.log(ages5);

// ES6
let ages6 = years.map(el => 2016 - el);
console.log(ages6);

