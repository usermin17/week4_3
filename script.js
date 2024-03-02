const quizData = [
    {
      question: "Which country did the french fries originate from?",
      options: ["France", "USA", "UK", "Belgium"],
      correctAnswer: "Belgium"
    },
    {
      question: "Where was Chicken Tikka masala invented?",
      options: ["London, England", "New Delhi, India", "Glasgow, Scotland", "Punjab, India"],
      correctAnswer: "Glasgow, Scotland"
    },
    {
        question: "What is the national dish of Thailand that contains rice noodles, tofu, dried shrimp, sprouts, and eggs?",
        options: ["Ramen","Pho","Pad Thai","Mi Goreng"],
        correctAnswer: "Pad Thai"
    },
    {
        question: "What is the staple food of almost one-third of the world's population?",
        options: ["Wheat","Rice","Bread","Lentils"],
        correctAnswer: "Rice"
    },
    {
        question: "Among the numerous pizza toppings, which is the most commonly used?",
        options: ["Extra Cheese","Pepperoni","Mushrooms","Pineapples"],
        correctAnswer: "Pepperoni"
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const feedbackElement = document.getElementById('feedback');
  const submitButton = document.getElementById('submit-btn');
  const timerElement = document.getElementById('timer');
  const scoreElement = document.getElementById('score-value');
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 10;
  let timerInterval;
  
  function displayQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    
    optionsElement.innerHTML = "";
    currentQuestion.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.addEventListener('click', () => {
        handleAnswer(option === currentQuestion.correctAnswer);
      });
      optionsElement.appendChild(button);
    });
  }
  
  function handleAnswer(isCorrect) {
    if (isCorrect) {
      feedbackElement.textContent = "Correct!";
      score++;
      scoreElement.textContent = score;
    } else {
      feedbackElement.textContent = "Incorrect!";
    }
    disableOptions();
  }
  
  function disableOptions() {
    const optionButtons = optionsElement.querySelectorAll('button');
    optionButtons.forEach(button => {
      button.disabled = true;
    });
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      displayQuestion();
      feedbackElement.textContent = "";
      enableOptions();
      resetTimer();
    } else {
      endQuiz();
    }
  }
  
  function enableOptions() {
    const optionButtons = optionsElement.querySelectorAll('button');
    optionButtons.forEach(button => {
      button.disabled = false;
    });
  }
  
  function startTimer() {
    timerInterval = setInterval(() => {
      timeLeft--;
      timerElement.textContent = `Time Left: ${timeLeft}s`;
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        handleTimeOut();
      }
    }, 1000);
  }
  
  function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 10;
    timerElement.textContent = `Time Left: ${timeLeft}s`;
    startTimer();
  }
  
  function handleTimeOut() {
    feedbackElement.textContent = "Time's up!";
    disableOptions();
    setTimeout(nextQuestion, 2000);
  }
  
  function endQuiz() {
    clearInterval(timerInterval);
    feedbackElement.textContent = `Quiz ended! Your score is ${score}`;
    submitButton.disabled = true;
  }
  
  submitButton.addEventListener('click', nextQuestion);
  
  displayQuestion();
  startTimer();
  