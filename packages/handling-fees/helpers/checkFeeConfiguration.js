import { Toast } from '@cogoport/components';

const ONE = 1;
const FIRST_ELEM_INDEX = 0;

const EXCLUDE_KEYS = [];
const FIELDS_TO_CHECK = ['slab_unit', 'slab_lower_limit',
	'slab_upper_limit', 'fee_unit', 'fee_currency', 'fee_value'];

const handleFieldArrayAddCheck = ({ currentIndex, formValues, name }) => {
	if (currentIndex <= FIRST_ELEM_INDEX) return true;

	const prevSlab = formValues?.[name]?.[currentIndex - ONE] || {};

	const isPrevSlabFilled = FIELDS_TO_CHECK.filter((k) => !EXCLUDE_KEYS.includes(k)).every((k) => prevSlab[k]);

	const { minimum_fee_value, maximum_fee_value, fee_value, slab_lower_limit, slab_upper_limit } = prevSlab || {};

	if (!isPrevSlabFilled) {
		Toast.error('Please enter all required Inputs');
		return false;
	}

	if (currentIndex === ONE && Number(slab_lower_limit) !== ONE) {
		Toast.error('First Input slab starts with 1');
		return false;
	}

	if (slab_lower_limit > slab_upper_limit) {
		Toast.error('Provided Inputs is invalid in Slab To');
		return false;
	}
	if (!minimum_fee_value && !maximum_fee_value) {
		return true;
	}
	if (Number(fee_value) < Number(minimum_fee_value)) {
		Toast.error('Minimum Value should be less than Handling Fee');
		return false;
	}
	if (Number(fee_value) > Number(maximum_fee_value)) {
		Toast.error('Maximum Value should be greater than Handling Fee');
		return false;
	}

	return true;
};

export default handleFieldArrayAddCheck;
