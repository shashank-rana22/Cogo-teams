const getControlMapping = ({ t = () => {} }) => ({
	percentage: [{
		name               : 'milestones',
		label              : t('allocation:percentage_fieldarray_label'),
		type               : 'fieldArray',
		buttonText         : t('allocation:percentage_fieldarray_button_text'),
		noDeleteButtonTill : 1,
		controls           : [
			{
				name        : 'percentage',
				type        : 'number',
				label       : t('allocation:milestone_label'),
				placeholder : '0',
				rules       : { required: t('allocation:milestone_is_required') },
				min         : 0,
			},
			{
				name        : 'score',
				type        : 'number',
				label       : t('allocation:score_label'),
				placeholder : '0',
				rules       : { required: t('allocation:score_is_required') },
				min         : 0,
			},
		],
	}],
	tat: [{
		name               : 'tat',
		label              : t('allocation:tat_fieldarray_label'),
		type               : 'fieldArray',
		buttonText         : t('allocation:percentage_fieldarray_button_text'),
		noDeleteButtonTill : 1,
		controls           : [
			{
				name        : 'lower',
				type        : 'number',
				label       : t('allocation:from_label'),
				placeholder : '0',
				rules       : { required: t('allocation:from_is_required') },
				min         : 0,
			},
			{
				name        : 'upper',
				type        : 'number',
				label       : t('allocation:to_label'),
				placeholder : '0',
				rules       : { required: t('allocation:to_is_required') },
				min         : 0,
			},
			{
				name        : 'score',
				type        : 'number',
				label       : t('allocation:score_label'),
				placeholder : '0',
				rules       : { required: t('allocation:score_is_required') },
				min         : 0,
			},
		],
	}],
	absolute: [{
		name        : 'first_completion',
		type        : 'number',
		label       : t('allocation:first_completion_label'),
		placeholder : '0',
		rules       : { required: t('allocation:first_completion_rules_required') },
		min         : 0,
	},
	{
		name        : 'second_completion',
		type        : 'number',
		label       : t('allocation:second_completion_label'),
		placeholder : '0',
		rules       : { required: t('allocation:second_completion_rules_required') },
		min         : 0,
	},
	],
});

export default getControlMapping;
