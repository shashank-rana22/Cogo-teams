const enrichment_request_filters = [
	{
		name        : 'enrichment_source_id',
		placeholder : 'Agency',
		type        : 'asyncSelect',
		asyncKey    : 'list_enrichment_sources',
		valueKey    : 'id',
		params      : { page_limit: 20, filters: { status: 'active', service: 'contact_enrichment' } },
		initialCall : true,
		width       : '18%',
	},
	{
		name        : 'enrichment_status',
		placeholder : 'Enrichment Status',
		type        : 'select',
		width       : '18%',
		options     : [
			{ label: 'Enriched', value: 'success' },
			{ label: 'Pending', value: 'pending' },
			{ label: 'Processing', value: 'processing' },
			{ label: 'Failed', value: 'failed' },
		],
	},
];

export default enrichment_request_filters;
