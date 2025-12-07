// Slash chord generator - automatically creates slash voicings from base templates

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
    const newOctave = octave + Math.floor((noteIndex + fret) / 12);
    return NOTE_NAMES[newNoteIndex];
}

// Get valid bass notes for a chord type
function getValidBassNotes(chordType, rootNote) {
    const rootIndex = NOTE_NAMES.indexOf(rootNote);
    if (rootIndex === -1) return [];
    
    const bassNotes = [];
    
    // Always include root
    bassNotes.push({
        note: rootNote,
        interval: 0,
        type: 'root'
    });
    
    // Common bass notes based on chord type
    switch(chordType) {
        case 'major':
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 4) % 12], // 3rd
                interval: 4,
                type: '3rd'
            });
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 7) % 12], // 5th
                interval: 7,
                type: '5th'
            });
            break;
            
        case 'minor':
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 3) % 12], // b3rd
                interval: 3,
                type: 'b3rd'
            });
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 7) % 12], // 5th
                interval: 7,
                type: '5th'
            });
            break;
            
        case '7':
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 4) % 12], // 3rd
                interval: 4,
                type: '3rd'
            });
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 7) % 12], // 5th
                interval: 7,
                type: '5th'
            });
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 10) % 12], // b7
                interval: 10,
                type: 'b7'
            });
            break;
            
        case 'maj7':
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 4) % 12], // 3rd
                interval: 4,
                type: '3rd'
            });
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 7) % 12], // 5th
                interval: 7,
                type: '5th'
            });
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 11) % 12], // 7
                interval: 11,
                type: '7'
            });
            break;
            
        case 'm7':
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 3) % 12], // b3rd
                interval: 3,
                type: 'b3rd'
            });
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 7) % 12], // 5th
                interval: 7,
                type: '5th'
            });
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 10) % 12], // b7
                interval: 10,
                type: 'b7'
            });
            break;
            
        case 'mMaj7':
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 3) % 12], // b3rd
                interval: 3,
                type: 'b3rd'
            });
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 7) % 12], // 5th
                interval: 7,
                type: '5th'
            });
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 11) % 12], // 7
                interval: 11,
                type: '7'
            });
            break;
            
        case '6':
        case '6/9':
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 4) % 12], // 3rd
                interval: 4,
                type: '3rd'
            });
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 7) % 12], // 5th
                interval: 7,
                type: '5th'
            });
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 9) % 12], // 6
                interval: 9,
                type: '6'
            });
            break;
            
        case 'add9':
        case '9':
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 2) % 12], // 9
                interval: 2,
                type: '9'
            });
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 4) % 12], // 3rd
                interval: 4,
                type: '3rd'
            });
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 7) % 12], // 5th
                interval: 7,
                type: '5th'
            });
            break;
            
        case 'maj9':
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 2) % 12], // 9
                interval: 2,
                type: '9'
            });
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 4) % 12], // 3rd
                interval: 4,
                type: '3rd'
            });
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 7) % 12], // 5th
                interval: 7,
                type: '5th'
            });
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 11) % 12], // 7
                interval: 11,
                type: '7'
            });
            break;
            
        case 'sus2':
        case 'sus4':
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 2) % 12], // 2nd/9th
                interval: 2,
                type: '9'
            });
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 5) % 12], // 4th
                interval: 5,
                type: '4th'
            });
            bassNotes.push({
                note: NOTE_NAMES[(rootIndex + 7) % 12], // 5th
                interval: 7,
                type: '5th'
            });
            break;
    }
    
    // Remove duplicates
    const seen = new Set();
    return bassNotes.filter(bass => {
        if (seen.has(bass.note)) return false;
        seen.add(bass.note);
        return true;
    });
}

// Find fret position for a note on a string (within reasonable range 0-12)
function findFretForNote(stringIndex, targetNote) {
    const targetPC = NOTE_NAMES.indexOf(targetNote);
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

// Get actual pitch (considering string and fret) - lower number = lower pitch
function getPitchValue(stringIndex, fret) {
    if (fret < 0) return Infinity;
    // String 5 (low E) = lowest pitch, string 0 (high E) = highest
    // Each string is roughly 5 semitones apart, so we weight by string
    return (5 - stringIndex) * 100 + fret; // Weight strings heavily
}

// Generate slash voicing by placing bass note on lowest string
function generateSlashVoicing(baseFrets, baseRootString, baseRootNote, bassNote, chordType) {
    // Try placing bass on strings 5 (low E), 4 (A), 3 (D) - lowest to higher
    const bassStrings = [5, 4, 3];
    
    for (const bassString of bassStrings) {
        const bassFret = findFretForNote(bassString, bassNote);
        if (bassFret === null || bassFret > 12) continue;
        
        // Create new frets array
        const newFrets = [...baseFrets];
        
        // Strategy: Place bass on chosen string and ensure it's the lowest sounding note
        // First, mute any strings that would be lower than our bass
        const bassPitch = getPitchValue(bassString, bassFret);
        
        for (let i = 5; i >= 0; i--) {
            if (i === bassString) continue; // Skip the bass string itself
            if (newFrets[i] < 0) continue; // Already muted
            
            const stringPitch = getPitchValue(i, newFrets[i]);
            // If this string is lower (or equal) pitch than bass, mute it
            if (stringPitch <= bassPitch) {
                newFrets[i] = -1;
            }
        }
        
        // Place bass note on chosen string
        newFrets[bassString] = bassFret;
        
        // Validate the voicing
        const activeFrets = newFrets.filter(f => f >= 0);
        if (activeFrets.length < 3) continue;
        
        // Check span
        const span = Math.max(...activeFrets) - Math.min(...activeFrets);
        if (span > 5) continue; // Skip wide voicings
        
        // Verify bass is actually the lowest
        let lowestPitch = Infinity;
        let lowestString = -1;
        for (let i = 0; i < newFrets.length; i++) {
            if (newFrets[i] >= 0) {
                const pitch = getPitchValue(i, newFrets[i]);
                if (pitch < lowestPitch) {
                    lowestPitch = pitch;
                    lowestString = i;
                }
            }
        }
        
        // If bass isn't lowest, try next string
        if (lowestString !== bassString) {
            continue;
        }
        
        return {
            frets: newFrets,
            bassString: bassString,
            bassFret: bassFret,
            valid: true
        };
    }
    
    return { valid: false };
}

// Generate all slash voicings for a base voicing
function generateAllSlashVoicings(baseVoicing, rootNote, chordType) {
    const slashVoicings = [];
    const validBasses = getValidBassNotes(chordType, rootNote);
    
    // Skip root position (that's the base voicing)
    const nonRootBasses = validBasses.filter(b => b.type !== 'root');
    
    for (const bassInfo of nonRootBasses) {
        const result = generateSlashVoicing(
            baseVoicing.frets,
            baseVoicing.rootString || 5,
            rootNote,
            bassInfo.note,
            chordType
        );
        
        if (result.valid) {
            // Build chord name for slash chord
            let chordName = rootNote;
            if (chordType === 'minor' || chordType === 'm') {
                chordName = rootNote + 'm';
            } else if (chordType === 'maj7') {
                chordName = rootNote + 'maj7';
            } else if (chordType === 'm7') {
                chordName = rootNote + 'm7';
            } else if (chordType === 'mMaj7') {
                chordName = rootNote + 'mMaj7';
            } else if (chordType === '7') {
                chordName = rootNote + '7';
            } else if (chordType === '6/9') {
                chordName = rootNote + '6/9';
            } else if (chordType !== 'major') {
                chordName = rootNote + chordType;
            }
            
            slashVoicings.push({
                frets: result.frets,
                bassString: result.bassString,
                bassNote: bassInfo.note,
                bassType: bassInfo.type,
                slashChord: `${chordName}/${bassInfo.note}`,
                isSlash: true,
                baseVoicing: baseVoicing.name || 'Unknown'
            });
        }
    }
    
    return slashVoicings;
}

module.exports = {
    getValidBassNotes,
    generateSlashVoicing,
    generateAllSlashVoicings,
    findFretForNote
};