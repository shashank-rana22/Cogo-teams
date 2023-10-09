import CustomSelectOption from '../../../../../../common/CustomSelectOption';

export const FILTERS_DEFAULT_VALUES = {
	airline_id           : [],
	operation_type       : '',
	cargo_readiness_date : '',
	source               : null,
	payment_term         : null,
	offers               : null,
	schedule_type        : '',
};

export const getControls = () => {
	const FILTER_CONTROLS = {
		airline_id: {
			name     : 'airline_id',
			label    : 'Airline',
			controls : [
				{
					name        : 'airline_id',
					label       : 'Select Airline',
					multiple    : true,
					type        : 'async-select',
					asyncKey    : 'list_operators',
					span        : 12,
					isClearable : true,
					renderLabel : (option = {}) => CustomSelectOption({ option, key: 'airlines' }),
				},
			],
		},
		operation_type: {
			name     : 'operation_type',
			label    : 'Operation Type',
			controls : [
				{
					name    : 'operation_type',
					label   : 'Flight Operation Type',
					type    : 'chips',
					options : [
						{
							label : 'Passenger',
							value : 'passenger',
						},
						{
							label : 'Freighter',
							value : 'freighter',
						},
						{
							label : 'Charter',
							value : 'charter',
						},
					],
				},
			],
		},
		cargo_readiness_date: {
			name     : 'cargo_readiness_date',
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
		payment_term: {
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
		offers: {
			name     : 'offers',
			label    : 'Offers Available',
			controls : [
				{
					name    : 'offers',
					type    : 'chips',
					options : [
						{
							label : 'All',
							value : null,
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
		schedule_type: {
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
							value : 'transhipment',
						},
					],
				},
			],
		},
	};
	return FILTER_CONTROLS;
};
