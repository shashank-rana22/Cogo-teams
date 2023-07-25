import { startCase } from '@cogoport/utils';

export const EXPLORED_VIEW_DATA = [
	'confirmed_booking',
	'cancelled_booking',
	'in_progress_booking',
	'completed_booking',
];

const getModifiedDistribution = ({ data = {} }) => {
	const finalData = Object.keys(data).filter((key) => key !== 'total_rates').map((key) => ({
		key,
		id           : startCase(key),
		label        : startCase(key),
		value        : data[key].value,
		cancellation : data[key].cancellation,
	}));
	return finalData;
};

export default getModifiedDistribution;
