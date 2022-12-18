const fs = require('fs-extra');

const getDirectories = (source) => fs.readdirSync(source, { withFileTypes: true })
	.filter((dirent) => dirent.isDirectory())
	.map((dirent) => dirent.name);

const createPages = async () => {
	const cwd = process.cwd();
	const appPath = `${cwd}/cogo-control/pages`;
	const packageRootPath = `${cwd}/packages`;

	if (!fs.existsSync(appPath)) {
		fs.mkdirSync(appPath);
	}

	const allFolders = getDirectories(packageRootPath);

	allFolders.forEach((packageFolder) => {
		const pagesPath = `${packageRootPath}/${packageFolder}/pages`;

		if (fs.existsSync(pagesPath)) {
			console.log(`Creating Pages from ${packageFolder}`);
			fs.copySync(pagesPath, appPath, { recursive: true });
		} else {
			console.log(`${pagesPath} does not exists`);
		}
	});
};

createPages();
