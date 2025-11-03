// Custom progression builder
let customProgressionChords = [];
let customProgressionKey = 'E';
let customProgressionMinor = false;

// Initialize custom progression builder
function initCustomProgression() {
    const keySelect = document.getElementById('customProgressionKey');
    const minorCheckbox = document.getElementById('customProgressionMinor');
    const chordInput = document.getElementById('chordNameInput');
    const romanInput = document.getElementById('romanNumeralInput');
    const addChordBtn = document.getElementById('addChordByName');
    const addRomanBtn = document.getElementById('addChordByRoman');
    const clearBtn = document.getElementById('clearCustomProgression');
    const playBtn = document.getElementById('playCustomProgression');
    const modeButtons = document.querySelectorAll('.mode-btn');
    
    if (!keySelect || !minorCheckbox) return;
    
    // Key and mode changes
    keySelect.addEventListener('change', (e) => {
        customProgressionKey = e.target.value;
        updateCustomProgressionDisplay();
    });
    
    minorCheckbox.addEventListener('change', (e) => {
        customProgressionMinor = e.target.checked;
        updateCustomProgressionDisplay();
    });
    
    // Mode toggle
    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const mode = btn.dataset.mode;
            const chordMode = document.getElementById('chordInputMode');
            const romanMode = document.getElementById('romanInputMode');
            
            if (mode === 'chords') {
                chordMode.style.display = 'block';
                romanMode.style.display = 'none';
            } else {
                chordMode.style.display = 'none';
                romanMode.style.display = 'block';
            }
        });
    });
    
    // Add chord by name
    if (addChordBtn && chordInput) {
        addChordBtn.addEventListener('click', () => {
            const chordName = chordInput.value.trim();
            if (chordName) {
                addChordToProgression(chordName);
                chordInput.value = '';
                chordInput.focus();
            }
        });
        
        chordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addChordBtn.click();
            }
        });
    }
    
    // Add chord by Roman numeral
    if (addRomanBtn && romanInput) {
        addRomanBtn.addEventListener('click', () => {
            const roman = romanInput.value.trim();
            if (roman) {
                addRomanToProgression(roman);
                romanInput.value = '';
                romanInput.focus();
            }
        });
        
        romanInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addRomanBtn.click();
            }
        });
    }
    
    // Clear progression
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            customProgressionChords = [];
            updateCustomProgressionDisplay();
        });
    }
    
    // Play/show progression
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            if (customProgressionChords.length > 0) {
                displayCustomProgression();
            }
        });
    }
}

// Add chord by name
function addChordToProgression(chordName) {
    // Find the Roman numeral for this chord
    const roman = getRomanNumeralFromChord(chordName, customProgressionKey, customProgressionMinor);
    
    customProgressionChords.push({
        chordName: chordName,
        romanNumeral: roman
    });
    
    updateCustomProgressionDisplay();
}

// Add chord by Roman numeral
function addRomanToProgression(roman) {
    const chordName = getChordFromRomanNumeral(roman, customProgressionKey, customProgressionMinor);
    
    if (chordName) {
        customProgressionChords.push({
            chordName: chordName,
            romanNumeral: roman
        });
        
        updateCustomProgressionDisplay();
    }
}

// Get Roman numeral from chord name
function getRomanNumeralFromChord(chordName, key, isMinor) {
    const chordData = CHORD_DICTIONARY[chordName];
    if (!chordData) return '?';
    
    const rootMatch = chordName.match(/^([A-G][#b]?)/);
    if (!rootMatch) return '?';
    
    const chordRoot = rootMatch[1];
    const keyIndex = NOTE_NAMES.indexOf(key);
    const chordRootIndex = NOTE_NAMES.indexOf(chordRoot);
    
    if (keyIndex === -1 || chordRootIndex === -1) return '?';
    
    const degree = (chordRootIndex - keyIndex + 12) % 12;
    
    if (degree === 0) {
        return getRomanNumeralWithQuality(1, chordData.type, isMinor);
    } else if (degree === 2) {
        return getRomanNumeralWithQuality(2, chordData.type, isMinor);
    } else if (degree === 4) {
        return getRomanNumeralWithQuality(3, chordData.type, isMinor);
    } else if (degree === 5) {
        return getRomanNumeralWithQuality(4, chordData.type, isMinor);
    } else if (degree === 7) {
        return getRomanNumeralWithQuality(5, chordData.type, isMinor);
    } else if (degree === 9) {
        return getRomanNumeralWithQuality(6, chordData.type, isMinor);
    } else if (degree === 11) {
        return getRomanNumeralWithQuality(7, chordData.type, isMinor);
    }
    
    // Handle flat degrees
    if (degree === 1) return '♭II';
    if (degree === 3) return '♭III';
    if (degree === 6) return '♭VI';
    if (degree === 8) return '♭VII';
    if (degree === 10) return '♭IX';
    
    return '?';
}

// Get chord from Roman numeral
function getChordFromRomanNumeral(roman, key, isMinor) {
    // Normalize input
    roman = roman.trim();
    
    // Handle flat/sharp notation first (♭VII, ♭VI, bVII, etc.)
    const flatSharpMatch = roman.match(/^([♭#b])([ivx]+)([°+]?)/i);
    if (flatSharpMatch) {
        const accidental = flatSharpMatch[1];
        const romanNum = flatSharpMatch[2];
        const quality = flatSharpMatch[3];
        
        let degree = romanToDegree(romanNum);
        if (accidental === '♭' || accidental === 'b') {
            degree = -degree;
        }
        // Sharp would be positive degree (not commonly used)
        
        let chordType = null;
        if (quality === '°') {
            chordType = 'diminished';
        } else if (quality === '+') {
            chordType = 'augmented';
        }
        
        return getChordFromDegreeWithQuality(key, degree, isMinor, chordType);
    }
    
    // Parse standard Roman numeral (I, ii, iii, IV, V, vi, vii°, etc.)
    const romanMatch = roman.match(/^([ivx]+)([°+]?)/i);
    if (!romanMatch) {
        return null;
    }
    
    const romanNum = romanMatch[1];
    const quality = romanMatch[2];
    
    let degree = romanToDegree(romanNum);
    
    // Determine chord quality from Roman numeral casing and symbols
    let chordType = null;
    if (romanNum === romanNum.toLowerCase()) {
        // Lowercase = minor (but might be overridden by quality)
        if (quality === '°') {
            chordType = 'diminished';
        } else if (quality === '+') {
            chordType = 'augmented';
        } else {
            chordType = 'minor';
        }
    } else {
        // Uppercase = major (but might be overridden by quality)
        if (quality === '°') {
            chordType = 'diminished';
        } else if (quality === '+') {
            chordType = 'augmented';
        } else {
            chordType = 'major';
        }
    }
    
    return getChordFromDegreeWithQuality(key, degree, isMinor, chordType);
}

// Convert Roman numeral string to degree number
function romanToDegree(roman) {
    const romanMap = {
        'i': 1, 'I': 1,
        'ii': 2, 'II': 2,
        'iii': 3, 'III': 3,
        'iv': 4, 'IV': 4,
        'v': 5, 'V': 5,
        'vi': 6, 'VI': 6,
        'vii': 7, 'VII': 7
    };
    return romanMap[roman] || 1;
}

// Get Roman numeral string from degree and quality
// Uses the base getRomanNumeral from progressions.js and extends it with quality
function getRomanNumeralWithQuality(degree, chordType, isMinor) {
    // Use base function from progressions.js
    let roman = getRomanNumeral(degree, isMinor);
    
    // Adjust for explicit chord quality
    if (chordType === 'minor') {
        // Lowercase if not already
        if (roman === roman.toUpperCase() && !roman.includes('♭')) {
            roman = roman.toLowerCase();
        }
    } else if (chordType === 'diminished') {
        roman = roman.toLowerCase().replace('°', '') + '°';
    } else if (chordType === 'augmented') {
        roman = roman.toUpperCase().replace('+', '') + '+';
    }
    
    return roman;
}

// Get chord from degree with optional quality override
// Uses the existing getChordFromDegree from progressions.js but allows quality override
function getChordFromDegreeWithQuality(rootNote, degree, isMinor, qualityOverride = null) {
    // First try to get chord using existing function
    let chordName = getChordFromDegree(rootNote, degree, isMinor);
    
    if (!chordName) return null;
    
    // If quality override is provided, try to modify the chord
    if (qualityOverride) {
        const rootMatch = chordName.match(/^([A-G][#b]?)/);
        if (rootMatch) {
            const root = rootMatch[1];
            let newChordName = root;
            
            if (qualityOverride === 'minor') {
                newChordName += 'm';
            } else if (qualityOverride === 'diminished' || qualityOverride === 'dim') {
                newChordName += 'dim';
            } else if (qualityOverride === 'augmented' || qualityOverride === 'aug') {
                newChordName += 'aug';
            }
            
            // Check if modified chord exists
            if (CHORD_DICTIONARY[newChordName]) {
                return newChordName;
            }
        }
    }
    
    return chordName;
}

// Update custom progression display
function updateCustomProgressionDisplay() {
    const chordsContainer = document.getElementById('customProgressionChords');
    const romanContainer = document.getElementById('customProgressionRoman');
    
    if (!chordsContainer || !romanContainer) return;
    
    chordsContainer.innerHTML = '';
    romanContainer.innerHTML = '';
    
    customProgressionChords.forEach((item, index) => {
        // Update Roman numeral if key changed
        const updatedRoman = getRomanNumeralFromChord(item.chordName, customProgressionKey, customProgressionMinor);
        
        // Chord display
        const chordSpan = document.createElement('span');
        chordSpan.className = 'progression-chord-item';
        chordSpan.textContent = item.chordName;
        chordSpan.addEventListener('click', () => {
            displayChordOnFretboard(item.chordName);
        });
        chordsContainer.appendChild(chordSpan);
        
        // Roman numeral display
        const romanSpan = document.createElement('span');
        romanSpan.className = 'roman-numeral-item';
        romanSpan.textContent = updatedRoman;
        romanContainer.appendChild(romanSpan);
        
        // Add separator (except last)
        if (index < customProgressionChords.length - 1) {
            const chordSep = document.createElement('span');
            chordSep.className = 'progression-separator';
            chordSep.textContent = ' → ';
            chordsContainer.appendChild(chordSep);
            
            const romanSep = document.createElement('span');
            romanSep.className = 'progression-separator';
            romanSep.textContent = ' → ';
            romanContainer.appendChild(romanSep);
        }
    });
    
    // Update Roman numerals for all chords
    customProgressionChords.forEach((item, index) => {
        const roman = getRomanNumeralFromChord(item.chordName, customProgressionKey, customProgressionMinor);
        item.romanNumeral = roman;
    });
}

// Display custom progression with fretboards
function displayCustomProgression() {
    if (customProgressionChords.length === 0) return;
    
    // Scroll to fretboard
    const fretboardContainer = document.querySelector('.fretboard-container');
    if (fretboardContainer) {
        fretboardContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Display first chord
    displayChordOnFretboard(customProgressionChords[0].chordName);
    
    // Highlight progression in display
    const chordItems = document.querySelectorAll('.progression-chord-item');
    chordItems.forEach((item, index) => {
        if (index === 0) {
            item.classList.add('active');
        }
    });
}

// Export functions
window.initCustomProgression = initCustomProgression;
window.addChordToProgression = addChordToProgression;
window.addRomanToProgression = addRomanToProgression;

