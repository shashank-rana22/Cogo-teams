import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

const FIRST_INDEX = 1;

const mergeValues = (restArray, obj, value) => {
	const newObj = typeof obj !== 'object' ? {} : obj;
	if (restArray.length === FIRST_INDEX) {
		return {
			...(obj || {}),
			[restArray[GLOBAL_CONSTANTS.zeroth_index]]: {
				...(obj?.[restArray[GLOBAL_CONSTANTS.zeroth_index]] || {}),
				possible_apis: [...(obj.possible_apis || []), ...value],
			},
		};
	}
	const [key, ...arrayToPass] = restArray;
	newObj[key] = mergeValues(arrayToPass, obj[key] || {}, value);
	return newObj;
};

const formatApis = (apis, permissions) => {
	const POSSIBLE_APIS = [];
	Object.keys(apis).forEach((api) => {
		const apiObject = permissions[api] || {};
		const options = (apiObject?.scopes || []).map((optionScope) => {
			const possibleOptions = (optionScope.through_criteria || []).map((criteria) => ({
				type              : criteria,
				type_display_name : startCase(criteria),
			}));

			return {
				...optionScope,
				options: possibleOptions || [],
			};
		});
		const isApiRegisteredAtBackend = options.length > GLOBAL_CONSTANTS.zeroth_index;
		options.push({ view_type: 'none', options: [] });
		if (isApiRegisteredAtBackend) {
			POSSIBLE_APIS.push({
				value: api,
				...apiObject,
				options,
			});
		}
	});
	return POSSIBLE_APIS;
};

const getNavigationOptions = (permissions, navObj) => {
	if (permissions) {
		const item = navObj;
		const { key = '' } = item;
		const HASHED_APIS = {};
		item.possible_apis?.forEach((apiObj) => {
			const feature = apiObj?.feature || key;
			const oldApisBelongingToFeature = HASHED_APIS[feature] || {};
			HASHED_APIS[feature] = {
				...oldApisBelongingToFeature,
				[apiObj.api]: { ...apiObj, feature: apiObj?.feature || key },
			};
		});
		let groupedAPis = {};
		Object.keys(HASHED_APIS).forEach((feature) => {
			const featureApis = HASHED_APIS[feature];
			const features = feature.split(':');
			const formattedAPIs = formatApis(featureApis, permissions);
			const newPathValues = mergeValues(
				features,
				groupedAPis || {},
				formattedAPIs,
			);
			groupedAPis = { ...groupedAPis, ...newPathValues };
		});

		return {
			...item,
			grouped_apis: groupedAPis,
		};
	}
	return {};
};

export default getNavigationOptions;
