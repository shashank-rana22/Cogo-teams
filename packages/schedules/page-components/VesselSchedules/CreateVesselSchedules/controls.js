const controls = (no_of_ports) => ({
	basic: [
		{
			name           : 'shipping_line_id',
			label          : 'Shipping Line',
			type           : 'select',
			optionsListKey : 'shipping-lines',
			placeholder    : 'Select Shipping Line',
			span           : 4,
			size           : 'md',
			// rules          : { required: 'Required' },
		},
		{
			name        : 'vessel_name_id',
			label       : 'Vessel Name',
			type        : 'text',
			placeholder : 'Type here...',
			span        : 4,
			size        : 'md',
			// rules       : { required: 'Required' },
		},
		{
			name        : 'voyage_number',
			label       : 'Voyage Number',
			type        : 'text',
			placeholder : 'Type here...',
			span        : 4,
			size        : 'md',
			// rules       : { required: 'Required' },
		},
		{
			name        : 'vessel_imo',
			label       : 'Vessel IMO',
			type        : 'text',
			placeholder : 'Type here...',
			span        : 4,
			size        : 'md',
			// rules       : { required: 'Required' },
		},
		{
			name        : 'vessel_mmsi',
			label       : 'Vessel MMSI',
			type        : 'text',
			placeholder : 'Type here...',
			span        : 4,
			size        : 'md',
			// rules       : { required: 'Required' },
		},
		{
			name        : 'teu',
			label       : 'TEU (Nominal)',
			type        : 'text',
			placeholder : 'Type here...',
			span        : 4,
			size        : 'md',
			// rules       : { required: 'Required' },
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
		name               : 'ports',
		label              : 'Enter Port Information',
		type               : 'fieldArray',
		buttonText         : 'Add More',
		noDeleteButtonTill : 1,
		controls           : [
			{
				label       : 'Select Stop',
				name        : 'location',
				type        : 'select',
				placeholder : 'Type here...',
				span        : 4,
				size        : 'md',
				// rules       : { required: 'Required' },
			},
			{
				label     		: 'ETA',
				name        : 'eta',
				type        : 'select',
				span        : 4,
				placeholder : 'Type here...',
				size        : 'md',
				// rules       : { required: 'Required' },
			},
			{
				label       : 'ETD',
				name        : 'etd',
				type        : 'select',
				span        : 4,
				placeholder : 'Type here...',
				size        : 'md',
			},
			{
				label       : 'Cutoff 1',
				name        : 'cutoff_1',
				type        : 'text',
				placeholder : 'Type here...',
				span        : 4,
				size        : 'md',
				// rules       : { required: 'Required' },
			},
			{
				label       : 'Cutoff 2',
				name        : 'cutoff_2',
				type        : 'text',
				placeholder : 'Type here...',
				span        : 4,
				size        : 'md',
				// rules       : { required: 'Required' },
			},
			{
				label       : 'Cutoff 3',
				name        : 'cutoff_3',
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
