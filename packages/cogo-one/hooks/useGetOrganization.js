import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetOrganization = ({ organizationId = '' }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_organization',
		method : 'get',
	}, { manual: true });

	const fetchOrganization = async () => {
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
	};

	useEffect(() => {
		if (organizationId) {
			fetchOrganization();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [organizationId]);

	return {
		organizationData : data?.data,
		orgLoading       : loading,
	};
};
export default useGetOrganization;
