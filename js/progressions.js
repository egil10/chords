// Chord progression patterns and functions
const PROGRESSION_PATTERNS = {
    // Pop / Rock / Folk Standards
    'pop-rock': [
        { name: 'I–IV–V', pattern: [1, 4, 5], description: 'Simple rock / folk' },
        { name: 'I–V–vi–IV', pattern: [1, 5, 6, 4], description: 'Pop "Axis" progression' },
        { name: 'I–vi–IV–V', pattern: [1, 6, 4, 5], description: '50s / doo-wop' },
        { name: 'vi–IV–I–V', pattern: [6, 4, 1, 5], description: 'Ballad pattern' },
        { name: 'I–IV–vi–V', pattern: [1, 4, 6, 5], description: 'Country / pop variant' },
        { name: 'I–V–IV', pattern: [1, 5, 4], description: 'Bluesy rock' },
        { name: 'IV–I–V–I', pattern: [4, 1, 5, 1], description: 'Folk / gospel flavor' }
    ],
    
    // Jazz & Functional Harmony
    'jazz': [
        { name: 'ii–V–I', pattern: [2, 5, 1], description: 'Core jazz cadence' },
        { name: 'I–vi–ii–V', pattern: [1, 6, 2, 5], description: '"Turnaround"' },
        { name: 'iii–vi–ii–V', pattern: [3, 6, 2, 5], description: 'Extended turnaround' },
        { name: 'vi–ii–V–I', pattern: [6, 2, 5, 1], description: '"Backdoor" movement' },
        { name: 'ii–V–iii–VI', pattern: [2, 5, 3, 6], description: 'Circle motion' },
        { name: 'I–♭VII–IV', pattern: [1, -7, 4], description: 'Mixolydian / rock-jazz' }
    ],
    
    // Blues & Rock-Based
    'blues': [
        { name: '12-bar blues', pattern: [1, 1, 1, 1, 4, 4, 1, 1, 5, 4, 1, 1], description: 'Classic 12-bar' },
        { name: 'Quick-change blues', pattern: [1, 4, 1, 1, 4, 4, 1, 1, 5, 4, 1, 5], description: 'Quick-change variant' },
        { name: 'Minor blues', pattern: [1, 4, 1, 1, 4, 4, 1, 1, 5, 4, 1, 1], description: 'Minor key blues', minor: true }
    ],
    
    // Classical & Functional Cadences
    'classical': [
        { name: 'Perfect authentic cadence', pattern: [5, 1], description: 'Strong resolution' },
        { name: 'Plagal cadence', pattern: [4, 1], description: '"Amen" sound' },
        { name: 'Half cadence', pattern: [1, 4, 5], description: 'Suspense / pause' },
        { name: 'Deceptive cadence', pattern: [5, 6], description: 'Surprise / continuation' },
        { name: 'Phrygian cadence', pattern: [4, 5], description: 'Classical tension', minor: true }
    ],
    
    // Minor Key Progressions
    'minor': [
        { name: 'i–iv–V', pattern: [1, 4, 5], description: 'Classic minor', minor: true },
        { name: 'i–♭VII–♭VI–V', pattern: [1, -7, -6, 5], description: 'Aeolian progression', minor: true },
        { name: 'i–VI–III–VII', pattern: [1, 6, 3, 7], description: 'Minor movement', minor: true },
        { name: 'i–VII–VI–VII', pattern: [1, 7, 6, 7], description: 'Minor modal', minor: true },
        { name: 'i–iv–VII', pattern: [1, 4, 7], description: 'Minor modal variant', minor: true },
        { name: 'i–V–VI–VII', pattern: [1, 5, 6, 7], description: 'Minor ascending', minor: true }
    ],
    
    // Circle of Fifths Motion
    'circle': [
        { name: 'vi–ii–V–I', pattern: [6, 2, 5, 1], description: 'Circle progression' },
        { name: 'iii–vi–ii–V', pattern: [3, 6, 2, 5], description: 'Extended circle' },
        { name: 'I–IV–vii°–iii–vi–ii–V–I', pattern: [1, 4, 7, 3, 6, 2, 5, 1], description: 'Full circle' }
    ],
    
    // Modern & Modal Progressions
    'modal': [
        { name: 'Dorian (i–IV)', pattern: [1, 4], description: 'Dorian mode', minor: true },
        { name: 'Mixolydian (I–♭VII–IV)', pattern: [1, -7, 4], description: 'Mixolydian mode' },
        { name: 'Aeolian (i–♭VI–♭VII)', pattern: [1, -6, -7], description: 'Aeolian mode', minor: true },
        { name: 'Lydian (I–II)', pattern: [1, 2], description: 'Lydian mode' },
        { name: 'Phrygian (i–♭II)', pattern: [1, -2], description: 'Phrygian mode', minor: true }
    ]
};

// Chord quality mapping for diatonic chords
const DIATONIC_CHORDS = {
    major: {
        1: { quality: 'major', intervals: [0, 4, 7] },
        2: { quality: 'minor', intervals: [2, 5, 9] },
        3: { quality: 'minor', intervals: [4, 7, 11] },
        4: { quality: 'major', intervals: [5, 9, 0] },
        5: { quality: 'major', intervals: [7, 11, 2] },
        6: { quality: 'minor', intervals: [9, 0, 4] },
        7: { quality: 'dim', intervals: [11, 2, 6] },
        '-7': { quality: 'major', intervals: [10, 2, 5] }, // bVII
        '-6': { quality: 'major', intervals: [8, 0, 3] }, // bVI
        '-2': { quality: 'major', intervals: [1, 5, 8] }  // bII
    },
    minor: {
        1: { quality: 'minor', intervals: [0, 3, 7] },
        2: { quality: 'dim', intervals: [2, 5, 8] },
        3: { quality: 'major', intervals: [3, 7, 10] },
        4: { quality: 'minor', intervals: [5, 8, 0] },
        5: { quality: 'major', intervals: [7, 10, 2] },
        6: { quality: 'major', intervals: [8, 0, 3] },
        7: { quality: 'major', intervals: [10, 2, 5] },
        '-7': { quality: 'major', intervals: [10, 2, 5] }, // bVII
        '-6': { quality: 'major', intervals: [8, 0, 3] }, // bVI
        '-2': { quality: 'major', intervals: [1, 5, 8] }  // bII
    }
};

// Get chord name from scale degree and root note
function getChordFromDegree(rootNote, degree, isMinor = false) {
    const rootIndex = NOTE_NAMES.indexOf(rootNote);
    if (rootIndex === -1) {
        // Try flat names
        const flatIndex = FLAT_NAMES.indexOf(rootNote);
        if (flatIndex === -1) return null;
        return getChordFromDegree(NOTE_NAMES[flatIndex], degree, isMinor);
    }
    
    const scale = isMinor ? DIATONIC_CHORDS.minor : DIATONIC_CHORDS.major;
    const chordInfo = scale[degree];
    
    if (!chordInfo) {
        // Handle negative degrees (bVII, bVI, bII)
        const absDegree = Math.abs(degree);
        if (absDegree === 7) {
            // bVII
            const noteIndex = (rootIndex + 10) % 12;
            return NOTE_NAMES[noteIndex];
        } else if (absDegree === 6) {
            // bVI
            const noteIndex = (rootIndex + 8) % 12;
            return NOTE_NAMES[noteIndex];
        } else if (absDegree === 2) {
            // bII
            const noteIndex = (rootIndex + 1) % 12;
            return NOTE_NAMES[noteIndex];
        }
        return null;
    }
    
    // Calculate the note for this degree
    const majorScale = [0, 2, 4, 5, 7, 9, 11]; // C major scale intervals
    const minorScale = [0, 2, 3, 5, 7, 8, 10]; // A minor scale intervals
    const scaleIntervals = isMinor ? minorScale : majorScale;
    
    const degreeIndex = Math.abs(degree) - 1;
    if (degreeIndex < 0 || degreeIndex >= scaleIntervals.length) return null;
    
    const noteIndex = (rootIndex + scaleIntervals[degreeIndex]) % 12;
    const noteName = NOTE_NAMES[noteIndex];
    
    // Get chord quality suffix
    let suffix = '';
    if (chordInfo.quality === 'minor') {
        suffix = 'm';
    } else if (chordInfo.quality === 'dim') {
        suffix = 'dim';
    } else if (chordInfo.quality === 'aug') {
        suffix = 'aug';
    }
    // Major chords have no suffix (default)
    
    // Handle 7th chords for jazz progressions (optional - can be added later)
    // For now, return basic triads
    const chordName = noteName + suffix;
    
    // Check if chord exists in dictionary, try alternative if needed
    if (CHORD_DICTIONARY[chordName]) {
        return chordName;
    }
    
    // Try without suffix if it doesn't exist
    if (CHORD_DICTIONARY[noteName]) {
        return noteName;
    }
    
    return chordName;
}

// Generate progression chords from pattern
function generateProgression(rootNote, pattern, isMinor = false) {
    const chords = [];
    pattern.forEach(degree => {
        const chordName = getChordFromDegree(rootNote, degree, isMinor);
        if (chordName) {
            chords.push({
                degree: degree,
                name: chordName,
                roman: getRomanNumeral(degree, isMinor)
            });
        }
    });
    return chords;
}

// Get roman numeral for degree
function getRomanNumeral(degree, isMinor = false) {
    const romanNumerals = {
        1: isMinor ? 'i' : 'I',
        2: isMinor ? 'ii' : 'ii',
        3: isMinor ? 'III' : 'iii',
        4: isMinor ? 'iv' : 'IV',
        5: isMinor ? 'V' : 'V',
        6: isMinor ? 'VI' : 'vi',
        7: isMinor ? 'VII' : 'vii°'
    };
    
    if (degree < 0) {
        // Flat degrees
        const abs = Math.abs(degree);
        if (abs === 7) return isMinor ? '♭VII' : '♭VII';
        if (abs === 6) return isMinor ? '♭VI' : '♭VI';
        if (abs === 2) return isMinor ? '♭ii' : '♭II';
    }
    
    return romanNumerals[Math.abs(degree)] || degree.toString();
}

// Export functions
window.PROGRESSION_PATTERNS = PROGRESSION_PATTERNS;
window.generateProgression = generateProgression;
window.getRomanNumeral = getRomanNumeral;

