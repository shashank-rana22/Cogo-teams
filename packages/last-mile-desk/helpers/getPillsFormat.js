import { startCase } from '@cogoport/utils';

const convertToStartCase = (val) => startCase(val || '');

const getContainerSize = (container_size = '') => (
	container_size?.includes('HC') ? container_size.replace('HC', 'ft HC') : `${container_size || '--'}ft`
);

const getContainerCount = (containers_count) => {
	if (!containers_count) return null;

	if (containers_count === 1) return '1 Container';

	return `${containers_count} Containers`;
};

const getFreeDaysDetentionDestination = (freeDays) => `Free Days Detention Destination : ${freeDays}`;

const getPillsFormat = (pillsObj = {}) => {
	const formatValue = {
		containers_count                : getContainerCount,
		container_size                  : getContainerSize,
		free_days_detention_destination : getFreeDaysDetentionDestination,
		default                         : convertToStartCase,
	};

	return Object.keys(pillsObj).map((pillKey) => ((formatValue?.[pillKey] || formatValue.default)(pillsObj[pillKey])));
};
export default getPillsFormat;
