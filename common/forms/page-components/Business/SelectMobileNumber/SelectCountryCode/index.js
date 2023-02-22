/* eslint-disable import/no-relative-packages */
import { Select } from '@cogoport/components';
import React from 'react';

import countries from '../../../../../../.data-store/constants/countries.json';

function SelectCountryCode(props) {
	const { value } = props;

	const formattedList = countries.map((code) => ({
		value : code.mobile_country_code,
		label : `${code.mobile_country_code}: ${code.name}`,
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
