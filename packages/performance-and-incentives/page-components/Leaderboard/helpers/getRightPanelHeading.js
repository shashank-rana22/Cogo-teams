import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty, startCase } from '@cogoport/utils';

import LEADERBOARD_REPORT_TYPE_CONSTANTS from '../../../constants/leaderboard-reporttype-constants';
import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../constants/leaderboard-viewtype-constants';
import getEntityNameById from '../../../utils/get-entity-name-by-id';

const { ADMIN, OWNER, MANAGER } = LEADERBOARD_VIEWTYPE_CONSTANTS;
const { ADMIN_REPORT, OWNER_REPORT, MANAGER_REPORT, AGENT_REPORT } = LEADERBOARD_REPORT_TYPE_CONSTANTS;

const getRightPanelHeading = ({ currLevel, entity, viewType, levelStack }) => {
	const actualCurrLevel = (currLevel.isExpanded && isEmpty(currLevel.user))
		? levelStack[GLOBAL_CONSTANTS.zeroth_index] : currLevel;

	const { report_type, user, location_name, channel } = actualCurrLevel || {};

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
			} else if (report_type === AGENT_REPORT) {
				if (!isEmpty(user)) {
					heading = user.name;
				} else {
					heading = `${name}'s Team`;
				}
			} else {
				heading = `${name}'s Team`;
			}
			break;
		case OWNER:
			if (report_type === OWNER_REPORT) {
				heading = 'Your Team';
			} else if (report_type === MANAGER_REPORT) {
				heading = `${name}'s Team`;
			} else {
				heading = user.name;
			}
			break;
		case MANAGER:
			if (report_type === MANAGER_REPORT) {
				heading = 'Your Team';
			} else {
				heading = user.name;
			}
			break;
		default:
			heading = 'Your Activity';
	}

	return heading;
};

export default getRightPanelHeading;
