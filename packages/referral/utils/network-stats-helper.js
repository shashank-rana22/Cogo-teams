import { FIRST_LEVEL_DATA, SECOND_LEVEL_DATA, THIRD_LEVEL_DATA } from '../constants';

import { handleValues } from './handleValue';

const LEVEL_INDEX_VALUE = 1;
const NETWORK_LENGTH_VALUE_EQUAL_TO_10 = 10;
const NETWORK_LENGTH_VALUE_EQUAL_TO_20 = 20;

export const formatData = (data) => {
	const keys = Object.keys(data || {});
	const details = keys.map((key, index) => ({
		x : `L${index + LEVEL_INDEX_VALUE}`,
		y : handleValues(data?.[key]),
	}));
	return details;
};

export const getUserLevel = (networkLength) => {
	let userLevel = [];
	if (networkLength <= NETWORK_LENGTH_VALUE_EQUAL_TO_10) {
		userLevel = FIRST_LEVEL_DATA;
	} else if (networkLength <= NETWORK_LENGTH_VALUE_EQUAL_TO_20) {
		userLevel = SECOND_LEVEL_DATA;
	} else {
		userLevel = THIRD_LEVEL_DATA;
	}
	return userLevel;
};
