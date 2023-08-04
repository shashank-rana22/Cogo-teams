import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetOrganization = ({ organizationId = '', leadOrganizationId = '' }) => {
	const orgApi = organizationId ? 'get_organization' : 'get_lead_organization';

	const [{ loading, data }, trigger] = useRequest({
		url    : `/${orgApi}`,
		method : 'get',
	}, { manual: true });

	const fetchOrganization = useCallback(async () => {
		try {
			await trigger({
				params: {
					id                 : organizationId || leadOrganizationId,
					user_data_required : organizationId ? true : undefined,
				},
			});
		} catch (error) {
			console.error(error);
		}
	}, [leadOrganizationId, organizationId, trigger]);

	useEffect(() => {
		if (organizationId || leadOrganizationId) {
			fetchOrganization();
		}
	}, [fetchOrganization, leadOrganizationId, organizationId]);

	return {
		organizationData : data?.data,
		orgLoading       : loading,
		fetchOrganization,
	};
};
export default useGetOrganization;
