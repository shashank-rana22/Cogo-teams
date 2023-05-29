import { Input } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import getCountryDetails from '@cogoport/globalization/utils/getCountryDetails';

import SelectRegistrationType from './SelectRegistrationType';

const SERVICABLE_COUNTRY_CODES = GLOBAL_CONSTANTS.platform_supported_country_codes;

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

	const countryData = getCountryDetails({ country_id: countryId });

	const { country_code: countryCode } = countryData || {};

	const props = {};

	return (
		<div style={{ width: '100%', display: 'flex' }}>
			{SERVICABLE_COUNTRY_CODES.includes(countryCode) && (
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

			<div style={{ width: SERVICABLE_COUNTRY_CODES.includes(countryCode) ? '67%' : '100%' }}>
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
						SERVICABLE_COUNTRY_CODES.includes(countryCode)
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
