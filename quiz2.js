document.addEventListener('DOMContentLoaded', () => {
    // Quiz data
    const questions = [
        {
            question: "What is a key feature of multimodal AI in 2025?",
            options: [
                { text: "Processing only text data", correct: false },
                { text: "Handling text, images, and audio together", correct: true },
                { text: "Running on quantum computers only", correct: false },
                { text: "Limiting user interactions", correct: false }
            ]
        },
        {
            question: "How is AI improving healthcare in 2025?",
            options: [
                { text: "By replacing all doctors", correct: false },
                { text: "Through early disease detection", correct: true },
                { text: "By reducing medical research", correct: false },
                { text: "By ignoring patient data", correct: false }
            ]
        },
        {
            question: "What is a focus of ethical AI frameworks in 2025?",
            options: [
                { text: "Increasing bias in algorithms", correct: false },
                { text: "Enhancing transparency", correct: true },
                { text: "Ignoring user privacy", correct: false },
                { text: "Slowing AI development", correct: false }
            ]
        },
        {
            question: "Which field benefits from quantum AI in 2025?",
            options: [
                { text: "Complex simulations", correct: true },
                { text: "Manual data entry", correct: false },
                { text: "Traditional computing", correct: false },
                { text: "Basic arithmetic", correct: false }
            ]
        },
        {
            question: "What is an application of autonomous AI systems in 2025?",
            options: [
                { text: "Writing novels", correct: false },
                { text: "Self-driving cars", correct: true },
                { text: "Cooking recipes", correct: false },
                { text: "Painting portraits", correct: false }
            ]
        }
    ];

    const results = [
        {
            scoreRange: [0, 1],
            title: "AI Novice",
            description: "You’re just starting your AI journey. Learn more about 2025’s innovations to level up!",
            image: "https://via.placeholder.com/300x200?text=AI+Novice"
        },
        {
            scoreRange: [2, 3],
            title: "Tech Enthusiast",
            description: "Great job! You understand AI’s potential, but there’s more to explore in 2025.",
            image: "https://via.placeholder.com/300x200?text=Tech+Enthusiast"
        },
        {
            scoreRange: [4, 4],
            title: "AI Expert",
            description: "You’re an AI guru! Your knowledge of 2025’s breakthroughs is top-notch.",
            image: "https://via.placeholder.com/300x200?text=AI+Expert"
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
            'event_label': 'AI Expertise Quiz',
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
        const url = `https://twitter.com/intent/tweet?text=I'm a ${resultTitle} with a score of ${score}/4 in the AI Expertise Quiz! Try it: ${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
        gtag('event', 'share', {
            'event_category': 'Social',
            'event_label': 'X',
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