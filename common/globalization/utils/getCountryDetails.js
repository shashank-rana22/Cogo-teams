/* eslint-disable max-len */
// eslint-disable-next-line
import countries from '@/data-store/constants/countries.json';

const countriesHash = countries.reduce(
	(pv, acc) => ({ ...pv, [acc.id]: acc }),
	{},
);

export const getCountryId = (countryCode = '') => countries.find(({ country_code }) => country_code === countryCode)?.id;

const getCountryDetails = ({ country_id }) => countriesHash[country_id] || {};

export default getCountryDetails;
