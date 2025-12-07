// Minor chord shapes (CAGED system)
const MINOR_SHAPES = [
    {
        name: "C-shape Minor",
        frets: [-1, 3, 5, 5, 4, 3],
        rootString: 5,
        category: "CAGED",
        complexity: "intermediate",
        chordType: "minor"
    },
    {
        name: "A-shape Minor",
        frets: [-1, 0, 2, 2, 1, 0],
        rootString: 5,
        category: "CAGED",
        complexity: "beginner",
        chordType: "minor"
    },
    {
        name: "G-shape Minor",
        frets: [3, 5, 5, 3, 3, 3],
        rootString: 5,
        category: "CAGED",
        complexity: "advanced",
        chordType: "minor"
    },
    {
        name: "E-shape Minor",
        frets: [0, 2, 2, 0, 0, 0],
        rootString: 5,
        category: "CAGED",
        complexity: "intermediate",
        chordType: "minor"
    },
    {
        name: "D-shape Minor",
        frets: [-1, -1, 0, 2, 3, 1],
        rootString: 4,
        category: "CAGED",
        complexity: "beginner",
        chordType: "minor"
    }
];

module.exports = { MINOR_SHAPES };