import { isEmpty } from '@cogoport/utils';

import RenderListLocationOption from '../../../common/RenderListLocationOption';
import getSeparatedIdData from '../helpers/get-separated-id-data';

const getOrganizationalDetailsControls = (props) => {
	const { watchCountries, watchStates, watchCities, disabled } = props;

	const controls = [
		{
			name        : 'countries',
			label       : 'Select Country',
			placeholder : 'Country',
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'list_locations',
			valueKey    : 'value',
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
			disabled,
		},
		{
			name        : 'states',
			label       : 'Select State',
			placeholder : 'State',
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'list_locations',
			valueKey    : 'value',
			initialCall : false,
			params      : {
				filters: {
					type       : 'region',
					status     : 'active',
					country_id : getSeparatedIdData({ values: watchCountries })?.map((item) => item.id),
				},
				page_limit : 10,
				sort_by    : 'name',
				sort_type  : 'asc',
				includes   : { country: null, default_params_required: true },
			},
			isClearable        : true,
			getModifiedOptions : ({ options }) => options.map(
				(option) => ({ ...option, value: `${option.id}_${option.name}` }),
			),
			disabled    : disabled || isEmpty(watchCountries),
			renderLabel : (item) => <RenderListLocationOption item={item} />,
		},
		{
			name        : 'cities',
			label       : 'Select City',
			placeholder : 'City',
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'list_locations',
			valueKey    : 'value',
			initialCall : false,
			params      : {
				filters: {
					type      : 'city',
					status    : 'active',
					region_id : getSeparatedIdData({ values: watchStates })?.map((item) => item.id),
				},
				page_limit : 10,
				sort_by    : 'name',
				sort_type  : 'asc',
				includes   : { country: null, default_params_required: true },
			},
			isClearable        : true,
			getModifiedOptions : ({ options }) => options.map(
				(option) => ({ ...option, value: `${option.id}_${option.name}` }),
			),
			disabled    : disabled || isEmpty(watchStates),
			renderLabel : (item) => <RenderListLocationOption item={item} />,
		},
		{
			name        : 'pincodes',
			label       : 'Select Pincode',
			placeholder : 'Pincode',
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'list_locations',
			valueKey    : 'value',
			initialCall : false,
			params      : {
				filters: {
					type    : 'pincode',
					status  : 'active',
					city_id : getSeparatedIdData({ values: watchCities })?.map((item) => item.id),
				},
				page_limit : 10,
				sort_by    : 'name',
				sort_type  : 'asc',
				includes   : { country: null, default_params_required: true },
			},
			isClearable        : true,
			getModifiedOptions : ({ options }) => options.map(
				(option) => ({ ...option, value: `${option.id}_${option.postal_code}` }),
			),
			disabled    : disabled || isEmpty(watchCities),
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
			disabled,
		},
	];

	return controls;
};

export default getOrganizationalDetailsControls;
