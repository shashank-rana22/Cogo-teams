const fs = require('fs-extra');

// TODO: We will be moving pages in their respective packages
//  so to move those pages to cogo-control/pages

const getDirectories = (source) => fs.readdirSync(source, { withFileTypes: true })
	.filter((dirent) => dirent.isDirectory())
	.map((dirent) => dirent.name);

const createPages = async () => {
	const cwd = process.cwd();
	const appPath = `${cwd}/admin/pages`;
	const packageRootPath = `${cwd}/packages`;

	if (!fs.existsSync(appPath)) {
		fs.mkdirSync(appPath);
	}

	const allFolders = getDirectories(packageRootPath);

	allFolders.forEach((packageFolder) => {
		const pagesPath = `${packageRootPath}/${packageFolder}/pages`;

		if (fs.existsSync(pagesPath)) {
			console.log(`Creating Pages from ${packageFolder}`);
			fs.cpSync(pagesPath, appPath, { recursive: true });
		}
	});
};

createPages();
