// eslint-disable-next-line
import countries from '@/data-store/constants/countries.json';

const IGNORE_PLUS = 1;
export const getMobilePrefixFromCountryCode = ({ countryCode = 'IN' }) => {
	const requiredCountry = countries.find(({ country_code }) => country_code === countryCode);
	return requiredCountry?.mobile_country_code?.substr(IGNORE_PLUS) || '';
};
