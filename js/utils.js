// Shared utilities and constants

// Note names for intervals mapping (chromatic scale)
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const FLAT_NAMES = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

// Standard guitar tuning (EADGBe) - semitones from C
const STANDARD_TUNING = [4, 9, 2, 7, 11, 4]; // E4, A3, D3, G2, B2, E1

// Helper function to convert intervals to interval names
function intervalName(semitones) {
    const intervals = {
        0: 'R', 1: '♭2', 2: '2', 3: '♭3', 4: '3', 5: '4', 6: '♭5',
        7: '5', 8: '♭6', 9: '6', 10: '♭7', 11: '7'
    };
    return intervals[semitones] || semitones;
}

// Normalize note name (convert between sharp and flat)
function normalizeNoteName(note) {
    const sharpIndex = NOTE_NAMES.indexOf(note);
    if (sharpIndex !== -1) return NOTE_NAMES[sharpIndex];
    
    const flatIndex = FLAT_NAMES.indexOf(note);
    if (flatIndex !== -1) return NOTE_NAMES[flatIndex];
    
    return note;
}

// Get note index (handles both sharp and flat notation)
function getNoteIndex(note) {
    const sharpIndex = NOTE_NAMES.indexOf(note);
    if (sharpIndex !== -1) return sharpIndex;
    
    const flatIndex = FLAT_NAMES.indexOf(note);
    if (flatIndex !== -1) return flatIndex;
    
    return -1;
}

// Export for use in other modules
window.NOTE_NAMES = NOTE_NAMES;
window.FLAT_NAMES = FLAT_NAMES;
window.STANDARD_TUNING = STANDARD_TUNING;
window.intervalName = intervalName;
window.normalizeNoteName = normalizeNoteName;
window.getNoteIndex = getNoteIndex;

