import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import LEADERBOARD_REPORT_TYPE_CONSTANTS from '../../../../../../../constants/leaderboard-reporttype-constants';
import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../../../../../constants/leaderboard-viewtype-constants';
import getListColumnMapping from '../get-list-column-mapping';

const { ADMIN, AGENT } = LEADERBOARD_VIEWTYPE_CONSTANTS;
const { ADMIN_REPORT, OWNER_REPORT, AGENT_REPORT } = LEADERBOARD_REPORT_TYPE_CONSTANTS;

const getLocationOrChannel = ({ listItem, isChannel, prevLevel }) => {
	if (prevLevel.report_type !== ADMIN_REPORT) {
		return {};
	}

	return isChannel ? { channel: listItem.name } : { location_id: listItem.id, location_name: listItem.name };
};

const getCurrLevelUserRmIds = ({ listItem, prevLevel, levelStack }) => {
	const actualPrevLevel = prevLevel.report_type === AGENT_REPORT
		? levelStack[GLOBAL_CONSTANTS.zeroth_index] : prevLevel;

	if (isEmpty(actualPrevLevel.user)
	|| (listItem.report_type === AGENT_REPORT && actualPrevLevel.user?.id === listItem.user?.id)) {
		return actualPrevLevel.user_rm_ids || [];
	}

	return [actualPrevLevel.user?.id, ...(actualPrevLevel.user_rm_ids || [])];
};

const useListItem = (props) => {
	const {
		listItem = {}, user, viewType, currLevel, setCurrLevel, isChannel, levelStack, setLevelStack,
	} = props;

	const LIST_COLUMN_MAPPING = getListColumnMapping({ currLevel });

	const isAllowed = !isEmpty(levelStack)
		|| (user.id === listItem.user?.id && viewType !== AGENT) || viewType === ADMIN;

	const handleClick = () => {
		if (isAllowed) {
			if (currLevel.report_type !== AGENT_REPORT || (currLevel.isExpanded && isEmpty(currLevel.user))) {
				setLevelStack((prev) => ([currLevel, ...prev]));
			}

			setCurrLevel((prevLevel) => ({
				...prevLevel,
				report_type : listItem.report_type || OWNER_REPORT,
				...(getLocationOrChannel({ listItem, isChannel, prevLevel })),
				user        : listItem.user || {},
				user_rm_ids : getCurrLevelUserRmIds({ listItem, prevLevel, levelStack }) || [],
			}));
		}
	};

	return {
		LIST_COLUMN_MAPPING,
		isAllowed,
		handleClick,
	};
};

export default useListItem;
