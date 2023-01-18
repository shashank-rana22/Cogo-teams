import navigationMappingAdmin from '@cogoport/navigation-configs/navigation-mapping-admin';
import navigationMappingSeller from '@cogoport/navigation-configs/navigation-mapping-seller';
import navigationMappingShipper from '@cogoport/navigation-configs/navigation-mapping-shipper';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import getNavData from '@cogoport/request/helpers/get-nav-data';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

import getNavigationOptions from '../utils/get-navigation-options';

/**
 * Gives permission access to user roles
 * @returns
 */

const useOnBoardRole = () => {
	const [initialLoading, setInitialLoad] = useState(true);
	const [showImportRole, setShowImportRole] = useState(false);
	const [importedPermissions, setImportedPermissions] = useState(null);
	const { role_id } = useSelector(({ general }) => ({
		role_id: general?.query?.role_id,
	}));
	const router = useRouter();

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_auth_roles',
		method : 'get',
	});

	const [{ data: possiblePermissionsData }] = useRequest({
		url    : '/get_auth_possible_permissions',
		method : 'get',
	}, { manual: false });

	const roleData = data?.list?.[0] || {};

	const { permissions } = possiblePermissionsData || {};

	let navigationMappings = navigationMappingAdmin;

	if (roleData?.stakeholder_type === 'organization') {
		if (roleData?.id === '6fbc5d22-b79b-4db6-aeab-d5db3b58db17') {
			navigationMappings = navigationMappingSeller;
		} else {
			navigationMappings = navigationMappingShipper;
		}
	}

	/**
	 * Get role data
	 * @param {string} [id=null]
	 * @param {boolean} [load=true]
	 */

	const getRole = async (id = null, load = true) => {
		if (initialLoading && !load) {
			setInitialLoad(false);
		}
		try {
			await trigger({
				params: { filters: { id: id || role_id }, partner_data_required: true },
			});
		} catch (err) {
			console.log(err);
		}
	};

	/**
	 * Gets navigation configs corresponding to navigation
	 * @param {string} [navigation='']
	 */
	const getNavOptions = (navigation = '') => {
		const navObj = getNavData(navigation, navigationMappings);
		return getNavigationOptions(permissions, navObj || {});
	};

	const onBack = useCallback(() => router.push('/list-roles'), []);

	const handleRoleImport = (vals) => {
		setImportedPermissions(vals);
		setShowImportRole(false);
	};

	const isImported = !!importedPermissions;

	const onImport = () => {
		if (isImported) {
			setImportedPermissions(null);
		} else {
			setShowImportRole(true);
		}
	};

	useEffect(() => {
		if (role_id) {
			getRole();
		}
	}, [role_id]);

	return {
		roleData   : { ...roleData, importedPermissions, isImported },
		authRoleId : role_id,
		loading,
		initialLoading,
		getRole,
		getNavOptions,
		permissions,
		onBack,
		navigationMappings,
		setShowImportRole,
		showImportRole,
		handleRoleImport,
		onImport,
	};
};

export default useOnBoardRole;
