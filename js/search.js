// Search and filter functionality
let currentFilter = '';
let currentSearch = '';
let selectedNotes = new Set();
let searchTimeout = null;

// Debounce function for performance
function debounce(func, wait) {
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(searchTimeout);
            func(...args);
        };
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(later, wait);
    };
}

// Initialize search functionality
function initSearch() {
    const searchInput = document.getElementById('chordSearch');
    const clearBtn = document.getElementById('clearSearch');
    const filterButtons = document.querySelectorAll('.filter-btn[data-type]');
    
    // Initialize note selector
    initNoteSelector();
    
    // Set up search input if it exists (library mode only)
    if (searchInput && clearBtn) {
        // Instant search (no debounce for immediate feedback)
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase();
            filterChords();
        });
        
        // Keyboard shortcuts
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.value = '';
                currentSearch = '';
                filterChords();
                searchInput.blur();
            }
        });
        
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            currentSearch = '';
            filterChords();
            searchInput.focus();
        });
    }
    
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.type;
            filterChords();
        });
    });
}

// Initialize note selector
function initNoteSelector() {
    const noteSelector = document.getElementById('noteSelector');
    const libraryNoteSelector = document.getElementById('libraryNoteSelector');
    const clearNotesBtn = document.getElementById('clearNotes');
    const clearLibraryNotesBtn = document.getElementById('clearLibraryNotes');
    
    // All 12 notes
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    // Helper function to create note buttons for a selector
    const createNoteButtons = (selector) => {
        if (!selector) return;
        
        notes.forEach(note => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'note-button';
            button.dataset.note = note;
            button.textContent = note;
            button.setAttribute('aria-label', `Toggle ${note} note`);
            
            button.addEventListener('click', () => {
                toggleNote(note);
            });
            
            selector.appendChild(button);
        });
    };
    
    // Create note buttons for tones mode
    if (noteSelector) {
        createNoteButtons(noteSelector);
    }
    
    // Create note buttons for library mode
    if (libraryNoteSelector) {
        createNoteButtons(libraryNoteSelector);
    }
    
    // Clear notes buttons
    if (clearNotesBtn) {
        clearNotesBtn.addEventListener('click', () => {
            clearSelectedNotes();
        });
    }
    
    if (clearLibraryNotesBtn) {
        clearLibraryNotesBtn.addEventListener('click', () => {
            clearSelectedNotes();
        });
    }
    
    // Initialize icons after note buttons are created
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Toggle a note selection
function toggleNote(note) {
    if (selectedNotes.has(note)) {
        selectedNotes.delete(note);
    } else {
        selectedNotes.add(note);
    }
    
    updateNoteButtons();
    filterChords();
    
    // Clear fretboard when using manual note selection
    if (typeof clearFretboard === 'function') {
        clearFretboard();
    }
}

// Clear all selected notes
function clearSelectedNotes() {
    selectedNotes.clear();
    updateNoteButtons();
    filterChords();
    
    // Clear fretboard selection too
    if (typeof clearFretboard === 'function') {
        clearFretboard();
    }
}

// Update note button visual state
function updateNoteButtons() {
    const buttons = document.querySelectorAll('.note-button');
    buttons.forEach(button => {
        const note = button.dataset.note;
        if (selectedNotes.has(note)) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
    
    // Show/hide clear buttons
    const clearBtn = document.getElementById('clearNotes');
    const clearLibraryBtn = document.getElementById('clearLibraryNotes');
    if (selectedNotes.size > 0) {
        if (clearBtn) clearBtn.style.display = 'flex';
        if (clearLibraryBtn) clearLibraryBtn.style.display = 'flex';
    } else {
        if (clearBtn) clearBtn.style.display = 'none';
        if (clearLibraryBtn) clearLibraryBtn.style.display = 'none';
    }
}

// Filter and display chords
function filterChords() {
    const chordGrid = document.getElementById('chordGrid');
    const libraryChordGrid = document.getElementById('libraryChordGrid');
    const activeGrid = chordGrid || libraryChordGrid;
    
    if (!activeGrid) return;
    
    let filteredChords = Object.entries(CHORD_DICTIONARY);
    
    // Apply type filter
    if (currentFilter) {
        filteredChords = filteredChords.filter(([name, data]) => {
            return data.type === currentFilter;
        });
    }
    
    // Apply search filter
    if (currentSearch) {
        filteredChords = filteredChords.filter(([name, data]) => {
            return name.toLowerCase().includes(currentSearch) ||
                   data.notes.some(note => note.toLowerCase().includes(currentSearch));
        });
    }
    
    // Apply note filter
    if (selectedNotes.size > 0) {
        // If exactly one note is selected, filter by root note (chord name starts with that note)
        if (selectedNotes.size === 1) {
            const selectedNote = Array.from(selectedNotes)[0];
            filteredChords = filteredChords.filter(([name, data]) => {
                // Extract root note from chord name (e.g., "C", "C#", "Cm", "Cmaj7" -> "C" or "C#")
                const rootMatch = name.match(/^([A-G][#b]?)/);
                if (!rootMatch) return false;
                
                const rootNote = rootMatch[1];
                
                // Normalize for comparison (handle enharmonic equivalents)
                const normalizedSelected = window.normalizeNoteName ? window.normalizeNoteName(selectedNote) : selectedNote;
                const normalizedRoot = window.normalizeNoteName ? window.normalizeNoteName(rootNote) : rootNote;
                
                return normalizedSelected === normalizedRoot;
            });
        } else {
            // If multiple notes are selected, chord must contain ALL selected notes
            filteredChords = filteredChords.filter(([name, data]) => {
                const chordNotes = new Set(data.notes);
                // Normalize chord notes for comparison (handle enharmonic equivalents)
                const normalizedChordNotes = new Set();
                chordNotes.forEach(note => {
                    normalizedChordNotes.add(note);
                    // Add enharmonic equivalents
                    if (note === 'C#') normalizedChordNotes.add('Db');
                    if (note === 'Db') normalizedChordNotes.add('C#');
                    if (note === 'D#') normalizedChordNotes.add('Eb');
                    if (note === 'Eb') normalizedChordNotes.add('D#');
                    if (note === 'F#') normalizedChordNotes.add('Gb');
                    if (note === 'Gb') normalizedChordNotes.add('F#');
                    if (note === 'G#') normalizedChordNotes.add('Ab');
                    if (note === 'Ab') normalizedChordNotes.add('G#');
                    if (note === 'A#') normalizedChordNotes.add('Bb');
                    if (note === 'Bb') normalizedChordNotes.add('A#');
                });
                
                // Check if all selected notes are in the chord (including enharmonic equivalents)
                for (const selectedNote of selectedNotes) {
                    if (!normalizedChordNotes.has(selectedNote)) {
                        return false;
                    }
                }
                return true;
            });
        }
    }
    
    // Sort chords
    filteredChords.sort((a, b) => {
        const nameA = a[0].replace(/[#b]/, '');
        const nameB = b[0].replace(/[#b]/, '');
        if (nameA !== nameB) return nameA.localeCompare(nameB);
        return a[0].localeCompare(b[0]);
    });
    
    // Use document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    // Create chord items for tones grid
    const tonesFragment = document.createDocumentFragment();
    filteredChords.forEach(([chordName, chordData]) => {
        const chordItem = document.createElement('div');
        chordItem.className = 'chord-item';
        chordItem.dataset.chord = chordName;
        chordItem.dataset.type = chordData.type;
        
        chordItem.innerHTML = `
            <div class="chord-name">${chordName}</div>
            <div class="chord-type">${chordData.type}</div>
        `;
        
        chordItem.addEventListener('click', () => {
            displayChordOnFretboard(chordName);
            // Scroll to top of fretboard
            document.getElementById('fretboard').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        
        tonesFragment.appendChild(chordItem);
    });
    
    // Create chord items for library grid (different behavior)
    const libraryFragment = document.createDocumentFragment();
    filteredChords.forEach(([chordName, chordData]) => {
        const chordItem = document.createElement('div');
        chordItem.className = 'chord-item';
        chordItem.dataset.chord = chordName;
        chordItem.dataset.type = chordData.type;
        
        chordItem.innerHTML = `
            <div class="chord-name">${chordName}</div>
            <div class="chord-type">${chordData.type}</div>
        `;
        
        chordItem.addEventListener('click', () => {
            displayChordInLibrary(chordName);
        });
        
        libraryFragment.appendChild(chordItem);
    });
    
    // Update both grids if they exist
    const grid1 = document.getElementById('chordGrid');
    const grid2 = document.getElementById('libraryChordGrid');
    
    if (grid1) {
        grid1.innerHTML = '';
        grid1.appendChild(tonesFragment);
    }
    if (grid2) {
        grid2.innerHTML = '';
        grid2.appendChild(libraryFragment);
    }
    
    // Update result count
    const resultCount = document.querySelector('.chord-library h3');
    if (resultCount) {
        let title = 'Chord Library';
        
        if (selectedNotes.size > 0 || currentSearch || currentFilter) {
            title = `Chord Library (${filteredChords.length} matches)`;
            if (selectedNotes.size > 0) {
                const notesArray = Array.from(selectedNotes).sort();
                title += ` - Notes: ${notesArray.join(', ')}`;
            }
        }
        
        resultCount.textContent = title;
    }
}

// Display chord in library mode with all voicings
function displayChordInLibrary(chordName) {
    const chordData = CHORD_DICTIONARY[chordName];
    if (!chordData) return;
    
    // Update display
    const displayElement = document.getElementById('selectedChordDisplay');
    if (displayElement) {
        displayElement.textContent = chordName;
    }
    
    // Show clear button
    const clearBtn = document.getElementById('clearLibraryChord');
    if (clearBtn) {
        clearBtn.style.display = 'flex';
    }
    
    // Get first position
    const firstPosition = chordData.positions[0];
    if (firstPosition) {
        // Display on selected fretboard
        displayChordOnSelectedFretboard(firstPosition.frets);
    }
    
    // Update chord info
    const notesDiv = document.getElementById('selectedChordNotes');
    const intervalsDiv = document.getElementById('selectedChordIntervals');
    if (notesDiv) {
        notesDiv.innerHTML = `<h4>Notes</h4><p>${chordData.notes.join(', ')}</p>`;
    }
    if (intervalsDiv) {
        intervalsDiv.innerHTML = `<h4>Intervals</h4><p>${chordData.intervals.map(i => intervalName(i)).join(', ')}</p>`;
    }
    
    // Display all voicings in grid
    displayAllVoicingsInGrid(chordName, chordData);
}

// Helper function to display a chord on the selected fretboard
function displayChordOnSelectedFretboard(frets) {
    const fretboard = document.getElementById('selectedChordFretboard');
    if (!fretboard) return;
    
    const segments = fretboard.querySelectorAll('.fret-segment');
    segments.forEach(segment => {
        const string = parseInt(segment.dataset.string);
        const fret = parseInt(segment.dataset.fret);
        
        segment.classList.remove('active', 'root', 'muted');
        
        if (frets[string] === fret) {
            segment.classList.add('active');
            
            // Check if this is the root note (first active fret)
            const activeFrets = frets.map((f, idx) => ({ fret: f, string: idx })).filter(x => x.fret > 0);
            if (activeFrets.length > 0) {
                const lowestFret = Math.min(...activeFrets.map(x => x.fret));
                if (fret === lowestFret && frets[string] === lowestFret) {
                    segment.classList.add('root');
                }
            }
        } else if (frets[string] === -1 && fret === 0) {
            segment.classList.add('muted');
        }
    });
}

// Create a mini visual fretboard element (scaled down version of main fretboard)
function createMiniFretboardVisual(frets, rootStringIndex = null) {
    const STRINGS = ['E', 'A', 'D', 'G', 'B', 'E'];
    const container = document.createElement('div');
    container.className = 'mini-fretboard-visual';
    
    // Calculate the fret range to display (show only relevant frets)
    const activeFrets = frets.filter(f => f !== null && f !== -1 && f >= 0);
    let minFret, maxFret;
    if (activeFrets.length === 0) {
        // All muted, show frets 0-4
        minFret = 0;
        maxFret = 4;
    } else {
        const minActiveFret = Math.min(...activeFrets);
        const maxActiveFret = Math.max(...activeFrets);
        minFret = Math.max(0, minActiveFret - 1);
        maxFret = Math.min(15, maxActiveFret + 2);
    }
    
    // Create fret numbers row
    const fretNumbersRow = document.createElement('div');
    fretNumbersRow.className = 'mini-fret-numbers-row';
    
    const fretNumbers = document.createElement('div');
    fretNumbers.className = 'mini-fret-numbers';
    
    for (let j = minFret; j <= maxFret; j++) {
        const fretNum = document.createElement('div');
        fretNum.className = 'mini-fret-number';
        fretNum.textContent = j;
        fretNumbers.appendChild(fretNum);
    }
    
    fretNumbersRow.appendChild(fretNumbers);
    container.appendChild(fretNumbersRow);
    
    // Determine root string and fret
    let rootString = rootStringIndex !== null ? rootStringIndex : -1;
    let rootFret = -1;
    
    if (rootString >= 0 && rootString < frets.length && frets[rootString] !== null && frets[rootString] !== -1 && frets[rootString] >= 0) {
        rootFret = frets[rootString];
    } else {
        // Fallback: find the first active fret
        for (let i = 0; i < frets.length; i++) {
            if (frets[i] !== null && frets[i] !== -1 && frets[i] >= 0) {
                rootString = i;
                rootFret = frets[i];
                break;
            }
        }
    }
    
    // Create strings (displayed in reverse order: high e at top, low E at bottom)
    for (let i = STRINGS.length - 1; i >= 0; i--) {
        const stringDiv = document.createElement('div');
        stringDiv.className = 'mini-string-visual';
        
        const label = document.createElement('div');
        label.className = 'mini-string-label-visual';
        label.textContent = STRINGS[i];
        
        const fretSegments = document.createElement('div');
        fretSegments.className = 'mini-fret-segments';
        
        // Create fret segments
        for (let j = minFret; j <= maxFret; j++) {
            const segment = document.createElement('div');
            segment.className = 'mini-fret-segment';
            segment.dataset.string = i;
            segment.dataset.fret = j;
            
            const fret = frets[i];
            if (fret === j) {
                segment.classList.add('active');
                // Check if root
                if (i === rootString && j === rootFret) {
                    segment.classList.add('root');
                }
                
                // Add note label
                const noteLabel = document.createElement('div');
                noteLabel.className = 'mini-fret-active-note-label';
                const note = window.getNoteAtPosition ? window.getNoteAtPosition(i, j) : '';
                noteLabel.textContent = note;
                segment.appendChild(noteLabel);
            } else if (fret === -1 && j === 0) {
                segment.classList.add('muted');
                const muteLabel = document.createElement('div');
                muteLabel.className = 'mini-fret-mute-label';
                muteLabel.textContent = '✕';
                segment.appendChild(muteLabel);
            }
            
            fretSegments.appendChild(segment);
        }
        
        stringDiv.appendChild(label);
        stringDiv.appendChild(fretSegments);
        container.appendChild(stringDiv);
    }
    
    return container;
}

// Display all voicings as mini fretboards
function displayAllVoicingsInGrid(chordName, chordData) {
    const grid = document.getElementById('allVoicingsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // Get all voicings
    const matchingChords = findAllVoicingsByNotes(chordData.notes);
    const allVoicings = [];
    const seenFretCombos = new Set();
    
    // Extract root note
    const rootMatch = chordName.match(/^([A-G][#b]?)/);
    const targetRoot = rootMatch ? rootMatch[1] : null;
    
    for (const matchingChord of matchingChords) {
        const data = CHORD_DICTIONARY[matchingChord.chordName];
        if (!data || !data.positions) continue;
        
        const matchRootMatch = matchingChord.chordName.match(/^([A-G][#b]?)/);
        const matchRoot = matchRootMatch ? matchRootMatch[1] : null;
        
        // Only include chords with the same root note
        if (targetRoot && matchRoot && normalizeNoteName(targetRoot) !== normalizeNoteName(matchRoot)) {
            continue;
        }
        
        for (const position of data.positions) {
            const baseFrets = position.frets;
            
            // Verify root note for base position
            const activeFrets = baseFrets.map((f, idx) => ({ fret: f, string: idx })).filter(x => x.fret > 0);
            if (activeFrets.length > 0) {
                const lowestFret = Math.min(...activeFrets.map(x => x.fret));
                const lowestString = activeFrets.find(x => x.fret === lowestFret)?.string;
                
                if (lowestString !== undefined) {
                    const actualRootNote = getNoteAtPosition(lowestString, lowestFret);
                    const normalizedTargetRoot = normalizeNoteName(targetRoot);
                    const normalizedActualRoot = normalizeNoteName(actualRootNote);
                    
                    if (targetRoot && normalizedActualRoot !== normalizedTargetRoot) {
                        continue;
                    }
                }
            }
            
            // Add base position
            const fretKey = baseFrets.join(',');
            if (!seenFretCombos.has(fretKey)) {
                seenFretCombos.add(fretKey);
                allVoicings.push({
                    chordName: chordName,
                    frets: baseFrets,
                    root: position.root,
                    notes: matchingChord.notes,
                    type: matchingChord.type
                });
            }
            
            // Generate transposed voicings (move shape up the neck)
            const transposedVoicings = generateTransposedVoicings(baseFrets, 15, 0);
            for (const transposed of transposedVoicings) {
                const transposedKey = transposed.join(',');
                if (!seenFretCombos.has(transposedKey)) {
                    seenFretCombos.add(transposedKey);
                    allVoicings.push({
                        chordName: chordName,
                        frets: transposed,
                        root: position.root,
                        notes: matchingChord.notes,
                        type: matchingChord.type
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
    
    // Display as mini visual fretboards
    allVoicings.forEach((voicing, index) => {
        const voicingCard = document.createElement('div');
        voicingCard.className = 'voicing-card';
        
        const miniFretboard = createMiniFretboardVisual(voicing.frets, voicing.root);
        const label = index === 0 ? 'Main' : getVoicingName(voicing.frets, voicing.root);
        
        const fretboardContainer = document.createElement('div');
        fretboardContainer.className = 'voicing-card-fretboard';
        fretboardContainer.appendChild(miniFretboard);
        
        const labelDiv = document.createElement('div');
        labelDiv.className = 'voicing-card-label';
        labelDiv.textContent = label;
        
        voicingCard.appendChild(fretboardContainer);
        voicingCard.appendChild(labelDiv);
        
        voicingCard.addEventListener('click', () => {
            displayChordOnSelectedFretboard(voicing.frets);
        });
        
        grid.appendChild(voicingCard);
    });
}

// Export functions
window.initSearch = initSearch;
window.filterChords = filterChords;
window.clearSelectedNotes = clearSelectedNotes;
window.displayChordInLibrary = displayChordInLibrary;

