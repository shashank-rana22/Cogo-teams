import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

export const checkOverLapping = (arr) => {
	let isOverLapped = false;
	let errorIndex = -1;
	if (!arr) {
		return isOverLapped === false;
	}

	const sortedArr = arr?.sort((a, b) => {
		if (a[GLOBAL_CONSTANTS.zeroth_index] === b[GLOBAL_CONSTANTS.zeroth_index]) {
			return a[1] - b[1];
		}
		return a[GLOBAL_CONSTANTS.zeroth_index] - b[GLOBAL_CONSTANTS.zeroth_index];
	});

	if (Number(arr[GLOBAL_CONSTANTS.zeroth_index][GLOBAL_CONSTANTS.zeroth_index] !== 1)) {
		isOverLapped = true;
		errorIndex = Number(arr[GLOBAL_CONSTANTS.zeroth_index][GLOBAL_CONSTANTS.zeroth_index]);
		return { isOverLapped, errorIndex };
	}
	if (Number(arr[GLOBAL_CONSTANTS.zeroth_index][GLOBAL_CONSTANTS.zeroth_index])
    >= Number(arr[GLOBAL_CONSTANTS.zeroth_index][1])) {
		isOverLapped = true;
		errorIndex = Number(arr[GLOBAL_CONSTANTS.zeroth_index][2]);
		return { isOverLapped, errorIndex };
	}

	for (let i = GLOBAL_CONSTANTS.zeroth_index; i < sortedArr.length - 1; i += 1) {
		if (
			Number(arr[i][1]) + 1 !== Number(arr?.[i + 1][GLOBAL_CONSTANTS.zeroth_index])
			|| Number(arr[i + 1][GLOBAL_CONSTANTS.zeroth_index]) >= Number(arr[i + 1][1])
		) {
			isOverLapped = true;
			errorIndex = Number(arr[i][2]);
			break;
		}
	}

	return { isOverLapped, errorIndex };
};

export const validateSlabs = ({ slabs = [] }) => {
	let isValidate = false;

	for (let i = GLOBAL_CONSTANTS.zeroth_index; i < slabs.length; i += 1) {
		const { fee_value, minimum_fee_value, maximum_fee_value } = slabs[i] || {};

		if (Number(fee_value) < Number(minimum_fee_value)) {
			Toast.error('Check for Proper Minimum Value Input');
			return false;
		}
		if (Number(fee_value) > Number(maximum_fee_value)) {
			Toast.error('Check for Proper Maximum Value Input');
			return false;
		}
	}

	if (slabs?.length === 1) {
		if (!slabs[GLOBAL_CONSTANTS.zeroth_index].slab_lower_limit
            || !slabs[GLOBAL_CONSTANTS.zeroth_index].slab_upper_limit) {
			return true;
		}

		isValidate = Number(slabs?.[GLOBAL_CONSTANTS.zeroth_index].slab_lower_limit)
			< Number(slabs?.[GLOBAL_CONSTANTS.zeroth_index].slab_upper_limit);

		if (Number(slabs?.[GLOBAL_CONSTANTS.zeroth_index].slab_lower_limit) !== 1) {
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

	const type = slabs[slabs.length - 1]?.slab_unit;

	slabs.forEach((item, index) => {
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

	Toast.error('Provided Input is invalid in Slab To.');

	return isValidate;
};
