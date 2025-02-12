const quizData = [
    {
        question:"Що таке Іменник ?",
        options:["Самостійна частина мови ", "Граматична категорія "," Рід " , "Зміст слова"  ],
        answer:"Самостійна частина мови ",
    },

    {
        question:"Скільки усього відмінків іменників",
        options:["4 ", "7"," 9" , "Нема правильної відповіді"  ],
        answer:"7",
    },


    {
        question:"Які є роди у іменника ",
        options:["Чоловічий", "Жіночий","Середній" ,"Усі відповіді правильні"  ],
        answer:"Усі відповіді правильні" ,
    },

];


const quizContainer = document.getElementById('quiz')
const questionElement = document.getElementById('question')
const optionsElement = document.getElementById('options')
const nextButton = document.getElementById('nextBtn')
const resultsElement = document.getElementById('results')


let currentQuestionIndex = 0;
let score = 0;

function loadQustion(){
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener('click', selectOption);
        optionsElement.appendChild(button);
    });
}

function selectOption(evenet){
    const selectedOption = evenet.target.textContent;
    const correctAnswer = quizData[currentQuestionIndex].answer;
    if(selectedOption === correctAnswer){
        score++;
    }    
    nextButton.style.display = 'block';
    optionsElement.querySelectorAll('button'.forEach(button => {
        button.removeEventListener('click', selectOption);
    }));
}


function nextQuestion(){
    currentQuestionIndex++;
    if(currentQuestionIndex < quizData.length){
        loadQustion();
        nextButton.style.display = 'none';
    }else{
        showResults()
    }
}

function showResults(){
    resultsElement.textContent = "Ви набрали " +  score  + " из " + quizData.length  + " баллов ";
}

nextButton.addEventListener('click', nextQuestion);
loadQustion();