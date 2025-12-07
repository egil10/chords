// Dominant 7th chord shapes (CAGED system)
const DOM7_SHAPES = [
    {
        name: "C-shape 7",
        frets: [-1, 3, 3, 5, 5, 3],
        rootString: 5,
        category: "CAGED",
        complexity: "intermediate",
        chordType: "7"
    },
    {
        name: "A-shape 7",
        frets: [-1, 0, 2, 0, 2, 0],
        rootString: 5,
        category: "CAGED",
        complexity: "beginner",
        chordType: "7"
    },
    {
        name: "G-shape 7",
        frets: [3, 2, 0, 0, 0, 1],
        rootString: 5,
        category: "CAGED",
        complexity: "beginner",
        chordType: "7"
    },
    {
        name: "E-shape 7",
        frets: [0, 2, 0, 1, 0, 0],
        rootString: 5,
        category: "CAGED",
        complexity: "intermediate",
        chordType: "7"
    },
    {
        name: "D-shape 7",
        frets: [-1, -1, 0, 2, 1, 2],
        rootString: 4,
        category: "CAGED",
        complexity: "intermediate",
        chordType: "7"
    }
];

module.exports = { DOM7_SHAPES };