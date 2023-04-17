import getFormattedPrice from '../../commons/utils/getFormattedPrice';

const totalPayablesKeyMappings = ({ payablesData }) => {
	const {
		ninetyDayOverdue = 0, oneEightyDayOverdue = 0, sixtyDayOverdue = 0,
		thirtyDayOverdue = 0, threeSixtyDayOverdue = 0, threeSixtyPlusDayOverdue = 0,
	} = payablesData || {};
	return [
		{
			label     : '0-30 Days ',
			valueKey  : getFormattedPrice(Math.abs(thirtyDayOverdue), 'INR'),
			textColor : '#cb6464',
			countKey  : 'pan_count_0_30',
		},
		{
			label     : '30-60 Days ',
			valueKey  : getFormattedPrice(Math.abs(threeSixtyDayOverdue), 'INR'),
			textColor : '#cb6464',
			countKey  : 'pan_count_30_60',
		},
		{
			label     : '60-90 Days ',
			valueKey  : getFormattedPrice(Math.abs(sixtyDayOverdue), 'INR'),
			textColor : '#cb6464',
			countKey  : 'pan_count_60_90',
		},
		{
			label     : '90-180 Days ',
			valueKey  : getFormattedPrice(Math.abs(ninetyDayOverdue), 'INR'),
			textColor : '#cb6464',
			countKey  : 'pan_count_90_180',
		},
		{
			label     : '180-365 Days',
			valueKey  : getFormattedPrice(Math.abs(oneEightyDayOverdue), 'INR'),
			textColor : '#cb6464',
			countKey  : 'pan_count__180_365',
		},
		{
			label     : '365+ Days ',
			valueKey  : getFormattedPrice(Math.abs(threeSixtyPlusDayOverdue), 'INR'),
			textColor : '#cb6464',
			countKey  : 'pan_count_365',
		},
	];
};

export default totalPayablesKeyMappings;
