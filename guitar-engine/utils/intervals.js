import { getPitchClass, getRootPitchClass, NOTE_NAMES } from './notes.js';
import { getRootPitchClass as getRootPC } from './transpose.js';

// Interval names
export const INTERVAL_NAMES = [
    '1',      // 0
    'b2',     // 1
    '2',      // 2
    'b3',     // 3
    '3',      // 4
    '4',      // 5
    'b5',     // 6
    '5',      // 7
    'b6',     // 8
    '6',      // 9
    'b7',     // 10
    '7',      // 11
];

// Get interval from root pitch class to note pitch class
export function getInterval(rootPC, notePC) {
    if (rootPC === null || notePC === null) return null;
    return (notePC - rootPC + 12) % 12;
}

// Get interval name (e.g., "3", "b7", "9")
export function getIntervalName(rootPC, notePC) {
    const interval = getInterval(rootPC, notePC);
    if (interval === null) return null;
    return INTERVAL_NAMES[interval];
}

// Get all intervals in a voicing relative to root
export function getIntervalsFromFrets(frets, rootString, rootFret) {
    const rootPC = getPitchClass(rootString, rootFret);
    if (rootPC === null) return [];
    
    return frets.map((fret, stringIndex) => {
        if (fret < 0) return null;
        const notePC = getPitchClass(stringIndex, fret);
        return notePC !== null ? getInterval(rootPC, notePC) : null;
    }).filter(interval => interval !== null);
}

// Get unique intervals (sorted)
export function getUniqueIntervals(frets, rootString, rootFret) {
    const intervals = getIntervalsFromFrets(frets, rootString, rootFret);
    return [...new Set(intervals)].sort((a, b) => a - b);
}

// Get interval names as array
export function getIntervalNames(frets, rootString, rootFret) {
    const intervals = getUniqueIntervals(frets, rootString, rootFret);
    return intervals.map(i => INTERVAL_NAMES[i]);
}

// Detect chord type from intervals
export function detectChordType(intervals) {
    const intervalSet = new Set(intervals);
    
    // Major
    if (intervalSet.has(4) && intervalSet.has(7) && !intervalSet.has(3)) {
        if (intervalSet.has(11)) return 'maj7';
        if (intervalSet.has(10)) return '7';
        return 'major';
    }
    
    // Minor
    if (intervalSet.has(3) && intervalSet.has(7) && !intervalSet.has(4)) {
        if (intervalSet.has(10)) return 'm7';
        return 'minor';
    }
    
    // Diminished
    if (intervalSet.has(3) && intervalSet.has(6)) {
        if (intervalSet.has(9)) return 'dim7';
        return 'dim';
    }
    
    // Augmented
    if (intervalSet.has(4) && intervalSet.has(8)) {
        return 'aug';
    }
    
    // Suspended
    if (intervalSet.has(5) && intervalSet.has(7)) {
        if (intervalSet.has(2)) return 'sus2';
        return 'sus4';
    }
    
    // Extended chords
    if (intervalSet.has(2) || intervalSet.has(1)) {
        if (intervalSet.has(4) && intervalSet.has(7)) return 'add9';
        if (intervalSet.has(3) && intervalSet.has(7)) return 'madd9';
    }
    
    if (intervalSet.has(9)) {
        if (intervalSet.has(4) && intervalSet.has(7)) {
            if (intervalSet.has(11)) return 'maj9';
            if (intervalSet.has(10)) return '9';
        }
        if (intervalSet.has(3) && intervalSet.has(7)) {
            if (intervalSet.has(10)) return 'm9';
        }
    }
    
    return 'unknown';
}