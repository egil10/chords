// Slash chords - chord inversions and bass notes
// Format: root chord / bass note

// SECTION 1: STANDARD SLASH CHORDS
// Major chords with diatonic bass
const MAJOR_SLASH = [
    {
        name: "Major / 3rd (C-shape)",
        frets: [-1, 3, 2, 0, 1, 0], // C/E template
        rootString: 5,
        bassFunction: "3",
        chordType: "major",
        slashType: "3"
    },
    {
        name: "Major / 3rd (A-shape)",
        frets: [-1, 0, 2, 2, 2, 0], // A/C# - but with 3rd in bass
        rootString: 5,
        chordType: "major",
        slashType: "3"
    },
    {
        name: "Major / 5th (C-shape)",
        frets: [3, 3, 2, 0, 1, 0], // C/G
        rootString: 5,
        chordType: "major",
        slashType: "5"
    },
    {
        name: "Major / 5th (G-shape)",
        frets: [-1, 2, 0, 0, 0, 3], // G/B
        rootString: 5,
        chordType: "major",
        slashType: "5"
    }
];

// Minor chords with slash bass
const MINOR_SLASH = [
    {
        name: "Minor / b3 (A-shape)",
        frets: [-1, 0, 1, 2, 1, 0], // Am/C
        rootString: 5,
        chordType: "minor",
        slashType: "b3"
    },
    {
        name: "Minor / 5 (A-shape)",
        frets: [-1, 0, 2, 2, 1, 0], // Am/E
        rootString: 5,
        chordType: "minor",
        slashType: "5"
    }
];

// Dominant 7 slash chords
const DOM7_SLASH = [
    {
        name: "Dom7 / b7 (G-shape)",
        frets: [1, 2, 0, 0, 0, 1], // G7/F
        rootString: 5,
        chordType: "7",
        slashType: "b7"
    },
    {
        name: "Dom7 / 5 (A-shape)",
        frets: [-1, 0, 2, 0, 2, 0], // A7/E
        rootString: 5,
        chordType: "7",
        slashType: "5"
    }
];

// Maj7 slash chords
const MAJ7_SLASH = [
    {
        name: "Maj7 / 3",
        frets: [-1, 3, 2, 0, 0, 0], // Cmaj7/E
        rootString: 5,
        chordType: "maj7",
        slashType: "3"
    },
    {
        name: "Maj7 / 5",
        frets: [3, 3, 2, 0, 0, 0], // Cmaj7/G
        rootString: 5,
        chordType: "maj7",
        slashType: "5"
    },
    {
        name: "Maj7 / 7",
        frets: [-1, -1, 0, 2, 0, 2], // Cmaj7/B
        rootString: 4,
        chordType: "maj7",
        slashType: "7"
    }
];

// SECTION 2: JAZZ SLASH CHORDS
// Drop-2 slash chords
const DROP2_SLASH = [
    {
        name: "Maj7 Drop2 / 3",
        frets: [-1, 3, 5, 4, 5, -1], // Cmaj7/E
        rootString: 5,
        chordType: "maj7",
        slashType: "3",
        category: "drop2"
    },
    {
        name: "m7 Drop2 / b7",
        frets: [-1, 3, 5, 3, 4, -1], // Cm7/Bb
        rootString: 5,
        chordType: "m7",
        slashType: "b7",
        category: "drop2"
    }
];

// Shell voicings with slash bass
const SHELL_SLASH = [
    {
        name: "Dominant Shell / b7",
        frets: [-1, 1, -1, 2, 3, -1], // C7/Bb
        rootString: 5,
        chordType: "7",
        slashType: "b7",
        category: "shell"
    },
    {
        name: "Maj7 Shell / 7",
        frets: [-1, 2, -1, 2, 2, -1], // Cmaj7/B
        rootString: 5,
        chordType: "maj7",
        slashType: "7",
        category: "shell"
    }
];

// SECTION 3: NEO-SOUL SLASH CHORDS
const NEOSOUL_SLASH = [
    {
        name: "Maj9 / 7 (Neo-Soul Cluster)",
        frets: [-1, 3, 2, 4, 3, -1], // Cmaj9/B
        rootString: 5,
        chordType: "maj9",
        slashType: "7",
        category: "cluster"
    },
    {
        name: "Maj9 / 5",
        frets: [-1, 3, 5, 4, 3, -1], // Cmaj9/G
        rootString: 5,
        chordType: "maj9",
        slashType: "5",
        category: "cluster"
    },
    {
        name: "Min9 / b7 (Neo-Soul)",
        frets: [-1, 3, 1, 3, 3, -1], // Cm9/Bb
        rootString: 5,
        chordType: "m9",
        slashType: "b7",
        category: "cluster"
    },
    {
        name: "Min11 / 9 (Neo-Soul)",
        frets: [-1, 3, 3, 3, 5, -1], // Cm11/D
        rootString: 5,
        chordType: "m11",
        slashType: "9",
        category: "cluster"
    }
];

// SECTION 4: ALTERED SLASH CHORDS
const ALTERED_SLASH = [
    {
        name: "7#9 / b7",
        frets: [-1, 1, 3, 1, 3, -1], // C7#9/Bb
        rootString: 5,
        chordType: "7#9",
        slashType: "b7"
    },
    {
        name: "7#5 / b7",
        frets: [-1, 1, 3, 2, 3, -1],
        rootString: 5,
        chordType: "7#5",
        slashType: "b7"
    },
    {
        name: "7b9 / 3",
        frets: [-1, 3, 2, 1, 3, -1], // C7b9/E
        rootString: 5,
        chordType: "7b9",
        slashType: "3"
    },
    {
        name: "Maj7#11 / 5",
        frets: [-1, 3, 2, 4, 4, -1], // Cmaj7#11/G
        rootString: 5,
        chordType: "maj7#11",
        slashType: "5"
    }
];

// SECTION 5: POLYCHORDS (Triad over Bass)
const POLYCHORD_SLASH = [
    {
        name: "Major Triad / b7",
        frets: [-1, 1, -1, 5, 5, 5], // Major triad over b7 bass
        rootString: 5,
        chordType: "major",
        slashType: "b7",
        category: "polychord"
    },
    {
        name: "Major Triad / 9",
        frets: [-1, 2, -1, 5, 5, 5],
        rootString: 5,
        chordType: "major",
        slashType: "9",
        category: "polychord"
    },
    {
        name: "Major Triad / #11",
        frets: [-1, 6, -1, 5, 5, 5],
        rootString: 5,
        chordType: "major",
        slashType: "#11",
        category: "polychord"
    },
    {
        name: "Minor Triad / b7",
        frets: [-1, 1, -1, 5, 4, 5],
        rootString: 5,
        chordType: "minor",
        slashType: "b7",
        category: "polychord"
    }
];

// SECTION 6: SPREAD TRIADS / SLASH
const SPREAD_SLASH = [
    {
        name: "Spread Major Triad / 5",
        frets: [-1, 3, -1, 5, -1, 3], // C spread triad over G
        rootString: 5,
        chordType: "major",
        slashType: "5",
        category: "spread"
    }
];

// SECTION 7: DIMINISHED SLASH
const DIM_SLASH = [
    {
        name: "Dim7 / b3",
        frets: [-1, 3, 4, 2, -1, -1],
        rootString: 5,
        chordType: "dim7",
        slashType: "b3"
    },
    {
        name: "m7b5 / b7",
        frets: [-1, 3, 4, 3, 4, -1],
        rootString: 5,
        chordType: "m7b5",
        slashType: "b7"
    }
];

// SECTION 8: COMPLEX EXTENDED SLASH
const EXTENDED_SLASH = [
    {
        name: "Maj13 / 5",
        frets: [-1, 3, 2, 2, 3, -1],
        rootString: 5,
        chordType: "maj13",
        slashType: "5"
    },
    {
        name: "13 / b7",
        frets: [-1, 1, 3, 1, 3, -1],
        rootString: 5,
        chordType: "13",
        slashType: "b7"
    }
];

// SECTION 9: SHELL VOICING SLASH EXPANSIONS
const SHELL_EXPANDED_SLASH = [
    {
        name: "Shell R-3-7 / 5",
        frets: [-1, 3, -1, 2, 0, -1],
        rootString: 5,
        chordType: "7",
        slashType: "5",
        category: "shell"
    },
    {
        name: "Shell 3-7-9 / b7",
        frets: [-1, 1, -1, 2, 3, -1],
        rootString: 5,
        chordType: "9",
        slashType: "b7",
        category: "shell"
    }
];

// SECTION 10: POP ACOUSTIC SLASH FAVORITES
const POP_ACOUSTIC_SLASH = [
    {
        name: "Em/G",
        frets: [3, 2, 2, 0, 0, 3],
        rootString: 4,
        chordType: "minor",
        slashType: "5",
        rootOverride: "E",
        bassOverride: "G"
    },
    {
        name: "G/B",
        frets: [-1, 2, 0, 0, 3, 3],
        rootString: 5,
        chordType: "major",
        slashType: "3",
        rootOverride: "G",
        bassOverride: "B"
    },
    {
        name: "C/G",
        frets: [3, 3, 2, 0, 1, 0],
        rootString: 5,
        chordType: "major",
        slashType: "5",
        rootOverride: "C",
        bassOverride: "G"
    },
    {
        name: "D/F#",
        frets: [2, -1, 0, 2, 3, 2],
        rootString: 4,
        chordType: "major",
        slashType: "3",
        rootOverride: "D",
        bassOverride: "F#"
    },
    {
        name: "C/E",
        frets: [0, 3, 2, 0, 1, 0],
        rootString: 5,
        chordType: "major",
        slashType: "3",
        rootOverride: "C",
        bassOverride: "E"
    }
];

module.exports = {
    MAJOR_SLASH,
    MINOR_SLASH,
    DOM7_SLASH,
    MAJ7_SLASH,
    DROP2_SLASH,
    SHELL_SLASH,
    NEOSOUL_SLASH,
    ALTERED_SLASH,
    POLYCHORD_SLASH,
    SPREAD_SLASH,
    DIM_SLASH,
    EXTENDED_SLASH,
    SHELL_EXPANDED_SLASH,
    POP_ACOUSTIC_SLASH
};