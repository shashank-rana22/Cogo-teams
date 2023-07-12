import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const getParams = ({ organizationId, userID }) => ({
	organization_id : organizationId,
	user_id         : userID,
});

const useGetOrganizationCogopoints = ({ organizationId = '', userID = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_organization_cogopoint_profile',
		method : 'get',
	}, { manual: true });

	const fetchOrganizationCogopoint = useCallback(() => {
		try {
			trigger({
				params: getParams({ organizationId, userID }),
			});
		} catch (error) {
			console.error('error', error);
		}
	}, [trigger, organizationId, userID]);

	useEffect(() => {
		if (organizationId || userID) {
			fetchOrganizationCogopoint();
		}
	}, [fetchOrganizationCogopoint, organizationId, userID]);

	return {
		pointData    : data,
		pointLoading : loading,
	};
};
export default useGetOrganizationCogopoints;
