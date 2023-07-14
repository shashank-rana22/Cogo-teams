const WEEK_OF_MONTH_OPTIONS = [
	{ label: 'first', value: 1 },
	{ label: 'second', value: 2 },
	{ label: 'third', value: 3 },
	{ label: 'fourth', value: 4 },
];

const DAY_OF_WEEK_OPTIONS = [
	{ label: 'Monday', value: 2 },
	{ label: 'Tuesday', value: 3 },
	{ label: 'Wednesday', value: 4 },
	{ label: 'Thursday', value: 5 },
	{ label: 'Friday', value: 6 },
	{ label: 'Saturday', value: 7 },
	{ label: 'Sunday', value: 1 },
];

const MONTH_OF_YEAR_OPTIONS = [
	{ label: 'January', value: 1 },
	{ label: 'February', value: 2 },
	{ label: 'March', value: 3 },
	{ label: 'April', value: 4 },
	{ label: 'May', value: 5 },
	{ label: 'June', value: 6 },
	{ label: 'July', value: 7 },
	{ label: 'August', value: 8 },
	{ label: 'September', value: 9 },
	{ label: 'October', value: 10 },
	{ label: 'November', value: 11 },
	{ label: 'December', value: 12 },
];

const controls = (no_of_ports, shippingLineOptions, locationOptions) => ({
	basic: [
		{
			name           : 'shipping_line_id',
			label          : 'Shipping Line',
			type           : 'select',
			optionsListKey : 'shipping-lines',
			placeholder    : 'Select Shipping Line',
			span           : 4,
			size           : 'md',
			rules          : { required: 'Required' },
			...shippingLineOptions,
		},
		{
			name        : 'name',
			label       : 'Service Name',
			type        : 'text',
			placeholder : 'Type here...',
			span        : 4,
			size        : 'md',
			rules       : { required: 'Required' },
		},
		{
			name        : 'frequency',
			label       : 'Frequency',
			type        : 'number',
			placeholder : 'Type here...',
			span        : 4,
			size        : 'md',
		},
		{
			name        : 'day_of_week',
			label       : 'Day Of Week',
			type        : 'select',
			options     : DAY_OF_WEEK_OPTIONS,
			placeholder : 'Type here...',
			span        : 4,
			size        : 'md',
		},
		{
			name        : 'week_of_month',
			label       : 'Week Of Month',
			type        : 'select',
			options     : WEEK_OF_MONTH_OPTIONS,
			placeholder : 'Type here...',
			span        : 4,
			size        : 'md',
		},
		{
			name        : 'month_of_year',
			label       : 'Month Of Year',
			type        : 'select',
			options     : MONTH_OF_YEAR_OPTIONS,
			placeholder : 'Type here...',
			span        : 4,
			size        : 'md',
		},
	],
	port: [{
		name    : 'port_number',
		label   : 'Ports Covered',
		type    : 'number',
		section : 'two',
		span    : 5,
		size    : 'md',
		min     : 2,
		rules   : { required: 'Required' },
	},
	],

	ports: [{
		total              : no_of_ports,
		name               : 'waypoint_locations',
		label              : 'Enter Port Information',
		type               : 'fieldArray',
		buttonText         : 'Add More',
		noDeleteButtonTill : 1,
		controls           : [
			{
				label       : 'Select Stop',
				name        : 'location_id',
				type        : 'select',
				placeholder : 'Type here...',
				span        : 4,
				size        : 'md',
				rules       : { required: 'Required' },
				...locationOptions,
			},
			{
				label     		: 'ETA Day Count',
				name        : 'eta_day_count',
				type        : 'number',
				span        : 4,
				placeholder : 'Type here...',
				size        : 'md',
				rules       : { required: 'Required' },
			},
			{
				label       : 'ETD Day Count',
				name        : 'etd_day_count',
				type        : 'number',
				span        : 4,
				placeholder : 'Type here...',
				size        : 'md',
				rules       : { required: 'Required' },

			},
			{
				label       : 'ETA Day',
				name        : 'eta_day',
				type        : 'select',
				span        : 4,
				placeholder : 'Type here...',
				options     : DAY_OF_WEEK_OPTIONS,
				size        : 'md',
				rules       : { required: 'Required' },

			},
			{
				label       : 'ETD Day',
				name        : 'etd_day',
				type        : 'select',
				options     : DAY_OF_WEEK_OPTIONS,
				span        : 4,
				placeholder : 'Type here...',
				size        : 'md',
				rules       : { required: 'Required' },

			},
		],
	}],
}
);

export default controls;
