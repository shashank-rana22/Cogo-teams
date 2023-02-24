const feedbackControls = {
	name           : 'status',
	label          : 'Select Status',
	type           : 'select',
	defaultOptions : true,
	isClearable    : true,
	placeholder    : 'Status',
	options        : [
		{ label: 'Pending', value: 'pending' },
		{ label: 'Submitted', value: 'successful' },
	],
	span: 6,
};

export default feedbackControls;
