// Navigation smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add fade-in animation to sections on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all main sections
document.querySelectorAll('main section').forEach(section => {
    observer.observe(section);
});

// CTA button click handler
document.querySelector('.cta-button').addEventListener('click', function() {
    // Simple alert for demo - in real implementation this would open a signup form or modal
    alert('🎉 Thank you for your interest!\n\nFree introductory modules and newsletter signup coming soon!\n\nContact: info@avibrat-learning.com');

    // You could also scroll to contact section or open a modal
    // document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
});

// Add some interactive features to resource links
document.querySelectorAll('.resource-category a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
    });

    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// Add click tracking for resources (for analytics)
document.querySelectorAll('.resource-category a').forEach(link => {
    link.addEventListener('click', function() {
        // In a real implementation, this would send data to analytics
        console.log('Resource clicked:', this.textContent, this.href);
    });
});

// Simple quiz functionality (just for demonstration)
function initQuiz() {
    // This is a placeholder for future quiz functionality
    // Could add quick assessment quizzes for different skills
    console.log('Quiz system ready for implementation');
}

// Mobile navigation toggle (for future hamburger menu)
function initMobileNav() {
    // Placeholder for mobile navigation
    // When nav-links are hidden on mobile, add a hamburger menu
    if (window.innerWidth <= 768) {
        // Could implement hamburger menu here
        console.log('Mobile navigation ready for implementation');
    }
}

// Progress tracking placeholder (for future learning management system)
function initProgressTracking() {
    // Placeholder for tracking user progress through curriculum
    console.log('Progress tracking system ready for implementation');

    // Could store progress in localStorage
    // let progress = JSON.parse(localStorage.getItem('avibrat-progress')) || {};
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initInterviewPrep();
    initMobileNav();
    initProgressTracking();

    // Mark the page as loaded
    document.body.classList.add('loaded');
});

// Window resize handling
window.addEventListener('resize', function() {
    initMobileNav(); // Reinitialize mobile nav on resize
});

// Add some dynamic content based on scroll position
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add/remove sticky navigation effects
    const header = document.querySelector('header');
    if (scrollTop > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }

    lastScrollTop = scrollTop;
});

// Add loading animation for sections
function animateOnScroll() {
    const elements = document.querySelectorAll('.role-card, .track, .resource-category, .strategy');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;

        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animated elements
document.querySelectorAll('.role-card, .track, .resource-category, .strategy').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Animate on scroll
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Add a simple typing effect to the hero section (optional)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Uncomment to add typing effect to hero title
// const heroTitle = document.querySelector('.hero-content h2');
// typeWriter(heroTitle, 'Welcome to AI FOR ALL QA Learning Portal');

// Interview Preparation Functionality
function initInterviewPrep() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));

            // Show the corresponding tab content
            const tabId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Quiz functionality
    initQuiz();
}

// Quiz Implementation
let currentQuestionIndex = 0;
let score = 0;
let quizQuestions = [];

function initQuiz() {
    quizQuestions = generateQuizQuestions();

    // Set up quiz event listeners
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    document.getElementById('prev-btn').addEventListener('click', prevQuestion);
    document.getElementById('submit-btn').addEventListener('click', submitQuiz);

    // Start the quiz
    loadQuestion(0);
}

function generateQuizQuestions() {
    return [
        {
            question: "What is the main difference between Selenium WebDriver and Selenium RC?",
            options: [
                "RC is faster than WebDriver",
                "WebDriver uses native browser APIs while RC uses JavaScript injection",
                "RC supports more browsers than WebDriver",
                "WebDriver requires a server while RC doesn't"
            ],
            correct: 1,
            explanation: "WebDriver communicates directly with browsers using native APIs, making it faster and more reliable. RC injects JavaScript into browsers and is deprecated."
        },
        {
            question: "Which of these is NOT a challenge when testing AI systems?",
            options: [
                "Model training time",
                "Non-deterministic outputs",
                "Black box decision logic",
                "Static test data requirements"
            ],
            correct: 3,
            explanation: "AI testing challenges include non-deterministic outputs, complexity of testing edge cases, understanding model logic, and continuous learning. Static test data is actually beneficial for testing AI systems."
        },
        {
            question: "What does POM stand for in test automation?",
            options: [
                "Page Object Model",
                "Process Outcome Methodology",
                "Python Object Management",
                "Performance Optimization Method"
            ],
            correct: 0,
            explanation: "POM is the Page Object Model design pattern that creates object repositories for web UI elements, improving maintainability and reducing code duplication."
        },
        {
            question: "What is model drift in AI systems?",
            options: [
                "When models learn too quickly",
                "When real-world data differs from training data",
                "When model accuracy surpasses expectations",
                "When models require more computational resources"
            ],
            correct: 1,
            explanation: "Model drift occurs when the data the AI model encounters in production differs significantly from the training data, causing performance degradation."
        },
        {
            question: "Which of these is NOT a security concern for AI systems?",
            options: [
                "Prompt injection attacks",
                "Adversarial inputs",
                "Data encryption failures",
                "Static user interface elements"
            ],
            correct: 3,
            explanation: "AI security concerns include prompt injection, adversarial inputs that fool models, and data protections. Static UI elements are not typically a security issue."
        },
        {
            question: "What is the purpose of A/B testing in AI systems?",
            options: [
                "Testing different programming languages",
                "Comparing performance of different model versions",
                "Testing browser compatibility",
                "Validating database connections"
            ],
            correct: 1,
            explanation: "A/B testing in AI compares different model versions or configurations in production to determine which performs better, ensuring optimal user experience."
        },
        {
            question: "Which testing approach is best for AI bias detection?",
            options: [
                "Unit testing only",
                "Diverse dataset testing with demographic analysis",
                "Performance testing under load",
                "Browser compatibility testing"
            ],
            correct: 1,
            explanation: "AI bias detection requires testing with diverse datasets representing different demographics and analyzing results for unfair patterns across protected groups."
        },
        {
            question: "What is the main benefit of using ROUGE/BLEU metrics?",
            options: [
                "Measuring code execution speed",
                "Evaluating natural language generation quality",
                "Testing database query performance",
                "Monitoring network latency"
            ],
            correct: 1,
            explanation: "ROUGE and BLEU are metrics used to evaluate the quality of machine-generated text by comparing it with reference texts, crucial for assessing language model performance."
        },
        {
            question: "Which tool would you use for automated prompt testing?",
            options: [
                "JMeter only",
                "LangChain evaluation framework",
                "Database query analyzer",
                "Basic Python print statements"
            ],
            correct: 1,
            explanation: "LangChain provides evaluation frameworks specifically designed for testing and comparing different prompt strategies and LLM interactions."
        },
        {
            question: "What is chain-of-thought prompting used for?",
            options: [
                "Creating graphical user interfaces",
                "Breaking complex reasoning into intermediate steps",
                "Optimizing database queries",
                "Rendering 3D graphics"
            ],
            correct: 1,
            explanation: "Chain-of-thought prompting helps AI models break down complex reasoning problems into intermediate steps, improving accuracy on math, logic, and analytical tasks."
        }
    ];
}

function loadQuestion(index) {
    const question = quizQuestions[index];
    if (!question) return;

    // Update question
    document.getElementById('question').textContent = question.question;

    // Clear previous options
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    // Add new options
    question.options.forEach((option, optionIndex) => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option-btn';
        optionBtn.textContent = option;
        optionBtn.onclick = () => selectOption(optionIndex);
        optionsContainer.appendChild(optionBtn);
    });

    // Update progress
    document.getElementById('progress').textContent = `${index + 1} / ${quizQuestions.length}`;

    // Update navigation buttons
    document.getElementById('prev-btn').disabled = index === 0;
    document.getElementById('next-btn').style.display = index === quizQuestions.length - 1 ? 'none' : 'inline-block';
    document.getElementById('submit-btn').style.display = index === quizQuestions.length - 1 ? 'inline-block' : 'none';
}

function selectOption(optionIndex) {
    // Remove selected class from all options
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Add selected class to clicked option
    event.target.classList.add('selected');

    // Store the selection
    quizQuestions[currentQuestionIndex].userAnswer = optionIndex;
}

function nextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion(currentQuestionIndex);
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion(currentQuestionIndex);
    }
}

function submitQuiz() {
    // Calculate score
    score = quizQuestions.reduce((total, q) => {
        return total + (q.userAnswer === q.correct ? 1 : 0);
    }, 0);

    const percentage = Math.round((score / quizQuestions.length) * 100);

    // Show results
    document.getElementById('quiz-container').style.display = 'none';
    const resultsDiv = document.getElementById('results');
    resultsDiv.style.display = 'block';

    document.getElementById('score-percentage').textContent = `${percentage}%`;
    document.getElementById('score-text').textContent = `You got ${score} out of ${quizQuestions.length} questions correct`;

    // Generate feedback
    const feedback = generateFeedback(score, quizQuestions.length);
    document.getElementById('feedback').innerHTML = feedback;
}

function generateFeedback(correct, total) {
    const percentage = (correct / total) * 100;

    if (percentage >= 80) {
        return `
            <p><strong>🎉 Excellent! You're well-prepared for QA and AI interviews.</strong></p>
            <p>You demonstrate strong knowledge across automation testing, AI system testing, and modern development practices.</p>
            <ul>
                <li>✅ Solid understanding of Selenium and test automation frameworks</li>
                <li>✅ Good grasp of AI testing challenges and methodologies</li>
                <li>✅ Familiarity with modern testing tools and best practices</li>
            </ul>
            <p><strong>Next steps:</strong> Consider focusing on hands-on projects and advanced AI testing scenarios.</p>
        `;
    } else if (percentage >= 60) {
        return `
            <p><strong>👍 Good progress! You have a solid foundation but room for improvement.</strong></p>
            <p>You understand core concepts but may benefit from more hands-on experience.</p>
            <ul>
                <li>⚠️ Review questions you got wrong and study those areas more</li>
                <li>🔄 Practice with real testing frameworks and tools</li>
                <li>📖 Consider taking our recommended courses for deeper understanding</li>
            </ul>
            <p><strong>Recommended focus areas:</strong> AI bias testing, model monitoring, and prompt engineering.</p>
        `;
    } else {
        return `
            <p><strong>📚 Keep learning! You have potential but need more foundational knowledge.</strong></p>
            <p>Start with the basics and build confidence through practice.</p>
            <ul>
                <li>📖 Begin with our Python & Programming resources</li>
                <li>🧪 Learn Selenium and test automation fundamentals</li>
                <li>📋 practice our recommended courses and tutorials</li>
                <li>🎯 Focus on understanding core testing principles before advanced AI topics</li>
            </ul>
            <p><strong>Start with:</strong> Python basics, Selenium WebDriver, and then move to AI testing concepts.</p>
        `;
    }
}

function restartQuiz() {
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;

    // Clear previous answers
    quizQuestions.forEach(q => delete q.userAnswer);

    // Reset UI
    document.getElementById('results').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';

    // Reload first question
    loadQuestion(0);
}
