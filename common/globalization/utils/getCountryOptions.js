import getGeoConstants from '../constants/geo';

import getCountryDetails from './getCountryDetails';

// eslint-disable-next-line import/no-unresolved
import countries from '@/data-store/constants/countries.json';

const getCountryOptions = () => {
	const geo = getGeoConstants();

	const { country } = geo || {};

	const { code } = country || {};

	const defaultOption = getCountryDetails({ country_code: code });

	const { name, id } = defaultOption || {};

	const countryOptions = [
		{
			label : name,
			value : id,
		},
	];

	countries.forEach((item) => {
		if (item.country_code !== code) {
			const option = {
				label : item.name,
				value : item.id,
			};
			countryOptions.push(option);
		}
	});

	return countryOptions;
};

export default getCountryOptions;
