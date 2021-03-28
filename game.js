const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const clock = document.getElementById('clock')
let time = 90
// const minutes = parseInt(60 / 60)
// const seconds = parseInt(60 % 60)
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')
// const quizQuestions = document.querySelector('#quizQuestions')
let timerId

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

const questions = [
  {
    question: 'What is "JSON parse" used for?',
    choice1: 'To turn an object into a string',
    choice2: 'To turn a string into an object',
    choice3: 'To turn a string into an integer',
    choice4: 'To turn an integer into a string',
    choice5: 'To turn a string into a boolean',
    answer: 2
  },
  {
    question: 'Which of the following statements is true regarding the data type "object"?',
    choice1: "It's used to list only numbers",
    choice2: "It's used to list only names",
    choice3: "It's used to store passwords",
    choice4: "It's used to store data in local storage",
    choice5: "It's used to list complex data sets with key-value pairs",
    answer: 5
  },
  {
    question: 'In JavaScript, what is meant by "hoisting"?',
    choice1: "It's the order in which CSS links are inputted on an HTML page",
    choice2: "It's the alphabetical order in which key value pairs appear in the console.",
    choice3: "It's when a function is called before it is defined",
    choice4: "It's used to copy and paste variables into local storage",
    choice5: 'When a button is inside a form and a programmer wants to prevent the page from refreshing when the button is clicked',
    answer: 3
  },
  {
    question: 'Which of the following statements is false?',
    choice1: 'Global variables take precedence over local variables.',
    choice2: 'Id selectors override class selectors',
    choice3: 'Backticks, unlike using single quotes or double quotes, allow for code to be written on multiple lines',
    choice4: 'All variables in a ternary should be defined before an operation is created',
    choice5: 'Functions should be written with const, not let.',
    answer: 1
  },
  {
    question: 'What is the only situation where a programmer would write "event.preventDefault()"?',
    choice1: 'When a webpage needs a reset stylesheet before any other stylesheets are linked',
    choice2: 'When an HTML needs to be tested across multiple browsers',
    choice3: "When a programmer needs a code editor to stop autofilling text as it's being typed",
    choice4: 'When a programmer wants a shortcut to writing ids and classes on a tag',
    choice5: 'When a button is inside a form and a programmer wants to prevent the page from refreshing when the button is clicked',
    answer: 5
  }
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 5

const quizEnd = () => {
  // stop timer
  clearInterval(timerId)
  clock.classList.add('hide')
}

const getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)
    return window.location.assign('./end.html')
  }
  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset.number
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionsIndex, 1)

  acceptingAnswers = true
}

const incrementScore = num => {
  score += num
  scoreText.innerText = score
}

choices.forEach(choice => {
  choice.addEventListener('click', event => {
    if (!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = event.target
    const selectedAnswer = selectedChoice.dataset.number

    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    } else if (classToApply === 'incorrect') {
      time -= 10
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
    }, 1000)
  })
})

const clockTick = () => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  time--
  clock.textContent = ('Time left: ' + ` ${minutes} minutes, ${seconds} seconds`)
  // check if user ran out of time
  if (time <= 0) {
    document.getElementById('clock').innerHTML = 'Time is up!'
    quizEnd()
    return window.location.assign('./end.html')
  }
}

const startGame = () => {
  questionCounter = 0
  score = 0
  time = 90
  availableQuestions = [...questions]
  clockTick()
  getNewQuestion()
  timerId = setInterval(clockTick, 1000)
}

startGame()
