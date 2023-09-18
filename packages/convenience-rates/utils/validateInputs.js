import { Toast } from '@cogoport/components';

export const validateInputs = ({ currSlab = [] }) => {
	let isValidate = true;
	currSlab.forEach((item) => {
		if (
			!item.fee_value
			|| !item.fee_currency
			|| !item.fee_unit
			|| !item.slab_lower_limit
			|| !item.slab_upper_limit
			|| !item.slab_unit
		) {
			Toast.error('Please Enter All Required Inputs');
			isValidate = false;
		}
	});
	return isValidate;
};
