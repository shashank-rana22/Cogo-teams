import { countriesHash, countrieCodeHash } from './getCountriesHash';

const getCountryDetails = ({ country_id, country_code }) => {
	const countryDetails = countriesHash[country_id] || countrieCodeHash[country_code] || {};

	if (country_id && country_code) {
		return countryDetails.country_code === country_code ? countryDetails : {};
	}

	return countryDetails;
};

export default getCountryDetails;
