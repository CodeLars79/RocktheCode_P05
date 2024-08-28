import './Main.css'
import Memory, { addMemoryListeners } from '../Memory/Memory'
import TicTacToe, { initializeTicTacToe } from '../TicTacToe/TicTacToe'
import Whack, { initializeWhack } from '../Whack/Whack'

let currentGame = 'Welcome'

const welcomeMessage = () => {
  return `
    <div class="welcome-message">
      <img src="./assets/BGMain.png" alt="tie fighters">
      <p>Join the Rebel heroes flickering the only light of hope in a heroic stand against the evil Galactic Empire.</p>
      <p>Select a game from the menu to start playing. </p>
      <p>And remember... </br>May the Force be with you, always. </p>
    </div>
  `
}

const template = () => {
  return `
    <main>
      <div id="content">
        ${welcomeMessage()}
      </div>
    </main>
  `
}

export const Main = () => {
  return template()
}

const updateContent = (game) => {
  const content = document.querySelector('#content')
  if (content) {
    if (game === 'Memory') {
      content.innerHTML = Memory()
      addMemoryListeners() // Initialize the Memory game listeners
    } else if (game === 'TicTacToe') {
      content.innerHTML = TicTacToe()
      initializeTicTacToe() // Initialize the TicTacToe game listeners and logic
    } else if (game === 'Whack') {
      content.innerHTML = Whack()
      initializeWhack() // Initialize the Whack game listeners and logic
    } else if (game === 'Welcome') {
      content.innerHTML = welcomeMessage()
    }
  }
}

export const addMainListeners = () => {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault()
      currentGame = event.target.getAttribute('href').substring(1)
      updateContent(currentGame)
    })
  })

  const logo = document.querySelector('.logo')
  if (logo) {
    logo.addEventListener('click', () => {
      currentGame = 'Welcome'
      updateContent(currentGame)
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  addMainListeners()
})
