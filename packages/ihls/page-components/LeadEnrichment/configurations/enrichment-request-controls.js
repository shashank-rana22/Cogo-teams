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
		displayName : 'Enrichment Source',
		placeholder : 'Agency',
		type        : 'asyncSelect',
		asyncKey    : 'list_enrichment_sources',
		valueKey    : 'id',
		params      : { page_limit: 20, filters: { status: 'active', service: 'contact_enrichment' } },
		initialCall : true,
		width       : '28%',
		rules       : { required: 'Required' },
	},
];

export default enrichment_request_controls;
