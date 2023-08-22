import { startCase } from '@cogoport/utils';

const convertToStartCase = (val) => startCase(val || '');

const SINGLE_VALUE = 1;

const getContainerSize = (container_size = '') => (
	container_size?.includes('HC') ? container_size.replace('HC', 'HC ft') : `${container_size || '--'}ft`
);

const getContainerCount = (containers_count) => {
	if (!containers_count) return null;

	if (containers_count === SINGLE_VALUE) return '1 Container';

	return `${containers_count} Containers`;
};

const getTruckCount = (trucks_count) => {
	if (!trucks_count) return null;

	if (trucks_count === SINGLE_VALUE) return '1 Truck';

	return `${trucks_count} Trucks`;
};

const getFreeDaysDetentionDestination = (freeDays) => `Free Days Detention Destination : ${freeDays}`;

const getPillsFormat = (pillsObj = {}) => {
	const formatValue = {
		containers_count                : getContainerCount,
		container_size                  : getContainerSize,
		free_days_detention_destination : getFreeDaysDetentionDestination,
		trucks_count                    : getTruckCount,
		default                         : convertToStartCase,
	};
	return Object.keys(pillsObj).map((pillKey) => ((formatValue?.[pillKey] || formatValue.default)(pillsObj[pillKey])));
};
export default getPillsFormat;
