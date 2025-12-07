// Minor 7th chord shapes (CAGED system)
const M7_SHAPES = [
    {
        name: "C-shape m7",
        frets: [-1, 3, 5, 3, 4, 3],
        rootString: 5,
        category: "CAGED",
        complexity: "intermediate",
        chordType: "m7"
    },
    {
        name: "A-shape m7",
        frets: [-1, 0, 2, 0, 1, 0],
        rootString: 5,
        category: "CAGED",
        complexity: "beginner",
        chordType: "m7"
    },
    {
        name: "G-shape m7",
        frets: [3, 5, 3, 3, 3, 3],
        rootString: 5,
        category: "CAGED",
        complexity: "advanced",
        chordType: "m7"
    },
    {
        name: "E-shape m7",
        frets: [0, 2, 0, 0, 0, 0],
        rootString: 5,
        category: "CAGED",
        complexity: "intermediate",
        chordType: "m7"
    },
    {
        name: "D-shape m7",
        frets: [-1, -1, 0, 2, 1, 1],
        rootString: 4,
        category: "CAGED",
        complexity: "intermediate",
        chordType: "m7"
    }
];

module.exports = { M7_SHAPES };