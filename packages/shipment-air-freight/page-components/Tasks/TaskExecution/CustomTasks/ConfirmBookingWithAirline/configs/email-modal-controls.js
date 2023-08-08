const controls = [
	{
		name    : 'cancellation_reason',
		label   : 'Please select a reason for cancelling the shipment',
		type    : 'checkbox',
		span    : 12,
		options : [
			{ label: 'Space not available', value: 'space_not_available' },
			{ label: 'Change in buy price', value: 'change_in_buy_price' },
			{ label: 'Dimensions not available', value: 'dimensions_not_available' },
			{ label: 'Others', value: 'others' },
		],
		rules: {
			required: {
				value   : true,
				message : 'Cancellation reason is required',
			},
		},
	},
];
export default controls;
