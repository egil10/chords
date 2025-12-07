# Building the Chord Dictionary

This document explains how to generate and update the chord dictionary for the website.

## Quick Start

To regenerate the complete chord dictionary from all shape templates:

```bash
cd guitar-engine
node convert-to-website.js
```

This will:
1. Generate a comprehensive dictionary from all shape templates
2. Convert it to JavaScript format for the website
3. Save it to `js/chord-dictionary.js`
4. Display statistics about the generated dictionary

## What Gets Generated

The generator creates chords from:

- **CAGED Shapes**: Major, Minor, 7th, Maj7, m7, 6, 6/9, Add9, Sus2/4
- **Jazz Voicings**: Drop-2, Drop-3, Shell voicings
- **Extended Chords**: 9, 11, 13, altered chords
- **Neo-Soul**: Cluster voicings, quartal stacks
- **Slash Chords**: Programmatically generated from base voicings
- **Diminished & Augmented**: Full sets

All chords are transposed to all 12 roots (C, C#, D, D#, E, F, F#, G, G#, A, A#, B).

## Dictionary Structure

Each chord in the dictionary has:

```javascript
'C': {
    type: 'major',
    intervals: [0, 4, 7],
    notes: ['C', 'E', 'G'],
    positions: [
        { frets: [-1, 3, 5, 5, 5, 3], root: 1 },
        { frets: [8, 10, 10, 9, 8, 8], root: 0 },
        // ... more voicings
    ]
}
```

## Website Integration

The generated dictionary is automatically:
- Loaded by `index.html` via `<script src="js/chord-dictionary.js">`
- Exposed globally as `window.CHORD_DICTIONARY`
- Used by `js/app.js` for chord matching and display

## Adding New Chord Shapes

To add new chord shapes:

1. Add shape templates to `guitar-engine/shapes/` (e.g., `major.js`)
2. Update `guitar-engine/generate-dictionary.js` to load the new shapes
3. Run `node convert-to-website.js` to regenerate

## Notes

- The dictionary is regenerated from templates - do not edit `js/chord-dictionary.js` manually
- All voicings are validated for playability (max span, minimum notes, etc.)
- Slash chords are automatically generated for compatible chord types
