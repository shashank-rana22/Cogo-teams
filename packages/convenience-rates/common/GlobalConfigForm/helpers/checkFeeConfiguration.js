import { Toast } from '@cogoport/components';

const ONE = 1;
const FIRST_ELEM_INDEX = 0;

const excludeKeys = ['minimum_fee_value', 'maximum_fee_value'];

const handleFieldArrayAddCheck = ({ currentIndex, formValues, name }) => {
	if (currentIndex <= FIRST_ELEM_INDEX) return true;

	const prevSlab = formValues?.[name]?.[currentIndex - ONE] || {};

	const isPrevSlabFilled = Object.keys(prevSlab || {})
		.filter((k) => !excludeKeys.includes(k))
		.every((k) => prevSlab[k]);

	const { minimum_fee_value, maximum_fee_value, fee_value, slab_lower_limit, slab_upper_limit } = prevSlab;

	if (!isPrevSlabFilled) Toast.error('Please enter all required Inputs');
	if (isPrevSlabFilled && currentIndex === ONE) {
		if (Number(slab_lower_limit) !== ONE) {
			Toast.error('First Input slab starts with 1');
			return false;
		}
	}
	if (isPrevSlabFilled && slab_lower_limit > slab_upper_limit) {
		Toast.error('Provided Inputs is invalid in Slab To');
		return false;
	}
	if (isPrevSlabFilled && !minimum_fee_value && !maximum_fee_value) {
		return true;
	}
	if (isPrevSlabFilled && Number(fee_value) < Number(minimum_fee_value)) {
		Toast.error('Check for Proper Minimum Value Input');
		return false;
	}
	if (isPrevSlabFilled && Number(fee_value) > Number(maximum_fee_value)) {
		Toast.error('Check for Proper Maximum Value Input');
		return false;
	}
	return isPrevSlabFilled;
};

export default handleFieldArrayAddCheck;
