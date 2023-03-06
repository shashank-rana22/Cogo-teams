import { Input } from '@cogoport/components';
import React from 'react';

import SelectCountryCode from '../SelectCountryCode';

import styles from './styles.module.css';

function SelectMobileNumber({
	value = {},
	onChange,
	codeKey = 'country_code',
	numberKey = 'number',
	width,
	id = 'select_phone',
	inputType = 'text',
	type = 'text',
	disable_country_code = false,
	...rest
}) {
	const { [codeKey]: country_code = '', [numberKey]: number = '' } =	value || {};

	const handleCodeChange = (v) => {
		onChange({ ...(value || {}), [codeKey]: v });
	};

	const handleNumberChange = (e) => {
		onChange({ ...(value || {}), [numberKey]: e });
	};

	return (
		<div className={styles.row_container} style={width ? { width: '104%' } : {}}>
			<div className={styles.country_code} style={{ paddingRight: 0 }}>
				<SelectCountryCode
					{...rest}
					value={country_code || (value || {})[codeKey]}
					onChange={handleCodeChange}
					placeholder="Select"
					showMessage={false}
					disabled={disable_country_code}
					inputId={`${id || ''}_${codeKey || 'country_code'}`}
				/>
			</div>

			<div className={styles.mobile_number}>
				<Input
					{...rest}
					width="100%"
					id={`${id || ''}_${numberKey || 'number'}`}
					name="mobile_number"
					type={inputType || type}
					value={number || (value || {})[numberKey]}
					onChange={handleNumberChange}
				/>
			</div>
		</div>
	);
}

export default SelectMobileNumber;
