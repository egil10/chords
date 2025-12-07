// Jazz voicings - Drop 2, Shell, Spread voicings
const DROP2_MAJ7 = [
    {
        name: "Drop2 Maj7 (Strings 5-2)",
        frets: [-1, 3, 5, 4, 5, -1],
        rootString: 5,
        category: "drop2",
        complexity: "jazz",
        chordType: "maj7"
    },
    {
        name: "Drop2 Maj7 (Strings 4-1)",
        frets: [-1, -1, 5, 4, 5, 3],
        rootString: 4,
        category: "drop2",
        complexity: "jazz",
        chordType: "maj7"
    }
];

const DROP2_DOM7 = [
    {
        name: "Drop2 Dom7 (Strings 5-2)",
        frets: [-1, 3, 5, 3, 5, -1],
        rootString: 5,
        category: "drop2",
        complexity: "jazz",
        chordType: "7"
    },
    {
        name: "Drop2 Dom7 (Strings 4-1)",
        frets: [-1, -1, 5, 3, 5, 3],
        rootString: 4,
        category: "drop2",
        complexity: "jazz",
        chordType: "7"
    }
];

const DROP2_MIN7 = [
    {
        name: "Drop2 Min7 (Strings 5-2)",
        frets: [-1, 3, 5, 3, 4, -1],
        rootString: 5,
        category: "drop2",
        complexity: "jazz",
        chordType: "m7"
    },
    {
        name: "Drop2 Min7 (Strings 4-1)",
        frets: [-1, -1, 5, 3, 5, 3],
        rootString: 4,
        category: "drop2",
        complexity: "jazz",
        chordType: "m7"
    }
];

const DOM7_SHELLS = [
    {
        name: "Shell 7 (6-string)",
        frets: [3, -1, 3, 4, -1, -1],
        rootString: 5,
        category: "shell",
        complexity: "jazz",
        chordType: "7"
    },
    {
        name: "Shell 7 (5-string)",
        frets: [-1, 3, -1, 2, 3, -1],
        rootString: 4,
        category: "shell",
        complexity: "jazz",
        chordType: "7"
    }
];

export const MAJ7_SHELLS = [
    {
        name: "Shell Maj7",
        frets: [3, -1, 4, 4, -1, -1],
        rootString: 5,
        category: "shell",
        complexity: "jazz",
        chordType: "maj7"
    }
];

const MIN7_SHELLS = [
    {
        name: "Shell Min7",
        frets: [3, -1, 3, 3, -1, -1],
        rootString: 5,
        category: "shell",
        complexity: "jazz",
        chordType: "m7"
    }
];