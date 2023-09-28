import { isEmpty } from '@cogoport/utils';

import LEADERBOARD_REPORT_TYPE_CONSTANTS from '../../../../../../../constants/leaderboard-reporttype-constants';
import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../../../../../constants/leaderboard-viewtype-constants';
import getListColumnMapping from '../get-list-column-mapping';

const { ADMIN } = LEADERBOARD_VIEWTYPE_CONSTANTS;
const { AGENT_REPORT } = LEADERBOARD_REPORT_TYPE_CONSTANTS;

const useListItem = (props) => {
	const { listItem = {}, viewType, currLevel, user, handlePropagation, setStatParams } = props;

	const LIST_COLUMN_MAPPING = getListColumnMapping();

	const [currView] = currLevel.report_type.split('_') || [];

	const isAllowed = (`${currView}_view` !== viewType)
	|| (user.id === listItem?.user?.id || viewType === ADMIN);

	const handleClick = () => {
		if (isAllowed) {
			if (listItem.report_type === AGENT_REPORT) {
				setStatParams((prev) => ({
					...prev,
					filters: {
						...prev.filters,
						report_view_type : undefined,
						user_rm_ids      : undefined,
						report_type      : AGENT_REPORT,
						user_id          : listItem.user?.id,
					},
				}));
			} else {
				handlePropagation({
					id          : listItem.user?.id,
					location_id : isEmpty(listItem.user) ? listItem.id : undefined,
					channel     : isEmpty(listItem.user) ? listItem.name : undefined,
					name        : !isEmpty(listItem.user) ? listItem.user?.name : listItem.name,
				});
			}
		}
	};

	return {
		LIST_COLUMN_MAPPING,
		isAllowed,
		handleClick,

	};
};

export default useListItem;
