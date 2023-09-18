const controls = [
	{
		name        : 'status',
		label       : 'Status',
		type        : 'select',
		placeholder : 'Select status',
		options     : [
			{
				label : 'Uploaded',
				value : 'uploaded',
			},
			{
				label : 'Validated',
				value : 'validated',
			},
			{
				label : 'Invalidated',
				value : 'invalidated',
			},

			{
				label : 'Processed',
				value : 'processed',
			},
			{
				label : 'Processing',
				value : 'processing',
			},
			{
				label : 'Partially Added',
				value : 'partially_added',
			},
		],
	},
	{
		name        : 'service_name',
		label       : 'Service Name',
		type        : 'select',
		placeholder : 'Select service',
		options     : [
			{
				label : 'FCL Freight',
				value : 'fcl_freight',
			},

			{
				label : 'FCL Freight Local',
				value : 'fcl_freight_local',
			},
		],
	},
];

export default controls;
