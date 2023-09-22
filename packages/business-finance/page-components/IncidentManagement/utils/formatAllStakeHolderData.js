import { isEmpty } from '@cogoport/utils';

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

const stakeHolderTimeLineData = ({ level3 = {}, level2 = {}, level1 = {}, level0 = {} }) => {
	const level = {
		...level0,
		level       : 0,
		status      : 'REQUESTED BY',
		stakeholder : { userEmail: level0.email, userName: level0.name },
		remarks     : level0.remark,
	};
	if (!isEmpty(level3)) {
		return stakeholderData([level, level1, level2, level3]);
	}
	if (!isEmpty(level2)) {
		return stakeholderData([level, level1, level2]);
	}
	return stakeholderData([level, level1]);
};

export default stakeHolderTimeLineData;
