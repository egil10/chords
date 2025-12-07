// Transpose a voicing by semitones
export function transposeVoicing(voicing, semitones) {
    return {
        ...voicing,
        frets: voicing.frets.map(f => f < 0 ? f : f + semitones)
    };
}

// Get root note from voicing
export function getRootNote(voicing, frets) {
    const rootString = voicing.rootString || voicing.rootStringIndex || 0;
    const rootFret = frets[rootString];
    
    if (rootFret < 0) {
        // Root string is muted, find first non-muted string
        for (let i = 0; i < frets.length; i++) {
            if (frets[i] >= 0) {
                const { getNote } = require('./notes.js');
                return getNote(i, frets[i]);
            }
        }
        return null;
    }
    
    const { getNote } = require('./notes.js');
    return getNote(rootString, rootFret);
}

// Get root pitch class from voicing
export function getRootPitchClass(voicing, frets) {
    const rootString = voicing.rootString || voicing.rootStringIndex || 0;
    const rootFret = frets[rootString];
    
    if (rootFret < 0) {
        // Root string is muted, find first non-muted string
        for (let i = 0; i < frets.length; i++) {
            if (frets[i] >= 0) {
                const { getPitchClass } = require('./notes.js');
                return getPitchClass(i, frets[i]);
            }
        }
        return null;
    }
    
    const { getPitchClass } = require('./notes.js');
    return getPitchClass(rootString, rootFret);
}