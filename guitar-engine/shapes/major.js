// Major chord shapes (CAGED system)
const MAJOR_SHAPES = [
    {
        name: "C-shape Major",
        frets: [-1, 3, 5, 5, 5, 3],
        rootString: 5,
        category: "CAGED",
        complexity: "intermediate",
        chordType: "major"
    },
    {
        name: "A-shape Major",
        frets: [-1, 0, 2, 2, 2, 0],
        rootString: 5,
        category: "CAGED",
        complexity: "beginner",
        chordType: "major"
    },
    {
        name: "G-shape Major",
        frets: [3, 2, 0, 0, 0, 3],
        rootString: 5,
        category: "CAGED",
        complexity: "beginner",
        chordType: "major"
    },
    {
        name: "E-shape Major",
        frets: [0, 2, 2, 1, 0, 0],
        rootString: 5,
        category: "CAGED",
        complexity: "intermediate",
        chordType: "major"
    },
    {
        name: "D-shape Major",
        frets: [-1, -1, 0, 2, 3, 2],
        rootString: 4,
        category: "CAGED",
        complexity: "beginner",
        chordType: "major"
    }
];

module.exports = { MAJOR_SHAPES };