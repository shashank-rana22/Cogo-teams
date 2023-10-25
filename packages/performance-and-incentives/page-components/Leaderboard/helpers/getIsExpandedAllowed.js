import { isEmpty } from '@cogoport/utils';

import LEADERBOARD_REPORT_TYPE_CONSTANTS from '../../../constants/leaderboard-reporttype-constants';
import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../constants/leaderboard-viewtype-constants';

const { MANAGER_REPORT, AGENT_REPORT } = LEADERBOARD_REPORT_TYPE_CONSTANTS;
const { ADMIN, OWNER, MANAGER, AGENT } = LEADERBOARD_VIEWTYPE_CONSTANTS;

const OWNER_LEVEL_DEPTH = 2;

const isExpandedAllowed = ({ levelStack, currLevel, viewType }) => {
	if (currLevel.isExpanded) return false;

	switch (viewType) {
		case ADMIN:
			return ![MANAGER_REPORT, AGENT_REPORT].includes(currLevel.report_type);
		case OWNER:
			return levelStack.length < OWNER_LEVEL_DEPTH;
		case MANAGER:
			return isEmpty(levelStack);
		case AGENT:
			return false;
		default:
			return false;
	}
};

export default isExpandedAllowed;
