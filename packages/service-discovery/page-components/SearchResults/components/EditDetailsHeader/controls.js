import { IcMLocation, IcMManufacturing, IcMProfile } from '@cogoport/icons-react';

import CustomSelectOption from '../../../../common/CustomSelectOption';
import MODES from '../../../ServiceDiscovery/SpotSearch/configurations/modes.json';

const getFormControls = ({
	organization = '',
	setOrganization = () => {},
	setValue = () => {},
	mode = '',
	origin_id = '',
	destination_id,
}) => {
	let type = [];

	MODES.forEach((modeItem) => {
		if (modeItem.value === mode) type = modeItem.type;
	});

	const controls = [
		{
			name        : 'organization_id',
			type        : 'async-select',
			label       : 'Select an organisation',
			placeholder : 'Select Organisation',
			asyncKey    : 'organizations',
			labelKey    : 'business_name',
			valueKey    : 'id',
			initialCall : false,
			rules       : { required: 'Organisation is required' },
			params      : {
				branches_data_required : true,
				filters                : {
					status       : 'active',
					account_type : 'importer_exporter',
				},
			},
			value    : organization?.organization_id,
			onChange : (val, obj = {}) => {
				const {
					id = '',
					organization_branch_ids = '',
				} = obj;
				setOrganization({
					organization_id        : id,
					organization_branch_id : organization_branch_ids?.[0],
				});
				setValue('user_id', undefined);
			},
			renderLabel : (data) => <>{CustomSelectOption({ data, key: 'organizations' })}</>,
			prefix      : <IcMManufacturing fontSize={16} />,
			isClearable : true,
		},
		{
			name        : 'user_id',
			type        : 'async-select',
			label       : 'Select an user',
			placeholder : 'Select User',
			asyncKey    : 'organization_users',
			labelKey    : 'name',
			valueKey    : 'user_id',
			initialCall : false,
			rules       : { required: 'User name is required' },
			onChange    : (val) => {
				setOrganization((prev) => ({
					...prev,
					user_id: val,
				}));
			},
			params: {
				filters: {
					status                 : 'active',
					organization_id        : organization?.organization_id,
					organization_branch_id : organization?.organization_branch_id,
				},
			},
			value  : organization?.user_id,
			prefix : <IcMProfile fontSize={16} />,
		},
		{
			name        : 'origin_location_id',
			type        : 'async-select',
			label       : 'Origin Point',
			placeholder : 'City, Port or Pin ',
			asyncKey    : 'list_locations',
			initialCall : false,
			params      : {
				page_limit      : 20,
				includes        : { default_params_required: true },
				filters         : { type, status: 'active' },
				recommendations : true,
			},
			value       : origin_id,
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
			value       : destination_id,
			prefix      : <IcMLocation fontSize={16} />,
			isClearable : true,
			rules       : { required: 'Destination is required' },
			renderLabel : (option) => <>{CustomSelectOption({ data: option, key: 'locations' })}</>,
		},
	];
	return controls;
};

export default getFormControls;
