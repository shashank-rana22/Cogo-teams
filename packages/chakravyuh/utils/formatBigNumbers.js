import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { SECOND_IDX } from '../constants/map_constants';

const DECIMALS = 1;
const UNIT_MAPPING = {
	B : 1000000000,
	M : 1000000,
	K : 1000,
};

export const formatBigNumbers = (cnt) => {
	if (Number.isNaN(+cnt)) return GLOBAL_CONSTANTS.zeroth_index;
	const unit = Object.entries(UNIT_MAPPING).find(([, value]) => cnt >= value);
	return unit
		? `${(cnt / unit[SECOND_IDX]).toFixed(DECIMALS)}${unit[GLOBAL_CONSTANTS.zeroth_index]}`
		: Math.round(cnt);
};
