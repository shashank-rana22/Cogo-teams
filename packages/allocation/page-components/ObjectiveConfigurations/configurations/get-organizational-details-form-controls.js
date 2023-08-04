import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import RenderListLocationOption from '../../../common/RenderListLocationOption';
import getSeparatedIdData from '../helpers/get-separated-id-data';

const getOrganizationalDetailsControls = (props) => {
	const { watchCountries, watchStates, watchCities, disabled } = props;

	const controls = [
		{
			name        : 'country',
			label       : 'Select Country of Registration',
			placeholder : 'Country',
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'list_locations',
			valueKey    : 'value',
			filterKey   : 'id',
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
			setFilterValue : ({ value }) => value.split('_')?.[GLOBAL_CONSTANTS.zeroth_index],
			renderLabel    : (item) => <RenderListLocationOption item={item} />,
			disabled,
		},
		{
			name        : 'state',
			label       : 'Select State of Registration',
			placeholder : 'State',
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'list_locations',
			valueKey    : 'value',
			filterKey   : 'id',
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
			setFilterValue : ({ value }) => value.split('_')?.[GLOBAL_CONSTANTS.zeroth_index],
			disabled       : disabled || isEmpty(watchCountries),
			renderLabel    : (item) => <RenderListLocationOption item={item} />,
		},
		{
			name        : 'city',
			label       : 'Select City of Registration',
			placeholder : 'City',
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'list_locations',
			valueKey    : 'value',
			filterKey   : 'id',
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
			setFilterValue : ({ value }) => value.split('_')?.[GLOBAL_CONSTANTS.zeroth_index],
			disabled       : disabled || isEmpty(watchStates),
			renderLabel    : (item) => <RenderListLocationOption item={item} />,
		},
		{
			name        : 'pincode',
			label       : 'Select Pincode of Registration',
			placeholder : 'Pincode',
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'list_locations',
			valueKey    : 'value',
			filterKey   : 'id',
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
			setFilterValue : ({ value }) => value.split('_')?.[GLOBAL_CONSTANTS.zeroth_index],
			disabled       : disabled || isEmpty(watchCities),
			renderLabel    : (item) => <RenderListLocationOption item={item} />,
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
