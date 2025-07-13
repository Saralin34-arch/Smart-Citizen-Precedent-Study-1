/**
 * Smart Citizen Website JavaScript
 * Handles smooth scrolling and interactive functionality
 */

/**
 * Smoothly scrolls to a section by its ID
 * @param {string} id - The ID of the section to scroll to
 */
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
}

/**
 * Initialize the website functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling to all navigation links
  const navLinks = document.querySelectorAll('.site-nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      scrollToSection(targetId);
    });
  });
  
  // Add active state to navigation based on scroll position
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.site-nav a');
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= (sectionTop - 200)) {
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
});
