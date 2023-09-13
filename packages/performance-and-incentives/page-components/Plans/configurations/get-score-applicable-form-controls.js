import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import CHANNEL_OPTIONS from '../constants/select-channel-options';

const getScoreApplicableFormControls = ({ watchCogoEntityId, watchRoleFunction, watchChannel, editApplicability }) => ([
	{
		name        : 'display_name',
		label       : 'Display Name',
		type        : 'text',
		placeholder : 'Enter Name',
		disabled    : !editApplicability,
		rules       : { required: 'Name is required' },
	},
	{
		name        : 'cogo_entity_id',
		label       : 'Select Cogo Entity',
		type        : 'select',
		placeholder : 'Select Cogo Entity',
		options     : Object.values(GLOBAL_CONSTANTS.cogoport_entities).map(
			(entity) => ({ label: entity.name, value: entity.id }),
		),
		disabled : !editApplicability,
		rules    : { required: 'Cogo Entity is required' },
	},
	{
		name    : 'role_function',
		label   : 'Function',
		type    : 'select',
		options : [
			{
				label : 'Sales',
				value : 'sales',
			},
			{
				label : 'Supply',
				value : 'supply',
			},
			{
				label : 'Operations',
				value : 'operations',
			},
			{
				label : 'Finance',
				value : 'finance',
			},
			{
				label : 'training',
				value : 'Training',
			},
			{
				label : 'HR',
				value : 'hr',
			},
			{
				label : 'External',
				value : 'external',
			},
		],
		disabled : !editApplicability,
		rules    : { required: 'Role function is required' },
	},
	{
		name     : 'channel',
		label    : 'Channel',
		type     : 'select',
		options  : CHANNEL_OPTIONS[watchRoleFunction] || [],
		disabled : !editApplicability,
		rules    : { required: 'Channel is required' },
	},
	{
		name        : 'role_ids',
		label       : 'Select Roles',
		type        : 'asyncSelect',
		multiple    : true,
		placeholder : 'Select Roles',
		initialCall : true,
		asyncKey    : 'agent_scoring_eligible_roles',
		params      : {
			stakeholder_id : watchCogoEntityId || undefined,
			functions      : watchRoleFunction ? [watchRoleFunction] : undefined,
			channels       : watchChannel ? [watchChannel] : undefined,
			status         : true,
		},
		disabled : !editApplicability,
		rules    : { required: 'Roles are required' },
	},
]);

export default getScoreApplicableFormControls;
