import { Select } from '@cogoport/components';
import React from 'react';

/* eslint-disable */
import countries from '../../../../../.data-store/constants/countries.json';

function SelectCountryCode(props) {
	
	const formattedList = countries.map((code) => ({
		value : code.id,
		label : `${code.name}`,
	}));

	return (
		<Select {...props} options={formattedList} />
	);
}


export default SelectCountryCode;