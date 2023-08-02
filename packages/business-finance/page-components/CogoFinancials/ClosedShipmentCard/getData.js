import { LABEL_MAPPING } from '../constants';

export const getData = ({ taxType, type, cardData }) => [
	{
		id   : 'Cost',
		data : [
			{
				x : 'Estimated Cost',
				y : cardData[`estimatedCost${taxType}`],
			},
			{
				x : `${LABEL_MAPPING[type]} Cost`,
				y : cardData[`${LABEL_MAPPING[type]}Cost${taxType}`],
			},
		],
	},
	{
		id   : 'Revenue',
		data : [
			{
				x : 'Estimated Revenue',
				y : cardData[`estimatedRevenue${taxType}`],
			},
			{
				x : `${LABEL_MAPPING[type]} Revenue`,
				y : cardData[`${LABEL_MAPPING[type]}Revenue${taxType}`],
			},
		],
	},

];
