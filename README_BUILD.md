# Building and Updating the Chord Dictionary

## Overview

The chord dictionary system consists of:

1. **Shape Templates** (`guitar-engine/shapes/`) - Define chord voicing templates
2. **Generator Script** (`guitar-engine/generate-dictionary.js`) - Creates dictionary from templates
3. **Website Dictionary** (`js/chord-dictionary.js`) - JavaScript format for the browser

## Quick Build

To regenerate the complete dictionary with all chords:

```bash
cd guitar-engine
node convert-to-website.js
```

Or use the build script:

```bash
cd guitar-engine
node build-dictionary.js
```

## Current Status

The website is already set up to use `window.CHORD_DICTIONARY` which is loaded from `js/chord-dictionary.js`. The frontend code in `js/app.js`:

- Accesses chords via `window.CHORD_DICTIONARY[chordName]`
- Displays all voicings from `chordData.positions`
- Supports voicing navigation with left/right buttons
- Filters chords progressively as you click on the fretboard

## Integration

The dictionary is integrated at multiple levels:

1. **HTML Loading**: `index.html` loads `js/chord-dictionary.js` before `js/app.js`
2. **Global Access**: Dictionary is exposed as `window.CHORD_DICTIONARY`
3. **Chord Matching**: `findMatchingChords()` searches all chords in the dictionary
4. **Voicing Display**: `displayChordOnFretboard()` uses `positions` array
5. **Navigation**: Voicing navigation cycles through all positions

## Next Steps

To expand the dictionary:

1. Add more shape templates to `guitar-engine/shapes/`
2. Run the generator script to regenerate
3. The website will automatically use all new chords

The system is designed to handle thousands of chords and voicings efficiently.
