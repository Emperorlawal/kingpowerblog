document.addEventListener('DOMContentLoaded', () => {
    // Quiz data
    const questions = [
        {
            question: "How do you prefer to start your day in 2025?",
            options: [
                { text: "With a minimalist morning routine", points: { minimalist: 2 } },
                { text: "A high-energy workout", points: { fitness: 2 } },
                { text: "Meditating or journaling", points: { wellness: 2 } },
                { text: "Creating art or writing", points: { creative: 2 } }
            ]
        },
        {
            question: "What’s your ideal weekend activity?",
            options: [
                { text: "Decluttering my space", points: { minimalist: 2 } },
                { text: "Hiking or playing sports", points: { fitness: 2 } },
                { text: "A wellness retreat or spa day", points: { wellness: 2 } },
                { text: "Visiting an art gallery or concert", points: { creative: 2 } }
            ]
        },
        {
            question: "What’s your approach to shopping in 2025?",
            options: [
                { text: "Buy only what I need", points: { minimalist: 2 } },
                { text: "Gear for fitness goals", points: { fitness: 2 } },
                { text: "Eco-friendly wellness products", points: { wellness: 2 } },
                { text: "Unique, creative items", points: { creative: 2 } }
            ]
        },
        {
            question: "What inspires you most this year?",
            options: [
                { text: "Simplicity and clarity", points: { minimalist: 2 } },
                { text: "Physical challenges", points: { fitness: 2 } },
                { text: "Inner peace and balance", points: { wellness: 2 } },
                { text: "Artistic expression", points: { creative: 2 } }
            ]
        },
        {
            question: "What’s your dream 2025 goal?",
            options: [
                { text: "Live with less", points: { minimalist: 2 } },
                { text: "Run a marathon", points: { fitness: 2 } },
                { text: "Master mindfulness", points: { wellness: 2 } },
                { text: "Create a masterpiece", points: { creative: 2 } }
            ]
        }
    ];

    const results = {
        minimalist: {
            title: "Minimalist Maven",
            description: "You thrive on simplicity and intentionality. In 2025, your focus on decluttering and prioritizing what matters will create a calm, purposeful life.",
            image: "https://via.placeholder.com/300x200?text=Minimalist",
            relatedPost: { text: "Read Minimalist Living Tips", url: "minimalist-living.html" }
        },
        fitness: {
            title: "Fitness Fanatic",
            description: "Your energy and drive push you to conquer physical goals. 2025 is your year to hit new fitness milestones and inspire others.",
            image: "https://via.placeholder.com/300x200?text=Fitness",
            relatedPost: { text: "Explore Fitness Goals", url: "#" }
        },
        wellness: {
            title: "Wellness Wanderer",
            description: "You seek balance and inner peace. In 2025, your journey toward mindfulness and wellness will bring harmony to your life.",
            image: "https://via.placeholder.com/300x200?text=Wellness",
            relatedPost: { text: "Discover Mindful Eating", url: "#" }
        },
        creative: {
            title: "Creative Connoisseur",
            description: "Your imagination knows no bounds. 2025 will be a year of artistic exploration and bold creative projects.",
            image: "https://via.placeholder.com/300x200?text=Creative",
            relatedPost: { text: "Read Lifestyle Tips", url: "lifestyle.html" }
        }
    };

    // Quiz logic
    let currentQuestionIndex = 0;
    let scores = { minimalist: 0, fitness: 0, wellness: 0, creative: 0 };
    const totalQuestions = 4; // Show 4 random questions
    let selectedQuestions = [];

    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const nextButton = document.getElementById('next-button');
    const quizContainer = document.getElementById('quiz-container');
    const resultsElement = document.getElementById('results');
    const resultTextElement = document.getElementById('result-text');
    const resultImageElement = document.getElementById('result-image');
    const relatedPostElement = document.getElementById('related-post');
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
            'event_label': 'Lifestyle Personality Quiz',
            'page_path': window.location.pathname
        });

        currentQuestionIndex = 0;
        scores = { minimalist: 0, fitness: 0, wellness: 0, creative: 0 };
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
        document.querySelectorAll('.option').forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        nextButton.disabled = false;

        // Update scores
        for (let key in option.points) {
            scores[key] += option.points[key];
        }
    }

    function showResults() {
        quizContainer.style.display = 'none';
        resultsElement.style.display = 'block';

        // Determine highest score
        let maxScore = 0;
        let personality = 'minimalist';
        for (let key in scores) {
            if (scores[key] > maxScore) {
                maxScore = scores[key];
                personality = key;
            }
        }

        const result = results[personality];
        resultTextElement.innerHTML = `<strong>${result.title}</strong><p>${result.description}</p>`;
        resultImageElement.innerHTML = `<img src="${result.image}" alt="${result.title}" loading="lazy">`;
        relatedPostElement.textContent = result.relatedPost.text;
        relatedPostElement.href = result.relatedPost.url;

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
        const url = `https://twitter.com/intent/tweet?text=I'm a ${resultTitle} in 2025! Find out your lifestyle personality: ${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
        gtag('event', 'share', {
            'event_category': 'Social',
            'event_label': 'X',
            'page_path': window.location.pathname
        });
    };

    window.shareToFacebook = function() {
        const resultTitle = document.querySelector('#result-text strong').textContent;
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=I'm a ${resultTitle} in 2025!`;
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