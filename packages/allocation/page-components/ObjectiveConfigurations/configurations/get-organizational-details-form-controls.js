import { isEmpty } from '@cogoport/utils';

import RenderListLocationOption from '../../../common/RenderListLocationOption';

const getOrganizationalDetailsControls = (props) => {
	const { watchCountryIds, watchStateIds, watchCityIds } = props;

	const controls = [
		{
			name        : 'country_ids',
			label       : 'Select Country',
			placeholder : 'Country',
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'list_locations',
			initialCall : false,
			params      : {
				filters    : { type: 'country', status: 'active' },
				page_limit : 10,
				sort_by    : 'name',
				sort_type  : 'asc',
				includes   : { country: null, default_params_required: true },
			},
			isClearable        : true,
			getModifiedOptions : ({ options }) => options.map(
				(option) => ({ ...option, value: `${option.id}_${option.name}` }),
			),
			renderLabel: (item) => <RenderListLocationOption item={item} />,
		},
		{
			name        : 'state_ids',
			label       : 'Select State',
			placeholder : 'State',
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'list_locations',
			initialCall : false,
			params      : {
				filters    : { type: 'region', status: 'active', country_id: watchCountryIds },
				page_limit : 10,
				sort_by    : 'name',
				sort_type  : 'asc',
				includes   : { country: null, default_params_required: true },
			},
			isClearable        : true,
			getModifiedOptions : ({ options }) => options.map(
				(option) => ({ ...option, value: `${option.id}_${option.name}` }),
			),
			disabled    : isEmpty(watchCountryIds),
			renderLabel : (item) => <RenderListLocationOption item={item} />,
		},
		{
			name        : 'city_ids',
			label       : 'Select City',
			placeholder : 'City',
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'list_locations',
			initialCall : false,
			params      : {
				filters    : { type: 'city', status: 'active', region_id: watchStateIds },
				page_limit : 10,
				sort_by    : 'name',
				sort_type  : 'asc',
				includes   : { country: null, default_params_required: true },
			},
			isClearable        : true,
			getModifiedOptions : ({ options }) => options.map(
				(option) => ({ ...option, value: `${option.id}_${option.name}` }),
			),
			disabled    : isEmpty(watchStateIds),
			renderLabel : (item) => <RenderListLocationOption item={item} />,
		},
		{
			name        : 'pincode_ids',
			label       : 'Select Pincode',
			placeholder : 'Pincode',
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'list_locations',
			initialCall : false,
			params      : {
				filters    : { type: 'pincode', status: 'active', city_id: watchCityIds },
				page_limit : 10,
				sort_by    : 'name',
				sort_type  : 'asc',
				includes   : { country: null, default_params_required: true },
			},
			isClearable        : true,
			getModifiedOptions : ({ options }) => options.map(
				(option) => ({ ...option, value: `${option.id}_${option.name}` }),
			),
			disabled    : isEmpty(watchCityIds),
			renderLabel : (item) => <RenderListLocationOption item={item} />,
		},
		{
			name        : 'segments',
			label       : 'Select Segment',
			placeholder : 'Segment',
			type        : 'multiSelect',
			options     : [
				{
					label : 'Long Tail',
					value : 'long_tail',
				},
				{
					label : 'Mid Size',
					value : 'mid_size',
				},
				{
					label : 'Enterprise',
					value : 'enterprise',
				},
				{
					label : 'Channel Partner',
					value : 'cp',
				},
			],
			isClearable: true,
		},
	];

	return controls;
};

export default getOrganizationalDetailsControls;
