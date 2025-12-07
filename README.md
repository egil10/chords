# Guitar Chord Finder

A clean, modern, and interactive guitar chord finder web application. Explore thousands of guitar chords, click to view fingerings on a dynamic fretboard, or build your own chords by clicking frets.

## Features

- **Interactive Fretboard**: Click on frets to build your own chords and see which chords match
- **Comprehensive Chord Library**: Browse hundreds of chords including:
  - Major and minor chords
  - Diminished and augmented chords
  - 7th chords (dominant, major 7th, minor 7th, minor major 7th)
  - Suspended chords (sus2, sus4)
  - Extended chords (9th, 11th, 13th)
  - Add9 and 6th chords
  - Slash chords
- **Smart Search**: Search by chord name, type, or notes
- **Progressive Filtering**: Chords are filtered in real-time as you place notes on the fretboard
- **Multiple Voicings**: Navigate through different voicing variations for each chord
- **Note View Toggle**: Switch between icon view (O/X/-) and note names
- **Clean UI**: Modern, minimal design with Inter font and Lucide icons
- **Dark/Light Theme**: Toggle between light and dark themes
- **Responsive**: Optimized for desktop, tablet, and mobile devices
- **High Performance**: Optimized for smooth 60 FPS interactions

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

### Building Custom Chords

- Click on frets on the fretboard to place notes
- Click at the nut (0th fret) to cycle between: unplayed → open (O) → muted (X)
- Click other frets to toggle notes on/off
- The app automatically filters chords to show only those matching your notes
- All matching chords are displayed in real-time as you build your chord

### Viewing Chords

- Click any chord in the "Matching Chords" list to see its fingering on the fretboard
- Use the left/right arrows in the fretboard header to navigate through different voicings of the same chord
- The fretboard displays the chord name and voicing number (e.g., "C • 1 / 5")

### Searching

- Use the search bar to find chords by name (e.g., "A", "Am7", "Cmaj7")
- Search also matches chord types and notes
- Clear search to show all matching chords

### View Modes

- **Icons View** (default): Shows O (open), X (muted), or circle icons for pressed frets
- **Notes View**: Toggle to see actual note names (E, C#, Ab, etc.) on the fretboard
- Toggle between views using the "Notes" button

### Theme

- Use the theme toggle in the header to switch between light and dark themes
- Theme preference is saved in your browser

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
│   └── main.css           # Main stylesheet with responsive design
├── js/                     # JavaScript modules
│   ├── utils.js           # Shared utilities and constants
│   ├── chord-dictionary.js # Chord data and definitions
│   ├── theme.js           # Theme switching logic
│   └── app.js             # Main application logic
└── guitar-engine/          # Chord dictionary generator (Node.js)
    ├── generate-dictionary.js # Main dictionary generator
    ├── shapes/            # Chord shape templates
    │   ├── major.js
    │   ├── minor.js
    │   ├── dominant.js
    │   ├── maj7.js
    │   ├── m7.js
    │   ├── jazz.js
    │   ├── neosoul.js
    │   ├── extended.js
    │   ├── sus.js
    │   ├── dim.js
    │   ├── aug.js
    │   └── slash.js
    └── utils/             # Utility functions
        ├── notes.js
        ├── transpose.js
        ├── intervals.js
        ├── detect.js
        ├── fingerstyle.js
        ├── slash-generator.js
        └── voicing-generator.js
```

## Chord Notation

This app uses standard guitar chord notation:
- Sharp notes: `C#`, `D#`, `F#`, `G#`, `A#`
- Flat notes: `Db`, `Eb`, `Gb`, `Ab`, `Bb`
- Minor: `m` suffix (e.g., `Am`, `Dm`)
- 7th chords: `7` (dominant), `maj7`, `m7`, `dim7`, `aug7`
- Sus chords: `sus2`, `sus4`
- Extended: `add9`, `6`, `m6`, `9`, `11`, `13`
- Slash chords: `C/E`, `Am/C`, `G7/F`

## Development

### Generating Chord Dictionary

The chord dictionary can be regenerated using the guitar-engine:

```bash
cd guitar-engine
node generate-dictionary.js
```

This will generate a comprehensive chord dictionary with all voicings. See `guitar-engine/VOICING_EXPANSION_README.md` for details on the voicing system.

## Contributing

Contributions are welcome! Please see [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines.

Feel free to:
- Add more chord voicings
- Improve chord matching algorithm
- Add additional features
- Fix bugs
- Improve performance

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Credits

- Built with vanilla JavaScript
- UI icons: [Lucide](https://lucide.dev)
- Font: [Inter](https://fonts.google.com/specimen/Inter)
- Standard guitar tuning: EADGBe (6 strings)
