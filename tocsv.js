const fs = require('fs');
const path = require('path');

// Directory where photos are stored
const photoDir = path.join(__dirname, 'PHOTOS');

// Function to process the files
function processPhotos() {
    const data = [];
    // CSV header
    data.push(['intersection1', 'intersection2', 'Address', 'Year', 'Month', 'Direction', 'Coordinates', 'Intersection ID', 'Filename']);

    // Read all files in the PHOTOS directory
    const files = fs.readdirSync(photoDir);

    files.forEach(file => {
        if (file.endsWith('.jpg')) {
            // Remove the .jpg extension
            const nameWithoutExt = file.slice(0, -4);
            // Split by ~
            const parts = nameWithoutExt.split('~');

            if (parts.length === 6) {
                const [intersection, address, date, direction, coords, intersectionId] = parts;
                // Extract just the number from 'id-XX'
                const idNumber = intersectionId.replace('id-', '');

                const [year, month] = date.split('-');

                const [intersection1, intersection2] = intersection.split('&');

                // Add to data array
                data.push([
                    intersection1,
                    intersection2,
                    address,
                    year,
                    month,
                    direction,
                    coords,
                    idNumber,
                    file
                ]);
            }
        }
    });

    // Convert to CSV string
    const csv = data.map(row => row.map(item => `"${item}"`).join(',')).join('\n');

    // Write to file
    fs.writeFileSync('photo_data.csv', csv);
    console.log('CSV file created successfully!');
}

// Run the process
try {
    processPhotos();
} catch (error) {
    console.error('Error processing photos:', error);
}
