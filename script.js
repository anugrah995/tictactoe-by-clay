const board = document.getElementById('board');
const winnerText = document.getElementById('winner');
let currentPlayer = 'X';
let gameActive = true;

function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
}

function handleCellClick(e) {
  const cell = e.target;
  if (!gameActive || cell.classList.contains('taken')) return;
  cell.textContent = currentPlayer === 'X' ? '❌' : '⭕';
  cell.classList.add('taken');
  if (checkWinner()) {
    winnerText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    highlightWinningCombo();
    return;
  }
  if ([...document.querySelectorAll('.cell')].every(c => c.classList.contains('taken'))) {
    winnerText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
  const cells = document.querySelectorAll('.cell');
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  for (let combo of wins) {
    const [a, b, c] = combo;
    if (cells[a].textContent &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent) {
      cells[a].classList.add('win');
      cells[b].classList.add('win');
      cells[c].classList.add('win');
      return true;
    }
  }
  return false;
}

function highlightWinningCombo() {
  document.querySelectorAll('.cell.win').forEach(cell => {
    cell.style.transform = 'scale(1.2)';
    cell.style.boxShadow = '0 0 20px #fff';
  });
}

function resetGame() {
  currentPlayer = 'X';
  gameActive = true;
  winnerText.textContent = '';
  createBoard();
}

createBoard();
