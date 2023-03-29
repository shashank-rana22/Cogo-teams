const controls = {
	query_type: {
		size        : 'sm',
		name        : 'query_type',
		label       : 'Issue Related to',
		placeholder : 'Select',
		type        : 'select',
		options     : [
			{
				label : 'Inaccurate data',
				value : 'inaccurate_data',
			},
			{
				label : 'Shipment Rollover',
				value : 'shipment_rollover',
			},
			{
				label : 'Map View is not available',
				value : 'map_view_not_available',
			},
			{
				label : 'Other',
				value : 'other',
			},
		],

	},
	remarks: {
		name        : 'remarks',
		label       : 'Remarks',
		placeholder : 'Please type here',
		type        : 'textarea',

	},
};
export default controls;
