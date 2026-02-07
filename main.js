const questions = [
    { q: "Сколько сообщений у нас в чате?", a: ["25к", "38к", "41к", "28к"], correct: 1 },
    { q: "Когда мы познакомились?", a: ["30.03.2024", "28.02.2024", "15.02.2024", "28.02.2025"], correct: 1 },
    { q: "Сколько раз в новом чате выступает слово <Люблю>?", a: ["14", "0", "я тебя не люблю", "741"], correct: 3 },
    { q: "Чего мы закажем покушать?", a: ["Пузата хата", "Пицца", "Мак", "Суши"], correct: 2 },
    { q: "В какую игру мы играем вместе?", a: ["Counter Strike 2", "Valorant", "Call of duty", "The finals"], correct: 1 },
     { q: "Чьи пяточки?", a: ["Мои", "Медвежонка", "Черепахи", "Бегемота"], correct: 1 },
    { q: "Что выберешь?", a: ["Утро", "День", "Обед", "Ночь"], correct: 3 },
    { q: "Самые частые называлки", a: ["Солнце", "Кот", "Милый", "Любимый"], correct: 2 },
    { q: "Анектод))", a: ["Чернобыль", "Медведь", "Заяц", "Штирлиц"], correct: 0 },
    { q: "Как мы познакомились?", a: ["Онлайн-знакомства(приложения)", "Познакомились в тц", "На уроках польского", "Узнали друг о друге из тиктока"], correct: 2 }
];

let currentIdx = 0;
let score = 0;
let timeLeft = 20;
let timerInterval;

// Чекаємо завантаження сторінки
document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    
    if (startBtn) {
        startBtn.addEventListener("click", startGame);
    } else {
        console.error("Кнопку старт не знайдено!");
    }
});

function startGame() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    render();
}

function startTimer() {
    timeLeft = 20;
    document.getElementById("timer").innerText = timeLeft;
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextQuestion();
        }
    }, 1000);
}

function render() {
    if (currentIdx >= questions.length) {
        clearInterval(timerInterval);
        document.getElementById("game-container").innerHTML = `
            <h1>Молодец!</h1>
            <h2>Ваш результат: ${score}</h2>
            <button onclick="location.reload()" style="background:#1368ce; padding:15px; border-radius:8px; color:white; border:none; cursor:pointer;">Еще раз</button>
        `;
        return;
    }

    const q = questions[currentIdx];
    document.getElementById("question-text").innerText = q.q;
    const container = document.getElementById("answer-options");
    container.innerHTML = "";

    q.a.forEach((ans, i) => {
        const btn = document.createElement("button");
        btn.innerText = ans;
        btn.className = `btn-${i}`;
        btn.onclick = function() {
            
            const allButtons = container.querySelectorAll("button");
            allButtons.forEach(b => b.style.pointerEvents = "none");
            
            clearInterval(timerInterval); // Зупиняємо таймер

            if (i === q.correct) {
                btn.classList.add("correct");
                score += (timeLeft * 10);
                document.getElementById("score").innerText = score;
            } else {
                btn.classList.add("wrong");
                
                allButtons[q.correct].classList.add("correct");
            }

           
            setTimeout(nextQuestion, 1000);
        };
        container.appendChild(btn);
    });
    startTimer();
}

function nextQuestion() {
    currentIdx++;
    render();
}