import { Select } from '@cogoport/components';

import SERVICABLE_COUNTRY_IDS from '../config/servicableCountries';

const countrywiseOptions = {
	[SERVICABLE_COUNTRY_IDS.IN]: [
		{
			label : 'PAN',
			value : 'pan',
		},
		// {
		// 	label : 'GST',
		// 	value : 'gstin',
		// },
	],
	[SERVICABLE_COUNTRY_IDS.VN]: [
		{
			label : 'ECN',
			value : 'ecn',
		},
		{
			label : 'Tax',
			value : 'tax',
		},
	],
};

function SelectRegistrationType(props) {
	const { value, countryId } = props;

	return (
		<Select
			{...props}
			options={countrywiseOptions[countryId]}
			readOnly={false}
			value={value}
		/>
	);
}

export default SelectRegistrationType;
