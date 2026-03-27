const quiz = [
    {
        question: "Hvilket fagområde studerer samfunn og politikk?",
        choices: [
            { id: 1, label: "Biologi" },
            { id: 2, label: "Fysikk" },
            { id: 3, label: "Sosiologi" },
            { id: 4, label: "Geografi" },
        ],
        correctAnswer: 3,
    },
    {
        question: "Hva er sveising?",
        choices: [
            { id: 1, label: "Kutte metall" },
            { id: 2, label: "Polere metall" },
            { id: 3, label: "Male metall" },
            { id: 4, label: "Smelte sammen materialer" },
        ],
        correctAnswer: 4,
    },
    {
        question: "Hva gjør en sikring i et elektrisk anlegg?",
        choices: [
            { id: 1, label: "Øker spenningen" },
            { id: 2, label: "Lagrer strøm" },
            { id: 3, label: "Stopper strømmen hvis den blir for høy" },
            { id: 4, label: "Lager elektrisk energi" },
        ],
        correctAnswer: 3,
    },
    {
        question: "Hva står HLR for?",
        choices: [
            { id: 1, label: "Helse-lege-rutine" },
            { id: 2, label: "Hjelp-liv-redning" },
            { id: 3, label: "Hjerte-liv-reaksjon" },
            { id: 4, label: "Hjerte-lungeredning" },
        ],
        correctAnswer: 4,
    },
    {
        question: "Hva betyr HTML?",
        choices: [
            { id: 1, label: "HighText Machine Language" },
            { id: 2, label: "HyperText Markup Language" },
            { id: 3, label: "Hyper Transfer Media Link" },
            { id: 4, label: "Home Tool Markup Language" },
        ],
        correctAnswer: 2,
    },
    {
        question: "Hvem er Norges konge?",
        choices: [
            { id: 1, label: "Olav V" },
            { id: 2, label: "Haakon VII" },
            { id: 3, label: "Frederik X" },
            { id: 4, label: "Harald V" },
        ],
        correctAnswer: 4,
    },
    {
        question: "Hva er en målgruppe i salg?",
        choices: [
            { id: 1, label: "Alle mennesker" },
            { id: 2, label: "Kundene produktet er laget for" },
            { id: 3, label: "Bare ungdom" },
            { id: 4, label: "Bare turister" },
        ],
        correctAnswer: 2,
    },
    {
        question: "Hva er kunstig intelligens?",
        choices: [
            { id: 1, label: "En type maskinvare" },
            { id: 2, label: "En nettside" },
            { id: 3, label: "Datamaskiner som kan lære og ta beslutninger" },
            { id: 4, label: "En database" },
        ],
        correctAnswer: 3,
    },
    {
        question: "Hva betyr demokrati?",
        choices: [
            { id: 1, label: "At én person bestemmer alt" },
            { id: 2, label: "At folket har makt til å påvirke beslutninger" },
            { id: 3, label: "At lærere bestemmer alt" },
            { id: 4, label: "At ingen bestemmer" },
        ],
        correctAnswer: 2,
    },
    {
        question: "Videospørsmål 1: I kantinen er det en storkjøkken oppvaskmaskin, hvordan skal man vaske opp assieter før man putter de inn i oppvaskemaskinen?",
        video: "../Video/FerdigKantineFilm.mp4",
        choices: [
            { id: 1, label: "Null Såpe" },
            { id: 2, label: "Masse Såpe" },
            { id: 3, label: "En dråpe" },
            { id: 4, label: "Kaste asieten" },
        ],
        correctAnswer: 1,
    },
];

const quizApp = document.getElementById("quiz-app");
const leaderboardStorageKey = "bleikerLeaderboard";
const currentUserStorageKey = "bleikerCurrentUser";

let chosenAnswer = false;
let feedback = document.getElementById("feedback");
let count = 0;
let totalScore = 0;
let highScore = getHighScore();

if (quizApp) {
    loadQuiz();
}

function loadQuiz() {
    updateHighScoreDisplay();
    renderQuestion(quiz[count]);
}

function renderQuestion(questionData) {
    const h2 = document.getElementById("question");
    const buttonsContainer = document.getElementById("buttons");
    const videoContainer = document.getElementById("video");
    const progress = document.getElementById("quiz-progress");

    h2.textContent = questionData.question;
    buttonsContainer.innerHTML = "";

    if (progress) {
        progress.textContent = `Spørmål ${count + 1} av ${quiz.length}`;
    }

    if (questionData.video) {
        videoContainer.style.display = "flex";
        videoContainer.innerHTML = `<video width="500" height="400" controls>
<source src="${questionData.video}" type="video/mp4">
Your browser does not support the video tag.
</video>`;
    } else {
        videoContainer.style.display = "none";
        videoContainer.innerHTML = "";
    }

    questionData.choices.forEach((button) => {
        buttonsContainer.innerHTML += `<button id="${button.id}" onclick="checkAnswer(${button.id},${questionData.correctAnswer})">${button.label}</button>`;
    });
}

function checkAnswer(buttonId, correctAnswer) {
    if (chosenAnswer) {
        return;
    }

    count++;

    const isCorrect = buttonId === correctAnswer;

    if (isCorrect) {
        chosenAnswer = true;
        document.getElementById(buttonId).classList.add("correct");
        feedback.textContent = "Du hadde riktig!";
        totalScore++;
        if (totalScore > highScore) {
            highScore = totalScore;
            updateHighScoreDisplay();
        }
    } else {
        chosenAnswer = true;
        document.getElementById(buttonId).classList.add("wrong");
        feedback.textContent = "Du tok feil!";
    }

    if (chosenAnswer) {
        const nextButton = document.getElementById("next");
        nextButton.innerHTML = `<button onclick="nextQuestion()">Next</button>`;
    }
}

function nextQuestion() {
    const nextElement = quiz[count];
    const nextButton = document.getElementById("next");

    chosenAnswer = false;

    if (count < quiz.length) {
        feedback.textContent = "";
        nextButton.innerHTML = "";
        renderQuestion(nextElement);
    } else {
        const summaryContainer = document.getElementById("summary");
        const questionContainer = document.getElementById("questionContainer");
        const totalScoreContainer = document.getElementById("totalScore");

        saveScore();
        renderLeaderboard();
        highScore = getHighScore();
        updateHighScoreDisplay();

        summaryContainer.style.display = "flex";
        questionContainer.style.display = "none";
        totalScoreContainer.textContent = `Din totalscore: ${totalScore} av ${quiz.length}. High score: ${highScore} av ${quiz.length}`;
    }
}

function saveScore() {
    const leaderboard = getLeaderboard();
    const username = localStorage.getItem(currentUserStorageKey);

    leaderboard.push({
        name: username || "Anonym",
        score: totalScore,
        totalQuestions: quiz.length,
        createdAt: Date.now(),
    });

    leaderboard.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }

        return a.createdAt - b.createdAt;
    });

    localStorage.setItem(leaderboardStorageKey, JSON.stringify(leaderboard.slice(0, 5)));
}

function getLeaderboard() {
    const savedLeaderboard = localStorage.getItem(leaderboardStorageKey);

    if (!savedLeaderboard) {
        return [];
    }

    try {
        const parsedLeaderboard = JSON.parse(savedLeaderboard);
        return Array.isArray(parsedLeaderboard) ? parsedLeaderboard : [];
    } catch (error) {
        return [];
    }
}

function renderLeaderboard() {
    const leaderboardList = document.getElementById("leaderboardList");
    const leaderboard = getLeaderboard();

    if (!leaderboardList) {
        return;
    }

    leaderboardList.innerHTML = "";

    leaderboard.forEach((entry) => {
        leaderboardList.innerHTML += `<li><span>${entry.name}</span><strong>${entry.score}/${entry.totalQuestions}</strong></li>`;
    });
}

function getHighScore() {
    const leaderboard = getLeaderboard();

    if (leaderboard.length === 0) {
        return 0;
    }

    return leaderboard[0].score;
}

function updateHighScoreDisplay() {
    const scoreElement = document.getElementById("quiz-score");

    if (scoreElement) {
        scoreElement.textContent = `High score: ${highScore}`;
    }
}
