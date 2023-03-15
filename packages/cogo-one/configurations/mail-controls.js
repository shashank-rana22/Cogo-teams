const controls = {
	to: {
		label       : 'TO',
		name        : 'to',
		type        : 'email',
		placeholder : 'Enter recipient',
		rules       : {
			required: 'This is Requied',
		},

	},
	cc_bcc: {
		label       : 'CC/BCC, From',
		name        : 'cc_bcc',
		type        : 'email',
		placeholder : 'Enter cc or bcc recipient',
		rules       : {
			required: 'This is Requied',
		},

	},
};

export default controls;
