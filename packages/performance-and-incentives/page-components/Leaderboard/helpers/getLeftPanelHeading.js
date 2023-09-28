import { startCase } from '@cogoport/utils';

import LEADERBOARD_REPORT_TYPE_CONSTANTS from '../../../constants/leaderboard-reporttype-constants';
import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../constants/leaderboard-viewtype-constants';
import getEntityNameById from '../../../utils/get-entity-name-by-id';

const { ADMIN, OWNER, MANAGER } = LEADERBOARD_VIEWTYPE_CONSTANTS;
const { ADMIN_REPORT, OWNER_REPORT, MANAGER_REPORT } = LEADERBOARD_REPORT_TYPE_CONSTANTS;

const getLeftPanelHeading = ({ currLevel, entity, viewType, selfRoleData }) => {
	const { report_type, name: currLevelName } = currLevel;

	const { name: roleName = '' } = selfRoleData || {};

	let heading = '';

	switch (viewType) {
		case ADMIN:
			if (report_type === ADMIN_REPORT) {
				heading = getEntityNameById(entity);
			} else if (report_type === OWNER_REPORT) {
				heading = `${startCase(currLevelName)} Team`;
			} else {
				heading = `${currLevelName}'s Team`;
			}
			break;
		case OWNER:
			if (report_type === OWNER_REPORT) {
				heading = roleName;
			} else if (report_type === MANAGER_REPORT) {
				heading = 'Your Team';
			} else {
				heading = `${currLevelName}'s Team`;
			}
			break;
		case MANAGER:
			if (report_type === MANAGER_REPORT) {
				heading = roleName;
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
