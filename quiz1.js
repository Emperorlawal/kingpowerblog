document.addEventListener('DOMContentLoaded', () => {
    // Quiz data
    const questions = [
        {
            question: "Which country won the 2022 FIFA World Cup?",
            options: [
                { text: "Brazil", correct: false },
                { text: "Argentina", correct: true },
                { text: "France", correct: false },
                { text: "Germany", correct: false }
            ]
        },
        {
            question: "Who was the top goal scorer in the 2022 FIFA World Cup?",
            options: [
                { text: "Lionel Messi", correct: false },
                { text: "Kylian Mbappé", correct: true },
                { text: "Cristiano Ronaldo", correct: false },
                { text: "Neymar", correct: false }
            ]
        },
        {
            question: "Which country hosted the 2022 FIFA World Cup?",
            options: [
                { text: "Qatar", correct: true },
                { text: "Russia", correct: false },
                { text: "Brazil", correct: false },
                { text: "South Africa", correct: false }
            ]
        },
        {
            question: "How many goals did Kylian Mbappé score in the 2022 World Cup final?",
            options: [
                { text: "One", correct: false },
                { text: "Two", correct: false },
                { text: "Three", correct: true },
                { text: "Four", correct: false }
            ]
        },
        {
            question: "Which team did Argentina defeat in the 2022 World Cup final?",
            options: [
                { text: "Brazil", correct: false },
                { text: "Germany", correct: false },
                { text: "France", correct: true },
                { text: "Spain", correct: false }
            ]
        }
    ];

    const results = [
        {
            scoreRange: [0, 1],
            title: "World Cup Rookie",
            description: "You’re just getting started with World Cup knowledge. Relive the 2022 moments to boost your skills!",
            image: "https://via.placeholder.com/300x200?text=Rookie"
        },
        {
            scoreRange: [2, 3],
            title: "World Cup Fan",
            description: "Not bad! You know your stuff, but there’s room to become a true FIFA expert.",
            image: "https://via.placeholder.com/300x200?text=Fan"
        },
        {
            scoreRange: [4, 4],
            title: "FIFA Legend",
            description: "You’re a World Cup master! Your knowledge of Qatar 2022 is unbeatable.",
            image: "https://via.placeholder.com/300x200?text=Legend"
        }
    ];

    // Quiz logic
    let currentQuestionIndex = 0;
    let score = 0;
    const totalQuestions = 4; // Show 4 random questions
    let selectedQuestions = [];

    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const nextButton = document.getElementById('next-button');
    const quizContainer = document.getElementById('quiz-container');
    const resultsElement = document.getElementById('results');
    const resultTextElement = document.getElementById('result-text');
    const resultImageElement = document.getElementById('result-image');
    const progressElement = document.querySelector('.progress');
    const restartButton = document.getElementById('restart-button');

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function startQuiz() {
        // Track quiz start in GA4
        gtag('event', 'quiz_start', {
            'event_category': 'Quiz',
            'event_label': 'FIFA World Cup 2022 Quiz',
            'page_path': window.location.pathname
        });

        currentQuestionIndex = 0;
        score = 0;
        selectedQuestions = shuffleArray([...questions]).slice(0, totalQuestions);
        resultsElement.style.display = 'none';
        quizContainer.style.display = 'block';
        nextButton.disabled = true;
        progressElement.style.width = '0%';
        loadQuestion();
    }

    function loadQuestion() {
        const question = selectedQuestions[currentQuestionIndex];
        questionElement.textContent = question.question;
        optionsElement.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('div');
            button.classList.add('option');
            button.textContent = option.text;
            button.addEventListener('click', () => selectOption(option, button));
            optionsElement.appendChild(button);
        });

        progressElement.style.width = `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`;
    }

    function selectOption(option, button) {
        document.querySelectorAll('.option').forEach(btn => {
            btn.classList.remove('selected', 'correct', 'incorrect');
            btn.style.pointerEvents = 'none';
        });

        button.classList.add(option.correct ? 'correct' : 'incorrect');
        if (option.correct) score++;

        nextButton.disabled = false;
    }

    function showResults() {
        quizContainer.style.display = 'none';
        resultsElement.style.display = 'block';

        const result = results.find(r => score >= r.scoreRange[0] && score <= r.scoreRange[1]);
        resultTextElement.innerHTML = `<strong>${result.title}</strong><p>${result.description}</p><p>Score: ${score} out of ${totalQuestions}</p>`;
        resultImageElement.innerHTML = `<img src="${result.image}" alt="${result.title}" loading="lazy">`;

        // Track quiz completion in GA4
        gtag('event', 'quiz_complete', {
            'event_category': 'Quiz',
            'event_label': result.title,
            'page_path': window.location.pathname
        });
    }

    nextButton.addEventListener('click', () => {
        if (!nextButton.disabled) {
            currentQuestionIndex++;
            if (currentQuestionIndex < totalQuestions) {
                loadQuestion();
                nextButton.disabled = true;
            } else {
                showResults();
            }
        }
    });

    restartButton.addEventListener('click', startQuiz);

    // Social sharing
    window.shareToX = function() {
        const resultTitle = document.querySelector('#result-text strong').textContent;
        const url = `https://twitter.com/intent/tweet?text=I'm a ${resultTitle} with a score of ${score}/4 in the FIFA World Cup 2022 Quiz! Try it: ${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
        gtag('event', 'share', {
            'event_category': 'Social',
            'event_label': 'twitter',
            'page_path': window.location.pathname
        });
    };

    window.shareToFacebook = function() {
        const resultTitle = document.querySelector('#result-text strong').textContent;
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=I'm a ${resultTitle} with a score of ${score}/4!`;
        window.open(url, '_blank');
        gtag('event', 'share', {
            'event_category': 'Social',
            'event_label': 'Facebook',
            'page_path': window.location.pathname
        });
    };

    window.shareToInstagram = function() {
        alert('Instagram sharing is not directly supported. Copy the link to share manually: ' + window.location.href);
        gtag('event', 'share_attempt', {
            'event_category': 'Social',
            'event_label': 'Instagram',
            'page_path': window.location.pathname
        });
    };

    window.shareToThreads = function() {
        alert('Threads sharing is not directly supported. Copy the link to share manually: ' + window.location.href);
        gtag('event', 'share_attempt', {
            'event_category': 'Social',
            'event_label': 'Threads',
            'page_path': window.location.pathname
        });
    };

    // Start the quiz
    startQuiz();
});