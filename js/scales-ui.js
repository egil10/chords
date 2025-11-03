// Scale UI functionality
let currentScaleType = 'minor-pentatonic';
let currentScaleRoot = 'E';
// STANDARD_TUNING is now in utils.js

// Initialize scales UI
function initScales() {
    const scaleButtons = document.querySelectorAll('.control-btn[data-scale]');
    const rootButtons = document.querySelectorAll('.control-btn[data-root]');
    const clearBtn = document.getElementById('clearScaleSelection');
    
    if (!scaleButtons.length || !rootButtons.length) return;
    
    scaleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            scaleButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentScaleType = btn.dataset.scale;
            updateScales();
        });
    });
    
    rootButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            rootButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentScaleRoot = btn.dataset.root;
            updateScales();
        });
    });
    
    // Clear button
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            currentScaleType = 'minor-pentatonic';
            currentScaleRoot = 'E';
            
            scaleButtons.forEach(b => b.classList.remove('active'));
            rootButtons.forEach(b => b.classList.remove('active'));
            
            const defaultScale = Array.from(scaleButtons).find(btn => btn.dataset.scale === 'minor-pentatonic');
            const defaultRoot = Array.from(rootButtons).find(btn => btn.dataset.root === 'E');
            if (defaultScale) defaultScale.classList.add('active');
            if (defaultRoot) defaultRoot.classList.add('active');
            
            updateScales();
        });
    }
    
    // Set initial active buttons
    const activeScale = Array.from(scaleButtons).find(btn => btn.dataset.scale === currentScaleType);
    if (activeScale) activeScale.classList.add('active');
    const activeRoot = Array.from(rootButtons).find(btn => btn.dataset.root === currentScaleRoot);
    if (activeRoot) activeRoot.classList.add('active');
    
    // Initial load
    updateScales();
}

// Update scales display
function updateScales() {
    const scalePositions = document.getElementById('scalePositions');
    const cagedShapes = document.getElementById('cagedShapes');
    
    if (!scalePositions) return;
    
    const scaleTemplate = SCALE_BINARY_TEMPLATES[currentScaleType];
    if (!scaleTemplate) return;
    
    scalePositions.innerHTML = '';
    
    // Display full 12-fret scale map (single position showing all frets 0-12)
    const positionDiv = document.createElement('div');
    positionDiv.className = 'scale-position';
    
    const positionTitle = document.createElement('h5');
    positionTitle.textContent = `${scaleTemplate.name} - ${currentScaleRoot} (Full 12-Fret Map)`;
    positionDiv.appendChild(positionTitle);
    
    if (scaleTemplate.description) {
        const descLabel = document.createElement('div');
        descLabel.className = 'scale-description-text';
        descLabel.textContent = scaleTemplate.description;
        positionDiv.appendChild(descLabel);
    }
    
    const scaleFretboard = createScaleFretboard(null, currentScaleRoot);
    positionDiv.appendChild(scaleFretboard);
    
    const scaleNotes = getScaleNotes(currentScaleRoot, currentScaleType);
    const notesLabel = document.createElement('div');
    notesLabel.className = 'scale-notes-label';
    notesLabel.textContent = `Notes: ${scaleNotes.join(', ')}`;
    positionDiv.appendChild(notesLabel);
    
    scalePositions.appendChild(positionDiv);
    
    // Update CAGED shapes
    if (cagedShapes) {
        updateCAGEDShapes(cagedShapes);
    }
}

// Create visual fretboard for scale using binary template
function createScaleFretboard(fretPositions, rootNote) {
    const fretboard = document.createElement('div');
    fretboard.className = 'scale-fretboard';
    
    const strings = ['E', 'A', 'D', 'G', 'B', 'e'];
    const stringKeys = ['6', '5', '4', '3', '2', '1']; // Match template keys
    const scaleNotes = getScaleNotes(rootNote, currentScaleType);
    const scalePattern = SCALE_BINARY_TEMPLATES[currentScaleType];
    
    if (!scalePattern) return fretboard;
    
    // Get shifted template for this root note
    const shiftedTemplate = getShiftedTemplate(rootNote, currentScaleType);
    
    if (!shiftedTemplate) return fretboard;
    
    // Create 12-fret display (0-11, showing 0-12)
    for (let string = 0; string < strings.length; string++) {
        const stringDiv = document.createElement('div');
        stringDiv.className = 'scale-string';
        
        const stringLabel = document.createElement('div');
        stringLabel.className = 'scale-string-label';
        stringLabel.textContent = strings[string];
        stringDiv.appendChild(stringLabel);
        
        const fretsContainer = document.createElement('div');
        fretsContainer.className = 'scale-frets';
        
        const stringPattern = shiftedTemplate[stringKeys[string]];
        
        // Show frets 0-12 (0-11 pattern + repeat at 12)
        for (let fret = 0; fret <= 12; fret++) {
            const fretCell = document.createElement('div');
            fretCell.className = 'scale-fret-cell';
            fretCell.dataset.string = string;
            fretCell.dataset.fret = fret;
            
            // Use pattern (mod 12 for fret 12)
            const patternIndex = fret % 12;
            const isInScale = stringPattern && stringPattern[patternIndex] === 1;
            
            if (isInScale) {
                fretCell.classList.add('scale-note');
                
                // Get note at this position
                const baseNote = STANDARD_TUNING[string];
                const noteValue = (baseNote + fret) % 12;
                const noteName = NOTE_NAMES[noteValue];
                const isRoot = noteName === rootNote;
                
                if (isRoot) {
                    fretCell.classList.add('root-note');
                    fretCell.textContent = 'R';
                } else {
                    // Find which degree of the scale
                    const rootIndex = NOTE_NAMES.indexOf(rootNote);
                    const noteIndex = NOTE_NAMES.indexOf(noteName);
                    const interval = (noteIndex - rootIndex + 12) % 12;
                    const degreeIndex = scalePattern.intervals.indexOf(interval);
                    fretCell.textContent = degreeIndex !== -1 ? (degreeIndex + 1) : '';
                }
            }
            
            fretsContainer.appendChild(fretCell);
        }
        
        stringDiv.appendChild(fretsContainer);
        fretboard.appendChild(stringDiv);
    }
    
    return fretboard;
}

// Update CAGED shapes display
function updateCAGEDShapes(container) {
    container.innerHTML = '';
    
    Object.entries(CAGED_SHAPES).forEach(([shape, data]) => {
        const shapeDiv = document.createElement('div');
        shapeDiv.className = 'caged-shape';
        
        const shapeName = document.createElement('div');
        shapeName.className = 'caged-shape-name';
        shapeName.textContent = data.name;
        shapeDiv.appendChild(shapeName);
        
        const shapeDesc = document.createElement('div');
        shapeDesc.className = 'caged-shape-desc';
        shapeDesc.textContent = data.description;
        shapeDiv.appendChild(shapeDesc);
        
        // Create mini fretboard for CAGED shape
        const miniFretboard = document.createElement('div');
        miniFretboard.className = 'caged-mini-fretboard';
        
        const strings = ['E', 'A', 'D', 'G', 'B', 'e'];
        strings.forEach((stringName, i) => {
            const stringDiv = document.createElement('div');
            stringDiv.className = 'caged-string';
            
            const fret = data.frets[i];
            if (fret === -1) {
                stringDiv.textContent = '✕';
                stringDiv.classList.add('muted');
            } else {
                stringDiv.textContent = fret.toString();
                stringDiv.classList.add('fretted');
            }
            
            miniFretboard.appendChild(stringDiv);
        });
        
        shapeDiv.appendChild(miniFretboard);
        container.appendChild(shapeDiv);
    });
}

// Update scale based on chord
function updateScaleForChord(chordName) {
    if (!chordName) return;
    
    const chordData = CHORD_DICTIONARY[chordName];
    if (!chordData) return;
    
    // Extract root note from chord name
    const rootMatch = chordName.match(/^([A-G][#b]?)/);
    if (rootMatch) {
        const rootNote = rootMatch[1];
        const scaleRootSelect = document.getElementById('scaleRoot');
        if (scaleRootSelect) {
            scaleRootSelect.value = rootNote;
            currentScaleRoot = rootNote;
        }
        
        // Suggest scale type based on chord
        if (chordData.type === 'minor') {
            const scaleTypeSelect = document.getElementById('scaleType');
            if (scaleTypeSelect) {
                scaleTypeSelect.value = 'minor-pentatonic';
                currentScaleType = 'minor-pentatonic';
            }
        } else if (chordData.type === 'major') {
            const scaleTypeSelect = document.getElementById('scaleType');
            if (scaleTypeSelect) {
                scaleTypeSelect.value = 'major-pentatonic';
                currentScaleType = 'major-pentatonic';
            }
        }
        
        updateScales();
    }
}

// Export functions
window.initScales = initScales;
window.updateScales = updateScales;
window.updateScaleForChord = updateScaleForChord;

