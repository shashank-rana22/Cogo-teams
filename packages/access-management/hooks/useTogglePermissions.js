import { useState, useEffect } from 'react';

import getFormValues from '../utils/get-form-values';

const getScopes = (navigation, api) => {
	const { selectedDepartments } = navigation || {};
	const { scopes, through_criteria } = selectedDepartments || {};
	const eligibleScopes = (api.scopes || []).filter((scope) => scopes.includes(scope.type));
	const newScopes = [];
	eligibleScopes.forEach((scope) => {
		const eligibleTC = (scope.through_criteria || []).filter((tc) => (through_criteria || []).includes(tc.type));
		if (!(scope.through_criteria || []).length || eligibleTC.length) {
			newScopes.push({
				type             : scope.type,
				through_criteria : eligibleTC.map((tc) => tc.type),
			});
		}
	});
	return newScopes;
};

const pushPermValues = (
	apiGroup,
	navigation,
	groupedPermissions,
	type = 'none',
) => {
	const { possible_apis = [], ...rest } = apiGroup || {};
	possible_apis.forEach((api) => {
		const scopes =			type === 'none'
			? [{ type: 'none', through_criteria: [], is_default_params_required: true }]
			: getScopes(navigation, api);
		groupedPermissions.push({
			resource_name              : api.value,
			navigation                 : navigation?.key,
			all_scope_types            : scopes.map((scope) => scope.type),
			all_scope_through_criteria : [],
			id                         : `${api.value}_${navigation?.key}`,
			scopes,
		});
	});
	Object.keys(rest || {}).forEach((key) => {
		pushPermValues(rest[key], navigation, groupedPermissions);
	});
};

const formatValues = (apiGroup, selectedDepartments, navigation, roleData) => {
	if (roleData.isImported) {
		return roleData.importedPermissions;
	}
	if (!navigation?.isActive) {
		const groupedPermissions = [];
		pushPermValues(
			apiGroup,
			{ ...navigation, selectedDepartments },
			groupedPermissions,
			'generic',
		);
		return groupedPermissions;
	}
	return roleData?.permissions || [];
};

const pushNoneToAllValues = (apiGroup, navigation) => {
	const groupedPermissions = [];
	pushPermValues(apiGroup, navigation, groupedPermissions, 'none');
	return groupedPermissions;
};

const pushAllowedToAll = (apiGroup, navigation) => {
	const groupedPermissions = [];
	pushPermValues(
		apiGroup,
		{
			...navigation,
			selectedDepartments: { scopes: ['all', 'allowed'], through_criteria: [] },
		},
		groupedPermissions,
		'generic',
	);
	return groupedPermissions;
};

const isAnyApiSelectedFunc = (initilaFormValues) => {
	let isAnyApiSelected = false;
	Object.keys(initilaFormValues).forEach((key) => {
		const api = key.split(':')[1];
		const apiScopes = initilaFormValues?.[key]?.values?.[api] || [];
		if (apiScopes.length && !apiScopes.includes('none')) {
			isAnyApiSelected = true;
		}
	});
	return isAnyApiSelected;
};

const useTogglePermissions = (props) => {
	const {
		apiGroup = {},
		roleData = {},
		navigation = {},
		selectedDepartments,
		setNavigationRefs = () => {},
	} = props || {};

	const formattedApiPermissions = formatValues(
		apiGroup,
		selectedDepartments,
		navigation,
		roleData,
	);
	const [show, setShow] = useState(false);
	const [value, setValue] = useState(null);
	const [newApiPermissions, setNewApiPermissions] = useState(
		formattedApiPermissions || [],
	);

	const handleApiStatus = (val) => {
		if (val === 'yes') {
			const isAnyApiSelected = isAnyApiSelectedFunc(formattedApiPermissions);
			if (isAnyApiSelected) {
				setNewApiPermissions(formattedApiPermissions);
			} else {
				setNewApiPermissions(pushAllowedToAll(apiGroup, navigation));
			}
		} else {
			const formattedApiPermission = pushNoneToAllValues(apiGroup, navigation);
			setNewApiPermissions(formattedApiPermission);
		}
		setValue(val);
	};

	const setInitialFormValues = (apiValues) => {
		let allApiValues = {};
		const { possible_apis = [], ...rest } = apiValues || {};
		possible_apis.forEach((permission) => {
			const apivalues = getFormValues(
				permission,
				navigation,
				newApiPermissions,
			);
			allApiValues[`${navigation.key}:${permission.value}`] = {
				values: apivalues,
			};
		});
		Object.keys(rest).forEach((key) => {
			const childApiValues = setInitialFormValues(rest[key]);
			allApiValues = { ...allApiValues, ...childApiValues };
		});
		return allApiValues;
	};

	const handleSetNavRef = (r, api) => {
		setNavigationRefs({ [`${navigation.key}:${api.value}`]: r });
		if (value === 'no' && !(r.values[api.value] || []).includes('none')) {
			setValue('yes');
		}
	};

	useEffect(() => {
		const initilaFormValues = setInitialFormValues(apiGroup);
		setNavigationRefs(initilaFormValues);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [show, JSON.stringify(apiGroup), JSON.stringify(newApiPermissions)]);

	useEffect(() => {
		const initilaFormValues = setInitialFormValues(apiGroup);
		const isAnyApiSelected = isAnyApiSelectedFunc(initilaFormValues);
		setValue(isAnyApiSelected ? 'yes' : 'no');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [show]);

	return {
		handleApiStatus,
		newApiPermissions,
		value,
		show,
		setShow,
		handleSetNavRef,
	};
};

export default useTogglePermissions;
