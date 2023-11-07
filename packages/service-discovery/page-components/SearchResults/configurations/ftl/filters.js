export const DEFAULT_VALUES = {
	rate_type: null,
};

export const getFtlControls = () => {
	const controls = [
		{
			name     : 'rate_type',
			label    : 'Rate Type',
			controls : [
				{
					name    : 'rate_type',
					type    : 'chips',
					options : [
						{
							label : 'All',
							value : null,
						},
						{
							label : 'Regular',
							value : 'regular_rate',
						},
						{
							label : 'AdHoc',
							value : 'adhoc_rate',
						},
					],
				},
			],
		},
	];

	return controls;
};
