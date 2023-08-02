import { startCase } from '@cogoport/utils';

import { LABEL_MAPPING } from '../constants';

export const getGraphData = ({ cardData, taxType, currency, type, displayAmount }) => [
	{
		rowId    : 'first_row',
		children : [
			{
				label : 'Estimated Revenue',
				value : displayAmount(cardData[`estimatedRevenue${taxType}`], currency),
				color : '#cfeaed',
			},
			{
				label : 'Estimated Cost',
				value : displayAmount(cardData[`estimatedCost${taxType}`], currency),
				color : '#f8aea8',
			},
		],
	},
	{
		rowId    : 'second_row',
		children : [
			{
				label : `${startCase(LABEL_MAPPING[type])} Revenue`,
				value : displayAmount(cardData[`${LABEL_MAPPING[type]}Revenue${taxType}`], currency),
				color : '#6fa5ab',
			},
			{
				label : `${startCase(LABEL_MAPPING[type])} Cost`,
				value : displayAmount(cardData[`${LABEL_MAPPING[type]}Cost${taxType}`], currency),
				color : '#ee3425',
			},
		],
	},

];
