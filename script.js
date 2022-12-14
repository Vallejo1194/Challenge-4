// variables 

const questions = {
  
    0: {
      mark: "Javascript is an _______ language?",
      wrongAns: ["Object-oriented", "Object-based", "Motion"],
      correctAns: "Object-oriented",
    },
    1: {
      mark:
        "The condition in an if/else statement is enclosed within ___________.",
      wrongAns: ["quotes", "curley brackets", "square brackets"],
      correctAns: "parentheses",
    },
    2: {
      mark: "Which of the following methods can be used to display data in some form using Javascript?",
      wrongAns: ["document.write()", "console.log()", "window.alert()"],
      correctAns: "All",
    },
    3: {
      mark:
        "String values must be enclosed within ______ when being assigned to variables.",
      wrongAns: ["commas", "curley brackets", "paratheses"],
      correctAns: "quotes",
    },
    4: {
      mark:
        "Which of the following keywords is used to define a variable in Javascript?",
      wrongAns: ["var", "let", "set"],
      correctAns: "Both A & B",
    },
    5: {
      mark: "Inside which HTML element do we put the JavaScript code?",
      wrongAns: ["<javascript>", "<js>", "<scripting>"],
      correctAns: "<script>",
    },
    6: {
      mark:
        "What is the correct syntax for referring to an external script called 'xxx.js'?",
      wrongAns: [
        "<script href='xxx.js'>",
        "<script name='xxx.js'>",
        "<link script='xxx.js'>",
      ],
      correctAns: "<script src='xxx.js'>",
    },
    7: {
      mark: "How do you create a function in JavaScript?",
      wrongAns: [
        "function:myFunction()",
        "function = myFunction()",
        "function(myFunction)",
      ],
      correctAns: "function myFunction()",
    },

    total: 8,
  },
  // Elements

  timerEl = document.getElementById("timer"),
  scoresEl = document.getElementsByClassName("scores"), // array of high scores
  highEl = document.getElementById("high"), // where high scores go
  feedbackEl = document.getElementById("feedback"),
  lastFeedbackEl = document.getElementById("last-feedback"),
  highscoreLinkEl = document.getElementById("highscore-link"),
  // Buttons

  startBtn = document.getElementById("start"),
  submitHighscoreBtn = document.getElementById("submit-highscore"),
  homeBtn = document.getElementById("home"),
  clearBtn = document.getElementById("clear"),
  // displays

  introEl = document.getElementById("intro"),
  quizEl = document.getElementById("quiz"), // also used for answer buttons
  endEl = document.getElementById("end"),
  highscoresEl = document.getElementById("highscores"),
  // Inputs

  initalsInput = document.getElementById("initials");
let questNums = [...Array(questions.total).keys()], // array 0 to num of questions
  timer = 60, // overall time limit
  timerInterval, // will be name of timer function interval
  num = 1, // question number
  newInitials = "anon";

// FUNCTIONS
function displayQ(question) {
  // display question text
  document.getElementById("question").textContent = question.mark;
  // ansPos is random number between 0 & index of answers for each question
  const correctPos = Math.floor(Math.random() * question.wrongAns.length + 1);
  // shuffle wrong answers
  question.wrongAns.sort(function (a, b) {
    return 0.5 - Math.random();
  });
  // display answers in buttons
  let wai = 0; // wrong answer index
  for (let btni = 0; btni <= question.wrongAns.length; btni++) {
    if (btni === correctPos) {
      // put correct answer on button
      document.getElementById(`ans${btni}`).textContent = question.correctAns;
    } else {
      // put wrong answer on button
      document.getElementById(`ans${btni}`).textContent =
        question.wrongAns[wai];
      wai++;
    }
  }
}

function endQuiz() {
  // stop timer
  clearInterval(timerInterval);
  // set negative scores to 0
  if (timer < 0) {
    timer = 0;
  }
  // display timer
  timerEl.textContent = `Time: ${timer}`;
  // display end screen
  endEl.style.display = "flex";
  // hide all other screens
  introEl.style.display = "none";
  quizEl.style.display = "none";
  highscoresEl.style.display = "none";
  // display final score
  document.getElementById(
    "final-score"
  ).textContent = `Your final score is ${timer}`;
  // display final question feedback
  lastFeedbackEl.textContent = feedbackEl.textContent;
}

function evalAns(event) {
  if (event.target.matches("button")) {
    const selectedAns = event.target.textContent;
    if (selectedAns === questions[questNums[num]].correctAns) {
      // answer is correct!
      feedbackEl.textContent = "correct!";
    } else {
      // answer is wrong, subtract 10 from timer
      feedbackEl.textContent = `wrong, the correct answer was ${
        questions[questNums[num]].correctAns
      }.`;
      timer -= 5;
      timerEl.textContent = `Time: ${timer}`; // display timer change
    }
    num++; // next question
    feedbackEl.style.display = "block"; // show answer 
    if (questions[questNums[num]]) {
      displayQ(questions[questNums[num]]);
    } else {
      endQuiz();
    }
  }
}

function startTimer() {
  timer--;
  timerEl.textContent = `Time: ${timer}`;
  if (timer <= 0) {
    // timer could be less than 0 when wrong ans subtacts 10
    // in any case, show timer is 0
    timer = 0;
    endQuiz();
  }
}

function startQuiz() {
  // bootstrap rows use flex, displays quiz screen
  quizEl.style.display = "flex";
  // hides all other screens
  introEl.style.display = "none";
  endEl.style.display = "none";
  highscoresEl.style.display = "none";
  // hide answer feedback for repeat quiz starts
  feedbackEl.style.display = "none";
  // show time on clock
  timer = 60;
  timerEl.textContent = `Time: ${timer}`;
  // start timer
  timerInterval = setInterval(startTimer, 1000);
  // randomize questions
  questNums.sort(function (a, b) {
    return 0.5 - Math.random();
  });
  // start at question 0
  num = 0;
  displayQ(questions[questNums[num]]);
}

function showHighscores() {
  // stop timer
  clearInterval(timerInterval);
  // display timer
  timerEl.textContent = `Time: ${timer}`;
  // show highscore screen
  highscoresEl.style.display = "flex";
  // hide other screens
  introEl.style.display = "none";
  quizEl.style.display = "none";
  endEl.style.display = "none";
}

function submitHighscore(event) {
  event.preventDefault();
  newInitials = initalsInput.value.trim();
  // create new elements for highscore table
  const newRowEl = document.createElement("tr");
  const newInitialsEl = document.createElement("td");
  const newScoreEl = document.createElement("td");
  // add "scores" class to new row
  newRowEl.className = "scores";
  // add data to table elements
  if (newInitials) {
    // use entered initials
    newInitialsEl.textContent = newInitials;
  } else {
    newInitialsEl.textContent = "No-Name";
  }
  newScoreEl.textContent = timer;
  // add table data to created row
  newRowEl.appendChild(newInitialsEl);
  newRowEl.appendChild(newScoreEl);
  // insert table row
  if (scoresEl.length) {
    for (let i = 0; i < scoresEl.length; i++) {
      if (timer >= scoresEl[i].lastElementChild.textContent) {
        scoresEl[i].insertAdjacentElement("beforebegin", newRowEl);
        break;
      }
    }
    if (timer < scoresEl[scoresEl.length - 1].lastElementChild.textContent) {
      scoresEl[scoresEl.length - 1].insertAdjacentElement("afterend", newRowEl);
    }
  } else {
    highEl.appendChild(newRowEl);
  }
  // save highscores to localstorage
  localStorage.setItem("highscores", highEl.innerHTML);
  // show highscore screen
  showHighscores();
}

function loadHighscores() {
  // load highscores from local storage
  const highscores = localStorage.getItem("highscores");

  // if highscores exist...
  if (highscores) {
    // add them to the table
    highEl.innerHTML = highscores;
  }
}

function goHome() {
  // display intro screen
  introEl.style.display = "flex";
  //hide other screens
  quizEl.style.display = "none";
  endEl.style.display = "none";
  highscoresEl.style.display = "none";
}

function clearHighscores() {
  localStorage.removeItem("highscores");
  highEl.innerHTML = "";
}


loadHighscores();
// add event listeners
startBtn.addEventListener("click", startQuiz);
quizEl.addEventListener("click", function (event) {
  evalAns(event);
});
submitHighscoreBtn.addEventListener("click", function (event) {
  submitHighscore(event);
});
homeBtn.addEventListener("click", goHome);
clearBtn.addEventListener("click", clearHighscores);
highscoreLinkEl.addEventListener("click", showHighscores);