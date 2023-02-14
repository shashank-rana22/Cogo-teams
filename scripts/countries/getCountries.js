const https = require('https');
const sortBy = require('lodash/sortBy');

const MAIN_COUNTRY_CODES = ['IN', 'NL'];

const getCountries = async (callBack, path, baseUrl) => {
	const actualUrl = `${baseUrl}/location/list_locations?filters%5Btype%5D%5B%5D=country&filters%5Bstatus%5D=active&page_limit=500`;

	https
		.get(actualUrl, (resp) => {
			let data = '';

			resp.on('data', (chunk) => {
				data += chunk;
			});

			resp.on('end', () => {
				const { list } = JSON.parse(data);

				const finalList = sortBy(list, [
					(o) => (MAIN_COUNTRY_CODES.includes(o.country_code) ? 0 : 1),
					'name',
				]);

				callBack(path, JSON.stringify(finalList));
			});
		})
		.on('error', (err) => {
			console.log(`Error in getCountries func: ${err.message}`);
			console.log('retry get countries');
			getCountries(callBack, path, process.env.REST_BASE_API_URL);
		});
};

module.exports = getCountries;
