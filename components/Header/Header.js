import './Header.css'

const template = () => {
  return `
    <header>
      <div class="header-container">
        <img src="./assets/star-wars-logo-white.png" alt="Star Wars Logo" class="logo">
        <nav>
          <ul>
            <li><a href="#Memory">Memory</a></li>
            <li><a href="#TicTacToe">TicTacToe</a></li>
            <li><a href="#Whack">Whack</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `
}

const Header = () => {
  return template()
}

export default Header
