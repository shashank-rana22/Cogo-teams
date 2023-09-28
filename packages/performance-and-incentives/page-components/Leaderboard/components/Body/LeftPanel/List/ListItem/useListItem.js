import { isEmpty } from '@cogoport/utils';

import LEADERBOARD_REPORT_TYPE_CONSTANTS from '../../../../../../../constants/leaderboard-reporttype-constants';
import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../../../../../constants/leaderboard-viewtype-constants';
import getListColumnMapping from '../get-list-column-mapping';

const { ADMIN } = LEADERBOARD_VIEWTYPE_CONSTANTS;
const { ADMIN_REPORT, OWNER_REPORT, AGENT_REPORT } = LEADERBOARD_REPORT_TYPE_CONSTANTS;

const getLocationOrChannel = ({ listItem, isChannel, prevLevel }) => {
	if (prevLevel.report_type !== ADMIN_REPORT) {
		return {};
	}

	return isChannel ? { channel: listItem.name } : { location_id: listItem.id, location_name: listItem.name };
};

const getCurrLevelUserRmIds = ({ listItem, prevLevel }) => {
	if (isEmpty(prevLevel.user)
	|| (listItem.report_type === AGENT_REPORT && prevLevel.user?.id === listItem.user?.id)) {
		return prevLevel.user_rm_ids || [];
	}

	return [prevLevel.user?.id, ...(prevLevel.user_rm_ids || [])];
};

const useListItem = (props) => {
	const {
		listItem = {}, user, viewType, currLevel, setCurrLevel, isChannel, setLevelStack,
	} = props;

	const LIST_COLUMN_MAPPING = getListColumnMapping();

	const [currView] = currLevel.report_type.split('_') || [];

	const isAllowed = (`${currView}_view` !== viewType)
	|| (user.id === listItem?.user?.id || viewType === ADMIN);

	const handleClick = () => {
		if (isAllowed) {
			setLevelStack((prev) => ([currLevel, ...prev]));

			setCurrLevel((prevLevel) => ({
				...prevLevel,
				report_type : listItem.report_type || OWNER_REPORT,
				...(getLocationOrChannel({ listItem, isChannel, prevLevel })),
				user        : listItem.user || {},
				user_rm_ids : getCurrLevelUserRmIds({ listItem, prevLevel }) || [],
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
