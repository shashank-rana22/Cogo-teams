import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetOrganizationCogopoints = ({ organizationId = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_organization_cogopoint_profile',
		method : 'get',
	}, { manual: true });

	const fetchOrganizationCogopoint = async () => {
		try {
			await trigger({
				params: {
					organization_id: organizationId,
				},
			});
		} catch (error) {
			// console.log(error);
		}
	};

	useEffect(() => {
		if (organizationId) {
			fetchOrganizationCogopoint();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [organizationId]);

	return {
		pointData    : data,
		pointLoading : loading,
	};
};
export default useGetOrganizationCogopoints;
