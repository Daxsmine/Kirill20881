const questions = [
    {
        question: "Через дефіс треба писати всі прислівники в рядку",
        options: ["по/моєму, казна/куди, хоч/не/хоч", "рік/у/рік, урешті/решт, хтозна/коли", "по/вашому, на/добраніч, якось/то", "по/іспанськи, уряди/годи, по/одинці"],
        answer: 0  // Правильный ответ - CSS
    },
    {
        question: "Помилку в написанні прислівника допущено в рядку",
        options: ["зроду-віку, з давніх-давен, спрадавна", "видимо-невидимо, анічичирк, аби-де", "як-не-як, в основному, по-чиновницьки", "по-четверте, всього-на-всього, щосереди"],
        answer: 1 // Правильный ответ - console.log()
    },

    {
        question: "З дефісом треба писати всі прислівники в рядку",
        options: ["по/нашому, в/нічию, ледве/ледве, сяк/так", "з/рештою, врешті/решт, хтозна/куди, вряди/годи", "мало/помалу, віч/на/віч, десь/інколи, по/латині", "десь/то, як/раз, як/небудь, будь/коли"],
        answer: 2 // Правильный ответ - console.log()
    },

    {
        question: "За будовою числівники поділяються на…",
        options: ["порядкові та кількісні", "похідні та непохідні", "прості, складні та складені", "якісно-означальні, обставинні"],
        answer: 2 // Правильный ответ - 8
    },
    {
        question: "Неправильно утворено форму слова у варіанті",
        options: ["познімали пальта", "упродовж доби", "стежачи за дітьми", "усих учасників"],
        answer: 3 // Правильный ответ - console.log()
    },
    {
        question: "Разом треба писати всі слова в рядку",
        options: ["в/літку, по/тихеньку, на/вічно", "на/чисто, з/ранку, в/основному", "до/нині, за/надто, до/вподоби", "без/упину, на/весні, від/тоді"],
        answer: 0 // Правильный ответ - console.log()
    },
    {
        question: " НЕМАЄ орфографічних помилок у варіанті",
        options: ["Основи правильного харчування та базові фізичні вправи сьогодні знає чи не кожен, хто має бажання почувати себе впевненно за будь яких обставин.", "Запорукою краси та здоров\'я насамперед є збалансованний щоденний рацион та оптимальне фізичне навантаження.", "Вибір продуктів, технологія приготування страв та особливості споживання їх мають бути підпорядковані правилам здорового харчування.", "Не зважаючи на розмаїття пропонованих практик здорового харчування, їх об\'єднує принцип чіткого поділу продуктів на користні та шкідливі."],
        answer: 2 // Правильный ответ - console.log()
    },
    
    {
        question: "Разом треба писати всі слова в рядку",
        options: ["на/чисто, з/ранку, в/основному", "у/літку, по/тихеньку, на/вічно", "без/упину, на/весні, від/тоді", "до/нині, за/надто, до/вподоби"],
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