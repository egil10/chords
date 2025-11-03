// Main application logic
let isGridView = true;

// Initialize the application
function init() {
    // Initialize components
    initTheme();
    initNavigation();
    initFretboard();
    initSearch();
    initChordBuilder();
    initToggleView();
    initProgressions();
    initCustomProgression();
    initScales();
    initCustomChords();
    
    // Show chords section by default
    document.getElementById('chordsContentSection').classList.add('active');
    
    // Populate chord library
    filterChords();
    
    // Add global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Focus search with / or Cmd/Ctrl + K
        if ((e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) && !e.target.matches('input, textarea')) {
            e.preventDefault();
            document.getElementById('chordSearch').focus();
        }
    });
}

// Toggle between grid and list view
function initToggleView() {
    const toggleBtn = document.getElementById('toggleView');
    const container = document.querySelector('body');
    
    toggleBtn.addEventListener('click', () => {
        isGridView = !isGridView;
        
        if (isGridView) {
            container.classList.remove('list-view');
            container.classList.add('grid-view');
            toggleBtn.querySelector('span').textContent = 'List View';
            toggleBtn.querySelector('i').setAttribute('data-lucide', 'list');
        } else {
            container.classList.remove('grid-view');
            container.classList.add('list-view');
            toggleBtn.querySelector('span').textContent = 'Grid View';
            toggleBtn.querySelector('i').setAttribute('data-lucide', 'grid');
        }
        
        // Also toggle progressions section
        if (typeof toggleProgressions === 'function') {
            toggleProgressions();
        }
        
        lucide.createIcons();
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

