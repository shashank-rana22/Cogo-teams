import { isEmpty } from '@cogoport/utils';

const allStakeHolderTimeLineData = ({ level0 = {}, level1 = {}, level2 = {}, level3 = {} }) => {
	const { stakeholder: stakeholder3, status: status3 } = level3 || {};
	const { stakeholder: stakeholder2, status: status2 } = level2 || {};
	const { stakeholder: stakeholder1, status: status1 } = level1 || {};

	if (!isEmpty(level3)) {
		return [
			{
				...(level0
					? {
						email   : level0?.email,
						name    : level0?.name,
						remarks : level0?.remark,
						status  : 'REQUESTED BY',
					}
					: {}),
			},
			{
				...(stakeholder1
					? {
						email   : stakeholder1?.userEmail,
						name    : stakeholder1?.userName,
						remarks : level1?.remarks,
						status  : status1,
					}
					: {}),
			},
			{
				...(stakeholder2
					? {
						email   : stakeholder2?.userEmail,
						name    : stakeholder2?.userName,
						remarks : level2?.remarks,
						status  : status2,
					}
					: {}),
			},
			{
				...(stakeholder3
					? {
						email   : stakeholder3?.userEmail,
						name    : stakeholder3?.userName,
						remarks : level3?.remarks,
						status  : status3,
					}
					: {}),
			},
		];
	}
	if (!isEmpty(level2)) {
		return [
			{
				...(level0
					? {
						email   : level0?.email,
						name    : level0?.name,
						remarks : level0?.remark,
						status  : 'REQUESTED BY',
					}
					: {}),
			},
			{
				...(stakeholder1
					? {
						email   : stakeholder1?.userEmail,
						name    : stakeholder1?.userName,
						remarks : level1?.remarks,
						status  : status1,
					}
					: {}),
			},
			{
				...(stakeholder2
					? {
						email   : stakeholder2?.userEmail,
						name    : stakeholder2?.userName,
						remarks : level2?.remarks,
						status  : status2,
					}
					: {}),
			},
		];
	}
	if (!isEmpty(level2)) {
		return [
			{
				...(level0
					? {
						email   : level0?.email,
						name    : level0?.name,
						remarks : level0?.remark,
						status  : 'REQUESTED BY',
					}
					: {}),
			},
			{
				email   : stakeholder1?.userEmail,
				name    : stakeholder1?.userName,
				remarks : level1?.remarks,
				status  : status1,
			},
		];
	}
	return [
		{
			...(level0
				? {
					email   : level0?.email,
					name    : level0?.name,
					remarks : level0?.remark,
					status  : 'REQUESTED BY',
				}
				: {}),
		},
	];
};

export default allStakeHolderTimeLineData;
