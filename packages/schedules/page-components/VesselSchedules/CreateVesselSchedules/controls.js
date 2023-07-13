const controls = (no_of_ports, locationOptions, shippingLineOptions, terminalOptions) => ({
	basic: [
		{
			name        : 'vessel_id',
			label       : 'Vessel Name',
			type        : 'text',
			placeholder : 'Type here...',
			span        : 6,
			size        : 'md',
			// rules       : { required: 'Required' },
		},
		{
			name        : 'service_lane_id',
			label       : 'Service Lane',
			type        : 'text',
			placeholder : 'Type here...',
			span        : 6,
			size        : 'md',
			// rules       : { required: 'Required' },
		},
		{
			name           : 'shipping_line_id',
			label          : 'Shipping Line',
			type           : 'select',
			optionsListKey : 'shipping-lines',
			placeholder    : 'Select Shipping Line',
			span           : 6,
			size           : 'md',
			...shippingLineOptions,
			// rules          : { required: 'Required' },
		},
		{
			name           : 'chartered_operators',
			label          : 'Chartered Operators',
			type           : 'select',
			optionsListKey : 'shipping-lines',
			placeholder    : 'Select Shipping Line',
			span           : 6,
			size           : 'md',
			...shippingLineOptions,
			multiple       : true,
			// rules          : { required: 'Required' },
		},
	],
	port: [{
		name    : 'port_number',
		label   : 'Ports Covered',
		type    : 'number',
		section : 'two',
		span    : 5,
		size    : 'md',
		// rules   : { required: 'Required' },
		min     : 0,
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
				...locationOptions,
				// rules       : { required: 'Required' },
			},
			{
				label     		: 'ETA',
				name        : 'eta',
				type        : 'date_picker',
				span        : 4,
				placeholder : 'Type here...',
				size        : 'md',
				// rules       : { required: 'Required' },
			},
			{
				label       : 'ETD',
				name        : 'etd',
				type        : 'date_picker',
				span        : 4,
				placeholder : 'Type here...',
				size        : 'md',
			},
			{
				label       : 'Terminal',
				name        : 'terminal_id',
				type        : 'select',
				placeholder : 'Type here...',
				span        : 4,
				size        : 'md',
				...terminalOptions,
				// rules       : { required: 'Required' },
			},
			{
				label       : 'Arrival voyage number',
				name        : 'arrival_voyage_number',
				type        : 'text',
				placeholder : 'Type here...',
				span        : 4,
				size        : 'md',
				// rules       : { required: 'Required' },
			},
			{
				label       : 'Departure voyage number',
				name        : 'departure_voyage_number',
				span        : 4,
				type        : 'text',
				placeholder : 'Type here...',
				size        : 'md',
				// rules       : { required: 'Required' },
			},
		],
	}],
}
);

export default controls;
