import { IcMLocation } from '@cogoport/icons-react';

import CustomSelectOption from '../../../../../../common/CustomSelectOption';
import MODES from '../../../configurations/modes.json';

const getFormControls = ({ mode = '' }) => {
	let type = [];

	MODES.forEach((modeItem) => {
		if (modeItem.value === mode) type = modeItem.type;
	});

	const controls = [
		{
			name        : 'origin_location_id',
			type        : 'async-select',
			label       : 'Origin Point',
			placeholder : 'City, Port or Pin ',
			asyncKey    : 'list_locations',
			initialCall : false,
			params      : {
				page_limit      : 20,
				includes        : { country: true, default_params_required: true },
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
			label       : 'Destination Point',
			placeholder : 'City, Port or Pin ',
			asyncKey    : 'list_locations',
			initialCall : false,
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

export default getFormControls;
