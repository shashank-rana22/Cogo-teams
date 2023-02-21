const path = require('path');

const fs = require('fs-extra');

const getCountries = require('./getCountries');

const setCountries = async () => {
	const dirPath = path.resolve(process.cwd(), '.data-store/constants');
	const countriesPath = path.resolve(dirPath, 'countries.json');
	try {
		fs.mkdirSync(dirPath, { recursive: true });
	} catch (err) {
		console.log("Can't make Countries folder");
		console.log(err);
	}
	console.log('Building Countries ...');
	await getCountries(
		fs.writeFileSync,
		countriesPath,
		'https://api.cogoport.com/',
	);
	console.log('Successfully Built Countries ...');
};

module.exports = setCountries;
