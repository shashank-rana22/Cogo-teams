import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const ingestion_request_controls = [
	{
		name        : 'mode',
		placeholder : 'request type',
		displayName : 'Request Type',
		type        : 'select',
		options     : [
			{ label: 'Checked rows', value: 'checked' },
			{ label: 'Select first', value: 'select_first' },
			{ label: 'All', value: 'api_call' },
		],
		rules: { required: 'Required' },
	},
	{
		name        : 'select_first',
		placeholder : 'Select First',
		displayName : 'Select First',
		type        : 'number',
	},
	{
		name        : 'file_name',
		placeholder : 'file name',
		displayName : 'File name',
		rules       : { required: 'Required' },
	},
	{
		name        : 'description',
		placeholder : 'Description',
		displayName : 'Description',
		type        : 'textarea',
		isClearable : true,
	},
	{
		name        : 'ingestion_partner_id',
		placeholder : 'select',
		displayName : 'Cogo Entity',
		type        : 'select',
		options     : [
			{ label: 'Cogoport India', value: GLOBAL_CONSTANTS.country_entity_ids.IN },
			{ label: 'Cogoport Vietnam', value: GLOBAL_CONSTANTS.country_entity_ids.VN },
			{ label: 'Cogoport Singapore', value: GLOBAL_CONSTANTS.country_entity_ids.SG },
			{ label: 'Cogoport Indonesia', value: GLOBAL_CONSTANTS.country_entity_ids.ID },
			{ label: 'Cogoport Thailand', value: GLOBAL_CONSTANTS.country_entity_ids.TH },
		],
		rules: { required: 'Required' },
	},
	{
		name        : 'account_type',
		placeholder : 'select',
		displayName : 'Account Type',
		type        : 'select',
		options     : [
			{ label: 'Importer/Exporter', value: 'importer_exporter' },
			{ label: 'Service Provider', value: 'service_provider' },
			{ label: 'Channel Partner', value: 'channel_partner' },
		],
		rules: { required: 'Required' },
	},
	{
		name           : 'agent_id',
		displayName    : 'Agent',
		placeholder    : 'Agent name',
		type           : 'asyncSelect',
		asyncKey       : 'partner_users',
		valueKey       : 'user_id',
		isClearable    : true,
		defaultOptions : false,
		initialCall    : false,
		params         : {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],
			},
			page_limit: 100,
		},
	},
];

export default ingestion_request_controls;
