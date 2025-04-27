const questions = [
    {
        question: "Правильно вжито прийменник у реченні",
        options: ["Скоро відбудеться чемпіонат по спортивній гімнастиці.", "Зараз перспективно працювати в галузі біотехнологій.", "Моя сестра охоче дала мені свій конспект по математиці.", "При вашій допомозі ми добре підготуємо презентацію."],
        answer: 1  // Правильный ответ - CSS
    },
    {
        question: "Виділене слово є сполучником і його слід писати разом у реченні",
        options: ["Вибач мені за/те, що була неввічлива.", "Ранні птахи сповістили про/те, що займається новий день.", "То/ж не дівчина, а справжнісінький вихор.", "Як/би знали, не те б заспівали."],
        answer: 3 // Правильный ответ - console.log()
    },

    {
        question: "Виділене слово є сполучником і його слід писати разом у реченні",
        options: ["Ми вірші пишемо про/те, як стати біля дум на варті.", "Я хочу жити так, що/б серце билось в такт з гарячим серцем рідного народу.", "Співай же за мною про/те, як весною усе відживається знов.", "За/те, що жили ми в цей зоряний час, нам заздрити будуть нащадки."],
        answer: 1 // Правильный ответ - console.log()
    },

    {
        question: "Неправильно вжито прийменник у реченні",
        options: ["Пожежа спалахнула через недотримання елементарних норм безпеки.", "Уважно прочитайте інформацію про розмір ввізного мита.", "Школярі знову мають вимушені канікули із-за лютих морозів.", "У нашій школі вже кілька років поспіль працює дебатний клуб."],
        answer: 2 // Правильный ответ - 8
    },
    {
        question: "Неправильно вжито прийменник у словосполученні",
        options: ["вишивати по шовку", "зустрітися по обіді", "зайти по неуважності", "відповідати по черзі"],
        answer: 2 // Правильный ответ - console.log()
    },
    {
        question: "Помилково вжито прийменник у рядку",
        options: ["заздрити із-за успіхів", "беручкий до науки", "майстер з ремонт", "хворіти на бронхіт"],
        answer: 0 // Правильный ответ - console.log()
    },
    {
        question: " Запропонована в дужках конструкція є НЕПРАВИЛЬНОЮ в рядку",
        options: ["за місцем перебування (по місцю перебування)", "берегти на всякий випадок (берегти про всякий випадок)", "з початку експерименту (від початку експерименту)", "усупереч постанові (незважаючи на постанову)"],
        answer: 0 // Правильный ответ - console.log()
    },
    
    {
        question: "НЕМАЄ орфографічних помилок у варіанті",
        options: ["Основи правильного харчування та базові фізичні вправи сьогодні знає чи не кожен, хто має бажання почувати себе впевненно за будь яких обставин.", "Запорукою краси та здоров\'я насамперед є збалансованний щоденний рацион та оптимальне фізичне навантаження.", "Вибір продуктів, технологія приготування страв та особливості споживання їх мають бути підпорядковані правилам здорового харчування.", "Не зважаючи на розмаїття пропонованих практик здорового харчування, їх об\'єднує принцип чіткого поділу продуктів на користні та шкідливі."],
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