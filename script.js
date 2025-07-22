document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio page loaded!');
    
    // Initialize all features
    initializeTheme();
    initializeNavigation();
    initializeMobileMenu();
    initializeResumeGenerator();
    initializeFormValidation();
    initializeBlog();
    initializeSmoothScrolling();
    initializeModals();
    initializeProfilePhoto();
    initializeSkipLink();
    initializeProjectFiltering();
    initializeScrollAnimations();
    initializeBackgroundAnimation();
    
    console.log('All portfolio features initialized successfully!');
});

// Simple Background Animation
function initializeBackgroundAnimation() {
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
            particlesContainer.appendChild(particle);
        }
    }
}

// Project Filtering
function initializeProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
            
            console.log('Projects filtered by:', filter);
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                if (entry.target.classList.contains('skill-item')) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    if (progressBar) {
                        const width = progressBar.style.width;
                        progressBar.style.width = '0%';
                        setTimeout(() => {
                            progressBar.style.width = width;
                        }, 200);
                    }
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.main-content section, .skill-item, .achievement-card, .blog-post').forEach(el => {
        observer.observe(el);
    });
}

// Theme Toggle
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            document.body.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                document.body.style.transition = '';
            }, 300);
            
            console.log('Theme switched to:', newTheme);
        });
    }
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('main-nav');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            
            mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('open');
            
            console.log('Mobile menu toggled:', !isExpanded);
        });
        
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('open');
            });
        });
        
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('open');
            }
        });
    }
}

// Resume Generator
function initializeResumeGenerator() {
    const generateBtn = document.getElementById('generate-resume');
    
    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            generateResume();
        });
    }
}

function generateResume() {
    const btn = document.getElementById('generate-resume');
    btn.classList.add('loading');
    btn.disabled = true;
    
    console.log('Generating resume...');
    
    setTimeout(() => {
        const resumeContent = createResumeContent();
        downloadResume(resumeContent);
        
        btn.classList.remove('loading');
        btn.disabled = false;
        
        showMessage('Resume generated successfully!', 'success');
        console.log('Resume generated and downloaded');
    }, 2000);
}

function createResumeContent() {
    const currentDate = new Date().toLocaleDateString();
    
    return `KRISHNA - COMPUTER SCIENCE STUDENT & DEVELOPER
Generated on: ${currentDate}
Email: krishna1kunal239@gmail.com

═══════════════════════════════════════════════════════════════

EDUCATION
─────────────────────────────────────────────────────────────
B.Tech in Computer Science Engineering
Bihar Engineering College (GEC Banka)
Current Semester: 3rd | CGPA: 8.0/10.0

TECHNICAL SKILLS
─────────────────────────────────────────────────────────────
Programming Languages:
• C Language (Expert) - Advanced proficiency
• Python - Data structures and algorithms
• C++ (Intermediate) - Object-oriented programming
• JavaScript - Web development and API integration

Technologies:
• Web Development: HTML5, CSS3, JavaScript, Responsive Design
• Database: MySQL, File Handling Systems
• Data Structures & Algorithms
• Software Development Life Cycle

PROJECTS
─────────────────────────────────────────────────────────────
1. Student Record System | C++, File Handling
   • Comprehensive CRUD application for student data management
   • Implemented efficient file handling and data validation
   • Technologies: C++, File I/O, Data Structures, OOP

2. Library Management System | Java, MySQL
   • Full-stack application for library resource management
   • Database-driven system with GUI interface
   • Technologies: Java, MySQL, JDBC, Swing

3. Personal Portfolio Website | HTML, CSS, JavaScript
   • Modern, responsive portfolio showcasing skills and projects
   • Interactive design with dark/light theme toggle
   • Technologies: HTML5, CSS3, JavaScript, Responsive Design

4. Weather Application | JavaScript, API Integration
   • Real-time weather application using OpenWeatherMap API
   • Dynamic UI with location-based weather detection
   • Technologies: JavaScript, REST API, CSS3, HTML5

ACHIEVEMENTS
─────────────────────────────────────────────────────────────
🏆 First Prize Winner - Tech Hackathon 2024
   • Won first place for "Sustainable Shopping Assistant" project

🥇 Top 5% Performer - Machine Learning Hackathon 2024
   • Ranked in top 5% out of 500 participants

🎓 Academic Excellence Award
   • Maintaining CGPA of 8.0 throughout college journey

💻 Code-a-thon 2024 Participant
   • Participated in prestigious national coding competition

SOFT SKILLS
─────────────────────────────────────────────────────────────
• Team Collaboration & Leadership
• Effective Communication (English - Fluent, Hindi - Native)
• Time Management & Project Planning
• Critical Thinking & Problem Analysis
• Adaptability & Continuous Learning

CURRENT FOCUS
─────────────────────────────────────────────────────────────
• GATE Exam Preparation (Graduate Aptitude Test in Engineering)
• Advanced Data Structures & Algorithms
• Full-Stack Web Development
• Competitive Programming

═══════════════════════════════════════════════════════════════
Contact: krishna1kunal239@gmail.com
═══════════════════════════════════════════════════════════════`;
}

function downloadResume(content) {
    const blob = new Blob([content], { type: 'text/plain; charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Krishna_Resume_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Form Validation
function initializeFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            handleFormSubmission();
        }
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    
    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    if (fieldName === 'name' && value) {
        if (value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long';
        }
    }
    
    if (fieldName === 'message' && value) {
        if (value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        }
    }
    
    showFieldError(field, errorMessage, isValid);
    return isValid;
}

function showFieldError(field, message, isValid) {
    const errorElement = document.getElementById(`${field.name}-error`);
    
    if (errorElement) {
        if (isValid) {
            field.classList.remove('error');
            field.classList.add('success');
            errorElement.textContent = '';
        } else {
            field.classList.remove('success');
            field.classList.add('error');
            errorElement.textContent = message;
        }
    }
}

function clearFieldError(field) {
    if (field.classList.contains('error')) {
        field.classList.remove('error');
        const errorElement = document.getElementById(`${field.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
}

function validateForm() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isFormValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });
    
    return isFormValid;
}

function handleFormSubmission() {
    const submitBtn = document.getElementById('submit-btn');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject') ? document.getElementById('subject').value : 'Portfolio Contact';
    const message = document.getElementById('message').value;
    
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    console.log('Submitting form...');
    
    setTimeout(() => {
        const mailto = `mailto:krishna1kunal239@gmail.com?subject=${encodeURIComponent(subject)} - ${encodeURIComponent(name)}&body=Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0AMessage:%0A${encodeURIComponent(message)}`;
        window.location.href = mailto;
        
        showMessage('Message sent successfully! Your email client should open shortly.', 'success');
        document.getElementById('contact-form').reset();
        
        document.querySelectorAll('.success').forEach(el => el.classList.remove('success'));
        
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        console.log('Form submitted successfully');
    }, 1500);
}

function showMessage(message, type) {
    const messageContainer = document.getElementById('form-messages');
    if (messageContainer) {
        messageContainer.textContent = message;
        messageContainer.className = `form-messages ${type}`;
        
        setTimeout(() => {
            messageContainer.className = 'form-messages';
        }, 5000);
    }
}

// Blog Functionality
function initializeBlog() {
    const addPostBtn = document.getElementById('add-blog-post');
    
    if (addPostBtn) {
        addPostBtn.addEventListener('click', function() {
            addNewBlogPost();
        });
    }
}

function addNewBlogPost() {
    const title = prompt('Enter blog post title:');
    if (!title) return;
    
    const content = prompt('Enter blog post content:');
    if (!content) return;
    
    const blogPosts = document.getElementById('blog-posts');
    if (!blogPosts) return;
    
    const newPost = document.createElement('article');
    newPost.className = 'blog-post';
    
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const readTime = Math.max(1, Math.ceil(content.split(' ').length / 200));
    
    newPost.innerHTML = `
        <div class="blog-image">
            <div class="blog-icon">📝</div>
        </div>
        <div class="blog-content">
            <h3>${title}</h3>
            <p class="blog-meta">Published on <time datetime="${new Date().toISOString().split('T')[0]}">${currentDate}</time> • ${readTime} min read</p>
            <p>${content}</p>
            <div class="blog-tags">
                <span class="blog-tag">New Post</span>
            </div>
            <a href="#" class="read-more" aria-label="Read full article about ${title}">Read More →</a>
        </div>
    `;
    
    blogPosts.insertBefore(newPost, blogPosts.firstChild);
    
    newPost.style.opacity = '0';
    newPost.style.transform = 'translateY(20px)';
    setTimeout(() => {
        newPost.style.transition = 'all 0.3s ease';
        newPost.style.opacity = '1';
        newPost.style.transform = 'translateY(0)';
    }, 100);
    
    showMessage('Blog post added successfully!', 'success');
    console.log('New blog post added:', title);
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                console.log('Scrolled to section:', targetId);
            }
        });
    });
    
    function updateActiveNavigation() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNavigation();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll);
    updateActiveNavigation();
}

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach((link, index) => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = (index + 1) % navLinks.length;
                navLinks[nextIndex].focus();
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = (index - 1 + navLinks.length) % navLinks.length;
                navLinks[prevIndex].focus();
            }
        });
    });
}

// Project Modals
function initializeModals() {
    const viewMoreButtons = document.querySelectorAll('.view-more');
    const modals = document.querySelectorAll('.modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');

    viewMoreButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('show');
                modal.setAttribute('aria-hidden', 'false');
                
                const closeBtn = modal.querySelector('.close-modal');
                if (closeBtn) closeBtn.focus();
                
                console.log('Modal opened:', modalId);
            }
        });
    });

    closeModalButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = btn.closest('.modal');
            closeModal(modal);
        });
        
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const modal = btn.closest('.modal');
                closeModal(modal);
            }
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
        
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal(modal);
            }
        });
    });

    function closeModal(modal) {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        
        const modalId = modal.id;
        const triggerBtn = document.querySelector(`[data-modal="${modalId}"]`);
        if (triggerBtn) triggerBtn.focus();
        
        console.log('Modal closed:', modalId);
    }
}

// Profile Photo Modal
function initializeProfilePhoto() {
    const profileImg = document.getElementById('profile-img');
    const profileModal = document.getElementById('profile-modal');
    
    if (profileImg && profileModal) {
        profileImg.addEventListener('click', function() {
            profileModal.classList.add('show');
            profileModal.setAttribute('aria-hidden', 'false');
            
            const closeBtn = profileModal.querySelector('.close-modal');
            if (closeBtn) closeBtn.focus();
            
            console.log('Profile photo modal opened');
        });
        
        profileImg.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                profileModal.classList.add('show');
                profileModal.setAttribute('aria-hidden', 'false');
                
                const closeBtn = profileModal.querySelector('.close-modal');
                if (closeBtn) closeBtn.focus();
            }
        });
        
        const closeBtn = profileModal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                profileModal.classList.remove('show');
                profileModal.setAttribute('aria-hidden', 'true');
                profileImg.focus();
            });
        }
        
        profileModal.addEventListener('click', function(e) {
            if (e.target === profileModal) {
                profileModal.classList.remove('show');
                profileModal.setAttribute('aria-hidden', 'true');
                profileImg.focus();
            }
        });
    }
}

// Initialize Skip Link
function initializeSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Resource loading error:', e);
    
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        console.log('Image failed to load:', e.target.src);
    }
});

// Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            openModal.classList.remove('show');
        }
    }
    
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.click();
        }
    }
});