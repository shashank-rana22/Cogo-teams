import LEADERBOARD_REPORT_TYPE_CONSTANTS from '../../../constants/leaderboard-reporttype-constants';
import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../constants/leaderboard-viewtype-constants';

const { MANAGER_REPORT, AGENT_REPORT } = LEADERBOARD_REPORT_TYPE_CONSTANTS;
const { ADMIN } = LEADERBOARD_VIEWTYPE_CONSTANTS;

const isExpandedAllowed = ({ currLevel, viewType }) => {
	if (currLevel.isExpanded) return false;

	if (viewType === ADMIN) {
		return ![MANAGER_REPORT, AGENT_REPORT].includes(currLevel.report_type);
	}

	return false;
};

export default isExpandedAllowed;
