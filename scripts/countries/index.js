require('@cogo/dotenv')();

const fs = require('fs-extra');
const path = require('path');
const getCountries = require('./getCountries');

const setCountries = () => {
	const dirPath = path.resolve(
		process.cwd(),
		'..',
		'build-scripts/temp/constants',
	);
	const countriesPath = path.resolve(dirPath, 'countries.json');
	try {
		fs.mkdirSync(dirPath, { recursive: true });
	} catch (err) {
		console.log("Can't make folder");
		console.log(err);
	}
	console.log('Building Countries ...');
	getCountries(fs.writeFileSync, countriesPath, 'https://api.cogoport.com');
};

module.exports = setCountries;
