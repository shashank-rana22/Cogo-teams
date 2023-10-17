import { isEmpty } from '@cogoport/utils';

import CustomSelectOption from '../../../../../../common/CustomSelectOption';

export const FILTERS_DEFAULT_VALUES = {
	airline_id   : [],
	source       : null,
	payment_term : null,
};

export const getControls = ({ airlines = [], airlineParams = {}, setAirlineParams = () => {} }) => {
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
					initialCall : !isEmpty(airlineParams),
					onSearch    : (val) => {
						if (val) {
							setAirlineParams({});
						} else {
							setAirlineParams({
								filters: {
									id: airlines,
								},
							});
						}
					},
					span        : 12,
					isClearable : true,
					renderLabel : (option = {}) => CustomSelectOption({ option, key: 'airlines' }),
					...(!isEmpty(airlineParams) ? { params: airlineParams } : {}),
				},
			],
		},
		// operation_type: {
		// 	name     : 'operation_type',
		// 	label    : 'Operation Type',
		// 	controls : [
		// 		{
		// 			name    : 'operation_type',
		// 			label   : 'Flight Operation Type',
		// 			type    : 'chips',
		// 			options : [
		// 				{
		// 					label : 'Passenger',
		// 					value : 'passenger',
		// 				},
		// 				{
		// 					label : 'Freighter',
		// 					value : 'freighter',
		// 				},
		// 				{
		// 					label : 'Charter',
		// 					value : 'charter',
		// 				},
		// 			],
		// 		},
		// 	],
		// },
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
			label    : 'Rate Type',
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
	};
	return FILTER_CONTROLS;
};
