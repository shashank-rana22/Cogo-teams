import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const PARTNER_OPTIONS = [
	{ label: 'Cogoport India', value: GLOBAL_CONSTANTS.country_entity_ids.IN },
	{ label: 'Cogoport Vietnam', value: GLOBAL_CONSTANTS.country_entity_ids.VN },
];

const controls = [

	{
		name        : 'ingestion_partner_id',
		label       : 'Cogo Entity',
		type        : 'select',
		placeholder : 'Select Cogo Entity',
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
