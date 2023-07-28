import { isEmpty } from '@cogoport/utils';

import CHANNEL_WISE_ROLES_SUB_FUNCTIONS_FILTER_MAPPING from '../constants/channel-wise-role-sub-function-mapping';

const getChannelWiseRolesFilters = ({ channels }) => {
	if (isEmpty(channels)) return undefined;

	let applicableRoleSubFunctions = [];
	channels.forEach((channel) => {
		const roleSubFunctions = CHANNEL_WISE_ROLES_SUB_FUNCTIONS_FILTER_MAPPING[channel] || [];

		applicableRoleSubFunctions = [...applicableRoleSubFunctions, ...roleSubFunctions];
	});

	return isEmpty(applicableRoleSubFunctions) ? undefined : applicableRoleSubFunctions;
};

export default getChannelWiseRolesFilters;
