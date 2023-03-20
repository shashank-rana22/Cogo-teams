// eslint-disable-next-line import/no-unresolved
import countries from '@/data-store/constants/countries.json';

const getCountryOptions = () => {
	const indiaOption = countries.find((country) => country.country_code === 'IN');

	const countryOptions = [{
		label : indiaOption?.name,
		value : indiaOption?.id,
	}];

	countries.filter((country) => country.country_code !== 'IN').forEach((country) => {
		const option = { label: country.name, value: country.id };

		countryOptions.push(option);
	});

	return countryOptions;
};

export default getCountryOptions;
