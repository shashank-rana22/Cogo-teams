import { Toast } from '@cogoport/components/';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const ONE = 1;
const TWO = 2;

export const checkOverLapping = (arr) => {
	let isOverLapped = false;
	let errorIndex = -1;
	if (!arr) {
		return isOverLapped === false;
	}

	const sortedArr = arr?.sort((a, b) => {
		if (a[GLOBAL_CONSTANTS.zeroth_index] === b[GLOBAL_CONSTANTS.zeroth_index]) {
			return a[ONE] - b[ONE];
		}
		return a[GLOBAL_CONSTANTS.zeroth_index] - b[GLOBAL_CONSTANTS.zeroth_index];
	});

	if (Number(arr[GLOBAL_CONSTANTS.zeroth_index][GLOBAL_CONSTANTS.zeroth_index] !== ONE)) {
		isOverLapped = true;
		errorIndex = Number(arr[GLOBAL_CONSTANTS.zeroth_index][GLOBAL_CONSTANTS.zeroth_index]);
		return { isOverLapped, errorIndex };
	}
	if (Number(arr[GLOBAL_CONSTANTS.zeroth_index][GLOBAL_CONSTANTS.zeroth_index])
        >= Number(arr[GLOBAL_CONSTANTS.zeroth_index][ONE])) {
		isOverLapped = true;
		errorIndex = Number(arr[GLOBAL_CONSTANTS.zeroth_index][TWO]);
		return { isOverLapped, errorIndex };
	}

	for (let i = 0; i < sortedArr.length - ONE; i += ONE) {
		if (
			Number(arr[i][ONE]) + ONE !== Number(arr?.[i + ONE][GLOBAL_CONSTANTS.zeroth_index])
			|| Number(arr[i + ONE][GLOBAL_CONSTANTS.zeroth_index]) >= Number(arr[i + ONE][ONE])
		) {
			isOverLapped = true;
			errorIndex = Number(arr[i][TWO]);
			break;
		}
	}

	return { isOverLapped, errorIndex };
};

export const validateSlabs = ({ currSlab = [] }) => {
	let isValidate = false;

	if (currSlab?.length === ONE) {
		if (!currSlab[GLOBAL_CONSTANTS.zeroth_index].slab_lower_limit
            || !currSlab[GLOBAL_CONSTANTS.zeroth_index].slab_upper_limit) {
			return true;
		}

		isValidate = Number(currSlab?.[GLOBAL_CONSTANTS.zeroth_index].slab_lower_limit)
        < Number(currSlab?.[GLOBAL_CONSTANTS.zeroth_index].slab_upper_limit);

		if (Number(currSlab?.[GLOBAL_CONSTANTS.zeroth_index].slab_lower_limit) !== ONE) {
			isValidate = false;
			Toast.error('First Input slab starts with value 1 .');
			return isValidate;
		}
		if (!isValidate) {
			Toast.error('Check for Proper Slabs Inputs. ');
		}

		return isValidate;
	}

	let objectOfArrays = {};

	const type = currSlab[currSlab.length - ONE]?.slab_unit;

	currSlab.forEach((item, index) => {
		objectOfArrays = {
			...objectOfArrays,
			[item?.slab_unit]: [
				...(objectOfArrays?.[item?.slab_unit] || []),
				[Number(item?.slab_lower_limit), Number(item?.slab_upper_limit), index],
			],
		};
	});

	if (!checkOverLapping(objectOfArrays[type]).isOverLapped) {
		isValidate = true;
		return isValidate;
	}

	Toast.error('Provided Inputs is invalid in Slab To.');

	return isValidate;
};
