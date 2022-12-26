import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

export const formatNavigations = (navigationPermissions) => Object.keys(navigationPermissions)
	.map((navigation) => {
		const item = navigationPermissions[navigation];
		if (item) {
			return {
				navigation,
				permissions: Object.keys(item).map((api) => {
					const apiItem = item[api];
					const scopes = [];
					const scopeValues = apiItem[api];
					scopeValues.forEach((scope) => {
						const key = `${api}-${scope}`;
						if (key !== api) {
							scopes.push({
								type             : scope,
								through_criteria : apiItem[key] || [],
							});
						}
					});
					return {
						resource_name : api,
						scopes,
						is_inactive   : apiItem?.is_inactive,
					};
				}),
			};
		}
		return null;
	})
	.filter((item) => !!item);

const getChangedPayload = (previousData, formattedPermissions) => {
	const newPayload = [];
	formattedPermissions?.forEach((item) => {
		const newFormattedNavPerms = {};
		newFormattedNavPerms.navigation = item?.navigation;
		newFormattedNavPerms.permissions = [];
		if (item?.permissions?.length === 0) {
			// if no possible apis in navigation
			newPayload.push(newFormattedNavPerms);
		} else {
			const navSpecificPrevData = previousData?.permissions?.filter(
				(p) => p?.navigation === item?.navigation,
			);
			item?.permissions?.forEach((permissionI) => {
				const { is_inactive, ...permission } = permissionI;
				let isScopeTypeChanged = false;
				let isThroughCriteriaChanged = false;
				const permission_scopes = permission?.scopes;
				const previous_scopes = navSpecificPrevData?.find(
					(navData) => navData?.resource_name === permission?.resource_name,
				)?.scopes;
				let prevTypes = [];
				if (!previous_scopes) {
					isScopeTypeChanged = true;
				} else {
					permission_scopes?.forEach((scope) => {
						prevTypes = previous_scopes?.filter(
							(prevScope) => prevScope?.type === scope?.type,
						);
						if (
							prevTypes?.length === 0
							|| previous_scopes?.length !== permission_scopes?.length
						) {
							isScopeTypeChanged = true;
						}
						if (scope?.through_criteria?.length > 0 && !isScopeTypeChanged) {
							const difference = scope?.through_criteria?.filter(
								(x) => !prevTypes[0]?.through_criteria?.includes(x),
							);
							isThroughCriteriaChanged =								isThroughCriteriaChanged
								|| difference?.length > 0
								|| scope?.through_criteria?.length
									!== prevTypes[0]?.through_criteria?.length;
						}
					});
				}
				if (isScopeTypeChanged || isThroughCriteriaChanged || is_inactive) {
					newFormattedNavPerms.permissions.push(permission);
				}
			});
			if (newFormattedNavPerms.permissions?.length > 0) {
				newPayload.push(newFormattedNavPerms);
			}
		}
	});
	return newPayload;
};

const BATCH_SIZE = 80;

const useCreateRole = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/onboard_auth_role',
		method : 'POST',
	}, { manual: true, autoCancel: false });

	const createRole = async (
		auth_role_id,
		navigationPermissions,
		refetch,
		previousData,
	) => {
		let payload = { auth_role_id };
		const formattedPermissions = formatNavigations(navigationPermissions);
		const permissionPayload = getChangedPayload(
			previousData,
			formattedPermissions,
		);
		const permissions = permissionPayload[0]?.permissions || [];
		const navigation = permissionPayload[0]?.navigation;
		if (permissionPayload.length) {
			if (permissions.length > BATCH_SIZE) {
				let isBatchesAvailble = true;
				let currentBatch = 0;
				const allPromises = [];
				while (isBatchesAvailble) {
					const permissionArray = [];
					for (
						let i = currentBatch * BATCH_SIZE;
						i < (currentBatch + 1) * BATCH_SIZE && i < permissions.length;
						// eslint-disable-next-line no-plusplus
						i++
					) {
						permissionArray.push(permissions[i]);
						if (i === permissions.length - 1) {
							isBatchesAvailble = false;
							break;
						}
					}
					allPromises.push(
						trigger({
							data: {
								...payload,
								navigation_permission_pairs: [
									{ navigation, permissions: permissionArray },
								],
							},
						}),
					);
					currentBatch += 1;
				}
				try {
					await Promise.all(allPromises);
					Toast.success('Role Updated successfully');
					if (refetch) {
						refetch();
					}
				} catch (err) {
					Toast.error(getApiErrorString(err?.data));
				}
			} else {
				payload = {
					...payload,
					navigation_permission_pairs: permissionPayload,
				};
				try {
					const res = await trigger({ data: payload });
					if (!res.hasError) {
						Toast.success('Role Updated successfully');
						if (refetch) {
							refetch();
						}
					}
				} catch (err) {
					Toast.error(getApiErrorString(err.data));
				}
			}
		} else {
			Toast.error('No change in permissions.');
		}
	};
	return { createRole, loading };
};
export default useCreateRole;
