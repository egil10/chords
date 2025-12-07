// Comprehensive voicing generator - creates all possible voicings for any chord

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const STANDARD_TUNING = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'];

function parseNote(noteString) {
    const match = noteString.match(/^([A-G]#?)(\d+)$/);
    if (!match) throw new Error(`Invalid note format: ${noteString}`);
    return [match[1], parseInt(match[2])];
}

function getPitchClass(stringIndex, fret) {
    if (fret < 0) return null;
    const openStringNote = STANDARD_TUNING[stringIndex];
    const [note] = parseNote(openStringNote);
    const noteIndex = NOTE_NAMES.indexOf(note);
    return (noteIndex + fret) % 12;
}

function getNoteAtFret(stringIndex, fret) {
    if (fret < 0) return null;
    const openStringNote = STANDARD_TUNING[stringIndex];
    const [note, octave] = parseNote(openStringNote);
    const noteIndex = NOTE_NAMES.indexOf(note);
    const newNoteIndex = (noteIndex + fret) % 12;
    return NOTE_NAMES[newNoteIndex];
}

// Find fret position for a note on a string (0-12 range)
function findFretForNote(stringIndex, targetNote) {
    const targetPC = NOTE_NAMES.indexOf(targetNote);
    if (targetPC === -1) return null;
    const openNote = STANDARD_TUNING[stringIndex];
    const [openNoteName] = parseNote(openNote);
    const openPC = NOTE_NAMES.indexOf(openNoteName);
    
    for (let fret = 0; fret <= 12; fret++) {
        const currentPC = (openPC + fret) % 12;
        if (currentPC === targetPC) {
            return fret;
        }
    }
    return null;
}

// Get all notes in a chord based on type
function getChordNotes(rootNote, chordType) {
    const rootIndex = NOTE_NAMES.indexOf(rootNote);
    if (rootIndex === -1) return [];
    
    const notes = [rootNote];
    
    switch(chordType) {
        case 'major':
            notes.push(NOTE_NAMES[(rootIndex + 4) % 12]); // 3rd
            notes.push(NOTE_NAMES[(rootIndex + 7) % 12]); // 5th
            break;
        case 'minor':
            notes.push(NOTE_NAMES[(rootIndex + 3) % 12]); // b3rd
            notes.push(NOTE_NAMES[(rootIndex + 7) % 12]); // 5th
            break;
        case '7':
            notes.push(NOTE_NAMES[(rootIndex + 4) % 12]); // 3rd
            notes.push(NOTE_NAMES[(rootIndex + 7) % 12]); // 5th
            notes.push(NOTE_NAMES[(rootIndex + 10) % 12]); // b7
            break;
        case 'maj7':
            notes.push(NOTE_NAMES[(rootIndex + 4) % 12]); // 3rd
            notes.push(NOTE_NAMES[(rootIndex + 7) % 12]); // 5th
            notes.push(NOTE_NAMES[(rootIndex + 11) % 12]); // 7
            break;
        case 'm7':
            notes.push(NOTE_NAMES[(rootIndex + 3) % 12]); // b3rd
            notes.push(NOTE_NAMES[(rootIndex + 7) % 12]); // 5th
            notes.push(NOTE_NAMES[(rootIndex + 10) % 12]); // b7
            break;
        case 'mMaj7':
            notes.push(NOTE_NAMES[(rootIndex + 3) % 12]); // b3rd
            notes.push(NOTE_NAMES[(rootIndex + 7) % 12]); // 5th
            notes.push(NOTE_NAMES[(rootIndex + 11) % 12]); // 7
            break;
        case '6':
            notes.push(NOTE_NAMES[(rootIndex + 4) % 12]); // 3rd
            notes.push(NOTE_NAMES[(rootIndex + 7) % 12]); // 5th
            notes.push(NOTE_NAMES[(rootIndex + 9) % 12]); // 6
            break;
        case 'add9':
        case '9':
            notes.push(NOTE_NAMES[(rootIndex + 2) % 12]); // 9
            notes.push(NOTE_NAMES[(rootIndex + 4) % 12]); // 3rd
            notes.push(NOTE_NAMES[(rootIndex + 7) % 12]); // 5th
            if (chordType === '9') {
                notes.push(NOTE_NAMES[(rootIndex + 10) % 12]); // b7
            }
            break;
        case 'maj9':
            notes.push(NOTE_NAMES[(rootIndex + 2) % 12]); // 9
            notes.push(NOTE_NAMES[(rootIndex + 4) % 12]); // 3rd
            notes.push(NOTE_NAMES[(rootIndex + 7) % 12]); // 5th
            notes.push(NOTE_NAMES[(rootIndex + 11) % 12]); // 7
            break;
        case 'sus2':
            notes.push(NOTE_NAMES[(rootIndex + 2) % 12]); // 2nd
            notes.push(NOTE_NAMES[(rootIndex + 7) % 12]); // 5th
            break;
        case 'sus4':
            notes.push(NOTE_NAMES[(rootIndex + 5) % 12]); // 4th
            notes.push(NOTE_NAMES[(rootIndex + 7) % 12]); // 5th
            break;
    }
    
    return [...new Set(notes)];
}

// Generate triad voicings on different string sets
function generateTriadVoicings(rootNote, chordType, stringSet) {
    const chordNotes = getChordNotes(rootNote, chordType);
    if (chordNotes.length < 3) return [];
    
    const voicings = [];
    const [root, third, fifth] = chordNotes;
    
    // Generate all inversions
    const inversions = [
        [root, third, fifth],      // Root position
        [third, fifth, root],      // 1st inversion
        [fifth, root, third]       // 2nd inversion
    ];
    
    inversions.forEach((inversion, invIndex) => {
        const frets = [-1, -1, -1, -1, -1, -1];
        let valid = true;
        
        stringSet.forEach((stringIndex, noteIndex) => {
            const note = inversion[noteIndex % inversion.length];
            const fret = findFretForNote(stringIndex, note);
            if (fret === null || fret > 12) {
                valid = false;
            } else {
                frets[stringIndex] = fret;
            }
        });
        
        if (valid) {
            const activeFrets = frets.filter(f => f >= 0);
            const span = Math.max(...activeFrets) - Math.min(...activeFrets);
            if (span <= 5) {
                voicings.push({
                    frets: frets,
                    family: 'triad',
                    voicingType: invIndex === 0 ? 'root' : invIndex === 1 ? '1st' : '2nd',
                    inversion: invIndex === 0 ? 'root position' : invIndex === 1 ? '1st inversion' : '2nd inversion',
                    stringSet: stringSet.join('-'),
                    difficulty: span <= 2 ? 'easy' : span <= 4 ? 'intermediate' : 'advanced'
                });
            }
        }
    });
    
    return voicings;
}

// Generate spread triad (middle note raised by octave)
function generateSpreadTriads(rootNote, chordType, stringSet) {
    const chordNotes = getChordNotes(rootNote, chordType);
    if (chordNotes.length < 3) return [];
    
    const voicings = [];
    const [root, third, fifth] = chordNotes;
    
    // Root position spread
    const frets = [-1, -1, -1, -1, -1, -1];
    const rootFret = findFretForNote(stringSet[0], root);
    const thirdFret = findFretForNote(stringSet[1], third);
    const fifthFret = findFretForNote(stringSet[2], fifth);
    
    if (rootFret !== null && thirdFret !== null && fifthFret !== null) {
        // Raise middle note by finding it an octave higher
        const thirdFretHigh = thirdFret + 12;
        if (thirdFretHigh <= 12) {
            frets[stringSet[0]] = rootFret;
            frets[stringSet[1]] = thirdFretHigh;
            frets[stringSet[2]] = fifthFret;
            
            const activeFrets = frets.filter(f => f >= 0);
            const span = Math.max(...activeFrets) - Math.min(...activeFrets);
            if (span <= 5 && activeFrets.length >= 3) {
                voicings.push({
                    frets: frets,
                    family: 'spread',
                    voicingType: 'spread',
                    inversion: 'root position (spread)',
                    stringSet: stringSet.join('-'),
                    difficulty: 'intermediate'
                });
            }
        }
    }
    
    return voicings;
}

// Generate drop-2 voicings (take 2nd highest note down an octave)
function generateDrop2Voicings(rootNote, chordType, baseVoicing) {
    // This would require a 4-note chord voicing to start with
    // For now, return empty - can be expanded later
    return [];
}

// Generate shell voicings (root-3-7 or root-7-3)
function generateShellVoicings(rootNote, chordType, rootString) {
    const voicings = [];
    const chordNotes = getChordNotes(rootNote, chordType);
    
    if (chordType !== '7' && chordType !== 'maj7' && chordType !== 'm7' && chordType !== 'mMaj7') {
        return voicings; // Shell voicings are for 7th chords
    }
    
    const rootPC = NOTE_NAMES.indexOf(rootNote);
    let thirdPC, seventhPC;
    
    if (chordType === 'maj7') {
        thirdPC = (rootPC + 4) % 12;
        seventhPC = (rootPC + 11) % 12;
    } else if (chordType === 'm7') {
        thirdPC = (rootPC + 3) % 12;
        seventhPC = (rootPC + 10) % 12;
    } else if (chordType === '7') {
        thirdPC = (rootPC + 4) % 12;
        seventhPC = (rootPC + 10) % 12;
    } else {
        return voicings;
    }
    
    const thirdNote = NOTE_NAMES[thirdPC];
    const seventhNote = NOTE_NAMES[seventhPC];
    
    // Try root-3-7 on different string combinations
    const stringCombos = [
        [5, 4, 3], // E-A-D
        [4, 3, 2], // A-D-G
        [3, 2, 1]  // D-G-B
    ];
    
    stringCombos.forEach(combo => {
        const rootFret = findFretForNote(combo[0], rootNote);
        const thirdFret = findFretForNote(combo[1], thirdNote);
        const seventhFret = findFretForNote(combo[2], seventhNote);
        
        if (rootFret !== null && thirdFret !== null && seventhFret !== null) {
            const frets = [-1, -1, -1, -1, -1, -1];
            frets[combo[0]] = rootFret;
            frets[combo[1]] = thirdFret;
            frets[combo[2]] = seventhFret;
            
            const activeFrets = frets.filter(f => f >= 0);
            const span = Math.max(...activeFrets) - Math.min(...activeFrets);
            if (span <= 5) {
                voicings.push({
                    frets: frets,
                    family: 'shell',
                    voicingType: 'shell R-3-7',
                    inversion: 'root',
                    difficulty: 'intermediate'
                });
            }
        }
    });
    
    return voicings;
}

// Generate all voicings for a chord
function generateAllVoicings(rootNote, chordType, baseShapeTemplates) {
    const allVoicings = {
        caged: [],
        triads: [],
        spreadTriads: [],
        shells: [],
        all: []
    };
    
    // Generate triad voicings on different string sets
    const stringSets = [
        [5, 4, 3], // E-A-D
        [4, 3, 2], // A-D-G
        [3, 2, 1], // D-G-B
        [2, 1, 0]  // G-B-E
    ];
    
    stringSets.forEach(stringSet => {
        const triads = generateTriadVoicings(rootNote, chordType, stringSet);
        allVoicings.triads.push(...triads);
        
        const spread = generateSpreadTriads(rootNote, chordType, stringSet);
        allVoicings.spreadTriads.push(...spread);
    });
    
    // Generate shell voicings for 7th chords
    if (chordType.includes('7') || chordType === '7' || chordType === 'maj7' || chordType === 'm7') {
        const shells = generateShellVoicings(rootNote, chordType, 5);
        allVoicings.shells.push(...shells);
    }
    
    // Combine all
    allVoicings.all = [
        ...allVoicings.caged,
        ...allVoicings.triads,
        ...allVoicings.spreadTriads,
        ...allVoicings.shells
    ];
    
    return allVoicings;
}

module.exports = {
    generateAllVoicings,
    generateTriadVoicings,
    generateSpreadTriads,
    generateShellVoicings,
    getChordNotes
};