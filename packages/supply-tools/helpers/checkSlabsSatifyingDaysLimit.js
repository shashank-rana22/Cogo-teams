import { Toast } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';

const checkSlabsSatifyingDaysLimit = ({ data }) => {
	const { detention = [], demurrage = [], free_days_type = '' } = data || {};

	const slabs = [...detention, ...demurrage].filter((i) => !!i.upper_limit);

	if (isEmpty(slabs)) {
		Toast.error(`Add ${startCase(free_days_type)}`);
		return false;
	}

	const satisfyingDaysLimit = slabs.every((itm) => (
		Number(itm?.lower_limit) < Number(itm?.upper_limit) && Number(itm?.upper_limit) > Number(data?.free_limit)
	));

	if (!satisfyingDaysLimit) {
		Toast.error('Upper limit and lower limit of days should always be greater than free limit days');
		return false;
	}

	return true;
};

export default checkSlabsSatifyingDaysLimit;
