const EXTRA_FILTERS = {
	detention: {
		label    : 'Detention & Demurrage Details',
		controls : [
			{
				name : 'detention_demurrage',
				type : 'detention-demurrage',
				span : 12,
			},
		],
	},
	operator: {
		label    : 'Operator Type',
		controls : [
			{
				name    : 'operator_type',
				type    : 'chips',
				options : [
					{
						label : 'All',
						value : 'all',
					},
					{
						label : 'Shipping Line',
						value : 'shipping_line',
					},
					{
						label : 'NVOCC',
						value : 'nvocc',
					},
				],
			},
		],
	},
	readiness_date: {
		label    : 'Cargo Readiness Date',
		controls : [
			{
				name       : 'cargo_readiness_date',
				label      : 'Pick a Date',
				type       : 'datepicker',
				dateFormat : 'dd-MM-yyyy',
				span       : 12,
			},
		],
	},
	rate_type: {
		label    : 'Rate Type',
		controls : [
			{
				name    : 'rate_type',
				type    : 'chips',
				options : [
					{
						label : 'All',
						value : 'all',
					},
					{
						label : 'System Rate',
						value : 'system_rate',
					},
					{
						label : 'Spot Booking',
						value : 'spot_booking',
					},
				],
			},
		],
	},
	payment_type: {
		label    : 'Payment Terms',
		controls : [
			{
				name    : 'payment_terms',
				type    : 'chips',
				options : [
					{
						label : 'All',
						value : 'all',
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
	offers: {
		label    : 'Offers Available',
		controls : [
			{
				name    : 'offers',
				type    : 'chips',
				options : [
					{
						label : 'All',
						value : 'all',
					},
					{
						label : 'Yes',
						value : 'yes',
					},
					{
						label : 'No',
						value : 'no',
					},
				],
			},
		],
	},
};

export default EXTRA_FILTERS;
