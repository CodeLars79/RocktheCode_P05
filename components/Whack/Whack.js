import './Whack.css'

const Whack = () => {
  return `
    <div class="game-container">
      <h2 id="gameIntro">Rise with the Rebellion and fend off the approaching Tie Fighters as they close in...</br>your bravery is needed! </h2>
      <div class="grid">
        <div class="hole" id="hole1"></div>
        <div class="hole" id="hole2"></div>
        <div class="hole" id="hole3"></div>
        <div class="hole" id="hole4"></div>
        <div class="hole" id="hole5"></div>
        <div class="hole" id="hole6"></div>
        <div class="hole" id="hole7"></div>
        <div class="hole" id="hole8"></div>
        <div class="hole" id="hole9"></div>
      </div>
      <div class="info">
        <div class="info-bar">
          <h2>Time: <span id="timeLeft">30</span>s</h2>
          <h2>Score: <span id="score">0</span></h2>
          <h2>Last Score: <span id="lastScore">0</span></h2>
          <button id="startButton">Start Game</button>
        </div>
        <p id="finalScore" class="final-score"></p>
      </div>
    </div>
  `
}

export const initializeWhack = () => {
  const holes = document.querySelectorAll('.hole')
  const scoreDisplay = document.getElementById('score')
  const timeLeftDisplay = document.getElementById('timeLeft')
  const startButton = document.getElementById('startButton')
  const finalScoreDisplay = document.getElementById('finalScore')
  const lastScoreDisplay = document.getElementById('lastScore')
  const gameIntro = document.getElementById('gameIntro')

  let score = 0
  let gameActive = false
  let currentHole
  let gameInterval
  let timerInterval
  let timeLeft = 30

  const savedScore = localStorage.getItem('whackGameScore') || 0
  lastScoreDisplay.textContent = savedScore

  function startGame() {
    if (gameActive) return
    gameActive = true
    score = 0
    timeLeft = 30
    scoreDisplay.textContent = score
    timeLeftDisplay.textContent = timeLeft
    finalScoreDisplay.textContent = ''
    startButton.textContent = 'Game On!'
    gameIntro.classList.add('hidden') // Add the hidden class to fade out
    gameInterval = setInterval(randomHole, 700)
    timerInterval = setInterval(countDown, 700)
  }

  function randomHole() {
    holes.forEach((hole) => hole.classList.remove('active'))
    const randomIndex = Math.floor(Math.random() * holes.length)
    currentHole = holes[randomIndex]
    currentHole.classList.add('active')
  }

  function countDown() {
    timeLeft--
    timeLeftDisplay.textContent = timeLeft
    if (timeLeft <= 0) {
      endGame()
    }
  }

  function endGame() {
    clearInterval(gameInterval)
    clearInterval(timerInterval)
    gameActive = false
    startButton.textContent = 'Start Game'
    holes.forEach((hole) => hole.classList.remove('active'))
    finalScoreDisplay.textContent = `Time's up! Your final score is ${score}.`
    gameIntro.classList.remove('hidden') // Remove the hidden class to fade in

    localStorage.setItem('whackGameScore', score)
    lastScoreDisplay.textContent = score
  }

  holes.forEach((hole) => {
    hole.addEventListener('click', () => {
      if (!gameActive) return
      if (hole === currentHole) {
        score++
        scoreDisplay.textContent = score
        currentHole.classList.remove('active')
      }
    })
  })

  if (startButton) {
    startButton.addEventListener('click', startGame)
  }
}

export default Whack
