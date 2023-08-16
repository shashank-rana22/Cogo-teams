const path = require('path');

const fs = require('fs-extra');

const getCountries = require('./getCountries');

const setCountries = async () => {
	const dirPath = path.resolve(process.cwd(), '.data-store/constants');
	const countriesPath = path.resolve(dirPath, 'countries.json');
	try {
		fs.mkdirSync(dirPath, { recursive: true });
	} catch (err) {
		// eslint-disable-next-line no-console
		console.log("Can't make Countries folder");
	}
	// console.log('Building Countries ...');
	await getCountries(
		fs.writeFileSync,
		countriesPath,
		process.env.NEXT_PUBLIC_REST_BASE_API_URL,
	);
	// eslint-disable-next-line no-console
	console.log('Successfully Built Countries ...');
};

module.exports = setCountries;
