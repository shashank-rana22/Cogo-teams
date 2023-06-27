import { IcMLocation } from '@cogoport/icons-react';

import CustomSelectOption from '../../../../../../common/CustomSelectOption';
import MODES from '../../../configurations/modes.json';

const MODES_ARRAY = [
	'fcl_freight',
	'lcl_freight',
	'air_freight',
	'trailer_freight',
	'haulage_freight',
	'ftl_freight',
	'ltl_freight',
];

const OTHER_ARRAY = ['customs', 'locals'];

const getModesControls = ({ mode = '', label = {}, placeholder = {} }) => {
	let type = [];

	MODES.forEach((modeItem) => {
		if (modeItem.value === mode) type = modeItem.type;
	});

	const controls = [
		{
			name        : 'origin_location_id',
			type        : 'async-select',
			label       : label?.origin,
			placeholder : placeholder?.origin,
			asyncKey    : 'list_locations',
			initialCall : false,
			span        : 6,
			params      : {
				page_limit      : 20,
				includes        : { default_params_required: true },
				filters         : { type, status: 'active' },
				recommendations : true,
			},
			prefix      : <IcMLocation fontSize={16} />,
			isClearable : true,
			rules       : { required: 'Origin is required' },
			renderLabel : (option) => <>{CustomSelectOption({ data: option, key: 'locations' })}</>,
		},
		{
			name        : 'destination_location_id',
			type        : 'async-select',
			label       : label?.destination,
			placeholder : placeholder?.destination,
			asyncKey    : 'list_locations',
			initialCall : false,
			span        : 6,
			params      : {
				page_limit      : 20,
				includes        : { default_params_required: true },
				filters         : { type, status: 'active' },
				recommendations : true,
			},
			prefix      : <IcMLocation fontSize={16} />,
			isClearable : true,
			rules       : { required: 'Destination is required' },
			renderLabel : (option) => <>{CustomSelectOption({ data: option, key: 'locations' })}</>,
		},

	];
	return controls;
};

const getOtherServicesControls = ({ label = {}, placeholder = {} }) => {
	const controls = [
		{
			name        : 'location',
			type        : 'async-select',
			label       : label?.location,
			placeholder : placeholder?.location,
			asyncKey    : 'list_locations',
			initialCall : false,
			span        : 6,
			params      : {
				page_limit      : 20,
				includes        : { default_params_required: true },
				filters         : { type: ['seaport'], status: 'active' },
				recommendations : true,
			},
			prefix      : <IcMLocation fontSize={16} />,
			isClearable : true,
			renderLabel : (option) => <>{CustomSelectOption({ data: option, key: 'locations' })}</>,
			rules       : { required: 'Location is required' },
		},
		{
			name        : 'type',
			type        : 'select',
			label       : label?.type,
			placeholder : placeholder?.type,
			span        : 3,
			options     : [
				{
					label : 'Import',
					value : 'import',
				},
				{
					label : 'Export',
					value : 'export',
				},
			],
			rules: { required: 'Type is required' },
		},
		{
			name        : 'service_type',
			type        : 'select',
			label       : label?.service,
			placeholder : placeholder?.service,
			span        : 3,
			options     : [
				{
					label : 'FCL',
					value : 'fcl_customs',
				},
				{
					label : 'LCL',
					value : 'lcl_customs',
				},
				{
					label : 'AIR',
					value : 'air_customs',
				},
			],
			rules: { required: 'Service is required' },
		},
	];
	return controls;
};

const getFormControls = ({ mode = '', label = {}, placeholder = {} }) => {
	let controlFn = () => {};

	if (MODES_ARRAY.includes(mode)) {
		controlFn = getModesControls;
	} else if (OTHER_ARRAY.includes(mode)) {
		controlFn = getOtherServicesControls;
	}

	return controlFn({ mode, label, placeholder });
};
export default getFormControls;
