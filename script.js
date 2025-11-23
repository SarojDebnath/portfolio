// Portfolio Website JavaScript
// This script loads content from data.json and populates the page dynamically

// ============================================
// CONFIGURATION
// ============================================
const CONFIG = {
    dataFile: 'data.json',
    fallbackDelay: 3000 // Time to wait before showing fallback content
};

// ============================================
// DOM ELEMENTS
// ============================================
const elements = {
    projectsContainer: document.getElementById('projects-container'),
    experienceContainer: document.getElementById('experience-container'),
    papersContainer: document.getElementById('papers-container'),
    udemyHours: document.getElementById('udemy-hours'),
    udemyStudents: document.getElementById('udemy-students'),
    udemyEngagement: document.getElementById('udemy-engagement'),
    feedbackContainer: document.getElementById('feedback-container'),
    contactEmail: document.getElementById('contact-email'),
    contactLinkedIn: document.getElementById('contact-linkedin'),
    contactGithub: document.getElementById('contact-github'),
    heroIntro: document.getElementById('hero-intro'),
    currentYear: document.getElementById('current-year')
};

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    elements.currentYear.textContent = new Date().getFullYear();
    
    // Initialize navigation
    initNavigation();
    
    // Load data from JSON
    loadData();
    
    // Initialize smooth scrolling
    initSmoothScroll();
});

// ============================================
// DATA LOADING
// ============================================
async function loadData() {
    try {
        const response = await fetch(CONFIG.dataFile);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Populate all sections with data
        populateHero(data.hero);
        populateProjects(data.projects);
        populateUdemy(data.udemy);
        populateExperience(data.experience);
        populatePapers(data.papers);
        populateContact(data.contact);
        
    } catch (error) {
        console.error('Error loading data.json:', error);
        showFallbackContent();
    }
}

// ============================================
// HERO SECTION
// ============================================
function populateHero(heroData) {
    if (heroData && heroData.intro) {
        elements.heroIntro.textContent = heroData.intro;
    }
}

// ============================================
// PROJECTS SECTION
// ============================================
// **UPDATE data.json to modify your projects**
function populateProjects(projects) {
    if (!projects || projects.length === 0) {
        elements.projectsContainer.innerHTML = '<p class="text-gray-600 text-center col-span-full">No projects available.</p>';
        return;
    }
    
    elements.projectsContainer.innerHTML = '';
    
    projects.forEach((project, index) => {
        const projectCard = createProjectCard(project);
        elements.projectsContainer.appendChild(projectCard);
        
        // Stagger animation
        setTimeout(() => {
            projectCard.style.opacity = '1';
            projectCard.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card bg-white rounded-lg shadow-lg overflow-hidden';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    
    let toolsHTML = '';
    if (project.tools && project.tools.length > 0) {
        toolsHTML = project.tools.map(tool => 
            `<span class="tool-badge">${tool}</span>`
        ).join('');
    }
    
    let videoHTML = '';
    if (project.videoUrl) {
        videoHTML = `
            <div class="mt-4">
                <a href="${project.videoUrl}" target="_blank" class="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold">
                    <i class="fas fa-play-circle mr-2"></i>
                    Watch Demo
                </a>
            </div>
        `;
    }
    
    let githubHTML = '';
    if (project.githubUrl) {
        githubHTML = `
            <a href="${project.githubUrl}" target="_blank" class="inline-flex items-center text-gray-600 hover:text-gray-800 font-semibold ml-4">
                <i class="fab fa-github mr-2"></i>
                View Code
            </a>
        `;
    }
    
    card.innerHTML = `
        <div class="p-6">
            <h3 class="text-2xl font-bold text-gray-900 mb-3">${project.title}</h3>
            <p class="text-gray-600 mb-4 leading-relaxed">${project.description}</p>
            <div class="mb-4">
                ${toolsHTML}
            </div>
            <div class="flex items-center">
                ${videoHTML}
                ${githubHTML}
            </div>
        </div>
    `;
    
    return card;
}

// ============================================
// UDEMY SECTION
// ============================================
// **UPDATE data.json udemy section to modify stats**
function populateUdemy(udemyData) {
    if (!udemyData) {
        elements.udemyHours.textContent = 'N/A';
        elements.udemyStudents.textContent = 'N/A';
        elements.udemyEngagement.textContent = 'N/A';
        return;
    }
    
    // Animate numbers
    animateNumber(elements.udemyHours, 0, udemyData.totalHours || 0, 2000);
    animateNumber(elements.udemyStudents, 0, udemyData.totalStudents || 0, 2000);
    elements.udemyEngagement.textContent = udemyData.engagement || 'N/A';
    
    // Load feedback screenshots
    if (udemyData.feedback && udemyData.feedback.length > 0) {
        elements.feedbackContainer.innerHTML = '';
        udemyData.feedback.forEach(feedbackItem => {
            const img = document.createElement('img');
            img.src = feedbackItem;
            img.alt = 'Student Feedback';
            img.className = 'feedback-image';
            img.loading = 'lazy';
            
            // Error handling for images
            img.onerror = function() {
                this.style.display = 'none';
            };
            
            elements.feedbackContainer.appendChild(img);
        });
    }
}

// Animate number counting up
function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = Math.round(end);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// ============================================
// EXPERIENCE SECTION
// ============================================
// **UPDATE data.json experience array to modify your work history**
function populateExperience(experiences) {
    if (!experiences || experiences.length === 0) {
        elements.experienceContainer.innerHTML = '<p class="text-gray-600">No experience data available.</p>';
        return;
    }
    
    elements.experienceContainer.innerHTML = '';
    
    experiences.forEach((exp, index) => {
        const expCard = createExperienceCard(exp);
        elements.experienceContainer.appendChild(expCard);
        
        // Stagger animation
        setTimeout(() => {
            expCard.style.opacity = '1';
            expCard.style.transform = 'translateX(0)';
        }, index * 150);
    });
}

function createExperienceCard(experience) {
    const card = document.createElement('div');
    card.className = 'experience-item bg-white rounded-lg shadow-md p-6';
    card.style.opacity = '0';
    card.style.transform = 'translateX(-20px)';
    card.style.transition = 'all 0.5s ease';
    
    let highlightsHTML = '';
    if (experience.highlights && experience.highlights.length > 0) {
        highlightsHTML = `
            <ul class="list-disc list-inside space-y-2 text-gray-600">
                ${experience.highlights.map(highlight => 
                    `<li>${highlight}</li>`
                ).join('')}
            </ul>
        `;
    }
    
    card.innerHTML = `
        <div class="flex justify-between items-start mb-2">
            <h3 class="text-xl font-bold text-gray-900">${experience.title}</h3>
            <span class="text-sm text-gray-500">${experience.duration}</span>
        </div>
        <p class="text-blue-600 font-semibold mb-3">${experience.company}</p>
        <p class="text-gray-700 mb-3">${experience.description}</p>
        ${highlightsHTML}
    `;
    
    return card;
}

// ============================================
// PAPERS SECTION
// ============================================
// **UPDATE data.json papers array to add your publications**
function populatePapers(papers) {
    if (!papers || papers.length === 0) {
        elements.papersContainer.innerHTML = '<p class="text-gray-600">No publications available.</p>';
        return;
    }
    
    elements.papersContainer.innerHTML = '';
    
    papers.forEach((paper, index) => {
        const paperCard = createPaperCard(paper);
        elements.papersContainer.appendChild(paperCard);
        
        // Stagger animation
        setTimeout(() => {
            paperCard.style.opacity = '1';
            paperCard.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

function createPaperCard(paper) {
    const card = document.createElement('div');
    card.className = 'paper-card bg-white rounded-lg shadow-md p-6';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    
    let linkHTML = '';
    if (paper.url) {
        linkHTML = `
            <a href="${paper.url}" target="_blank" class="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold mt-3">
                <i class="fas fa-external-link-alt mr-2"></i>
                Read Paper
            </a>
        `;
    }
    
    card.innerHTML = `
        <h3 class="text-xl font-bold text-gray-900 mb-2">${paper.title}</h3>
        <p class="text-gray-600 mb-2">${paper.authors}</p>
        <p class="text-sm text-gray-500 mb-3">${paper.venue} • ${paper.year}</p>
        <p class="text-gray-700">${paper.abstract}</p>
        ${linkHTML}
    `;
    
    return card;
}

// ============================================
// CONTACT SECTION
// ============================================
// **UPDATE data.json contact section to modify your contact info**
function populateContact(contact) {
    if (!contact) return;
    
    if (contact.email) {
        elements.contactEmail.href = `mailto:${contact.email}`;
        elements.contactEmail.textContent = contact.email;
    }
    
    if (contact.linkedin) {
        elements.contactLinkedIn.href = contact.linkedin;
        elements.contactLinkedIn.textContent = 'LinkedIn Profile';
    }
    
    if (contact.github) {
        elements.contactGithub.href = contact.github;
        elements.contactGithub.textContent = 'GitHub Profile';
    }
}

// ============================================
// FALLBACK CONTENT
// ============================================
function showFallbackContent() {
    // Show a user-friendly error message
    elements.projectsContainer.innerHTML = `
        <div class="col-span-full error-message">
            <h3 class="font-bold mb-2">Unable to load content</h3>
            <p>We couldn't load the data file. Please ensure <code>data.json</code> exists and is properly formatted.</p>
        </div>
    `;
    
    elements.experienceContainer.innerHTML = `
        <div class="error-message">
            <p>Experience data could not be loaded.</p>
        </div>
    `;
    
    elements.papersContainer.innerHTML = `
        <div class="error-message">
            <p>Publications data could not be loaded.</p>
        </div>
    `;
    
    // Set default contact info
    elements.contactEmail.textContent = 'contact@example.com';
    elements.contactLinkedIn.textContent = 'LinkedIn';
    elements.contactGithub.textContent = 'GitHub';
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('show');
    });
    
    // Close mobile menu when link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
        });
    });
    
    // Highlight active section in navbar
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-blue-600', 'font-bold');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-blue-600', 'font-bold');
            }
        });
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 64; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Function to validate JSON structure (can be expanded)
function validateData(data) {
    const requiredKeys = ['hero', 'projects', 'udemy', 'experience', 'papers', 'contact'];
    return requiredKeys.every(key => key in data);
}

// Error logging (can be enhanced to send to analytics)
function logError(error, context) {
    console.error(`Error in ${context}:`, error);
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images when they come into view
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading after content loads
setTimeout(initLazyLoading, 1000);

