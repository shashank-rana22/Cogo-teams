import { isEmpty } from '@cogoport/utils';

const getFormValues = (permission, navigation, customPermissions) => {
	const permissions = customPermissions;
	const navigationApi = (permissions || []).find(
		(permissionItem) => permissionItem?.navigation === navigation?.key
			&& permissionItem.resource === permission?.value,
	);
	if (navigationApi) {
		let permissionValue = ['none'];
		if (!isEmpty(navigationApi.role_permission_details)) {
			permissionValue = (navigationApi.role_permission_details || []).map((scope) => scope.view_type);
		}
		const PERMISSION_VALUES = {};
		(navigationApi.role_permission_details || []).forEach((scope) => {
			if (!isEmpty(scope?.through_criteria)) {
				PERMISSION_VALUES[`${permission?.value}-${scope.view_type}`] = scope?.through_criteria;
			}
		});
		return { [permission.value]: permissionValue, ...PERMISSION_VALUES };
	}
	return { [permission.value]: ['none'] };
};
export default getFormValues;
