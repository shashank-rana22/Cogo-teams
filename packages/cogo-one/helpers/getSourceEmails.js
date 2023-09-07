import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import getCommmonAgentType from '../utils/getCommonAgentType';
import { COGOVERSE_AGENT_MAPPINGS } from '../utils/getViewTypeFromWorkPreferences';

const getSourceEmails = ({
	configData = [],
	viewType = '',
}) => {
	const {
		platform_config_constant_mappings: platformConfig,
	} = configData?.list?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const {
		value: configConstants = {},
	} = platformConfig?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const agentType = getCommmonAgentType({ viewType }) || viewType;

	let reqRoles = [];

	if (agentType === 'cogoone_admin') {
		reqRoles = Object.values(COGOVERSE_AGENT_MAPPINGS).reduce(
			(acc, itm) => [
				...acc,
				...itm,
			],
			reqRoles,
		);
	} else {
		reqRoles = [
			...(COGOVERSE_AGENT_MAPPINGS?.[agentType] || []),
			...(COGOVERSE_AGENT_MAPPINGS?.[viewType] || []),
		];
	}

	const finalRoles = [...new Set(reqRoles)];

	const allAllowedEmails = finalRoles.reduce(
		(acc, itm) => {
			const newItms = configConstants?.[itm]?.value?.emails?.value || [];

			return [
				...acc,
				...newItms,
			];
		},
		[],
	);

	const filteredEmails = [...new Set(allAllowedEmails)];

	return filteredEmails.map(
		(email) => ({
			value : email,
			label : email,
		}),
	);
};

export default getSourceEmails;
