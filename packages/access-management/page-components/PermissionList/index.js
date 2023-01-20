import { Button } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
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
		onBack,
		handleRoleImport,
		permissions,
		onImport,
		getRole,
	} = props || {};

	return (
		<section className={styles.container}>
			<Button className={styles.back_container} size="md" themeType="secondary" onClick={onBack}>
				<IcMArrowBack fill="#221F20" style={{ marginRight: 4 }} />
				Back
			</Button>

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
