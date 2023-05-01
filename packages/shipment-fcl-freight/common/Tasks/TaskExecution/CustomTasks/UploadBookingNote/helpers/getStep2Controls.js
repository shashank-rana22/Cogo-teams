export const bookingNoteNumberControls = [
	{
		name        : 'document_number',
		label       : 'Booking Note Number',
		type        : 'text',
		span        : 12,
		placeholder : 'Type here...',
		rules       : { required: 'Booking Note Number is required' },
		size        : 'sm',
	},
];

export const movementDetailsControls = [
	{
		name               : 'movement_details',
		type               : 'fieldArray',
		initialCount       : 1,
		showDeleteButton   : true,
		noDeleteButtonTill : 1,
		controls           : [
			{
				type           : 'async-select',
				asyncKey       : 'list_locations',
				params         : { filters: { type: ['seaport'] } },
				defaultOptions : true,
				name           : 'from_port_id',
				label          : 'Select origin port',
				placeholder    : 'Search origin...',
				span           : 6,
				rules          : { required: { value: true, message: 'Origin is required' } },
				size           : 'sm',
			},
			{
				type           : 'async-select',
				asyncKey       : 'list_locations',
				params         : { filters: { type: ['seaport'] } },
				defaultOptions : true,
				name           : 'to_port_id',
				label          : 'Select destination port',
				placeholder    : 'Search destination...',
				span           : 6,
				rules          : {
					required: { value: true, message: 'Destination is required' },

				},
				size: 'sm',
			},
			{
				label          : 'Schedule Departure',
				name           : 'schedule_departure',
				type           : 'datepicker',
				showTimeSelect : true,
				span           : 6,
				rules          : {
					required: { value: true, message: 'Schedule departure is required' },
				},
				size: 'sm',
			},
			{
				label          : 'Schedule Arrival',
				name           : 'schedule_arrival',
				type           : 'datepicker',
				showTimeSelect : true,
				span           : 6,
				rules          : {
					required: { value: true, message: 'Schedule arrival is required' },
				},
				size: 'sm',
			},
			{
				name        : 'vessel',
				label       : 'Vessel',
				type        : 'text',
				span        : 6,
				placeholder : 'Vessel Name',
				size        : 'sm',
			},
			{
				name        : 'voyage',
				label       : 'Voyage',
				type        : 'text',
				span        : 6,
				placeholder : 'Type voyage',
				size        : 'sm',
			},
		],
	},
];

export const mainControls = [
	{
		label          : 'VGM Cut-off',
		name           : 'vgm_cutoff',
		type           : 'datepicker',
		showTimeSelect : true,
		span           : 6,
		rules          : {
			required: { value: true, message: 'VGM Cut-off is required' },
		},
		size: 'sm',
	},
	{
		label          : 'S/I Cut-off',
		name           : 'si_cutoff',
		type           : 'datepicker',
		showTimeSelect : true,
		span           : 6,
		rules          : {
			required: { value: true, message: 'S/I Cut-off is required' },
		},
		size: 'sm',
	},
	{
		label          : 'Document Cut-off',
		name           : 'document_cutoff',
		type           : 'datepicker',
		showTimeSelect : true,
		span           : 6,
		rules          : {
			required: { value: true, message: 'Document Cut-off is required' },
		},
		size: 'sm',
	},
	{
		label          : 'Gate-in Cut-off',
		name           : 'gate_in_cutoff',
		type           : 'datepicker',
		showTimeSelect : true,
		span           : 6,
		rules          : {
			required: { value: true, message: 'Gate-in Cut-off is required' },
		},
		size: 'sm',
	},
	{
		label          : 'Booking Note Expiry',
		name           : 'bn_expiry',
		type           : 'datepicker',
		showTimeSelect : true,
		span           : 6,
		rules          : {
			required: { value: true, message: 'Booking Note Expiry is required' },
		},
		size: 'sm',
	},
	{
		label          : 'TR Cut-off',
		name           : 'tr_cutoff',
		type           : 'datepicker',
		showTimeSelect : true,
		span           : 6,
		rules          : {
			required: { value: true, message: 'TR Cut-off is required' },
		},
		size: 'sm',
	},
	{
		label : 'Detention days at origin',
		name  : 'free_days_detention_origin',
		type  : 'number',
		span  : 12,
		rules : {
			required: { value: true, message: 'Detention at origin is required' },
		},
		size: 'sm',
	},
	{
		label : 'Detention days at destination',
		name  : 'free_days_detention_destination',
		type  : 'number',
		span  : 12,
		rules : {
			required: {
				value   : true,
				message : 'Detention at destination is required',
			},
		},
		size: 'sm',
	},
	{
		label : 'Demurrage days at origin',
		name  : 'free_days_demurrage_origin',
		type  : 'number',
		span  : 12,
		rules : {
			required: {
				value   : true,
				message : 'Demurrage at origin is required',
			},
		},
		size: 'sm',
	},
	{
		label : 'Demurrage days at destination',
		name  : 'free_days_demurrage_destination',
		type  : 'number',
		span  : 12,
		rules : {
			required: {
				value   : true,
				message : 'Demurrage at destination is required',
			},
		},
		size: 'sm',
	},
];
