// Custom locked chords management
let lockedChords = [];

// Load locked chords from localStorage
function loadLockedChords() {
    try {
        const stored = localStorage.getItem('lockedChords');
        if (stored) {
            lockedChords = JSON.parse(stored);
        }
    } catch (e) {
        console.error('Error loading locked chords:', e);
        lockedChords = [];
    }
}

// Save locked chords to localStorage
function saveLockedChords() {
    try {
        localStorage.setItem('lockedChords', JSON.stringify(lockedChords));
    } catch (e) {
        console.error('Error saving locked chords:', e);
    }
}

// Initialize custom chords functionality
function initCustomChords() {
    loadLockedChords();
    updateLockedChordsDisplay();
    
    const lockBtn = document.getElementById('lockChordBtn');
    if (lockBtn) {
        lockBtn.addEventListener('click', lockCurrentChord);
    }
}

// Lock the current chord from fretboard
function lockCurrentChord() {
    const activeNotes = window.getActiveNotes ? window.getActiveNotes() : [];
    if (activeNotes.length === 0) {
        alert('Please select some notes on the fretboard first!');
        return;
    }
    
    // Get current fingering from global scope (from fretboard.js)
    const currentFingering = window.currentFingering || [null, null, null, null, null, null];
    
    // Convert to frets array (-1 for muted/null, numbers for fretted)
    const frets = [...currentFingering].map(f => f === null ? -1 : f);
    
    // Generate a name for the chord
    const chordName = prompt(`Enter a name for this chord (or leave blank for auto-name):`, generateChordName(activeNotes));
    if (chordName === null) return; // User cancelled
    
    const finalName = chordName.trim() || generateChordName(activeNotes);
    
    // Check if name already exists
    if (lockedChords.some(c => c.name === finalName)) {
        if (!confirm(`A chord named "${finalName}" already exists. Replace it?`)) {
            return;
        }
        // Remove existing
        lockedChords = lockedChords.filter(c => c.name !== finalName);
    }
    
    // Create locked chord object
    const lockedChord = {
        id: Date.now().toString(),
        name: finalName,
        frets: frets,
        notes: [...activeNotes],
        createdAt: new Date().toISOString()
    };
    
    lockedChords.push(lockedChord);
    saveLockedChords();
    updateLockedChordsDisplay();
    
    // Show feedback
    const lockBtn = document.getElementById('lockChordBtn');
    if (lockBtn) {
        const originalText = lockBtn.innerHTML;
        lockBtn.innerHTML = '<i data-lucide="check"></i><span>Locked!</span>';
        lockBtn.style.background = 'var(--accent)';
        setTimeout(() => {
            lockBtn.innerHTML = originalText;
            lockBtn.style.background = '';
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }, 2000);
    }
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Generate automatic name for chord based on notes
function generateChordName(notes) {
    if (notes.length === 0) return 'Custom Chord';
    
    // Try to find a matching chord name
    const sortedNotes = [...notes].sort();
    const noteKey = sortedNotes.join(',');
    
    // Check if it matches any known chord
    for (const [chordName, chordData] of Object.entries(CHORD_DICTIONARY)) {
        const chordNotes = [...chordData.notes].sort();
        if (chordNotes.join(',') === noteKey) {
            return chordName;
        }
    }
    
    // Otherwise, use note names
    return `Custom (${notes.join(', ')})`;
}

// Update locked chords display
function updateLockedChordsDisplay() {
    const container = document.getElementById('lockedChordsList');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (lockedChords.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); font-style: italic;">No locked chords yet. Create a chord on the fretboard and click "Lock This Chord" to save it.</p>';
        return;
    }
    
    lockedChords.forEach(chord => {
        const chordCard = document.createElement('div');
        chordCard.className = 'locked-chord-card';
        
        const header = document.createElement('div');
        header.className = 'locked-chord-header';
        
        const name = document.createElement('span');
        name.className = 'locked-chord-name';
        name.textContent = chord.name;
        header.appendChild(name);
        
        const actions = document.createElement('div');
        actions.className = 'locked-chord-actions';
        
        // Add to progression button
        const addBtn = document.createElement('button');
        addBtn.className = 'btn-add-to-progression';
        addBtn.innerHTML = '<i data-lucide="plus"></i>';
        addBtn.title = 'Add to progression';
        addBtn.addEventListener('click', () => {
            addLockedChordToProgression(chord);
        });
        actions.appendChild(addBtn);
        
        // Play button
        const playBtn = document.createElement('button');
        playBtn.className = 'btn-play-chord';
        playBtn.innerHTML = '<i data-lucide="play"></i>';
        playBtn.title = 'Show on fretboard';
        playBtn.addEventListener('click', () => {
            displayLockedChord(chord);
        });
        actions.appendChild(playBtn);
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete-chord';
        deleteBtn.innerHTML = '<i data-lucide="trash-2"></i>';
        deleteBtn.title = 'Delete chord';
        deleteBtn.addEventListener('click', () => {
            deleteLockedChord(chord.id);
        });
        actions.appendChild(deleteBtn);
        
        header.appendChild(actions);
        chordCard.appendChild(header);
        
        // Notes display
        const notesDisplay = document.createElement('div');
        notesDisplay.className = 'locked-chord-notes';
        notesDisplay.textContent = `Notes: ${chord.notes.join(', ')}`;
        chordCard.appendChild(notesDisplay);
        
        // Mini fretboard preview
        const fretboardPreview = document.createElement('div');
        fretboardPreview.className = 'locked-chord-fretboard';
        const asciiFretboard = window.createASCIIFretboard ? window.createASCIIFretboard(chord.frets) : '';
        fretboardPreview.innerHTML = `<pre>${asciiFretboard}</pre>`;
        chordCard.appendChild(fretboardPreview);
        
        container.appendChild(chordCard);
    });
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Display locked chord on fretboard
function displayLockedChord(chord) {
    // Convert frets array (-1 for muted, numbers for fretted)
    const frets = chord.frets.map(f => f === -1 ? -1 : f);
    window.currentFingering = frets.map(f => f === -1 ? null : f);
    
    if (typeof updateFretboardDisplay === 'function') {
        updateFretboardDisplay();
    }
    
    // Update chord info
    document.getElementById('currentChord').textContent = chord.name;
    document.getElementById('chordNotes').innerHTML = `<h4>Notes</h4><p>${chord.notes.join(', ')}</p>`;
    document.getElementById('chordIntervals').innerHTML = '<h4>Intervals</h4><p>Custom Chord</p>';
    
    // Hide lock button since this is already locked
    const lockSection = document.getElementById('lockChordSection');
    if (lockSection) {
        lockSection.style.display = 'none';
    }
    
    // Scroll to fretboard
    const fretboard = document.getElementById('fretboard');
    if (fretboard) {
        fretboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Add locked chord to progression
function addLockedChordToProgression(chord) {
    // Check if custom progression is initialized
    if (typeof window.addCustomChordToProgression === 'function') {
        window.addCustomChordToProgression(chord);
    } else {
        // Fallback: use the regular add function with a special marker
        if (typeof window.addChordToProgression === 'function') {
            // We need to create a custom chord entry
            alert('Adding locked chord to progression. Please use the progression builder.');
        }
    }
}

// Delete locked chord
function deleteLockedChord(chordId) {
    if (!confirm('Are you sure you want to delete this locked chord?')) {
        return;
    }
    
    lockedChords = lockedChords.filter(c => c.id !== chordId);
    saveLockedChords();
    updateLockedChordsDisplay();
}

// Check if current chord should show lock button
function updateLockButtonVisibility() {
    const lockSection = document.getElementById('lockChordSection');
    if (!lockSection) return;
    
    const activeNotes = window.getActiveNotes ? window.getActiveNotes() : [];
    const hasNotes = activeNotes.length > 0;
    
    // Check if this exact chord is already locked
    const frets = [...currentFingering].map(f => f === null ? -1 : f);
    const isAlreadyLocked = lockedChords.some(c => {
        return JSON.stringify(c.frets) === JSON.stringify(frets);
    });
    
    if (hasNotes && !isAlreadyLocked) {
        lockSection.style.display = 'block';
    } else {
        lockSection.style.display = 'none';
    }
}

// Export functions
window.initCustomChords = initCustomChords;
window.updateLockButtonVisibility = updateLockButtonVisibility;
window.lockedChords = lockedChords;

