// Extended chords (6, 6/9, add9, 9) - CAGED system
const EXTENDED_SHAPES = [
    // Add9 chords
    {
        name: "C-shape Add9",
        frets: [-1, 3, 0, 0, 1, 0],
        rootString: 5,
        category: "CAGED",
        complexity: "intermediate",
        chordType: "add9"
    },
    {
        name: "A-shape Add9",
        frets: [-1, 0, 2, 4, 2, 0],
        rootString: 5,
        category: "CAGED",
        complexity: "intermediate",
        chordType: "add9"
    },
    {
        name: "G-shape Add9",
        frets: [3, 2, 0, 0, 3, 3],
        rootString: 5,
        category: "CAGED",
        complexity: "intermediate",
        chordType: "add9"
    },
    {
        name: "E-shape Add9",
        frets: [0, 2, 4, 1, 0, 0],
        rootString: 5,
        category: "CAGED",
        complexity: "intermediate",
        chordType: "add9"
    },
    
    // 6 chords
    {
        name: "C-shape 6",
        frets: [-1, 3, 2, 2, 1, 3],
        rootString: 5,
        category: "CAGED",
        complexity: "intermediate",
        chordType: "6"
    },
    {
        name: "A-shape 6",
        frets: [-1, 0, 2, 2, 2, 2],
        rootString: 5,
        category: "CAGED",
        complexity: "intermediate",
        chordType: "6"
    },
    {
        name: "E-shape 6",
        frets: [0, 2, 2, 1, 2, 0],
        rootString: 5,
        category: "CAGED",
        complexity: "intermediate",
        chordType: "6"
    },
    
    // 6/9 chords (jazz)
    {
        name: "C-shape 6/9",
        frets: [-1, 3, 2, 0, 3, 3],
        rootString: 5,
        category: "CAGED",
        complexity: "advanced",
        chordType: "6/9"
    },
    {
        name: "A-shape 6/9",
        frets: [-1, 0, 2, 2, 2, 4],
        rootString: 5,
        category: "CAGED",
        complexity: "advanced",
        chordType: "6/9"
    },
    
    // 9 chords
    {
        name: "C-shape 9",
        frets: [-1, 3, 2, 3, 3, 3],
        rootString: 5,
        category: "CAGED",
        complexity: "advanced",
        chordType: "9"
    },
    {
        name: "A-shape 9",
        frets: [-1, 0, 2, 4, 3, 0],
        rootString: 5,
        category: "CAGED",
        complexity: "advanced",
        chordType: "9"
    },
    {
        name: "G-shape 9",
        frets: [3, 2, 3, 2, 3, 3],
        rootString: 5,
        category: "CAGED",
        complexity: "advanced",
        chordType: "9"
    },
    {
        name: "E-shape 9",
        frets: [0, 2, 1, 1, 3, 0],
        rootString: 5,
        category: "CAGED",
        complexity: "advanced",
        chordType: "9"
    },
    {
        name: "D-shape 9",
        frets: [-1, -1, 0, 2, 1, 0],
        rootString: 4,
        category: "CAGED",
        complexity: "advanced",
        chordType: "9"
    },
    
    // Minor Major 7
    {
        name: "C-shape mMaj7",
        frets: [-1, 3, 5, 4, 4, 3],
        rootString: 5,
        category: "CAGED",
        complexity: "advanced",
        chordType: "mMaj7"
    },
    {
        name: "A-shape mMaj7",
        frets: [-1, 0, 2, 1, 1, 0],
        rootString: 5,
        category: "CAGED",
        complexity: "advanced",
        chordType: "mMaj7"
    },
    {
        name: "E-shape mMaj7",
        frets: [0, 2, 1, 0, 0, 0],
        rootString: 5,
        category: "CAGED",
        complexity: "advanced",
        chordType: "mMaj7"
    }
];

module.exports = { EXTENDED_SHAPES };