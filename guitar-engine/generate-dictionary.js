// Dictionary Generator for Guitar Chord Engine (Node.js CommonJS version)
const fs = require('fs');
const path = require('path');

// Utility functions (inline to avoid ES6 import issues)
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

function getNote(stringIndex, fret) {
    if (fret < 0) return null;
    const openStringNote = STANDARD_TUNING[stringIndex];
    const [note, octave] = parseNote(openStringNote);
    const noteIndex = NOTE_NAMES.indexOf(note);
    const newNoteIndex = (noteIndex + fret) % 12;
    const newOctave = octave + Math.floor((noteIndex + fret) / 12);
    return NOTE_NAMES[newNoteIndex] + newOctave;
}

function getUniqueNoteNames(frets) {
    const pcs = frets
        .map((fret, stringIndex) => getPitchClass(stringIndex, fret))
        .filter(pc => pc !== null);
    const uniquePCs = [...new Set(pcs)].sort((a, b) => a - b);
    return uniquePCs.map(pc => NOTE_NAMES[pc]);
}

function transposeVoicing(voicing, semitones) {
    return {
        ...voicing,
        frets: voicing.frets.map(f => f < 0 ? f : f + semitones)
    };
}

function getInterval(rootPC, notePC) {
    if (rootPC === null || notePC === null) return null;
    return (notePC - rootPC + 12) % 12;
}

function getIntervalsFromFrets(frets, rootString, rootFret) {
    const rootPC = getPitchClass(rootString, rootFret);
    if (rootPC === null) return [];
    return frets.map((fret, stringIndex) => {
        if (fret < 0) return null;
        const notePC = getPitchClass(stringIndex, fret);
        return notePC !== null ? getInterval(rootPC, notePC) : null;
    }).filter(interval => interval !== null);
}

function detectInversion(frets, rootString, rootFret) {
    if (rootFret < 0) return null;
    const rootPC = getPitchClass(rootString, rootFret);
    const allPCs = frets
        .map((f, i) => getPitchClass(i, f))
        .filter(pc => pc !== null);
    if (allPCs.length === 0) return null;
    const sortedPCs = [...allPCs].sort((a, b) => a - b);
    const lowestPC = sortedPCs[0];
    const interval = (lowestPC - rootPC + 12) % 12;
    if (interval === 0) return 'root';
    if (interval === 3 || interval === 4) return '1st';
    if (interval === 7) return '2nd';
    if (interval === 10 || interval === 11) return '3rd';
    return 'unknown';
}

function calculateSpan(frets) {
    const activeFrets = frets.filter(f => f >= 0);
    if (activeFrets.length === 0) return 0;
    return Math.max(...activeFrets) - Math.min(...activeFrets);
}

function validateVoicing(frets, maxSpan = 12) {
    const issues = [];
    const invalidFrets = frets.filter(f => f < -1);
    if (invalidFrets.length > 0) {
        issues.push('Invalid fret values');
    }
    const span = calculateSpan(frets);
    if (span > maxSpan) {
        issues.push(`Fret span too large: ${span}`);
    }
    const uniquePCs = new Set(
        frets.map((f, i) => getPitchClass(i, f)).filter(pc => pc !== null)
    );
    if (uniquePCs.size < 3) {
        issues.push(`Too few distinct notes: ${uniquePCs.size}`);
    }
    return { valid: issues.length === 0, issues };
}

function generateVoicingName(voicing) {
    return voicing.name || `${voicing.category || ''} ${voicing.chordType || ''}`.trim() || 'Standard Voicing';
}

// Load shape files
const shapesPath = path.join(__dirname, 'shapes');
const MAJOR_SHAPES = require(path.join(shapesPath, 'major.js')).MAJOR_SHAPES;
const MINOR_SHAPES = require(path.join(shapesPath, 'minor.js')).MINOR_SHAPES;
const DOM7_SHAPES = require(path.join(shapesPath, 'dominant.js')).DOM7_SHAPES;
const MAJ7_SHAPES = require(path.join(shapesPath, 'maj7.js')).MAJ7_SHAPES;
const M7_SHAPES = require(path.join(shapesPath, 'm7.js')).M7_SHAPES;

let DROP2_MAJ7 = [], DROP2_DOM7 = [], DROP2_MIN7 = [], DOM7_SHELLS = [], MAJ7_SHELLS = [], MIN7_SHELLS = [];
try {
    const jazz = require(path.join(shapesPath, 'jazz.js'));
    DROP2_MAJ7 = jazz.DROP2_MAJ7 || [];
    DROP2_DOM7 = jazz.DROP2_DOM7 || [];
    DROP2_MIN7 = jazz.DROP2_MIN7 || [];
    DOM7_SHELLS = jazz.DOM7_SHELLS || [];
    MAJ7_SHELLS = jazz.MAJ7_SHELLS || [];
    MIN7_SHELLS = jazz.MIN7_SHELLS || [];
} catch (e) {}

let NEOSOUL_CLUSTERS = [], QUARTAL_SHAPES = [];
try {
    const neosoul = require(path.join(shapesPath, 'neosoul.js'));
    NEOSOUL_CLUSTERS = neosoul.NEOSOUL_CLUSTERS || [];
    QUARTAL_SHAPES = neosoul.QUARTAL_SHAPES || [];
} catch (e) {}

let EXTENDED_SHAPES = [];
try {
    EXTENDED_SHAPES = require(path.join(shapesPath, 'extended.js')).EXTENDED_SHAPES || [];
} catch (e) {}

let SUS_SHAPES = [];
try {
    SUS_SHAPES = require(path.join(shapesPath, 'sus.js')).SUS_SHAPES || [];
} catch (e) {}

let DIM_SHAPES = [];
try {
    DIM_SHAPES = require(path.join(shapesPath, 'dim.js')).DIM_SHAPES || [];
} catch (e) {}

let AUG_SHAPES = [];
try {
    AUG_SHAPES = require(path.join(shapesPath, 'aug.js')).AUG_SHAPES || [];
} catch (e) {}

// Load slash chord generator
const slashGenerator = require('./utils/slash-generator.js');

// Load explicit slash chord shapes (for specific voicings)
let SLASH_SHAPES = [];
try {
    const slash = require(path.join(shapesPath, 'slash.js'));
    SLASH_SHAPES = [
        ...(slash.MAJOR_SLASH || []),
        ...(slash.MINOR_SLASH || []),
        ...(slash.DOM7_SLASH || []),
        ...(slash.MAJ7_SLASH || []),
        ...(slash.DROP2_SLASH || []),
        ...(slash.SHELL_SLASH || []),
        ...(slash.NEOSOUL_SLASH || []),
        ...(slash.ALTERED_SLASH || []),
        ...(slash.POLYCHORD_SLASH || []),
        ...(slash.SPREAD_SLASH || []),
        ...(slash.DIM_SLASH || []),
        ...(slash.EXTENDED_SLASH || []),
        ...(slash.SHELL_EXPANDED_SLASH || []),
        ...(slash.POP_ACOUSTIC_SLASH || [])
    ];
} catch (e) {
    // Explicit slash shapes are optional - we'll generate programmatically
}

// Collect all shapes
const ALL_SHAPES = [
    ...MAJOR_SHAPES.map(s => ({ ...s, source: 'major' })),
    ...MINOR_SHAPES.map(s => ({ ...s, source: 'minor' })),
    ...DOM7_SHAPES.map(s => ({ ...s, source: 'dominant' })),
    ...MAJ7_SHAPES.map(s => ({ ...s, source: 'maj7' })),
    ...M7_SHAPES.map(s => ({ ...s, source: 'm7' })),
    ...DROP2_MAJ7.map(s => ({ ...s, source: 'jazz' })),
    ...DROP2_DOM7.map(s => ({ ...s, source: 'jazz' })),
    ...DROP2_MIN7.map(s => ({ ...s, source: 'jazz' })),
    ...DOM7_SHELLS.map(s => ({ ...s, source: 'jazz' })),
    ...MAJ7_SHELLS.map(s => ({ ...s, source: 'jazz' })),
    ...MIN7_SHELLS.map(s => ({ ...s, source: 'jazz' })),
    ...NEOSOUL_CLUSTERS.map(s => ({ ...s, source: 'neosoul' })),
    ...QUARTAL_SHAPES.map(s => ({ ...s, source: 'neosoul' })),
    ...EXTENDED_SHAPES.map(s => ({ ...s, source: 'extended' })),
    ...SUS_SHAPES.map(s => ({ ...s, source: 'sus' })),
    ...DIM_SHAPES.map(s => ({ ...s, source: 'dim' })),
    ...AUG_SHAPES.map(s => ({ ...s, source: 'aug' })),
    ...SLASH_SHAPES.map(s => ({ ...s, source: 'slash', isSlash: true }))
];

function getTranspositionSemitones(targetRoot) {
    return NOTE_NAMES.indexOf(targetRoot);
}

function generateVoicingForRoot(shapeTemplate, rootNote) {
    const semitones = getTranspositionSemitones(rootNote);
    const transposedVoicing = transposeVoicing(shapeTemplate, semitones);
    const frets = transposedVoicing.frets;
    
    const rootString = transposedVoicing.rootString || 0;
    const rootFret = frets[rootString];
    
    const validation = validateVoicing(frets, 12);
    if (!validation.valid) {
        return null;
    }
    
    const rootPC = rootFret >= 0 ? getPitchClass(rootString, rootFret) : null;
    const notes = frets.map((f, i) => getNote(i, f));
    const noteNames = getUniqueNoteNames(frets);
    const intervals = rootPC !== null ? getIntervalsFromFrets(frets, rootString, rootFret) : [];
    const inversion = rootPC !== null ? detectInversion(frets, rootString, rootFret) : null;
    const span = calculateSpan(frets);
    const voicingName = generateVoicingName(transposedVoicing);
    
    // Build positions array (compatible with existing format)
    const positions = [{
        frets: frets,
        notes: noteNames,
        intervals: intervals
    }];
    
    return {
        frets: frets,
        rootString: rootString,
        type: transposedVoicing.chordType || shapeTemplate.chordType,
        notes: noteNames,
        intervals: intervals,
        positions: positions,
        // Additional metadata
        root: rootNote,
        shapeName: voicingName,
        difficulty: transposedVoicing.complexity || transposedVoicing.difficulty || 'intermediate',
        category: transposedVoicing.category || 'standard',
        inversion: inversion || 'root',
        span: span,
        name: transposedVoicing.name || shapeTemplate.name
    };
}

// Get bass note from slash type and root
function getBassNoteFromSlashType(root, slashType) {
    const rootIndex = NOTE_NAMES.indexOf(root);
    if (rootIndex === -1) return null;
    
    switch(slashType) {
        case '3': return NOTE_NAMES[(rootIndex + 4) % 12]; // Major 3rd
        case 'b3': return NOTE_NAMES[(rootIndex + 3) % 12]; // Minor 3rd
        case '5': return NOTE_NAMES[(rootIndex + 7) % 12]; // Perfect 5th
        case 'b7': return NOTE_NAMES[(rootIndex + 10) % 12]; // Minor 7th
        case '7': return NOTE_NAMES[(rootIndex + 11) % 12]; // Major 7th
        case '9': return NOTE_NAMES[(rootIndex + 2) % 12]; // 9th (2nd)
        case '#11': return NOTE_NAMES[(rootIndex + 6) % 12]; // Augmented 4th
        default: return null;
    }
}

// Generate slash chord name
function generateSlashChordName(root, chordType, bassNote) {
    // Handle special cases
    let chordName = root;
    if (chordType === 'minor' || chordType === 'm') {
        chordName = root + 'm';
    } else if (chordType === 'maj7') {
        chordName = root + 'maj7';
    } else if (chordType === 'm7') {
        chordName = root + 'm7';
    } else if (chordType === '7') {
        chordName = root + '7';
    } else if (chordType !== 'major') {
        chordName = root + chordType;
    }
    
    return chordName + '/' + bassNote;
}

function generateDictionary() {
    const dictionary = {};
    
    ALL_SHAPES.forEach(shapeTemplate => {
        const chordType = shapeTemplate.chordType;
        if (!chordType) {
            console.warn(`Shape missing chordType:`, shapeTemplate.name || shapeTemplate);
            return;
        }
        
        const isSlash = shapeTemplate.isSlash || false;
        const slashType = shapeTemplate.slashType;
        
        // Handle pop acoustic slash chords with fixed roots
        if (shapeTemplate.rootOverride && shapeTemplate.bassOverride) {
            const chordKey = shapeTemplate.rootOverride + (chordType === 'minor' ? 'm' : '') + '/' + shapeTemplate.bassOverride;
            if (!dictionary[chordKey]) {
                dictionary[chordKey] = {
                    type: chordType,
                    notes: [],
                    intervals: [],
                    positions: []
                };
            }
            
            // Use the shape as-is (already in correct key)
            const voicing = generateVoicingForRoot(shapeTemplate, shapeTemplate.rootOverride);
            if (voicing) {
                voicing.notes.forEach(note => {
                    if (!dictionary[chordKey].notes.includes(note)) {
                        dictionary[chordKey].notes.push(note);
                    }
                });
                voicing.intervals.forEach(interval => {
                    if (!dictionary[chordKey].intervals.includes(interval)) {
                        dictionary[chordKey].intervals.push(interval);
                    }
                });
                dictionary[chordKey].positions.push({
                    frets: voicing.frets,
                    root: voicing.frets[shapeTemplate.rootString || 0] >= 0 
                        ? shapeTemplate.rootString || 0 
                        : voicing.frets.findIndex(f => f >= 0)
                });
            }
            return;
        }
        
        NOTE_NAMES.forEach(root => {
            // Create chord key
            let chordKey;
            
            if (isSlash && slashType) {
                // Generate slash chord name
                const bassNote = getBassNoteFromSlashType(root, slashType);
                if (!bassNote) return; // Skip if can't determine bass note
                chordKey = generateSlashChordName(root, chordType, bassNote);
            } else {
                // Regular chord naming
                chordKey = root;
                if (chordType === 'minor' || chordType === 'm') {
                    chordKey = root + 'm';
                } else if (chordType === 'maj7') {
                    chordKey = root + 'maj7';
                } else if (chordType === 'm7') {
                    chordKey = root + 'm7';
                } else if (chordType === 'mMaj7') {
                    chordKey = root + 'mMaj7';
                } else if (chordType === '7') {
                    chordKey = root + '7';
                } else if (chordType === '6/9') {
                    chordKey = root + '6/9';
                } else if (chordType !== 'major') {
                    chordKey = root + chordType;
                }
            }
            
            if (!dictionary[chordKey]) {
                dictionary[chordKey] = {
                    type: chordType,
                    notes: [],
                    intervals: [],
                    positions: []
                };
            }
            
            const voicing = generateVoicingForRoot(shapeTemplate, root);
            if (voicing) {
                // Add unique notes
                voicing.notes.forEach(note => {
                    if (!dictionary[chordKey].notes.includes(note)) {
                        dictionary[chordKey].notes.push(note);
                    }
                });
                
                // Add unique intervals
                voicing.intervals.forEach(interval => {
                    if (!dictionary[chordKey].intervals.includes(interval)) {
                        dictionary[chordKey].intervals.push(interval);
                    }
                });
                
                // Add position
                dictionary[chordKey].positions.push({
                    frets: voicing.frets,
                    root: voicing.frets[shapeTemplate.rootString || 0] >= 0 
                        ? shapeTemplate.rootString || 0 
                        : voicing.frets.findIndex(f => f >= 0)
                });
                
                // Generate slash voicings for this base voicing
                // Skip if this is already a slash chord or has special handling
                // Only generate for common chord types that support slash bass
                const slashableTypes = ['major', 'minor', '7', 'maj7', 'm7', 'mMaj7', '6', '6/9', 'add9', '9', 'maj9', 'sus2', 'sus4'];
                if (!isSlash && !shapeTemplate.rootOverride && slashableTypes.includes(chordType)) {
                    try {
                        const slashVoicings = slashGenerator.generateAllSlashVoicings(
                            voicing,
                            root,
                            chordType
                        );
                        
                        for (const slashVoicing of slashVoicings) {
                            const slashChordKey = slashVoicing.slashChord;
                            
                            if (!dictionary[slashChordKey]) {
                                dictionary[slashChordKey] = {
                                    type: chordType, // Keep original chord type
                                    notes: [],
                                    intervals: [],
                                    positions: []
                                };
                            }
                            
                            // Compute notes and intervals for slash voicing
                            // Note: intervals are still calculated relative to the chord root, not the bass
                            const slashNotes = getUniqueNoteNames(slashVoicing.frets);
                            const originalRootString = voicing.rootString || 5;
                            const originalRootFret = voicing.frets[originalRootString];
                            const originalRootPC = originalRootFret >= 0 ? getPitchClass(originalRootString, originalRootFret) : null;
                            const slashIntervals = originalRootPC !== null 
                                ? getIntervalsFromFrets(slashVoicing.frets, originalRootString, originalRootFret)
                                : [];
                            
                            // Add notes
                            slashNotes.forEach(note => {
                                if (!dictionary[slashChordKey].notes.includes(note)) {
                                    dictionary[slashChordKey].notes.push(note);
                                }
                            });
                            
                            // Add intervals (relative to chord root)
                            slashIntervals.forEach(interval => {
                                if (!dictionary[slashChordKey].intervals.includes(interval)) {
                                    dictionary[slashChordKey].intervals.push(interval);
                                }
                            });
                            
                            // Add position with slash metadata
                            dictionary[slashChordKey].positions.push({
                                frets: slashVoicing.frets,
                                root: originalRootString,
                                bass: slashVoicing.bassNote,
                                bassString: slashVoicing.bassString,
                                isSlash: true,
                                baseVoicing: voicing.name || 'Unknown'
                            });
                        }
                    } catch (e) {
                        // Silently skip if slash generation fails
                        // console.warn(`Could not generate slash voicings for ${chordKey}:`, e.message);
                    }
                }
            }
        });
    });
    
    // Sort notes and intervals
    Object.keys(dictionary).forEach(chordKey => {
        dictionary[chordKey].notes.sort();
        dictionary[chordKey].intervals.sort((a, b) => a - b);
    });
    
    return dictionary;
}

// Main execution
if (require.main === module) {
    console.log('Generating chord dictionary...');
    const dictionary = generateDictionary();
    
    const outputPath = path.join(__dirname, 'chord-dictionary.json');
    const jsonOutput = JSON.stringify(dictionary, null, 2);
    
    fs.writeFileSync(outputPath, jsonOutput, 'utf8');
    console.log(`Dictionary generated: ${outputPath}`);
    
    let totalVoicings = 0;
    Object.values(dictionary).forEach(chord => {
        if (chord.positions) {
            totalVoicings += chord.positions.length;
        }
    });
    console.log(`Total chords: ${Object.keys(dictionary).length}`);
    console.log(`Total voicings: ${totalVoicings}`);
}

module.exports = { generateDictionary };