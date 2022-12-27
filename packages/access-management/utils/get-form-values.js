const getFormValues = (permission, navigation, customPermissions) => {
	const permissions = customPermissions;
	const navigationApi = (permissions || []).find(
		(permissionItem) => permissionItem?.navigation === navigation?.key
			&& permissionItem.resource_name === permission?.value,
	);
	if (navigationApi) {
		let permissionValue = ['none'];
		if ((navigationApi.scopes || []).length) {
			permissionValue = (navigationApi.scopes || []).map((scope) => scope.type);
		}
		const permissionValues = {};
		(navigationApi.scopes || []).forEach((scope) => {
			if ((scope?.through_criteria || []).length) {
				permissionValues[`${permission?.value}-${scope.type}`] =					scope?.through_criteria;
			}
		});
		return { [permission.value]: permissionValue, ...permissionValues };
	}
	return { [permission.value]: ['none'] };
};
export default getFormValues;
