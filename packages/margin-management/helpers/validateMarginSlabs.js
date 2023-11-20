import { Toast } from '@cogoport/components';

const validateMarginSlabs = (field, callback = () => {}) => {
	// eslint-disable-next-line no-underscore-dangle
	const values = field._formValues?.margin_slabs || field;

	const valueLength = values.length > 1;

	const { upper_limit, lower_limit } = values[values.length - 1] || {};

	if (lower_limit === '' || upper_limit === '') {
		Toast.error('Please enter values');
	} else if (
		upper_limit !== ''
		&& lower_limit !== ''
		&& Number(upper_limit) <= Number(lower_limit)
	) {
		Toast.error('Upper limit should be greater than lower limit');
	} else if (valueLength) {
		const lastUpperLimit = Number(values?.[values.length - 2]?.upper_limit);
		if (lower_limit === '') {
			Toast.error('Please enter values');
		} else if (lower_limit === '' || upper_limit === '') {
			Toast.error('Please enter values');
		} else if (
			upper_limit
			&& lower_limit
			&& Number(lower_limit) > Number(lastUpperLimit)
		) {
			callback?.();
			return true;
		} else {
			Toast.error('Lower limit should be greater than last upper limit');
		}
	// eslint-disable-next-line no-dupe-else-if
	} else {
		callback?.();
		return true;
	}

	return false;
};

export default validateMarginSlabs;
