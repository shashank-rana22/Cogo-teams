const controls = [
	{
		name        : 'status',
		label       : 'Status',
		type        : 'select',
		caret       : true,
		placeholder : 'Select status',
		className   : 'primary md',
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
		className   : 'primary md',
		caret       : true,
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
