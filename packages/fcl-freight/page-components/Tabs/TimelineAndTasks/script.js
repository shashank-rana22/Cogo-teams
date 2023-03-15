const fs = require('fs');
const path = require('path');



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
		if (filePath.includes('styles.js')) {
			console.log(filePath);

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

				// Write the updated contents back to the file
				//fs.writeFileSync(filePath, updatedData, 'utf8');
        const newFilePath = filePath.replaceAll(
					'styles.js',
					'styles.module.css',
				);
				fs.renameSync(filePath, newFilePath);

				console.log('File updated successfully');
			} catch (err) {
				console.error(err);
			}
		}

		// Output the file path in a specific format
		// e.g. console.log(`File: ${filePath}`);
	},
);
