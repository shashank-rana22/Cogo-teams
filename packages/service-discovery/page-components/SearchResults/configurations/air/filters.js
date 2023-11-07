import { isEmpty } from '@cogoport/utils';

import CustomSelectOption from '../../../../common/CustomSelectOption';

export const defaultValues = {
	airline_id : [],
	rate_type  : null,
};

export const getAirControls = ({ airlines = [], airlineParams = {}, setAirlineParams = () => {} }) => {
	const controls = [
		{
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
							label : 'Market Place',
							value : 'market_place',
						},
						{
							label : 'Non Tariff',
							value : 'non_tariff_rate',
						},
						{
							label : 'Promotional',
							value : 'promotional',
						},
					],
				},
			],
		},
	];
	return controls;
};
