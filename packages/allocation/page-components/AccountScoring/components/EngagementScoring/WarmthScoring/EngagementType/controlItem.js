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
					label : 'call',
					value : 'call',
				},
				{
					label : 'forgot password',
					value : 'forgot_password',
				},
			],
			style: {
				width: '200px',
			},
		},
		{
			name        : 'diy_score',
			type        : 'number',
			placeholder : 'score',
			style       : {
				width      : '74px',
				marginLeft : '44px',
			},
		},
		{
			name        : 'diy_warmth_duration',
			type        : 'number',
			placeholder : 'days',
			style       : {
				width: '74px',
			},
		},
		{
			name        : 'assisted_score',
			type        : 'number',
			placeholder : 'score',
			style       : {
				width      : '74px',
				marginLeft : '92px',
			},
		},
		{
			name        : 'assisted_warmth_duration',
			type        : 'number',
			placeholder : 'days',
			style       : {
				width: '74px',
			},
		},
		{
			name        : 'system_score',
			type        : 'number',
			placeholder : 'score',
			style       : {
				width      : '74px',
				marginLeft : '92px',
			},
		},
		{
			name        : 'system_warmth_duration',
			type        : 'number',
			placeholder : 'days',
			style       : {
				width: '74px',
			},
		},
		{
			name        : 'cogoverse_score',
			type        : 'number',
			placeholder : 'score',
			style       : {
				width      : '74px',
				marginLeft : '92px',
			},
		},
		{
			name        : 'cogoverse_warmth_duration',
			type        : 'number',
			placeholder : 'days',
			style       : {
				width       : '74px',
				marginRight : '30px',
			},
		},
	],
}];

export default controlItem;
