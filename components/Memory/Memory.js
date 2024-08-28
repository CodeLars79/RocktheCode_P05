import './Memory.css'

const Memory = () => {
  return `
    <div class="wrapper">
      <ul class="cards">
        <li class="card">
          <div class="view front-view">
            <img src="./assets/card-back.png" alt="icon" />
          </div>
          <div class="view back-view">
            <img src="./assets/img-1.png" alt="card-img" />
          </div>
        </li>
         <li class="card">
          <div class="view front-view">
            <img src="./assets/card-back.png" alt="icon" />
          </div>
          <div class="view back-view">
            <img src="./assets/img-2.png" alt="card-img" />
          </div>
        </li>
         <li class="card">
          <div class="view front-view">
            <img src="./assets/card-back.png" alt="icon" />
          </div>
          <div class="view back-view">
            <img src="./assets/img-2.png" alt="card-img" />
          </div>
        </li>
          <li class="card">
          <div class="view front-view">
            <img src="./assets/card-back.png" alt="icon" />
          </div>
          <div class="view back-view">
            <img src="./assets/img-3.png" alt="card-img" />
          </div>
         </li>
         <li class="card">
          <div class="view front-view">
            <img src="./assets/card-back.png" alt="icon" />
          </div>
          <div class="view back-view">
            <img src="./assets/img-4.png" alt="card-img" />
          </div>
        </li>
         <li class="card">
          <div class="view front-view">
            <img src="./assets/card-back.png" alt="icon" />
          </div>
          <div class="view back-view">
            <img src="./assets/img-5.png" alt="card-img" />
          </div>
          </li>
         <li class="card">
          <div class="view front-view">
            <img src="./assets/card-back.png" alt="icon" />
          </div>
          <div class="view back-view">
            <img src="./assets/img-6.png" alt="card-img" />
          </div>
        </li>
          <li class="card">
          <div class="view front-view">
            <img src="./assets/card-back.png" alt="icon" />
          </div>
          <div class="view back-view">
            <img src="./assets/img-5.png" alt="card-img" />
          </div>
        </li>
          <li class="card">
          <div class="view front-view">
            <img src="./assets/card-back.png" alt="icon" />
          </div>
          <div class="view back-view">
            <img src="./assets/img-2.png" alt="card-img" />
          </div>
        </li>
          <li class="card">
          <div class="view front-view">
            <img src="./assets/card-back.png" alt="icon" />
          </div>
          <div class="view back-view">
            <img src="./assets/img-1.png" alt="card-img" />
          </div>
        </li>
          <li class="card">
          <div class="view front-view">
            <img src="./assets/card-back.png" alt="icon" />
          </div>
          <div class="view back-view">
            <img src="./assets/img-3.png" alt="card-img" />
          </div>
        </li>
          <li class="card">
          <div class="view front-view">
            <img src="./assets/card-back.png" alt="icon" />
          </div>
          <div class="view back-view">
            <img src="./assets/img-4.png" alt="card-img" />
          </div>
        </li>
        </ul>
      <div class="details">
        <p class="time">
          Time: <span><b>30</b>s</span>
        </p>
        <p class="flips">
          Flips: <span><b>0</b></span>
        </p>
        <button>Refresh</button>
      </div>
    </div>
  `
}

export default Memory

export const addMemoryListeners = () => {
  const cards = document.querySelectorAll('.card'),
    timeTag = document.querySelector('.time b'),
    flipsTag = document.querySelector('.flips b'),
    refreshBtn = document.querySelector('.details button')

  let maxTime = 30
  let timeLeft = maxTime
  let flips = 0
  let matchedCard = 0
  let disableDeck = false
  let isPlaying = false
  let cardOne, cardTwo, timer

  function initTimer() {
    if (timeLeft <= 0) {
      return clearInterval(timer)
    }
    timeLeft--
    timeTag.innerText = timeLeft
  }

  function flipCard({ target }) {
    const clickedCard = target.closest('.card')
    if (!clickedCard || clickedCard.classList.contains('flip')) return

    if (!isPlaying) {
      isPlaying = true
      timer = setInterval(initTimer, 1000)
    }
    if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
      flips++
      flipsTag.innerText = flips
      clickedCard.classList.add('flip')
      if (!cardOne) {
        cardOne = clickedCard
        return
      }
      cardTwo = clickedCard
      disableDeck = true
      let cardOneImg = cardOne.querySelector('.back-view img').src,
        cardTwoImg = cardTwo.querySelector('.back-view img').src
      matchCards(cardOneImg, cardTwoImg)
    }
  }

  function matchCards(img1, img2) {
    if (img1 === img2) {
      matchedCard++
      if (matchedCard === 6 && timeLeft > 0) {
        clearInterval(timer)
      }
      cardOne.removeEventListener('click', flipCard)
      cardTwo.removeEventListener('click', flipCard)
      cardOne = cardTwo = null
      disableDeck = false
    } else {
      setTimeout(() => {
        cardOne.classList.add('shake')
        cardTwo.classList.add('shake')
      }, 400)

      setTimeout(() => {
        cardOne.classList.remove('shake', 'flip')
        cardTwo.classList.remove('shake', 'flip')
        cardOne = cardTwo = null
        disableDeck = false
      }, 1200)
    }
  }

  function shuffleCard() {
    timeLeft = maxTime
    flips = matchedCard = 0
    cardOne = cardTwo = null
    clearInterval(timer)
    timeTag.innerText = timeLeft
    flipsTag.innerText = flips
    disableDeck = isPlaying = false

    let arr = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]
    arr.sort(() => (Math.random() > 0.5 ? 1 : -1))

    cards.forEach((card, index) => {
      card.classList.remove('flip')
      let imgTag = card.querySelector('.back-view img')
      setTimeout(() => {
        imgTag.src = `./assets/img-${arr[index]}.png`
      }, 500)
      card.addEventListener('click', flipCard)
    })
  }

  shuffleCard()

  refreshBtn.addEventListener('click', shuffleCard)

  cards.forEach((card) => {
    card.addEventListener('click', flipCard)
  })
}
