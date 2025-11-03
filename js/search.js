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
    const typeFilter = document.getElementById('chordTypeFilter');
    
    // Initialize note selector
    initNoteSelector();
    
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
    
    typeFilter.addEventListener('change', (e) => {
        currentFilter = e.target.value;
        filterChords();
    });
}

// Initialize note selector
function initNoteSelector() {
    const noteSelector = document.getElementById('noteSelector');
    const clearNotesBtn = document.getElementById('clearNotes');
    
    // All 12 notes
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    // Create note buttons
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
        
        noteSelector.appendChild(button);
    });
    
    // Clear notes button
    clearNotesBtn.addEventListener('click', () => {
        clearSelectedNotes();
    });
    
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
}

// Clear all selected notes
function clearSelectedNotes() {
    selectedNotes.clear();
    updateNoteButtons();
    filterChords();
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
    
    // Show/hide clear button
    const clearBtn = document.getElementById('clearNotes');
    if (selectedNotes.size > 0) {
        clearBtn.style.display = 'flex';
    } else {
        clearBtn.style.display = 'none';
    }
}

// Filter and display chords
function filterChords() {
    const chordGrid = document.getElementById('chordGrid');
    
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
    
    // Apply note filter - chord must contain ALL selected notes
    if (selectedNotes.size > 0) {
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
    
    // Sort chords
    filteredChords.sort((a, b) => {
        const nameA = a[0].replace(/[#b]/, '');
        const nameB = b[0].replace(/[#b]/, '');
        if (nameA !== nameB) return nameA.localeCompare(nameB);
        return a[0].localeCompare(b[0]);
    });
    
    // Use document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    // Create chord items
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
        
        fragment.appendChild(chordItem);
    });
    
    // Update DOM in one operation
    chordGrid.innerHTML = '';
    chordGrid.appendChild(fragment);
    
    // Update result count
    const resultCount = document.querySelector('.chord-library h3');
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

// Export functions
window.initSearch = initSearch;
window.filterChords = filterChords;

