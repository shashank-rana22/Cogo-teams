// eslint-disable-next-line import/no-relative-packages
import countries from '../../../.data-store/constants/countries.json';

const countriesHash = countries.reduce(
	(pv, acc) => ({ ...pv, [acc.id]: acc }),
	{},
);

const getCountryDetails = ({ country_id }) => countriesHash[country_id] || {};

// export const getCountryCode = ({ country_id }) => {
// 	return getCountryDetails({ country_id }).country_code || null;
// };

export default getCountryDetails;
