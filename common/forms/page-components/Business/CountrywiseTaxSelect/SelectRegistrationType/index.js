import { Select } from '@cogoport/components';
import { getConstantsByCountryId } from '@cogoport/globalization/constants/geo';

function SelectRegistrationType(props) {
	const { value, countryId } = props;

	const countryWiseData = getConstantsByCountryId({ country_id: countryId });

	const { options } = countryWiseData || {};

	const { tax_types } = options;

	const taxTypesOption = tax_types || [];

	return (
		<Select
			{...props}
			options={taxTypesOption}
			readOnly={false}
			value={value}
		/>
	);
}

export default SelectRegistrationType;
