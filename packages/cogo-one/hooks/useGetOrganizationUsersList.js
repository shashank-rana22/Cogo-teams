import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

const getPayload = ({ orgId = '', userId = '' }) => ({
	filters: {
		organization_id : orgId,
		user_id         : userId,
	},
});

const useGetOrganizationUsersList = ({ orgId = '', userId = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_organization_users',
		method : 'get',
	}, { manual: true });

	const fetchUser = useCallback(async () => {
		try {
			await trigger({
				params: getPayload({ orgId, userId }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [orgId, trigger, userId]);

	useEffect(() => {
		if (orgId) {
			fetchUser();
		}
	}, [fetchUser, orgId]);

	const isOrgUserIdPresent = !isEmpty(data?.list);

	return {
		orgLoading: loading,
		isOrgUserIdPresent,
	};
};

export default useGetOrganizationUsersList;
