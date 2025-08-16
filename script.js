// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const skillLevels = document.querySelectorAll('.skill-level');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for animations
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

// Observe elements for animation
const animateElements = document.querySelectorAll('.skill-category, .project-card, .about-content, .contact-content');
animateElements.forEach(el => observer.observe(el));

// Skill level animation
function animateSkillLevels() {
    skillLevels.forEach(skill => {
        const level = skill.getAttribute('data-level');
        skill.style.setProperty('--level', level + '%');
    });
}

// Animate skill levels when skills section is visible
const skillsSection = document.querySelector('.skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillLevels();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillsObserver.observe(skillsSection);

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
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

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
    
    // Force timeline to be visible immediately
    const timelineItems = document.querySelectorAll('.enhanced-timeline .timeline-item');
    timelineItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        item.style.visibility = 'visible';
        item.classList.remove('fade-in-up');
    });
});

// Also force timeline visibility on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.enhanced-timeline .timeline-item');
    timelineItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        item.style.visibility = 'visible';
        item.classList.remove('fade-in-up');
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (hero && heroVisual) {
        const rate = scrolled * -0.5;
        heroVisual.style.transform = `translateY(${rate}px)`;
    }
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Animate counters when about section is visible
const aboutSection = document.querySelector('.about');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

aboutObserver.observe(aboutSection);

// Project Modal Functionality
const modal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.close');
const detailBtns = document.querySelectorAll('.detail-btn');

// Project data for modal
const projectData = {
    'resume-screening': {
        name: 'Resume Screening & Job Matching System',
        description: 'AI-powered system using Natural Language Processing (NLP) to automate resume screening and job matching process. This solution intelligently matches candidate resumes with job descriptions, significantly improving recruitment efficiency by reducing manual screening time by over 75%.',
        features: [
            'Automated resume parsing and analysis',
            'Intelligent job-candidate matching using NLP',
            '75% reduction in manual screening time',
            'Improved recruitment accuracy and efficiency',
            'Real-time matching algorithms'
        ],
        techStack: ['Python', 'NLP', 'Machine Learning', 'AI', 'Natural Language Processing'],
        image: 'assets/resume-screening.gif'
    },
    'koda-ai': {
        name: 'KoDa AI Chatbot System',
        description: 'Intelligent AI chatbot system capable of responding to user queries by retrieving and synthesizing information from multiple integrated data sources, including databases, APIs, and documents/files.',
        features: [
            'Multi-source data integration',
            'Intelligent query processing',
            'Real-time information retrieval',
            'Natural language understanding',
            'Seamless API integration'
        ],
        techStack: ['Python', 'AI', 'Chatbot', 'NLP', 'API Integration'],
        image: 'assets/koda-ai.png'
    },
    'customer-segmentation': {
        name: 'Customer Segmentation Dashboard',
        description: 'Customer Segmentation: Boosted active customer growth by 100% and cut man-hours by 86% using advanced dashboards and targeted WA Blast promotions.',
        features: [
            'Customer Segmentation: Boosted active customer growth by 100% and cut man-hours by 86% using advanced dashboards and targeted WA Blast promotions'
        ],
        techStack: ['Power BI', 'Data Analytics', 'Dashboard', 'Business Intelligence', 'KPI Tracking', 'Customer Segmentation'],
        image: 'assets/customer-segmentation.png'
    },
    'sales-forecasting': {
        name: 'Sales Forecasting System',
        description: 'Multivariate skforecast-based sales forecasting for stores, increasing operational productivity by 90% through realistic target-setting and data-driven decision making.',
        features: [
            'Multivariate forecasting models',
            '90% productivity improvement',
            'Realistic target setting',
            'Data-driven insights',
            'Store performance optimization'
        ],
        techStack: ['Python', 'skforecast', 'Machine Learning', 'Data Science', 'Forecasting'],
        image: 'assets/sales-forecasting.png'
    },
    'cybersecurity-ai': {
        name: 'Cybersecurity AI System',
        description: 'AI solutions to detect and prevent SQL Injection, CMDI, Path Traversal, and XSS attacks, successfully preventing over 100 attack attempts through intelligent threat detection.',
        features: [
            'SQL Injection prevention',
            'CMDI attack detection',
            'Path Traversal protection',
            'XSS attack blocking',
            '100+ attack attempts prevented'
        ],
        techStack: ['AI', 'Cybersecurity', 'Machine Learning', 'Threat Detection', 'Security'],
        image: 'assets/cybersecurity-ai.png'
    },
    'resto-recommendation': {
        name: 'Resto Recommendation System',
        description: 'Restaurant recommendation system using Content-Based & Collaborative Filtering approaches for personalized dining suggestions and enhanced user experience.',
        features: [
            'Content-based filtering',
            'Collaborative filtering',
            'Personalized recommendations',
            'User preference learning',
            'Enhanced dining experience'
        ],
        techStack: ['Python', 'Machine Learning', 'Recommendation Systems', 'Content Filtering', 'Collaborative Filtering'],
        image: 'assets/resto-recommendation.png'
    },
    'mobile-tracking': {
        name: 'Mobile People Tracking System',
        description: 'Comprehensive attendance tracking application with real-time chat, voice/video calls, location services, and route optimization, reducing fraud by 100%.',
        features: [
            'Real-time attendance tracking',
            'Voice and video calls',
            'Location-based services',
            'Route optimization',
            '100% fraud reduction'
        ],
        techStack: ['Flutter', 'Firebase', 'RTC', 'Mobile Development', 'GPS'],
        image: 'assets/mobile-tracking.png'
    },
    'gis-system': {
        name: 'General Integrated System (GIS)',
        description: 'Courier application with pickup/delivery tracking, signature capture, QR scanning, offline mode, and location tracking for logistics operations.',
        features: [
            'Pickup and delivery tracking',
            'Signature capture',
            'QR code scanning',
            'Offline mode support',
            'Real-time location tracking'
        ],
        techStack: ['Mobile App', 'GPS', 'QR Code', 'Logistics', 'Tracking'],
        image: 'assets/gis-system.png'
    }
};

// Open modal when detail button is clicked
detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const projectId = btn.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (project) {
            document.getElementById('modalTitle').textContent = project.name;
            document.getElementById('modalProjectName').textContent = project.name;
            document.getElementById('modalDescription').textContent = project.description;
            document.getElementById('modalImage').src = project.image;
            document.getElementById('modalImage').alt = `${project.name} Screenshot`;
            
            // Set features
            const featuresList = document.getElementById('modalFeatures');
            featuresList.innerHTML = '';
            project.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                featuresList.appendChild(li);
            });
            
            // Set tech stack
            const techStackDiv = document.getElementById('modalTechStack');
            techStackDiv.innerHTML = '';
            project.techStack.forEach(tech => {
                const span = document.createElement('span');
                span.textContent = tech;
                techStackDiv.appendChild(span);
            });
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal when close button is clicked
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Contact form handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please complete all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Invalid email format', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Sending message...', 'info');
        
        setTimeout(() => {
            showNotification('Message sent successfully! Thank you for contacting me.', 'success');
            contactForm.reset();
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add notification content styles
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
    `;
    
    // Add close button styles
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        transition: background-color 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.backgroundColor = 'transparent';
    });
    
    // Close notification
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Add CSS animations
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#10b981';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#3b82f6';
    }
}

// Particle effect for hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(99, 102, 241, 0.3);
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            animation: float ${duration}s infinite ${delay}s;
            pointer-events: none;
        `;
        
        hero.appendChild(particle);
    }
    
    // Add floating animation
    if (!document.querySelector('#particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
                50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize particles when page loads
window.addEventListener('load', createParticles);

// Smooth reveal animation for sections
function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        
        if (scrollY + windowHeight > sectionTop + sectionHeight * 0.3) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Initialize section reveal
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger initial reveal
    setTimeout(revealOnScroll, 100);
});

// Add scroll event listener for reveal
window.addEventListener('scroll', revealOnScroll);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loading styles if not exists
    if (!document.querySelector('#loading-styles')) {
        const style = document.createElement('style');
        style.id = 'loading-styles';
        style.textContent = `
            body:not(.loaded) {
                overflow: hidden;
            }
            body:not(.loaded)::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--gradient-primary);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            body:not(.loaded)::after {
                content: 'AI Engineer';
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: white;
                font-size: 2rem;
                font-weight: 700;
                z-index: 10001;
                animation: pulse 2s infinite;
            }
        `;
        document.head.appendChild(style);
    }
});

// Add cursor trail effect
function createCursorTrail() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--gradient-primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.7;
        transition: transform 0.1s ease;
    `;
    
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

// Initialize cursor trail on desktop
if (window.innerWidth > 768) {
    createCursorTrail();
}

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--gradient-primary);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Add tilt effect to project cards
function addTiltEffect() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
}

// Initialize tilt effect
document.addEventListener('DOMContentLoaded', addTiltEffect);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Arrow keys for navigation
    if (e.key === 'ArrowUp' && window.scrollY > 0) {
        e.preventDefault();
        window.scrollBy(0, -100);
    }
    
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        window.scrollBy(0, 100);
    }
});

// Add performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
    // Handle scroll-based animations
    revealOnScroll();
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Add service worker for offline support (basic implementation)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Add theme toggle (light/dark mode)
function createThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        transition: all 0.3s ease;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(themeToggle);
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        themeToggle.innerHTML = newTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });
}

// Initialize theme toggle
createThemeToggle();

// Add CSS for dark theme
if (!document.querySelector('#theme-styles')) {
    const style = document.createElement('style');
    style.id = 'theme-styles';
    style.textContent = `
        [data-theme="dark"] {
            --light-color: #0f172a;
            --text-primary: #f8fafc;
            --text-secondary: #94a3b8;
            --border-color: #334155;
        }
        
        [data-theme="dark"] .hero {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }
        
        [data-theme="dark"] .skills {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }
        
        [data-theme="dark"] .experience {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }
        
        [data-theme="dark"] .navbar {
            background: rgba(15, 23, 42, 0.95);
        }
        
        [data-theme="dark"] .nav-link {
            color: #f8fafc;
        }
        
        [data-theme="dark"] .project-card {
            background: #1e293b;
            border-color: #334155;
        }
        
        [data-theme="dark"] .skill-category {
            background: #1e293b;
        }
        
        [data-theme="dark"] .timeline-content {
            background: #1e293b;
        }
        
        [data-theme="dark"] .contact-form {
            background: #1e293b;
        }
    `;
    document.head.appendChild(style);
}

console.log('AI Engineering Portfolio loaded successfully! 🚀');
