import { Select } from '@cogoport/components';
import React from 'react';

/* eslint-disable */
import countries from '../../../../../.data-store/constants/countries.json';

function SelectMobileCountryCode(props) {
	const formattedList = countries.map((code) => ({
		value : code.mobile_country_code,
		label : `${code.mobile_country_code}: ${code.name}`,
	}));

	return (
		<Select {...props} options={formattedList} />
	);
}


export default SelectMobileCountryCode;
