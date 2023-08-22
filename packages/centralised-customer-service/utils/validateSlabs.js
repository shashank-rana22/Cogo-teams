import { Toast } from '@cogoport/components';

export const validateSlabs = ({ experienceSlabs = [] }) => {
	let isValid = true;

	experienceSlabs.forEach((slab) => {
		if (slab.slab_lower_limit > slab.slab_upper_limit) {
			Toast.error('Provided input in \'Experience Level Slab Upto\' is invalid');
			isValid = false;
		}
	});

	return isValid;
};
