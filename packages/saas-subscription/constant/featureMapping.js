import getAddonConfig from '../configuration/addonConfig';
import getPlanFeatureConfig from '../configuration/planFeatureConfig';

export const getFeatureMapping = ({ add_ons = [], plan_features = [], t }) => ([
	{
		name   : 'addon',
		title  : t('saasSubscription:pricing_feature_mapping'),
		list   : add_ons || [],
		config : getAddonConfig({ t }),
	},
	{
		name   : 'planFeature',
		title  : t('saasSubscription:pricing_feature_plan'),
		list   : plan_features || [],
		config : getPlanFeatureConfig({ t }),
	},
]);
