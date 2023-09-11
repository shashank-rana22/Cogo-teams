const DELAYED_DELIVERY_REASONS = [
	{ label: 'Delivery Address Not Found', value: 'Delivery Address Not Found' },
	{ label: 'Delivery Address Incorrect', value: 'Delivery Address Incorrect' },
	{ label: 'Vehicle Breakdown', value: 'Vehicle Breakdown' },
	{ label: 'Wrong ETA Estimation', value: 'Wrong ETA Estimation' },
	{ label: 'Others', value: 'others' },
];

const getControls = (item) => {
	const controls = [
		{
			name  : 'truck_number',
			span  : 2,
			type  : 'text',
			label : 'Truck Number',
			value : item?.truck_number,
			rules : {
				required: {
					value   : true,
					message : 'Truck Number is required',
				},
			},
			disabled: true,
		},
		{
			name                  : 'unloading_date',
			span                  : 3,
			type                  : 'datepicker',
			label                 : 'Unloading Date',
			showTimeSelect        : true,
			usePortal             : true,
			placeholder           : 'Select',
			isPreviousDaysAllowed : true,
		},

		{
			name  : 'delivery_date',
			span  : 3,
			type  : 'datepicker',
			label : 'Cargo Delivery Date',
			rules : {
				required: {
					value   : true,
					message : 'Cargo Delivery Date is required',
				},
			},
			usePortal             : true,
			placeholder           : 'Select',
			showTimeSelect        : true,
			isPreviousDaysAllowed : true,
		},
		{
			name        : 'distance_covered',
			span        : 3,
			type        : 'number',
			label       : 'Distance Covered (Km)',
			placeholder : 'Distance Covered',
		},
		{
			name    : 'delayed_delivery_reason',
			span    : 2,
			type    : 'select',
			label   : 'Reason',
			options : DELAYED_DELIVERY_REASONS,
			rules   : {
				required: {
					value   : true,
					message : 'Reason is required',
				},
			},
		},
		{
			name  : 'delayed_delivery_remark',
			rows  : 4,
			span  : 2,
			type  : 'textarea',
			label : 'Remark',
		},
		{
			name          : 'image',
			type          : 'file',
			span          : 4,
			label         : 'Upload End Kilometers Image/s',
			size          : 'sm',
			document_type : 'end_km_image',
			multiple      : true,
			accept:
				'image/*,.pdf,.doc,.docx,.xlsx,application/msword,'
				+ 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		},
	];
	return controls;
};
export default getControls;
