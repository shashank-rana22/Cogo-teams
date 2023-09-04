import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import useOnBoardRole from '../../hooks/useOnBoardRole';

import ImportRoles from './ImportRoles';
import ModulesPermissions from './ModulesPermissions';
import RoleDetails from './RoleDetails';
import styles from './styles.module.css';

function PermissionList() {
	const { t } = useTranslation(['accessManagement']);
	const props = useOnBoardRole();
	const {
		loading,
		activeNavsLoading,
		roleData,
		setShowImportRole,
		showImportRole,
		onBack,
		handleRoleImport,
		permissions,
		onImport,
		getRole,
		activeNavs = [],
	} = props || {};

	return (
		<section className={styles.container}>
			<Button className={styles.back_container} size="md" themeType="secondary" onClick={onBack}>
				<IcMArrowBack fill="#221F20" style={{ marginRight: 4 }} />
				{t('accessManagement:roles_and_permission_button_back')}
			</Button>

			<RoleDetails
				roleData={roleData}
				loading={loading}
				onImport={onImport}
				getRole={getRole}
				activeNavs={activeNavs}
				activeNavsLoading={activeNavsLoading}
			/>

			<ModulesPermissions {...props} />
			{showImportRole ? (
				<ImportRoles
					onSubmit={handleRoleImport}
					show={showImportRole}
					onClose={() => setShowImportRole(false)}
					permissions={permissions}
				/>
			) : null}
		</section>
	);
}

export default PermissionList;
