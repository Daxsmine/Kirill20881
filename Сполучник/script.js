const questions = [
    {
        question: "Cполучник - це",
        options: ["самостійна частина мови, яка вказує на предмет", "самостійна незмінна частина мови", " службова незмінна частина мови, яка служить для з’єднання однорідних членів речення та частин складного речення", "самостійна частина мови, що вказує на кількість предметів та порядок їх при лічбі"],
        answer: 2  // Правильный ответ - CSS
    },
    {
        question: "Виділене слово є сполучником і його слід писати разом у реченні",
        options: ["Вибач мені за/те, що була неввічлива.", "Як/би знали, не те б заспівали.", "Як/би не переймався, балачками визнання не здобудеш.", "То/ж не дівчина, а справжнісінький вихор."],
        answer: 1 // Правильный ответ - console.log()
    },

    {
        question: "Виділене слово є сполучником і його слід писати разом у реченні",
        options: ["Ми вірші пишемо про/те, як стати біля дум на варті.", "Я хочу жити так, що/б серце билось в такт з гарячим серцем рідного народу", "Співай же за мною про/те, як весною усе відживається знов.", "За/те, що жили ми в цей зоряний час, нам заздрити будуть нащадки."],
        answer: 1 // Правильный ответ - console.log()
    },

    {
        question: "Сполучник умови вжито в реченні",
        options: ["Коли бажання добре, то й дорога легка.", "Хоч була пізня осінь, день стояв погожий.", "З’явились хмари, так що буде дощ.", "Принеси води, бо дуже хочу пити."],
        answer: 0 // Правильный ответ - 8
    },
    {
        question: "У реченні «Викладач дуже зрадів, … почув самостійні судження студентів» може бути кожен з названих сполучників, окрім",
        options: ["тому що", "оскільки", "адже", "тобто"],
        answer: 3 // Правильный ответ - console.log()
    },
    {
        question: "Виділене слово є сполучником і його треба писати разом у реченні",
        options: ["Як/би дівчата не любили гомоніти, а мовчать", "Як/би не було важко, іди до своєї мети", "Як/би знав я чари, що спиняють хмари.", "Як/би там не було, ми мали це перевірити."],
        answer: 2 // Правильный ответ - console.log()
    },
    {
        question: " Види сполучників за способом використання",
        options: ["Прості, складні, складені", "Похідні, непохідні", "Одиничні, повторювані, парні", "Сурядні, підрядні"],
        answer: 2 // Правильный ответ - console.log()
    },
    
    {
        question: "Знайдіть рядок, у якому сурядні сполучники",
        options: ["І, щоб, а , то", "Або, та, зате", "Щоб, бо, і, й", "А, але, коли, який"],
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