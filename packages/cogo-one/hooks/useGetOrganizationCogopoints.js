import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const getParams = ({ organizationId, userId }) => ({
	organization_id : organizationId,
	user_id         : userId,
});

const useGetOrganizationCogopoints = ({ organizationId = '', userId = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_organization_cogopoint_profile',
		method : 'get',
	}, { manual: true });

	const fetchOrganizationCogopoint = useCallback(() => {
		if (!organizationId && !userId) {
			return;
		}
		try {
			trigger({
				params: getParams({ organizationId, userId }),
			});
		} catch (error) {
			console.error('error', error);
		}
	}, [trigger, organizationId, userId]);

	useEffect(() => {
		fetchOrganizationCogopoint();
	}, [fetchOrganizationCogopoint]);

	return {
		pointData    : data,
		pointLoading : loading,
	};
};
export default useGetOrganizationCogopoints;
