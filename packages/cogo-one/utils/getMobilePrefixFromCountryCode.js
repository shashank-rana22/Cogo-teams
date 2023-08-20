import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

// eslint-disable-next-line
import countries from '@/data-store/constants/countries.json';

const IGNORE_PLUS = 1;
export const getMobilePrefixFromCountryCode = (countryCode = 'IN') => {
	const requiredCountry = countries.filter(({ country_code }) => country_code === countryCode);
	return requiredCountry?.[GLOBAL_CONSTANTS.zeroth_index]?.mobile_country_code?.substr(IGNORE_PLUS) || '';
};
