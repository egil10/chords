// Navigation and section management
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section-content');
    const refreshLogo = document.getElementById('refreshLogo');
    
    // Navigation button clicks
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            
            // Update active nav button
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show/hide sections
            sections.forEach(s => s.classList.remove('active'));
            
            if (section === 'chords') {
                document.getElementById('chordsSection').style.display = 'block';
                document.getElementById('chordsContentSection').classList.add('active');
            } else if (section === 'progressions') {
                document.getElementById('chordsSection').style.display = 'none';
                document.getElementById('chordsContentSection').classList.remove('active');
                document.getElementById('progressionsSection').classList.add('active');
            } else if (section === 'scales') {
                document.getElementById('chordsSection').style.display = 'none';
                document.getElementById('chordsContentSection').classList.remove('active');
                document.getElementById('progressionsSection').classList.remove('active');
                
                // Create scales section if it doesn't exist in main
                let scalesSection = document.getElementById('scalesSection');
                if (!scalesSection) {
                    // Find it in the fretboard container area
                    scalesSection = document.querySelector('.scales-section');
                }
                if (scalesSection) {
                    scalesSection.classList.add('active');
                    scalesSection.style.display = 'block';
                    // Make it a standalone section
                    if (!scalesSection.parentElement.classList.contains('section-content')) {
                        const wrapper = document.createElement('div');
                        wrapper.className = 'section-content active';
                        scalesSection.parentNode.insertBefore(wrapper, scalesSection);
                        wrapper.appendChild(scalesSection);
                    }
                }
            } else if (section === 'builder') {
                document.getElementById('chordsSection').style.display = 'none';
                document.getElementById('chordsContentSection').classList.remove('active');
                // Show custom progression builder
                document.getElementById('progressionsSection').classList.add('active');
                const customBuilder = document.querySelector('.custom-progression-section');
                if (customBuilder) {
                    customBuilder.scrollIntoView({ behavior: 'smooth' });
                }
            }
            
            // Reinitialize icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    });
    
    // Refresh logo click
    if (refreshLogo) {
        refreshLogo.addEventListener('click', () => {
            window.location.reload();
        });
    }
}

// Export
window.initNavigation = initNavigation;

