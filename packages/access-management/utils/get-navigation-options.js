const mergeValues = (restArray, obj, value) => {
	const newObj = typeof obj !== 'object' ? {} : obj;
	if (restArray.length === 1) {
		return {
			...(obj || {}),
			[restArray[0]]: {
				...(obj?.[restArray[0]] || {}),
				possible_apis: [...(obj.possible_apis || []), ...value],
			},
		};
	}
	const [key, ...arrayToPass] = restArray;
	newObj[key] = mergeValues(arrayToPass, obj[key] || {}, value);
	return newObj;
};

const formatApis = (apis, permissions) => {
	const possible_apis = [];
	Object.keys(apis).forEach((api) => {
		const apiObject = permissions[api] || {};
		const options = (apiObject?.scopes || []).map((optionScope) => ({
			...optionScope,
			options: optionScope.through_criteria || [],
		}));
		const isApiRegisteredAtBackend = options.length > 0;
		options.push({ type: 'none', options: [] });
		if (isApiRegisteredAtBackend) {
			possible_apis.push({
				value: api,
				...apiObject,
				options,
			});
		}
	});
	return possible_apis;
};

const getNavigationOptions = (permissions, navObj) => {
	if (permissions) {
		const item = navObj;
		const { key = '' } = item;
		const hashedAPis = {};
		item.possible_apis?.forEach((apiObj) => {
			const feature = apiObj?.feature || key;
			const oldApisBelongingToFeature = hashedAPis[feature] || {};
			hashedAPis[feature] = {
				...oldApisBelongingToFeature,
				[apiObj.api]: { ...apiObj, feature: apiObj?.feature || key },
			};
		});
		let groupedAPis = {};
		Object.keys(hashedAPis).forEach((feature) => {
			const featureApis = hashedAPis[feature];
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
