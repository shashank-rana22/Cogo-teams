// eslint-disable-next-line import/no-unresolved
import COUNTRIES from '@/data-store/constants/countries.json';

const countriesHash = COUNTRIES.reduce(
	(pv, acc) => ({ ...pv, [acc.id]: acc }),
	{},
);

const getCountryDetails = ({ country_id }) => countriesHash[country_id] || {};

export default getCountryDetails;
