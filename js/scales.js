// Binary vector templates for scales (12-fret pattern, can be shifted for any key)
// Each string is represented as a 12-element binary array [0-11 frets]
// 1 = scale note, 0 = not in scale
// All templates are based on G as the reference key
const SCALE_BINARY_TEMPLATES = {
    // G Major Scale (Ionian) - 1 2 3 4 5 6 7 = G A B C D E F#
    'major': {
        name: 'Major (Ionian)',
        intervals: [0, 2, 4, 5, 7, 9, 11],
        description: 'All chord tones plus scale passing tones. Use for melodic solos over G, Gmaj7, G6, etc.',
        template: {
            '6': [1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0],
            '5': [0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
            '4': [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0],
            '3': [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0],
            '2': [1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
            '1': [1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0]
        }
    },
    
    // G Minor template (1 ♭3 5 = G B♭ D)
    'minor': {
        name: 'Natural Minor (Aeolian)',
        intervals: [0, 2, 3, 5, 7, 8, 10],
        template: {
            '6': [1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0],
            '5': [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
            '4': [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
            '3': [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
            '2': [1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0],
            '1': [1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0]
        }
    },
    
    // G Major Pentatonic - 1 2 3 5 6 = G A B D E
    'major-pentatonic': {
        name: 'Major Pentatonic',
        intervals: [0, 2, 4, 7, 9],
        description: 'The "bluesless blues scale" — works for rock/country soloing. Use over G, G6, Gadd9.',
        template: {
            '6': [1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1],
            '5': [0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
            '4': [1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0],
            '3': [1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0],
            '2': [1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
            '1': [1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1]
        }
    },
    
    // G Minor Pentatonic template
    'minor-pentatonic': {
        name: 'Minor Pentatonic',
        intervals: [0, 3, 5, 7, 10],
        template: {
            '6': [1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0],
            '5': [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
            '4': [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
            '3': [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
            '2': [1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0],
            '1': [1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0]
        }
    },
    
    // G Mixolydian - 1 2 3 4 5 6 ♭7 = G A B C D E F
    'mixolydian': {
        name: 'Mixolydian (Dominant)',
        intervals: [0, 2, 4, 5, 7, 9, 10],
        description: 'Adds F (♭7), perfect for dominant feel. Use over G7, G9.',
        template: {
            '6': [1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
            '5': [0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0],
            '4': [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
            '3': [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
            '2': [1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
            '1': [1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0]
        }
    },
    
    // G Lydian - 1 2 3 #4 5 6 7 = G A B C# D E F#
    'lydian': {
        name: 'Lydian',
        intervals: [0, 2, 4, 6, 7, 9, 11],
        description: 'Great for fusion/ambient sounds. Use over Gmaj7#11.',
        template: {
            '6': [1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0],
            '5': [0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
            '4': [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0],
            '3': [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0],
            '2': [1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0],
            '1': [1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0]
        }
    },
    
    // G Blues Scale - 1 ♭3 4 ♭5 5 ♭7 = G Bb C Db D F
    'blues': {
        name: 'Blues Scale',
        intervals: [0, 3, 5, 6, 7, 10],
        description: 'Adds the "blue note" (♭5 = Db) — used in rock, jazz, funk. Use over G7, rock progressions.',
        template: {
            '6': [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0],
            '5': [0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0],
            '4': [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
            '3': [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
            '2': [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0],
            '1': [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0]
        }
    },
    
    // G Bebop Major - 1 2 3 4 5 ♯5 6 7 = G A B C D D# E F#
    'bebop-major': {
        name: 'Bebop Major',
        intervals: [0, 2, 4, 5, 7, 8, 9, 11],
        description: 'Adds chromatic passing tone (♯5) for swing phrasing. Use over jazz Gmaj7.',
        template: {
            '6': [1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0],
            '5': [0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
            '4': [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0],
            '3': [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0],
            '2': [1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0],
            '1': [1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0]
        }
    },
    
    // G Dorian template
    'dorian': {
        name: 'Dorian',
        intervals: [0, 2, 3, 5, 7, 9, 10],
        template: {
            '6': [1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0],
            '5': [0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
            '4': [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
            '3': [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
            '2': [1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
            '1': [1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0]
        }
    },
    
    // G Harmonic Minor - 1 2 ♭3 4 5 ♭6 7 = G A Bb C D Eb F#
    'harmonic-minor': {
        name: 'Harmonic Minor',
        intervals: [0, 2, 3, 5, 7, 8, 11],
        description: 'Exotic tension with raised 7th. Use for minor progressions with leading tone.',
        template: {
            '6': [1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1],
            '5': [0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0],
            '4': [1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1],
            '3': [1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1],
            '2': [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
            '1': [1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1]
        }
    }
};

// Legacy scale patterns (kept for compatibility)
const SCALE_PATTERNS = {
    
    // Natural Minor (Aeolian)
    'minor': {
        name: 'Natural Minor (Aeolian)',
        intervals: [0, 2, 3, 5, 7, 8, 10],
        positions: [
            { name: 'Position 1', frets: [0, 2, 3, 5, 7, 8, 10, 12], startFret: 0 },
            { name: 'Position 2', frets: [2, 3, 5, 7, 9, 10, 12, 14], startFret: 2 },
            { name: 'Position 3', frets: [3, 5, 7, 8, 10, 12, 14, 15], startFret: 3 },
            { name: 'Position 4', frets: [5, 7, 8, 10, 12, 14, 15, 17], startFret: 5 },
            { name: 'Position 5', frets: [7, 8, 10, 12, 14, 15, 17, 19], startFret: 7 }
        ]
    },
    
    // Major Pentatonic
    'major-pentatonic': {
        name: 'Major Pentatonic',
        intervals: [0, 2, 4, 7, 9],
        positions: [
            { name: 'Box 1', frets: [0, 2, 4, 7, 9, 12], startFret: 0 },
            { name: 'Box 2', frets: [2, 4, 7, 9, 12, 14], startFret: 2 },
            { name: 'Box 3', frets: [4, 7, 9, 12, 14, 16], startFret: 4 },
            { name: 'Box 4', frets: [7, 9, 12, 14, 16, 19], startFret: 7 },
            { name: 'Box 5', frets: [9, 12, 14, 16, 19, 21], startFret: 9 }
        ]
    },
    
    // Minor Pentatonic
    'minor-pentatonic': {
        name: 'Minor Pentatonic',
        intervals: [0, 3, 5, 7, 10],
        positions: [
            { name: 'Box 1 (Blues Box)', frets: [0, 3, 5, 7, 10, 12], startFret: 0 },
            { name: 'Box 2', frets: [3, 5, 7, 10, 12, 15], startFret: 3 },
            { name: 'Box 3', frets: [5, 7, 10, 12, 15, 17], startFret: 5 },
            { name: 'Box 4', frets: [7, 10, 12, 15, 17, 19], startFret: 7 },
            { name: 'Box 5', frets: [10, 12, 15, 17, 19, 22], startFret: 10 }
        ]
    },
    
    // Blues Scale
    'blues': {
        name: 'Blues Scale',
        intervals: [0, 3, 5, 6, 7, 10],
        positions: [
            { name: 'Box 1', frets: [0, 3, 5, 6, 7, 10, 12], startFret: 0 },
            { name: 'Box 2', frets: [3, 5, 6, 7, 10, 12, 15], startFret: 3 },
            { name: 'Box 3', frets: [5, 6, 7, 10, 12, 15, 17], startFret: 5 },
            { name: 'Box 4', frets: [6, 7, 10, 12, 15, 17, 18], startFret: 6 },
            { name: 'Box 5', frets: [7, 10, 12, 15, 17, 18, 19], startFret: 7 }
        ]
    },
    
    // Mixolydian
    'mixolydian': {
        name: 'Mixolydian (Dominant)',
        intervals: [0, 2, 4, 5, 7, 9, 10],
        positions: [
            { name: 'Position 1', frets: [0, 2, 4, 5, 7, 9, 10, 12], startFret: 0 },
            { name: 'Position 2', frets: [2, 4, 5, 7, 9, 10, 12, 14], startFret: 2 },
            { name: 'Position 3', frets: [4, 5, 7, 9, 11, 12, 14, 16], startFret: 4 },
            { name: 'Position 4', frets: [5, 7, 9, 10, 12, 14, 16, 17], startFret: 5 },
            { name: 'Position 5', frets: [7, 9, 10, 12, 14, 16, 17, 19], startFret: 7 }
        ]
    },
    
    // Dorian
    'dorian': {
        name: 'Dorian',
        intervals: [0, 2, 3, 5, 7, 9, 10],
        positions: [
            { name: 'Position 1', frets: [0, 2, 3, 5, 7, 9, 10, 12], startFret: 0 },
            { name: 'Position 2', frets: [2, 3, 5, 7, 9, 10, 12, 14], startFret: 2 },
            { name: 'Position 3', frets: [3, 5, 7, 9, 10, 12, 14, 15], startFret: 3 },
            { name: 'Position 4', frets: [5, 7, 9, 10, 12, 14, 15, 17], startFret: 5 },
            { name: 'Position 5', frets: [7, 9, 10, 12, 14, 15, 17, 19], startFret: 7 }
        ]
    },
    
    // Lydian
    'lydian': {
        name: 'Lydian',
        intervals: [0, 2, 4, 6, 7, 9, 11],
        positions: [
            { name: 'Position 1', frets: [0, 2, 4, 6, 7, 9, 11, 12], startFret: 0 },
            { name: 'Position 2', frets: [2, 4, 6, 7, 9, 11, 12, 14], startFret: 2 },
            { name: 'Position 3', frets: [4, 6, 7, 9, 11, 13, 14, 16], startFret: 4 },
            { name: 'Position 4', frets: [6, 7, 9, 11, 13, 14, 16, 18], startFret: 6 },
            { name: 'Position 5', frets: [7, 9, 11, 13, 14, 16, 18, 19], startFret: 7 }
        ]
    },
    
    // Harmonic Minor
    'harmonic-minor': {
        name: 'Harmonic Minor',
        intervals: [0, 2, 3, 5, 7, 8, 11],
        positions: [
            { name: 'Position 1', frets: [0, 2, 3, 5, 7, 8, 11, 12], startFret: 0 },
            { name: 'Position 2', frets: [2, 3, 5, 7, 9, 11, 12, 14], startFret: 2 },
            { name: 'Position 3', frets: [3, 5, 7, 9, 11, 12, 14, 15], startFret: 3 },
            { name: 'Position 4', frets: [5, 7, 9, 11, 12, 14, 15, 17], startFret: 5 },
            { name: 'Position 5', frets: [7, 9, 11, 12, 14, 15, 17, 19], startFret: 7 }
        ]
    }
};

// Chord binary templates (12-fret patterns for chord notes)
// Shows all frets where chord notes appear across the neck
// These are the "harmonic skeleton" - base chord tones
const CHORD_BINARY_TEMPLATES = {
    // G Major Triad (1 3 5 = G B D) - Basic chord tones
    'major': {
        name: 'Major Triad',
        description: 'Pure harmony - chord tones only',
        template: {
            '6': [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0], // G on frets 3, 7, 10
            '5': [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
            '4': [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
            '3': [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
            '2': [1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0],
            '1': [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]
        }
    },
    // G Minor Triad (1 ♭3 5 = G B♭ D)
    'minor': {
        name: 'Minor Triad',
        description: 'Pure harmony - minor chord tones',
        template: {
            '6': [1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0],
            '5': [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
            '4': [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
            '3': [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
            '2': [1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0],
            '1': [1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0]
        }
    },
    // G7 (Dominant = 1 3 5 ♭7 = G B D F)
    '7': {
        name: 'Dominant 7th',
        description: 'Adds ♭7 (F) for dominant feel',
        template: {
            '6': [1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
            '5': [0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0],
            '4': [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
            '3': [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
            '2': [1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
            '1': [1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0]
        }
    },
    // Gmaj7 (1 3 5 7 = G B D F#)
    'maj7': {
        name: 'Major 7th',
        description: 'Adds 7th (F#) for major 7th sound',
        template: {
            '6': [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
            '5': [0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0],
            '4': [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
            '3': [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
            '2': [1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
            '1': [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0]
        }
    }
};

// CAGED System shapes
const CAGED_SHAPES = {
    'C': {
        name: 'C Shape',
        rootString: 5,
        frets: [0, 3, 3, 2, 0, 0], // Example for C major
        description: 'Root on 5th string (A string)'
    },
    'A': {
        name: 'A Shape',
        rootString: 5,
        frets: [0, 0, 2, 2, 2, 0], // Example for A major
        description: 'Root on 5th string (A string)'
    },
    'G': {
        name: 'G Shape',
        rootString: 6,
        frets: [3, 3, 0, 0, 3, 3], // Example for G major
        description: 'Root on 6th string (E string)'
    },
    'E': {
        name: 'E Shape',
        rootString: 6,
        frets: [0, 2, 2, 1, 0, 0], // Example for E major
        description: 'Root on 6th string (E string)'
    },
    'D': {
        name: 'D Shape',
        rootString: 4,
        frets: [-1, 0, 0, 2, 3, 2], // Example for D major
        description: 'Root on 4th string (D string)'
    }
};

// Shift binary vector template to a different key
// semitones: positive = shift right (higher), negative = shift left (lower)
function shiftTemplate(template, semitones) {
    const shifted = {};
    for (const [string, pattern] of Object.entries(template)) {
        shifted[string] = pattern.map((_, index) => {
            // Shift pattern: if semitones is positive, shift right (subtract)
            // If negative, shift left (add, then mod)
            const shiftedIndex = (index - semitones + 12) % 12;
            return pattern[shiftedIndex];
        });
    }
    return shifted;
}

// Get scale notes for a given root
function getScaleNotes(rootNote, scaleType) {
    const scaleTemplate = SCALE_BINARY_TEMPLATES[scaleType];
    if (!scaleTemplate) return [];
    
    const rootIndex = NOTE_NAMES.indexOf(rootNote);
    if (rootIndex === -1) {
        const flatIndex = FLAT_NAMES.indexOf(rootNote);
        if (flatIndex === -1) return [];
        return getScaleNotes(NOTE_NAMES[flatIndex], scaleType);
    }
    
    // G is at index 7, calculate shift
    const gIndex = 7;
    const shift = (rootIndex - gIndex + 12) % 12;
    
    return scaleTemplate.intervals.map(interval => {
        return NOTE_NAMES[(rootIndex + interval) % 12];
    });
}

// Get shifted binary template for a given root note
function getShiftedTemplate(rootNote, scaleType) {
    const template = SCALE_BINARY_TEMPLATES[scaleType];
    if (!template) return null;
    
    const rootIndex = NOTE_NAMES.indexOf(rootNote);
    if (rootIndex === -1) {
        const flatIndex = FLAT_NAMES.indexOf(rootNote);
        if (flatIndex === -1) return null;
        return getShiftedTemplate(NOTE_NAMES[flatIndex], scaleType);
    }
    
    // G is at index 7, calculate shift
    const gIndex = 7;
    const shift = (rootIndex - gIndex + 12) % 12;
    
    return shiftTemplate(template.template, shift);
}

// Get recommended scale for progression
function getRecommendedScale(progressionType, isMinor = false) {
    const recommendations = {
        'I–IV–V': isMinor ? 'minor-pentatonic' : 'major-pentatonic',
        'I–V–vi–IV': 'major',
        'ii–V–I': 'dorian',
        '12-bar blues': 'blues',
        'i–♭VII–♭VI–V': 'harmonic-minor'
    };
    
    // Try to match progression pattern
    for (const [pattern, scale] of Object.entries(recommendations)) {
        if (progressionType.includes(pattern)) {
            return scale;
        }
    }
    
    return isMinor ? 'minor-pentatonic' : 'major-pentatonic';
}

// Get chord binary template for a given chord type and root
function getChordTemplate(rootNote, chordType) {
    const template = CHORD_BINARY_TEMPLATES[chordType];
    if (!template) return null;
    
    const rootIndex = NOTE_NAMES.indexOf(rootNote);
    if (rootIndex === -1) {
        const flatIndex = FLAT_NAMES.indexOf(rootNote);
        if (flatIndex === -1) return null;
        return getChordTemplate(NOTE_NAMES[flatIndex], chordType);
    }
    
    // G is at index 7, calculate shift
    const gIndex = 7;
    const shift = (rootIndex - gIndex + 12) % 12;
    
    return shiftTemplate(template.template, shift);
}

// Export functions
window.SCALE_PATTERNS = SCALE_PATTERNS;
window.SCALE_BINARY_TEMPLATES = SCALE_BINARY_TEMPLATES;
window.CHORD_BINARY_TEMPLATES = CHORD_BINARY_TEMPLATES;
window.CAGED_SHAPES = CAGED_SHAPES;
window.getScaleNotes = getScaleNotes;
window.getShiftedTemplate = getShiftedTemplate;
window.getChordTemplate = getChordTemplate;
window.getRecommendedScale = getRecommendedScale;

