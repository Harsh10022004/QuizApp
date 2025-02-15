let currentQuestion = 0;
let score = 0;
let questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '<script>',
        choice2: '<css>',
        choice3: '<style>',
        choice4: '<span>',
        answer: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '<!-- Comment -->',
        choice3: '/* Comment */',
        choice4: '<! Comment>',
        answer: 2,
    },
];

window.onload = function() {
    updateElements();
    let buttons = document.getElementsByClassName(":not(#final-score) btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            nextPageAndUpdateScore(i + 1);
        };
    }
}

function endQuiz() {
    let scoreOverlay = document.querySelector("#f-score");
    scoreOverlay.classList.remove("hide");
    scoreOverlay.classList.add("final-score");
    enableButtons();
    document.getElementById("final-score").innerText = `Final Score: ${score}`;
}

function changeOptionColor(option, ans) {
    let buttons = document.getElementsByClassName("option-text");
    for (let i = 0; i < buttons.length; i++) {
        if (i + 1 === option) {
            buttons[i].style.backgroundColor = ans ? "green" : "red";
        } else {
            buttons[i].style.backgroundColor = "white";
        }
    }
}

function validateAnswer(currentQuestion, option) {
    return questions[currentQuestion].answer === option;
}

function navigateHome() {
    window.location.href = 'quick.html';
}

function disableButtons() {
    let buttons = document.getElementsByClassName("btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
    }
}

function enableButtons() {
    let buttons = document.getElementsByClassName("btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false;
    }
}

function updateScore() {
    let scoreElement = document.getElementById("score");
    scoreElement.innerText = score;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    console.log("restarting the quiz")
    let doc = document.querySelector("#f-score");
    doc.classList.add("hide");
    doc.classList.remove("final-score");
    updateElements();
    enableButtons();
}

function updateElements() {
    let questionElement = document.getElementById("question");
    questionElement.innerText = questions[currentQuestion].question;

    let buttons = document.getElementsByClassName("option-text");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerText = questions[currentQuestion]["choice" + (i + 1)];
        buttons[i].style.backgroundColor = "";
    }

    document.getElementById("question-num").innerText = currentQuestion + 1;
    document.getElementById("score").innerText = score;
}

function nextPageAndUpdateScore(option) {
    let ans = validateAnswer(currentQuestion, option);
    if (ans) {
        score += 10;
    }

    updateScore(); 
    changeOptionColor(option, ans); 

    disableButtons();

    setTimeout(function() {
        currentQuestion++;
        if (currentQuestion >= questions.length) {
            endQuiz();
        } else {
            updateElements();
            enableButtons();
        }
    }, 1000);

    console.log(`Current question: ${currentQuestion}, Option: ${option}, Score: ${score}`);
}