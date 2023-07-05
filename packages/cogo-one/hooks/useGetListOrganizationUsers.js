import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const getPayload = ({ organizationId = '' }) => ({
	filters: {
		organization_id: organizationId,
	},
	page_limit: 100,
});

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
				params: getPayload({ organizationId }),
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
