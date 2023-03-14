const fs = require('fs');
const path = require('path');

function toSnakeCase(str) {
	// Use a regular expression to replace spaces and uppercase letters with underscores and lowercase letters
	const snakeCaseString = str.replace(/[\sA-Z]/g, (match) => {
		if (match === ' ') {
			return '_';
		}
		return `_${match.toLowerCase()}`;
	});

	// Remove any leading or trailing underscores
	return snakeCaseString.replace(/^_+|_+$/g, '');
}
const pattern = /^\.[a-zA-Z]+{$/

function readDirRecursively(dir, fileCallback) {
	fs.readdirSync(dir).forEach((file) => {
		const filePath = path.join(dir, file);
		if (fs.statSync(filePath).isDirectory()) {
			readDirRecursively(filePath, fileCallback);
		} else {
			fileCallback(filePath);
		}
	});
}

// Example usage:
readDirRecursively(
	'/Users/rajkamalsingh/Desktop/COGOPORT/cogo-admin/packages/fcl-freight/page-components/Tabs/TimelineAndTasks',
	(filePath) => {
		if (filePath.includes('styles.module.css')) {
			console.log(filePath);

			try {
				// Read the contents of the file synchronously
       
				const data = fs.readFileSync(filePath, 'utf8');

        let result = []

        let match;
        while ((match = pattern.exec(data)) !== null) {
          results.push(match[0]);
        }
        console.log('results', result);
       
				// Write the updated contents back to the file
				//fs.writeFileSync(filePath, updatedData, 'utf8');
      
			} catch (err) {
				console.error(err);
			}
		}

		// Output the file path in a specific format
		// e.g. console.log(`File: ${filePath}`);
	},
);
