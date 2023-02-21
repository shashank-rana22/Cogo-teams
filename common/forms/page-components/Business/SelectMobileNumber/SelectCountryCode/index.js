import { Select } from '@cogoport/components';
// eslint-disable-next-line import/no-unresolved
import countries from 'cogo-admin/.data-store/constants/countries.json';
import React from 'react';

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
