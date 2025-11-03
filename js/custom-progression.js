// Custom progression builder
let customProgressionChords = [];
let customProgressionKey = 'E';
let customProgressionMinor = false;
let customProgressionVoicings = {}; // Store selected voicing for each chord: { chordName: { frets: [...], positionIndex: 0 } }

// Add custom locked chord to progression
function addCustomChordToProgression(lockedChord) {
    // Create a special entry for locked chords
    customProgressionChords.push({
        chordName: lockedChord.name,
        romanNumeral: '?', // Will be calculated if possible
        isCustom: true,
        customFrets: lockedChord.frets,
        customNotes: lockedChord.notes
    });
    
    // Store voicing
    customProgressionVoicings[lockedChord.name] = {
        frets: lockedChord.frets,
        positionIndex: 0,
        isCustom: true
    };
    
    updateCustomProgressionDisplay();
}

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
            customProgressionVoicings = {};
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
    
    // Get first voicing for this chord
    const chordData = CHORD_DICTIONARY[chordName];
    let defaultVoicing = null;
    if (chordData && chordData.positions && chordData.positions.length > 0) {
        defaultVoicing = {
            frets: chordData.positions[0].frets,
            positionIndex: 0
        };
    }
    
    customProgressionChords.push({
        chordName: chordName,
        romanNumeral: roman
    });
    
    // Store default voicing
    if (defaultVoicing) {
        customProgressionVoicings[chordName] = defaultVoicing;
    }
    
    updateCustomProgressionDisplay();
}

// Add chord by Roman numeral
function addRomanToProgression(roman) {
    const chordName = getChordFromRomanNumeral(roman, customProgressionKey, customProgressionMinor);
    
    if (chordName) {
        // Get first voicing for this chord
        const chordData = CHORD_DICTIONARY[chordName];
        let defaultVoicing = null;
        if (chordData && chordData.positions && chordData.positions.length > 0) {
            defaultVoicing = {
                frets: chordData.positions[0].frets,
                positionIndex: 0
            };
        }
        
        customProgressionChords.push({
            chordName: chordName,
            romanNumeral: roman
        });
        
        // Store default voicing
        if (defaultVoicing) {
            customProgressionVoicings[chordName] = defaultVoicing;
        }
        
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
        
        // Chord display with voicing selector
        const chordWrapper = document.createElement('div');
        chordWrapper.className = 'progression-chord-wrapper';
        
        const chordSpan = document.createElement('span');
        chordSpan.className = 'progression-chord-item';
        chordSpan.textContent = item.chordName;
        chordSpan.addEventListener('click', () => {
            showVoicingSelector(item.chordName, chordWrapper);
        });
        chordWrapper.appendChild(chordSpan);
        
        // Voicing indicator
        const voicingBadge = document.createElement('span');
        voicingBadge.className = 'voicing-badge';
        voicingBadge.textContent = '🎸';
        voicingBadge.title = 'Click to select voicing';
        voicingBadge.addEventListener('click', (e) => {
            e.stopPropagation();
            showVoicingSelector(item.chordName, chordWrapper);
        });
        chordWrapper.appendChild(voicingBadge);
        
        chordsContainer.appendChild(chordWrapper);
        
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
    
    // Auto-detect and suggest key
    detectProgressionKey();
}

// Show voicing selector for a chord
function showVoicingSelector(chordName, wrapperElement) {
    // Check if this is a custom locked chord
    const customChord = customProgressionChords.find(c => c.chordName === chordName && c.isCustom);
    if (customChord) {
        // For custom chords, just use the stored voicing
        return;
    }
    
    const chordData = CHORD_DICTIONARY[chordName];
    if (!chordData) return;
    
    // Find all voicings for this chord (using global function from chord-dictionary.js)
    const matchingChords = window.findAllVoicingsByNotes ? window.findAllVoicingsByNotes(chordData.notes) : [];
    const allVoicings = [];
    const seenFretCombos = new Set();
    
    for (const matchingChord of matchingChords) {
        const data = CHORD_DICTIONARY[matchingChord.chordName];
        if (data && data.positions) {
            for (let i = 0; i < data.positions.length; i++) {
                const frets = data.positions[i].frets;
                const fretKey = frets.join(',');
                
                if (!seenFretCombos.has(fretKey)) {
                    seenFretCombos.add(fretKey);
                    allVoicings.push({
                        chordName: matchingChord.chordName,
                        positionIndex: i,
                        frets: frets,
                        root: data.positions[i].root
                    });
                }
            }
        }
    }
    
    // Sort by simplicity
    allVoicings.sort((a, b) => {
        const aOpenStrings = a.frets.filter(f => f === 0).length;
        const bOpenStrings = b.frets.filter(f => f === 0).length;
        const aTotalFrets = a.frets.filter(f => f > 0).reduce((sum, f) => sum + f, 0);
        const bTotalFrets = b.frets.filter(f => f > 0).reduce((sum, f) => sum + f, 0);
        if (bOpenStrings !== aOpenStrings) {
            return bOpenStrings - aOpenStrings;
        }
        return aTotalFrets - bTotalFrets;
    });
    
    // Remove existing selector if present
    const existingSelector = wrapperElement.querySelector('.voicing-selector');
    if (existingSelector) {
        existingSelector.remove();
        return;
    }
    
    // Create voicing selector dropdown
    const selector = document.createElement('div');
    selector.className = 'voicing-selector';
    
    const title = document.createElement('div');
    title.className = 'voicing-selector-title';
    title.textContent = `Select voicing for ${chordName}:`;
    selector.appendChild(title);
    
    const voicingsList = document.createElement('div');
    voicingsList.className = 'voicing-selector-list';
    
    allVoicings.slice(0, 12).forEach((voicing, idx) => {
        const voicingItem = document.createElement('div');
        voicingItem.className = 'voicing-selector-item';
        
        const fretboardDisplay = window.createASCIIFretboard ? window.createASCIIFretboard(voicing.frets) : '';
        voicingItem.innerHTML = `
            <div class="voicing-selector-fretboard">${fretboardDisplay}</div>
            <div class="voicing-selector-label">Voicing ${idx + 1}</div>
        `;
        
        voicingItem.addEventListener('click', () => {
            customProgressionVoicings[chordName] = {
                frets: voicing.frets,
                positionIndex: voicing.positionIndex
            };
            selector.remove();
            updateCustomProgressionDisplay();
        });
        
        voicingsList.appendChild(voicingItem);
    });
    
    selector.appendChild(voicingsList);
    wrapperElement.appendChild(selector);
}

// Detect key from progression
function detectProgressionKey() {
    if (customProgressionChords.length === 0) return;
    
    // Try to detect the most likely key based on chord roots
    const chordRoots = customProgressionChords.map(item => {
        const match = item.chordName.match(/^([A-G][#b]?)/);
        return match ? match[1] : null;
    }).filter(r => r);
    
    if (chordRoots.length === 0) return;
    
    // Find the most common root (likely the key)
    const rootCounts = {};
    chordRoots.forEach(root => {
        rootCounts[root] = (rootCounts[root] || 0) + 1;
    });
    
    const mostCommonRoot = Object.entries(rootCounts)
        .sort((a, b) => b[1] - a[1])[0][0];
    
    // Update key selector if it matches
    const keySelect = document.getElementById('customProgressionKey');
    if (keySelect && mostCommonRoot) {
        // Try to match enharmonic equivalents
        const rootIndex = NOTE_NAMES.indexOf(mostCommonRoot);
        if (rootIndex !== -1) {
            const suggestedKey = NOTE_NAMES[rootIndex];
            if (keySelect.querySelector(`option[value="${suggestedKey}"]`)) {
                keySelect.value = suggestedKey;
                customProgressionKey = suggestedKey;
            }
        }
    }
}

// Display custom progression with fretboards
function displayCustomProgression() {
    if (customProgressionChords.length === 0) return;
    
    // Create progression display section
    let progressionDisplay = document.getElementById('progressionDisplay');
    if (!progressionDisplay) {
        progressionDisplay = document.createElement('div');
        progressionDisplay.id = 'progressionDisplay';
        progressionDisplay.className = 'progression-display-section';
        
        const container = document.querySelector('.fretboard-container');
        if (container) {
            container.insertBefore(progressionDisplay, container.firstChild);
        }
    }
    
    progressionDisplay.innerHTML = '';
    
    // Detect key
    detectProgressionKey();
    
    // Key suggestion
    const keyInfo = document.createElement('div');
    keyInfo.className = 'progression-key-info';
    keyInfo.innerHTML = `
        <h3>Progression in ${customProgressionKey}${customProgressionMinor ? 'm' : ''}</h3>
        <p>Suggested scales for soloing: ${getRecommendedScalesForProgression()}</p>
    `;
    progressionDisplay.appendChild(keyInfo);
    
    // Display each chord with selected voicing
    const progressionChords = document.createElement('div');
    progressionChords.className = 'progression-chords-display';
    
    customProgressionChords.forEach((item, index) => {
        const chordCard = document.createElement('div');
        chordCard.className = 'progression-chord-card';
        
        const chordHeader = document.createElement('div');
        chordHeader.className = 'progression-chord-header';
        chordHeader.innerHTML = `
            <span class="progression-chord-name">${item.chordName}</span>
            <span class="progression-chord-roman">${item.romanNumeral || ''}</span>
        `;
        chordCard.appendChild(chordHeader);
        
        // Get selected voicing or use first
        const selectedVoicing = customProgressionVoicings[item.chordName];
        const chordData = CHORD_DICTIONARY[item.chordName];
        
        // Handle custom locked chords
        if (item.isCustom && selectedVoicing) {
            // Display custom chord voicing
            const voicingFretboard = document.createElement('div');
            voicingFretboard.className = 'progression-voicing-fretboard';
            
            // Create mini fretboard
            const miniFretboard = createMiniFretboard(selectedVoicing.frets);
            voicingFretboard.appendChild(miniFretboard);
            
            chordCard.appendChild(voicingFretboard);
            
            // Click to show full fretboard
            chordCard.addEventListener('click', () => {
                // Convert -1 to null for currentFingering
                const frets = selectedVoicing.frets.map(f => f === -1 ? null : f);
                window.currentFingering = frets;
                if (typeof updateFretboardDisplay === 'function') {
                    updateFretboardDisplay();
                }
                
                // Update chord info
                document.getElementById('currentChord').textContent = item.chordName;
                document.getElementById('chordNotes').innerHTML = `<h4>Notes</h4><p>${item.customNotes ? item.customNotes.join(', ') : ''}</p>`;
                document.getElementById('chordIntervals').innerHTML = '<h4>Intervals</h4><p>Custom Chord</p>';
            });
        } else if (selectedVoicing && chordData) {
            // Display selected voicing for regular chords
            const voicingFretboard = document.createElement('div');
            voicingFretboard.className = 'progression-voicing-fretboard';
            
            // Create mini fretboard
            const miniFretboard = createMiniFretboard(selectedVoicing.frets);
            voicingFretboard.appendChild(miniFretboard);
            
            chordCard.appendChild(voicingFretboard);
            
            // Click to show full fretboard
            chordCard.addEventListener('click', () => {
                window.currentFingering = selectedVoicing.frets;
                if (typeof updateFretboardDisplay === 'function') {
                    updateFretboardDisplay();
                }
                if (typeof displayChordOnFretboard === 'function') {
                    displayChordOnFretboard(item.chordName);
                }
            });
        }
        
        progressionChords.appendChild(chordCard);
    });
    
    progressionDisplay.appendChild(progressionChords);
    
    // Show scale maps
    const scaleMaps = createProgressionScaleMaps();
    if (scaleMaps) {
        progressionDisplay.appendChild(scaleMaps);
    }
    
    // Scroll to display
    progressionDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Get recommended scales for progression
function getRecommendedScalesForProgression() {
    if (customProgressionChords.length === 0) return '';
    
    const scales = [];
    
    if (customProgressionMinor) {
        scales.push('Natural Minor', 'Minor Pentatonic', 'Harmonic Minor');
    } else {
        scales.push('Major', 'Major Pentatonic', 'Mixolydian');
    }
    
    // Check for dominant chords
    const hasDominant = customProgressionChords.some(item => 
        item.chordName.includes('7') && !item.chordName.includes('maj7')
    );
    
    if (hasDominant) {
        scales.push('Blues Scale');
    }
    
    return scales.join(', ');
}

// Create mini fretboard for progression display
function createMiniFretboard(frets) {
    const container = document.createElement('div');
    container.className = 'mini-fretboard';
    
    const strings = ['e', 'B', 'G', 'D', 'A', 'E'];
    const stringIndices = [5, 4, 3, 2, 1, 0];
    
    // Find the highest fret
    const activeFrets = frets.filter(f => f > 0);
    const maxFret = activeFrets.length > 0 ? Math.max(...activeFrets) : 0;
    const minFret = activeFrets.length > 0 ? Math.min(...activeFrets) : 0;
    
    // Show frets from minFret to maxFret + 1 (or 0-4 if all open)
    const startFret = Math.max(0, minFret - 1);
    const endFret = Math.min(15, maxFret + 2);
    const fretRange = endFret - startFret;
    
    // Fret numbers
    const fretNumbers = document.createElement('div');
    fretNumbers.className = 'mini-fret-numbers';
    for (let f = startFret; f <= endFret; f++) {
        const num = document.createElement('span');
        num.className = 'mini-fret-number';
        num.textContent = f;
        fretNumbers.appendChild(num);
    }
    container.appendChild(fretNumbers);
    
    // Strings
    for (let i = 0; i < strings.length; i++) {
        const stringIndex = stringIndices[i];
        const stringDiv = document.createElement('div');
        stringDiv.className = 'mini-string';
        
        const stringLabel = document.createElement('span');
        stringLabel.className = 'mini-string-label';
        stringLabel.textContent = strings[i];
        stringDiv.appendChild(stringLabel);
        
        const fretsDiv = document.createElement('div');
        fretsDiv.className = 'mini-frets';
        
        for (let f = startFret; f <= endFret; f++) {
            const fretCell = document.createElement('div');
            fretCell.className = 'mini-fret-cell';
            
            const fret = frets[stringIndex];
            if (fret === f) {
                fretCell.classList.add('active');
                const note = window.getNoteAtPosition ? window.getNoteAtPosition(stringIndex, fret) : '';
                if (note) {
                    const noteLabel = document.createElement('span');
                    noteLabel.className = 'mini-fret-note';
                    noteLabel.textContent = note;
                    fretCell.appendChild(noteLabel);
                }
            } else if (fret === -1) {
                fretCell.classList.add('muted');
                fretCell.textContent = '✕';
            }
            
            fretsDiv.appendChild(fretCell);
        }
        
        stringDiv.appendChild(fretsDiv);
        container.appendChild(stringDiv);
    }
    
    return container;
}

// Create scale maps for progression
function createProgressionScaleMaps() {
    if (!customProgressionKey) return null;
    
    const scaleSection = document.createElement('div');
    scaleSection.className = 'progression-scales-section';
    scaleSection.innerHTML = '<h4>Solo Scale Maps</h4>';
    
    const scalesContainer = document.createElement('div');
    scalesContainer.className = 'progression-scales-container';
    
    // Get recommended scales
    const recommendedScales = customProgressionMinor 
        ? ['minor-pentatonic', 'minor', 'harmonic-minor']
        : ['major-pentatonic', 'major', 'mixolydian'];
    
    recommendedScales.forEach(scaleType => {
        const scaleTemplate = SCALE_BINARY_TEMPLATES[scaleType];
        if (!scaleTemplate) return;
        
        const scaleCard = document.createElement('div');
        scaleCard.className = 'progression-scale-card';
        
        const scaleTitle = document.createElement('div');
        scaleTitle.className = 'progression-scale-title';
        scaleTitle.textContent = `${customProgressionKey} ${scaleTemplate.name}`;
        scaleCard.appendChild(scaleTitle);
        
        // Create mini scale map
        const scaleNotes = getScaleNotes(customProgressionKey, scaleType);
        const notesLabel = document.createElement('div');
        notesLabel.className = 'progression-scale-notes';
        notesLabel.textContent = `Notes: ${scaleNotes.join(', ')}`;
        scaleCard.appendChild(notesLabel);
        
        // Click to show full scale
        scaleCard.addEventListener('click', () => {
            // Switch to scales section and set the scale
            const scalesSection = document.getElementById('scalesSection');
            const scaleTypeSelect = document.getElementById('scaleType');
            const scaleRootSelect = document.getElementById('scaleRoot');
            
            if (scaleTypeSelect && scaleRootSelect) {
                scaleTypeSelect.value = scaleType;
                scaleRootSelect.value = customProgressionKey;
                
                if (typeof updateScales === 'function') {
                    updateScales();
                }
                
                // Switch to scales section
                const navBtn = document.querySelector('.nav-btn[data-section="scales"]');
                if (navBtn) {
                    navBtn.click();
                }
            }
        });
        
        scalesContainer.appendChild(scaleCard);
    });
    
    scaleSection.appendChild(scalesContainer);
    return scaleSection;
}

// Export functions
window.initCustomProgression = initCustomProgression;
window.addChordToProgression = addChordToProgression;
window.addRomanToProgression = addRomanToProgression;
window.addCustomChordToProgression = addCustomChordToProgression;

