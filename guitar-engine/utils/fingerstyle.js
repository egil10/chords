// Detect barre shapes
export function detectBarre(frets) {
    // Check if multiple strings share the same fret on the same position
    const barrePositions = [];
    
    // Group frets by position
    const fretGroups = {};
    frets.forEach((fret, stringIndex) => {
        if (fret >= 0) {
            if (!fretGroups[fret]) {
                fretGroups[fret] = [];
            }
            fretGroups[fret].push(stringIndex);
        }
    });
    
    // Find positions with 3+ strings on same fret (potential barre)
    Object.entries(fretGroups).forEach(([fret, strings]) => {
        if (strings.length >= 3 && parseInt(fret) > 0) {
            // Check if strings are consecutive
            const sortedStrings = strings.sort((a, b) => a - b);
            let isConsecutive = true;
            for (let i = 1; i < sortedStrings.length; i++) {
                if (sortedStrings[i] - sortedStrings[i - 1] !== 1) {
                    isConsecutive = false;
                    break;
                }
            }
            if (isConsecutive) {
                barrePositions.push({
                    fret: parseInt(fret),
                    strings: sortedStrings
                });
            }
        }
    });
    
    return barrePositions;
}

// Detect CAGED shape names based on pattern matching
export function detectCAGEDShape(frets, rootString) {
    // This is a simplified pattern matcher
    // You can enhance this with more sophisticated pattern recognition
    
    const activeFrets = frets.filter(f => f >= 0);
    const openStrings = frets.filter(f => f === 0).length;
    const mutedStrings = frets.filter(f => f < 0).length;
    
    // C-shape pattern: typically has open strings, specific fret pattern
    if (frets[1] === 3 && frets[2] >= 4 && frets[3] >= 4 && frets[4] >= 4 && frets[1] === 3) {
        return 'C-shape';
    }
    
    // A-shape pattern: open position, barre on 2nd fret
    if (frets[1] === 0 && frets[2] === 2 && frets[3] === 2 && frets[4] === 2 && frets[5] === 0) {
        return 'A-shape';
    }
    
    // G-shape pattern: low root on 6th string
    if (rootString === 5 && frets[5] >= 2 && frets[4] === 0) {
        return 'G-shape';
    }
    
    // E-shape pattern: barre starting at 1st fret on 6th string
    if (rootString === 5 && frets[5] >= 0 && frets[5] <= 2 && frets[4] >= 2) {
        return 'E-shape';
    }
    
    // D-shape pattern: typically starts on 4th string, open position
    if (rootString === 3 && frets[2] === 0 && frets[3] >= 2) {
        return 'D-shape';
    }
    
    return null;
}

// Generate voicing name
export function generateVoicingName(voicing, frets) {
    const { category, name, complexity } = voicing;
    
    // If name is provided, use it as base
    let voicingName = name || '';
    
    // Add category prefix if not already included
    if (category && !voicingName.toLowerCase().includes(category.toLowerCase())) {
        if (category === 'CAGED') {
            const cagedShape = detectCAGEDShape(frets, voicing.rootString);
            if (cagedShape) {
                voicingName = cagedShape + ' ' + (voicingName || voicing.chordType || '');
            }
        } else {
            voicingName = category + ' ' + (voicingName || voicing.chordType || '');
        }
    }
    
    // Add complexity suffix
    if (complexity && complexity !== 'intermediate') {
        voicingName += ` (${complexity})`;
    }
    
    return voicingName.trim() || 'Standard Voicing';
}

// Detect if voicing is open position
export function isOpenPosition(frets) {
    return frets.some(f => f === 0);
}

// Detect extended voicing (fret span >= 5)
export function isExtendedVoicing(frets) {
    const activeFrets = frets.filter(f => f >= 0);
    if (activeFrets.length === 0) return false;
    const span = Math.max(...activeFrets) - Math.min(...activeFrets);
    return span >= 5;
}