const controls = {
	feedbackType: {
		name    : 'title',
		type    : 'chips',
		label   : 'Reason for contact ?',
		rules   : { required: 'Required' },
		options : [
			{
				label : 'Introductory',
				value : 'introductory',
			},
			{
				label : 'Sales',
				value : 'sales',
			},
			{
				label : 'Rate enquiry',
				value : 'rate_enquiry',
			},
			{
				label : 'Other',
				value : 'other',
			},
			{
				label : 'Payment recovery',
				value : 'payment_recovery',
			},
		],
		multiple: false,
	},
	feedbackDesc: {
		name        : 'communication_summary',
		type        : 'textarea',
		rows        : 5,
		placeholder : 'Enter Remark',
		rules       : { required: 'Required' },
	},
};
export default controls;
