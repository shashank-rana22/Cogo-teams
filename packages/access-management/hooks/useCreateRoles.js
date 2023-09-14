import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useAuthRequest } from '@cogoport/request';
import { useTranslation } from 'next-i18next';

const FIRST_INDEX = 1;

export const formatNavigations = (navigationPermissions) => Object.keys(navigationPermissions)
	.map((navigation) => {
		const item = navigationPermissions[navigation];
		if (item) {
			return {
				navigation,
				permissions: Object.keys(item).map((api) => {
					const apiItem = item[api];
					const DETAILS = [];
					const scopeValues = apiItem[api];
					scopeValues.forEach((scope) => {
						const key = `${api}-${scope}`;
						if (key !== api) {
							DETAILS.push({
								view_type        : scope,
								through_criteria : apiItem[key] || [],
								status           : true,
							});
						}
					});
					return {
						resource    : api,
						details     : DETAILS,
						is_inactive : apiItem?.is_inactive,
					};
				}),
			};
		}
		return null;
	})
	.filter((item) => !!item);

const getChangedPayload = (previousData, formattedPermissions) => {
	const NEW_PAYLOAD = [];
	formattedPermissions?.forEach((item) => {
		const NEW_FORMATTED_NAV_PERMS = {};
		NEW_FORMATTED_NAV_PERMS.navigation = item?.navigation;
		NEW_FORMATTED_NAV_PERMS.permissions = [];
		if (item?.permissions?.length === GLOBAL_CONSTANTS.zeroth_index) {
			// if no possible apis in navigation
			NEW_PAYLOAD.push(NEW_FORMATTED_NAV_PERMS);
		} else {
			const navSpecificPrevData = previousData?.permissions?.filter(
				(p) => p?.navigation === item?.navigation,
			);
			item?.permissions?.forEach((permissionI) => {
				const { is_inactive, ...permission } = permissionI;
				let isScopeTypeChanged = false;
				let isThroughCriteriaChanged = false;
				let removedPermissions = [];
				const permission_scopes = permission?.details;
				const previous_scopes = navSpecificPrevData?.find(
					(navData) => navData?.resource === permission?.resource,
				)?.role_permission_details;
				let prevTypes = [];
				if (!previous_scopes) {
					isScopeTypeChanged = true;
				} else {
					permission_scopes?.forEach((scope) => {
						prevTypes = previous_scopes?.filter(
							(prevScope) => prevScope?.view_type === scope?.view_type,
						);
						if (
							prevTypes?.length === GLOBAL_CONSTANTS.zeroth_index
							|| previous_scopes?.length !== permission_scopes?.length
						) {
							isScopeTypeChanged = true;
						}
						if (scope?.through_criteria?.length > GLOBAL_CONSTANTS.zeroth_index && !isScopeTypeChanged) {
							const difference = scope?.through_criteria?.filter(
								(x) => !prevTypes[GLOBAL_CONSTANTS.zeroth_index]?.through_criteria?.includes(x),
							);
							isThroughCriteriaChanged =								isThroughCriteriaChanged
								|| difference?.length > GLOBAL_CONSTANTS.zeroth_index
								|| scope?.through_criteria?.length
									!== prevTypes[GLOBAL_CONSTANTS.zeroth_index]?.through_criteria?.length;
						}
					});
					if (isScopeTypeChanged) {
						removedPermissions = previous_scopes?.filter(
							(prevScope) => !permission_scopes.some((newScp) => newScp.view_type
							=== prevScope.view_type),
						).map((removedPerms) => ({
							view_type        : removedPerms.view_type,
							through_criteria : removedPerms.through_criteria || [],
							status           : false,
						}));
					}
				}
				if (isScopeTypeChanged || isThroughCriteriaChanged || is_inactive) {
					if (!(isThroughCriteriaChanged || is_inactive)) {
						if (removedPermissions.length) {
							permission.details = [...permission.details, ...removedPermissions];
						}
					}
					NEW_FORMATTED_NAV_PERMS.permissions.push(permission);
				}
			});
			if (NEW_FORMATTED_NAV_PERMS.permissions?.length > GLOBAL_CONSTANTS.zeroth_index) {
				NEW_PAYLOAD.push(NEW_FORMATTED_NAV_PERMS);
			}
		}
	});
	return NEW_PAYLOAD;
};

const BATCH_SIZE = 80;

const useCreateRole = () => {
	const [{ loading }, trigger] = useAuthRequest({
		url    : '/onboard_role',
		method : 'POST',
	}, { autoCancel: false, manual: true });

	const { t } = useTranslation(['accessManagement']);

	const createRole = async (
		auth_role_id,
		navigationPermissions,
		refetch,
		previousData,
	) => {
		let payload = { role_id: auth_role_id };
		const formattedPermissions = formatNavigations(navigationPermissions);
		const permissionPayload = getChangedPayload(
			previousData,
			formattedPermissions,
		);
		const permissions = permissionPayload[GLOBAL_CONSTANTS.zeroth_index]?.permissions || [];
		const navigation = permissionPayload[GLOBAL_CONSTANTS.zeroth_index]?.navigation;
		payload.navigation = navigation;
		if (permissionPayload.length) {
			if (permissions.length > BATCH_SIZE) {
				let isBatchesAvailble = true;
				let currentBatch = 0;
				const ALL_PROMISES = [];
				while (isBatchesAvailble) {
					const PERMISSION_ARRAY = [];
					for (
						let i = currentBatch * BATCH_SIZE;
						i < (currentBatch + FIRST_INDEX) * BATCH_SIZE && i < permissions.length;
						// eslint-disable-next-line no-plusplus
						i++
					) {
						PERMISSION_ARRAY.push(permissions[i]);
						if (i === permissions.length - FIRST_INDEX) {
							isBatchesAvailble = false;
							break;
						}
					}
					ALL_PROMISES.push(
						trigger({
							data: {
								...payload,
								permissions: PERMISSION_ARRAY,
							},
						}),
					);
					currentBatch += FIRST_INDEX;
				}
				try {
					await Promise.all(ALL_PROMISES);
					Toast.success(t('accessManagement:roles_and_permission_use_create_roles_successfull'));
					if (refetch) {
						refetch();
					}
				} catch (err) {
					Toast.error(err.response?.data.error
						|| t('accessManagement:roles_and_permission_use_create_roles_unable'));
				}
			} else {
				payload = {
					...payload,
					permissions,
				};
				try {
					const res = await trigger({ data: payload });
					if (!res.hasError) {
						Toast.success(t('accessManagement:roles_and_permission_use_create_roles_successfull'));
						if (refetch) {
							refetch();
						}
					}
				} catch (err) {
					Toast.error(err.response?.data.error
						|| t('accessManagement:roles_and_permission_use_create_roles_unable'));
				}
			}
		} else {
			Toast.error(t('accessManagement:roles_and_permission_use_create_roles_no_change'));
		}
	};
	return { createRole, loading };
};
export default useCreateRole;
