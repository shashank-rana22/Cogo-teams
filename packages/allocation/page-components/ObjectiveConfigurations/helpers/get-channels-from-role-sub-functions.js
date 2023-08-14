import { isEmpty } from '@cogoport/utils';

import CHANNEL_WISE_ROLES_SUB_FUNCTIONS_FILTER_MAPPING from '../constants/channel-wise-role-sub-function-mapping';

const getChannelsFromRoleSubFunctions = ({ role_sub_functions }) => {
	if (isEmpty(role_sub_functions) || !Array.isArray(role_sub_functions)) return undefined;

	const channels = new Set();
	role_sub_functions.forEach((subFunction) => {
		Object.entries(CHANNEL_WISE_ROLES_SUB_FUNCTIONS_FILTER_MAPPING).forEach(([channel, roleSubFunctions]) => {
			if (roleSubFunctions.includes(subFunction)) {
				channels.add(channel);
			}
		});
	});

	return [...channels];
};

export default getChannelsFromRoleSubFunctions;
