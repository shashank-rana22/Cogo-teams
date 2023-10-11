import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getLeaderboardFilterControls = () => {
	const controls = [
		{
			name    : 'offices',
			label   : 'Offices',
			type    : 'multiSelect',
			options : [],
		},
		{
			name    : 'channel',
			label   : 'Channel',
			type    : 'multiSelect',
			options : [
				{
					label : 'SME',
					value : 'sme',
				},
				{
					label : 'Enterprise',
					value : 'enterprise',
				},
				{
					label : 'Channel Partner',
					value : 'channel_partner',
				},
			],
		},
		{
			name        : 'role_ids',
			label       : 'Role',
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'partner_roles',
			initialCall : true,
			params      : {
				permissions_data_required : false,
				filters                   : {
					partner_entity_types : ['cogoport'],
					status               : true,
					stakeholder_id       : Object.values(GLOBAL_CONSTANTS.cogoport_entities).map((entity) => entity.id),
				},
			},
		},
		{
			name        : 'user_ids',
			label       : 'By Agent/TL/Manager Name',
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'partner_users',
			initialCall : true,
			valueKey    : 'user_id',
			params      : {
				filters: {
					partner_entity_types: ['cogoport'],
				},
			},
		},
	];

	return controls;
};

export default getLeaderboardFilterControls;
