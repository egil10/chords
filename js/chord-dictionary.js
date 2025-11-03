// Complete guitar chord dictionary
const CHORD_DICTIONARY = {
    // Major chords
    'C': { type: 'major', intervals: [0, 4, 7], notes: ['C', 'E', 'G'], positions: [
        { frets: [0, 1, 0, 2, 1, 0], root: 0 },
        { frets: [3, 3, 5, 5, 5, 3], root: 0 },
        { frets: [8, 10, 10, 9, 8, 8], root: 0 }
    ]},
    'C#': { type: 'major', intervals: [1, 5, 8], notes: ['C#', 'E#', 'G#'], positions: [
        { frets: [-1, 4, 6, 6, 6, -1], root: 1 },
        { frets: [4, 4, 6, 6, 6, 4], root: 0 },
        { frets: [9, 11, 11, 10, 9, 9], root: 0 }
    ]},
    'Db': { type: 'major', intervals: [1, 5, 8], notes: ['Db', 'F', 'Ab'], positions: [
        { frets: [-1, 4, 6, 6, 6, -1], root: 1 },
        { frets: [4, 4, 6, 6, 6, 4], root: 0 },
        { frets: [9, 11, 11, 10, 9, 9], root: 0 }
    ]},
    'D': { type: 'major', intervals: [2, 6, 9], notes: ['D', 'F#', 'A'], positions: [
        { frets: [2, 2, 0, 0, 0, 2], root: 0 },
        { frets: [-1, -1, 0, 2, 3, 2], root: 2 },
        { frets: [5, 5, 7, 7, 7, 5], root: 0 }
    ]},
    'D#': { type: 'major', intervals: [3, 7, 10], notes: ['D#', 'F##', 'A#'], positions: [
        { frets: [-1, 6, 8, 8, 8, -1], root: 1 },
        { frets: [6, 6, 8, 8, 8, 6], root: 0 },
        { frets: [11, 13, 13, 12, 11, 11], root: 0 }
    ]},
    'Eb': { type: 'major', intervals: [3, 7, 10], notes: ['Eb', 'G', 'Bb'], positions: [
        { frets: [-1, 6, 8, 8, 8, -1], root: 1 },
        { frets: [6, 6, 8, 8, 8, 6], root: 0 },
        { frets: [11, 13, 13, 12, 11, 11], root: 0 }
    ]},
    'E': { type: 'major', intervals: [4, 8, 11], notes: ['E', 'G#', 'B'], positions: [
        { frets: [0, 0, 1, 2, 2, 0], root: 0 },
        { frets: [7, 7, 9, 9, 9, 7], root: 0 },
        { frets: [12, 12, 13, 14, 14, 12], root: 0 }
    ]},
    'F': { type: 'major', intervals: [5, 9, 0], notes: ['F', 'A', 'C'], positions: [
        { frets: [1, 3, 3, 2, 1, 1], root: 0 },
        { frets: [-1, 8, 10, 10, 10, -1], root: 1 },
        { frets: [8, 8, 10, 10, 10, 8], root: 0 }
    ]},
    'F#': { type: 'major', intervals: [6, 10, 1], notes: ['F#', 'A#', 'C#'], positions: [
        { frets: [2, 4, 4, 3, 2, 2], root: 0 },
        { frets: [-1, 9, 11, 11, 11, -1], root: 1 },
        { frets: [9, 9, 11, 11, 11, 9], root: 0 }
    ]},
    'Gb': { type: 'major', intervals: [6, 10, 1], notes: ['Gb', 'Bb', 'Db'], positions: [
        { frets: [2, 4, 4, 3, 2, 2], root: 0 },
        { frets: [-1, 9, 11, 11, 11, -1], root: 1 },
        { frets: [9, 9, 11, 11, 11, 9], root: 0 }
    ]},
    'G': { type: 'major', intervals: [7, 11, 2], notes: ['G', 'B', 'D'], positions: [
        { frets: [3, 0, 0, 0, 2, 3], root: 0 },
        { frets: [-1, -1, 0, 0, 0, 3], root: 5 },
        { frets: [10, 10, 12, 12, 12, 10], root: 0 }
    ]},
    'G#': { type: 'major', intervals: [8, 0, 3], notes: ['G#', 'C', 'D#'], positions: [
        { frets: [4, 1, 1, 1, 3, 4], root: 0 },
        { frets: [-1, -1, 1, 1, 1, 4], root: 5 }
    ]},
    'Ab': { type: 'major', intervals: [8, 0, 3], notes: ['Ab', 'C', 'Eb'], positions: [
        { frets: [4, 1, 1, 1, 3, 4], root: 0 },
        { frets: [-1, -1, 1, 1, 1, 4], root: 5 }
    ]},
    'A': { type: 'major', intervals: [9, 1, 4], notes: ['A', 'C#', 'E'], positions: [
        { frets: [0, 0, 2, 2, 2, 0], root: 0 },
        { frets: [5, 0, 0, 1, 0, -1], root: 0 },
        { frets: [12, 12, 14, 14, 14, 12], root: 0 }
    ]},
    'A#': { type: 'major', intervals: [10, 2, 5], notes: ['A#', 'D', 'F'], positions: [
        { frets: [1, 1, 3, 3, 3, 1], root: 0 },
        { frets: [6, 1, 1, 2, 1, -1], root: 0 }
    ]},
    'Bb': { type: 'major', intervals: [10, 2, 5], notes: ['Bb', 'D', 'F'], positions: [
        { frets: [1, 1, 3, 3, 3, 1], root: 0 },
        { frets: [6, 1, 1, 2, 1, -1], root: 0 },
        { frets: [-1, 6, 8, 8, 8, 6], root: 1 }
    ]},
    'B': { type: 'major', intervals: [11, 3, 6], notes: ['B', 'D#', 'F#'], positions: [
        { frets: [2, 2, 4, 4, 4, 2], root: 0 },
        { frets: [7, 2, 2, 3, 2, -1], root: 0 }
    ]},

    // Minor chords
    'Cm': { type: 'minor', intervals: [0, 3, 7], notes: ['C', 'Eb', 'G'], positions: [
        { frets: [-1, 3, 5, 5, 4, -1], root: 2 },
        { frets: [3, 3, 5, 5, 4, 3], root: 0 },
        { frets: [8, 10, 10, 8, 8, 8], root: 0 }
    ]},
    'C#m': { type: 'minor', intervals: [1, 4, 8], notes: ['C#', 'E', 'G#'], positions: [
        { frets: [-1, 4, 6, 6, 5, -1], root: 2 },
        { frets: [4, 4, 6, 6, 5, 4], root: 0 }
    ]},
    'Dbm': { type: 'minor', intervals: [1, 4, 8], notes: ['Db', 'E', 'Ab'], positions: [
        { frets: [-1, 4, 6, 6, 5, -1], root: 2 },
        { frets: [4, 4, 6, 6, 5, 4], root: 0 }
    ]},
    'Dm': { type: 'minor', intervals: [2, 5, 9], notes: ['D', 'F', 'A'], positions: [
        { frets: [-1, -1, 0, 2, 3, 1], root: 2 },
        { frets: [5, 5, 7, 7, 6, 5], root: 0 },
        { frets: [10, 12, 12, 10, 10, 10], root: 0 }
    ]},
    'D#m': { type: 'minor', intervals: [3, 6, 10], notes: ['D#', 'F#', 'A#'], positions: [
        { frets: [-1, 6, 8, 8, 7, -1], root: 2 },
        { frets: [6, 6, 8, 8, 7, 6], root: 0 }
    ]},
    'Ebm': { type: 'minor', intervals: [3, 6, 10], notes: ['Eb', 'Gb', 'Bb'], positions: [
        { frets: [-1, 6, 8, 8, 7, -1], root: 2 },
        { frets: [6, 6, 8, 8, 7, 6], root: 0 }
    ]},
    'Em': { type: 'minor', intervals: [4, 7, 11], notes: ['E', 'G', 'B'], positions: [
        { frets: [0, 0, 0, 2, 2, 0], root: 0 },
        { frets: [7, 7, 9, 9, 8, 7], root: 0 },
        { frets: [12, 12, 12, 14, 14, 12], root: 0 }
    ]},
    'Fm': { type: 'minor', intervals: [5, 8, 0], notes: ['F', 'Ab', 'C'], positions: [
        { frets: [1, 3, 3, 1, 1, 1], root: 0 },
        { frets: [-1, 8, 10, 10, 9, -1], root: 1 },
        { frets: [8, 8, 10, 10, 9, 8], root: 0 }
    ]},
    'F#m': { type: 'minor', intervals: [6, 9, 1], notes: ['F#', 'A', 'C#'], positions: [
        { frets: [2, 2, 0, 2, 2, -1], root: 2 },
        { frets: [2, 4, 4, 2, 2, 2], root: 0 },
        { frets: [9, 9, 11, 11, 10, 9], root: 0 }
    ]},
    'Gbm': { type: 'minor', intervals: [6, 9, 1], notes: ['Gb', 'A', 'Db'], positions: [
        { frets: [2, 2, 0, 2, 2, -1], root: 2 },
        { frets: [2, 4, 4, 2, 2, 2], root: 0 }
    ]},
    'Gm': { type: 'minor', intervals: [7, 10, 2], notes: ['G', 'Bb', 'D'], positions: [
        { frets: [3, 5, 5, 3, 3, 3], root: 0 },
        { frets: [-1, -1, 0, 3, 3, 1], root: 2 },
        { frets: [10, 10, 12, 12, 11, 10], root: 0 }
    ]},
    'G#m': { type: 'minor', intervals: [8, 11, 3], notes: ['G#', 'B', 'D#'], positions: [
        { frets: [4, 6, 6, 4, 4, 4], root: 0 },
        { frets: [-1, -1, 1, 4, 4, 2], root: 2 }
    ]},
    'Abm': { type: 'minor', intervals: [8, 11, 3], notes: ['Ab', 'B', 'Eb'], positions: [
        { frets: [4, 6, 6, 4, 4, 4], root: 0 },
        { frets: [-1, -1, 1, 4, 4, 2], root: 2 }
    ]},
    'Am': { type: 'minor', intervals: [9, 0, 4], notes: ['A', 'C', 'E'], positions: [
        { frets: [0, 1, 2, 2, 1, 0], root: 0 },
        { frets: [5, 5, 7, 7, 7, 5], root: 0 },
        { frets: [12, 13, 14, 14, 13, 12], root: 0 }
    ]},
    'A#m': { type: 'minor', intervals: [10, 1, 5], notes: ['A#', 'C#', 'F'], positions: [
        { frets: [1, 2, 3, 3, 2, 1], root: 0 },
        { frets: [6, 6, 8, 8, 8, 6], root: 0 }
    ]},
    'Bbm': { type: 'minor', intervals: [10, 1, 5], notes: ['Bb', 'Db', 'F'], positions: [
        { frets: [1, 2, 3, 3, 2, 1], root: 0 },
        { frets: [6, 6, 8, 8, 8, 6], root: 0 }
    ]},
    'Bm': { type: 'minor', intervals: [11, 2, 6], notes: ['B', 'D', 'F#'], positions: [
        { frets: [-1, 2, 4, 4, 3, -1], root: 1 },
        { frets: [2, 2, 4, 4, 3, 2], root: 0 },
        { frets: [7, 7, 9, 9, 9, 7], root: 0 }
    ]},

    // Diminished chords
    'Cdim': { type: 'dim', intervals: [0, 3, 6], notes: ['C', 'Eb', 'Gb'], positions: [
        { frets: [-1, 3, 4, 5, 4, -1], root: 1 }
    ]},
    'C#dim': { type: 'dim', intervals: [1, 4, 7], notes: ['C#', 'E', 'G'], positions: [
        { frets: [-1, 4, 5, 6, 5, -1], root: 1 }
    ]},
    'Ddim': { type: 'dim', intervals: [2, 5, 8], notes: ['D', 'F', 'Ab'], positions: [
        { frets: [-1, 5, 6, 7, 6, -1], root: 1 }
    ]},
    'D#dim': { type: 'dim', intervals: [3, 6, 9], notes: ['D#', 'F#', 'A'], positions: [
        { frets: [-1, 6, 7, 8, 7, -1], root: 1 }
    ]},
    'Edim': { type: 'dim', intervals: [4, 7, 10], notes: ['E', 'G', 'Bb'], positions: [
        { frets: [-1, 7, 8, 9, 8, -1], root: 1 }
    ]},
    'Fdim': { type: 'dim', intervals: [5, 8, 11], notes: ['F', 'Ab', 'B'], positions: [
        { frets: [-1, 8, 9, 10, 9, -1], root: 1 }
    ]},
    'F#dim': { type: 'dim', intervals: [6, 9, 0], notes: ['F#', 'A', 'C'], positions: [
        { frets: [-1, 9, 10, 11, 10, -1], root: 1 }
    ]},
    'Gdim': { type: 'dim', intervals: [7, 10, 1], notes: ['G', 'Bb', 'Db'], positions: [
        { frets: [-1, 10, 11, 12, 11, -1], root: 1 }
    ]},
    'G#dim': { type: 'dim', intervals: [8, 11, 2], notes: ['G#', 'B', 'D'], positions: [
        { frets: [-1, 11, 12, 13, 12, -1], root: 1 }
    ]},
    'Adim': { type: 'dim', intervals: [9, 0, 3], notes: ['A', 'C', 'Eb'], positions: [
        { frets: [-1, 12, 13, 14, 13, -1], root: 1 }
    ]},
    'A#dim': { type: 'dim', intervals: [10, 1, 4], notes: ['A#', 'C#', 'E'], positions: [
        { frets: [-1, 1, 2, 3, 2, -1], root: 1 }
    ]},
    'Bbdim': { type: 'dim', intervals: [10, 1, 4], notes: ['Bb', 'Db', 'E'], positions: [
        { frets: [-1, 1, 2, 3, 2, -1], root: 1 }
    ]},
    'Bdim': { type: 'dim', intervals: [11, 2, 5], notes: ['B', 'D', 'F'], positions: [
        { frets: [-1, 2, 3, 4, 3, -1], root: 1 }
    ]},

    // Augmented chords
    'Caug': { type: 'aug', intervals: [0, 4, 8], notes: ['C', 'E', 'G#'], positions: [
        { frets: [-1, -1, 0, 1, 1, 0], root: 4 }
    ]},
    'C#aug': { type: 'aug', intervals: [1, 5, 9], notes: ['C#', 'F', 'A'], positions: [
        { frets: [-1, -1, 1, 2, 2, 1], root: 4 }
    ]},
    'Dbaug': { type: 'aug', intervals: [1, 5, 9], notes: ['Db', 'F', 'A'], positions: [
        { frets: [-1, -1, 1, 2, 2, 1], root: 4 }
    ]},
    'Daug': { type: 'aug', intervals: [2, 6, 10], notes: ['D', 'F#', 'A#'], positions: [
        { frets: [-1, -1, 2, 3, 3, 2], root: 4 }
    ]},
    'D#aug': { type: 'aug', intervals: [3, 7, 11], notes: ['D#', 'G', 'B'], positions: [
        { frets: [-1, -1, 3, 4, 4, 3], root: 4 }
    ]},
    'Ebaug': { type: 'aug', intervals: [3, 7, 11], notes: ['Eb', 'G', 'B'], positions: [
        { frets: [-1, -1, 3, 4, 4, 3], root: 4 }
    ]},
    'Eaug': { type: 'aug', intervals: [4, 8, 0], notes: ['E', 'G#', 'C'], positions: [
        { frets: [-1, -1, 4, 5, 5, 4], root: 4 }
    ]},
    'Faug': { type: 'aug', intervals: [5, 9, 1], notes: ['F', 'A', 'C#'], positions: [
        { frets: [-1, -1, 5, 6, 6, 5], root: 4 }
    ]},
    'F#aug': { type: 'aug', intervals: [6, 10, 2], notes: ['F#', 'A#', 'D'], positions: [
        { frets: [-1, -1, 6, 7, 7, 6], root: 4 }
    ]},
    'Gbaug': { type: 'aug', intervals: [6, 10, 2], notes: ['Gb', 'Bb', 'D'], positions: [
        { frets: [-1, -1, 6, 7, 7, 6], root: 4 }
    ]},
    'Gaug': { type: 'aug', intervals: [7, 11, 3], notes: ['G', 'B', 'D#'], positions: [
        { frets: [-1, -1, 7, 8, 8, 7], root: 4 }
    ]},
    'G#aug': { type: 'aug', intervals: [8, 0, 4], notes: ['G#', 'C', 'E'], positions: [
        { frets: [-1, -1, 8, 9, 9, 8], root: 4 }
    ]},
    'Abaug': { type: 'aug', intervals: [8, 0, 4], notes: ['Ab', 'C', 'E'], positions: [
        { frets: [-1, -1, 8, 9, 9, 8], root: 4 }
    ]},
    'Aaug': { type: 'aug', intervals: [9, 1, 5], notes: ['A', 'C#', 'F'], positions: [
        { frets: [-1, -1, 9, 10, 10, 9], root: 4 }
    ]},
    'A#aug': { type: 'aug', intervals: [10, 2, 6], notes: ['A#', 'D', 'F#'], positions: [
        { frets: [-1, -1, 10, 11, 11, 10], root: 4 }
    ]},
    'Bbaug': { type: 'aug', intervals: [10, 2, 6], notes: ['Bb', 'D', 'F#'], positions: [
        { frets: [-1, -1, 10, 11, 11, 10], root: 4 }
    ]},
    'Baug': { type: 'aug', intervals: [11, 3, 7], notes: ['B', 'D#', 'G'], positions: [
        { frets: [-1, -1, 11, 12, 12, 11], root: 4 }
    ]},

    // 7th chords (Dominant)
    'C7': { type: '7', intervals: [0, 4, 7, 10], notes: ['C', 'E', 'G', 'Bb'], positions: [
        { frets: [0, 3, 0, 2, 1, 0], root: 0 },
        { frets: [3, 3, 5, 3, 5, 3], root: 0 }
    ]},
    'C#7': { type: '7', intervals: [1, 5, 8, 11], notes: ['C#', 'F', 'G#', 'B'], positions: [
        { frets: [-1, 4, 6, 4, 6, 4], root: 1 }
    ]},
    'Db7': { type: '7', intervals: [1, 5, 8, 11], notes: ['Db', 'F', 'Ab', 'B'], positions: [
        { frets: [-1, 4, 6, 4, 6, 4], root: 1 }
    ]},
    'D7': { type: '7', intervals: [2, 6, 9, 0], notes: ['D', 'F#', 'A', 'C'], positions: [
        { frets: [-1, -1, 0, 2, 1, 2], root: 2 },
        { frets: [5, 5, 7, 5, 7, 5], root: 0 }
    ]},
    'D#7': { type: '7', intervals: [3, 7, 10, 1], notes: ['D#', 'G', 'A#', 'C#'], positions: [
        { frets: [-1, 6, 8, 6, 8, 6], root: 1 }
    ]},
    'Eb7': { type: '7', intervals: [3, 7, 10, 1], notes: ['Eb', 'G', 'Bb', 'Db'], positions: [
        { frets: [-1, 6, 8, 6, 8, 6], root: 1 }
    ]},
    'E7': { type: '7', intervals: [4, 8, 11, 2], notes: ['E', 'G#', 'B', 'D'], positions: [
        { frets: [0, 0, 1, 2, 2, 0], root: 0 },
        { frets: [7, 7, 9, 7, 9, 7], root: 0 }
    ]},
    'F7': { type: '7', intervals: [5, 9, 0, 3], notes: ['F', 'A', 'C', 'Eb'], positions: [
        { frets: [1, 3, 1, 2, 1, 1], root: 0 },
        { frets: [-1, 8, 10, 8, 10, 8], root: 1 }
    ]},
    'F#7': { type: '7', intervals: [6, 10, 1, 4], notes: ['F#', 'A#', 'C#', 'E'], positions: [
        { frets: [2, 4, 2, 3, 2, 2], root: 0 },
        { frets: [-1, 9, 11, 9, 11, 9], root: 1 }
    ]},
    'Gb7': { type: '7', intervals: [6, 10, 1, 4], notes: ['Gb', 'Bb', 'Db', 'E'], positions: [
        { frets: [2, 4, 2, 3, 2, 2], root: 0 },
        { frets: [-1, 9, 11, 9, 11, 9], root: 1 }
    ]},
    'G7': { type: '7', intervals: [7, 11, 2, 5], notes: ['G', 'B', 'D', 'F'], positions: [
        { frets: [3, 0, 0, 0, 2, 1], root: 0 },
        { frets: [-1, -1, 0, 0, 0, 1], root: 5 },
        { frets: [10, 10, 12, 10, 12, 10], root: 0 }
    ]},
    'G#7': { type: '7', intervals: [8, 0, 3, 6], notes: ['G#', 'C', 'D#', 'G'], positions: [
        { frets: [4, 1, 1, 1, 3, 2], root: 0 }
    ]},
    'Ab7': { type: '7', intervals: [8, 0, 3, 6], notes: ['Ab', 'C', 'Eb', 'G'], positions: [
        { frets: [4, 1, 1, 1, 3, 2], root: 0 }
    ]},
    'A7': { type: '7', intervals: [9, 1, 4, 7], notes: ['A', 'C#', 'E', 'G'], positions: [
        { frets: [0, 0, 2, 0, 2, 0], root: 0 },
        { frets: [-1, -1, 2, 2, 2, 0], root: 2 },
        { frets: [12, 12, 14, 12, 14, 12], root: 0 }
    ]},
    'A#7': { type: '7', intervals: [10, 2, 5, 8], notes: ['A#', 'D', 'F', 'G#'], positions: [
        { frets: [1, 1, 3, 1, 3, 1], root: 0 }
    ]},
    'Bb7': { type: '7', intervals: [10, 2, 5, 8], notes: ['Bb', 'D', 'F', 'Ab'], positions: [
        { frets: [1, 1, 3, 1, 3, 1], root: 0 }
    ]},
    'B7': { type: '7', intervals: [11, 3, 6, 9], notes: ['B', 'D#', 'F#', 'A'], positions: [
        { frets: [-1, 2, 4, 2, 4, 2], root: 1 }
    ]},

    // Major 7th chords
    'Cmaj7': { type: 'maj7', intervals: [0, 4, 7, 11], notes: ['C', 'E', 'G', 'B'], positions: [
        { frets: [0, 3, 2, 0, 1, 0], root: 0 },
        { frets: [3, 3, 5, 4, 5, 3], root: 0 }
    ]},
    'C#maj7': { type: 'maj7', intervals: [1, 5, 8, 0], notes: ['C#', 'F', 'G#', 'C'], positions: [
        { frets: [-1, 4, 6, 5, 6, 4], root: 1 }
    ]},
    'Dbmaj7': { type: 'maj7', intervals: [1, 5, 8, 0], notes: ['Db', 'F', 'Ab', 'C'], positions: [
        { frets: [-1, 4, 6, 5, 6, 4], root: 1 }
    ]},
    'Dmaj7': { type: 'maj7', intervals: [2, 6, 9, 1], notes: ['D', 'F#', 'A', 'C#'], positions: [
        { frets: [2, 2, 0, 2, 0, 2], root: 0 },
        { frets: [-1, -1, 0, 2, 2, 2], root: 2 }
    ]},
    'D#maj7': { type: 'maj7', intervals: [3, 7, 10, 2], notes: ['D#', 'G', 'A#', 'D'], positions: [
        { frets: [-1, 6, 8, 7, 8, 6], root: 1 }
    ]},
    'Ebmaj7': { type: 'maj7', intervals: [3, 7, 10, 2], notes: ['Eb', 'G', 'Bb', 'D'], positions: [
        { frets: [-1, 6, 8, 7, 8, 6], root: 1 }
    ]},
    'Emaj7': { type: 'maj7', intervals: [4, 8, 11, 3], notes: ['E', 'G#', 'B', 'D#'], positions: [
        { frets: [0, 0, 1, 1, 2, 0], root: 0 },
        { frets: [7, 7, 9, 8, 9, 7], root: 0 }
    ]},
    'Fmaj7': { type: 'maj7', intervals: [5, 9, 0, 4], notes: ['F', 'A', 'C', 'E'], positions: [
        { frets: [1, 3, 2, 2, 1, 1], root: 0 },
        { frets: [-1, 8, 10, 9, 10, 8], root: 1 }
    ]},
    'F#maj7': { type: 'maj7', intervals: [6, 10, 1, 5], notes: ['F#', 'A#', 'C#', 'F'], positions: [
        { frets: [2, 4, 3, 3, 2, 2], root: 0 },
        { frets: [-1, 9, 11, 10, 11, 9], root: 1 }
    ]},
    'Gbmaj7': { type: 'maj7', intervals: [6, 10, 1, 5], notes: ['Gb', 'Bb', 'Db', 'F'], positions: [
        { frets: [2, 4, 3, 3, 2, 2], root: 0 },
        { frets: [-1, 9, 11, 10, 11, 9], root: 1 }
    ]},
    'Gmaj7': { type: 'maj7', intervals: [7, 11, 2, 6], notes: ['G', 'B', 'D', 'F#'], positions: [
        { frets: [3, 0, 0, 0, 2, 2], root: 0 },
        { frets: [-1, -1, 0, 0, 0, 2], root: 5 }
    ]},
    'G#maj7': { type: 'maj7', intervals: [8, 0, 3, 7], notes: ['G#', 'C', 'D#', 'G'], positions: [
        { frets: [4, 1, 1, 1, 3, 3], root: 0 }
    ]},
    'Abmaj7': { type: 'maj7', intervals: [8, 0, 3, 7], notes: ['Ab', 'C', 'Eb', 'G'], positions: [
        { frets: [4, 1, 1, 1, 3, 3], root: 0 }
    ]},
    'Amaj7': { type: 'maj7', intervals: [9, 1, 4, 8], notes: ['A', 'C#', 'E', 'G#'], positions: [
        { frets: [0, 0, 2, 1, 2, 0], root: 0 },
        { frets: [-1, -1, 2, 4, 2, 4], root: 2 }
    ]},
    'A#maj7': { type: 'maj7', intervals: [10, 2, 5, 9], notes: ['A#', 'D', 'F', 'A'], positions: [
        { frets: [1, 1, 3, 2, 3, 1], root: 0 }
    ]},
    'Bbmaj7': { type: 'maj7', intervals: [10, 2, 5, 9], notes: ['Bb', 'D', 'F', 'A'], positions: [
        { frets: [1, 1, 3, 2, 3, 1], root: 0 }
    ]},
    'Bmaj7': { type: 'maj7', intervals: [11, 3, 6, 10], notes: ['B', 'D#', 'F#', 'A#'], positions: [
        { frets: [-1, 2, 4, 3, 4, 2], root: 1 }
    ]},

    // Minor 7th chords
    'Cm7': { type: 'm7', intervals: [0, 3, 7, 10], notes: ['C', 'Eb', 'G', 'Bb'], positions: [
        { frets: [-1, 3, 5, 3, 5, 3], root: 1 },
        { frets: [3, 3, 5, 3, 5, -1], root: 0 }
    ]},
    'C#m7': { type: 'm7', intervals: [1, 4, 8, 11], notes: ['C#', 'E', 'G#', 'B'], positions: [
        { frets: [-1, 4, 6, 4, 6, 4], root: 1 }
    ]},
    'Dbm7': { type: 'm7', intervals: [1, 4, 8, 11], notes: ['Db', 'E', 'Ab', 'B'], positions: [
        { frets: [-1, 4, 6, 4, 6, 4], root: 1 }
    ]},
    'Dm7': { type: 'm7', intervals: [2, 5, 9, 0], notes: ['D', 'F', 'A', 'C'], positions: [
        { frets: [-1, -1, 0, 2, 1, 1], root: 2 },
        { frets: [5, 5, 7, 5, 7, -1], root: 0 }
    ]},
    'D#m7': { type: 'm7', intervals: [3, 6, 10, 1], notes: ['D#', 'F#', 'A#', 'C#'], positions: [
        { frets: [-1, 6, 8, 6, 8, 6], root: 1 }
    ]},
    'Ebm7': { type: 'm7', intervals: [3, 6, 10, 1], notes: ['Eb', 'Gb', 'Bb', 'Db'], positions: [
        { frets: [-1, 6, 8, 6, 8, 6], root: 1 }
    ]},
    'Em7': { type: 'm7', intervals: [4, 7, 11, 2], notes: ['E', 'G', 'B', 'D'], positions: [
        { frets: [0, 0, 0, 2, 2, 0], root: 0 },
        { frets: [7, 7, 9, 7, 9, -1], root: 0 }
    ]},
    'Fm7': { type: 'm7', intervals: [5, 8, 0, 3], notes: ['F', 'Ab', 'C', 'Eb'], positions: [
        { frets: [-1, 8, 10, 8, 10, 8], root: 1 },
        { frets: [8, 8, 10, 8, 10, -1], root: 0 }
    ]},
    'F#m7': { type: 'm7', intervals: [6, 9, 1, 4], notes: ['F#', 'A', 'C#', 'E'], positions: [
        { frets: [2, 2, 0, 2, 2, 0], root: 2 },
        { frets: [9, 9, 11, 9, 11, -1], root: 0 }
    ]},
    'Gbm7': { type: 'm7', intervals: [6, 9, 1, 4], notes: ['Gb', 'A', 'Db', 'E'], positions: [
        { frets: [2, 2, 0, 2, 2, 0], root: 2 }
    ]},
    'Gm7': { type: 'm7', intervals: [7, 10, 2, 5], notes: ['G', 'Bb', 'D', 'F'], positions: [
        { frets: [3, 3, 0, 0, 0, 1], root: 3 },
        { frets: [3, 5, 3, 5, 3, -1], root: 0 }
    ]},
    'G#m7': { type: 'm7', intervals: [8, 11, 3, 6], notes: ['G#', 'B', 'D#', 'G'], positions: [
        { frets: [4, 4, 1, 1, 1, 2], root: 3 }
    ]},
    'Abm7': { type: 'm7', intervals: [8, 11, 3, 6], notes: ['Ab', 'B', 'Eb', 'G'], positions: [
        { frets: [4, 4, 1, 1, 1, 2], root: 3 }
    ]},
    'Am7': { type: 'm7', intervals: [9, 0, 4, 7], notes: ['A', 'C', 'E', 'G'], positions: [
        { frets: [0, 0, 2, 0, 2, 0], root: 0 },
        { frets: [5, 5, 0, 0, 0, 5], root: 0 },
        { frets: [12, 12, 14, 12, 14, 12], root: 0 }
    ]},
    'A#m7': { type: 'm7', intervals: [10, 1, 5, 8], notes: ['A#', 'C#', 'F', 'G#'], positions: [
        { frets: [1, 1, 3, 1, 3, 1], root: 0 }
    ]},
    'Bbm7': { type: 'm7', intervals: [10, 1, 5, 8], notes: ['Bb', 'Db', 'F', 'Ab'], positions: [
        { frets: [1, 1, 3, 1, 3, 1], root: 0 }
    ]},
    'Bm7': { type: 'm7', intervals: [11, 2, 6, 9], notes: ['B', 'D', 'F#', 'A'], positions: [
        { frets: [-1, 2, 4, 2, 4, 2], root: 1 }
    ]},

    // Diminished 7th chords
    'Cdim7': { type: 'dim7', intervals: [0, 3, 6, 9], notes: ['C', 'Eb', 'Gb', 'A'], positions: [
        { frets: [-1, -1, 0, 1, 0, 1], root: 4 }
    ]},
    'C#dim7': { type: 'dim7', intervals: [1, 4, 7, 10], notes: ['C#', 'E', 'G', 'Bb'], positions: [
        { frets: [-1, -1, 1, 2, 1, 2], root: 4 }
    ]},
    'Ddim7': { type: 'dim7', intervals: [2, 5, 8, 11], notes: ['D', 'F', 'Ab', 'B'], positions: [
        { frets: [-1, -1, 2, 3, 2, 3], root: 4 }
    ]},
    'D#dim7': { type: 'dim7', intervals: [3, 6, 9, 0], notes: ['D#', 'F#', 'A', 'C'], positions: [
        { frets: [-1, -1, 3, 4, 3, 4], root: 4 }
    ]},
    'Edim7': { type: 'dim7', intervals: [4, 7, 10, 1], notes: ['E', 'G', 'Bb', 'Db'], positions: [
        { frets: [-1, -1, 4, 5, 4, 5], root: 4 }
    ]},
    'Fdim7': { type: 'dim7', intervals: [5, 8, 11, 2], notes: ['F', 'Ab', 'B', 'D'], positions: [
        { frets: [-1, -1, 5, 6, 5, 6], root: 4 }
    ]},
    'F#dim7': { type: 'dim7', intervals: [6, 9, 0, 3], notes: ['F#', 'A', 'C', 'Eb'], positions: [
        { frets: [-1, -1, 6, 7, 6, 7], root: 4 }
    ]},
    'Gdim7': { type: 'dim7', intervals: [7, 10, 1, 4], notes: ['G', 'Bb', 'Db', 'E'], positions: [
        { frets: [-1, -1, 7, 8, 7, 8], root: 4 }
    ]},
    'G#dim7': { type: 'dim7', intervals: [8, 11, 2, 5], notes: ['G#', 'B', 'D', 'F'], positions: [
        { frets: [-1, -1, 8, 9, 8, 9], root: 4 }
    ]},
    'Adim7': { type: 'dim7', intervals: [9, 0, 3, 6], notes: ['A', 'C', 'Eb', 'G'], positions: [
        { frets: [-1, -1, 9, 10, 9, 10], root: 4 }
    ]},
    'A#dim7': { type: 'dim7', intervals: [10, 1, 4, 7], notes: ['A#', 'C#', 'E', 'G'], positions: [
        { frets: [-1, -1, 10, 11, 10, 11], root: 4 }
    ]},
    'Bbdim7': { type: 'dim7', intervals: [10, 1, 4, 7], notes: ['Bb', 'Db', 'E', 'G'], positions: [
        { frets: [-1, -1, 10, 11, 10, 11], root: 4 }
    ]},
    'Bdim7': { type: 'dim7', intervals: [11, 2, 5, 8], notes: ['B', 'D', 'F', 'Ab'], positions: [
        { frets: [-1, -1, 11, 12, 11, 12], root: 4 }
    ]},

    // Augmented 7th chords
    'Caug7': { type: 'aug7', intervals: [0, 4, 8, 11], notes: ['C', 'E', 'G#', 'B'], positions: [
        { frets: [-1, -1, 0, 1, 1, 0], root: 4 }
    ]},
    'C#aug7': { type: 'aug7', intervals: [1, 5, 9, 0], notes: ['C#', 'F', 'A', 'C'], positions: [
        { frets: [-1, -1, 1, 2, 2, 1], root: 4 }
    ]},
    'Dbaug7': { type: 'aug7', intervals: [1, 5, 9, 0], notes: ['Db', 'F', 'A', 'C'], positions: [
        { frets: [-1, -1, 1, 2, 2, 1], root: 4 }
    ]},
    'Daug7': { type: 'aug7', intervals: [2, 6, 10, 1], notes: ['D', 'F#', 'A#', 'C#'], positions: [
        { frets: [-1, -1, 2, 3, 3, 2], root: 4 }
    ]},
    'D#aug7': { type: 'aug7', intervals: [3, 7, 11, 2], notes: ['D#', 'G', 'B', 'D'], positions: [
        { frets: [-1, -1, 3, 4, 4, 3], root: 4 }
    ]},
    'Ebaug7': { type: 'aug7', intervals: [3, 7, 11, 2], notes: ['Eb', 'G', 'B', 'D'], positions: [
        { frets: [-1, -1, 3, 4, 4, 3], root: 4 }
    ]},
    'Eaug7': { type: 'aug7', intervals: [4, 8, 0, 3], notes: ['E', 'G#', 'C', 'Eb'], positions: [
        { frets: [-1, -1, 4, 5, 5, 4], root: 4 }
    ]},
    'Faug7': { type: 'aug7', intervals: [5, 9, 1, 4], notes: ['F', 'A', 'C#', 'E'], positions: [
        { frets: [-1, -1, 5, 6, 6, 5], root: 4 }
    ]},
    'F#aug7': { type: 'aug7', intervals: [6, 10, 2, 5], notes: ['F#', 'A#', 'D', 'F'], positions: [
        { frets: [-1, -1, 6, 7, 7, 6], root: 4 }
    ]},
    'Gbaug7': { type: 'aug7', intervals: [6, 10, 2, 5], notes: ['Gb', 'Bb', 'D', 'F'], positions: [
        { frets: [-1, -1, 6, 7, 7, 6], root: 4 }
    ]},
    'Gaug7': { type: 'aug7', intervals: [7, 11, 3, 6], notes: ['G', 'B', 'D#', 'G'], positions: [
        { frets: [-1, -1, 7, 8, 8, 7], root: 4 }
    ]},
    'G#aug7': { type: 'aug7', intervals: [8, 0, 4, 7], notes: ['G#', 'C', 'E', 'G'], positions: [
        { frets: [-1, -1, 8, 9, 9, 8], root: 4 }
    ]},
    'Abaug7': { type: 'aug7', intervals: [8, 0, 4, 7], notes: ['Ab', 'C', 'E', 'G'], positions: [
        { frets: [-1, -1, 8, 9, 9, 8], root: 4 }
    ]},
    'Aaug7': { type: 'aug7', intervals: [9, 1, 5, 8], notes: ['A', 'C#', 'F', 'G#'], positions: [
        { frets: [-1, -1, 9, 10, 10, 9], root: 4 }
    ]},
    'A#aug7': { type: 'aug7', intervals: [10, 2, 6, 9], notes: ['A#', 'D', 'F#', 'A'], positions: [
        { frets: [-1, -1, 10, 11, 11, 10], root: 4 }
    ]},
    'Bbaug7': { type: 'aug7', intervals: [10, 2, 6, 9], notes: ['Bb', 'D', 'F#', 'A'], positions: [
        { frets: [-1, -1, 10, 11, 11, 10], root: 4 }
    ]},
    'Baug7': { type: 'aug7', intervals: [11, 3, 7, 10], notes: ['B', 'D#', 'G', 'Bb'], positions: [
        { frets: [-1, -1, 11, 12, 12, 11], root: 4 }
    ]},

    // Suspended chords
    'Csus2': { type: 'sus2', intervals: [0, 2, 7], notes: ['C', 'D', 'G'], positions: [
        { frets: [-1, 3, 0, 0, 1, 3], root: 1 }
    ]},
    'Dsus2': { type: 'sus2', intervals: [2, 4, 9], notes: ['D', 'E', 'A'], positions: [
        { frets: [0, 0, 2, 2, 0, 0], root: 3 },
        { frets: [-1, -1, 0, 2, 3, 0], root: 2 }
    ]},
    'Esus2': { type: 'sus2', intervals: [4, 6, 11], notes: ['E', 'F#', 'B'], positions: [
        { frets: [0, 2, 2, 2, 0, 0], root: 0 }
    ]},
    'Fsus2': { type: 'sus2', intervals: [5, 7, 0], notes: ['F', 'G', 'C'], positions: [
        { frets: [1, 1, 3, 3, 1, 1], root: 0 }
    ]},
    'Gsus2': { type: 'sus2', intervals: [7, 9, 2], notes: ['G', 'A', 'D'], positions: [
        { frets: [0, 0, 5, 5, 3, 0], root: 4 },
        { frets: [3, 0, 0, 0, 0, 1], root: 0 }
    ]},
    'Asus2': { type: 'sus2', intervals: [9, 11, 4], notes: ['A', 'B', 'E'], positions: [
        { frets: [0, 0, 2, 2, 0, 0], root: 0 }
    ]},
    'Bsus2': { type: 'sus2', intervals: [11, 1, 6], notes: ['B', 'C#', 'F#'], positions: [
        { frets: [2, 2, 4, 4, 2, 2], root: 0 }
    ]},

    'Csus4': { type: 'sus4', intervals: [0, 5, 7], notes: ['C', 'F', 'G'], positions: [
        { frets: [-1, 3, 3, 0, 1, 1], root: 1 }
    ]},
    'Dsus4': { type: 'sus4', intervals: [2, 7, 9], notes: ['D', 'G', 'A'], positions: [
        { frets: [0, 0, 0, 2, 3, 0], root: 3 },
        { frets: [-1, -1, 0, 2, 3, 3], root: 2 }
    ]},
    'Esus4': { type: 'sus4', intervals: [4, 9, 11], notes: ['E', 'A', 'B'], positions: [
        { frets: [0, 0, 2, 2, 0, 0], root: 4 }
    ]},
    'Fsus4': { type: 'sus4', intervals: [5, 10, 0], notes: ['F', 'Bb', 'C'], positions: [
        { frets: [1, 1, 3, 3, 1, 1], root: 3 }
    ]},
    'Gsus4': { type: 'sus4', intervals: [7, 0, 2], notes: ['G', 'C', 'D'], positions: [
        { frets: [3, 0, 0, 0, 1, 3], root: 0 }
    ]},
    'Asus4': { type: 'sus4', intervals: [9, 2, 4], notes: ['A', 'D', 'E'], positions: [
        { frets: [0, 0, 2, 2, 0, 0], root: 2 }
    ]},
    'Bsus4': { type: 'sus4', intervals: [11, 4, 6], notes: ['B', 'E', 'F#'], positions: [
        { frets: [2, 2, 4, 4, 0, 0], root: 4 }
    ]},

    // Add9 chords
    'Cadd9': { type: 'add9', intervals: [0, 4, 7, 2], notes: ['C', 'E', 'G', 'D'], positions: [
        { frets: [-1, 3, 2, 0, 3, 0], root: 4 }
    ]},
    'Dadd9': { type: 'add9', intervals: [2, 6, 9, 4], notes: ['D', 'F#', 'A', 'E'], positions: [
        { frets: [-1, -1, 0, 2, 0, 2], root: 2 }
    ]},
    'Eadd9': { type: 'add9', intervals: [4, 8, 11, 6], notes: ['E', 'G#', 'B', 'F#'], positions: [
        { frets: [0, 2, 1, 0, 2, 0], root: 0 }
    ]},
    'Fadd9': { type: 'add9', intervals: [5, 9, 0, 7], notes: ['F', 'A', 'C', 'G'], positions: [
        { frets: [1, 3, 0, 2, 3, 1], root: 0 }
    ]},
    'Gadd9': { type: 'add9', intervals: [7, 11, 2, 9], notes: ['G', 'B', 'D', 'A'], positions: [
        { frets: [3, 0, 0, 0, 0, 3], root: 0 }
    ]},
    'Aadd9': { type: 'add9', intervals: [9, 1, 4, 11], notes: ['A', 'C#', 'E', 'B'], positions: [
        { frets: [-1, 0, 2, 4, 2, 0], root: 1 }
    ]},
    'Badd9': { type: 'add9', intervals: [11, 3, 6, 1], notes: ['B', 'D#', 'F#', 'C#'], positions: [
        { frets: [-1, 2, 4, 3, 2, -1], root: 1 }
    ]},

    // 6th chords
    'C6': { type: '6', intervals: [0, 4, 7, 9], notes: ['C', 'E', 'G', 'A'], positions: [
        { frets: [-1, 3, 2, 2, 1, 0], root: 4 }
    ]},
    'D6': { type: '6', intervals: [2, 6, 9, 11], notes: ['D', 'F#', 'A', 'B'], positions: [
        { frets: [-1, -1, 0, 2, 0, 2], root: 2 }
    ]},
    'E6': { type: '6', intervals: [4, 8, 11, 1], notes: ['E', 'G#', 'B', 'C#'], positions: [
        { frets: [0, 2, 2, 1, 2, 0], root: 0 }
    ]},
    'F6': { type: '6', intervals: [5, 9, 0, 2], notes: ['F', 'A', 'C', 'D'], positions: [
        { frets: [1, 3, 0, 2, 3, 1], root: 0 }
    ]},
    'G6': { type: '6', intervals: [7, 11, 2, 4], notes: ['G', 'B', 'D', 'E'], positions: [
        { frets: [3, 0, 0, 0, 0, 3], root: 0 }
    ]},
    'A6': { type: '6', intervals: [9, 1, 4, 6], notes: ['A', 'C#', 'E', 'F#'], positions: [
        { frets: [-1, 0, 2, 2, 2, 0], root: 1 }
    ]},
    'B6': { type: '6', intervals: [11, 3, 6, 8], notes: ['B', 'D#', 'F#', 'G#'], positions: [
        { frets: [-1, 2, 4, 3, 2, -1], root: 1 }
    ]},

    // Minor 6th chords
    'Cm6': { type: 'm6', intervals: [0, 3, 7, 9], notes: ['C', 'Eb', 'G', 'A'], positions: [
        { frets: [-1, 3, 1, 2, 1, 0], root: 4 }
    ]},
    'Dm6': { type: 'm6', intervals: [2, 5, 9, 11], notes: ['D', 'F', 'A', 'B'], positions: [
        { frets: [-1, -1, 0, 2, 1, 2], root: 2 }
    ]},
    'Em6': { type: 'm6', intervals: [4, 7, 11, 1], notes: ['E', 'G', 'B', 'C#'], positions: [
        { frets: [0, 2, 0, 1, 2, 0], root: 0 }
    ]},
    'Fm6': { type: 'm6', intervals: [5, 8, 0, 2], notes: ['F', 'Ab', 'C', 'D'], positions: [
        { frets: [1, 3, 3, 1, 3, 1], root: 0 }
    ]},
    'Gm6': { type: 'm6', intervals: [7, 10, 2, 4], notes: ['G', 'Bb', 'D', 'E'], positions: [
        { frets: [3, 5, 3, 5, 3, 3], root: 0 }
    ]},
    'Am6': { type: 'm6', intervals: [9, 0, 4, 6], notes: ['A', 'C', 'E', 'F#'], positions: [
        { frets: [-1, 0, 2, 2, 1, 0], root: 1 }
    ]},
    'Bm6': { type: 'm6', intervals: [11, 2, 6, 8], notes: ['B', 'D', 'F#', 'G#'], positions: [
        { frets: [-1, 2, 4, 3, 2, 2], root: 1 }
    ]},

    // 9th chords
    'C9': { type: '9', intervals: [0, 4, 7, 10, 2], notes: ['C', 'E', 'G', 'Bb', 'D'], positions: [
        { frets: [-1, 3, 3, 3, 3, 0], root: 5 }
    ]},
    'D9': { type: '9', intervals: [2, 6, 9, 0, 4], notes: ['D', 'F#', 'A', 'C', 'E'], positions: [
        { frets: [-1, -1, 0, 2, 1, 2], root: 2 }
    ]},
    'E9': { type: '9', intervals: [4, 8, 11, 2, 6], notes: ['E', 'G#', 'B', 'D', 'F#'], positions: [
        { frets: [0, 2, 0, 1, 0, 0], root: 0 }
    ]},
    'F9': { type: '9', intervals: [5, 9, 0, 3, 7], notes: ['F', 'A', 'C', 'Eb', 'G'], positions: [
        { frets: [1, 3, 0, 3, 0, 1], root: 0 }
    ]},
    'G9': { type: '9', intervals: [7, 11, 2, 5, 9], notes: ['G', 'B', 'D', 'F', 'A'], positions: [
        { frets: [3, 0, 0, 0, 0, 1], root: 0 }
    ]},
    'A9': { type: '9', intervals: [9, 1, 4, 7, 11], notes: ['A', 'C#', 'E', 'G', 'B'], positions: [
        { frets: [5, 0, 6, 4, 5, 0], root: 0 }
    ]},
    'B9': { type: '9', intervals: [11, 3, 6, 9, 1], notes: ['B', 'D#', 'F#', 'A', 'C#'], positions: [
        { frets: [-1, 2, 4, 2, 5, 2], root: 1 }
    ]},

    // 11th chords
    'C11': { type: '11', intervals: [0, 4, 7, 10, 2, 5], notes: ['C', 'E', 'G', 'Bb', 'D', 'F'], positions: [
        { frets: [-1, 3, 0, 0, 3, 0], root: 5 }
    ]},
    'D11': { type: '11', intervals: [2, 6, 9, 0, 4, 7], notes: ['D', 'F#', 'A', 'C', 'E', 'G'], positions: [
        { frets: [-1, -1, 0, 2, 2, 2], root: 2 }
    ]},
    'E11': { type: '11', intervals: [4, 8, 11, 2, 6, 9], notes: ['E', 'G#', 'B', 'D', 'F#', 'A'], positions: [
        { frets: [0, 0, 0, 2, 0, 0], root: 0 }
    ]},
    'F11': { type: '11', intervals: [5, 9, 0, 3, 7, 10], notes: ['F', 'A', 'C', 'Eb', 'G', 'Bb'], positions: [
        { frets: [1, 1, 0, 3, 0, 0], root: 0 }
    ]},
    'G11': { type: '11', intervals: [7, 11, 2, 5, 9, 0], notes: ['G', 'B', 'D', 'F', 'A', 'C'], positions: [
        { frets: [3, 0, 0, 0, 0, 0], root: 0 }
    ]},
    'A11': { type: '11', intervals: [9, 1, 4, 7, 11, 2], notes: ['A', 'C#', 'E', 'G', 'B', 'D'], positions: [
        { frets: [5, 0, 0, 6, 5, 0], root: 0 }
    ]},
    'B11': { type: '11', intervals: [11, 3, 6, 9, 1, 4], notes: ['B', 'D#', 'F#', 'A', 'C#', 'E'], positions: [
        { frets: [-1, 2, 0, 4, 4, 2], root: 1 }
    ]},

    // 13th chords
    'C13': { type: '13', intervals: [0, 4, 7, 10, 2, 5, 9], notes: ['C', 'E', 'G', 'Bb', 'D', 'F', 'A'], positions: [
        { frets: [-1, 3, 0, 0, 0, 0], root: 5 }
    ]},
    'D13': { type: '13', intervals: [2, 6, 9, 0, 4, 7, 11], notes: ['D', 'F#', 'A', 'C', 'E', 'G', 'B'], positions: [
        { frets: [-1, -1, 0, 2, 2, 0], root: 2 }
    ]},
    'E13': { type: '13', intervals: [4, 8, 11, 2, 6, 9, 1], notes: ['E', 'G#', 'B', 'D', 'F#', 'A', 'C#'], positions: [
        { frets: [0, 2, 0, 2, 2, 2], root: 0 }
    ]},
    'F13': { type: '13', intervals: [5, 9, 0, 3, 7, 10, 2], notes: ['F', 'A', 'C', 'Eb', 'G', 'Bb', 'D'], positions: [
        { frets: [1, 3, 0, 4, 0, 0], root: 0 }
    ]},
    'G13': { type: '13', intervals: [7, 11, 2, 5, 9, 0, 4], notes: ['G', 'B', 'D', 'F', 'A', 'C', 'E'], positions: [
        { frets: [3, 0, 0, 0, 0, 1], root: 0 }
    ]},
    'A13': { type: '13', intervals: [9, 1, 4, 7, 11, 2, 6], notes: ['A', 'C#', 'E', 'G', 'B', 'D', 'F#'], positions: [
        { frets: [5, 0, 0, 0, 0, 0], root: 0 }
    ]},
    'B13': { type: '13', intervals: [11, 3, 6, 9, 1, 4, 8], notes: ['B', 'D#', 'F#', 'A', 'C#', 'E', 'G#'], positions: [
        { frets: [-1, 2, 0, 4, 4, 0], root: 1 }
    ]}
};

// Note names and interval utilities are now in utils.js
// NOTE_NAMES, FLAT_NAMES, and intervalName() are imported from utils.js

// Build a lookup index for finding all voicings of a chord by its notes
// This indexes chords by their note sets for quick voicing lookup
function buildVoicingLookup() {
    const lookup = {};
    for (const [chordName, chordData] of Object.entries(CHORD_DICTIONARY)) {
        const noteSet = chordData.notes.sort().join(',');
        if (!lookup[noteSet]) {
            lookup[noteSet] = [];
        }
        lookup[noteSet].push({
            chordName,
            type: chordData.type,
            notes: chordData.notes,
            intervals: chordData.intervals
        });
    }
    return lookup;
}

const VOICING_LOOKUP = buildVoicingLookup();

// Find all chord voicings by notes
function findAllVoicingsByNotes(notes) {
    const sortedNotes = [...notes].sort();
    const noteKey = sortedNotes.join(',');
    return VOICING_LOOKUP[noteKey] || [];
}

