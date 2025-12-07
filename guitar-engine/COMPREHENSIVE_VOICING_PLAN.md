# Comprehensive Voicing Expansion Plan

## Overview
This document outlines the plan to expand the chord voicing system so that every chord has 20-50+ voicings (40-120 for jazz chords) covering ALL voicing families.

## Minimum Voicing Requirements

- Simple chords (major, minor): **20-50 voicings**
- Jazz chords (7, maj7, m7): **40-80 voicings**
- Extended chords (9, 11, 13): **60-120 voicings**
- Altered chords: **80-120 voicings**

## Voicing Families to Implement

### 1. CAGED Voicings (5 positions)
- C-shape
- A-shape
- G-shape
- E-shape
- D-shape

### 2. Barre Variants
- E-shape barre (fully transposable)
- A-shape barre (fully transposable)

### 3. Triads (root, 1st, 2nd inversion)
- String sets: 6-5-4, 5-4-3, 4-3-2, 3-2-1
- **12 triads per chord type** (4 string sets × 3 inversions)

### 4. Spread Triads
- Middle voice raised by octave
- All inversions

### 5. Drop-2 Voicings
- String sets: 6-4-3-2, 5-3-2-1, 5-4-3-1

### 6. Drop-3 Voicings
- Standard jazz shapes

### 7. Shell Voicings
- R-3-7
- R-7-3
- 3-7-9
- 7-3-13

### 8. Quartal Voicings
- P4-P4
- P4-P4-P4
- Mixed quartal clusters

### 9. Neo-Soul Clusters
- Maj9 clusters
- Min9 clusters
- Min11 clusters
- 1-2-5 clusters
- 3-5-9 clusters
- Tritone + 9 clusters

### 10. Slash Bass Voicings
- Bass on: 1, 3/b3, 5, b7/7, 9, #11, 13
- On strings: 6, 5, 4

### 11. Polychord Voicings
- Upper-structure triads over bass notes

### 12. Extended Jazz Voicings
- Closed-position
- Drop-2
- Drop-3
- Spread
- Shell-based extensions

### 13. Altered Chords
- Drop-2 altered
- Drop-3 altered
- Shell alteration
- Cluster alteration
- Slash-bass altered
- Upper-structure

### 14. Full-Fretboard Variants
- Shift voicings up 12 frets
- High-register voicings

## Implementation Strategy

1. **Phase 1**: Core voicing generators (triads, CAGED, barre)
2. **Phase 2**: Jazz voicings (drop-2, drop-3, shells)
3. **Phase 3**: Extended voicings (quartal, clusters, slash)
4. **Phase 4**: Advanced voicings (polychords, altered, full-fretboard)
5. **Phase 5**: Coverage checking and gap filling

## File Structure (Planned)

Future implementation will include:
- `utils/comprehensive-voicing-generator.js` - Main generator
- `utils/voicing-coverage-system.js` - Coverage checker
- `utils/triad-generator.js` - Triad voicings
- `utils/drop-voicing-generator.js` - Drop-2/3 voicings
- `utils/shell-generator.js` - Shell voicings
- `utils/quartal-generator.js` - Quartal voicings
- `utils/cluster-generator.js` - Neo-soul clusters
- `utils/polychord-generator.js` - Polychord voicings
- `utils/extended-generator.js` - Extended jazz voicings
- `utils/altered-generator.js` - Altered chord voicings

## Coverage Checking

After generating voicings, check:
- Minimum count requirements met
- All voicing families represented
- Full fretboard coverage (low to high)
- All inversions covered
- Playability validated
