import React from 'react';

import useOnBoardRole from '../../hooks/useOnBoardRole';

import ImportRoles from './ImportRoles';
import ModulesPermissions from './ModulesPermissions';
import RoleDetails from './RoleDetails';
import styles from './styles.module.css';

function PermissionList() {
	const props = useOnBoardRole();
	const {
		loading,
		roleData,
		setShowImportRole,
		showImportRole,
		handleRoleImport,
		permissions,
		onImport,
		getRole,
	} = props || {};

	return (
		<section className={styles.container}>
			<RoleDetails
				roleData={roleData}
				loading={loading}
				onImport={onImport}
				getRole={getRole}
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
