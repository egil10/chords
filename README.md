# Guitar Chord Finder

A clean, modern, and interactive guitar chord finder web application. Explore thousands of guitar chords, click to view fingerings on a dynamic fretboard, or build your own chords by clicking frets.

## Features

- **Interactive Fretboard**: Click on frets to build your own chords and see which chords match
- **Comprehensive Chord Library**: Browse over 500+ chords including:
  - Major and minor chords
  - Diminished and augmented chords
  - 7th chords (dominant, major 7th, minor 7th)
  - Suspended chords (sus2, sus4)
  - Extended chords (9th, 11th, 13th)
  - Add9 and 6th chords
- **Smart Search**: Search by chord name or note
- **Type Filtering**: Filter chords by type (major, minor, 7th, etc.)
- **Multiple Views**: Toggle between grid and detailed views
- **Clean UI**: Modern, minimal design with Space Grotesk font and Lucide icons
- **Responsive**: Works on desktop, tablet, and mobile

## Live Demo

Visit the live site on GitHub Pages: [guitar-chord-finder.github.io](https://guitar-chord-finder.github.io)

For deployment instructions, see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/chords.git
cd chords
```

2. Open `index.html` in your web browser, or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

3. Open your browser to `http://localhost:8000`

## Usage

### Viewing Chords
- **Click a chord** in the library to see its fingering on the fretboard
- The fretboard shows which frets to press and highlights the root note
- Chord information displays notes and intervals

### Building Custom Chords
- **Click frets** on the fretboard to build your own chord
- The app automatically tries to identify matching chords
- Click the same fret again to deselect it

### Searching
- Use the search bar to find chords by name (e.g., "A", "Am7", "Cmaj7")
- Filter by chord type using the dropdown
- Clear search to show all chords

### Views
- **Grid View**: See all chords at once in a grid layout
- **List View**: Focus on a single chord with detailed fretboard

## Project Structure

```
chords/
├── index.html              # Main HTML file (GitHub Pages entry point)
├── README.md               # Project documentation
├── .nojekyll               # GitHub Pages configuration
├── .gitignore              # Git ignore rules
├── docs/                   # Documentation
│   ├── CONTRIBUTING.md    # Contribution guidelines
│   └── DEPLOYMENT.md      # Deployment instructions
├── styles/                 # Stylesheets
│   └── main.css           # Main stylesheet
└── js/                    # JavaScript modules
    ├── utils.js           # Shared utilities and constants
    ├── chord-dictionary.js # Chord data and definitions
    ├── progressions.js     # Chord progression patterns
    ├── scales.js          # Scale patterns and binary templates
    ├── fretboard.js       # Fretboard display and interaction
    ├── search.js          # Search and filtering logic
    ├── progressions-ui.js # Progression UI logic
    ├── custom-progression.js # Custom progression builder
    ├── scales-ui.js       # Scale UI logic
    └── main.js            # Application entry point
```

## Chord Notation

This app uses standard guitar chord notation:
- Sharp notes: `C#`, `D#`, `F#`, `G#`, `A#`
- Flat notes: `Db`, `Eb`, `Gb`, `Ab`, `Bb`
- Minor: `m` suffix (e.g., `Am`, `Dm`)
- 7th chords: `7` (dominant), `maj7`, `m7`, `dim7`, `aug7`
- Sus chords: `sus2`, `sus4`
- Extended: `add9`, `6`, `m6`, `9`, `11`, `13`

## Contributing

Contributions are welcome! Please see [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines.

Feel free to:
- Add more chord voicings
- Improve chord matching algorithm
- Add additional features
- Fix bugs

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Credits

- Built with vanilla JavaScript
- UI icons: [Lucide](https://lucide.dev)
- Font: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
- Standard guitar tuning: EADGBe (6 strings)
