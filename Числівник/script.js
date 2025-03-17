const questions = [
    {
        question: "Числівник - це",
        options: ["самостійна частина мови, яка вказує на предмет", "самостійна незмінна частина мови", "особлива форма дієслова", "самостійна частина мови, що вказує на кількість предметів та порядок їх при лічбі"],
        answer: 3  // Правильный ответ - CSS
    },
    {
        question: "В якому рядку всі слова належать до числівників?",
        options: ["трійня, тричі", "четверо, кількасот", "надвоє, четвертувати", "поодинці, шість"],
        answer: 1 // Правильный ответ - console.log()
    },

    {
        question: "Знайдіть рядок, в якому числівник ПРАВИЛЬНО узгоджується з іменником",
        options: ["два учня", "півтора торти", "чотири столи", "одна третя апельсин"],
        answer: 2 // Правильный ответ - console.log()
    },

    {
        question: "За будовою числівники поділяються на…",
        options: ["порядкові та кількісні", "похідні та непохідні", "прості, складні та складені", "якісно-означальні, обставинні"],
        answer: 2 // Правильный ответ - 8
    },
    {
        question: "Порушено граматичну форму на позначення часу в рядку:",
        options: ["без десяти хвилин сьома", "десять хвилин до шостої", "за десять четверта", "сім хвилин по восьмій"],
        answer: 0 // Правильный ответ - console.log()
    },
    {
        question: "Правильною є відмінкова форма числівника в рядку:",
        options: ["семидесяти трьох", "сімомастами чотирьма", "дев’ятьмастами чотирма", "півторастами"],
        answer: 2 // Правильный ответ - console.log()
    },
    {
        question: " ПОМИЛКОВОЮ є відмінкова форма числівника в рядку",
        options: ["кількомастами вісьма", "тридцяти семи", "одній сьомій", "п'ятистами семи"],
        answer: 3 // Правильный ответ - console.log()
    },
    
    {
        question: "Укажіть рядок, в котрому відмінюється лише друга частина числівника",
        options: ["вісімсот", "півтораста", "шістдесят", "кількасот"],
        answer: 2 // Правильный ответ - console.log()
    },
    
];

let currentQuestionIndex = parseInt(localStorage.getItem("currentQuestionIndex")) || 0;
let selectedAnswers = JSON.parse(localStorage.getItem("selectedAnswers")) || {};

function saveProgress() {
    localStorage.setItem("currentQuestionIndex", currentQuestionIndex);
    localStorage.setItem("selectedAnswers", JSON.stringify(selectedAnswers));
}

function loadQuestion() {
    document.getElementById("question").innerText = questions[currentQuestionIndex].question;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    
    questions[currentQuestionIndex].options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.onclick = function() {
            selectedAnswers[currentQuestionIndex] = index;
            saveProgress();
            loadQuestion();
        };
        if (selectedAnswers[currentQuestionIndex] === index) {
            button.classList.add("selected");
        }
        optionsContainer.appendChild(button);
    });
    
    document.getElementById("prev").style.display = currentQuestionIndex === 0 ? "none" : "block";
    document.getElementById("next").style.display = (currentQuestionIndex < questions.length - 1) ? "block" : "none";
    document.getElementById("finish").style.display = (currentQuestionIndex === questions.length - 1) ? "block" : "none";
}

function nextQuestion() {
    if (selectedAnswers[currentQuestionIndex] !== undefined) {
        currentQuestionIndex++;
        saveProgress();
        loadQuestion();
    } else {
        alert(" Оберіть відповідь !");
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        saveProgress();
        loadQuestion();
    }
}

function finishQuiz() {
    let score = Object.keys(selectedAnswers).filter(index => selectedAnswers[index] === questions[index].answer).length;
    document.getElementById("quiz").innerHTML = `<h2>Вы завершили тест!</h2><p> Результат: ${score} із ${questions.length}</p>`;
    document.getElementById("restart").style.display = "block";
    localStorage.clear();
}

function restartQuiz() {
    currentQuestionIndex = 0;
    selectedAnswers = {};
    saveProgress();
    document.getElementById("quiz").innerHTML = '<div class="question" id="question"></div><div class="options" id="options"></div><div class="buttons"><button id="prev" onclick="prevQuestion()">Назад</button><button id="next" onclick="nextQuestion()">Наступний</button><button id="finish" onclick="finishQuiz()" style="display:none;">Завершити тест</button></div>';
    document.getElementById("restart").style.display = "none";
    loadQuestion();
}

loadQuestion();