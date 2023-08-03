import { Select } from '@cogoport/components';
import React from 'react';

// eslint-disable-next-line import/no-unresolved
import countries from '@/data-store/constants/countries.json';

function SelectCountryCode(props) {
	const { optionValueKey = 'mobile_country_code' } = props;

	const formattedList = countries.reduce((result, country) => {
		const obj = {
			value: country[optionValueKey],
			label:
        optionValueKey === 'mobile_country_code' ? `${country.mobile_country_code}: ${country.name}` : country.name,
		};

		if (country.country_code === 'IN') {
			result.unshift(obj);
		} else {
			result.push(obj);
		}

		return result;
	}, []);

	return <Select {...props} options={formattedList} />;
}

export default SelectCountryCode;
