const questions = [
    {
        question: "НЕПРАВИЛЬНО утворено форму наказового способу дієслова в рядку",
        options: ["читаймо, їжмо", "живімо, стіймо", "сядемо, повірмо", "дихаймо, граймо"],
        answer: 2  // Правильный ответ - CSS
    },
    {
        question: "Правильні особові форми дієслів наведено в рядку",
        options: ["сидять, носять", "боряться, орють", "полять, сміються", "гудуть, терплють"],
        answer: 0 // Правильный ответ - console.log()
    },

    {
        question: "Правильно утворено форму третьої особи множини від інфінітива",
        options: ["проводжати — проводять", "полоти — полять", "бігти — біжать", "хотіти — хотять"],
        answer: 2 // Правильный ответ - console.log()
    },

    {
        question: "Неправильно утворено форму слова у варіанті",
        options: ["їздити по понеділкам", "вісім десятих кілограма", "виголосить промову", "задля спільної вигоди"],
        answer: 0 // Правильный ответ - 8
    },
    {
        question: "Правильно вжито дієслівну форму в реченні",
        options: ["Чи ти дасиш мені олівець?", "Стань у центрі кімнати.", "Парламент ухвале це рішення.", "Ходімте на вулицю."],
        answer: 1 // Правильный ответ - console.log()
    },
    {
        question: "Неправильно утворено форму наказового способу дієслова в рядку",
        options: ["пишемо", "пишімо", "пиши", "пишіть"],
        answer: 2 // Правильный ответ - console.log()
    },
    {
        question: " Закінчення -емо в першій особі множини теперішнього часу має особова форма дієслова, утворена від інфінітива",
        options: ["бігти", "говорити", "писати", "ходити"],
        answer: 2 // Правильный ответ - console.log()
    },
    
    {
        question: "Форму наказового способу дієслова вжито в реченні",
        options: ["Пропонуємо простий рецепт картоплі по-селянськи: потрібні продукти завжди є в кожній оселі.", "Спробуйте приготувати цю апетитну страву вдома й насолоджуйтеся її смаком разом з рідними!", "Випікати потрібно в духовій шафі хвилин 30–40 за температури 180–200 оС до золотистого кольору.", "Додаємо олію, сіль, перець, збір сушених італійських трав, усе добре перемішуємо, викладаємо на застелений папером лист"],
        answer: 1 // Правильный ответ - console.log()
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