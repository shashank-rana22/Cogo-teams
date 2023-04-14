const raiseTicketControls = [
	{
		label : 'Reason for raising a ticket',
		name  : 'ticket_type',
		type  : 'chips',
		rules : {
			required: 'This is Required',
		},
		options: [
			{ value: 'shipment', label: 'Shipment' },
			{ value: 'invoice_payment', label: 'Invoice payment' },
			{ value: 'platform_glitch', label: 'Platform glitch' },
			{ value: 'introductory', label: 'Introductory' },
			{ value: 'rate_inquiry', label: 'Rate Inquiry' },
		],
	},
	{
		label       : 'Add Invoice ID',
		name        : 'invoice_id',
		type        : 'input',
		placeholder : 'Type here...',
		size        : 'md',
	},
	{
		label       : 'Describe ticket issue',
		name        : 'description',
		type        : 'textarea',
		placeholder : 'Type here...',
		rows        : 5,
	},
];
export default raiseTicketControls;
