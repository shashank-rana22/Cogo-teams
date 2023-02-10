import { Select } from '@cogoport/components';
import React from 'react';

import countryCode from '../../constants/country-codes.json';

function SelectCountryCode(props) {
	const { value } = props;
	const formattedList = countryCode.map((code) => ({
		value : code.value,
		label : `${code.value}: ${code.label}`,
	}));
	return (
		<Select {...props} options={formattedList} value={value} readOnly={false} />
	);
}

SelectCountryCode.defaultProps = {
	value    : '',
	onChange : () => {},
	multiple : false,
};

export default SelectCountryCode;
