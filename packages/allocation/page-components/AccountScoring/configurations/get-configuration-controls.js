const getControls = ({ eventsToExclude, engagementType }) => {
	const controlItem = {
		name     : 'single_item',
		type     : 'fieldArray',
		controls : [
			{
				name        : 'event_name',
				type        : 'asyncSelect',
				placeholder : 'Select...',
				asyncKey    : 'engagement_scoring_events',
				initialCall : false,
				params      : {
					filters: {
						present_names : eventsToExclude,
						category      : engagementType,
					},
				},
				style: {
					width: '220px',
				},
			},
			{
				name        : 'diy_score',
				type        : 'number',
				placeholder : 'score',
				style       : {
					width      : '74px',
					marginLeft : '16px',
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
					marginLeft : '90px',
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
					marginLeft : '90px',
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
					marginLeft : '90px',
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
	};
	return controlItem;
};

export default getControls;
