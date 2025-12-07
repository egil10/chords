// Standard guitar tuning (E2, A2, D3, G3, B3, E4)
export const STANDARD_TUNING = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'];

// Chromatic note names
export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Flat equivalents
export const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

// Get note from string index (0-5) and fret number
export function getNote(stringIndex, fret) {
    if (fret < 0) return null; // Muted string
    
    const openStringNote = STANDARD_TUNING[stringIndex];
    const [note, octave] = parseNote(openStringNote);
    const noteIndex = NOTE_NAMES.indexOf(note);
    
    const newNoteIndex = (noteIndex + fret) % 12;
    const newOctave = octave + Math.floor((noteIndex + fret) / 12);
    
    return NOTE_NAMES[newNoteIndex] + newOctave;
}

// Get pitch class (0-11) from string and fret
export function getPitchClass(stringIndex, fret) {
    if (fret < 0) return null;
    
    const openStringNote = STANDARD_TUNING[stringIndex];
    const [note] = parseNote(openStringNote);
    const noteIndex = NOTE_NAMES.indexOf(note);
    
    return (noteIndex + fret) % 12;
}

// Parse note string like "E2" into ["E", 2]
function parseNote(noteString) {
    const match = noteString.match(/^([A-G]#?)(\d+)$/);
    if (!match) throw new Error(`Invalid note format: ${noteString}`);
    return [match[1], parseInt(match[2])];
}

// Normalize note name (convert flats to sharps, etc.)
export function normalizeNoteName(note) {
    // Remove octave if present
    const baseNote = note.replace(/\d+$/, '');
    const flatIndex = FLAT_NAMES.indexOf(baseNote);
    if (flatIndex !== -1) {
        return NOTE_NAMES[flatIndex];
    }
    return NOTE_NAMES.includes(baseNote) ? baseNote : baseNote;
}

// Get all notes from a voicing (fret array)
export function getNotesFromFrets(frets) {
    return frets.map((fret, stringIndex) => getNote(stringIndex, fret));
}

// Get all pitch classes from a voicing
export function getPitchClassesFromFrets(frets) {
    return frets
        .map((fret, stringIndex) => getPitchClass(stringIndex, fret))
        .filter(pc => pc !== null);
}

// Get unique pitch classes (no octave)
export function getUniquePitchClasses(frets) {
    const pcs = getPitchClassesFromFrets(frets);
    return [...new Set(pcs)].sort((a, b) => a - b);
}

// Get unique note names (no octave)
export function getUniqueNoteNames(frets) {
    const pcs = getUniquePitchClasses(frets);
    return pcs.map(pc => NOTE_NAMES[pc]);
}