// Project Data
const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured online shopping platform with cart, checkout, and payment integration',
    detailedDescription: 'A comprehensive e-commerce solution built with modern technologies. Features include user authentication, product catalog with search and filters, shopping cart functionality, secure checkout process, payment integration with Stripe, order management, and an admin dashboard for managing products and orders.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    imageColor: '#4A90E2'
  },
  {
    title: 'Task Management App',
    description: 'Collaborative project management tool with real-time updates and team features',
    detailedDescription: 'A powerful task management application designed for teams. Includes features like task creation and assignment, real-time collaboration, drag-and-drop task boards, deadline tracking, team member management, activity logs, and notifications. Built with Vue.js and Firebase for real-time synchronization.',
    technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    imageColor: '#7B68EE'
  },
  {
    title: 'Analytics Dashboard',
    description: 'Data visualization dashboard for business metrics and KPI tracking',
    detailedDescription: 'An interactive analytics dashboard for visualizing business data. Features multiple chart types, customizable widgets, real-time data updates, export functionality, and responsive design. Integrates with various data sources and provides insights through advanced data visualization using D3.js.',
    technologies: ['React', 'D3.js', 'Express', 'PostgreSQL'],
    imageColor: '#50C878'
  },
  {
    title: 'Mobile Fitness App',
    description: 'Cross-platform fitness tracking app with workout plans and progress monitoring',
    detailedDescription: 'A comprehensive fitness application for iOS and Android. Includes personalized workout plans, exercise library with video demonstrations, progress tracking with charts, calorie counter, water intake tracking, social features for motivation, and integration with health data platforms.',
    technologies: ['React Native', 'Redux', 'GraphQL'],
    imageColor: '#FF6B6B'
  },
  {
    title: 'Blog Platform',
    description: 'Modern blogging platform with markdown support and content management',
    detailedDescription: 'A sleek blogging platform with a focus on writing experience. Features include markdown editor with live preview, SEO optimization, image management, comment system, tag-based organization, RSS feed, and responsive design. Built with Next.js for optimal performance and SEO.',
    technologies: ['Next.js', 'Prisma', 'Vercel'],
    imageColor: '#F39C12'
  },
  {
    title: 'Weather Forecast App',
    description: 'Real-time weather application with location services and 7-day forecasts',
    detailedDescription: 'A beautiful weather application providing accurate forecasts. Features include current weather conditions, hourly and 7-day forecasts, location-based weather, weather maps, severe weather alerts, and multiple location support. Uses Weather API for reliable data and includes animated weather icons.',
    technologies: ['JavaScript', 'Weather API', 'CSS Grid'],
    imageColor: '#3498DB'
  }
];

// Navigation functionality
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const sections = document.querySelectorAll('.section, .hero');

// Toggle mobile menu
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

// Smooth scroll for "View My Work" button
const viewWorkBtn = document.getElementById('viewWorkBtn');
viewWorkBtn.addEventListener('click', () => {
  document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
});

// Update active nav link on scroll
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
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Render Projects
const projectsGrid = document.getElementById('projectsGrid');

function renderProjects() {
  projects.forEach((project, index) => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.setAttribute('data-index', index);
    
    projectCard.innerHTML = `
      <div class="project-image" style="background-color: ${project.imageColor}">
        ${project.title.substring(0, 2).toUpperCase()}
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tech">
          ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <a href="#" class="project-link">View Details →</a>
      </div>
    `;
    
    projectCard.addEventListener('click', (e) => {
      e.preventDefault();
      openProjectModal(index);
    });
    
    projectsGrid.appendChild(projectCard);
  });
}

// Modal functionality
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');

function openProjectModal(index) {
  const project = projects[index];
  
  modalBody.innerHTML = `
    <div class="modal-project-image" style="background-color: ${project.imageColor}">
      ${project.title.substring(0, 2).toUpperCase()}
    </div>
    <h3 class="modal-project-title">${project.title}</h3>
    <p class="modal-project-description">${project.detailedDescription}</p>
    <div class="modal-project-tech">
      ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
    </div>
  `;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeProjectModal);
modalOverlay.addEventListener('click', closeProjectModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeProjectModal();
  }
});

// Form validation and submission
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  // Validation flags
  let isValid = true;
  
  // Clear previous errors
  document.querySelectorAll('.error-message').forEach(el => {
    el.classList.remove('visible');
  });
  document.querySelectorAll('.form-control').forEach(el => {
    el.classList.remove('error');
  });
  
  // Validate name
  if (name === '') {
    showError('name', 'Name is required');
    isValid = false;
  } else if (name.length < 2) {
    showError('name', 'Name must be at least 2 characters');
    isValid = false;
  }
  
  // Validate email
  if (email === '') {
    showError('email', 'Email is required');
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError('email', 'Please enter a valid email');
    isValid = false;
  }
  
  // Validate message
  if (message === '') {
    showError('message', 'Message is required');
    isValid = false;
  } else if (message.length < 10) {
    showError('message', 'Message must be at least 10 characters');
    isValid = false;
  }
  
  // If valid, simulate form submission
  if (isValid) {
    // Show success message
    successMessage.classList.add('show');
    
    // Reset form
    contactForm.reset();
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      successMessage.classList.remove('show');
    }, 3000);
  }
});

function showError(fieldName, message) {
  const field = document.getElementById(fieldName);
  const errorElement = document.getElementById(`${fieldName}Error`);
  
  field.classList.add('error');
  errorElement.textContent = message;
  errorElement.classList.add('visible');
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Initialize
renderProjects();

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');
const aboutSection = document.getElementById('about');

let skillsAnimated = false;

function animateSkills() {
  if (skillsAnimated) return;
  
  const aboutTop = aboutSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;
  
  if (aboutTop < windowHeight * 0.75) {
    skillBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
    skillsAnimated = true;
  }
}

window.addEventListener('scroll', animateSkills);
animateSkills();