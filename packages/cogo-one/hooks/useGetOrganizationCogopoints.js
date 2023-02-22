import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetOrganizationCogopoints = ({ organizationId = '' }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/get_organization_cogopoint_profile',
		method : 'get',
	}, { manual: true });

	const [pointData, setPointData] = useState(null);

	const fetchOrganizationCogopoint = async () => {
		const res = await trigger({
			params: {
				organization_id: organizationId,
			},
		});
		setPointData(res?.data || {});
	};

	useEffect(() => {
		if (organizationId) {
			fetchOrganizationCogopoint();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [organizationId]);

	return {
		pointData,
		pointLoading: loading,
	};
};
export default useGetOrganizationCogopoints;
