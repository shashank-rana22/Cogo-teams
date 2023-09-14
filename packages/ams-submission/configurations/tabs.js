const tabs = ({ t = () => {} }) => [
	{
		label : t('amsSubmission:tab_label_tc_status_check'),
		name  : 'tc_status_check',
	},
	{
		label : t('amsSubmission:tab_label_td_status_check'),
		name  : 'td_status_check',
	},
];

export default tabs;
