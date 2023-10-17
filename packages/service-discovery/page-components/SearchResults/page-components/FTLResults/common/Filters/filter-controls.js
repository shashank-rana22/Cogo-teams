export const FILTERS_DEFAULT_VALUES = {
	operation_type       : '',
	cargo_readiness_date : '',
	source               : null,
	payment_term         : null,
	offers               : null,
	schedule_type        : '',
};

export const getControls = () => {
	const FILTER_CONTROLS = {
		// cargo_readiness_date: {
		// 	name     : 'cargo_readiness_date',
		// 	label    : 'Cargo Readiness Date',
		// 	controls : [
		// 		{
		// 			name       : 'cargo_readiness_date',
		// 			label      : 'Pick a Date',
		// 			type       : 'datepicker',
		// 			dateFormat : 'dd-MM-yyyy',
		// 			span       : 12,
		// 		},
		// 	],
		// },
		source: {
			name     : 'source',
			label    : 'Source',
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
							label : 'Spot Booking',
							value : 'spot_rates',
						},
					],
				},
			],
		},
	};
	return FILTER_CONTROLS;
};
