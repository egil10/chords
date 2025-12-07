// Neo-Soul / Modern R&B voicings - Cluster shapes
const NEOSOUL_CLUSTERS = [
    {
        name: "Maj9 Cluster",
        frets: [-1, 3, 2, 4, 3, -1],
        rootString: 5,
        category: "cluster",
        complexity: "neosoul",
        chordType: "maj9"
    },
    {
        name: "Min9 Cluster",
        frets: [-1, 3, 1, 3, 3, -1],
        rootString: 5,
        category: "cluster",
        complexity: "neosoul",
        chordType: "m9"
    },
    {
        name: "Maj9#11",
        frets: [-1, 3, 2, 4, 4, -1],
        rootString: 5,
        category: "cluster",
        complexity: "neosoul",
        chordType: "maj9#11"
    },
    {
        name: "Min11 Add9",
        frets: [-1, 3, 3, 3, 5, -1],
        rootString: 5,
        category: "cluster",
        complexity: "neosoul",
        chordType: "m11"
    },
    {
        name: "Dominant 13",
        frets: [-1, 3, 2, 3, 5, -1],
        rootString: 5,
        category: "cluster",
        complexity: "neosoul",
        chordType: "13"
    }
];

// Quartal (4ths-based) shapes
const QUARTAL_SHAPES = [
    {
        name: "Quartal 1",
        frets: [-1, 5, 5, 5, -1, -1],
        rootString: 4,
        category: "quartal",
        complexity: "jazz",
        chordType: "sus4"
    },
    {
        name: "Quartal 2",
        frets: [-1, -1, 5, 5, 5, -1],
        rootString: 3,
        category: "quartal",
        complexity: "jazz",
        chordType: "sus4"
    },
    {
        name: "Quartal 3",
        frets: [5, -1, 5, 5, -1, -1],
        rootString: 5,
        category: "quartal",
        complexity: "jazz",
        chordType: "sus4"
    }
];

module.exports = { NEOSOUL_CLUSTERS, QUARTAL_SHAPES };

module.exports = { NEOSOUL_CLUSTERS, QUARTAL_SHAPES };