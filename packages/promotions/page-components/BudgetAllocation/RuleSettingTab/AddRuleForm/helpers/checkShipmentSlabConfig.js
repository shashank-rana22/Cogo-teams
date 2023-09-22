import { Toast } from '@cogoport/components';

const ZERO = 0;
const ONE = 1;

const handleFieldArrayAddCheck = ({ currentIndex, formValues }) => {
	console.log('Manan', currentIndex);
	if (currentIndex <= ZERO) return true;

	const prevSlab = formValues?.shipment_price_slab_config?.[currentIndex - ONE] || {};

	console.log('Manan', prevSlab);
	const isPrevSlabFilled = Object.keys(prevSlab || {}).every((k) => prevSlab[k]);

	const { slab_lower_limit, slab_upper_limit } = prevSlab || {};

	if (!isPrevSlabFilled) {
		Toast.error('Please enter all required Inputs');
		return false;
	}

	if (slab_lower_limit > slab_upper_limit) {
		Toast.error('Provided Inputs is invalid in Slab To');
		return false;
	}

	return true;
};

export default handleFieldArrayAddCheck;
