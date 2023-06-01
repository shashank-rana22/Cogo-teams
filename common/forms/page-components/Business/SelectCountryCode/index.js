import { Select } from '@cogoport/components';
import React from 'react';

/* eslint-disable */
import countries from '../../../../../.data-store/constants/countries.json';

function SelectCountryCode(props) { 
	const { optionValueKey = 'mobile_country_code' } = props;

	// const indiaOption = countries.find((country) => country.country_code === 'IN');

	// const formattedList = [{
	// 	value : indiaOption[optionValueKey],
	// 	label : optionValueKey === 'mobile_country_code' ? `${indiaOption.mobile_country_code}: ${indiaOption.name}` : code.name,
	// }];

	// countries.filter((country) => country.country_code !== 'IN').map((code) => {
	// 	const option = { value : code[optionValueKey],
	// 		label : optionValueKey === 'mobile_country_code' ? `${code.mobile_country_code}: ${code.name}` : code.name, };

	// 		formattedList.push(option);

	// 	return formattedList;
	// });

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