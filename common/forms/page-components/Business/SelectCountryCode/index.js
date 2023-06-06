import { Select } from '@cogoport/components';
import React from 'react';

/* eslint-disable */
import countries from '../../../../../.data-store/constants/countries.json';

function SelectCountryCode(props) { 
	const { optionValueKey = 'mobile_country_code' } = props;

	const formattedList = countries.reduce((result, country) => {
		if (country.country_code === 'IN') {
		  result.unshift({
			value: country[optionValueKey],
			label: optionValueKey === 'mobile_country_code' ? `${country.mobile_country_code}: ${country.name}` : country.name,
		  });
		} else {
		  result.push({
			value: country[optionValueKey],
			label: optionValueKey === 'mobile_country_code' ? `${country.mobile_country_code}: ${country.name}` : country.name,
		  });
		}
		return result;
	  }, []);

	
	return (
		<Select {...props} options={formattedList} />
	);
}


export default SelectCountryCode;