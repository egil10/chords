// Progression UI functionality
let currentProgressionRoot = 'C';
let isProgressionMinor = false;

// Initialize progression UI
function initProgressions() {
    const noteButtons = document.querySelectorAll('.control-btn[data-note]');
    const minorToggle = document.getElementById('progressionMinorToggle');
    const clearBtn = document.getElementById('clearProgressionSelection');
    
    if (!noteButtons.length || !minorToggle) return;
    
    // Update progressions when root changes
    noteButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            noteButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update root
            currentProgressionRoot = btn.dataset.note;
            window.currentProgressionRoot = currentProgressionRoot;
            updateProgressions();
        });
    });
    
    // Toggle minor/major
    minorToggle.addEventListener('click', () => {
        isProgressionMinor = !isProgressionMinor;
        window.isProgressionMinor = isProgressionMinor;
        minorToggle.querySelector('span').textContent = isProgressionMinor ? 'Minor' : 'Major';
        updateProgressions();
    });
    
    // Clear button
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            currentProgressionRoot = 'C';
            isProgressionMinor = false;
            window.currentProgressionRoot = currentProgressionRoot;
            window.isProgressionMinor = isProgressionMinor;
            
            noteButtons.forEach(b => b.classList.remove('active'));
            const defaultBtn = Array.from(noteButtons).find(btn => btn.dataset.note === 'C');
            if (defaultBtn) defaultBtn.classList.add('active');
            
            minorToggle.querySelector('span').textContent = 'Major';
            updateProgressions();
        });
    }
    
    // Set initial active button
    const activeBtn = Array.from(noteButtons).find(btn => btn.dataset.note === currentProgressionRoot);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Initial load
    updateProgressions();
}

// Toggle progression section visibility
function toggleProgressions() {
    const progressionsSection = document.getElementById('progressionsSection');
    if (progressionsSection) {
        const isVisible = progressionsSection.style.display !== 'none';
        progressionsSection.style.display = isVisible ? 'none' : 'block';
    }
}

// Update progressions display
function updateProgressions() {
    const progressionsList = document.getElementById('progressionsList');
    if (!progressionsList) return;
    
    // Check if PROGRESSION_PATTERNS is available
    const patterns = window.PROGRESSION_PATTERNS || PROGRESSION_PATTERNS;
    if (!patterns) {
        console.error('PROGRESSION_PATTERNS not found');
        return;
    }
    
    progressionsList.innerHTML = '';
    
    // Iterate through all progression categories
    for (const [category, patternsArray] of Object.entries(patterns)) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'progression-category';
        
        const categoryTitle = document.createElement('h4');
        categoryTitle.textContent = getCategoryTitle(category);
        categoryDiv.appendChild(categoryTitle);
        
        const patternsContainer = document.createElement('div');
        patternsContainer.className = 'patterns-grid';
        
        patternsArray.forEach(pattern => {
            const patternDiv = createProgressionPattern(pattern, category);
            patternsContainer.appendChild(patternDiv);
        });
        
        categoryDiv.appendChild(patternsContainer);
        progressionsList.appendChild(categoryDiv);
    }
    
    // Update icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Create a progression pattern element
function createProgressionPattern(pattern, category) {
    const patternDiv = document.createElement('div');
    patternDiv.className = 'progression-pattern';
    
    const isMinor = pattern.minor !== undefined ? pattern.minor : isProgressionMinor;
    const genProgression = window.generateProgression || generateProgression;
    if (!genProgression) {
        console.error('generateProgression function not found');
        return patternDiv;
    }
    const chords = genProgression(currentProgressionRoot, pattern.pattern, isMinor);
    
    const patternName = document.createElement('div');
    patternName.className = 'pattern-name';
    patternName.textContent = pattern.name;
    patternDiv.appendChild(patternName);
    
    const patternDescription = document.createElement('div');
    patternDescription.className = 'pattern-description';
    patternDescription.textContent = pattern.description;
    patternDiv.appendChild(patternDescription);
    
    const romanNumerals = document.createElement('div');
    romanNumerals.className = 'roman-numerals';
    romanNumerals.style.display = 'none'; // Hide duplicate, already shown in pattern.name
    patternDiv.appendChild(romanNumerals);
    
    const chordsContainer = document.createElement('div');
    chordsContainer.className = 'progression-chords';
    
    chords.forEach(chord => {
        const chordButton = document.createElement('button');
        chordButton.className = 'progression-chord';
        chordButton.textContent = chord.name;
        chordButton.dataset.chord = chord.name;
        
        chordButton.addEventListener('click', () => {
            // Display chord on fretboard
            if (typeof displayChordOnFretboard === 'function') {
                displayChordOnFretboard(chord.name);
                document.getElementById('fretboard').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
        
        chordsContainer.appendChild(chordButton);
    });
    
    patternDiv.appendChild(chordsContainer);
    
    return patternDiv;
}

// Get category title
function getCategoryTitle(category) {
    const titles = {
        'pop-rock': 'Pop / Rock / Folk',
        'jazz': 'Jazz & Functional Harmony',
        'blues': 'Blues & Rock-Based',
        'classical': 'Classical & Cadences',
        'minor': 'Minor Key Progressions',
        'circle': 'Circle of Fifths',
        'modal': 'Modern & Modal'
    };
    return titles[category] || category;
}

// Export functions
window.initProgressions = initProgressions;
window.updateProgressions = updateProgressions;
window.toggleProgressions = toggleProgressions;
window.currentProgressionRoot = currentProgressionRoot;
window.isProgressionMinor = isProgressionMinor;

