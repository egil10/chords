// Build script to generate dictionary and convert to website format
const fs = require('fs');
const path = require('path');
const { generateDictionary } = require('./generate-dictionary.js');

console.log('🎸 Generating comprehensive chord dictionary...\n');

// Generate the dictionary
const dictionary = generateDictionary();

// Calculate statistics
let totalChords = 0;
let totalVoicings = 0;
const chordTypes = {};

Object.keys(dictionary).forEach(chordKey => {
    totalChords++;
    const chord = dictionary[chordKey];
    if (chord.positions) {
        totalVoicings += chord.positions.length;
    }
    if (chord.type) {
        chordTypes[chord.type] = (chordTypes[chord.type] || 0) + 1;
    }
});

console.log('📊 Statistics:');
console.log(`   Total chords: ${totalChords}`);
console.log(`   Total voicings: ${totalVoicings}`);
console.log(`   Average voicings per chord: ${(totalVoicings / totalChords).toFixed(2)}`);
console.log('\n📋 Chord types:');
Object.entries(chordTypes).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
    console.log(`   ${type}: ${count}`);
});

// Save JSON version (for reference)
const jsonPath = path.join(__dirname, 'chord-dictionary.json');
const jsonOutput = JSON.stringify(dictionary, null, 2);
fs.writeFileSync(jsonPath, jsonOutput, 'utf8');
console.log(`\n✅ JSON dictionary saved: ${jsonPath}`);

// Convert to JavaScript format for website
console.log('\n📝 Converting to website JavaScript format...');

// Format a single chord entry
function formatChordEntry(chordKey, chordData) {
    const indent = '    ';
    let output = `${indent}'${chordKey}': {\n`;
    output += `${indent}    type: '${chordData.type}',\n`;
    
    if (chordData.intervals && chordData.intervals.length > 0) {
        output += `${indent}    intervals: [${chordData.intervals.join(', ')}],\n`;
    }
    
    if (chordData.notes && chordData.notes.length > 0) {
        output += `${indent}    notes: [${chordData.notes.map(n => `'${n}'`).join(', ')}],\n`;
    }
    
    if (chordData.positions && chordData.positions.length > 0) {
        output += `${indent}    positions: [\n`;
        chordData.positions.forEach((pos, idx) => {
            output += `${indent}        { frets: [${pos.frets.join(', ')}]`;
            if (pos.root !== undefined) {
                output += `, root: ${pos.root}`;
            }
            if (pos.bass) {
                output += `, bass: '${pos.bass}'`;
            }
            if (pos.bassString !== undefined) {
                output += `, bassString: ${pos.bassString}`;
            }
            if (pos.isSlash) {
                output += `, isSlash: true`;
            }
            output += ` }`;
            if (idx < chordData.positions.length - 1) output += ',';
            output += '\n';
        });
        output += `${indent}    ]\n`;
    }
    
    output += `${indent}}`;
    return output;
}

// Build the JavaScript file
let jsOutput = '// Complete guitar chord dictionary (generated automatically)\n';
jsOutput += '// Do not edit manually - run "node guitar-engine/build-dictionary.js" to regenerate\n\n';
jsOutput += 'const CHORD_DICTIONARY = {\n';

// Sort chords for consistent output
const sortedChordKeys = Object.keys(dictionary).sort((a, b) => {
    // Sort by: major first, then minor, then extensions, then slash chords
    const aIsSlash = a.includes('/');
    const bIsSlash = b.includes('/');
    if (aIsSlash && !bIsSlash) return 1;
    if (!aIsSlash && bIsSlash) return -1;
    
    // Sort alphabetically within groups
    return a.localeCompare(b);
});

sortedChordKeys.forEach((chordKey, idx) => {
    const chordData = dictionary[chordKey];
    jsOutput += formatChordEntry(chordKey, chordData);
    if (idx < sortedChordKeys.length - 1) {
        jsOutput += ',';
    }
    jsOutput += '\n';
});

jsOutput += '};\n\n';
jsOutput += '// Export CHORD_DICTIONARY to global scope for use in app.js\n';
jsOutput += 'window.CHORD_DICTIONARY = CHORD_DICTIONARY;\n';

// Write to website's js directory
const jsPath = path.join(__dirname, '..', 'js', 'chord-dictionary.js');
fs.writeFileSync(jsPath, jsOutput, 'utf8');
console.log(`✅ JavaScript dictionary saved: ${jsPath}`);

console.log('\n🎉 Dictionary build complete!');
console.log(`   The website now has access to ${totalChords} chords with ${totalVoicings} total voicings.\n`);
