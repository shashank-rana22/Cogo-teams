import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetListOrganizationUsers = ({ organizationId = '', isOrgUsersVisible = false }) => {
	const [
		{ data, loading }, trigger,
	] = useRequest({
		url    : '/list_organization_users',
		method : 'get',
	}, { manual: true });

	const listOrganizationsUsers = useCallback(() => {
		try {
			trigger({
				params: {
					filters: {
						organization_id: organizationId,
					},
					page_limit: 100,
				},
			});
		} catch (error) {
			console.error(error);
		}
	}, [organizationId, trigger]);

	useEffect(() => {
		if (isOrgUsersVisible) {
			listOrganizationsUsers();
		}
	}, [isOrgUsersVisible, listOrganizationsUsers]);

	return {
		organizationUsersData    : data,
		organizationUsersLoading : loading,
	};
};

export default useGetListOrganizationUsers;
