import { isEmpty } from '@cogoport/utils';

import SERVICE_TYPE from '../../../../config/service-type.json';

const getTncControls = ({ item = {} }) => {
	let newDesc = [{ terms_and_condition: '' }];

	if (!isEmpty(item?.description)) {
		newDesc = item?.description?.map((des) => ({
			terms_and_condition: des,
		}));
	}
	return [
		{
			name     : 'service',
			label    : 'Service Type',
			type     : 'select',
			value    : item?.service || 'fcl_freight',
			disabled : !!item?.id,
			options  : SERVICE_TYPE,
			span     : 6,
			rules    : { required: true },
		},
		{

			name        : 'shipping_line_id',
			label       : 'Shipping Line',
			type        : 'async_select',
			asyncKey    : 'list_operators',
			value       : item?.shipping_line_id,
			disabled    : !!item?.id,
			placeholder : 'Select Shipping Line',
			initialCall : true,
			span        : 6,
			isClearable : true,
			params      : {
				page_limit : 10,
				sort_by    : 'short_name',
				sort_type  : 'asc',
				filters    : { operator_type: 'shipping_line', status: 'active' },
			},
		},
		{

			name           : 'airline_id',
			label          : 'Airline',
			type           : 'async_select',
			asyncKey       : 'list_operators',
			value          : item?.airline_id,
			disabled       : !!item?.id,
			placeholder    : 'Select Airline',
			defaultOptions : true,
			span           : 6,
			isClearable    : true,
		},
		{
			name        : 'trade_type',
			label       : 'Trade Type',
			type        : 'select',
			value       : item?.trade_type,
			disabled    : !!item?.id,
			placeholder : 'Select Trade Type',
			options     : [],
			span        : 6,
			isClearable : true,
		},
		{

			name        : 'country_id',
			label       : 'Country',
			type        : 'async_select',
			placeholder : 'Select Country Name',
			disabled    : !!item?.id,
			asyncKey    : 'list_locations',
			value       : item?.country_id,
			span        : 6,
			params      : { filters: { type: ['country'] } },
		},

		{
			name        : 'paying_party_country_ids',
			label       : 'Paying Party Country',
			type        : 'async_select',
			asyncKey    : 'list_locations',
			placeholder : 'Select Country Name',
			disabled    : !!item?.id,
			value       : item?.paying_party_country_ids,
			params      : { filters: { type: ['country'] } },
			span        : 6,
			multiple    : true,
		},
		{
			name               : 'description',
			type               : 'fieldArray',
			showAddIcon        : false,
			showLabelOnce      : true,
			noDeleteButtonTill : 1,
			value              : newDesc,
			heading            : 'Terms And Conditions',
			controls           : [
				{
					name        : 'terms_and_condition',
					type        : 'textarea',
					span        : 11,
					placeholder : 'Type Terms And Conditions here',
					rules       : { required: 'This is required' },
				},
			],
		},
	];
};

export default getTncControls;
