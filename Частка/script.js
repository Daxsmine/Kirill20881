const questions = [
    {
        question: "Позначте рядок, у якому всі словосполучення містять частки:",
        options: ["хай буде так; ошелешений і розгублений; дізнатися не від товариша", "озирайся не озирайся; це ж мій друг; сказав би комусь", "то джерело знань; ось чого захотів; довідався про новини", "зроби саме так, невже це важко, згідно з домовленістю"],
        answer: 1  // Правильный ответ - CSS
    },
    {
        question: "Позначте рядок, у якому в усіх словах виділене слово є сполучником і його слід писати РАЗОМ:",
        options: ["І сказала мати: ”Як/би ти, сину, йшов в отаку погоду?”.", "Чисте полуденне небо, і тихо-тихо, немов/би все заснуло.", "То/ж сіль землі, то/ж сила молода ішла на смерть, на згубу неминучу.", "Що/б улітку не вродило, те зимою не завадить."],
        answer: 1 // Правильный ответ - console.log()
    },

    {
        question: "Немає частки в рядку",
        options: ["навряд чи це можливо", "нехай кожен наведе приклад", "тільки не змушувати", "синіти, наче море"],
        answer: 3 // Правильный ответ - console.log()
    },

    {
        question: "Виділене слово є сполучником і його слід писати разом у реченні",
        options: ["Вибач мені за/те, що була неввічлива", "Ранні птахи сповістили про/те, що займається новий день.", "Як/би знали, не те б заспівали.", "Як/би не переймався, балачками визнання не здобудеш."],
        answer: 2 // Правильный ответ - 8
    },
    {
        question: "Частку вжито в рядку",
        options: ["Ніколи мені не забути красу незвичайну.", "Найкраща пора у людини - кохання.", "Садочки зацвіли, неначе полотном укриті", "Із-за лісу, з-за туману, місяць випливає."],
        answer: 0 // Правильный ответ - console.log()
    },
    {
        question: "Виділене слово є сполучником і його слід писати разом у реченні",
        options: ["Ми вірші пишемо про/те, як стати біля дум на варті.", "Всяк лицар має з королем ходити у походи, за/те він матиме собі і ласку, й нагороди.", "Я хочу жити так, що/б серце билось в такт з гарячим серцем рідного народу.", "За/те, що жили ми в цей зоряний час, нам заздрити будуть нащадки."],
        answer: 2 // Правильный ответ - console.log()
    },
    {
        question: " Правильно написано всі частки в рядку",
        options: ["дехто, ніякий, скільки-небудь, абищо", "нібито, мовби, авжеж, атож, аякже, ото, онде", "будь-що, якийсь, аби-хто, що-небудь", "нічий, хто-небудь, де-який, будь-чий"],
        answer: 1 // Правильный ответ - console.log()
    },
    
    {
        question: "Виділене слово НЕ є часткою в реченні",
        options: ["Тільки в праці відчуваєш себе окриленим, необхідним людям.", "Не знаю, чи доведеться мені ще раз побувати в Києві.", "Хай завжди сіється добро на полі людського життя.", "Дерева і трави наче світилися наскрізь."],
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