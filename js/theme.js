// Theme toggle functionality
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    
    if (!themeToggle || !themeIcon) return;
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

function setTheme(theme) {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    
    if (theme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        if (themeIcon) {
            themeIcon.setAttribute('data-lucide', 'moon');
        }
    } else {
        body.removeAttribute('data-theme');
        if (themeIcon) {
            themeIcon.setAttribute('data-lucide', 'sun');
        }
    }
    
    // Update icons after theme change
    setTimeout(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        window.dispatchEvent(new Event('themeChanged'));
    }, 50);
}

// Export
window.initTheme = initTheme;
window.setTheme = setTheme;

