const statusDisplay = document.querySelector(".game-status")
const winner = document.getElementById("winner");
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer;

const winningMessage = () => `${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
statusDisplay.innerHTML = currentPlayerTurn();

const xBtn = document.getElementById("X");

xBtn.addEventListener("click", xTurn);
function xTurn(){
    currentPlayer = "X";
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
        //console.log(clickedCellIndex);
        //console.log(gameHistory);
        }
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
    //clickedCell.style.fontSize = "80%";
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
        statusDisplay.innerHTML = `Game Over! ${winningMessage()}`;
        winner.innerHTML = winningMessage();
        gameActive = false;

        return;
    }
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
} console.log(currentPlayer);

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
        .forEach(cell => cell.innerHTML = "");
}

function onHover(e){
    if(gameActive){
        e.target.textContent = "X";
    } else{
        e.target.textContent = "O";
    }
}
// try lang to

//try lang to

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('#restartBtn').addEventListener('click', handleRestartGame);
