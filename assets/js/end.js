const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const lastScore = document.querySelector('#lastScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []
const clear = document.querySelector('#clear')

const MAX_HIGH_SCORES = 5

lastScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value
})

const saveHighScore = event => {
  event.preventDefault()

  const score = {
    score: mostRecentScore,
    name: username.value
  }

  highScores.push(score)

  highScores.sort((a, b) => {
    return b.score - a.score
  })

  highScores.splice(5)

  localStorage.setItem('highScores', JSON.stringify(highScores))
  window.location.assign('./highscores.html')
}



// const clearScores = (highScores) => {
//   console.log('hi')
//   localStorage.clear()
// }
