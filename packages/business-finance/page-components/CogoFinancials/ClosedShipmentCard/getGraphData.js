import { startCase } from '@cogoport/utils';

import { LABEL_MAPPING } from '../constants';
import formatCount from '../utils/formatCount';

const DEFAULT_COUNT = 0;

export const getGraphData = ({
	cardData, taxType, currency, type, displayAmount, isDeviationVisible,
	revenueDeviation, costDeviation,
}) => [
	{
		rowId    : 'first_row',
		children : [
			{
				label : 'Estimated Revenue',
				value : displayAmount(cardData[`estimatedRevenue${taxType}`], currency),
				color : '#cfeaed',
				show  : true,
			},
			{
				label : `${startCase(LABEL_MAPPING[type])} Revenue`,
				value : displayAmount(cardData[`${LABEL_MAPPING[type]}Revenue${taxType}`], currency),
				color : '#6fa5ab',
				show  : true,
			},
			{
				label : 'Deviation (Revenue)',
				value : revenueDeviation,
				show  : isDeviationVisible,
			},
			{
				label : 'No. of Invoices',
				value : formatCount(cardData?.invoiceCount || DEFAULT_COUNT),
				show  : true,
			},
		],
	},
	{
		rowId    : 'second_row',
		children : [
			{
				label : 'Estimated Cost',
				value : displayAmount(cardData[`estimatedCost${taxType}`], currency),
				color : '#f8aea8',
				show  : true,
			},
			{
				label : `${startCase(LABEL_MAPPING[type])} Cost`,
				value : displayAmount(cardData[`${LABEL_MAPPING[type]}Cost${taxType}`], currency),
				color : '#ee3425',
				show  : true,
			},
			{
				label : 'Deviation (Cost)',
				value : costDeviation,
				show  : isDeviationVisible,
			},
			{
				label : 'No. of Shipments',
				value : formatCount(cardData?.jobCount || DEFAULT_COUNT),
				show  : true,
			},
		],
	},

];
