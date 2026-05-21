const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const boardEl = document.getElementById('board');
const controls = document.querySelector('.controls');

const victoryScreen = document.getElementById('victory-screen');
const victoryText = document.getElementById('victory-text');

const playAgainBtn = document.getElementById('play-again');
const resetBtn = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;

let board = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function updateStatus(message){
    statusText.textContent = message;
}

function showVictoryScreen(message){

    victoryText.textContent = message;

    victoryScreen.classList.remove('hidden');

    statusText.classList.add('hidden');
    boardEl.classList.add('hidden');
    controls.classList.add('hidden');
}

function hideVictoryScreen(){

    victoryScreen.classList.add('hidden');

    statusText.classList.remove('hidden');
    boardEl.classList.remove('hidden');
    controls.classList.remove('hidden');
}

function markCell(cell,index){

    board[index] = currentPlayer;

    cell.textContent = currentPlayer;

    cell.classList.add(currentPlayer.toLowerCase());
}

function showWinningCells(line){

    line.forEach(index => {
        cells[index].classList.add('winning');
    });
}

function checkWinner(){

    let winningLine = null;

    for(let condition of winningConditions){

        const [a,b,c] = condition;

        if(
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ){
            winningLine = condition;
            break;
        }
    }

    if(winningLine){

        gameActive = false;

        showWinningCells(winningLine);

        showVictoryScreen(`Player ${currentPlayer} Wins!`);

        return;
    }

    if(!board.includes('')){

        gameActive = false;

        showVictoryScreen('Game Draw!');

        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    updateStatus(`Player ${currentPlayer} Turn`);
}

function handleCellClick(event){

    const cell = event.currentTarget;

    const index = Number(cell.dataset.index);

    if(board[index] !== '' || !gameActive){
        return;
    }

    markCell(cell,index);

    checkWinner();
}

function resetGame(){

    board = ['', '', '', '', '', '', '', '', ''];

    currentPlayer = 'X';

    gameActive = true;

    updateStatus('Player X Turn');

    hideVictoryScreen();

    cells.forEach(cell => {

        cell.textContent = '';

        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.classList.remove('winning');
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetBtn.addEventListener('click', resetGame);

playAgainBtn.addEventListener('click', resetGame);