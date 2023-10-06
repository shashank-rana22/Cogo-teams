import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { SECOND_IDX } from '../constants/map_constants';

const DECIMALS = 12;
const MAX_SAFE_LIMIT = 10;
const UNIT_MAPPING = {
	T : 1000000000000,
	B : 1000000000,
	M : 1000000,
	K : 1000,
};

export const formatBigNumbers = (cnt) => {
	if (`${cnt}`.length > MAX_SAFE_LIMIT) return GLOBAL_CONSTANTS.zeroth_index;
	if (Number.isNaN(+cnt)) return GLOBAL_CONSTANTS.zeroth_index;
	const unit = Object.entries(UNIT_MAPPING).find(([, value]) => cnt >= value);
	return unit
		? `${(cnt / unit[SECOND_IDX]).toFixed(DECIMALS)}${unit[GLOBAL_CONSTANTS.zeroth_index]}`
		: Math.round(cnt);
};
