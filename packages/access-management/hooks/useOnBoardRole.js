import sellerNavs from '@cogo/app-layout/configurations/nav-items.seller';
import importerExporterNavs from '@cogo/app-layout/configurations/nav-items.shipper';
import getNavData from '@cogo/business-modules/helpers/get-nav-data';
import { useRequest } from '@cogo/commons/hooks';
import { useRouter } from '@cogo/next';
import navigationMappingsPartner from '@cogo/project-partner/page-components/layout/configurations/navigation-mappings';
import { useSelector } from '@cogo/store';
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
	const { role_id, scope } = useSelector(({ general }) => ({
		role_id : general?.query?.role_id,
		scope   : general?.scope,
	}));
	const router = useRouter();

	const { loading, trigger, data } = useRequest(
		'get',
		false,
		scope,
	)('/list_auth_roles');
	const { data: possiblePermissionsData } = useRequest(
		'get',
		true,
		scope,
	)('/get_auth_possible_permissions');

	const roleData = data?.list?.[0] || {};

	const { permissions } = possiblePermissionsData || {};

	let navigationMappings = navigationMappingsPartner;

	if (roleData?.stakeholder_type === 'organization') {
		if (roleData?.id === '6fbc5d22-b79b-4db6-aeab-d5db3b58db17') {
			navigationMappings = sellerNavs;
		} else {
			navigationMappings = importerExporterNavs;
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
		return getNavigationOptions(permissions, navObj);
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
		navigationMappings,
		permissions,
		onBack,
		setShowImportRole,
		showImportRole,
		handleRoleImport,
		onImport,
	};
};

export default useOnBoardRole;
