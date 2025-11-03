# Contributing to Guitar Chord Finder

Thank you for your interest in contributing to Guitar Chord Finder!

## How to Contribute

### Adding New Chord Voicings

The chord dictionary is in `js/chord-dictionary.js`. To add a new voicing:

1. Find the chord entry (e.g., `'C': { type: 'major', ... }`)
2. Add a new position to the `positions` array:

```javascript
{ frets: [fret6, fret5, fret4, fret3, fret2, fret1], root: rootString }
```

Where:
- `fret6` to `fret1` are fret positions for strings E (thick) to E (thin)
- Use `-1` for strings not played, `0` for open strings
- `rootString` is the index (0-5) of the string containing the root note

### Improving Chord Matching

The chord matching algorithm is in `js/fretboard.js`. The current logic:
- Checks if all chord notes are present
- Could be enhanced to handle inversions
- Could detect partial matches

### Styling Improvements

All styles are in `styles/main.css`. Design principles:
- Clean and minimal
- No animations
- Fast and simple
- Maintain consistent spacing and colors

### Bug Reports

If you find a bug:
1. Check if it's already reported
2. Provide steps to reproduce
3. Describe expected vs actual behavior
4. Include browser/device info

### Feature Requests

Ideas for new features:
- Chord progressions
- Auto-scroll to common voicings
- Multiple fretboard positions per chord
- Chord variations/inversions
- Fretboard audio playback
- Print-friendly layouts

## Development Setup

1. Clone the repository
2. Open `index.html` in a browser
3. Make changes
4. Test thoroughly
5. Submit a pull request

## Code Style

- Use consistent formatting
- Comment complex logic
- Keep functions focused
- Use meaningful variable names
- Test across browsers

## Questions?

Feel free to open an issue for any questions or suggestions!

