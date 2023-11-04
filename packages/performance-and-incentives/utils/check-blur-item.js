import { isEmpty } from '@cogoport/utils';

import LEADERBOARD_VIEWTYPE_CONSTANTS from '../constants/leaderboard-viewtype-constants';

const { ADMIN, OWNER } = LEADERBOARD_VIEWTYPE_CONSTANTS;

const checkToBlurItem = ({ user, listItem, index, userPosition, viewType, currLevel = {} }) => {
	if ([ADMIN, OWNER].includes(viewType) || !isEmpty(currLevel?.user) || currLevel?.isExpanded) return false;

	if (index <= 2) return false;

	if (userPosition < 3 && index < 5) return false;

	if (userPosition < 9 && user.id === listItem?.user?.id) return false;

	if (user?.id === listItem?.user?.id) return false;

	return true;
};

export default checkToBlurItem;
