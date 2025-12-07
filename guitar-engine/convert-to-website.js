// Convert generated dictionary JSON to website JavaScript format
const fs = require('fs');
const path = require('path');
const { generateDictionary } = require('./generate-dictionary.js');

console.log('🔄 Generating and converting dictionary for website...\n');

try {
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
    
    console.log('📊 Generated Dictionary Statistics:');
    console.log(`   Total chords: ${totalChords}`);
    console.log(`   Total voicings: ${totalVoicings}`);
    console.log(`   Average voicings per chord: ${(totalVoicings / totalChords).toFixed(2)}`);
    
    // Save JSON version first
    const jsonPath = path.join(__dirname, 'chord-dictionary.json');
    fs.writeFileSync(jsonPath, JSON.stringify(dictionary, null, 2), 'utf8');
    console.log(`\n✅ JSON saved: ${jsonPath}`);
    
    // Convert to JavaScript format matching the website structure
    console.log('\n📝 Converting to website JavaScript format...');
    
    let jsContent = '// Complete guitar chord dictionary (generated automatically)\n';
    jsContent += '// Do not edit manually - run "node guitar-engine/convert-to-website.js" to regenerate\n';
    jsContent += '// Generated on: ' + new Date().toISOString() + '\n\n';
    jsContent += 'const CHORD_DICTIONARY = {\n';
    
    // Sort chords: regular chords first, then slash chords
    const sortedKeys = Object.keys(dictionary).sort((a, b) => {
        const aIsSlash = a.includes('/');
        const bIsSlash = b.includes('/');
        if (aIsSlash && !bIsSlash) return 1;
        if (!aIsSlash && bIsSlash) return -1;
        return a.localeCompare(b);
    });
    
    sortedKeys.forEach((chordKey, idx) => {
        const chord = dictionary[chordKey];
        const indent = '    ';
        const isLast = idx === sortedKeys.length - 1;
        
        // Escape single quotes in chord key
        const safeKey = chordKey.replace(/'/g, "\\'");
        
        jsContent += `${indent}'${safeKey}': {\n`;
        jsContent += `${indent}    type: '${chord.type}',\n`;
        
        // Add intervals if present
        if (chord.intervals && chord.intervals.length > 0) {
            jsContent += `${indent}    intervals: [${chord.intervals.join(', ')}],\n`;
        }
        
        // Add notes
        if (chord.notes && chord.notes.length > 0) {
            jsContent += `${indent}    notes: [${chord.notes.map(n => `'${n.replace(/'/g, "\\'")}'`).join(', ')}],\n`;
        }
        
        // Add positions
        if (chord.positions && chord.positions.length > 0) {
            jsContent += `${indent}    positions: [\n`;
            chord.positions.forEach((pos, posIdx) => {
                jsContent += `${indent}        { frets: [${pos.frets.join(', ')}]`;
                
                // Add root if present
                if (pos.root !== undefined && pos.root !== null) {
                    jsContent += `, root: ${pos.root}`;
                }
                
                // Add bass info for slash chords
                if (pos.bass) {
                    jsContent += `, bass: '${pos.bass}'`;
                }
                if (pos.bassString !== undefined && pos.bassString !== null) {
                    jsContent += `, bassString: ${pos.bassString}`;
                }
                if (pos.isSlash) {
                    jsContent += `, isSlash: true`;
                }
                
                jsContent += ' }';
                if (posIdx < chord.positions.length - 1) {
                    jsContent += ',';
                }
                jsContent += '\n';
            });
            jsContent += `${indent}    ]\n`;
        }
        
        jsContent += `${indent}}`;
        if (!isLast) {
            jsContent += ',';
        }
        jsContent += '\n';
    });
    
    jsContent += '};\n\n';
    jsContent += '// Note names and interval utilities are now in utils.js\n';
    jsContent += '// NOTE_NAMES, FLAT_NAMES, and intervalName() are imported from utils.js\n\n';
    jsContent += '// Export CHORD_DICTIONARY to global scope for use in app.js\n';
    jsContent += 'window.CHORD_DICTIONARY = CHORD_DICTIONARY;\n';
    
    // Write to website's js directory
    const jsPath = path.join(__dirname, '..', 'js', 'chord-dictionary.js');
    fs.writeFileSync(jsPath, jsContent, 'utf8');
    
    console.log(`✅ JavaScript dictionary saved: ${jsPath}`);
    console.log(`\n🎉 Conversion complete!`);
    console.log(`   The website now has access to ${totalChords} chords with ${totalVoicings} total voicings.`);
    console.log(`\n📋 Chord type breakdown:`);
    Object.entries(chordTypes).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
        console.log(`   ${type}: ${count} chords`);
    });
    console.log('');
    
} catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
}
