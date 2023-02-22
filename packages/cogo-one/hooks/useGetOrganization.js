import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetOrganization = ({ organizationId = '' }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/get_organization',
		method : 'get',
	}, { manual: true });

	const [organizationData, setOrganizationData] = useState(null);

	const fetchOrganization = async () => {
		const res = await trigger({
			params: {
				id                 : organizationId,
				user_data_required : true,
			},
		});
		setOrganizationData(res?.data?.data || {});
	};

	useEffect(() => {
		if (organizationId) {
			fetchOrganization();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [organizationId]);

	return {
		organizationData,
		orgLoading: loading,
	};
};
export default useGetOrganization;
