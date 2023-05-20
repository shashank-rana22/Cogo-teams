/* eslint-disable max-len */
// eslint-disable-next-line
import countries from '@/data-store/constants/countries.json';

const countriesHash = countries.reduce(
	(pv, acc) => ({ ...pv, [acc.id]: acc }),
	{},
);

const countrieCodeHash = countries.reduce(
	(pv, acc) => ({ ...pv, [acc.country_code]: acc }),
	{},
);

const getCountryDetails = ({ country_id, country_code }) => {
	const countryDetails = countriesHash[country_id] || countrieCodeHash[country_code] || {};

	if (country_id && country_code) {
		return countryDetails.country_code === country_code ? countryDetails : {};
	}

	return countryDetails;
};

export default getCountryDetails;
