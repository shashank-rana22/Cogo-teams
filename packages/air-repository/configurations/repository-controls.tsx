const repositoryControls = () => ({
	basic: [
		{
			name        : 'airline_id',
			type        : 'async-select',
			asyncKey    : 'list_operators',
			label       : 'Select Airline',
			placeholder : 'Select Airline...',
			span        : 6,
			rules       : {
				required: true,
			},
		},
		{
			name        : 'mode',
			type        : 'select',
			label       : 'Select Mode',
			placeholder : 'Choose Email/Platform',
			options     : [
				{ value: 'email', label: 'E-mail' },
				{ value: 'platform', label: 'Platform' },
				{ value: 'email_and_platform', label: 'E-mail/Platform' },
			],
			span  : 6,
			rules : {
				required: true,
			},
		},
	],
	email: [
		{
			name        : 'poc_name',
			type        : 'text',
			label       : 'Airline Person(POC)',
			placeholder : 'Enter name',
			span        : 6,
			rules       : {
				required: true,
			},
		},
		{
			name        : 'email',
			type        : 'text',
			label       : 'Airline E-mail ID',
			placeholder : 'Enter email',
			span        : 6,
			rules       : {
				required: true,
			},
		},
	],
	platform: [
		{
			name        : 'platform_url',
			type        : 'text',
			label       : 'Enter Platform URL',
			placeholder : 'Enter URL',
			span        : 6,
			rules       : {
				required: true,
			},
		},
		{
			name        : 'user_id',
			type        : 'text',
			label       : 'Enter Platform User Id',
			placeholder : 'Enter used id',
			span        : 6,
			rules       : {
				required: true,
			},
		},
		{
			name        : 'password',
			type        : 'text',
			label       : 'Enter Platform Password',
			placeholder : 'Enter password',
			span        : 6,
			rules       : {
				required: true,
			},
		},
	],
});

export default repositoryControls;
