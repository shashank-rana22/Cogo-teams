import { Toast } from '@cogoport/components';

const ZERO = 0;
const ONE = 1;

const excludeKeys = ['slab_unit', 'slab_lower_limit', 'max_allowed_discount_value'];

const handleFieldArrayAddCheck = ({ currentIndex, formValues }) => {
	if (currentIndex <= ZERO) return true;

	const prevSlab = formValues?.shipment_price_slab_config?.[currentIndex - ONE] || {};

	const isPrevSlabFilled = Object.keys(prevSlab || {})
		.filter((k) => !excludeKeys.includes(k))
		.every((k) => prevSlab[k]);

	const { slab_lower_limit, slab_upper_limit, discount_limit_unit, max_allowed_discount_value } = prevSlab || {};

	if (!isPrevSlabFilled || (discount_limit_unit === 'percentage' && max_allowed_discount_value === '')) {
		Toast.error('Please enter all required inputs');
		return false;
	}

	if (slab_lower_limit > slab_upper_limit) {
		Toast.error('Invalid input in "Slab To"');
		return false;
	}

	return true;
};

export default handleFieldArrayAddCheck;
