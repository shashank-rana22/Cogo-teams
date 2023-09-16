import SERVICE_TYPE from './service-type.json';
import TRADE_TYPE from './trade-type.json';

const controls = [
	{
		name    : 'service',
		label   : 'Service Type',
		type    : 'select',
		options : SERVICE_TYPE,
		span    : 12,
		rules   : { required: true },
	},
	{
		name           : 'shipping_line_id',
		label          : 'Shipping Line',
		type           : 'async_select',
		asyncKey       : 'list_operators',
		placeholder    : 'Select Shipping Line',
		defaultOptions : true,
		span           : 12,
		params         : {
			page_limit : 10,
			sort_by    : 'short_name',
			sort_type  : 'asc',
			filters    : { operator_type: 'shipping_line', status: 'active' },

		},
	},
	{

		name        : 'airline_id',
		label       : 'Airline',
		type        : 'async_select',
		asyncKey    : 'list_operators',
		placeholder : 'Select Airline',
		initialCall : true,
		span        : 12,
	},
	{
		name        : 'trade_type',
		label       : 'Trade Type',
		type        : 'select',
		placeholder : 'Select Trade Type',
		options     : TRADE_TYPE,
		span        : 12,
		isClearable : true,
	},
	{
		name        : 'country_id',
		label       : 'Country',
		type        : 'async_select',
		placeholder : 'Select Country Name',
		asyncKey    : 'list_locations',
		span        : 12,
		params      : { filters: { type: ['country'] } },
	},
	{
		name        : 'paying_party_country_ids',
		label       : 'Paying Party Country',
		type        : 'async_select',
		asyncKey    : 'list_locations',
		placeholder : 'Select Country Name',
		params      : { filters: { type: ['country'] } },
		span        : 12,
		multiple    : true,
	},
];

export default controls;
