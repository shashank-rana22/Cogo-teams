const { buildCountries } = require('./pre-builds');

const buildApp = async () => {
	await buildCountries();
};

buildApp();
