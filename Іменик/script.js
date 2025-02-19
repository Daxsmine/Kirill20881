const questions = [
    {
        question: "Що таке іменник?",
        options: ["самостійна частина мови", "зміст слова", "граматична категорія", "Усі відповіді правильні"],
        answer: 0  // Правильный ответ - CSS
    },
    {
        question: "Знахідний відмiнок відповідає на питання ?",
        options: ["Хто? Що?", "Ким? Чим?", "Кого? Що?", "На кому? На чому?"],
        answer: 2 // Правильный ответ - console.log()
    },

    {
        question: "Яке закінчення має іменник  3 відміни ?",
        options: ["-а (я)", "-о , -е, -а(на письмі я)", "нульове", "усі відповіді правильні "],
        answer: 2 // Правильный ответ - console.log()
    },

    {
        question: "Форму однини і множини мають усі іменники рядка ",
        options: ["мис, коала, гречка, кошик", "мак, одяг, акордеон, вікно", "Граніт, фільм, народ, місто", "місток, слоненя, вус, пляж"],
        answer: 3 // Правильный ответ - 8
    },
    {
        question: "Лише іменники чоловічого роду записано в рядку ",
        options: ["професор, Олекса, філігрань, кінь", "Абдулла, шампунь, консоль, пінчер", "розпродаж, Дністер, щабель, касир", "пасок, желатин, жовч, шоколад"],
        answer: 1 // Правильный ответ - console.log()
    },
    {
        question: "До одного роду належать усі іменики рядка ",
        options: ["ступінь, Мелітополь, хлоп'я, приблуда  ", "Нікарагуа, гуаш, боржомі, радість", "теля, ГЕС, інтерв'ю, комюніке", "пані, ПАР, тюль, Прип'ять "],
        answer: 1 // Правильный ответ - console.log()
    },
    {
        question: "До одного роду належать усі іменики рядка ",
        options: ["Сімферополь, нежить, фламінго, ЄС", "гінді, Умань, незалежніть, фенхель", "Балі, кредо, Чернівці, сонько", "ЗНО, Токіо, шосе, какаду"],
        answer: 0 // Правильный ответ - console.log()
    },
    
    {
        question: "Лише форму однини мають усі іменники рядка ",
        options: ["уява, срібло, століття", "горох, плем'я, Ужгород", "олово, ярмарок, хмиз", "байдужість , листя, юнь"],
        answer: 3 // Правильный ответ - console.log()
    },
    {
        question: "Лише іменники чоловічого роду було записано в рядку ",
        options: ["лікар, бутель, аерозоль, бандероль", "ярмарок, Дніпро, фенхель, степінь", "ступінь, перекис, макіяж, папороть", "продаж, нехворощ, дриль, Бердичів"],
        answer: 1 // Правильный ответ - console.log()
    },
    {
        question: "Лише іменники жіночого роду записано в рядку ",
        options: ["базіка, жаднюга, повитуха, причепа", "нероба, підлиза, стиляга, ненажера", "нездара, замазура, заїка, кухарка ", "сонько, ледащо, малятко, чванько"],
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
    document.getElementById("quiz").innerHTML = `<h2>Вы завершили тест!</h2><p>Ваш результат: ${score} із ${questions.length}</p>`;
    document.getElementById("restart").style.display = "block";
    localStorage.clear();
}

function restartQuiz() {
    currentQuestionIndex = 0;
    selectedAnswers = {};
    saveProgress();
    document.getElementById("quiz").innerHTML = '<div class="question" id="question"></div><div class="options" id="options"></div><div class="buttons"><button id="prev" onclick="prevQuestion()">Назад</button><button id="next" onclick="nextQuestion()">Следующий</button><button id="finish" onclick="finishQuiz()" style="display:none;">Завершить тест</button></div>';
    document.getElementById("restart").style.display = "none";
    loadQuestion();
}

loadQuestion();