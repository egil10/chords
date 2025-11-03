// Tree-style chord builder
let selectedRoot = null;
let selectedQuality = null;
let selectedExtension = null;

const QUALITY_OPTIONS = {
    '': { label: 'Major', suffix: '' },
    'm': { label: 'Minor', suffix: 'm' },
    'dim': { label: 'Diminished', suffix: 'dim' },
    'aug': { label: 'Augmented', suffix: 'aug' },
    'sus2': { label: 'Sus2', suffix: 'sus2' },
    'sus4': { label: 'Sus4', suffix: 'sus4' }
};

const EXTENSION_OPTIONS = {
    '': { label: 'None', suffix: '' },
    '7': { label: '7th', suffix: '7' },
    'maj7': { label: 'Maj7', suffix: 'maj7' },
    'm7': { label: 'm7', suffix: 'm7' },
    '9': { label: '9th', suffix: '9' },
    'maj9': { label: 'Maj9', suffix: 'maj9' },
    'm9': { label: 'm9', suffix: 'm9' },
    '11': { label: '11th', suffix: '11' },
    '13': { label: '13th', suffix: '13' },
    '6': { label: '6th', suffix: '6' },
    'm6': { label: 'm6', suffix: 'm6' },
    'add9': { label: 'add9', suffix: 'add9' }
};

// Get available qualities for a root note
function getAvailableQualities(root) {
    const available = [];
    const chordKeys = Object.keys(CHORD_DICTIONARY);
    
    Object.entries(QUALITY_OPTIONS).forEach(([key, opt]) => {
        const chordName = root + opt.suffix;
        // Check if this exact chord exists
        if (chordKeys.includes(chordName)) {
            available.push(key);
        }
    });
    
    return available;
}

// Get available extensions for a root + quality combination
function getAvailableExtensions(root, quality) {
    const available = [];
    const chordKeys = Object.keys(CHORD_DICTIONARY);
    
    const baseChord = root + QUALITY_OPTIONS[quality].suffix;
    
    Object.entries(EXTENSION_OPTIONS).forEach(([key, opt]) => {
        const chordName = baseChord + opt.suffix;
        // Check if this exact chord exists
        if (chordKeys.includes(chordName)) {
            available.push(key);
        }
    });
    
    return available;
}

// Update selection display
function updateSelectionDisplay() {
    const selectionDisplay = document.getElementById('builderSelectionDisplay');
    if (!selectionDisplay) return;
    
    let display = '';
    if (selectedRoot) {
        display = `<strong>${selectedRoot}</strong>`;
        if (selectedQuality) {
            display += ` <span style="opacity: 0.7;">→</span> <strong>${QUALITY_OPTIONS[selectedQuality].label}</strong>`;
            if (selectedExtension) {
                display += ` <span style="opacity: 0.7;">→</span> <strong>${EXTENSION_OPTIONS[selectedExtension].label}</strong>`;
            }
        }
    }
    
    selectionDisplay.innerHTML = display || 'Select a root note to begin';
}

function initChordBuilder() {
    const rootOptions = document.querySelectorAll('#rootOptions .builder-opt');
    const qualityStep = document.getElementById('qualityStep');
    const extensionStep = document.getElementById('extensionStep');
    const qualityOptions = document.getElementById('qualityOptions');
    const extensionOptions = document.getElementById('extensionOptions');
    const clearBuilder = document.getElementById('clearBuilder');
    
    // Exit early if builder tree doesn't exist (e.g., in Chord Library mode)
    if (rootOptions.length === 0) return;
    
    // Root selection
    rootOptions.forEach(btn => {
        btn.addEventListener('click', () => {
            selectedRoot = btn.dataset.root;
            selectedQuality = null;
            selectedExtension = null;
            
            // Update UI
            rootOptions.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            
            // Show quality step
            qualityStep.style.display = 'block';
            extensionStep.style.display = 'none';
            clearBuilder.style.display = 'block';
            
            // Populate quality options - only show available ones
            qualityOptions.innerHTML = '';
            const availableQualities = getAvailableQualities(selectedRoot);
            
            availableQualities.forEach(key => {
                const opt = QUALITY_OPTIONS[key];
                const btn = document.createElement('button');
                btn.className = 'builder-opt';
                btn.textContent = opt.label;
                btn.dataset.quality = key;
                btn.addEventListener('click', () => selectQuality(key));
                qualityOptions.appendChild(btn);
            });
            
            updateSelectionDisplay();
            updateChordSearch();
        });
    });
    
    // Clear builder
    if (clearBuilder) {
        clearBuilder.addEventListener('click', () => {
            selectedRoot = null;
            selectedQuality = null;
            selectedExtension = null;
            
            rootOptions.forEach(b => b.classList.remove('selected'));
            qualityStep.style.display = 'none';
            extensionStep.style.display = 'none';
            clearBuilder.style.display = 'none';
            
            if (qualityOptions) {
                qualityOptions.querySelectorAll('.builder-opt').forEach(b => b.classList.remove('selected'));
            }
            if (extensionOptions) {
                extensionOptions.querySelectorAll('.builder-opt').forEach(b => b.classList.remove('selected'));
            }
            
            updateSelectionDisplay();
            updateChordSearch();
        });
    }
}

function selectQuality(quality) {
    selectedQuality = quality;
    selectedExtension = null;
    
    const qualityButtons = document.querySelectorAll('#qualityOptions .builder-opt');
    qualityButtons.forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.quality === quality) {
            btn.classList.add('selected');
        }
    });
    
    // Show extension step
    const extensionStep = document.getElementById('extensionStep');
    const extensionOptions = document.getElementById('extensionOptions');
    
    extensionStep.style.display = 'block';
    
    // Populate extension options - only show available ones
    extensionOptions.innerHTML = '';
    const availableExtensions = getAvailableExtensions(selectedRoot, selectedQuality);
    
    availableExtensions.forEach(key => {
        const opt = EXTENSION_OPTIONS[key];
        const btn = document.createElement('button');
        btn.className = 'builder-opt';
        btn.textContent = opt.label;
        btn.dataset.extension = key;
        btn.addEventListener('click', () => selectExtension(key));
        extensionOptions.appendChild(btn);
    });
    
    updateSelectionDisplay();
    updateChordSearch();
}

function selectExtension(extension) {
    selectedExtension = extension;
    
    const extensionButtons = document.querySelectorAll('#extensionOptions .builder-opt');
    extensionButtons.forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.extension === extension) {
            btn.classList.add('selected');
        }
    });
    
    updateSelectionDisplay();
    updateChordSearch();
}

function updateChordSearch() {
    if (!selectedRoot) return;
    
    let chordName = selectedRoot;
    if (selectedQuality) {
        chordName += QUALITY_OPTIONS[selectedQuality].suffix;
    }
    if (selectedExtension) {
        chordName += EXTENSION_OPTIONS[selectedExtension].suffix;
    }
    
    // Update search and filter
    const searchInput = document.getElementById('chordSearch');
    if (searchInput) {
        searchInput.value = chordName;
        searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    // Display chord if it exists
    if (CHORD_DICTIONARY[chordName] && typeof displayChordOnFretboard === 'function') {
        displayChordOnFretboard(chordName);
    }
}

// Export
window.initChordBuilder = initChordBuilder;
window.updateChordSearch = updateChordSearch;

