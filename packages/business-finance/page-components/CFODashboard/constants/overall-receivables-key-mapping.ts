import getFormattedPrice from '../../commons/utils/getFormattedPrice';
import { getAmountInLakhCrK } from '../Logistics/getAmountInLakhCrK';
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
				getFormattedPrice(thirtyDayOverdue, 'INR'),
				getAmountInLakhCrK(thirtyDayOverdue, 'INR'),
			),
			textColor : '#cb6464',
			countKey  : 'pan_count_0_30',
		},
		{
			label    : '30-60 DAYS',
			valueKey	: showInTooltop(
				getFormattedPrice(threeSixtyDayOverdue, 'INR'),
				getAmountInLakhCrK(threeSixtyDayOverdue, 'INR'),
			),
			textColor : '#cb6464',
			countKey  : 'pan_count_30_60',
		},
		{
			label    : '60-90 DAYS',
			valueKey	: showInTooltop(
				getFormattedPrice(sixtyDayOverdue, 'INR'),
				getAmountInLakhCrK(sixtyDayOverdue, 'INR'),
			),
			textColor : '#cb6464',
			countKey  : 'pan_count_60_90',
		},
		{
			label    : '90-180 DAYS',
			valueKey	: showInTooltop(
				getFormattedPrice(ninetyDayOverdue, 'INR'),
				getAmountInLakhCrK(ninetyDayOverdue, 'INR'),
			),
			textColor : '#cb6464',
			countKey  : 'pan_count_90_180',
		},
		{
			label    : '180-365 DAYS',
			valueKey	: showInTooltop(
				getFormattedPrice(oneEightyDayOverdue, 'INR'),
				getAmountInLakhCrK(oneEightyDayOverdue, 'INR'),
			),
			textColor : '#cb6464',
			countKey  : 'pan_count__180_365',
		},
		{
			label    : '365+ DAYS',
			valueKey	: showInTooltop(
				getFormattedPrice(threeSixtyPlusDayOverdue, 'INR'),
				getAmountInLakhCrK(threeSixtyPlusDayOverdue, 'INR'),
			),
			textColor : '#cb6464',
			countKey  : 'pan_count_365',
		},
	];
};

export default OverallReceivablesStatsKeyMapping;
