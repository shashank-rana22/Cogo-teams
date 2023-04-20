const list = [
	{
		engagement_type : 'onboarding',
		sub_list        : [
			{
				lifecycle_item            : 'email_and_mobile_verification',
				diy_score                 : 10,
				diy_warmth_duration       : 3,
				assisted_score            : 20,
				assisted_warmth_duration  : 5,
				system_score              : 5,
				system_warmth_duration    : 10,
				cogoverse_score           : 10,
				cogoverse_warmth_duration : 2,
			},
			{
				lifecycle_item            : 'onboarding_basic_information',
				diy_score                 : 10,
				diy_warmth_duration       : 3,
				assisted_score            : 20,
				assisted_warmth_duration  : 5,
				system_score              : 5,
				system_warmth_duration    : 10,
				cogoverse_score           : 10,
				cogoverse_warmth_duration : 2,
			},
		],
	},
	{
		engagement_type : 'login',
		sub_list        : [
			{
				lifecycle_item            : 'login',
				diy_score                 : 10,
				diy_warmth_duration       : 3,
				assisted_score            : 20,
				assisted_warmth_duration  : 5,
				system_score              : 5,
				system_warmth_duration    : 10,
				cogoverse_score           : 10,
				cogoverse_warmth_duration : 2,
			},
			{
				lifecycle_item            : 'forgot_password',
				diy_score                 : 20,
				diy_warmth_duration       : 3,
				assisted_score            : 70,
				assisted_warmth_duration  : 5,
				system_score              : 5,
				system_warmth_duration    : 10,
				cogoverse_score           : 10,
				cogoverse_warmth_duration : 2,
			},
		],
	},
];

export default list;
