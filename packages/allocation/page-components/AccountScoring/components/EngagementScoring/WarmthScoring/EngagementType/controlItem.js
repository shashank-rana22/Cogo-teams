const controlItem = [{
	name     : 'single_item',
	type     : 'fieldArray',
	controls : [
		{
			name        : 'lifecycle_item',
			type        : 'select',
			placeholder : 'Select...',
			options     : [
				{
					label : 'email and mobile verification',
					value : 'email_and_mobile_verification',
				},
				{
					label : 'onboarding basic information',
					value : 'onboarding_basic_information',
				},
				{
					label : 'login',
					value : 'login',
				},
				{
					label : 'forgot password',
					value : 'forgot_password',
				},
			],
		},
		{
			name        : 'diy_score',
			type        : 'number',
			placeholder : 'score',
		},
		{
			name        : 'diy_warmth_duration',
			type        : 'number',
			placeholder : 'days',
		},
		{
			name        : 'assisted_score',
			type        : 'number',
			placeholder : 'score',
		},
		{
			name        : 'assisted_warmth_duration',
			type        : 'number',
			placeholder : 'days',
		},
		{
			name        : 'system_score',
			type        : 'number',
			placeholder : 'score',
		},
		{
			name        : 'system_warmth_duration',
			type        : 'number',
			placeholder : 'days',
		},
		{
			name        : 'cogoverse_score',
			type        : 'number',
			placeholder : 'score',
		},
		{
			name        : 'cogoverse_warmth_duration',
			type        : 'number',
			placeholder : 'days',
		},
	],
}];

export default controlItem;
