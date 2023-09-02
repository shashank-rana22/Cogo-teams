import checkClearanceDate from '../utils/checkClearanceDate';
import checkValidation from '../utils/checkValidation';

const COMMODITY_TYPE_OPTIONS = {
	general: [
		{ label: 'All', value: 'all' },
	],
	special_consideration: [
		{ label: 'Dangerous Goods', value: 'dangerous' },
		{ label: 'Temperature Controlled/Pharma', value: 'temp_controlled' },
		{ label: 'Other Special Commodity Sub Type', value: 'other_special' },
	],
};

const awbControls = ({ commodity, booking_date }) => [
	{
		name        : 'serviceProviderId',
		type        : 'async-select',
		asyncKey    : 'organizations',
		label       : 'Service Provider',
		span        : 6,
		placeholder : 'Select Service Provider',
		disabled    : true,
		params      : {
			filters: {
				service_type : 'air_freight',
				status       : 'active',
				kyc_status   : 'verified',
				account_type : 'service_provider',
			},
		},
		rules: {
			required: true,
		},
	},
	{
		name        : 'airlineId',
		type        : 'async-select',
		asyncKey    : 'list_operators',
		label       : 'Airline Name',
		placeholder : 'Select Airline',
		disabled    : true,
		initialCall : true,
		span        : 6,
		rules       : {
			required: true,
		},
	},
	{
		name        : 'airportId',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		label       : 'Origin Airport',
		placeholder : 'Select Origin Airport',
		disabled    : true,
		span        : 6,
		params      : {
			filters: {
				type: ['airport'],
			},
		},
		rules: {
			required: true,
		},
	},
	{
		name        : 'destination_location_id',
		type        : 'async-select',
		asyncKey    : 'list_locations',
		label       : 'Destination Location',
		placeholder : 'Select Destination Airport',
		span        : 6,
		params      : {
			filters: {
				type: ['airport'],
			},
		},
		isClearable: true,
	},
	{
		name        : 'commodity',
		type        : 'select',
		label       : 'Commodity',
		placeholder : 'Select Commodity',
		span        : 6,
		options     : [
			{ label: 'General', value: 'general' },
			{ label: 'Special Consideration', value: 'special_consideration' },
		],
		rules: {
			required: true,
		},
		isClearable: true,
	},
	{
		name        : 'commodity_type',
		type        : 'select',
		label       : 'Commodity Type',
		placeholder : 'Select Commodity Type',
		span        : 6,
		options     : COMMODITY_TYPE_OPTIONS[commodity],
		rules       : {
			required: true,
		},
		isClearable: true,
	},
	{
		name        : 'chargeable_weight',
		type        : 'select',
		label       : 'Add Chargeable Weight',
		placeholder : 'Enter Weight',
		span        : 6,
		options     : [
			{ label: '>500', value: 'greater' },
			{ label: '<500', value: 'smaller' },
		],
		isClearable: true,
	},
	{
		name        : 'awbNumber',
		type        : 'text',
		label       : 'AWB Number',
		placeholder : 'xxx-xxxx-xxxx',
		maxLength   : 13,
		disabled    : true,
		span        : 6,
		rules       : {
			required : true,
			validate : (value) => checkValidation(value),
		},
	},
	{
		name                  : 'booking_date',
		type                  : 'date_picker',
		label                 : 'Booking Date',
		placeholder           : 'Select Date',
		isPreviousDaysAllowed : true,
		span                  : 6,
		rules                 : {
			required: true,
		},
	},
	{
		name                  : 'custom_clearance_date',
		type                  : 'date_picker',
		label                 : 'Custom Clearance Date',
		placeholder           : 'Select Date',
		isPreviousDaysAllowed : true,
		span                  : 6,
		rules                 : {
			required : true,
			validate : (value) => checkClearanceDate({ value, booking_date }),
		},
	},
	{
		name  : 'so_confirmation',
		type  : 'checkbox',
		label : 'Booking Confirmation received from SO1',
		span  : 12,
		rules : {
			required: true,
		},
	},
];

export default awbControls;
