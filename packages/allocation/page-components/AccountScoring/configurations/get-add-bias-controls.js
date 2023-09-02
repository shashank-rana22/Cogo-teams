const MIN = 0;
const MAX = 90;

const controls = (item, t = () => {}) => {
	const { id = '', lower_limit = 0, upper_limit = 0, score = 0 } = item || {};

	return ([
		{
			name        : `${id}_age_from`,
			label       : t('allocation:age_from_days'),
			placeholder : '0',
			type        : 'number',
			value       : `${lower_limit}`,
			rules       : {
				required : t('allocation:rules_required'),
				validate : (value) => ((value < MIN || value > MAX) ? t('allocation:rules_validate') : true),
			},
			isClearable : true,
			min         : 0,
			max         : 90,
		},
		{
			name        : `${id}_age_to`,
			label       : t('allocation:age_to_days'),
			placeholder : '0',
			type        : 'number',
			value       : `${upper_limit}`,
			rules       : {
				required : t('allocation:rules_required'),
				validate : (value) => ((value < MIN || value > MAX) ? t('allocation:rules_validate') : true),
			},
			isClearable : true,
			min         : 0,
			max         : 90,
		},
		{
			name        : `${id}_multiplier`,
			label       : t('allocation:multiplier'),
			placeholder : '0',
			type        : 'number',
			value       : score,
			rules       : {
				required: t('allocation:rules_required'),
			},
			isClearable : true,
			min         : 0,
			max         : 90,
		},
	]);
};

export default controls;
