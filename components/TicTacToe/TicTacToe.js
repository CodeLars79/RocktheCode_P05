import './TicTacToe.css'

const TicTacToe = () => {
  return `
    <div class="tictactoe-container">
        <div id="board">
            <div class="cell" data-index="0"></div>
            <div class="cell" data-index="1"></div>
            <div class="cell" data-index="2"></div>
            <div class="cell" data-index="3"></div>
            <div class="cell" data-index="4"></div>
            <div class="cell" data-index="5"></div>
            <div class="cell" data-index="6"></div>
            <div class="cell" data-index="7"></div>
            <div class="cell" data-index="8"></div>
        </div>
        <button id="reset">Reset</button>
        <p id="message"></p>
    </div>
  `
}

export const initializeTicTacToe = () => {
  const cells = document.querySelectorAll('.cell')
  const message = document.getElementById('message')
  const resetButton = document.getElementById('reset')

  // Load saved game state from localStorage
  let currentPlayer = localStorage.getItem('currentPlayer') || 'X'
  let board = JSON.parse(localStorage.getItem('board')) || [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    ''
  ]
  let isGameActive =
    localStorage.getItem('isGameActive') === 'true' ? true : true

  const imgX = './assets/imgX.png'
  const imgO = './assets/imgO.png'

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  // Initialize the board with the saved state
  board.forEach((cell, index) => {
    if (cell) {
      const imgElement = document.createElement('img')
      imgElement.src = cell === 'X' ? imgX : imgO
      imgElement.classList.add('xo-img')
      cells[index].appendChild(imgElement)
    }
  })

  function handleCellClick(event) {
    const clickedCell = event.target
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'))

    if (
      isNaN(clickedCellIndex) ||
      board[clickedCellIndex] !== '' ||
      !isGameActive
    ) {
      return
    }

    board[clickedCellIndex] = currentPlayer
    const imgElement = document.createElement('img')
    imgElement.src = currentPlayer === 'X' ? imgX : imgO
    imgElement.classList.add('xo-img')
    clickedCell.appendChild(imgElement)

    // Save current game state to localStorage
    localStorage.setItem('board', JSON.stringify(board))
    localStorage.setItem('currentPlayer', currentPlayer)
    localStorage.setItem('isGameActive', isGameActive)

    checkResult()
  }

  function checkResult() {
    let roundWon = false

    for (let i = 0; i < winningConditions.length; i++) {
      const winCondition = winningConditions[i]
      const a = board[winCondition[0]]
      const b = board[winCondition[1]]
      const c = board[winCondition[2]]

      if (a === '' || b === '' || c === '') {
        continue
      }

      if (a === b && b === c) {
        roundWon = true
        break
      }
    }

    if (roundWon) {
      const imgPath = currentPlayer === 'X' ? imgX : imgO
      message.innerHTML = `<img src="${imgPath}" alt="${currentPlayer}" class="xo-img"> wins!`
      isGameActive = false
      localStorage.setItem('isGameActive', isGameActive)
      return
    }

    if (!board.includes('')) {
      message.textContent = "It's a draw!"
      isGameActive = false
      localStorage.setItem('isGameActive', isGameActive)
      return
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    localStorage.setItem('currentPlayer', currentPlayer)
  }

  function resetGame() {
    board = ['', '', '', '', '', '', '', '', '']
    isGameActive = true
    currentPlayer = 'X'
    message.textContent = ''
    cells.forEach((cell) => {
      cell.innerHTML = ''
    })

    // Clear localStorage
    localStorage.removeItem('board')
    localStorage.removeItem('currentPlayer')
    localStorage.removeItem('isGameActive')
  }

  cells.forEach((cell) => cell.addEventListener('click', handleCellClick))
  resetButton.addEventListener('click', resetGame)
}

export default TicTacToe
