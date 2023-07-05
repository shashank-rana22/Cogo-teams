import addonConfig from '../configuration/addonConfig';
import planFeatureConfig from '../configuration/planFeatureConfig';

export const getFeatureMapping = ({ add_ons = [], plan_features = [] }) => ([
	{
		name   : 'addon',
		title  : 'Add-ons',
		list   : add_ons || [],
		config : addonConfig,
	},
	{
		name   : 'planFeature',
		title  : 'Plan Feature',
		list   : plan_features || [],
		config : planFeatureConfig,
	},
]);
