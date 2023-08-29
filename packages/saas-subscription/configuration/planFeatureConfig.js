const getPlanFeatureConfig = ({ t }) => [
	{
		key   : 'value',
		title : t('saasSubscription:pricing_plan_config_val'),
		width : '50%',
	},
	{
		key   : 'display_name',
		title : t('saasSubscription:pricing_plan_config_name'),
		width : '50%',
	},
];

const getUpdatePlanFeatureConfig = ({ t }) => [
	{
		key   : 'value',
		title : t('saasSubscription:pricing_update_plan_config_val'),
		width : '25%',
	},
	{
		key   : 'feature_name',
		title : t('saasSubscription:pricing_update_plan_config_name'),
		width : '45%',
	},
	{
		key   : 'sequence',
		title : t('saasSubscription:pricing_update_plan_config_seq'),
		width : '20%',
	},
];
export default getPlanFeatureConfig;
export { getUpdatePlanFeatureConfig };
