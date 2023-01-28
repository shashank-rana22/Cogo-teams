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
	const bfPackageRootPath = `${cwd}/packages/business-finance`;

	if (!fs.existsSync(appPath)) {
		fs.mkdirSync(appPath);
	}

	const allFolders = getDirectories(packageRootPath);

	const businessFinanceFolders = getDirectories(bfPackageRootPath);

	const buildPages = (directory, packagerootpath) => {
		directory.forEach((packageFolder) => {
			const pagesPath = `${packagerootpath}/${packageFolder}/pages`;

			if (fs.existsSync(pagesPath) && excludePackages.includes(packageFolder)) {
				fs.copySync(pagesPath, rootPath, { recursive: true });
			} else if (fs.existsSync(pagesPath)) {
				fs.copySync(pagesPath, appPath, { recursive: true });
			} else {
				// console.log(`${pagesPath} does not exists`);
			}
		});
	};
	// making pages
	buildPages(allFolders, packageRootPath);
	// making pages for business finance
	buildPages(businessFinanceFolders, bfPackageRootPath);
};

createPages();
