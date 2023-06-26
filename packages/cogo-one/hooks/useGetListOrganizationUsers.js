import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetListOrganizationUsers = ({ organizationId = '', accountType = '' }) => {
	const [
		{ data, loading }, trigger,
	] = useRequest(
		{
			url    : '/list_organization_users',
			method : 'get',
		},
		{ manual: true },
	);

	const listOrganizationsUsers = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						organization_id: organizationId,
					},
				},
			});
		} catch (error) {
			console.log(error);
		}
	}, [organizationId, trigger]);

	useEffect(() => {
		if (accountType === 'service_provider') {
			listOrganizationsUsers();
		}
	}, [accountType, listOrganizationsUsers]);

	return {
		organizationUsersData    : data,
		organizationUsersLoading : loading,
	};
};

export default useGetListOrganizationUsers;
