import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import showInTooltop from '../utils/getOverFlowData';

const OverallReceivablesStatsKeyMapping = ({ accordianStatsData }) => {
	const {
		thirtyDayOverdue = 0, threeSixtyDayOverdue = 0, sixtyDayOverdue = 0,
		ninetyDayOverdue = 0, oneEightyDayOverdue = 0, threeSixtyPlusDayOverdue = 0,
	} = accordianStatsData?.arData || {};
	return [
		{
			label    : '0-30 DAYS',
			valueKey	: showInTooltop(
				formatAmount({
					amount   :	thirtyDayOverdue,
					currency : GLOBAL_CONSTANTS.currency_code.INR,
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',
					},
				}),
				formatAmount({
					amount   :	thirtyDayOverdue,
					currency : GLOBAL_CONSTANTS.currency_code.INR,
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',
						notation        : 'compact',
					},
				}),
			),
			textColor : '#cb6464',
			countKey  : 'pan_count_0_30',
		},
		{
			label    : '30-60 DAYS',
			valueKey	: showInTooltop(
				formatAmount({
					amount   : threeSixtyDayOverdue,
					currency : GLOBAL_CONSTANTS.currency_code.INR,
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',
					},
				}),
				formatAmount({
					amount   :	threeSixtyDayOverdue,
					currency : GLOBAL_CONSTANTS.currency_code.INR,
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',
						notation        : 'compact',

					},
				}),
			),
			textColor : '#cb6464',
			countKey  : 'pan_count_30_60',
		},
		{
			label    : '60-90 DAYS',
			valueKey	: showInTooltop(
				formatAmount({
					amount   :	sixtyDayOverdue,
					currency : GLOBAL_CONSTANTS.currency_code.INR,
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',
					},
				}),
				formatAmount({
					amount   :	sixtyDayOverdue,
					currency : GLOBAL_CONSTANTS.currency_code.INR,
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',
						notation        : 'compact',

					},
				}),
			),
			textColor : '#cb6464',
			countKey  : 'pan_count_60_90',
		},
		{
			label    : '90-180 DAYS',
			valueKey	: showInTooltop(
				formatAmount({
					amount   :	ninetyDayOverdue,
					currency : GLOBAL_CONSTANTS.currency_code.INR,
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',
					},
				}),
				formatAmount({
					amount   :	ninetyDayOverdue,
					currency : GLOBAL_CONSTANTS.currency_code.INR,
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',
						notation        : 'compact',

					},
				}),
			),
			textColor : '#cb6464',
			countKey  : 'pan_count_90_180',
		},
		{
			label    : '180-365 DAYS',
			valueKey	: showInTooltop(
				formatAmount({
					amount   :	oneEightyDayOverdue,
					currency : GLOBAL_CONSTANTS.currency_code.INR,
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',
					},
				}),
				formatAmount({
					amount   :	oneEightyDayOverdue,
					currency : GLOBAL_CONSTANTS.currency_code.INR,
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',
						notation        : 'compact',

					},
				}),
			),
			textColor : '#cb6464',
			countKey  : 'pan_count__180_365',
		},
		{
			label    : '365+ DAYS',
			valueKey	: showInTooltop(
				formatAmount({
					amount   :	threeSixtyPlusDayOverdue,
					currency : GLOBAL_CONSTANTS.currency_code.INR,
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',
					},
				}),
				formatAmount({
					amount   :	threeSixtyPlusDayOverdue,
					currency : GLOBAL_CONSTANTS.currency_code.INR,
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',
						notation        : 'compact',

					},
				}),
			),
			textColor : '#cb6464',
			countKey  : 'pan_count_365',
		},
	];
};

export default OverallReceivablesStatsKeyMapping;
