// Simple Chord Finder App
const STRINGS = ['E', 'A', 'D', 'G', 'B', 'E']; // Low to high
const FRETS_TO_SHOW = 12;
const MAX_FRET = 12;

// State: each string can be null (unplayed), 0 (open), -1 (muted), or fret number
let currentFingering = [null, null, null, null, null, null];

// View mode: 'icons' or 'notes'
let viewMode = 'icons';

// Search filter
let searchFilter = '';

// Performance optimization: debounce and animation frame tracking
let updateAnimationFrame = null;
let searchTimeout = null;

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
    
    // Set up toggle notes view button
    const toggleBtn = document.getElementById('toggleNotesView');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleNotesView);
    }
    
    // Set up chord search input with debouncing
    const searchInput = document.getElementById('chordSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchFilter = e.target.value.toLowerCase().trim();
            // Debounce search for better performance
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
            searchTimeout = setTimeout(() => {
                filterChordList();
            }, 150);
        }, { passive: true });
    }
}

// Reset the fretboard
function resetFretboard() {
    currentFingering = [null, null, null, null, null, null];
    currentChordName = null;
    currentVoicingIndex = 0;
    
    // Hide voicing navigation
    const voicingNavContainer = document.getElementById('voicingNavContainer');
    if (voicingNavContainer) {
        voicingNavContainer.style.display = 'none';
    }
    
    // Remove voicing navigation from chord items
    document.querySelectorAll('.voicing-navigation').forEach(nav => nav.remove());
    
    updateDisplay();
    showAllChords();
}

// Toggle between icons and note names view
function toggleNotesView() {
    viewMode = viewMode === 'icons' ? 'notes' : 'icons';
    updateDisplay();
    
    // Update button state
    const toggleBtn = document.getElementById('toggleNotesView');
    if (toggleBtn) {
        const icon = toggleBtn.querySelector('i');
        const span = toggleBtn.querySelector('span');
        if (viewMode === 'notes') {
            icon.setAttribute('data-lucide', 'circle');
            if (span) span.textContent = 'Icons';
            toggleBtn.setAttribute('aria-pressed', 'true');
        } else {
            icon.setAttribute('data-lucide', 'music');
            if (span) span.textContent = 'Notes';
            toggleBtn.setAttribute('aria-pressed', 'false');
        }
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
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
    
    // Create a container for the numbers with gap matching frets-container
    const numbersRow = document.createElement('div');
    numbersRow.className = 'numbers-row';
    
    // Add fret numbers (align with fret columns)
    for (let fret = 0; fret <= FRETS_TO_SHOW; fret++) {
        const numSpan = document.createElement('span');
        numSpan.className = 'fret-number';
        numSpan.textContent = fret.toString();
        numbersRow.appendChild(numSpan);
    }
    
    numbersContainer.appendChild(numbersRow);
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
            // Add both click and touch events for better mobile support
            fretCell.addEventListener('click', () => handleFretClick(i, fret), { passive: true });
            fretCell.addEventListener('touchend', (e) => {
                e.preventDefault();
                handleFretClick(i, fret);
            }, { passive: false });
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

// Current voicing index for displayed chord
let currentVoicingIndex = 0;
let currentChordName = null;

// Display a chord on the fretboard
function displayChordOnFretboard(chordName, voicingIndex = 0) {
    const chordData = window.CHORD_DICTIONARY[chordName];
    if (!chordData || !chordData.positions || chordData.positions.length === 0) {
        return;
    }
    
    const voicing = chordData.positions[voicingIndex % chordData.positions.length];
    if (!voicing || !voicing.frets) {
        return;
    }
    
    // Update current fingering to match the chord
    currentFingering = [...voicing.frets];
    currentChordName = chordName;
    currentVoicingIndex = voicingIndex % chordData.positions.length;
    
    updateDisplay();
    updateVoicingNavigation();
    findMatchingChords();
}

// Update voicing navigation UI
function updateVoicingNavigation() {
    const voicingNavContainer = document.getElementById('voicingNavContainer');
    const voicingCounter = document.getElementById('voicingCounter');
    
    if (!currentChordName) {
        if (voicingNavContainer) {
            voicingNavContainer.style.display = 'none';
        }
        return;
    }
    
    const chordData = window.CHORD_DICTIONARY[currentChordName];
    if (!chordData || !chordData.positions) {
        if (voicingNavContainer) {
            voicingNavContainer.style.display = 'none';
        }
        return;
    }
    
    const totalVoicings = chordData.positions.length;
    
    if (totalVoicings > 1) {
        // Show navigation in fretboard header
        if (voicingNavContainer) {
            voicingNavContainer.style.display = 'flex';
        }
        
        if (voicingCounter) {
            voicingCounter.textContent = `${currentChordName} • ${currentVoicingIndex + 1} / ${totalVoicings}`;
        }
        
        // Show navigation in chord item
        const chordItems = document.querySelectorAll(`[data-chord-name="${currentChordName}"]`);
        chordItems.forEach(item => {
            // Remove existing navigation
            const existingNav = item.querySelector('.voicing-navigation');
            if (existingNav) {
                existingNav.remove();
            }
            
            // Add new navigation
            const navContainer = document.createElement('div');
            navContainer.className = 'voicing-navigation';
            
            navContainer.innerHTML = `
                <button class="voicing-nav-btn prev-voicing" aria-label="Previous voicing" type="button">
                    <i data-lucide="chevron-left"></i>
                </button>
                <span class="voicing-counter">${currentVoicingIndex + 1} / ${totalVoicings}</span>
                <button class="voicing-nav-btn next-voicing" aria-label="Next voicing" type="button">
                    <i data-lucide="chevron-right"></i>
                </button>
            `;
            
            item.appendChild(navContainer);
            
            // Add event listeners
            const prevBtnItem = navContainer.querySelector('.prev-voicing');
            if (prevBtnItem) {
                prevBtnItem.addEventListener('click', (e) => {
                    e.stopPropagation();
                    navigateVoicing('prev');
                });
            }
            
            const nextBtnItem = navContainer.querySelector('.next-voicing');
            if (nextBtnItem) {
                nextBtnItem.addEventListener('click', (e) => {
                    e.stopPropagation();
                    navigateVoicing('next');
                });
            }
            
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    } else {
        if (voicingNavContainer) {
            voicingNavContainer.style.display = 'none';
        }
    }
}

// Navigate between voicings
function navigateVoicing(direction) {
    if (!currentChordName) return;
    
    const chordData = window.CHORD_DICTIONARY[currentChordName];
    if (!chordData || !chordData.positions || chordData.positions.length <= 1) return;
    
    const totalVoicings = chordData.positions.length;
    
    if (direction === 'prev') {
        currentVoicingIndex = (currentVoicingIndex - 1 + totalVoicings) % totalVoicings;
    } else if (direction === 'next') {
        currentVoicingIndex = (currentVoicingIndex + 1) % totalVoicings;
    }
    
    displayChordOnFretboard(currentChordName, currentVoicingIndex);
}

// Initialize voicing navigation
function initVoicingNavigation() {
    const prevBtn = document.getElementById('prevVoicing');
    const nextBtn = document.getElementById('nextVoicing');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            navigateVoicing('prev');
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            navigateVoicing('next');
        });
    }
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Update the visual display of the fretboard
function updateDisplay() {
    const fretboardEl = document.getElementById('fretboard');
    if (fretboardEl) {
        fretboardEl.setAttribute('data-view-mode', viewMode);
    }
    
    const fretCells = document.querySelectorAll('.fret-cell');
    
    fretCells.forEach(cell => {
        const stringIndex = parseInt(cell.dataset.stringIndex);
        const fret = parseInt(cell.dataset.fret);
        const state = currentFingering[stringIndex];
        
        // Reset cell completely
        cell.className = 'fret-cell';
        cell.innerHTML = '';
        
        if (viewMode === 'notes') {
            // Show note names
            if (state === fret || (fret === 0 && state === 0)) {
                const actualFret = fret !== null && fret !== undefined ? fret : state;
                const note = getNoteAtPosition(stringIndex, actualFret);
                if (note) {
                    const displayNote = note.length === 1 ? note + ' ' : note;
                    cell.textContent = displayNote;
                    cell.classList.add('active');
                    if (fret === 0 && state === 0) {
                        cell.classList.add('open');
                    }
                } else {
                    cell.textContent = '—';
                }
            } else if (fret === 0 && state === -1) {
                cell.innerHTML = '<span class="fret-marker"><i data-lucide="x"></i></span>';
                cell.classList.add('muted');
            } else {
                cell.textContent = '—';
            }
        } else {
            // Show icons (default view)
            if (state === fret) {
                cell.innerHTML = '<span class="fret-marker"><i data-lucide="circle"></i></span>';
                cell.classList.add('active');
            } else if (fret === 0 && state === 0) {
                cell.innerHTML = '<span class="fret-marker"><i data-lucide="circle"></i></span>';
                cell.classList.add('open');
            } else if (fret === 0 && state === -1) {
                cell.innerHTML = '<span class="fret-marker"><i data-lucide="x"></i></span>';
                cell.classList.add('muted');
            } else {
                cell.textContent = '—';
            }
        }
    });
    
    // Initialize Lucide icons after DOM updates
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
    for (const [chordName, chordData] of Object.entries(window.CHORD_DICTIONARY)) {
        allChords.push({
            name: chordName,
            type: chordData.type,
            notes: chordData.notes,
            matchType: 'exact'
        });
    }
    
    renderChordList(allChords);
}

// Find matching chords based on active notes (progressive filtering)
function findMatchingChords() {
    const activeNotes = getActiveNotes();
    
    if (activeNotes.length === 0) {
        showAllChords();
        return;
    }
    
    const matches = [];
    const normalizedActiveNotes = activeNotes.map(n => normalizeNoteName(n));
    const activeNoteSet = new Set(normalizedActiveNotes);
    
    // Progressive filtering: chords must contain ALL active notes
    for (const [chordName, chordData] of Object.entries(window.CHORD_DICTIONARY)) {
        const normalizedChordNotes = chordData.notes.map(n => normalizeNoteName(n));
        const chordNoteSet = new Set(normalizedChordNotes);
        
        // Check if all active notes are present in chord notes
        const allNotesPresent = normalizedActiveNotes.every(note => chordNoteSet.has(note));
        
        if (allNotesPresent) {
            // Check if it's an exact match (chord contains only active notes) or partial (chord has extra notes)
            const isExactMatch = normalizedChordNotes.length === normalizedActiveNotes.length &&
                                 normalizedActiveNotes.every(note => chordNoteSet.has(note)) &&
                                 normalizedChordNotes.every(note => activeNoteSet.has(note));
            
            if (isExactMatch) {
                matches.push({
                    name: chordName,
                    type: chordData.type,
                    notes: chordData.notes,
                    matchType: 'exact'
                });
            } else {
                // Partial match - chord contains all active notes but has extra ones
                const extraNotes = normalizedChordNotes.filter(note => !activeNoteSet.has(note));
                matches.push({
                    name: chordName,
                    type: chordData.type,
                    notes: chordData.notes,
                    matchType: 'partial',
                    extraNotes: extraNotes
                });
            }
        }
    }
    
    renderChordList(matches);
}

// Render chord list
function renderChordList(chords) {
    const chordListEl = document.getElementById('chordList');
    
    if (!chords || chords.length === 0) {
        chordListEl.innerHTML = '<p class="placeholder">No matching chords</p>';
        return;
    }
    
    const fragment = document.createDocumentFragment();
    
    chords.forEach(chord => {
        const isPartial = chord.matchType === 'partial';
        const extraInfo = isPartial && chord.extraNotes && chord.extraNotes.length > 0
            ? `<span class="chord-extra">+ ${chord.extraNotes.join(', ')}</span>`
            : '';
        
        const chordData = window.CHORD_DICTIONARY[chord.name];
        const hasMultipleVoicings = chordData && chordData.positions && chordData.positions.length > 1;
        
        const item = document.createElement('div');
        item.className = `chord-item ${isPartial ? 'partial-match' : 'exact-match'} ${hasMultipleVoicings ? 'has-voicings' : ''}`;
        item.dataset.chordName = chord.name;
        item.dataset.voicingCount = chordData?.positions?.length || 0;
        item.innerHTML = `
            <div class="chord-name">${chord.name}</div>
            <div class="chord-type">${chord.type}</div>
        `;
        
        // Add click handler
        item.addEventListener('click', (e) => {
            if (e.target.closest('.voicing-navigation')) {
                return;
            }
            displayChordOnFretboard(chord.name, 0);
        }, { passive: true });
        
        fragment.appendChild(item);
    });
    
    chordListEl.innerHTML = '';
    chordListEl.appendChild(fragment);
    
    if (typeof lucide !== 'undefined') {
        requestAnimationFrame(() => {
            lucide.createIcons();
        });
    }
}

// Filter chord list based on search
function filterChordList() {
    const chordListEl = document.getElementById('chordList');
    const allItems = chordListEl.querySelectorAll('.chord-item');
    
    if (allItems.length === 0) {
        return;
    }
    
    // Filter chords based on search query
    if (searchFilter) {
        const filteredChords = [];
        
        allItems.forEach(item => {
            const chordName = item.dataset.chordName || '';
            const chordType = item.querySelector('.chord-type')?.textContent || '';
            const chordNotes = item.querySelector('.chord-notes')?.textContent || '';
            
            if (chordName.toLowerCase().includes(searchFilter) || 
                chordType.toLowerCase().includes(searchFilter) || 
                chordNotes.toLowerCase().includes(searchFilter)) {
                filteredChords.push(item);
            }
        });
        
        if (filteredChords.length === 0) {
            chordListEl.innerHTML = '<p class="placeholder">No chords match your search</p>';
            return;
        }
        
        const fragment = document.createDocumentFragment();
        filteredChords.forEach(item => {
            fragment.appendChild(item.cloneNode(true));
        });
        
        chordListEl.innerHTML = '';
        chordListEl.appendChild(fragment);
        
        // Re-attach event listeners
        const newItems = chordListEl.querySelectorAll('.chord-item');
        newItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.closest('.voicing-navigation')) {
                    return;
                }
                const chordName = item.dataset.chordName;
                displayChordOnFretboard(chordName, 0);
            }, { passive: true });
        });
    } else {
        // No filter - show all items as-is (they're already in the DOM from renderChordList)
        // Just need to re-render if we have a filter applied
    }
    
    if (typeof lucide !== 'undefined') {
        requestAnimationFrame(() => {
            lucide.createIcons();
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        init();
        initVoicingNavigation();
        // Initialize search icon after DOM is ready
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    });
} else {
    init();
    initVoicingNavigation();
    // Initialize search icon
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}
