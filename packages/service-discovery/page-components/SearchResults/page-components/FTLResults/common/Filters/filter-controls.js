export const FILTERS_DEFAULT_VALUES = {
	source: null,
};

export const getControls = ({ transitTime = {} }) => {
	const FILTER_CONTROLS = {
		source: {
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
		...(transitTime.min !== transitTime.max ? {
			transit_time: {
				name     : 'transit_time',
				label    : 'Transit Time',
				controls : [
					{
						name        : 'transit_time',
						type        : 'range-slider',
						sliderWidth : '80%',
						min         : transitTime.min,
						max         : transitTime.max,
					},
				],
			},
		} : {}),
	};
	return FILTER_CONTROLS;
};
