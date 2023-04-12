import { Select } from '@cogoport/components';
import React from 'react';

/* eslint-disable */
import countries from '../../../../../.data-store/constants/countries.json';

function SelectCountryCode(props) { 
	const { optionValueKey = 'mobile_country_code' } = props;
	
	const formattedList = countries.map((code) => ({
		value : code[optionValueKey],
		label : optionValueKey === 'mobile_country_code' ? `${code.mobile_country_code}: ${code.name}` : code.name,
	}));
	
	return (
		<Select {...props} options={formattedList} />
	);
}


export default SelectCountryCode;