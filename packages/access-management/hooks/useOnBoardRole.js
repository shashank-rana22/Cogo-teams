import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import navigationMapping from '@cogoport/navigation-configs/navigation-mapping-admin';
import navigationMappingSeller from '@cogoport/navigation-configs/navigation-mapping-seller';
import navigationMappingShipper from '@cogoport/navigation-configs/navigation-mapping-shipper';
import { useRouter } from '@cogoport/next';
import { useAuthRequest } from '@cogoport/request';
import getNavData from '@cogoport/request/helpers/get-nav-data';
import { useSelector } from '@cogoport/store';
import { useTranslation } from 'next-i18next';
import { useEffect, useState, useCallback } from 'react';

import getNavigationOptions from '../utils/get-navigation-options';

/**
 * Gives permission access to user roles
 * @returns
 */

const useOnBoardRole = () => {
	const router = useRouter();

	const { t } = useTranslation(['accessManagement', 'common']);

	const { role_id } = useSelector(({ general }) => ({
		role_id: general?.query?.role_id,
	}));

	const [initialLoading, setInitialLoad] = useState(true);
	const [showImportRole, setShowImportRole] = useState(false);
	const [importedPermissions, setImportedPermissions] = useState(null);
	const [{ loading, data }, trigger] = useAuthRequest({
		url    : '/list_roles',
		method : 'get',
	});

	const [{ data: possiblePermissionsData }, getPossibleNavsData] = useAuthRequest({
		url    : '/get_possible_permissions',
		method : 'get',
	});

	const [{ data: activeNavsData, loading: activeNavsLoading = false }, getActiveNavs] = useAuthRequest({
		url    : '/get_role_active_navigations',
		method : 'get',
	});

	const roleData = data?.list?.[GLOBAL_CONSTANTS.zeroth_index] || {};

	const { navigations: activeNavs = [] } = activeNavsData || {};

	const { permissions } = possiblePermissionsData || {};

	const navigationMappingAdmin = navigationMapping({ t });

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

	const getRole = (id = null, load = true) => {
		if (initialLoading && !load) {
			setInitialLoad(false);
		}

		trigger({ params: { filters: { id: id || role_id }, partner_data_required: true } });
		getPossibleNavsData({ params: { role_id: id || role_id } });
		getActiveNavs({ params: { role_id: id || role_id } });
	};

	/**
	 * Gets navigation configs corresponding to navigation
	 * @param {string} [navigation='']
	 */
	const getNavOptions = (navigation = '') => {
		const navObj = getNavData({ navigation, projectNavigationMappings: navigationMappings, t });
		return getNavigationOptions(permissions, navObj || {});
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		activeNavs,
		activeNavsLoading,
	};
};

export default useOnBoardRole;
