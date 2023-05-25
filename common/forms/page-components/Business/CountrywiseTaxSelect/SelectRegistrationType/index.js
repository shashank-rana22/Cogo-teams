import { Select } from '@cogoport/components';
import { getCountryConstants } from '@cogoport/globalization/constants/geo';

function SelectRegistrationType(props) {
	const { value, countryId } = props;

	const countryWiseData = getCountryConstants({ country_id: countryId });

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
