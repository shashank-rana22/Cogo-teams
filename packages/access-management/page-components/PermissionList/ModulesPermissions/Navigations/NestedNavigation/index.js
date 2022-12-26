import React from 'react';
import { Container, Name, Description } from './styles';
import Navigation from '../Navigation';
import descriptions from '../../../../../utils/descriptions';

const NestedNavigations = ({
	navigation,
	roleData,
	authRoleId,
	getRole,
	getNavOptions,
	loading,
}) => {
	return (
		<Container>
			<div>
				<Name>{navigation?.title}</Name>
				<Description>{descriptions[navigation?.key] || ''}</Description>
			</div>
			{navigation.options.map((nav) => (
				<Navigation
					navigation={nav}
					roleData={{
						...(roleData || {}),
						permissions: roleData?.permissions,
						old_permissions: roleData?.permissions,
					}}
					authRoleId={authRoleId}
					getRole={getRole}
					getNavOptions={getNavOptions}
					loading={loading}
					isNested
				/>
			))}
		</Container>
	);
};

export default NestedNavigations;
