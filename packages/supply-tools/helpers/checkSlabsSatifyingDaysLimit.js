import { Toast } from '@cogoport/components';

const checkSlabsSatifyingDaysLimit = ({ data }) => {
	const { detention = [], demurrage = [] } = data || {};

	const slabs = [...detention, ...demurrage];

	const satisfyingDaysLimit = slabs.every((itm) => (
		Number(itm.lower_limit) <= Number(itm.upper_limit) && Number(itm.upper_limit) > Number(data?.free_limit)
	));

	if (!satisfyingDaysLimit) {
		Toast.error('Upper limit and lower limit of days should always be greater than free limit days');
		return false;
	}

	return true;
};

export default checkSlabsSatifyingDaysLimit;
