const enrichment_request_controls = [
	{
		name        : 'name',
		placeholder : 'request name',
		displayName : 'Request name',
		rules       : { required: 'Required' },
	},
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
		name        : 'enrichment_source_id',
		placeholder : 'select source',
		displayName : 'Enrichment Source',
		type        : 'select',
		options     : [
			{ label: 'Neo Kinetics', value: '4' },
		],
		rules: { required: 'Required' },
	},
];

export default enrichment_request_controls;
