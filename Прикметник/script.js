const questions = [
    {
        question: "Помилку в написанні прикметникового суфікса допущено в рядку",
        options: ["вишневий, замшевий", "магнієвий, маршовий", "плюшевий, палацовий", "гайовий, алюмінійовий"],
        answer: 3  // Правильный ответ - CSS
    },
    {
        question: "Позначте рядок, у якому всі прикметники присвійні:",
        options: ["лікарів рецепт, лебедина пісня, Оленчина косинка;", "Франкові заклики, ненин голос, слюсарів інструмент;", "товаришева книга, Кобзарів заповіт, ахіллесова п’ята;", "професорова лекція, солдатська каска, Іванків олівець;"],
        answer: 1 // Правильный ответ - console.log()
    },

    {
        question: "Форми ступенів порівняння прикметників правильно утворено в рядку",
        options: ["багатший, більш вірогідний, щонайрозвинутіший, найбільш цивілізований", "менш відомий, пресильніший, найохайніший, найменш визначний", "дешевший, сліпіший, найнижчий, найбільш самостійний", "повніший, більш прозорий, самий тонкий, найменш потужний "],
        answer: 0 // Правильный ответ - console.log()
    },

    {
        question: "Закінчення -ий має прикметник, утворений від слова",
        options: ["торік", "дорога", "тривога", "учора"],
        answer: 2 // Правильный ответ - 8
    },
    {
        question: "Граматичну помилку допущено в рядку ",
        options: ["найвідоміші скульптури", "більш цікавіший сюжет", "найменш привабливі ціни", "тонший від паперу"],
        answer: 1 // Правильный ответ - console.log()
    },
    {
        question: "Закінчення -ий має прикметник, утворений від слова",
        options: ["тепер ", "колись", "туман", "вечір "],
        answer: 2 // Правильный ответ - console.log()
    },
    {
        question: "Помилку у творенні ступенів порівняння прикметників допущено в рядку",
        options: ["коротший, щонайкращий", "ближчий, більш гарячіший", "добріший, найменш удалий", "вужчий, найменш потрібний"],
        answer: 1 // Правильный ответ - console.log()
    },
    
    {
        question: "Неправильно утворено форму слова у варіанті",
        options: ["два студенти", "сімома голосами", "віддаси потім", "самий головний"],
        answer: 3 // Правильный ответ - console.log()
    },
    {
        question: "Суфікс -ев- має прикметник, утворений від слова ",
        options: ["край", "кварц", "груша", "вечір"],
        answer: 2 // Правильный ответ - console.log()
    },
    {
        question: "НЕПРАВИЛЬНО утворено слово ",
        options: ["харчовий", "критичний", "бабусін ", "роздрібний"],
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