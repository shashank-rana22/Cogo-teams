// eslint-disable-next-line
import countries from '@/data-store/constants/countries.json';

const countriesHash = countries.reduce(
	(pv, acc) => ({ ...pv, [acc.id]: acc }),
	{},
);

const getCountryDetails = ({ country_id }) => countriesHash[country_id] || {};

export default getCountryDetails;
