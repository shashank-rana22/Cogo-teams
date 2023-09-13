const controls = [
	{
		name        : 'service',
		type        : 'select',
		placeholder : 'Select Service',
		label       : 'Service',
		options     : [
			{ label: 'FCL Freight', value: 'fcl_freight' },
			{ label: 'LCL Freight', value: 'lcl_freight' },
			{ label: 'Air Freight', value: 'air_freight' },
		],
		span : 12,
		size : 'sm',
	},
	{
		label    : 'Origin Location',
		name     : 'origin_location_id',
		type     : 'async_select',
		asyncKey : 'list_locations',
		params   : { filters: { type: ['seaport', 'country', 'airport'] }, page_limit: 10 },
		span     : 12,
		size     : 'sm',
	},
	{
		label    : 'Destination Location',
		name     : 'destination_location_id',
		type     : 'async_select',
		asyncKey : 'list_locations',
		params   : { filters: { type: ['seaport', 'country', 'airport'] }, page_limit: 10 },
		span     : 12,
		size     : 'sm',
	},
	{
		name        : 'charge_type',
		type        : 'select',
		label       : 'Charge Type',
		placeholder : 'Select Charge Type',
		options     : [
			{ label: 'Percentage', value: 'percentage' },
			{ label: 'Absolute, Per Shipment', value: 'absolute_total' },
			{ label: 'Absolute, Per Unit', value: 'absolute_unit' },

		],
		span : 12,
		size : 'sm',
	},
	{
		label          : 'Shipping Line',
		name           : 'shipping_line_id',
		optionsListKey : 'shipping-lines',
		type           : 'select',
		placeholder    : 'Select Shipping Line',
		span           : 12,
		size           : 'sm',
	},
	{
		name        : 'booking_type',
		label       : 'Booking Type',
		type        : 'select',
		placeholder : 'Select Booking Type',
		options     : [
			{ label: 'Spot Line Booking', value: 'spot_line_booking' },
			{ label: 'Normal Booking', value: 'normal_booking' },

		],
		span : 12,
		size : 'sm',
	},
	{
		label       : 'Rate Type',
		name        : 'rate_type',
		type        : 'select',
		placeholder : 'Select Rate Type',
		options     : [
			{ label: 'Marketplace Rate', value: 'marketplace_rate' },
			{ label: 'Cogo Assured Rate', value: 'cogo_assured_rate' },
		],
		span : 12,
		size : 'sm',
	},
];
export default controls;
