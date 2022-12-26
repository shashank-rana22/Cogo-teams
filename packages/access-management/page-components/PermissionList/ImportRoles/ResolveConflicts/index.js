import React, { useEffect } from 'react';
import navigationMappings from '@cogo/project-partner/page-components/layout/configurations/navigation-mappings';
import { Heading, ApiBox } from '../styles';
import ApiDetails from './ApiDetails';

const ResolveConflicts = ({
	roles = [],
	selectedRoles = [],
	permissions: allPermissions = {},
	handleConflictResolve = () => {},
	newPermissions = {},
}) => {
	const apis = {};
	const selectedRolesData = roles.filter((role) =>
		selectedRoles.includes(role.id),
	);
	selectedRolesData.forEach((role) => {
		const { permissions, name } = role || {};
		permissions.forEach((api) => {
			const key = `${api.resource_name}_${api.navigation}`;
			apis[key] = {
				navTitle: navigationMappings[api.navigation]?.title,
				apiName: allPermissions[api.resource_name]?.display_name,
				permissions: [
					...(apis[key]?.permissions || []),
					{
						...api,
						name,
					},
				],
			};
		});
	});
	useEffect(() => {}, []);
	return (
		<div>
			{Object.keys(apis).map((key) => {
				const apiData = apis[key];
				return (
					<ApiBox key={key}>
						<Heading>
							{apiData?.navTitle} -&gt; {apiData?.apiName}
						</Heading>
						{apiData.permissions.map((api) => (
							<ApiDetails
								key={api.id}
								api={api}
								handleConflictResolve={() => handleConflictResolve(key, api)}
								apiKey={key}
								newPermissions={newPermissions}
							/>
						))}
					</ApiBox>
				);
			})}
		</div>
	);
};
export default ResolveConflicts;
