import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import LEADERBOARD_REPORT_TYPE_CONSTANTS from '../../../../../../../constants/leaderboard-reporttype-constants';
import LEADERBOARD_VIEWTYPE_CONSTANTS from '../../../../../../../constants/leaderboard-viewtype-constants';
import getListColumnMapping from '../get-list-column-mapping';

import styles from './styles.module.css';

const { ADMIN } = LEADERBOARD_VIEWTYPE_CONSTANTS;
const { AGENT_REPORT } = LEADERBOARD_REPORT_TYPE_CONSTANTS;

const useListItem = (props) => {
	const { listItem = {}, viewType, currLevel, user, handlePropagation, setStatParams } = props;

	const isFirstEntry = listItem.rank === GLOBAL_CONSTANTS.one;

	const boxShadow = isFirstEntry ? styles.box_shadow : '';

	const LIST_COLUMN_MAPPING = getListColumnMapping();

	const [currView] = currLevel[GLOBAL_CONSTANTS.zeroth_index].split('_') || [];

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
				});
			}
		}
	};

	return {
		boxShadow,
		LIST_COLUMN_MAPPING,
		isAllowed,
		handleClick,

	};
};

export default useListItem;
