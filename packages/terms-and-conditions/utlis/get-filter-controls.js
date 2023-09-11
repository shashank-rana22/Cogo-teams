import SERVICE_TYPES_MAPPING from '../config/service-types-mapping';
import TRADE_TYPE from '../config/trade-type.json';

const controls = [
	{
		name           : 'service',
		label          : 'Service Type',
		type           : 'select',
		caret          : true,
		isClearable    : true,
		defaultOptions : true,
		multiple       : false,
		span           : 12,
		placeholder    : ' Select Service Type',
		options        : SERVICE_TYPES_MAPPING,
		rules          : { required: true },
	},
	{
		name           : 'shipping_line_id',
		label          : 'Shipping Line',
		type           : 'async-select',
		placeholder    : 'Select Shipping Line',
		optionsListKey : 'shipping-lines',
		caret          : true,
		isClearable    : true,
		multiple       : false,
		span           : 6,
	},
	{
		name           : 'airline_id',
		label          : 'Airline',
		type           : 'async-select',
		placeholder    : 'Select Airline',
		optionsListKey : 'air-lines',
		caret          : true,
		isClearable    : true,
		multiple       : false,
		span           : 6,
	},
	{
		name        : 'trade_type',
		label       : 'Trade Type',
		type        : 'select',
		placeholder : ' Select Trade Type',
		options     : TRADE_TYPE,
		span        : 6,
		isClearable : true,
		rules       : { required: true },
	},
	{
		name           : 'country_id',
		label          : 'Country',
		type           : 'async-select',
		placeholder    : 'Select Country Name',
		optionsListKey : 'locations',
		span           : 4,
		params         : { filters: { type: ['country'] } },
	},
	{
		name           : 'paying_party_country_ids',
		label          : 'Paying Party Country',
		type           : 'async-select',
		optionsListKey : 'locations',
		placeholder    : 'Select Country Name',
		params         : { filters: { type: ['country'] } },
		span           : 4,
		multiple       : true,
	},
];

const getFilterControls = () => controls;

export default getFilterControls;
