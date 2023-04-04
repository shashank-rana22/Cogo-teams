// eslint-disable-next-line
import countries from '@/data-store/constants/countries.json';

const options = [];
(countries || []).forEach((country) => {
	if (country.mobile_country_code) {
		options.push({
			label : country.mobile_country_code,
			value : country.mobile_country_code,
		});
	}
});
export default options;
