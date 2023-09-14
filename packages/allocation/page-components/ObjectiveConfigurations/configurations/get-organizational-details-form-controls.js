import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import RenderListLocationOption from '../../../common/RenderListLocationOption';
import getSeparatedIdData from '../helpers/get-separated-id-data';

const getOrganizationalDetailsControls = (props) => {
	const { watchCountries, watchStates, watchCities, disabled, t = () => {} } = props;

	const controls = [
		{
			name        : 'country',
			label       : t('allocation:select_country_of_registration'),
			placeholder : t('allocation:country'),
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
			label       : t('allocation:select_state_of_registration'),
			placeholder : t('allocation:state'),
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
			label       : t('allocation:select_city_of_registration'),
			placeholder : t('allocation:city'),
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
			label       : t('allocation:select_pincode_of_registration'),
			placeholder : t('allocation:pincode'),
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
			label       : t('allocation:select_segment'),
			placeholder : t('allocation:segment_label'),
			type        : 'multiSelect',
			options     : [
				{
					label : t('allocation:long_tail'),
					value : 'long_tail',
				},
				{
					label : t('allocation:mid_size'),
					value : 'mid_size',
				},
				{
					label : t('allocation:enterprise'),
					value : 'enterprise',
				},
				{
					label : t('allocation:channel_partner'),
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
