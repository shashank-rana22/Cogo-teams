import { startCase } from '@cogoport/utils';

function getActivityListOptions({ activityData = {}, activeTab }) {
	const { list = [] } = activityData || {};

	return list?.map(
		(item) => ({
			...item,
			label : `${startCase(activeTab)} Id: ${item?.serial_id}`,
			value : `${startCase(activeTab)} Id: ${item?.serial_id}`,
		}),
	) || [];
}

export default getActivityListOptions;
