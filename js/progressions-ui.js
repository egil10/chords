// Progression UI functionality
let currentProgressionRoot = 'E';
let isProgressionMinor = false;

// Initialize progression UI
function initProgressions() {
    const progressionRoot = document.getElementById('progressionRoot');
    const progressionMinor = document.getElementById('progressionMinor');
    
    if (!progressionRoot || !progressionMinor) return;
    
    // Update progressions when root or minor changes
    progressionRoot.addEventListener('change', (e) => {
        currentProgressionRoot = e.target.value;
        updateProgressions();
    });
    
    progressionMinor.addEventListener('change', (e) => {
        isProgressionMinor = e.target.checked;
        updateProgressions();
    });
    
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

window.toggleProgressions = toggleProgressions;
window.updateProgressions = updateProgressions;

// Update progressions display
function updateProgressions() {
    const progressionsList = document.getElementById('progressionsList');
    if (!progressionsList) return;
    
    progressionsList.innerHTML = '';
    
    // Iterate through all progression categories
    for (const [category, patterns] of Object.entries(PROGRESSION_PATTERNS)) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'progression-category';
        
        const categoryTitle = document.createElement('h4');
        categoryTitle.textContent = getCategoryTitle(category);
        categoryDiv.appendChild(categoryTitle);
        
        const patternsContainer = document.createElement('div');
        patternsContainer.className = 'patterns-grid';
        
        patterns.forEach(pattern => {
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
    const chords = generateProgression(currentProgressionRoot, pattern.pattern, isMinor);
    
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
    romanNumerals.textContent = chords.map(c => c.roman).join('–');
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

