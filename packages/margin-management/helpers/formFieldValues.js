import { Toast } from '@cogoport/components';

const ONE = 1; const TWO = 2;
const formFieldValues = ({ field = {}, callback = () => {} }) => {
	const values = field;
	const valueLength = values.length > ONE;
	const lengthOfValue = values?.length;
	const { upper_limit, lower_limit } = values[values.length - ONE] || {};

	if (lower_limit === '' || upper_limit === '') {
		Toast.error('Please enter values');
	} else if (
		upper_limit !== ''
		&& lower_limit !== ''
		&& Number(upper_limit) <= Number(lower_limit)
	) {
		Toast.error('Upper limit should be greater than lower limit');
	} else if (valueLength) {
		const lastUpperLimit = Number(values?.[lengthOfValue - TWO]?.upper_limit);
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
	} else {
		callback?.();
		return true;
	}

	return false;
};

export default formFieldValues;
