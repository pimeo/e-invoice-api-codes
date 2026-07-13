import fs from 'node:fs';
import path from 'node:path';

function split() {
    // --- Configuration ---
    const inputFile = './data/peppol/en/unecerec20_3.0_1125.json'; // The file you want to split
    const outputDir = './split_json_files';       // Folder where the parts will be saved
    const chunkSize = 100;                         // Number of items per file. 50 is a safe size for translations.

    // Create the output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    try {
        // Read and parse the original JSON file
        console.log(`Reading ${inputFile}...`);
        const rawData = fs.readFileSync(inputFile, 'utf8');
        const data = JSON.parse(rawData);

        // Verify it's an array
        if (!Array.isArray(data)) {
            console.error('Error: The JSON file does not contain a root array.');
            process.exit(1);
        }

        console.log(`Successfully loaded ${data.length} items. Splitting into chunks of ${chunkSize}...`);

        // Loop through the array and slice it into chunks
        let fileIndex = 1;
        for (let i = 0; i < data.length; i += chunkSize) {
            const chunk = data.slice(i, i + chunkSize);

            // Format the filename (e.g., part_1.json, part_2.json)
            const outputFilename = path.join(outputDir, `part_${fileIndex}.json`);

            // Write the chunk to a new file, nicely formatted with 4 spaces
            fs.writeFileSync(outputFilename, JSON.stringify(chunk, null, 4), 'utf8');
            console.log(`Created ${outputFilename} with ${chunk.length} items.`);

            fileIndex++;
        }

        console.log('\n✅ Splitting complete! You can now feed me these files one by one.');

    } catch (error) {
        console.error('An error occurred:', error.message);
    }

}

function reassemble() {
    const outputFile = './data/peppol/fr/unecerec20_3.0_1125.json'; // The output file you want to save results
    const outputDir = './split_json_files';       // Folder where the parts will be located
    const parts = 22;

    try {
        let items = [];
        for (let i = 1; i <= parts; i ++) {
            const rawData = fs.readFileSync(`${outputDir}/part_${i}.json`, 'utf8');
            const data = JSON.parse(rawData);

            if (!Array.isArray(data)) {
                console.error('Error: The JSON file does not contain a root array.');
                process.exit(1);
            }

            console.log(`Successfully loaded ${data.length} items from part ${i}.`);

            items = [].concat(items, data)
        }

        fs.writeFileSync(outputFile, JSON.stringify(items, null, 4), 'utf8');

        console.log('\n✅ Reassembling complete!');


    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

// split()
// reassemble()
