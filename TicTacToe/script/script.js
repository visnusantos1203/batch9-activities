
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
const palaman2 = document.getElementById("palaman2");
const palaman3 = document.getElementById("palaman3");

// Buttons
const xBtn = document.getElementById("X");
const oBtn = document.getElementById("O");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restartBtn");
const historyBtn = document.getElementById("history-btn");
const playBtn = document.getElementById("playBtn");

let gameActive = false;
let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer;
let gameHistory = [];
let prevHistory= [];
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

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
    );
    
    if (gameState[clickedCellIndex] !== "" || !gameActive) return;
       
   //Logs every move into an object and pushes into gameHistory array
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
    };

    if (roundWon) {
        winner.innerHTML = winningMessage();
        resultMsg.innerHTML = "Congratulations!"
        // Increments the score of whoever the winner is in the match
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

document.querySelector('#new-game').addEventListener("click", handleRestartGame);

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

    //Decides who will take the first move
function xTurn(){
    gameContainer.style.display = "grid";
    currentPlayer = "X";
    gameActive = true;
    turnContainer.style.display = "none";
    statusDisplay.style.display = "block";
    header.style.fontSize = "10vmin";
    header.style.margin = "0";
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

function restartGame(){
    gameActive = false;
    gameContainer.style.display = "none";
    btnContainer.style.display = "none";
    handleRestartGame();
}
restartBtn.addEventListener("click", restartGame);
gameCell.forEach(cell => cell.addEventListener('click', handleCellClick));

prevBtn.addEventListener('click', () => {
    nextBtn.style.visibility = 'visible';
    
    if (gameHistory.length != 0) {
    let lastMove = gameHistory[gameHistory.length - 1];
    let lastCell = lastMove.index;
        lastCell.innerHTML = "";
        prevHistory.push(lastMove);
        gameHistory.pop();
    } if (gameHistory.length === 1) {
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
    } else {
        nextBtn.style.visibility = 'hidden';
    }
})



var store = {
    storeName: "Mejo Booked",
    inventoryList: [],
    earnings: 0
    }

var Book = function(title, quantity, value) {
    this.title = title;
    this.quantity = quantity;
    this.value = value;
}

function addBook(title, quantity, value){
    let newBook = new Book(title, quantity, value)
    store.inventoryList.push(newBook);
    return newBook;
}
addBook("Hairy Potter", 0, 999);
addBook("Hairy Potterr", 0, 99);

//console.log(store.inventoryList);

function restockBook(title, quantity){
    for(let i = 0; i < store.inventoryList.length; i++){
        if(store.inventoryList[i].title === title){
            store.inventoryList[i].quantity += quantity;
         }     
    }
}
restockBook("Hairy Potter", 10);
restockBook("Hairy Potterr", 50);

function sellBook(title, quantity){

    let inventory = store.inventoryList;
    let bookToBeSold = inventory.find(val => val.title === title);

    console.log(bookToBeSold);

    if(bookToBeSold.title === title){
        bookToBeSold.quantity = bookToBeSold.quantity - quantity;
        store.earnings = bookToBeSold.value * quantity;
        console.log(`Transaction Successful!`)
    } else{
        console.log(`${title} is not existing in our inventory`)

    }
    if(bookToBeSold.quantity < quantity){
        console.log(`Sorry! Only ${bookToBeSold.quantity} left`)
    }
} 
sellBook("Hairy Potter", 30);
sellBook("Hairy Potterr", 5);

function totalEarnings(){
    console.log(`Store: ${store.storeName} Total Earnings: ${store.earnings}`);
}
totalEarnings();

function listInventory(){
    let inventory = store.inventoryList;
    for(let i = 0; i < inventory.length; i++){
        console.log(
        `Book Title: ${inventory[i].title} Quantity: ${inventory[i].quantity} Value: ${inventory[i].value}`)    
    }
}
listInventory();