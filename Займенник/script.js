const questions = [
    {
        question: "Займеник це ",
        options: ["самостійна частина мови, яка вказує на предмет", "самостійна незмінна частина мови", "самостійна частина мови, яка вказує на предмети, ознаки або кількість", "самостійна частина мови, що вказує на кількість предметів та порядок їх при лічбі"],
        answer: 2  // Правильный ответ - CSS
    },
    {
        question: "Лише займеники записано в рядку ",
        options: ["ти,кожний,котрий,тут", "себе,будь-який,що,нас", "хто,казна-де,ваш,увесь", "чия,щоб,хто-небудь,мій"],
        answer: 1 // Правильный ответ - console.log()
    },

    {
        question: "Правильною є форма займенника в словосполученні",
        options: ["спілкуватися з їми", "на тім березі ріки ", "з твоєго району", "до нашіх батьків"],
        answer: 1 // Правильный ответ - console.log()
    },

    {
        question: "Правильно написано всі займенники рядка",
        options: ["дехто, ніякий, скільки-небудь, абищо", "ніщо, будь-який, де-котрий, ніскільки", "будь-хто, якийсь, ніякий, хто-зна-що", "нічий, хто-небудь, де-який, будь-чий"],
        answer: 0 // Правильный ответ - 8
    },
    {
        question: "Неправильно утворено форму слова у варіанті",
        options: ["познімали пальта", "у чистім полі", "стежачи за дітьми", "усих учасників"],
        answer: 3 // Правильный ответ - console.log()
    },
    {
        question: "Неправильно утворено форму слова у варіанті",
        options: ["морських узбережжів", "на твоєму моніторі", "згідно з постановою", "хочуть навчатися"],
        answer: 0 // Правильный ответ - console.log()
    },
    {
        question: " Неправильно утворено форму слова у варіанті",
        options: ["восьмидесяти років", "для всіх дослідників", "пане Костянтине", "візьмімо участь"],
        answer: 0 // Правильный ответ - console.log()
    },
    
    {
        question: "Правильно написано всі займенники рядка",
        options: ["дехто, ніякий, скільки-небудь, абищо", "якийсь, будь-який, аби-хто, що-небудь", "нічий, хто-небудь, де-який, будь-чий", "будь-хто, аніхто, хто-зна-що, ніскільки"],
        answer: 0 // Правильный ответ - console.log()
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