// Quick test script
const { generateDictionary } = require('./generate-dictionary.js');
const fs = require('fs');
const path = require('path');

console.log('Starting dictionary generation...');
try {
    const dictionary = generateDictionary();
    console.log('Dictionary generated successfully!');
    console.log('Total chords:', Object.keys(dictionary).length);
    
    // Show sample
    console.log('\nSample chords:');
    const sampleKeys = Object.keys(dictionary).slice(0, 5);
    sampleKeys.forEach(key => {
        console.log(`  ${key}:`, dictionary[key].type, '-', dictionary[key].positions.length, 'positions');
    });
    
    // Write file
    const outputPath = path.join(__dirname, 'chord-dictionary.json');
    fs.writeFileSync(outputPath, JSON.stringify(dictionary, null, 2), 'utf8');
    console.log('\nFile written to:', outputPath);
    
    let totalVoicings = 0;
    Object.values(dictionary).forEach(chord => {
        if (chord.positions) {
            totalVoicings += chord.positions.length;
        }
    });
    console.log('Total voicings:', totalVoicings);
} catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
    process.exit(1);
}