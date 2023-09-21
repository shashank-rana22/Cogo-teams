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

const stakeHolderTimeLineData = ({ level3 = {}, level2 = {}, level1 = {} }) => {
	if (!isEmpty(level3)) {
		return stakeholderData([level1, level2, level3]);
	}
	if (!isEmpty(level2)) {
		return stakeholderData([level1, level2]);
	}
	return stakeholderData([level1]);
};

export default stakeHolderTimeLineData;
