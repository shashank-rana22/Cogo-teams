import { useSelector } from '@cogoport/store';

import DEFAULT_VIEW from '../stakeholderConfig/defaultView.json';

const TYPE_API_PERMISSION_NOT_GIVEN = ['none'];

const findWhetherApiPermissionIsGiven = ({ api_permission_array = [] }) => {
	const permission_array = api_permission_array.filter((p) => !TYPE_API_PERMISSION_NOT_GIVEN.includes(p?.type));

	return !!permission_array.length;
};

const apiConditionCheck = ({ api_condition = '', api_permission = [], permissions = {} }) => {
	const current_apis_permission = api_permission
		.map((api) => findWhetherApiPermissionIsGiven({ api_permission_array: permissions[api] }));

	switch (api_condition) {
		case 'any_one_api_permission':
			return current_apis_permission.some((i) => i === true);
		default:
			return current_apis_permission.every((i) => i === true);
	}
};

const eachFeatureCheck = ({ feature, permissions }) => {
	const isObject = typeof feature === 'object' && feature !== null;
	if (!isObject) return {};

	let formatted_feature = feature;

	const feature_permission = feature?.feature_permission;

	if (!feature_permission) return {};

	const showFeature = (apiConditionCheck({ ...feature_permission, permissions }) || feature_permission === true);

	if (feature_permission?.add_key_in_feature && showFeature) {
		formatted_feature = { ...formatted_feature, [feature_permission.add_key_in_feature]: true };
	}
	const otherKeysOfFeature = Object.keys(feature).filter((i) => i !== 'feature_permission');

	let finalFeatures = [];

	otherKeysOfFeature.forEach((key) => {
		const {
			showFeature:isShowFeature,
			finalFeatures:finalFeaturesWithSubFeatures = [],
			formatted_feature:formattedFeature,
			isFeatureFormatted,
		} = eachFeatureCheck({
			feature: feature[key],
			permissions,
		});

		if (isFeatureFormatted) {
			formatted_feature[key] = formattedFeature;

			finalFeatures = [...finalFeatures, ...finalFeaturesWithSubFeatures];
		} else if (isShowFeature) {
			finalFeatures = [...finalFeatures, ...finalFeaturesWithSubFeatures, key];
		}
	});

	return {
		finalFeatures,
		showFeature,
		isFeatureFormatted: !!feature_permission?.add_key_in_feature,
		formatted_feature,
	};
};

const useGetDefaultViewValues = () => {
	const user_profile = useSelector(({ profile }) => profile);
	let navigation;
	if (typeof window !== 'undefined') {
		navigation = new URLSearchParams(window?.location?.search)?.get('navigation');
	}

	if (!navigation) return {};

	const permissions = user_profile?.permissions_navigations?.[navigation];

	const { features = [], main_api, ...restConfig } = DEFAULT_VIEW;

	const main_api_permission = apiConditionCheck({ api_permission: main_api, permissions });

	if (!main_api_permission) { return { features: [] }; }

	let final_features = features;

	Object.keys(restConfig).forEach((key) => {
		const {
			finalFeatures = [],
			showFeature,
			formatted_feature,
			isFeatureFormatted,
		} = eachFeatureCheck({ feature: restConfig[key], permissions });

		if (isFeatureFormatted) {
			DEFAULT_VIEW[key] = formatted_feature;

			final_features = [...final_features, ...finalFeatures];
		} else if (showFeature) {
			final_features = [...final_features, ...finalFeatures, key];
		}
	});

	final_features = [...new Set(final_features)];

	return { ...DEFAULT_VIEW, features: final_features };
};

export default useGetDefaultViewValues;
