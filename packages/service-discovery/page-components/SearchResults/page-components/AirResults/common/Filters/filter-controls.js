import { addDays } from '@cogoport/utils';

const ONE = 1;

export const FILTERS_DEFAULT_VALUES = {
	shipping_line_id     : [],
	operator_type        : null,
	cargo_readiness_date : addDays(new Date(), ONE),
	source               : null,
	payment_term         : null,
	offers               : null,
	schedule_type        : '',
};

export const FILTER_CONTROLS = {
	shipping_line_id: {
		name     : 'shipping_line_id',
		label    : 'Shipping Airline',
		controls : [
			{
				name        : 'shipping_line_id',
				label       : 'Select Shipping Line',
				multiple    : true,
				type        : 'async-select',
				asyncKey    : 'list_operators',
				initialCall : true,
				span        : 12,
				isClearable : true,
			},
		],
	},
	operator_type: {
		name     : 'operator_type',
		label    : 'Operator Type',
		controls : [
			{
				name    : 'operator_type',
				type    : 'chips',
				options : [
					{
						label : 'All',
						value : null,
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
						value : 'trans',
					},
				],
			},
		],
	},
};
