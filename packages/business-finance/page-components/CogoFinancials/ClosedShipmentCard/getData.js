import { startCase } from '@cogoport/utils';

import { LABEL_MAPPING } from '../constants';

const HUNDRED = 100;

export const getData = ({ taxType, type, cardData, totalCost, totalRevenue }) => {
	const operationalOrActualCostPercent = (Number(cardData[`${LABEL_MAPPING[type]}Cost${taxType}`])
	/ Number(totalCost)) * HUNDRED;

	const operationalOrActualRevenuePercent = (cardData[`${LABEL_MAPPING[type]}Revenue${taxType}`] / totalRevenue)
	* HUNDRED;

	return [
		{
			id   : 'Cost',
			data : [
				{
					x : `${startCase(LABEL_MAPPING[type])} Cost`,
					y : operationalOrActualCostPercent,
				},
				{
					x : 'Estimated Cost',
					y : HUNDRED - Number(operationalOrActualCostPercent),
				},
			],
		},
		{
			id   : 'Revenue',
			data : [
				{
					x : `${startCase(LABEL_MAPPING[type])} Revenue`,
					y : (cardData[`${LABEL_MAPPING[type]}Revenue${taxType}`] / totalRevenue) * HUNDRED,
				},
				{
					x : 'Estimated Revenue',
					y : HUNDRED - operationalOrActualRevenuePercent,
				},
			],
		},

	];
};
