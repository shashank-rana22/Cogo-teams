import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const ONE_STOP = 1;

const controls = (primary_service, mainService, noOfStops, disabled) => [
	{
		label    : 'Number of stops',
		name     : 'no_of_stops',
		type     : 'select',
		span     : 4,
		value    : '0',
		disabled : (Number(noOfStops) < ONE_STOP && !disabled),
		options  : [
			{ label: '0', value: '0' },
			{ label: 1, value: 1 },
			{ label: 2, value: 2 },
			{ label: 3, value: 3 },
			{ label: 4, value: 4 },
			{ label: 5, value: 5 },
		],
	},
	{
		label    : 'Final Origin Airport',
		name     : 'origin_airport_id',
		type     : 'async-select',
		asyncKey : 'list_locations',
		value:
				mainService?.[GLOBAL_CONSTANTS.zeroth_index]?.origin_airport_id
				|| primary_service?.origin_airport_id,
		span        : 4,
		placeholder : 'Select Origin Airport',
		disabled    : !!(
			mainService?.[GLOBAL_CONSTANTS.zeroth_index]?.origin_airport_id
				|| primary_service?.origin_airport_id
		),
		params: {
			filter: {
				type: ['airport'],
			},
		},
		rules: {
			required: true,
		},
	},
	{
		label    : 'Final Destination Airport',
		name     : 'destination_airport_id',
		type     : 'async-select',
		asyncKey : 'list_locations',
		value:
				mainService?.[GLOBAL_CONSTANTS.zeroth_index]?.destination_airport_id
				|| primary_service?.destination_airport_id,
		span        : 4,
		placeholder : 'Select Destination Airport',
		params      : {
			filter: {
				type: ['airport'],
			},
		},
		rules: {
			required: true,
		},
		disabled: !!(
			mainService?.[GLOBAL_CONSTANTS.zeroth_index]?.destination_airport_id
				|| primary_service?.destination_airport_id
		),
	},
	{
		label : 'Flight Departure Date',
		name  : 'flight_departure',
		value:
		new Date(mainService?.[GLOBAL_CONSTANTS.zeroth_index]?.schedule_departure
			|| primary_service?.selected_schedule_departure
			|| new Date()),
		placeholder           : 'Select Flight Departure Date',
		type                  : 'datepicker',
		span                  : 4,
		disabled              : (Number(noOfStops) < ONE_STOP && !disabled),
		isPreviousDaysAllowed : true,
		rules                 : {
			required: true,
		},
	},
	{
		label : 'Flight Arrival Date',
		name  : 'flight_arrival',
		value:
				new Date(mainService?.[GLOBAL_CONSTANTS.zeroth_index]?.schedule_arrival
					|| primary_service?.selected_schedule_arrival
					|| new Date()),
		placeholder           : 'Select Flight Arrival Date',
		type                  : 'datepicker',
		span                  : 4,
		isPreviousDaysAllowed : true,
		disabled              : (Number(noOfStops) < ONE_STOP && !disabled),
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
		value       : mainService?.[GLOBAL_CONSTANTS.zeroth_index]?.flight_number,
		disabled    : (Number(noOfStops) < ONE_STOP && !disabled),
		rules       : {
			required: 'Flight Number is Required',
		},
	},
	{
		label            : 'Movement details',
		name             : 'movement',
		type             : 'fieldArray',
		showButtons      : false,
		showDeleteButton : false,
		value            : [],
		controls         : [
			{
				label       : 'Origin Airport',
				name        : 'from_airport_id',
				type        : 'async-select',
				asyncKey    : 'list_locations',
				placeholder : 'Select Origin Airport',
				span        : 4,
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
				label       : 'Destination Airport',
				name        : 'to_airport_id',
				type        : 'async-select',
				asyncKey    : 'list_locations',
				placeholder : 'Select Destination Airport',
				span        : 4,
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
				span: 4,
			},
			{
				label                 : 'Flight Departure',
				name                  : 'schedule_departure',
				placeholder           : 'Select Flight Departure Date',
				type                  : 'datepicker',
				span                  : 4,
				isPreviousDaysAllowed : true,
				rules                 : {
					required: true,
				},
			},
			{
				label                 : 'Flight Arrival',
				name                  : 'schedule_arrival',
				placeholder           : 'Select Flight Arrival Date',
				type                  : 'datepicker',
				span                  : 4,
				isPreviousDaysAllowed : true,
				rules                 : {
					required: true,
				},
			},
			{
				label       : 'Flight Number',
				name        : 'flight_number_stop',
				placeholder : 'Input Flight Number',
				type        : 'text',
				span        : 4,
				rules       : {
					required: true,
				},
			},
		],
	},
];

export default controls;