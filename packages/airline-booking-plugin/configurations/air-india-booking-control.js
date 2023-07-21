export const bookingControl = (setLocationData, edit) => [
	{
		name        : 'source',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		initialCall : true,
		placeholder : 'Source',
		span        : 1.7,
		onChange    : (val, obj) => setLocationData((pre) => ({ ...pre, source: obj?.name })),
		params      : {
			filters: {
				type: ['airport'],
			},
		},
		rules: {
			required: 'Source is required',
		},
	},
	{
		name        : 'destination',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		initialCall : true,
		placeholder : 'Destination',
		span        : 1.7,
		onChange    : (val, obj) => setLocationData((pre) => ({ ...pre, destination: obj?.name })),
		params      : {
			filters: {
				type: ['airport'],
			},
		},
		rules: {
			required: 'Destination is required',
		},
	},
	{
		name        : 'commodity',
		type        : 'text',
		placeholder : 'Commodity',
		span        : 1.5,
		rules       : {
			required: 'Commodity is required',
		},
	},
	{
		name        : 'number_of_pieces',
		type        : 'number',
		placeholder : 'No. of Pieces',
		span        : 1.4,
		rules       : {
			required: 'No. of Pieces is required',
		},
	},
	{
		name        : 'weight',
		type        : 'number',
		placeholder : 'Weight',
		span        : 1.4,
		rules       : {
			required: 'Weight is required',
		},
	},
	{
		name        : 'volume',
		type        : 'number',
		placeholder : 'Volume',
		span        : 1.4,
		rules       : {
			required: 'Volume is required',
		},
	},
	{
		name        : 'flight_number',
		type        : 'text',
		placeholder : 'Flight No.',
		span        : 1.4,
		rules       : {
			required: 'Flight No. is required',
		},
	},
	{
		name        : 'flight_date',
		type        : edit ? 'date_picker' : 'date_range',
		placeholder : 'Flight Date',
		span        : 2,
		minDate     : new Date(),
		rules       : {
			required: 'Flight Date is required',
		},
	},
];
