const getEditHeaders = ({ t = () => {} }) => [
	t('allocation:lifecycle_item'),
	t('allocation:diy_score_warmth_duration'),
	t('allocation:assisted_score_warmth_duration'),
	t('allocation:system_score_warmth_duration'),
	t('allocation:cogoverse_score_warmth_duration'),
];

export default getEditHeaders;
