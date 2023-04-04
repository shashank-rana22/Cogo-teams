import { Select } from '@cogoport/components';
import React from 'react';

/* eslint-disable */
import countries from '../../../../../.data-store/constants/countries.json';

function SelectCountry(props) {
	
	const formattedList = countries.map((country) => ({
		value : country.id,
		label :  country.name,
	}));

	return (
		<Select {...props} options={formattedList} />
	);
}


export default SelectCountry;;