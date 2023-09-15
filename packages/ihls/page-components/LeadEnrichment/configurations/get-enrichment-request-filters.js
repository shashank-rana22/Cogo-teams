const enrichment_request_filters = [
	{
		name        : 'enrichment_source_id',
		placeholder : 'Agency',
		type        : 'select',
		options     : [
			{ label: 'Neo Kinetics', value: '4' },
		],
	},
	{
		name        : 'enrichment_status',
		placeholder : 'Enrichment Status',
		type        : 'select',
		options     : [
			{ label: 'Enriched', value: 'enriched' },
			{ label: 'Pending', value: 'pending' },
			{ label: 'Processing', value: 'processing' },
			{ label: 'Failed', value: 'failed' },
		],
	},
];

export default enrichment_request_filters;
