import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetOrganization = ({ organizationId = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_organization',
		method : 'get',
	}, { manual: true });

	const fetchOrganization = useCallback(async () => {
		try {
			await trigger({
				params: {
					id                 : organizationId,
					user_data_required : true,
				},
			});
		} catch (error) {
			// console.log(error);
		}
	}, [organizationId, trigger]);

	useEffect(() => {
		if (organizationId) {
			fetchOrganization();
		}
	}, [fetchOrganization, organizationId]);

	return {
		organizationData : data?.data,
		orgLoading       : loading,
		fetchOrganization,
	};
};
export default useGetOrganization;
