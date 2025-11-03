// Navigation and section management
function setActiveSection(section) {
    // Hide all sections first
    const allSections = document.querySelectorAll('.section-content');
    allSections.forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });
    
    // Hide specific containers
    const chordsSection = document.getElementById('chordsSection');
    const chordsContentSection = document.getElementById('chordsContentSection');
    const progressionsSection = document.getElementById('progressionsSection');
    const scalesSection = document.getElementById('scalesSection');
    
    // Reset navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    if (section === 'chords') {
        // Show chords section
        if (chordsSection) {
            chordsSection.style.display = 'block';
        }
        if (chordsContentSection) {
            chordsContentSection.classList.add('active');
            chordsContentSection.style.display = 'block';
        }
        // Activate nav button
        const navBtn = document.querySelector('.nav-btn[data-section="chords"]');
        if (navBtn) navBtn.classList.add('active');
        
        // Reset chord search if needed
        const searchInput = document.getElementById('chordSearch');
        if (searchInput && searchInput.value) {
            // Optionally clear search - comment out if you want to keep search
            // searchInput.value = '';
            // filterChords();
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    } else if (section === 'progressions') {
        // Hide chords
        if (chordsSection) chordsSection.style.display = 'none';
        if (chordsContentSection) {
            chordsContentSection.classList.remove('active');
            chordsContentSection.style.display = 'none';
        }
        
        // Show progressions
        if (progressionsSection) {
            progressionsSection.classList.add('active');
            progressionsSection.style.display = 'block';
        }
        
        // Show standard progressions list, hide custom builder
        const customBuilder = document.querySelector('.custom-progression-section');
        if (customBuilder) {
            customBuilder.style.display = 'none';
        }
        const progressionsList = document.getElementById('progressionsList');
        if (progressionsList) {
            progressionsList.style.display = 'block';
        }
        
        // Update progressions display
        if (typeof updateProgressions === 'function') {
            updateProgressions();
        }
        
        // Activate nav button
        const navBtn = document.querySelector('.nav-btn[data-section="progressions"]');
        if (navBtn) navBtn.classList.add('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    } else if (section === 'scales') {
        // Hide chords
        if (chordsSection) chordsSection.style.display = 'none';
        if (chordsContentSection) {
            chordsContentSection.classList.remove('active');
            chordsContentSection.style.display = 'none';
        }
        
        // Hide progressions
        if (progressionsSection) {
            progressionsSection.classList.remove('active');
            progressionsSection.style.display = 'none';
        }
        
        // Show scales (now standalone in main)
        if (scalesSection) {
            scalesSection.classList.add('active');
            scalesSection.style.display = 'block';
        }
        
        // Update scales display (refresh)
        if (typeof updateScales === 'function') {
            updateScales();
        } else if (typeof initScales === 'function') {
            // Re-initialize if update doesn't exist
            initScales();
        }
        
        // Activate nav button
        const navBtn = document.querySelector('.nav-btn[data-section="scales"]');
        if (navBtn) navBtn.classList.add('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    } else if (section === 'builder') {
        // Hide chords
        if (chordsSection) chordsSection.style.display = 'none';
        if (chordsContentSection) {
            chordsContentSection.classList.remove('active');
            chordsContentSection.style.display = 'none';
        }
        
        // Show progressions (which contains builder)
        if (progressionsSection) {
            progressionsSection.classList.add('active');
            progressionsSection.style.display = 'block';
        }
        
        // Show custom builder, hide standard progressions
        const customBuilder = document.querySelector('.custom-progression-section');
        if (customBuilder) {
            customBuilder.style.display = 'block';
        }
        const progressionsList = document.getElementById('progressionsList');
        if (progressionsList) {
            progressionsList.style.display = 'none';
        }
        
        // Activate nav button
        const navBtn = document.querySelector('.nav-btn[data-section="builder"]');
        if (navBtn) navBtn.classList.add('active');
        
        // Scroll to builder
        if (customBuilder) {
            setTimeout(() => {
                customBuilder.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
    
    // Reinitialize icons
    if (typeof lucide !== 'undefined') {
        setTimeout(() => {
            lucide.createIcons();
        }, 50);
    }
}

function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const refreshLogo = document.getElementById('refreshLogo');
    
    // Navigation button clicks
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            setActiveSection(section);
        });
    });
    
    // Refresh logo click
    if (refreshLogo) {
        refreshLogo.addEventListener('click', () => {
            window.location.reload();
        });
    }
    
    // Set initial section (chords)
    setActiveSection('chords');
}

// Export
window.initNavigation = initNavigation;
window.setActiveSection = setActiveSection;

