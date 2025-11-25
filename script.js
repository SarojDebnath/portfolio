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
let elements = {};

// Review slider state
let currentReviewIndex = 0;
let reviewImages = [];
let reviewAutoPlayInterval = null;

// Initialize DOM elements
function initializeElements() {
    elements = {
        roboticsProjectsContainer: document.getElementById('robotics-projects-container'),
        llmopsProjectsContainer: document.getElementById('llmops-projects-container'),
        experienceContainer: document.getElementById('experience-container'),
        papersContainer: document.getElementById('papers-container'),
        udemyMinutes: document.getElementById('udemy-minutes'),
        udemyGraph: document.getElementById('udemy-graph'),
        udemyMap: document.getElementById('udemy-map'),
        reviewSlider: document.getElementById('review-slider'),
        reviewDots: document.getElementById('review-dots'),
        reviewPrev: document.getElementById('review-prev'),
        reviewNext: document.getElementById('review-next'),
        contactEmail: document.getElementById('contact-email'),
        contactLinkedIn: document.getElementById('contact-linkedin'),
        contactGithub: document.getElementById('contact-github'),
        heroIntro: document.getElementById('hero-intro'),
        profileImage: document.getElementById('profile-image'),
        profileIntro: document.getElementById('profile-intro'),
        currentYear: document.getElementById('current-year')
    };
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize elements first
    initializeElements();
    
    // Set current year
    if (elements.currentYear) {
        elements.currentYear.textContent = new Date().getFullYear();
    }
    
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
        if (data.hero) populateHero(data.hero);
        if (data.profile) populateProfile(data.profile);
        if (data.projects) populateProjects(data.projects);
        if (data.udemy) populateUdemy(data.udemy);
        if (data.experience) populateExperience(data.experience);
        if (data.papers) populatePapers(data.papers);
        if (data.contact) populateContact(data.contact);
        
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
        // Hero intro is now static in HTML, but we can update if needed
    }
}

// ============================================
// PROFILE SECTION
// ============================================
function populateProfile(profileData) {
    if (profileData) {
        if (profileData.image && elements.profileImage) {
            elements.profileImage.src = profileData.image;
        }
        if (profileData.intro && elements.profileIntro) {
            elements.profileIntro.textContent = profileData.intro;
        }
    }
}

// ============================================
// PROJECTS SECTION
// ============================================
// **UPDATE data.json to modify your projects**
function populateProjects(projectsData) {
    // Handle new structure with separated robotics and llmops
    if (!projectsData) {
        console.error('No projects data provided');
        return;
    }
    
    // Populate Robotics Projects
    if (projectsData.robotics && Array.isArray(projectsData.robotics)) {
        if (elements.roboticsProjectsContainer) {
            populateProjectCategory(projectsData.robotics, elements.roboticsProjectsContainer);
        } else {
            console.error('roboticsProjectsContainer element not found');
        }
    } else {
        console.warn('No robotics projects found in data');
    }
    
    // Populate LLMOps Projects
    if (projectsData.llmops && Array.isArray(projectsData.llmops)) {
        if (elements.llmopsProjectsContainer) {
            populateProjectCategory(projectsData.llmops, elements.llmopsProjectsContainer);
        } else {
            console.error('llmopsProjectsContainer element not found');
        }
    } else {
        console.warn('No llmops projects found in data');
    }
}

function populateProjectCategory(projects, container) {
    if (!container) {
        console.error('Container element not found');
        return;
    }
    
    if (!projects || projects.length === 0) {
        container.innerHTML = '<p class="text-gray-600 text-center col-span-full">No projects available.</p>';
        return;
    }
    
    container.innerHTML = '';
    
    projects.forEach((project, index) => {
        try {
            const projectCard = createProjectCard(project);
            container.appendChild(projectCard);
            
            // Stagger animation
            setTimeout(() => {
                if (projectCard) {
                    projectCard.style.opacity = '1';
                    projectCard.style.transform = 'translateY(0)';
                }
            }, index * 100);
        } catch (error) {
            console.error('Error creating project card:', error, project);
        }
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card bg-white rounded-lg shadow-lg overflow-hidden';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    let toolsHTML = '';
    if (project.tools && project.tools.length > 0) {
        toolsHTML = project.tools.map(tool => 
            `<span class="tool-badge">${tool}</span>`
        ).join('');
    }
    
    // Video embedding with autoplay
    let videoHTML = '';
    if (project.videoUrl) {
        const videoId = extractYouTubeId(project.videoUrl);
        const googleDriveId = extractGoogleDriveId(project.videoUrl);
        
        if (videoId) {
            // Embedded YouTube video with autoplay and mute
            videoHTML = `
                <div class="mt-4">
                    <div class="video-container">
                        <iframe 
                            src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&rel=0" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen
                            loading="eager">
                        </iframe>
                    </div>
                </div>
            `;
        } else if (googleDriveId) {
            // Embedded Google Drive video with autoplay
            videoHTML = `
                <div class="mt-4">
                    <div class="video-container">
                        <iframe 
                            src="https://drive.google.com/file/d/${googleDriveId}/preview" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen
                            loading="eager">
                        </iframe>
                    </div>
                </div>
            `;
        } else {
            // Fallback to link if not YouTube or Google Drive
            videoHTML = `
                <div class="mt-4">
                    <a href="${project.videoUrl}" target="_blank" class="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold">
                        <i class="fas fa-play-circle mr-2"></i>
                        Watch Demo
                    </a>
                </div>
            `;
        }
    }
    
    let githubHTML = '';
    if (project.githubUrl) {
        githubHTML = `
            <div class="mt-4">
                <a href="${project.githubUrl}" target="_blank" class="inline-flex items-center text-gray-600 hover:text-gray-800 font-semibold">
                    <i class="fab fa-github mr-2"></i>
                    View Code
                </a>
            </div>
        `;
    }
    
    card.innerHTML = `
        <div class="p-6">
            <h3 class="text-2xl font-bold text-gray-900 mb-3">${project.title}</h3>
            <p class="text-gray-600 mb-4 leading-relaxed">${project.description}</p>
            <div class="mb-4">
                ${toolsHTML}
            </div>
            ${videoHTML}
            ${githubHTML}
        </div>
    `;
    
    return card;
}

// Helper function to extract YouTube video ID
function extractYouTubeId(url) {
    if (!url) return null;
    
    // Handle various YouTube URL formats
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/v\/([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    
    return null;
}

// Helper function to extract Google Drive file ID
function extractGoogleDriveId(url) {
    if (!url) return null;
    
    // Handle Google Drive URL formats:
    // https://drive.google.com/file/d/FILE_ID/view
    // https://drive.google.com/open?id=FILE_ID
    const patterns = [
        /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/,
        /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    
    return null;
}

// ============================================
// UDEMY SECTION
// ============================================
// **UPDATE data.json udemy section to modify stats**
function populateUdemy(udemyData) {
    if (!udemyData) {
        if (elements.udemyMinutes) {
            elements.udemyMinutes.textContent = 'N/A';
        }
        return;
    }
    
    // Display minutes taught (formatted with commas)
    if (elements.udemyMinutes) {
        if (udemyData.totalMinutes !== undefined && udemyData.totalMinutes !== null) {
            const formattedMinutes = udemyData.totalMinutes.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            elements.udemyMinutes.textContent = formattedMinutes;
        } else {
            elements.udemyMinutes.textContent = 'N/A';
        }
    }
    
    // Load graph image
    if (elements.udemyGraph && udemyData.graphImage) {
        elements.udemyGraph.src = udemyData.graphImage;
        elements.udemyGraph.style.display = 'block';
        elements.udemyGraph.onerror = function() {
            this.style.display = 'none';
        };
        elements.udemyGraph.onload = function() {
            this.style.display = 'block';
        };
    }
    
    // Load map image
    if (elements.udemyMap && udemyData.mapImage) {
        elements.udemyMap.src = udemyData.mapImage;
        elements.udemyMap.style.display = 'block';
        elements.udemyMap.onerror = function() {
            this.style.display = 'none';
        };
        elements.udemyMap.onload = function() {
            this.style.display = 'block';
        };
    }
    
    // Load reviews and initialize slider
    if (udemyData.reviews && udemyData.reviews.length > 0) {
        reviewImages = udemyData.reviews;
        initializeReviewSlider();
    }
}

// Initialize review slider
function initializeReviewSlider() {
    if (!elements.reviewSlider || reviewImages.length === 0) return;
    
    // Clear existing content
    elements.reviewSlider.innerHTML = '';
    if (elements.reviewDots) elements.reviewDots.innerHTML = '';
    
    // Create review slides
    reviewImages.forEach((reviewPath, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = 'review-slide';
        slide.dataset.index = index;
        
        const img = document.createElement('img');
        img.src = reviewPath;
        img.alt = `Student Review ${index + 1}`;
        img.className = 'review-image';
        img.loading = 'lazy';
        
        img.onerror = function() {
            slide.style.display = 'none';
        };
        
        slide.appendChild(img);
        elements.reviewSlider.appendChild(slide);
        
        // Create dot indicator
        if (elements.reviewDots) {
            const dot = document.createElement('button');
            dot.className = 'review-dot';
            dot.dataset.index = index;
            dot.setAttribute('aria-label', `Go to review ${index + 1}`);
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToReview(index));
            elements.reviewDots.appendChild(dot);
        }
    });
    
    // Set initial slide
    showReview(0);
    
    // Add navigation event listeners
    if (elements.reviewPrev) {
        elements.reviewPrev.addEventListener('click', () => {
            goToReview(currentReviewIndex - 1);
        });
    }
    
    if (elements.reviewNext) {
        elements.reviewNext.addEventListener('click', () => {
            goToReview(currentReviewIndex + 1);
        });
    }
    
    // Auto-play slider - continuously rotate
    startReviewAutoPlay();
    
    // Pause on hover for better UX
    const sliderContainer = elements.reviewSlider.closest('.review-slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopReviewAutoPlay);
        sliderContainer.addEventListener('mouseleave', startReviewAutoPlay);
    }
}

// Start auto-play for review slider
function startReviewAutoPlay() {
    // Clear any existing interval
    if (reviewAutoPlayInterval) {
        clearInterval(reviewAutoPlayInterval);
    }
    
    // Start auto-play - change slide every 4 seconds
    reviewAutoPlayInterval = setInterval(() => {
        if (reviewImages.length > 0) {
            goToReview(currentReviewIndex + 1);
        }
    }, 4000); // 4 seconds per slide
}

// Stop auto-play for review slider
function stopReviewAutoPlay() {
    if (reviewAutoPlayInterval) {
        clearInterval(reviewAutoPlayInterval);
        reviewAutoPlayInterval = null;
    }
}

// Show specific review
function showReview(index) {
    const slides = elements.reviewSlider.querySelectorAll('.review-slide');
    const dots = elements.reviewDots ? elements.reviewDots.querySelectorAll('.review-dot') : [];
    
    if (slides.length === 0) return;
    
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    
    // Update dots
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Navigate to specific review
function goToReview(index) {
    if (reviewImages.length === 0) return;
    
    // Handle wrap-around
    if (index < 0) {
        currentReviewIndex = reviewImages.length - 1;
    } else if (index >= reviewImages.length) {
        currentReviewIndex = 0;
    } else {
        currentReviewIndex = index;
    }
    
    showReview(currentReviewIndex);
}

// Legacy animate number function (kept for compatibility)
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
    if (!contact) {
        console.warn('No contact data provided');
        return;
    }
    
    if (contact.email && elements.contactEmail) {
        elements.contactEmail.href = `mailto:${contact.email}`;
        elements.contactEmail.textContent = contact.email;
    } else if (elements.contactEmail) {
        console.warn('Email not found in contact data');
    }
    
    if (contact.linkedin && elements.contactLinkedIn) {
        elements.contactLinkedIn.href = contact.linkedin;
        elements.contactLinkedIn.textContent = 'LinkedIn Profile';
        // Ensure target="_blank" is set
        elements.contactLinkedIn.setAttribute('target', '_blank');
        elements.contactLinkedIn.setAttribute('rel', 'noopener noreferrer');
    } else if (elements.contactLinkedIn) {
        console.warn('LinkedIn URL not found in contact data');
    }
    
    if (contact.github && elements.contactGithub) {
        elements.contactGithub.href = contact.github;
        elements.contactGithub.textContent = 'GitHub Profile';
        // Ensure target="_blank" is set
        elements.contactGithub.setAttribute('target', '_blank');
        elements.contactGithub.setAttribute('rel', 'noopener noreferrer');
    } else if (elements.contactGithub) {
        console.warn('GitHub URL not found in contact data');
    }
}

// ============================================
// FALLBACK CONTENT
// ============================================
function showFallbackContent() {
    // Show a user-friendly error message
    if (elements.roboticsProjectsContainer) {
        elements.roboticsProjectsContainer.innerHTML = `
            <div class="col-span-full error-message">
                <h3 class="font-bold mb-2">Unable to load content</h3>
                <p>We couldn't load the data file. Please ensure <code>data.json</code> exists and is properly formatted.</p>
            </div>
        `;
    }
    
    if (elements.llmopsProjectsContainer) {
        elements.llmopsProjectsContainer.innerHTML = `
            <div class="col-span-full error-message">
                <h3 class="font-bold mb-2">Unable to load content</h3>
                <p>We couldn't load the data file. Please ensure <code>data.json</code> exists and is properly formatted.</p>
            </div>
        `;
    }
    
    if (elements.experienceContainer) {
        elements.experienceContainer.innerHTML = `
            <div class="error-message">
                <p>Experience data could not be loaded.</p>
            </div>
        `;
    }
    
    if (elements.papersContainer) {
        elements.papersContainer.innerHTML = `
            <div class="error-message">
                <p>Publications data could not be loaded.</p>
            </div>
        `;
    }
    
    // Set default Udemy values
    if (elements.udemyMinutes) elements.udemyMinutes.textContent = 'N/A';
    
    // Set default contact info
    if (elements.contactEmail) elements.contactEmail.textContent = 'contact@example.com';
    if (elements.contactLinkedIn) elements.contactLinkedIn.textContent = 'LinkedIn';
    if (elements.contactGithub) elements.contactGithub.textContent = 'GitHub';
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

// ============================================
// MODAL FUNCTIONS (for Impressum & Privacy)
// ============================================

// Open modal when clicking footer links
document.addEventListener('DOMContentLoaded', () => {
    // Impressum link
    const impressumLink = document.querySelector('a[href="#impressum"]');
    if (impressumLink) {
        impressumLink.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('impressum-modal').classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }
    
    // Privacy link
    const privacyLink = document.querySelector('a[href="#privacy"]');
    if (privacyLink) {
        privacyLink.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('privacy-modal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close modals when clicking outside
    document.getElementById('impressum-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'impressum-modal') {
            closeModal('impressum-modal');
        }
    });
    
    document.getElementById('privacy-modal')?.addEventListener('click', (e) => {
        if (e.target.id === 'privacy-modal') {
            closeModal('privacy-modal');
        }
    });
});

// Function to close modals
function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

