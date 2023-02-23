import { Input } from '@cogoport/components';
import { string, shape, func } from 'prop-types';

import SERVICABLE_COUNTRY_IDS from './config/servicableCountries';
import SelectRegistrationType from './SelectRegistrationType';

function CountrywiseTaxSelect({
	value,
	typeKey,
	countryId,
	numberKey,
	itemKey,
	onChange,
	onBlur,
	width,
	id = 'select_tax',
	inputType = 'text',
	type = 'text',
	disable_registration_type = false,
	...rest
}) {
	const { [typeKey]: registration_type = '', [numberKey]: tax_number = '' } =	value || {};

	const handleTypeChange = (v) => {
		onChange({ ...(value || {}), [typeKey]: v });
	};

	const handleNumberChange = (e) => {
		onChange({ ...(value || {}), [numberKey]: e });
	};

	const props = {};

	props.style = {
		control: {
			fontSize   : '14px',
			lineHeight : '18px',
			color      : 'black',
			minHeight  : '48px',
		},
		indicatorsContainer : { height: '42px' },
		menu                : { width: '200px' },
	};

	return (
		<div style={{ width: '100%', display: 'flex' }}>
			{Object.values(SERVICABLE_COUNTRY_IDS).includes(countryId) && (
				<div style={{ paddingRight: 8, width: '33%' }}>
					<SelectRegistrationType
						{...rest}
						{...props}
						itemKey={itemKey}
						countryId={countryId}
						value={registration_type || (value || {})[typeKey]}
						onChange={handleTypeChange}
						placeholder="Select"
						showMessage={false}
						disabled={disable_registration_type}
						inputId={`${id || ''}_${typeKey || 'registration_type'}`}
					/>
				</div>
			)}

			<div style={{ width: Object.values(SERVICABLE_COUNTRY_IDS).includes(countryId) ? '67%' : '100%' }}>
				<Input
					{...rest}
					width="100%"
					onBlur={onBlur}
					id={`${id || ''}_${numberKey || 'number'}`}
					name="tax_number"
					type={inputType || type}
					value={tax_number || (value || {})[numberKey] || ''}
					onChange={handleNumberChange}
					disabled={
						Object.values(SERVICABLE_COUNTRY_IDS).includes(countryId)
						&& !registration_type
					}
				/>
			</div>
		</div>
	);
}

CountrywiseTaxSelect.propTypes = {
	themeType : string,
	typeKey   : string,
	numberKey : string,
	countryId : string,
	value     : shape({}),
	onChange  : func.isRequired,
	select2   : string,
};

CountrywiseTaxSelect.defaultProps = {
	themeType : 'black',
	typeKey   : 'registration_type',
	numberKey : 'tax_number',
	value     : {},
	select2   : '',
};

export default CountrywiseTaxSelect;
