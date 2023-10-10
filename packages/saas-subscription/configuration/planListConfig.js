const getPlanListConfig = ({ t }) => [
	{
		key   : 'display_name',
		title : t('saasSubscription:plan_config_name'),
		width : '20%',
	},
	{
		key   : 'description',
		title : t('saasSubscription:plan_config_desc'),
		width : '20%',
	},
	{
		key        : 'family',
		title      : t('saasSubscription:plan_config_family'),
		width      : '23%',
		renderFunc : 'renderFamilyName',
	},
	{
		key        : 'updated_at',
		title      : t('saasSubscription:plan_config_updated_at'),
		width      : '20%',
		renderFunc : 'renderDate',
	},

	{
		key        : 'is_active',
		title      : '',
		width      : '17%',
		renderFunc : 'renderExtraDetails',
	},
];

const getPlanDetailsConfig = ({ isPlanDetail = false, t }) => {
	const planListConfig = getPlanListConfig({ t });

	if (!isPlanDetail) return planListConfig;

	return planListConfig.filter((planList) => planList.key !== 'family');
};

export default getPlanListConfig;
export { getPlanDetailsConfig };
