import { FIRST_LEVEL_DATA, SECOUND_LEVEL_DATA, THIRD_LEVEL_DATA } from '../constants';

import { handleValues } from './handleValue';

export const formatData = (data) => {
	const keys = Object.keys(data || {});
	let details = [];
	keys.forEach((key, index) => {
		details = [
			...details,
			{
				x : `L${index + 1}`,
				y : handleValues(data?.[key]),
			},
		];
	});
	return details;
};

export const getUserLevel = (networkLength) => {
	let userLevel = [];
	if (networkLength <= 10) {
		userLevel = FIRST_LEVEL_DATA;
	} else if (networkLength <= 20) {
		userLevel = SECOUND_LEVEL_DATA;
	} else {
		userLevel = THIRD_LEVEL_DATA;
	}
	return userLevel;
};
