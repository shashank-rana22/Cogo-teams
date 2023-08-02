import { LABEL_MAPPING } from '../constants';

const HUNDRED = 100;

export const getData = ({ taxType, type, cardData, totalCost, totalRevenue }) => [
	{
		id   : 'Cost',
		data : [
			{
				x : 'Estimated Cost',
				y : (cardData[`estimatedCost${taxType}`] / totalCost) * HUNDRED,
			},
			{
				x : `${LABEL_MAPPING[type]} Cost`,
				y : (cardData[`${LABEL_MAPPING[type]}Cost${taxType}`] / totalCost) * HUNDRED,
			},
		],
	},
	{
		id   : 'Revenue',
		data : [
			{
				x : 'Estimated Revenue',
				y : (cardData[`estimatedRevenue${taxType}`] / totalRevenue) * HUNDRED,
			},
			{
				x : `${LABEL_MAPPING[type]} Revenue`,
				y : (cardData[`${LABEL_MAPPING[type]}Revenue${taxType}`] / totalRevenue) * HUNDRED,
			},
		],
	},

];
