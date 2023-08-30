const getControls = ({ eventsToExclude, engagementType, t = () => {} }) => {
	const controlItem = {
		name     : 'single_item',
		type     : 'fieldArray',
		controls : [
			{
				name        : 'event_name',
				type        : 'asyncSelect',
				placeholder : t('allocation:event_name_placeholder'),
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
				placeholder : t('allocation:score_placeholder'),
				min         : 0,
				style       : {
					width      : '74px',
					marginLeft : '16px',
				},
			},
			{
				name        : 'diy_warmth_duration',
				type        : 'number',
				placeholder : t('allocation:days_placeholder'),
				min         : 0,
				style       : {
					width: '74px',
				},
			},
			{
				name        : 'assisted_score',
				type        : 'number',
				placeholder : t('allocation:score_placeholder'),
				min         : 0,
				style       : {
					width      : '74px',
					marginLeft : '90px',
				},
			},
			{
				name        : 'assisted_warmth_duration',
				type        : 'number',
				placeholder : t('allocation:days_placeholder'),
				min         : 0,
				style       : {
					width: '74px',
				},
			},
			{
				name        : 'system_score',
				type        : 'number',
				placeholder : t('allocation:score_placeholder'),
				min         : 0,
				style       : {
					width      : '74px',
					marginLeft : '90px',
				},
			},
			{
				name        : 'system_warmth_duration',
				type        : 'number',
				placeholder : t('allocation:days_placeholder'),
				min         : 0,
				style       : {
					width: '74px',
				},
			},
			{
				name        : 'cogoverse_score',
				type        : 'number',
				placeholder : t('allocation:score_placeholder'),
				min         : 0,
				style       : {
					width      : '74px',
					marginLeft : '90px',
				},
			},
			{
				name        : 'cogoverse_warmth_duration',
				type        : 'number',
				placeholder : t('allocation:days_placeholder'),
				min         : 0,
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
