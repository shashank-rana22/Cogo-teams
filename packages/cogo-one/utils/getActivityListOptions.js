import { startCase } from '@cogoport/utils';

import { SUBJECT_MAPPING } from '../constants/mailConstants';

function getActivityListOptions({ activityData = {}, activeTab = '' }) {
	const { list = [] } = activityData || {};

	if (activeTab === 'custom') {
		return [
			{
				value : 'custom',
				label : 'Custom Subject',
			},
		];
	}

	return list?.map(
		(item) => ({
			...item,
			label : `${startCase(activeTab)} Id: ${item?.serial_id}`,
			value : `${SUBJECT_MAPPING?.[activeTab]?.preText} ${item?.serial_id}`,
		}),
	) || [];
}

export default getActivityListOptions;
