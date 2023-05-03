export const RepositoryFields = {
	fields: [
		{
			key   : 'airline_id',
			label : 'Airlines',
			span  : 0.6,
			func  : 'handleAirline',
		},
		{
			key       : 'mode',
			label     : 'Mode',
			span      : 0.5,
			className : 'right_border',
			func      : 'handleMode',
		},
		{
			key   : 'poc_name',
			label : 'POC Name',
			span  : 0.8,
		},
		{
			key   : 'email',
			label : 'Email ( from airline)',
			span  : 1,
		},
		{
			key   : 'platform_url',
			label : 'Platform URL',
			span  : 1,
			func  : 'handlePlatformURL',
		},
		{
			key   : 'user_id',
			label : 'User Id (Platform)',
			span  : 0.5,
		},
		{
			key   : 'password',
			label : 'Password (Platform)',
			span  : 0.5,
		},
		{
			key   : 'action',
			label : 'Action',
			span  : 0.5,
		},
	],
};
