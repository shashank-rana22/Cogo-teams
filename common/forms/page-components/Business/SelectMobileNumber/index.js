import InputAdmin, { Input } from '@cogoport/components';
import React from 'react';

import SelectCountryCode from './SelectCountryCode';
import styles from './styles.module.css';

function SelectMobileNumber({
	value,
	onChange,
	codeKey,
	numberKey,
	select2,
	width,
	id = 'select_phone',
	inputType = 'text',
	type = 'text',
	disable_country_code = false,
	theme = '',
	...rest
}) {
	const { country_code, number } = value || {};

	const handleCodeChange = (v) => {
		onChange({ ...(value || {}), [codeKey]: v });
	};

	const handleNumberChange = (e) => {
		onChange({ ...(value || {}), [numberKey]: e.target?.value });
	};
	const props = {};
	if (select2 && select2.includes('new')) {
		if (select2.includes('big')) {
			props.style = {
				control: {
					fontSize   : '12px',
					lineHeight : '14px',
					color      : 'black',
					minHeight  : '44px',
				},
				indicatorsContainer : { height: '42px' },
				menu                : {
					width        : '200px',
					background   : 'white',
					boxShadow    : '0 4px 80px rgba(0, 0, 0, 0.15)',
					borderRadius : '10px',
					zIndex       : 99999,
				},
			};
		} else {
			props.style = {
				control: {
					fontSize   : '12px',
					lineHeight : '14px',
					color      : 'black',
					minHeight  : select2.includes('small') ? '30px' : '34px',
				},
				indicatorsContainer: {
					height: select2.includes('small') ? '28px' : '32px',
				},
				menu: {
					width        : '200px',
					background   : 'white',
					boxShadow    : '0 4px 80px rgba(0, 0, 0, 0.15)',
					borderRadius : '10px',
					zIndex       : 99999,
				},
			};
		}
	} else {
		props.style = {
			control: {
				fontSize   : '14px',
				lineHeight : '18px',
				color      : 'black',
				minHeight  : '48px',
			},
			indicatorsContainer : { height: '46px' },
			menu                : { width: '200px' },
		};
	}

	let InputEle = Input;
	let inputStyle = select2.includes('big') ? { height: '44px' } : null;
	if (theme === 'admin') {
		InputEle = InputAdmin;
		inputStyle = {};
	}

	return (
		<div className={styles.row_container} style={width ? { width: '104%' } : {}}>
			<div className={styles.country_code} style={{ paddingRight: 0 }}>
				<SelectCountryCode
					{...rest}
					{...props}
					value={country_code || (value || {})[codeKey]}
					onChange={handleCodeChange}
					placeholder="Select"
					showMessage={false}
					disabled={disable_country_code}
					inputId={`${id || ''}_${codeKey || 'country_code'}`}
					theme={theme}
				/>
			</div>

			<div className={styles.mobile_number}>
				<InputEle
					{...rest}
					width="100%"
					id={`${id || ''}_${numberKey || 'number'}`}
					name="mobile_number"
					type={inputType || type}
					value={number || (value || {})[numberKey]}
					onChange={handleNumberChange}
					style={inputStyle}
				/>
			</div>
		</div>
	);
}

SelectMobileNumber.defaultProps = {
	themeType        : 'black',
	codeKey          : 'country_code',
	numberKey        : 'number',
	value            : {},
	countryCodeWidth : null,
	select2          : '',
};

export default SelectMobileNumber;
