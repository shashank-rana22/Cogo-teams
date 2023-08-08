const DELAYED_PICKUP_REASONS = [
	{ label: 'Pickup Address Not Found', value: 'Pickup Address Not Found' },
	{ label: 'Pickup Address Incorrect', value: 'Pickup Address Incorrect' },
	{ label: 'Vendor Unavailable', value: 'Vendor Unavailable' },
	{ label: 'Others', value: 'others' },
];

const getControls = (item, dateObj) => {
	const controls = [
		{
			name     : 'truck_number',
			span     : 2,
			type     : 'text',
			label    : 'Truck Number',
			value    : item?.truck_number,
			disabled : true,
		},
		{
			name                  : 'loading_date',
			span                  : 3,
			type                  : 'datepicker',
			label                 : 'Loading Date',
			minDate               : dateObj?.loadingMinDate,
			maxDate               : dateObj?.loadingMaxDate,
			showTimeSelect        : true,
			usePortal             : true,
			placeholder           : 'Select',
			isPreviousDaysAllowed : true,
		},
		{
			name  : 'pickup_date',
			span  : 3,
			type  : 'datepicker',
			label : 'Cargo picked up at',
			rules : {
				required: {
					value   : true,
					message : 'Cargo picked up at is required',
				},
			},
			minDate               : dateObj?.pickupMinDate,
			usePortal             : true,
			placeholder           : 'Select',
			showTimeSelect        : true,
			isPreviousDaysAllowed : true,
		},
		{
			name          : 'image',
			type          : 'file',
			span          : 4,
			label         : 'Upload Starting Kilometers Image',
			size          : 'sm',
			document_type : 'starting_km_image',
			accept:
				'image/*,.pdf,.doc,.docx,.xlsx,application/msword,'
				+ 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		},
		{
			name    : 'delayed_pickup_reason',
			span    : 2,
			type    : 'select',
			label   : 'Reason',
			options : DELAYED_PICKUP_REASONS,
			rules   : {
				required: {
					value   : true,
					message : 'Reason is required',
				},
			},
		},
		{
			name  : 'delayed_pickup_remark',
			rows  : 4,
			span  : 2,
			type  : 'textarea',
			label : 'Remark',
			rules : dateObj?.DELAYED_PICKUP_REMARK_RULES,
		},
	];
	return controls;
};
export default getControls;
