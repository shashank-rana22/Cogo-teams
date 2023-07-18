import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import getChannelWiseRolesFilters from '../helpers/get-channel-wise-roles-filters';
import getEntityOptions from '../helpers/get-entity-options';

const getGeneralConfiguratioFormControls = (props) => {
	const { watchPartner, watchChannel, setSelectedRoles, disabled } = props;

	const controls = [
		{
			name  : 'type',
			label : (
				<>
					Select Objective Type
					<sup style={{ color: 'red' }}>*</sup>
				</>
			),
			type        : 'select',
			placeholder : 'Objective Type',
			options     : [
				{
					label : 'Company',
					value : 'company',
				},
				{
					label : 'Team',
					value : 'team',
				},
			],
			rules: {
				required: 'Objective Type is required',
			},
			disabled,
		},
		{
			name  : 'name',
			label : (
				<>
					Objective Name
					<sup style={{ color: 'red' }}>*</sup>
				</>
			),
			type        : 'text',
			placeholder : 'Objective Name',
			rules       : {
				required: 'Objective Name is required',
			},
			disabled,
		},
		{
			name  : 'partner',
			label : (
				<>
					Select Cogo Entity
					<sup style={{ color: 'red' }}>*</sup>
				</>
			),
			placeholder : 'Cogo Entity',
			type        : 'select',
			options     : getEntityOptions(),
			rules       : {
				required: 'Cogo Entity is required',
			},
			disabled,
		},
		{
			name  : 'channel',
			label : (
				<>
					Select Channel
					<sup style={{ color: 'red' }}>*</sup>
				</>
			),
			type        : 'multiSelect',
			placeholder : 'Channel',
			options     : [
				{
					label : 'SME',
					value : 'sme',
				},
				{
					label : 'Enterprise',
					value : 'enterprise',
				},
				{
					label : 'CP',
					value : 'cp',
				},
			],
			rules: {
				required: 'Channel is required',
			},
			disabled,
		},
		{
			name  : 'roles',
			label : (
				<>
					Select Cogoport Agent Roles
					<sup style={{ color: 'red' }}>*</sup>
				</>
			),
			placeholder : 'Agent Roles',
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'partner_roles',
			initialCall : false,
			params      : {
				permissions_data_required : false,
				filters                   : {
					partner_entity_types : ['cogoport'],
					stakeholder_id       : !isEmpty(watchPartner)
						? watchPartner.split('_')[GLOBAL_CONSTANTS.zeroth_index] : undefined,
					role_sub_functions : getChannelWiseRolesFilters({ channels: watchChannel }),
					status             : 'active',
				},
			},
			rules: {
				required: 'Roles is required',
			},
			onChange: (_, selectedRoles) => {
				setSelectedRoles(selectedRoles?.map((role) => ({ id: role.id, name: role.name })));
			},
			disabled,
		},
	];

	return controls;
};

export default getGeneralConfiguratioFormControls;
