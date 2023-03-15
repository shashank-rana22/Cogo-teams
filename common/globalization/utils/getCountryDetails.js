// eslint-disable-next-line import/no-unresolved
import COUNTRIES from '@cogo/build-scripts/temp/constants/countries.json';

const countriesHash = COUNTRIES.reduce(
	(pv, acc) => ({ ...pv, [acc.id]: acc }),
	{},
);

const getCountryDetails = ({ country_id }) => countriesHash[country_id] || {};

// export const getCountryCode = ({ country_id }) => {
// 	return getCountryDetails({ country_id }).country_code || null;
// };

export default getCountryDetails;
