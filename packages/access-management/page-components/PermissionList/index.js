import React from 'react';
import { Container, BackButtonContainer, BackButton } from './styles';
import ArrowLeftSvg from '../../assets/arrow-left.svg';
import RoleDetails from './RoleDetails';
import ModulesPermissions from './ModulesPermissions';
import useOnBoardRole from '../../hooks/useOnBoardRole';
import ImportRoles from './ImportRoles';

const PermissionList = () => {
	const props = useOnBoardRole();
	const {
		loading,
		roleData,
		onBack,
		setShowImportRole,
		showImportRole,
		handleRoleImport,
		permissions,
		onImport,
		getRole,
	} = props || {};

	return (
		<Container>
			<BackButtonContainer>
				<BackButton onClick={onBack}>
					<ArrowLeftSvg />
					Back
				</BackButton>
			</BackButtonContainer>

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
		</Container>
	);
};

export default PermissionList;
