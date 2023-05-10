import { Input } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import SelectRegistrationType from './SelectRegistrationType';

const SERVICABLE_COUNTRY_IDS = GLOBAL_CONSTANTS.servicable_country_ids;

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

CountrywiseTaxSelect.defaultProps = {
	typeKey   : 'registration_type',
	numberKey : 'tax_number',
	value     : {},
};

export default CountrywiseTaxSelect;
