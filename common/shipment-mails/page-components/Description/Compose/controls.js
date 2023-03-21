const controls = [
	{
		name        : 'toUserEmail',
		placeholder : 'put comma (,) seperated multiple emails',
		rules       : { required: 'Emails are required' },
	},
	{
		name        : 'ccrecipients',
		placeholder : 'put comma (,) seperated multiple emails',
	},
	{
		name        : 'subject',
		placeholder : 'Enter subject...',
		rules       : { required: 'Subject is required' },
	},
	{
		name        : 'entity_type',
		placeholder : 'Select Mail type...',
		rules       : { required: 'Mail type is required' },
	},
];

export default controls;
