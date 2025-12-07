// Theme toggle functionality
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeRadio(savedTheme);
    
    // Handle radio button changes
    const lightRadio = document.getElementById('theme-light');
    const darkRadio = document.getElementById('theme-dark');
    
    if (lightRadio) {
        lightRadio.addEventListener('change', (e) => {
            if (e.target.checked) {
                setTheme('light');
            }
        });
    }
    
    if (darkRadio) {
        darkRadio.addEventListener('change', (e) => {
            if (e.target.checked) {
                setTheme('dark');
            }
        });
    }
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeRadio(theme);
    
    // Re-initialize Lucide icons if needed
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function updateThemeRadio(theme) {
    const lightRadio = document.getElementById('theme-light');
    const darkRadio = document.getElementById('theme-dark');
    const lightOption = lightRadio?.closest('.theme-option');
    const darkOption = darkRadio?.closest('.theme-option');
    
    if (lightRadio && darkRadio) {
        if (theme === 'light') {
            lightRadio.checked = true;
            darkRadio.checked = false;
            lightOption?.classList.add('active');
            darkOption?.classList.remove('active');
        } else {
            lightRadio.checked = false;
            darkRadio.checked = true;
            lightOption?.classList.remove('active');
            darkOption?.classList.add('active');
        }
    }
}

// Initialize theme when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}
