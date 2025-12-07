import { getNote, getPitchClass } from './notes.js';

// Detect voicing type
export function detectVoicingType(frets) {
    const activeFrets = frets.filter(f => f >= 0);
    if (activeFrets.length === 0) return 'empty';
    
    // Check for drop voicings (look for specific interval patterns)
    // This is a simplified detection - you might want to enhance this
    const span = Math.max(...activeFrets) - Math.min(...activeFrets);
    
    if (span >= 5) return 'spread';
    if (span <= 2) return 'cluster';
    
    return 'standard';
}

// Detect inversion
export function detectInversion(frets, rootString, rootFret) {
    if (rootFret < 0) return null;
    
    const rootPC = getPitchClass(rootString, rootFret);
    const allPCs = frets
        .map((f, i) => getPitchClass(i, f))
        .filter(pc => pc !== null);
    
    if (allPCs.length === 0) return null;
    
    // Find the lowest pitch class
    const sortedPCs = [...allPCs].sort((a, b) => a - b);
    const lowestPC = sortedPCs[0];
    
    // Determine inversion based on lowest note relative to root
    const interval = (lowestPC - rootPC + 12) % 12;
    
    if (interval === 0) return 'root';
    if (interval === 3 || interval === 4) return '1st'; // 3rd in bass
    if (interval === 7) return '2nd'; // 5th in bass
    if (interval === 10 || interval === 11) return '3rd'; // 7th in bass
    
    return 'unknown';
}

// Calculate fret span
export function calculateSpan(frets) {
    const activeFrets = frets.filter(f => f >= 0);
    if (activeFrets.length === 0) return 0;
    return Math.max(...activeFrets) - Math.min(...activeFrets);
}

// Validate voicing
export function validateVoicing(frets, maxSpan = 12) {
    const issues = [];
    
    // Check for negative frets (only -1 for muted allowed)
    const invalidFrets = frets.filter(f => f < -1);
    if (invalidFrets.length > 0) {
        issues.push('Invalid fret values (must be >= -1)');
    }
    
    // Check span
    const span = calculateSpan(frets);
    if (span > maxSpan) {
        issues.push(`Fret span too large: ${span} (max: ${maxSpan})`);
    }
    
    // Check for at least 3 distinct pitch classes
    const uniquePCs = new Set(
        frets
            .map((f, i) => getPitchClass(i, f))
            .filter(pc => pc !== null)
    );
    
    if (uniquePCs.size < 3) {
        issues.push(`Too few distinct notes: ${uniquePCs.size} (min: 3)`);
    }
    
    return {
        valid: issues.length === 0,
        issues
    };
}