import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const controls = (primary_service, services) => [
	{
		label                 : 'Cargo Ready Date',
		name                  : 'cargo_ready_date',
		placeholder           : 'Select Cargo Ready Date',
		type                  : 'datepicker',
		span                  : 4,
		value                 : new Date(primary_service?.cargo_clearance_date),
		isPreviousDaysAllowed : true,
		rules                 : {
			required: true,
		},
	},
	{
		label    : 'Airline',
		name     : 'airline',
		type     : 'async-select',
		asyncKey : 'list_operators',
		size     : 'md',
		params   : {
			filters: { operator_type: 'airline', status: 'active' },
		},
		value       : primary_service?.airline_id || services?.[GLOBAL_CONSTANTS.zeroth_index]?.airline_id,
		placeholder : 'Select AirLine',
		subType     : 'select',
		span        : 4,
		className   : 'primary lg',
		rules       : {
			required: { value: true, message: 'Airline is Required' },
		},
	},
	{
		label        : 'Number of stops',
		name         : 'no_of_stops1',
		type         : 'select',
		span         : 4,
		size         : 'md',
		showOptional : false,
		options      : [
			{ label: '0', value: '0' },
			{ label: 1, value: 1 },
			{ label: 2, value: 2 },
			{ label: 3, value: 3 },
			{ label: 4, value: 4 },
			{ label: 5, value: 5 },
		],
		value: '0',
	},
	{
		label : 'Final Flight Departure Date',
		name  : 'flight_departure',
		value : new Date(services?.[GLOBAL_CONSTANTS.zeroth_index]?.schedule_departure
			|| primary_service?.schedule_departure
			|| primary_service?.selected_schedule_departure),
		placeholder           : 'Select Final Flight Departure Date',
		type                  : 'datepicker',
		span                  : 4,
		isPreviousDaysAllowed : true,
		rules                 : {
			required: true,
		},
	},
	{
		label : 'Final Flight Arrival Date',
		name  : 'flight_arrival',
		value : new Date(services?.[GLOBAL_CONSTANTS.zeroth_index]?.schedule_arrival
			|| primary_service?.schedule_arrival
			|| primary_service?.selected_schedule_arrival),
		placeholder           : 'Select Final Flight Arrival Date',
		type                  : 'datepicker',
		span                  : 4,
		isPreviousDaysAllowed : true,
		rules                 : {
			required: true,
		},
	},
	{
		label       : 'Flight Number',
		name        : 'flight_number',
		placeholder : 'Input Flight Number',
		type        : 'text',
		span        : 4,
		size        : 'md',
		rules       : { required: 'Flight Number is Required' },
	},
	{
		label   : 'Contact With Agent',
		name    : 'contact_with_agent',
		type    : 'radio',
		theme   : 'admin',
		options : [
			{
				label : 'Yes',
				value : 'true',
			},
			{
				label : 'No',
				value : 'false',
			},
		],
		rules: { required: 'This is Required' },
	},
	{
		label            : 'Stops',
		name             : 'movement',
		type             : 'fieldArray',
		showButtons      : true,
		showAddButton    : false,
		showDeleteButton : false,
		value            : [],
		controls         : [
			{
				label    : 'Origin Airport',
				name     : 'from_airport_id',
				type     : 'async-select',
				asyncKey : 'list_locations',
				params   : {
					filters: {
						type: 'airport',
					},
				},
				placeholder : 'Select Origin Airport',
				span        : 4,
				className   : 'primary lg',
				rules       : {
					required: 'Origin Airport is Required',
				},
			},
			{
				label    : 'Destination Airport',
				name     : 'to_airport_id',
				type     : 'async-select',
				asyncKey : 'list_locations',
				params   : {
					filters: {
						type: 'airport',
					},
				},
				placeholder : 'Select Destination Airport',
				span        : 4,
				className   : 'primary lg',
				rules       : {
					required: 'Destination Airport is required',
				},
			},
			{
				span: 4,
			},
			{
				label                 : 'Flight Departure',
				name                  : 'schedule_departure',
				placeholder           : 'Select Flight Departure Date',
				type                  : 'datepicker',
				span                  : 4,
				isPreviousDaysAllowed : true,
				className             : 'primary lg validity',
				rules                 : { required: 'Flight Departure Date is Required' },
			},
			{
				label                 : 'Flight Arrival',
				name                  : 'schedule_arrival',
				placeholder           : 'Select Flight Arrival Date',
				type                  : 'datepicker',
				span                  : 4,
				isPreviousDaysAllowed : true,
				className             : 'primary lg validity',
				rules                 : { required: 'Flight Arrival Date is Required' },
			},
			{
				label       : 'Flight Number',
				name        : 'flight_number_stop',
				placeholder : 'Input Flight Number',
				type        : 'text',
				disabled    : false,
				span        : 4,
				className   : 'primary lg',
				rules       : { required: 'Flight Number is Required' },
			},
		],
	},
];
export default controls;
