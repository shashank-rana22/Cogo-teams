import { startCase } from '@cogoport/utils';

import { LABEL_MAPPING } from '../constants';

const HUNDRED = 100;
const NO_VALUE = 0;
const DEFAULT_TOTAL_VALUE = 1;

export const getData = ({ taxType = '', type = '', cardData = {}, totalCost = 1, totalRevenue = 1 }) => {
	const operationalOrActualCostPercent = (Number(cardData[`${LABEL_MAPPING[type]}Cost${taxType}`])
	/ Number(totalCost || DEFAULT_TOTAL_VALUE)) * HUNDRED;

	const operationalOrActualRevenuePercent = (cardData[`${LABEL_MAPPING[type]}Revenue${taxType}`]
	/ (totalRevenue || DEFAULT_TOTAL_VALUE))
	* HUNDRED;

	const isCostOverflowing = operationalOrActualCostPercent > HUNDRED;
	const isRevenueOverflowing = operationalOrActualRevenuePercent > HUNDRED;

	return [
		{
			id   : 'Cost',
			data : [
				{
					x          : `${startCase(LABEL_MAPPING[type])} Cost`,
					y          : !isCostOverflowing ? operationalOrActualCostPercent : HUNDRED,
					labelValue : isCostOverflowing ? operationalOrActualCostPercent : null,
				},
				{
					x : 'Estimated Cost',
					y : isCostOverflowing ? NO_VALUE : HUNDRED - Number(operationalOrActualCostPercent),
				},
			],
		},
		{
			id   : 'Revenue',
			data : [
				{
					x          : `${startCase(LABEL_MAPPING[type])} Revenue`,
					y          : !isRevenueOverflowing ? operationalOrActualRevenuePercent : HUNDRED,
					labelValue : isRevenueOverflowing ? operationalOrActualRevenuePercent : null,
				},
				{
					x : 'Estimated Revenue',
					y : isRevenueOverflowing ? NO_VALUE : HUNDRED - operationalOrActualRevenuePercent,
				},
			],
		},

	];
};
