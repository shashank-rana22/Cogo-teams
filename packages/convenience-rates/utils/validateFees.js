import { Toast } from '@cogoport/components';

export const validateFees = ({ currSlab = [] }) => {
	let isValidate = true;
	let isValidateONE = true;
	let isValidateTWO = true;

	currSlab.forEach((item) => {
		const { minimum_fee_value, maximum_fee_value, fee_value } = item || {};

		if (minimum_fee_value) {
			if (Number(fee_value) < Number(minimum_fee_value)) {
				isValidateONE = false;
				Toast.error('Check For Proper Minimum Value Input.');
			}
		}

		if (maximum_fee_value) {
			if (Number(fee_value) > Number(maximum_fee_value)) {
				isValidateTWO = false;
				Toast.error('Check For Proper Maximum Value Input.');
			}
		}

		isValidate = isValidateONE && isValidateTWO;
	});

	return isValidate;
};
