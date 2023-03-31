import { PARTNER_IDS } from '@cogoport/constants/role_ids';

// eslint-disable-next-line
import countries from '../../../.data-store/constants/countries.json';

const indiaOption = countries.find((country) => country.country_code === 'IN');

const countryOptions = [{
	label : indiaOption?.name,
	value : indiaOption?.id,
}];

countries.filter((country) => country.country_code !== 'IN').map((country) => {
	const option = { label: country.name, value: country.id };

	countryOptions.push(option);

	return countryOptions;
});

const PARTNER_OPTIONS = [
	{ label: 'CogoPort India', value: PARTNER_IDS.INDIA_PARTNER_ID },
	{ label: 'CogoPort Vietnam', value: PARTNER_IDS.VIETNAM_PARTNER_ID },
];

// const IsCpOptions = [
// 	{ label: 'Yes', value: true },
// 	{ label: 'No', value: false },
// ];

const controls = [

	{
		name        : 'country_id',
		label       : 'Country',
		type        : 'select',
		options     : countryOptions,
		placeholder : 'Type Here...',
		isClearable : true,
		rules       : { required: 'Country is Required' },
	},
	{
		name        : 'partner_id',
		label       : 'Partner',
		type        : 'select',
		placeholder : 'Type Here...',
		options     : PARTNER_OPTIONS,
		isClearable : true,
		rules       : { required: 'Partner is Required' },
	},
	{
		name           : 'agent',
		label          : 'Agent',
		type           : 'asyncSelect',
		asyncKey       : 'partner_users',
		valueKey       : 'user_id',
		isClearable    : true,
		defaultOptions : false,
		initialCall    : false,
		placeholder    : 'Type Here...',
		params         : {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],
			},
			page_limit: 100,
		},
		// disabled: true,
		// options     : countryOptions,

		// rules       : { required: 'Agent is Required' },
	},
	// {
	// 	name        : 'is_cp',
	// 	label       : 'Is Channel Partner',
	// 	type        : 'select',
	// 	options     : IsCpOptions,
	// 	placeholder : 'Type Here...',
	// },

];

export default controls;
