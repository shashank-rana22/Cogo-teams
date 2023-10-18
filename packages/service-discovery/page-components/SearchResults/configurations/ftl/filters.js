export const DEFAULT_VALUES = {
	source: null,
};

export const getFtlControls = () => {
	const controls = [
		{
			name     : 'source',
			label    : 'Rate type',
			controls : [
				{
					name    : 'source',
					type    : 'chips',
					options : [
						{
							label : 'All',
							value : null,
						},
						{
							label : 'Cogo Assured',
							value : 'cogo_assured_rate',
						},
						{
							label : 'System Rate',
							value : 'system_rate',
						},
						{
							label : 'Promotional',
							value : 'promotional',
						},
						{
							label : 'Spot Booking',
							value : 'spot_booking',
						},
						{
							label : 'Contract',
							value : 'contract',
						},
					],
				},
			],
		},
	];

	return controls;
};
