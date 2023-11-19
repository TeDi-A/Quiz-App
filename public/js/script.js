let answerShow = document.querySelector(".answer-display")
let nextBtn = document.querySelector(".next-btn")
let showBtn = document.querySelector(".show-btn")

let currentIndex = <%= currentQuizIndex %>;
const savedQuiz = JSON.parse(document.querySelector('.quiz-start').dataset.quiz);


function nextQuiz() {
    currentIndex++;
    nextBtn.classList.add("hidden")
    answerShow.classList.add("hidden")
    showBtn.classList.remove("hidden")

    if (currentIndex >= savedQuiz.length) {
        currentIndex = 0;
    }

    document.querySelector('.question-display').textContent = savedQuiz[currentIndex].question;
    document.querySelector('.answer-display').textContent = savedQuiz[currentIndex].answer;
}

function showAns() {
    answerShow.classList.remove("hidden")
    nextBtn.classList.remove("hidden")
    showBtn.classList.add("hidden")
}