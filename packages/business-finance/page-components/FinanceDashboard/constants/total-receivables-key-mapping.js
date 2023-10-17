import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

const totalReceivablesKeyMappings = ({ receivablesData }) => {
	const {
		ninetyDayOverdue = 0, oneEightyDayOverdue = 0, sixtyDayOverdue = 0,
		thirtyDayOverdue = 0, threeSixtyDayOverdue = 0, threeSixtyPlusDayOverdue = 0,
	} = receivablesData || {};
	return [
		{
			label    : '0-30 Days ',
			valueKey : formatAmount({
				amount   :	thirtyDayOverdue,
				currency : GLOBAL_CONSTANTS.currency_code.INR,
				options  : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			}),
			textColor : '#cb6464',
			countKey  : 'pan_count_0_30',
		},
		{
			label    : '30-60 Days ',
			valueKey : formatAmount({
				amount   :	threeSixtyDayOverdue,
				currency : GLOBAL_CONSTANTS.currency_code.INR,
				options  : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			}),
			textColor : '#cb6464',
			countKey  : 'pan_count_30_60',
		},
		{
			label    : '60-90 Days ',
			valueKey : formatAmount({
				amount   :	sixtyDayOverdue,
				currency : GLOBAL_CONSTANTS.currency_code.INR,
				options  : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			}),
			textColor : '#cb6464',
			countKey  : 'pan_count_60_90',
		},
		{
			label    : '90-180 Days ',
			valueKey : formatAmount({
				amount   :	ninetyDayOverdue,
				currency : GLOBAL_CONSTANTS.currency_code.INR,
				options  : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			}),
			textColor : '#cb6464',
			countKey  : 'pan_count_90_180',
		},
		{
			label    : '180-365 Days',
			valueKey : formatAmount({
				amount   :	oneEightyDayOverdue,
				currency : GLOBAL_CONSTANTS.currency_code.INR,
				options  : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			}),
			textColor : '#cb6464',
			countKey  : 'pan_count__180_365',
		},
		{
			label    : '365+ Days ',
			valueKey : formatAmount({
				amount   :	threeSixtyPlusDayOverdue,
				currency : GLOBAL_CONSTANTS.currency_code.INR,
				options  : {
					style           : 'currency',
					currencyDisplay : 'code',
				},
			}),
			textColor : '#cb6464',
			countKey  : 'pan_count_365',
		},
	];
};

export default totalReceivablesKeyMappings;