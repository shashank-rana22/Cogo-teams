import { PARTNER_IDS } from '@cogoport/constants/role_ids';

const { INDIA_PARTNER_ID:indiaId, VIETNAM_PARTNER_ID:vietnamId } = PARTNER_IDS;

const PARTNER_OPTIONS = [
	{ label: 'Cogoport India', value: indiaId },
	{ label: 'Cogoport Vietnam', value: vietnamId },
];

const controls = [

	{
		name        : 'ingestion_country_id',
		label       : 'Country',
		type        : 'asyncSelect',
		params      : { filters: { type: ['country'] } },
		initialCall : false,
		asyncKey    : 'list_locations',
		placeholder : 'Select Country',
		isClearable : true,
		rules       : { required: 'Country is Required' },

	},
	{
		name        : 'ingestion_partner_id',
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
