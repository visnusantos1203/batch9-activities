const statusDisplay = document.querySelector(".game-status")
const winner = document.getElementById("winner");
const modal = document.querySelector(".modal-container");
const resultMsg = document.getElementById("result-message");
const playerOneScore = document.getElementById("p1-score");
const playerTwoScore = document.getElementById("p2-score")
let xInitialScore = 0;
let oInitialScore = 0;
const xBtn = document.getElementById("X");
const oBtn = document.getElementById("O");
const turnContainer = document.getElementById("turn-container");

let gameActive = false;
let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer;
let gameHistory = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
statusDisplay.innerHTML = currentPlayerTurn();

//decides who takes the first move

xBtn.addEventListener("click", xTurn);
function xTurn(){
    currentPlayer = "X";
    gameActive = true;
    handlePlayerChange();

    console.log(currentPlayer);

    turnContainer.style.display = "none";
    statusDisplay.style.display = "block";
} 

oBtn.addEventListener("click", oTurn);
function oTurn(){
    currentPlayer = "O";
    gameActive = true;
    handlePlayerChange();
    turnContainer.style.display = "none";
    statusDisplay.style.display = "block"
} console.log(currentPlayer);

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
    );
    //ipupush sa index ng gameHistory gamit yung clickedCellIndex yung current player
    /*for(let i = 0; i < gameHistory.length; i++){
        if(i === clickedCellIndex){
        gameHistory[i] = currentPlayer;
        console.log(clickedCellIndex);
        }
        console.log(gameHistory);
    };*/

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
         return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

//dito ma didisplay sa clicked cell kung anong letter mag lalaro
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

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

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        //console.log(winCondition);

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
        return;
    }
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        winner.innerHTML = drawMessage();
        resultMsg.innerHTML = "Oops!"
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        modal.style.display = "flex"

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
    statusDisplay.innerHTML = currentPlayerTurn();
    turnContainer.style.display = "flex";
    statusDisplay.style.display = "none"
    modal.style.display = "none"


    document.querySelectorAll('.cell')
        .forEach(cell => cell.innerHTML = "");
}

/*function onHover(e){
    if(gameActive === true){
        e.target.textContent = "X";
    } else{
        e.target.textContent = "O";
    }
}*/
// try lang to

//try lang to

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
//document.querySelector('#restartBtn').addEventListener('click', handleRestartGame);
document.querySelector('#new-game').addEventListener("click", handleRestartGame);



