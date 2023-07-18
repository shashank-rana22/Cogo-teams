import checkValidation from '../utils/checkValidation';

const editClearanceDateReportContols = [
	{
		name        : 'airlineId',
		type        : 'async-select',
		asyncKey    : 'list_operators',
		label       : 'Airline Name',
		placeholder : 'Select Airline...',
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
				type: ['airport', 'country'],
			},
		},
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
		value                 : new Date(),
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
		value                 : new Date(),
		span                  : 6,
		rules                 : {
			required: true,
		},
	},
];

export default editClearanceDateReportContols;
