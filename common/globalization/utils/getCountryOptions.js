import getGeoConstants from '../constants/geo';

// eslint-disable-next-line import/no-unresolved
import countries from '@/data-store/constants/countries.json';

const getCountryOptions = () => {
	const geo = getGeoConstants();

	const { country } = geo || {};

	const { code } = country || {};

	const defaultOption = countries.find((item) => item.country_code === code);

	const { name, id } = defaultOption || {};

	const countryOptions = [{
		label : name,
		value : id,
	}];

	countries.filter((item) => item.country_code !== code).forEach((item) => {
		const option = { label: item.name, value: item.id };

		countryOptions.push(option);
	});

	return countryOptions;
};

export default getCountryOptions;
