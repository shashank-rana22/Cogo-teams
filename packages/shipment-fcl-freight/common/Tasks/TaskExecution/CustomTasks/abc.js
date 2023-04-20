const fs = require('fs');
const path = require('path');
const readline = require('readline');

function matchesPattern(str) {
	const pattern = /^\.[a-zA-Z]+{$/;
	return pattern.test(str);
}

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
	'/Users/rajkamalsingh/Desktop/COGOPORT/cogo-admin/packages/shipment-fcl-freight/common/Tasks/TaskExecution/CustomTasks',
	(filePath) => {
		if (filePath.includes('styles.js')) {
			try {
				// Read the contents of the file synchronously
				const data = fs.readFileSync(filePath, 'utf8');

				// Find and replace text
				let updatedData = data.replaceAll(
					"import styled from '@cogoport/front/styled';",
					'',
				);
				updatedData = updatedData.replaceAll('export const ', '.');
				updatedData = updatedData.replaceAll(' = styled.div`', '{');
				updatedData = updatedData.replaceAll('= styled(Skeleton)`', '{');
				updatedData = updatedData.replaceAll('`', '}');

				const readInterface = readline.createInterface({
					input   : fs.createReadStream(filePath),
					output  : process.stdout,
					console : false,
				});

				readInterface.on('line', (line) => {
					if (matchesPattern(line)) {
						console.log('Line', line);
					}
				});

				// Write the updated contents back to the file
				fs.writeFileSync(filePath, updatedData, 'utf8');

				const newFilePath = filePath.replaceAll(
					'styles.js',
					'styles.module.css',
				);
				fs.renameSync(filePath, newFilePath);
			} catch (err) {
				console.error(err);
			}
		}

		// Output the file path in a specific format
		// e.g. console.log(`File: ${filePath}`);
	},
);
