import { isEmpty } from '@cogoport/utils';
import { useMemo } from 'react';

import DATA_PATH_TO_REMARKS from '../Constants/DATA_PATH_TO_REMARKS';
import TYPE_TO_DATA_PATH from '../Constants/TYPE_TO_DATA_PATH';

const DEFAULT_VALUE = '';

const stakeholderData = (levelData) => {
	const data = (levelData || []).map((item) => {
		const { stakeholder = {}, status = '', remarks = '' } = item || {};
		const { userEmail = '', userName = '' } = stakeholder || {};
		return (
			{
				...(stakeholder
					? {
						email : userEmail,
						name  : userName,
						remarks,
						status,
					}
					: {}),
			}
		);
	});

	return data;
};

const useStakeHolderTimeLineData = ({
	level3 = {}, level2 = {}, level1 = {},
	level0 = {}, status = '', updatedBy = {}, financeRemark = '', type = '', data = {},
}) => {
	const otherRemark = useMemo(() => {
		const dataPath = TYPE_TO_DATA_PATH[type];
		const additionalPath = DATA_PATH_TO_REMARKS[type];
		return dataPath ? data?.[dataPath]?.[additionalPath] || DEFAULT_VALUE : DEFAULT_VALUE;
	}, [type, data]);

	const level = {
		...level0,
		level       : 0,
		status      : 'REQUESTED BY',
		stakeholder : { userEmail: level0?.email, userName: level0?.name },
		remarks     : otherRemark || level0?.remark,
	};
	if (!isEmpty(level3)) {
		return stakeholderData([level, level1, level2, level3]);
	}
	if (!isEmpty(level2)) {
		return stakeholderData([level, level1, level2]);
	}
	if (!isEmpty(level1)) {
		return stakeholderData([level, level1]);
	}
	if (status === 'REQUESTED') {
		return stakeholderData([level, {}]);
	}
	const UPDATED_BY = {
		level       : 0,
		status,
		stakeholder : { userEmail: updatedBy.email, userName: updatedBy.name },
		remarks     : financeRemark,
	};
	return stakeholderData([level, UPDATED_BY]);
};

export default useStakeHolderTimeLineData;
