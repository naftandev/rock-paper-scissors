const btnInfo = document.getElementById('btnInfo')
const timer = document.getElementById('timer')
const playerName = document.getElementById('playerName')
const AIName = document.getElementById('AIName')
const optionImgPlayer = document.getElementById('optionImgPlayer')
const resultPlayerRound = document.getElementById('resultPlayerRound')
const roundText = document.getElementById('roundText')
const vs = document.getElementById('vs')
const score = document.getElementById('score')
const optionImgAI = document.getElementById('optionImgAI')
const resultAIRound = document.getElementById('resultAIRound')
const startContainer = document.getElementById('startContainer')
const btnStart = document.getElementById('btnStart')
const buttonsContainer = document.getElementById('buttonsContainer')
const btnRock = document.getElementById('btnRock')
const btnPaper = document.getElementById('btnPaper')
const btnScissors = document.getElementById('btnScissors')


class Game {
  constructor() {
    this.initialize()
  }

  initialize() {
    this.selectOption = this.selectOption.bind(this)
    this.maxRound = 5
    this.initialCount = 3
    this.roundCount = 5
    this.name
    this.playerScore = 0
    this.AIScore = 0
    this.playerOption
    this.allData = {
      btnInfo,
      timer,
      playerName,
      AIName,
      optionImgPlayer,
      resultPlayerRound,
      roundText,
      vs,
      score,
      optionImgAI,
      resultAIRound,
      startContainer,
      btnStart,
      buttonsContainer,
      btnRock,
      btnPaper,
      btnScissors
    }
    this.restartInitialContent()
    swal({
      content: {
        element: "input",
        attributes: {
          placeholder: "Ingresa tu nick..."
        }
      },
      button: "Aceptar"
    })
    .then(name => {
      if(name) {
        this.name = name
        this.allData.btnStart.classList.add('hide')
        this.allData.btnInfo.classList.add('hide')
        this.counter()
      }
    })
  }

  restartInitialContent() {
    this.allData.optionImgPlayer.classList.remove('rock-option')
    this.allData.optionImgPlayer.classList.remove('paper-option')
    this.allData.optionImgPlayer.classList.remove('scissors-option')
    this.allData.optionImgAI.classList.remove('rock-option')
    this.allData.optionImgAI.classList.remove('paper-option')
    this.allData.optionImgAI.classList.remove('scissors-option')
    this.allData.resultPlayerRound.textContent = ''
    this.allData.resultPlayerRound.classList.remove('green-font')
    this.allData.resultPlayerRound.classList.remove('red-font')
    this.allData.resultAIRound.textContent = ''
    this.allData.resultAIRound.classList.remove('green-font')
    this.allData.resultAIRound.classList.remove('red-font')
    this.allData.score.textContent = '---'
    this.allData.vs.classList.remove('white')
  }

  restartRoundContent() {
    this.allData.optionImgPlayer.classList.remove('rock-option')
    this.allData.optionImgPlayer.classList.remove('paper-option')
    this.allData.optionImgPlayer.classList.remove('scissors-option')
    this.allData.optionImgAI.classList.remove('rock-option')
    this.allData.optionImgAI.classList.remove('paper-option')
    this.allData.optionImgAI.classList.remove('scissors-option')
    this.allData.resultPlayerRound.textContent = ''
    this.allData.resultPlayerRound.classList.remove('green-font')
    this.allData.resultPlayerRound.classList.remove('red-font')
    this.allData.resultAIRound.textContent = ''
    this.allData.resultAIRound.classList.remove('green-font')
    this.allData.resultAIRound.classList.remove('red-font')
    this.playerOption = undefined
  }

  convertToNumber(option){
    switch(option) {
      case 'rock-option':
        return 0
      case 'paper-option':
        return 1
      case 'scissors-option':
      return 2
    }
  }

  aiRandomOption() {
    return Math.floor(Math.random() * 3)
  }

  convertToString(option){
    switch(option) {
      case 0:
        return 'rock-option'
      case 1:
        return 'paper-option'
      case 2:
      return 'scissors-option'
    }
  }

  calculation(playerOption, AIOption) {
    switch(playerOption) {
      case 0:
        if(AIOption === 0) {
          return 'Same'
        }
        if(AIOption === 1) {
          return 'AI'
        }
        if(AIOption === 2) {
          return 'Player'
        }
      case 1:
        if(AIOption === 0) {
          return 'Player'
        }
        if(AIOption === 1) {
          return 'Same'
        }
        if(AIOption === 2) {
          return 'AI'
        }
      case 2:
        if(AIOption === 0) {
          return 'AI'
        }
        if(AIOption === 1) {
          return 'Player'
        }
        if(AIOption === 2) {
          return 'Same'
        }
    }
  }

  enableOptions() {
    this.allData.btnRock.addEventListener('click', this.selectOption)
    this.allData.btnPaper.addEventListener('click', this.selectOption)
    this.allData.btnScissors.addEventListener('click', this.selectOption)
    this.allData.btnRock.classList.add('cursor')
    this.allData.btnPaper.classList.add('cursor')
    this.allData.btnScissors.classList.add('cursor')
  }

  disableOptions() {
    this.allData.btnRock.removeEventListener('click', this.selectOption)
    this.allData.btnPaper.removeEventListener('click', this.selectOption)
    this.allData.btnScissors.removeEventListener('click', this.selectOption)
    this.allData.btnRock.classList.remove('cursor')
    this.allData.btnPaper.classList.remove('cursor')
    this.allData.btnScissors.classList.remove('cursor')
  }

  selectOption(event) {
    this.allData.optionImgPlayer.classList.remove('rock-option')
    this.allData.optionImgPlayer.classList.remove('paper-option')
    this.allData.optionImgPlayer.classList.remove('scissors-option')
    this.playerOption = event.target.dataset.option
    this.allData.optionImgPlayer.classList.add(`${this.playerOption}`)
  }

  counter() {
    this.disableOptions()
    let counter = setInterval(() => {
      this.allData.roundText.classList.remove('hide')
      this.allData.vs.classList.add('white')
      this.allData.timer.textContent = '---'
      this.allData.vs.textContent = this.initialCount
      this.initialCount--
      if(this.initialCount < -1) {
        clearInterval(counter)
        this.allData.roundText.classList.add('hide')
        this.allData.vs.textContent = 'VS'
        this.allData.playerName.textContent = this.name
        this.allData.AIName.classList.remove('hide')
        this.allData.score.textContent = `${this.playerScore} - ${this.AIScore}`
        this.allData.startContainer.classList.add('hide')
        this.allData.buttonsContainer.classList.remove('hide')
        this.initialCount = 3
        this.nextLevel()
      }
    }, 1000)
  }

  nextLevel() {
    this.restartRoundContent()
    this.enableOptions()
    let counter = setInterval(() => {
      this.allData.timer.textContent = this.roundCount
      this.roundCount--
      if(this.roundCount < 0) {
        this.roundCount = 5
        if(this.playerOption) {
          clearInterval(counter)
          this.disableOptions()
          setTimeout(() => {
            this.result(this.playerOption)
          }, 500)
        } else {
          clearInterval(counter)
          this.disableOptions()
          this.result()
          this.outTime()
        }
      }
    }, 1000)
  }

  result(option) {
    let aiNumberOption = this.aiRandomOption()
    let aiStringOption = this.convertToString(aiNumberOption)
    let playerNumberOption = this.convertToNumber(option)

    this.allData.optionImgAI.classList.add(`${aiStringOption}`)
    
    let calculation = this.calculation(playerNumberOption, aiNumberOption)
    if(calculation === 'Player') {
      this.playerScore++
      this.allData.resultPlayerRound.textContent = 'GANA'
      this.allData.resultPlayerRound.classList.add('green-font')
      this.allData.resultAIRound.textContent = 'PIERDE'
      this.allData.resultAIRound.classList.add('red-font')
      this.allData.score.textContent = `${this.playerScore} - ${this.AIScore}`
      if(this.playerScore === this.maxRound) {
        this.win()
      } else {
        swal({
          text: "¡Ganaste!",
          button: "Siguiente ronda"
        })
        .then(() => {
          this.counter()
        })
      }
    }
    if(calculation === 'AI') {
      this.AIScore++
      this.allData.resultPlayerRound.textContent = 'PIERDE'
      this.allData.resultPlayerRound.classList.add('red-font')
      this.allData.resultAIRound.textContent = 'GANA'
      this.allData.resultAIRound.classList.add('green-font')
      this.allData.score.textContent = `${this.playerScore} - ${this.AIScore}`
      if(this.AIScore === this.maxRound) {
        this.lost()
      } else {
        swal({
          text: "Perdiste...",
          button: "Siguiente ronda"
        })
        .then(() => {
          this.counter()
        })
      }
    }
    if(calculation === 'Same') {
      this.allData.resultPlayerRound.textContent = 'EMPATE'
      this.allData.resultAIRound.textContent = 'EMPATE'
      swal({
        text: "Empate",
        button: "Siguiente ronda"
      })
      .then(() => {
        this.counter()
      })
    }
  }

  outTime() {
    this.AIScore++
    this.allData.resultPlayerRound.textContent = 'PIERDE'
    this.allData.resultPlayerRound.classList.add('red-font')
    this.allData.resultAIRound.textContent = 'GANA'
    this.allData.resultAIRound.classList.add('green-font')
    if(this.AIScore === this.maxRound) {
      this.lost()
    } else {
      this.allData.score.textContent = `${this.playerScore} - ${this.AIScore}`
      swal({
        text: "¡UPS!, se te acabó el tiempo.\nPierdes esta ronda",
        button: "Siguiente ronda"
      })
      .then(() => {
        this.counter()
      })
    }
  }

  win() {
    this.allData.score.textContent = `${this.playerScore} - ${this.AIScore}`
    swal({
      icon: "success",
      title: "¡VICTORIA!",
      text: `Felicidades ${this.name}, ganaste el juego.\n\nPuntaje final: ${this.playerScore} - ${this.AIScore}`,
      button: "Aceptar"
    })
    .then(() => {
      this.allData.buttonsContainer.classList.add('hide')
      this.allData.btnStart.textContent = 'JUGAR DE NUEVO'
      this.allData.startContainer.classList.remove('hide')
      this.allData.btnStart.classList.remove('hide')
      this.allData.btnInfo.classList.remove('hide')
    })
  }

  lost() {
    this.allData.score.textContent = `${this.playerScore} - ${this.AIScore}`
    swal({
      icon: "error",
      title: "DERROTA",
      text: `Lo siento ${this.name}, perdiste el juego, mejor suerte para la próxima.\n\nPuntaje final: ${this.playerScore} - ${this.AIScore}`,
      button: "Aceptar"
    })
    .then(() => {
      this.allData.buttonsContainer.classList.add('hide')
      this.allData.btnStart.textContent = 'JUGAR DE NUEVO'
      this.allData.startContainer.classList.remove('hide')
      this.allData.btnStart.classList.remove('hide')
      this.allData.btnInfo.classList.remove('hide')
    })
  }
}


function info() {
  swal({
    icon: "info",
    title: "PIEDRA, PAPEL O TIJERA: THE GAME",
    text: "Escoge la opción que pienses que te hará ganar antes que se acabe el tiempo en cada ronda, el primero en ganar 5 veces ganará el juego.",
    button: "Aceptar"
  })
}


function startGame() {
  window.game = new Game()
}