import { FIRST_LEVEL_DATA, SECOND_LEVEL_DATA, THIRD_LEVEL_DATA } from '../constants';

import { handleValues } from './handleValue';

const DEFAULT_INDEX_VALUE = 1;
const DEFAULT_LENGTH_VALUE = 10;
const DEFAULT_NETWORK_LENGTH_VALUE = 20;

export const formatData = (data) => {
	const keys = Object.keys(data || {});
	let details = [];
	keys.forEach((key, index) => {
		details = [
			...details,
			{
				x : `L${index + DEFAULT_INDEX_VALUE}`,
				y : handleValues(data?.[key]),
			},
		];
	});
	return details;
};

export const getUserLevel = (networkLength) => {
	let userLevel = [];
	if (networkLength <= DEFAULT_LENGTH_VALUE) {
		userLevel = FIRST_LEVEL_DATA;
	} else if (networkLength <= DEFAULT_NETWORK_LENGTH_VALUE) {
		userLevel = SECOND_LEVEL_DATA;
	} else {
		userLevel = THIRD_LEVEL_DATA;
	}
	return userLevel;
};
