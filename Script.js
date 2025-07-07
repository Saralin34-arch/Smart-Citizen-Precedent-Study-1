// You can add custom JavaScript functionality here later

console.log("Website loaded successfully!");

// Smart Citizen Precedent Study - Enhanced JavaScript Functionality

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Smart Citizen Precedent Study loaded successfully!");
    
    // Initialize all functionality
    initializeSmoothScrolling();
    initializeTableOfContents();
    initializeInteractiveElements();
    initializeSearchFunctionality();
    initializePrintStyles();
    initializeAccessibilityFeatures();
});

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Generate table of contents from headings
function initializeTableOfContents() {
    const sections = document.querySelectorAll('.section, .info-block');
    const tocContainer = document.createElement('div');
    tocContainer.className = 'table-of-contents';
    tocContainer.innerHTML = '<h3>Table of Contents</h3><ul></ul>';
    
    const tocList = tocContainer.querySelector('ul');
    
    sections.forEach((section, index) => {
        const heading = section.querySelector('h3');
        if (heading) {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            const sectionId = `section-${index + 1}`;
            
            section.id = sectionId;
            link.href = `#${sectionId}`;
            link.textContent = heading.textContent;
            
            listItem.appendChild(link);
            tocList.appendChild(listItem);
        }
    });
    
    // Insert TOC after the title
    const title = document.querySelector('.title');
    if (title && tocContainer.querySelector('li')) {
        title.parentNode.insertBefore(tocContainer, title.nextSibling);
    }
}

// Add interactive features to elements
function initializeInteractiveElements() {
    // Add hover effects to sections
    const sections = document.querySelectorAll('.section, .info-block');
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add copy functionality to links
    const links = document.querySelectorAll('a[href^="http"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add visual feedback
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 200);
        });
    });
    
    // Add expand/collapse for long content
    const longLists = document.querySelectorAll('ul');
    longLists.forEach(list => {
        if (list.children.length > 3) {
            const toggleButton = document.createElement('button');
            toggleButton.textContent = 'Show More';
            toggleButton.className = 'toggle-button';
            toggleButton.style.cssText = `
                background: rgba(255, 255, 255, 0.2);
                border: 2px solid white;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                color: white;
                cursor: pointer;
                margin: 0.5rem 0;
                font-family: inherit;
                transition: all 0.2s ease;
            `;
            
            const items = Array.from(list.children);
            items.slice(3).forEach(item => {
                item.style.display = 'none';
            });
            
            toggleButton.addEventListener('click', function() {
                const hiddenItems = items.slice(3);
                const isExpanded = this.textContent === 'Show Less';
                
                hiddenItems.forEach(item => {
                    item.style.display = isExpanded ? 'none' : 'list-item';
                });
                
                this.textContent = isExpanded ? 'Show More' : 'Show Less';
            });
            
            list.parentNode.insertBefore(toggleButton, list.nextSibling);
        }
    });
}

// Add search functionality
function initializeSearchFunctionality() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" id="searchInput" placeholder="Search content..." style="
            width: 100%;
            padding: 0.8rem;
            border: 2px solid white;
            border-radius: 4px;
            font-family: inherit;
            margin-bottom: 1rem;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            font-size: 1rem;
        ">
    `;
    
    const title = document.querySelector('.title');
    if (title) {
        title.parentNode.insertBefore(searchContainer, title.nextSibling);
    }
    
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const sections = document.querySelectorAll('.section, .info-block');
        
        sections.forEach(section => {
            const text = section.textContent.toLowerCase();
            const isVisible = text.includes(searchTerm);
            section.style.display = searchTerm === '' ? 'block' : (isVisible ? 'block' : 'none');
        });
    });
}

// Add print-friendly styles
function initializePrintStyles() {
    const printButton = document.createElement('button');
    printButton.textContent = 'Print Page';
    printButton.className = 'print-button';
    printButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.2);
        border: 2px solid white;
        padding: 0.8rem 1.5rem;
        border-radius: 4px;
        color: white;
        cursor: pointer;
        font-family: inherit;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        transition: all 0.2s ease;
    `;
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    document.body.appendChild(printButton);
}

// Add accessibility features
function initializeAccessibilityFeatures() {
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Clear search
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
            }
        }
    });
    
    // Add ARIA labels for better screen reader support
    const links = document.querySelectorAll('a[href^="http"]');
    links.forEach(link => {
        if (!link.getAttribute('aria-label')) {
            link.setAttribute('aria-label', `External link to ${link.hostname}`);
        }
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid white';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Add CSS for new elements
const additionalStyles = `
    .table-of-contents {
        background: rgba(0, 0, 0, 0.3);
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 2rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        color: white;
    }
    
    .table-of-contents ul {
        list-style: none;
        padding-left: 0;
    }
    
    .table-of-contents li {
        margin-bottom: 0.5rem;
    }
    
    .table-of-contents a {
        color: white;
        text-decoration: none;
        padding: 0.3rem 0;
        display: block;
        border-left: 3px solid transparent;
        padding-left: 0.5rem;
        transition: all 0.2s ease;
    }
    
    .table-of-contents a:hover {
        border-left-color: white;
        background: rgba(255, 255, 255, 0.1);
    }
    
    .search-container {
        margin-bottom: 2rem;
    }
    
    .toggle-button:hover {
        background: rgba(255, 255, 255, 0.3) !important;
        transform: translateY(-1px);
    }
    
    .print-button:hover {
        background: rgba(255, 255, 255, 0.3) !important;
        transform: translateY(-1px);
    }
    
    #searchInput::placeholder {
        color: rgba(255, 255, 255, 0.7);
    }
    
    @media print {
        .print-button, .search-container, .table-of-contents {
            display: none !important;
        }
        
        body {
            background: white !important;
            color: black !important;
        }
        
        .section, .info-block {
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            break-inside: avoid;
        }
        
        h3, h4, .title, .subtitle, strong {
            color: black !important;
        }
        
        a {
            color: #0066cc !important;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
