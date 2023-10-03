import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';

import LEADERBOARD_REPORT_TYPE_CONSTANTS from '../../../constants/leaderboard-reporttype-constants';
import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../constants/leaderboard-viewtype-constants';
import getEntityNameById from '../../../utils/get-entity-name-by-id';

const { ADMIN, OWNER, MANAGER } = LEADERBOARD_VIEWTYPE_CONSTANTS;
const { ADMIN_REPORT, OWNER_REPORT, MANAGER_REPORT, AGENT_REPORT } = LEADERBOARD_REPORT_TYPE_CONSTANTS;

const getLeftPanelHeading = ({ currLevel, entity, viewType, selfRoleData, levelStack }) => {
	let actualCurrLevel = currLevel;

	if (actualCurrLevel.report_type === AGENT_REPORT) {
		let i = 0;
		while (i < levelStack?.length) {
			actualCurrLevel = levelStack[i];
			if (actualCurrLevel.report_type !== AGENT_REPORT) {
				break;
			}
			i += GLOBAL_CONSTANTS.one;
		}
	}

	const { report_type, user, location_name, channel } = actualCurrLevel;

	const { name: roleName = '' } = selfRoleData || {};

	const { name } = user || {};

	let heading = '';

	switch (viewType) {
		case ADMIN:
			if (report_type === ADMIN_REPORT) {
				heading = getEntityNameById(entity);
			} else if (report_type === OWNER_REPORT) {
				if (isEmpty(user)) {
					if (location_name) {
						heading = `${startCase(location_name || '')} Team`;
					} else if (channel) {
						heading = `${channel.toUpperCase()} Team`;
					}
				} else {
					heading = `${name}'s Team`;
				}
			} else {
				heading = `${name}'s Team`;
			}
			break;
		case OWNER:
			if (report_type === OWNER_REPORT) {
				if (isEmpty(user)) {
					heading = roleName;
				} else {
					heading = 'Your Team';
				}
			} else if (report_type === MANAGER_REPORT) {
				heading = `${name}'s Team`;
			} else {
				heading = `${name}'s Team`;
			}
			break;
		case MANAGER:
			if (report_type === MANAGER_REPORT) {
				if (isEmpty(user)) {
					heading = roleName;
				} else {
					heading = 'Your Team';
				}
			} else {
				heading = 'Your Team';
			}
			break;
		default:
			heading = roleName;
	}

	return heading;
};

export default getLeftPanelHeading;