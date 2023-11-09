import CustomSelectOption from '../../../../common/CustomSelectOption';

export const getDefaultValues = () => ({
	shipping_line_id : [],
	operator_type    : null,
	rate_type        : null,
	payment_term     : null,
	schedule_type    : '',
	// transit_time     : [transitTime?.min, transitTime?.max],
});

export const getFclControls = ({ id = '' }) => {
	const controls = [
		{
			name     : 'shipping_line_id',
			label    : 'Shipping Line',
			controls : [
				{
					name        : 'shipping_line_id',
					label       : 'Select Shipping Line',
					multiple    : true,
					type        : 'async-select',
					asyncKey    : 'list_spot_search_operators',
					initialCall : true,
					span        : 12,
					renderLabel : (option = {}) => CustomSelectOption({ option, key: 'shipping-lines' }),
					isClearable : true,
					params      : {
						pagination_data_required : false,
						spot_search_id           : id,
						page_limit               : 100,
					},
				},
			],
		},
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
							label : 'Cogo Assured',
							value : 'cogo_assured',
						},
						{
							label : 'Market Place',
							value : 'market_place',
						},
						{
							label : 'Promotional',
							value : 'promotional',
						},
						{
							label : 'Spot Booking',
							value : 'spot_booking',
						},
					],
				},
			],
		},
		{
			name     : 'payment_term',
			label    : 'Payment Terms',
			controls : [
				{
					name    : 'payment_term',
					type    : 'chips',
					options : [
						{
							label : 'All',
							value : null,
						},
						{
							label : 'Prepaid',
							value : 'prepaid',
						},
						{
							label : 'Collect',
							value : 'collect',
						},
					],
				},
			],
		},
		{
			name     : 'schedule_type',
			label    : 'Shipment Type',
			controls : [
				{
					name    : 'schedule_type',
					type    : 'chips',
					options : [
						{
							label : 'Direct-Shipment',
							value : 'direct',
						},
						{
							label : 'Trans-Shipment',
							value : 'transshipment',
						},
					],
				},
			],
		},
		// ...(transitTime?.min !== transitTime?.max
		// 	? [{
		// 		name     : 'transit_time',
		// 		label    : 'Transit Time',
		// 		controls : [
		// 			{
		// 				name        : 'transit_time',
		// 				label       : 'Transit Time Range (in Days)',
		// 				type        : 'range-slider',
		// 				sliderWidth : '80%',
		// 				min         : transitTime?.min,
		// 				max         : transitTime?.max,
		// 				step        : 1,
		// 			},
		// 		],
		// 	}] : []),
	];

	return controls;
};
