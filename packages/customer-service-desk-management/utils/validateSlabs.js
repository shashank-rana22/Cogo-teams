import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

export const validateSlabs = ({ experienceSlabs = [] }) => {
	let isValid = true;

	experienceSlabs.forEach((slab) => {
		if (isEmpty(slab.slab_upper_limit)) {
			Toast.error('Expereience Level Slab Upto is required');
			isValid = false;
		} else if (slab.slab_lower_limit > slab.slab_upper_limit) {
			Toast.error('Provided input in \'Experience Level Slab Upto\' is invalid');
			isValid = false;
		}
	});

	return isValid;
};
