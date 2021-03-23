const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressTExt')
const scoreText = document.querySelector('#score')
const ProgressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

const questions = [
  {
    question: 'What is 2 +2?',
    choice1: 5,
    choice2: 4,
    choice3: 3,
    choice4: 1,
    answer: 2
  },
  {
    question: 'What is 3 + 1?',
    choice1: 5,
    choice2: 2,
    choice3: 4,
    choice4: 1,
    answer: 3
  },
  {
    question: 'What is 1 + 1?',
    choice1: 5,
    choice2: 2,
    choice3: 4,
    choice4: 1,
    answer: 2
  },
  {
    question: 'What is 4 + 1?',
    choice1: 5,
    choice2: 2,
    choice3: 4,
    choice4: 1,
    answer: 1
  }
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 4

const getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)
    return window.location.assign('/end.html')
  }
  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
  ProgressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`
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

choices.forEach(choice => {
  choice.addEventListener('click', event => {
    if (!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = event.target
    const selectedAnswer = selectedChoice.dataset.number

    let classToApply = selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect'

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
    }, 1000)
  })
})

const incrementScore = num => {
  score += num
  scoreText.innerText = score
}

const startGame = () => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

startGame()
