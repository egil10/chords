// Fretboard component and interaction logic
const STRINGS = ['E', 'A', 'D', 'G', 'B', 'E'];
// STANDARD_TUNING is now in utils.js
const FRETS_TO_SHOW = 15;

let currentFingering = [null, null, null, null, null, null]; // [-1 for muted, fret number for fretted]

// Initialize the fretboard
function initFretboard() {
    const fretboard = document.getElementById('fretboard');
    fretboard.innerHTML = '';

    // Create strings
    for (let i = 0; i < STRINGS.length; i++) {
        const stringDiv = document.createElement('div');
        stringDiv.className = 'string';
        
        const label = document.createElement('div');
        label.className = 'string-label';
        label.textContent = STRINGS[i];
        
        const fretSegments = document.createElement('div');
        fretSegments.className = 'fret-segments';
        
        // Create fret segments (nut to 15th fret)
        for (let j = 0; j <= FRETS_TO_SHOW; j++) {
            const segment = document.createElement('div');
            segment.className = 'fret-segment';
            segment.dataset.string = i;
            segment.dataset.fret = j;
            segment.addEventListener('click', handleSegmentClick);
            fretSegments.appendChild(segment);
        }
        
        stringDiv.appendChild(label);
        stringDiv.appendChild(fretSegments);
        fretboard.appendChild(stringDiv);
    }
}

// Handle clicking on fret segments
function handleSegmentClick(e) {
    const string = parseInt(e.target.dataset.string);
    const fret = parseInt(e.target.dataset.fret);
    
    // Toggle: if already active, clear it
    if (currentFingering[string] === fret) {
        currentFingering[string] = null;
    } else {
        currentFingering[string] = fret;
    }
    
    updateFretboardDisplay();
    findMatchingChords();
}

// Update the visual display of the fretboard
function updateFretboardDisplay() {
    const segments = document.querySelectorAll('.fret-segment');
    
    segments.forEach(segment => {
        const string = parseInt(segment.dataset.string);
        const fret = parseInt(segment.dataset.fret);
        
        segment.className = 'fret-segment';
        
        if (currentFingering[string] === fret) {
            segment.classList.add('active');
            
            // Check if this is the root note
            const note = getNoteAtPosition(string, fret);
            const rootNote = getRootNote();
            if (note && rootNote && note === rootNote) {
                segment.classList.add('root');
            }
        }
    });
}

// Get the note at a specific string and fret position
function getNoteAtPosition(string, fret) {
    if (fret === null || fret === undefined) return null;
    const baseNote = STANDARD_TUNING[string];
    const noteValue = (baseNote + fret) % 12;
    return NOTE_NAMES[noteValue];
}

// Get the root note from current fingering
function getRootNote() {
    for (let i = 0; i < currentFingering.length; i++) {
        if (currentFingering[i] !== null) {
            return getNoteAtPosition(i, currentFingering[i]);
        }
    }
    return null;
}

// Find matching chords based on current fingering
function findMatchingChords() {
    const activeNotes = getActiveNotes();
    
    if (activeNotes.length === 0) {
        document.getElementById('currentChord').textContent = 'Click a chord to see it on the fretboard';
        document.getElementById('chordNotes').innerHTML = '<h4>Notes</h4><p>-</p>';
        document.getElementById('chordIntervals').innerHTML = '<h4>Intervals</h4><p>-</p>';
        return;
    }
    
    // Try to match against chord dictionary
    const matches = [];
    for (const [chordName, chordData] of Object.entries(CHORD_DICTIONARY)) {
        if (chordMatchesFingering(chordName, chordData, activeNotes)) {
            matches.push(chordName);
        }
    }
    
    if (matches.length > 0) {
        const primaryMatch = matches[0];
        const chordData = CHORD_DICTIONARY[primaryMatch];
        
        document.getElementById('currentChord').textContent = 
            matches.length > 1 
                ? `${primaryMatch} (${matches.length} matches found)` 
                : primaryMatch;
        
        const notesHtml = `<h4>Notes</h4><p>${chordData.notes.join(', ')}</p>`;
        const intervalsHtml = `<h4>Intervals</h4><p>${chordData.intervals.map(i => intervalName(i)).join(', ')}</p>`;
        
        document.getElementById('chordNotes').innerHTML = notesHtml;
        document.getElementById('chordIntervals').innerHTML = intervalsHtml;
    } else {
        document.getElementById('currentChord').textContent = `Custom: ${activeNotes.join(', ')}`;
        document.getElementById('chordNotes').innerHTML = '<h4>Notes</h4><p>-</p>';
        document.getElementById('chordIntervals').innerHTML = '<h4>Intervals</h4><p>-</p>';
    }
    
    // Highlight matching chord in library
    highlightChordInLibrary(matches);
}

// Get active notes from current fingering
function getActiveNotes() {
    const notes = [];
    for (let i = 0; i < currentFingering.length; i++) {
        if (currentFingering[i] !== null) {
            const note = getNoteAtPosition(i, currentFingering[i]);
            if (note && !notes.includes(note)) {
                notes.push(note);
            }
        }
    }
    return notes.sort((a, b) => NOTE_NAMES.indexOf(a) - NOTE_NAMES.indexOf(b));
}

// Check if a chord matches the current fingering
function chordMatchesFingering(chordName, chordData, activeNotes) {
    // Check if all chord notes are present
    const chordNoteSet = new Set(chordData.notes);
    const activeNoteSet = new Set(activeNotes);
    
    // For now, we'll do a simple match - all chord notes must be present
    // This could be enhanced to handle inversions better
    if (chordNoteSet.size !== activeNoteSet.size) {
        return false;
    }
    
    for (const note of chordNoteSet) {
        if (!activeNoteSet.has(note)) {
            return false;
        }
    }
    
    return true;
}

// Display a chord on the fretboard
function displayChordOnFretboard(chordName) {
    const chordData = CHORD_DICTIONARY[chordName];
    if (!chordData || !chordData.positions || chordData.positions.length === 0) {
        return;
    }
    
    // Use the first position
    const position = chordData.positions[0];
    currentFingering = position.frets;
    
    updateFretboardDisplay();
    updateChordInfo(chordName, chordData);
    displayAllVoicings(chordName);
}

// Display all voicings for a chord
function displayAllVoicings(chordName) {
    const chordData = CHORD_DICTIONARY[chordName];
    if (!chordData) return;
    
    const voicingsContainer = document.getElementById('voicingsContainer');
    const voicingsList = document.getElementById('voicingsList');
    
    // Find all chords with the same notes
    const matchingChords = findAllVoicingsByNotes(chordData.notes);
    
    if (matchingChords.length === 0) {
        voicingsContainer.style.display = 'none';
        return;
    }
    
    voicingsContainer.style.display = 'block';
    voicingsList.innerHTML = '';
    
    // Collect all positions from all matching chords
    const allVoicings = [];
    const seenFretCombos = new Set();
    
    for (const matchingChord of matchingChords) {
        const data = CHORD_DICTIONARY[matchingChord.chordName];
        if (data && data.positions) {
            for (let i = 0; i < data.positions.length; i++) {
                const frets = data.positions[i].frets;
                // Create unique key to avoid duplicates
                const fretKey = frets.join(',');
                
                if (!seenFretCombos.has(fretKey)) {
                    seenFretCombos.add(fretKey);
                    allVoicings.push({
                        chordName: matchingChord.chordName,
                        positionIndex: i,
                        frets: frets,
                        root: data.positions[i].root,
                        notes: matchingChord.notes,
                        type: matchingChord.type
                    });
                }
            }
        }
    }
    
    // Sort by simplicity (fewer frets, more open strings = simpler)
    allVoicings.sort((a, b) => {
        const aOpenStrings = a.frets.filter(f => f === 0).length;
        const bOpenStrings = b.frets.filter(f => f === 0).length;
        const aTotalFrets = a.frets.filter(f => f > 0).reduce((sum, f) => sum + f, 0);
        const bTotalFrets = b.frets.filter(f => f > 0).reduce((sum, f) => sum + f, 0);
        
        // Prefer more open strings, then fewer total frets
        if (bOpenStrings !== aOpenStrings) {
            return bOpenStrings - aOpenStrings;
        }
        return aTotalFrets - bTotalFrets;
    });
    
    // Use document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    // Create voicing items
    allVoicings.forEach((voicing, index) => {
        const voicingItem = document.createElement('div');
        voicingItem.className = 'voicing-item';
        voicingItem.dataset.chordName = voicing.chordName;
        voicingItem.dataset.positionIndex = voicing.positionIndex;
        
        // Create ASCII fretboard representation
        const fretboardDisplay = createASCIIFretboard(voicing.frets);
        
        const label = voicing.chordName === chordName 
            ? (voicing.positionIndex === 0 ? 'Main' : `Voicing ${voicing.positionIndex + 1}`)
            : `${voicing.chordName} (${voicing.type})`;
        
        voicingItem.innerHTML = `
            <div class="voicing-fretboard">${fretboardDisplay}</div>
            <div class="voicing-label">${label}</div>
        `;
        
        voicingItem.addEventListener('click', () => {
            currentFingering = voicing.frets;
            updateFretboardDisplay();
            
            // Mark as active
            document.querySelectorAll('.voicing-item').forEach(item => {
                item.classList.remove('active');
            });
            voicingItem.classList.add('active');
            
            // Scroll to fretboard
            document.getElementById('fretboard').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        
        // Mark first voicing as active
        if (voicing.chordName === chordName && voicing.positionIndex === 0) {
            voicingItem.classList.add('active');
        }
        
        fragment.appendChild(voicingItem);
    });
    
    // Update DOM in one operation
    voicingsList.appendChild(fragment);
}

// Create ASCII representation of fretboard
function createASCIIFretboard(frets) {
    const strings = ['E', 'A', 'D', 'G', 'B', 'e'];
    let display = '';
    
    for (let i = 0; i < strings.length; i++) {
        const fret = frets[i];
        let fretDisplay;
        
        if (fret === -1) {
            fretDisplay = '✕';
        } else if (fret === 0) {
            fretDisplay = '○';
        } else {
            fretDisplay = fret.toString();
        }
        
        display += `${strings[i]}|${fretDisplay.padStart(2, ' ')}\n`;
    }
    
    return display;
}

// Update chord information display
function updateChordInfo(chordName, chordData) {
    document.getElementById('currentChord').textContent = chordName;
    
    const notesHtml = `<h4>Notes</h4><p>${chordData.notes.join(', ')}</p>`;
    const intervalsHtml = `<h4>Intervals</h4><p>${chordData.intervals.map(i => intervalName(i)).join(', ')}</p>`;
    
    document.getElementById('chordNotes').innerHTML = notesHtml;
    document.getElementById('chordIntervals').innerHTML = intervalsHtml;
    
    // Update scales for this chord
    if (typeof updateScaleForChord === 'function') {
        updateScaleForChord(chordName);
    }
}

// Highlight a chord in the library
function highlightChordInLibrary(chordNames) {
    const chordItems = document.querySelectorAll('.chord-item');
    chordItems.forEach(item => {
        item.classList.remove('active');
        if (chordNames.includes(item.dataset.chord)) {
            item.classList.add('active');
        }
    });
}

// Clear the fretboard
function clearFretboard() {
    currentFingering = [null, null, null, null, null, null];
    updateFretboardDisplay();
    findMatchingChords();
    
    // Hide voicings container
    const voicingsContainer = document.getElementById('voicingsContainer');
    if (voicingsContainer) {
        voicingsContainer.style.display = 'none';
    }
}

// Export functions
window.initFretboard = initFretboard;
window.displayChordOnFretboard = displayChordOnFretboard;
window.clearFretboard = clearFretboard;
window.getActiveNotes = getActiveNotes;

