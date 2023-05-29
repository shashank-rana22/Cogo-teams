import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import { getAmountInLakhCrK } from '../Logistics/getAmountInLakhCrK';
import showInTooltop from '../utils/getOverFlowData';

const OverallPayablesStatsKeyMapping = ({ accordianStatsData }) => {
	const {
		thirtyDayOverdue = 0, threeSixtyDayOverdue = 0, sixtyDayOverdue = 0,
		ninetyDayOverdue = 0, oneEightyDayOverdue = 0, threeSixtyPlusDayOverdue = 0,
	} = accordianStatsData?.apData || {};
	return [
		{
			label    : '0-30 DAYS',
			valueKey	: showInTooltop(
				formatAmount({
					amount   :	(thirtyDayOverdue * -1) as any,
					currency : GLOBAL_CONSTANTS.currency_code.INR,
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',
					},
				}),
				getAmountInLakhCrK((thirtyDayOverdue * -1), GLOBAL_CONSTANTS.currency_code.INR),
			),
			textColor : '#cb6464',
			countKey  : 'pan_count_0_30',
		},
		{
			label    : '30-60 DAYS',
			valueKey	: showInTooltop(
				formatAmount({
					amount   : (threeSixtyDayOverdue * -1) as any,
					currency : GLOBAL_CONSTANTS.currency_code.INR,
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',
					},
				}),
				getAmountInLakhCrK(threeSixtyDayOverdue * -1, GLOBAL_CONSTANTS.currency_code.INR),
			),

			textColor : '#cb6464',
			countKey  : 'pan_count_30_60',
		},
		{
			label    : '60-90 DAYS',
			valueKey	: showInTooltop(
				formatAmount({
					amount   :	(sixtyDayOverdue * -1) as any,
					currency : GLOBAL_CONSTANTS.currency_code.INR,
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',
					},
				}),
				getAmountInLakhCrK(sixtyDayOverdue * -1, GLOBAL_CONSTANTS.currency_code.INR),
			),
			textColor : '#cb6464',
			countKey  : 'pan_count_60_90',
		},
		{
			label    : '90-180 DAYS',
			valueKey	: showInTooltop(
				formatAmount({
					amount   : (ninetyDayOverdue * -1) as any,
					currency : GLOBAL_CONSTANTS.currency_code.INR,
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',
					},
				}),
				getAmountInLakhCrK(ninetyDayOverdue * -1, GLOBAL_CONSTANTS.currency_code.INR),
			),
			textColor : '#cb6464',
			countKey  : 'pan_count_90_180',
		},
		{
			label    : '180-365 DAYS',
			valueKey	: showInTooltop(
				formatAmount({
					amount   :	(oneEightyDayOverdue * -1) as any,
					currency : GLOBAL_CONSTANTS.currency_code.INR,
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',
					},
				}),
				getAmountInLakhCrK(oneEightyDayOverdue * -1, GLOBAL_CONSTANTS.currency_code.INR),
			),
			textColor : '#cb6464',
			countKey  : 'pan_count__180_365',
		},
		{
			label    : '365+ DAYS',
			valueKey	: showInTooltop(
				formatAmount({
					amount   :	(threeSixtyPlusDayOverdue * -1) as any,
					currency :	GLOBAL_CONSTANTS.currency_code.INR,
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',
					},
				}),
				getAmountInLakhCrK(threeSixtyPlusDayOverdue * -1, GLOBAL_CONSTANTS.currency_code.INR),
			),
			textColor : '#cb6464',
			countKey  : 'pan_count_365',
		},
	];
};

export default OverallPayablesStatsKeyMapping;
