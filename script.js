

 const questions = [
    {
      question: "Javascript is an _______ language?",
      choices: ["Object-oriented", "Object-based", "Procedural", "None of the above"],
      answer: "Object-oriented",
    },
    {
      question: "Which of the following keywords is used to define a variable in Javascript?",
      choices: ["var", "let", "Both A & B", "None of the above"],
      answer: "Both A & B",
    },
    {
      question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
      choices: ["Throws an error", "Ignores the statement", "Gives a warning", "Doesn´t show anything"],
      answer: "Ignores the statement",
    },
    {
        question: "Which of the following methods can be used to display data in some form using Javascript?",
        choices: ["document.write()", "console.log()", "window.alert()", "All"],
        answer: "All",
      },
      {
        question: " What keyword is used to check whether a given property is valid or not?",
        choices: ["In", "Is in", "Exist", "Lies"],
        answer: "In",
      },
    

  ];



function MyTimer(callback, val) {
    val = val || 60;
    var timer=setInterval(function() {
        callback(val);
        if(val-- <= 0) {
            clearInterval(timer);
        }
    }, 1000);
}
new MyTimer(function(val) {
    var timerMsg = "00:" + (val >= 10 ? val : "0" + val);
    document.getElementById("timer").textContent = timerMsg;
});