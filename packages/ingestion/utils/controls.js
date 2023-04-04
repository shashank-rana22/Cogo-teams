import { PARTNER_IDS } from '@cogoport/constants/role_ids';

// eslint-disable-next-line
import countries from '../../../.data-store/constants/countries.json';

const { INDIA_PARTNER_ID:indiaId, VIETNAM_PARTNER_ID:vietnamId } = PARTNER_IDS;
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
	{ label: 'CogoPort India', value: indiaId },
	{ label: 'CogoPort Vietnam', value: vietnamId },
];

const controls = [

	{
		name        : 'country_id',
		label       : 'Country',
		type        : 'select',
		options     : countryOptions,
		placeholder : 'Select Country',
		isClearable : true,
		rules       : { required: 'Country is Required' },
	},
	{
		name        : 'partner_id',
		label       : 'Partner',
		type        : 'select',
		placeholder : 'Partner ID',
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
		placeholder    : 'Agent Name',
		params         : {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],
			},
			page_limit: 100,
		},
	},

];

export default controls;
