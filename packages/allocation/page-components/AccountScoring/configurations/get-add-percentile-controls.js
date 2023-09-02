const MIN = 0;
const MAX = 100;

const controls = (item, t = () => {}) => {
	const { id = '', lower_limit = 0, upper_limit = 0, score = 0 } = item || {};

	return ([
		{
			name        : `${id}_percentile_from`,
			label       : t('allocation:percentile_from'),
			placeholder : '0',
			type        : 'number',
			value       : lower_limit,
			rules       : {
				required : t('allocation:rules_required'),
				validate : (value) => ((value < MIN || value > MAX) ? t('allocation:rules_validate') : true),
			},
			isClearable : true,
			min         : 0,
			max         : 100,
		},
		{
			name        : `${id}_percentile_to`,
			label       : t('allocation:percentile_to'),
			placeholder : '0',
			type        : 'number',
			value       : upper_limit,
			rules       : {
				required : t('allocation:rules_required'),
				validate : (value) => ((value < MIN || value > MAX) ? t('allocation:rules_validate') : true),
			},
			isClearable : true,
			min         : 0,
			max         : 100,
		},
		{
			name        : `${id}_bias_score`,
			label       : t('allocation:bias_score'),
			placeholder : '0',
			type        : 'number',
			value       : score,
			rules       : {
				required: t('allocation:rules_required'),
			},
			isClearable : true,
			min         : 0,
		},
	]);
};

export default controls;
