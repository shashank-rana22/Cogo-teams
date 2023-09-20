const getControls = ({ organization_id = '' }) => {
	const controls = [
		{
			type     : 'fieldArray',
			name     : 'location_pairs',
			controls : [
				{
					type   : 'async_select',
					params : {
						filters: {
							type: [
								'seaport',
								'country',
								'trade',
							],
						},
					},
					span         : 3,
					initiallCall : true,
					asyncKey     : 'list_locations',
					grouped      : [
						'city',
						'country',
					],
					name        : 'origin_location_id',
					label       : 'Origin',
					placeholder : 'Search location...',
					rules       : {
						required: 'Origin is required',
					},
				},
				{
					type   : 'async_select',
					params : {
						filters: {
							type: [
								'seaport',
								'country',
								'trade',
							],
						},
					},
					span         : 3,
					initiallCall : true,
					asyncKey     : 'list_locations',
					grouped      : [
						'city',
						'country',
					],
					caret       : true,
					name        : 'destination_location_id',
					label       : 'Destination',
					placeholder : 'Search location...',
					rules       : {
						required: 'Destination is required',
					},
				},
				{
					name        : 'total_teus',
					label       : 'Total TEUS (yearly)',
					span        : 3,
					type        : 'select',
					placeholder : 'TEUs',
					rules       : {
						required: 'Total TEUS  is required',
					},
					options: [
						{
							label : '0 - 50',
							value : '0 - 50',
						},
						{
							label : '50 - 100',
							value : '50 - 100',
						},
						{
							label : '100 - 500',
							value : '100 - 500',
						},
						{
							label : '500 - 1000',
							value : '500 - 1000',
						},
						{
							label : 'Over 1000+',
							value : 'Over 1000+',
						},
					],
				},
				{
					type         : 'async_select',
					name         : 'user_id',
					label        : 'Select User Name',
					asyncKey     : 'list_organization_users',
					labelKey     : 'name',
					span         : 3,
					initiallCall : true,

					params: {
						filters: {
							organization_id,
						},
					},
				},
			],
		},
	];
	return controls;
};
export default getControls;
