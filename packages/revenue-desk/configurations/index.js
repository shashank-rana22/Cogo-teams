const controls = {
	feedbackDesc: {
		name        : 'communication_summary',
		type        : 'textarea',
		rows        : 5,
		placeholder : 'Enter Remark',
		rules       : { required: 'Required' },
	},
	bb: {
		label       : 'Who did you escalate it to?',
		name        : 'who_escalate',
		type        : 'select',
		span        : 7,
		placeholder : 'Select Supply Agent',
	},
};
export default controls;
