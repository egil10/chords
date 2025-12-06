// Simple Chord Finder App
const STRINGS = ['E', 'A', 'D', 'G', 'B', 'E']; // Low to high
const FRETS_TO_SHOW = 12;
const MAX_FRET = 12;

// State: each string can be null (unplayed), 0 (open), -1 (muted), or fret number
let currentFingering = [null, null, null, null, null, null];

// Initialize the app
function init() {
    createFretboard();
    updateDisplay();
    // Show all chords initially (progressive filtering)
    const chordListEl = document.getElementById('chordList');
    chordListEl.innerHTML = '<p class="placeholder">All chords - click fretboard to filter</p>';
    setTimeout(showAllChords, 100); // Small delay to ensure DOM is ready
    
    // Set up reset button
    const resetBtn = document.getElementById('resetFretboard');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFretboard);
    }
}

// Reset the fretboard
function resetFretboard() {
    currentFingering = [null, null, null, null, null, null];
    updateDisplay();
    showAllChords();
}

// Create the monowidth text fretboard
function createFretboard() {
    const fretboardEl = document.getElementById('fretboard');
    const fretNumbersEl = document.getElementById('fretNumbers');
    
    fretboardEl.innerHTML = '';
    fretNumbersEl.innerHTML = '';
    
    // Create fret numbers row (on same line as strings)
    const numbersContainer = document.createElement('div');
    numbersContainer.className = 'fret-numbers-container';
    
    // Add spacing for string labels (same width as string label)
    const spacer = document.createElement('span');
    spacer.className = 'fret-number-spacer';
    numbersContainer.appendChild(spacer);
    
    // Add fret numbers (align with fret columns)
    for (let fret = 0; fret <= FRETS_TO_SHOW; fret++) {
        const numSpan = document.createElement('span');
        numSpan.className = 'fret-number';
        numSpan.textContent = fret.toString();
        numbersContainer.appendChild(numSpan);
    }
    
    fretNumbersEl.appendChild(numbersContainer);
    
    // Create strings (high E at top, low E at bottom for display)
    for (let i = STRINGS.length - 1; i >= 0; i--) {
        const stringDiv = document.createElement('div');
        stringDiv.className = 'string-row';
        stringDiv.dataset.stringIndex = i;
        
        // String label (on same line)
        const label = document.createElement('span');
        label.className = 'string-label';
        label.textContent = STRINGS[i];
        stringDiv.appendChild(label);
        
        // Fret positions
        const fretsContainer = document.createElement('span');
        fretsContainer.className = 'frets-container';
        
        for (let fret = 0; fret <= FRETS_TO_SHOW; fret++) {
            const fretCell = document.createElement('span');
            fretCell.className = 'fret-cell';
            fretCell.dataset.stringIndex = i;
            fretCell.dataset.fret = fret;
            fretCell.textContent = '—'; // Em dash for wider appearance
            fretCell.addEventListener('click', () => handleFretClick(i, fret));
            fretsContainer.appendChild(fretCell);
        }
        
        stringDiv.appendChild(fretsContainer);
        fretboardEl.appendChild(stringDiv);
    }
}

// Handle clicking on a fret position
function handleFretClick(stringIndex, fret) {
    const currentState = currentFingering[stringIndex];
    
    if (fret === 0) {
        // At nut: cycle between null -> 0 (open) -> -1 (muted) -> null
        if (currentState === null) {
            currentFingering[stringIndex] = 0;
        } else if (currentState === 0) {
            currentFingering[stringIndex] = -1;
        } else {
            currentFingering[stringIndex] = null;
        }
    } else {
        // At other frets: toggle between null and fret number
        if (currentState === fret) {
            currentFingering[stringIndex] = null;
        } else {
            currentFingering[stringIndex] = fret;
        }
    }
    
    updateDisplay();
    findMatchingChords();
}

// Display a chord on the fretboard
function displayChordOnFretboard(chordName) {
    const chordData = CHORD_DICTIONARY[chordName];
    if (!chordData || !chordData.positions || chordData.positions.length === 0) {
        return;
    }
    
    // Use the first position
    const position = chordData.positions[0];
    currentFingering = [...position.frets];
    
    updateDisplay();
    findMatchingChords();
}

// Update the visual display of the fretboard
function updateDisplay() {
    const fretCells = document.querySelectorAll('.fret-cell');
    
    fretCells.forEach(cell => {
        const stringIndex = parseInt(cell.dataset.stringIndex);
        const fret = parseInt(cell.dataset.fret);
        const state = currentFingering[stringIndex];
        
        cell.textContent = '—'; // Em dash for wider appearance
        cell.className = 'fret-cell';
        
        if (state === fret) {
            // Active fret - use Lucide circle icon
            cell.innerHTML = '<span class="fret-marker"><i data-lucide="circle"></i></span>';
            cell.classList.add('active');
        } else if (fret === 0 && state === 0) {
            // Open string - use Lucide circle icon
            cell.innerHTML = '<span class="fret-marker"><i data-lucide="circle"></i></span>';
            cell.classList.add('open');
        } else if (fret === 0 && state === -1) {
            // Muted string - use Lucide x icon
            cell.innerHTML = '<span class="fret-marker"><i data-lucide="x"></i></span>';
            cell.classList.add('muted');
        }
    });
    
    // Re-initialize Lucide icons for newly added icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Get active notes from current fingering
function getActiveNotes() {
    const notes = [];
    for (let i = 0; i < currentFingering.length; i++) {
        const fret = currentFingering[i];
        if (fret !== null && fret >= 0) {
            const note = getNoteAtPosition(i, fret);
            if (note && !notes.includes(note)) {
                notes.push(note);
            }
        }
    }
    return notes.sort((a, b) => {
        const aIndex = NOTE_NAMES.indexOf(normalizeNoteName(a));
        const bIndex = NOTE_NAMES.indexOf(normalizeNoteName(b));
        return aIndex - bIndex;
    });
}

// Get note at string and fret position
function getNoteAtPosition(string, fret) {
    if (fret === null || fret === undefined) return null;
    const baseNote = STANDARD_TUNING[string];
    const noteValue = (baseNote + fret) % 12;
    return NOTE_NAMES[noteValue];
}

// Show all chords initially
function showAllChords() {
    const allChords = [];
    
    // Get all chords from dictionary
    for (const [chordName, chordData] of Object.entries(CHORD_DICTIONARY)) {
        allChords.push({
            name: chordName,
            type: chordData.type,
            notes: chordData.notes,
            intervals: chordData.intervals
        });
    }
    
    // Sort by type preference then alphabetically
    const typePriority = { 'major': 1, 'minor': 2, '7': 3, 'maj7': 4, 'm7': 5 };
    allChords.sort((a, b) => {
        const aPriority = typePriority[a.type] || 10;
        const bPriority = typePriority[b.type] || 10;
        if (aPriority !== bPriority) return aPriority - bPriority;
        return a.name.localeCompare(b.name);
    });
    
    renderChordList(allChords);
}

// Find matching chords - progressively filter
function findMatchingChords() {
    const activeNotes = getActiveNotes();
    
    if (activeNotes.length === 0) {
        showAllChords();
        return;
    }
    
    const matches = [];
    
    // Normalize active notes
    const normalizedActiveNotes = activeNotes.map(n => normalizeNoteName(n));
    const activeNoteSet = new Set(normalizedActiveNotes);
    
    // Check each chord in dictionary
    // Include chord if ALL active notes are present in the chord's notes
    for (const [chordName, chordData] of Object.entries(CHORD_DICTIONARY)) {
        const normalizedChordNotes = chordData.notes.map(n => normalizeNoteName(n));
        const chordNoteSet = new Set(normalizedChordNotes);
        
        // Check if all active notes are present in chord notes
        let allActiveNotesInChord = true;
        for (const note of activeNoteSet) {
            if (!chordNoteSet.has(note)) {
                allActiveNotesInChord = false;
                break;
            }
        }
        
        if (allActiveNotesInChord) {
            // Determine match type
            const matchType = activeNoteSet.size === chordNoteSet.size ? 'exact' : 'partial';
            const extraNotes = matchType === 'partial' 
                ? Array.from(chordNoteSet).filter(n => !activeNoteSet.has(n))
                : [];
            
            matches.push({
                name: chordName,
                type: chordData.type,
                notes: chordData.notes,
                intervals: chordData.intervals,
                matchType: matchType,
                extraNotes: extraNotes
            });
        }
        // Otherwise, chord is excluded (not shown)
    }
    
    // Sort matches: exact first, then by type priority, then alphabetically
    const typePriority = { 'major': 1, 'minor': 2, '7': 3, 'maj7': 4, 'm7': 5 };
    
    matches.sort((a, b) => {
        // Exact matches first
        if (a.matchType !== b.matchType) {
            return a.matchType === 'exact' ? -1 : 1;
        }
        // Then by type priority
        const aPriority = typePriority[a.type] || 10;
        const bPriority = typePriority[b.type] || 10;
        if (aPriority !== bPriority) return aPriority - bPriority;
        // Then alphabetically
        return a.name.localeCompare(b.name);
    });
    
    renderChordList(matches);
}

// Render chord list - only shows matching chords
function renderChordList(chords) {
    const chordListEl = document.getElementById('chordList');
    
    if (chords.length === 0) {
        chordListEl.innerHTML = '<p class="placeholder">No matching chords</p>';
        return;
    }
    
    // Sort matches
    const typePriority = { 'major': 1, 'minor': 2, '7': 3, 'maj7': 4, 'm7': 5 };
    chords.sort((a, b) => {
        const aPriority = typePriority[a.type] || 10;
        const bPriority = typePriority[b.type] || 10;
        if (aPriority !== bPriority) return aPriority - bPriority;
        return a.name.localeCompare(b.name);
    });
    
    chordListEl.innerHTML = chords.map(chord => {
        const isPartial = chord.matchType === 'partial';
        const extraInfo = isPartial && chord.extraNotes && chord.extraNotes.length > 0 
            ? `<span class="chord-extra">+ ${chord.extraNotes.join(', ')}</span>`
            : '';
        
        return `
            <div class="chord-item ${isPartial ? 'partial-match' : 'exact-match'}" 
                 data-chord-name="${chord.name}">
                <div class="chord-name">${chord.name}${isPartial ? '<span class="match-badge">partial</span>' : ''}</div>
                <div class="chord-type">${chord.type}</div>
                <div class="chord-notes">${chord.notes.join(', ')}${extraInfo}</div>
            </div>
        `;
    }).join('');
    
    // Add click handlers to chord items
    document.querySelectorAll('.chord-item').forEach(item => {
        // Remove existing listeners by cloning
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);
        
        // Add new listener
        newItem.addEventListener('click', () => {
            const chordName = newItem.dataset.chordName;
            displayChordOnFretboard(chordName);
        });
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
