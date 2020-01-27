const startButton = document.getElementById('startButton')
const nextButton = document.getElementById('nextButton')
const resultsButton = document.getElementById('resultsButton')
const submitNameEL = document.getElementById('submitName')
const viewLeaderboardButtonEL = document.getElementById('viewLeaderboard')
const resetLeaderboardButtonEL = document.getElementById('resetLeaderboard')
const viewLeaderboardEL = document.getElementById('leaderboard')
const viewLeaderboardEL2 = document.getElementById('leaderboard2')
const viewLeaderboardEL3 = document.getElementById('leaderboard3')
const viewLeaderboardEL4 = document.getElementById('leaderboard4')
const viewLeaderboardEL5 = document.getElementById('leaderboard5')
const NameEL = document.getElementById('Name')
const mainbodyEL = document.getElementById('mainbody')
const rulesContainerElement = document.getElementById ('rules')
const quizTimeLeftEl = document.getElementById ('quizTimeLeft')
const timeoutEl = document.getElementById ('timeout')
const questionContainerElement = document.getElementById ('questionContainer')
const scoreEL = document.getElementById ('score')
const scoreResultEL = document.getElementById ('scoreResult')
const bottomEL = document.getElementById ('bottom')
let currentQuestionIndex, shuffledQuestions
const questionEl = document.getElementById('question')
const answerButtonsEL = document.getElementById('answerButtons')
const Score1EL = document.getElementById('Score1')
const Name1EL = document.getElementById('Name1')
const Score2EL = document.getElementById('Score2')
const Name2EL = document.getElementById('Name2')
const Score3EL = document.getElementById('Score3')
const Name3EL = document.getElementById('Name3')
const Score4EL = document.getElementById('Score4')
const Name4EL = document.getElementById('Name4')
const Score5EL = document.getElementById('Score5')
const Name5EL = document.getElementById('Name5')

let timer=500
var totalSeconds = timer
var finalScore = 0
var currentName = "Bob"
var highScores = []
var sortedHighScoreList = [
  {"Score": 0, "Name": '-'},
  {"Score": 0, "Name": '-'},
  {"Score": 0, "Name": '-'},
  {"Score": 0, "Name": '-'},
  {"Score": 0, "Name": '-'},
]
const maxHighScores = 5
var a
var b
var c
var d
var e



viewLeaderboardButtonEL.addEventListener('click', viewLeaderboard)

function viewLeaderboard(){
  scoreEL.classList.add('hide')
  viewLeaderboardEL.classList.remove('hide')
  viewLeaderboardEL2.classList.remove('hide')
  viewLeaderboardEL3.classList.remove('hide')
  viewLeaderboardEL4.classList.remove('hide')
  viewLeaderboardEL5.classList.remove('hide')
  viewLeaderboardButtonEL.classList.add('hide')
  a=sortedHighScoreList[0]
  b=sortedHighScoreList[1]
  c=sortedHighScoreList[2]
  d=sortedHighScoreList[3]
  e=sortedHighScoreList[4]
  document.getElementById("Score1").innerHTML = "<h4>" + a.Score + "</h4>"
  document.getElementById("Name1").innerHTML = "<h4>" + a.Name + "</h4>"
  document.getElementById("Score2").innerHTML = "<h4>" + b.Score + "</h4>"
  document.getElementById("Name2").innerHTML = "<h4>" + b.Name + "</h4>"
  document.getElementById("Score3").innerHTML = "<h4>" + c.Score + "</h4>"
  document.getElementById("Name3").innerHTML = "<h4>" + c.Name + "</h4>"
  document.getElementById("Score4").innerHTML = "<h4>" + d.Score + "</h4>"
  document.getElementById("Name4").innerHTML = "<h4>" + d.Name + "</h4>"
  document.getElementById("Score5").innerHTML = "<h4>" + e.Score + "</h4>"
  document.getElementById("Name5").innerHTML = "<h4>" + e.Name + "</h4>"
}

resetLeaderboardButtonEL.addEventListener('click', resetLeaderboard)

function resetLeaderboard(){
  sortedHighScoreList = [
    {"Score": 0, "Name": '-'},
    {"Score": 0, "Name": '-'},
    {"Score": 0, "Name": '-'},
    {"Score": 0, "Name": '-'},
    {"Score": 0, "Name": '-'},
  ]
  highScores = [
    {"Score": 0, "Name": '-'},
    {"Score": 0, "Name": '-'},
    {"Score": 0, "Name": '-'},
    {"Score": 0, "Name": '-'},
    {"Score": 0, "Name": '-'},
  ]

  resetLeaderboardButtonEL.classList.add('hide')
  viewLeaderboard()
}





startButton.addEventListener('click', startGame)



submitNameEL.addEventListener('click', recordScore)

function recordScore(){
 
  currentName = document.getElementById("Name").value
  //console.log(currentName)
  //console.log(totalSeconds)

  highScores.push({"Score": totalSeconds, "Name": currentName}) 
  sortedHighScoreList = highScores.sort ( (a,b) => b.Score - a.Score)  
  sortedHighScoreList.splice(maxHighScores)

  console.log(sortedHighScoreList)

  submitNameEL.classList.add('hide')
 // document.getElementById("Score1").innerHTML = sortedHighScoreList.
  resetLeaderboardButtonEL.classList.remove('hide')
  viewLeaderboardButtonEL.classList.remove('hide')

}


function startGame(){
  
  // console.log('started');
  resetLeaderboardButtonEL.classList.add('hide')
  viewLeaderboardEL.classList.add('hide')
  viewLeaderboardEL2.classList.add('hide')
  viewLeaderboardEL3.classList.add('hide')
  viewLeaderboardEL4.classList.add('hide')
  viewLeaderboardEL5.classList.add('hide')
  viewLeaderboardButtonEL.classList.add('hide')
  mainbodyEL.classList.remove('bodyright')
  mainbodyEL.classList.remove('bodywrong')
  startButton.classList.add('hide')
  timeoutEl.classList.add('hide')
  scoreEL.classList.add('hide')
  totalSeconds = 30 
 // console.log(timer)
  rulesContainerElement.classList.add('hide')
  questionContainerElement.classList.remove('hide')
  quizTimeLeftEl.classList.remove('hide')
  currentQuestionIndex = 0
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  update = setInterval("checkTime()", 1000)
  checkTime()
 // console.log(shuffledQuestions)
  setNextQuestion()
}

/*
totalSeconds = setInterval(myTimer ,1000);
function myTimer() {
  document.getElementById("quizTimeLeft").innerHTML = 'Time remaining: ' + totalSeconds;
  totalSeconds--;
}
*/


function checkTime(){  
  document.getElementById("quizTimeLeft").innerHTML = 'Time remaining: ' + totalSeconds;
  if (totalSeconds <=0){
    myStopFunction()
    //alert("time's up")
  }
  else{
    totalSeconds-- 
  }
}

function myStopFunction(){
  clearInterval(update)
}


function setNextQuestion(){
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
  questionEl.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
      if (answer.correct){
        button.dataset.correct = answer.correct;
      }
    button.addEventListener('click', selectAnswer)
    answerButtonsEL.appendChild(button)
  })
}

function resetState(){
  nextButton.classList.add('hide')
  while(answerButtonsEL.firstChild){
    answerButtonsEL.removeChild(answerButtonsEL.firstChild)
  }
}

function selectAnswer(e){
  const selectedButton = e.target
 // console.log(selectedButton)
  const correct = selectedButton.dataset.correct
 // console.log(correct)
  if (correct !== 'true'){
    totalSeconds = totalSeconds - 5
    mainbodyEL.classList.remove('bodyright')
    mainbodyEL.classList.add('bodywrong')
  }
  if (correct == 'true'){
    mainbodyEL.classList.remove('bodywrong')
    mainbodyEL.classList.add('bodyright')
  }

 // console.log("timer: " + totalSeconds)

  if(totalSeconds <= 0){
    mainbodyEL.classList.remove('bodyright')
    mainbodyEL.classList.add('bodywrong')
    quizTimeLeftEl.classList.add('hide')
    timeoutEl.classList.remove('hide')
    questionContainerElement.classList.add('hide')
    scoreEL.classList.add('hide')
    finalScore = totalSeconds
    myStopFunction()
    //console.log('they ran out of time')
    startButton.innerText = 'Restart Quiz!'
    startButton.classList.remove('hide')
  }

  if (shuffledQuestions.length > currentQuestionIndex + 1){
    currentQuestionIndex++
    setNextQuestion()
  //  console.log(shuffledQuestions.length)
  //  console.log(currentQuestionIndex)
  //  console.log(' total seconds in set question function: ' + totalSeconds)
  }

  else {
    if(totalSeconds > 0){
      document.getElementById("scoreResult").innerHTML = ('Your Score: ' + totalSeconds);
      quizTimeLeftEl.classList.add('hide')
      questionContainerElement.classList.add('hide')
      scoreEL.classList.remove('hide')
      submitNameEL.classList.remove('hide')
      finalScore = totalSeconds
      myStopFunction()
    //  console.log('Final score: ' + finalScore)
      startButton.innerText = 'Restart Quiz!'
      startButton.classList.remove('hide')
    }
    else{
      quizTimeLeftEl.classList.add('hide')
      mainbodyEL.classList.remove('bodyright')
      mainbodyEL.classList.add('bodywrong')
      timeoutEl.classList.remove('hide')
      questionContainerElement.classList.add('hide')
      scoreEL.classList.add('hide')
      finalScore = totalSeconds
      myStopFunction()
    //  console.log('they ran out of time')
      startButton.innerText = 'Restart Quiz!'
      startButton.classList.remove('hide')
    }
  }
  
}

const questions = [
    {
        question: 'How can you add a comment in JavaScript?',
        answers: [
            { text: "This is a comment", correct: false },
            { text: "<!--This is a comment-->", correct: false },
            { text: "*/This is a comment/*", correct: false },
            { text: "//This is a comment", correct: true }
        ]
    },

    {
        question: 'What is the correct way to write a Javascript array?',
        answers: [
            { text: "var colors = “red”, “green”, “blue”", correct: false },
            { text: "var colors =[0 = “red”, 1 = “green”, 2 = “blue]", correct: false },
            { text: "var colors =[“red”, “green”, “blue”]", correct: true },
            { text: "var colors = (“red, green, blue);", correct: false }
        ]
    },

    {
        question: 'How does a WHILE loop start?',
        answers: [
            { text: "while(i <= 10; i++)", correct: false },
            { text: "while(i <= 10)", correct: true },
            { text: "while = 1 to 10", correct: false },
            { text: "while i > 10; i++", correct: false }
        ]
    },

    {
        question: 'How to write an IF statement in JavaScript?',
        answers: [
            { text: "if i = 5 then", correct: false },
            { text: "if i === 5", correct: false },
            { text: "if(i == 5)", correct: true },
            { text: "if i = 5", correct: false }
        ]
    },

    {
        question: 'If hockeyRules equals true, which of the following evaluates to true?',
        answers: [
            { text: "!hockeyRules === true", correct: false },
            { text: "hockeyRules === false", correct: false },
            { text: "!hockeyRules", correct: false },
            { text: "hockeyRules !== false", correct: true }
        ]
    },
]