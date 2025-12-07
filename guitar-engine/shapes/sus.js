// Suspended chord shapes (CAGED system)
const SUS_SHAPES = [
    // Sus2
    {
        name: "C-shape Sus2",
        frets: [-1, 3, 0, 0, 3, 3],
        rootString: 5,
        category: "CAGED",
        complexity: "beginner",
        chordType: "sus2"
    },
    {
        name: "A-shape Sus2",
        frets: [-1, 0, 2, 2, 0, 0],
        rootString: 5,
        category: "CAGED",
        complexity: "beginner",
        chordType: "sus2"
    },
    {
        name: "D-shape Sus2",
        frets: [-1, -1, 0, 2, 3, 0],
        rootString: 4,
        category: "CAGED",
        complexity: "beginner",
        chordType: "sus2"
    },
    
    // Sus4
    {
        name: "C-shape Sus4",
        frets: [-1, 3, 5, 5, 6, 3],
        rootString: 5,
        category: "CAGED",
        complexity: "beginner",
        chordType: "sus4"
    },
    {
        name: "A-shape Sus4",
        frets: [-1, 0, 2, 2, 3, 0],
        rootString: 5,
        category: "CAGED",
        complexity: "beginner",
        chordType: "sus4"
    },
    {
        name: "G-shape Sus4",
        frets: [3, 3, 0, 0, 1, 3],
        rootString: 5,
        category: "CAGED",
        complexity: "beginner",
        chordType: "sus4"
    },
    {
        name: "E-shape Sus4",
        frets: [0, 2, 2, 2, 0, 0],
        rootString: 5,
        category: "CAGED",
        complexity: "beginner",
        chordType: "sus4"
    },
    {
        name: "D-shape Sus4",
        frets: [-1, -1, 0, 2, 3, 3],
        rootString: 4,
        category: "CAGED",
        complexity: "beginner",
        chordType: "sus4"
    }
];

module.exports = { SUS_SHAPES };