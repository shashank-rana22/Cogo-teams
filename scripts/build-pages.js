const fs = require('fs-extra');

const excludePackages = ['authentication'];

const getDirectories = (source) => fs.readdirSync(source, { withFileTypes: true })
	.filter((dirent) => dirent.isDirectory())
	.map((dirent) => dirent.name);

const createPages = async () => {
	const cwd = process.cwd();
	const appPath = `${cwd}/cogo-control/pages/[partner_id]`;
	const rootPath = `${cwd}/cogo-control/pages/`;
	const packageRootPath = `${cwd}/packages`;

	if (fs.existsSync(appPath)) {
		fs.rmdirSync(appPath, { recursive: true });
		fs.mkdirSync(appPath);
	} else {
		fs.mkdirSync(appPath);
	}

	const allFolders = getDirectories(packageRootPath);

	allFolders.forEach((packageFolder) => {
		const pagesPath = `${packageRootPath}/${packageFolder}/pages`;

		if (fs.existsSync(pagesPath) && excludePackages.includes(packageFolder)) {
			fs.copySync(pagesPath, rootPath, { recursive: true });
		} else if (fs.existsSync(pagesPath)) {
			fs.copySync(pagesPath, appPath, { recursive: true });
		} else {
			// console.log(`${pagesPath} does not exists`);
		}
	});
};

createPages();
