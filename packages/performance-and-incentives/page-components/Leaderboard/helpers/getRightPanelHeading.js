import { isEmpty, startCase } from '@cogoport/utils';

import LEADERBOARD_REPORT_TYPE_CONSTANTS from '../../../constants/leaderboard-reporttype-constants';
import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../constants/leaderboard-viewtype-constants';
import getEntityNameById from '../../../utils/get-entity-name-by-id';

const { ADMIN, OWNER, MANAGER } = LEADERBOARD_VIEWTYPE_CONSTANTS;
const { ADMIN_REPORT, OWNER_REPORT, MANAGER_REPORT, AGENT_REPORT } = LEADERBOARD_REPORT_TYPE_CONSTANTS;

const getRightPanelHeading = ({ currLevel, entity, viewType }) => {
	const { report_type, user, location_name } = currLevel;

	const { name } = user || {};

	let heading = '';

	switch (viewType) {
		case ADMIN:
			if (report_type === ADMIN_REPORT) {
				heading = getEntityNameById(entity);
			} else if (report_type === OWNER_REPORT) {
				if (isEmpty(user)) {
					heading = `${startCase(location_name || '')} Team`;
				} else {
					heading = `${name}'s Team`;
				}
			} else if (report_type === AGENT_REPORT) {
				heading = user.name;
			} else {
				heading = `${name}'s Team`;
			}
			break;
		case OWNER:
			if (report_type === OWNER_REPORT || report_type === MANAGER_REPORT) {
				heading = 'Your Team';
			} else {
				heading = `${name}'s Team`;
			}
			break;
		case MANAGER:
			heading = 'Your Team';
			break;
		default:
			heading = 'Your Activity';
	}

	return heading;
};

export default getRightPanelHeading;
