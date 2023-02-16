import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetOrganizationCogopoints = ({ activeMessageCard }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/get_organization_cogopoint_profile',
		method : 'get',
	}, { manual: true });

	const [pointData, setPointData] = useState(null);

	const fetchOrganizationCogopoint = async () => {
		try {
			const res = await trigger({
				params: {
					organization_id: 'bbde20db-d8b8-4be7-8307-367666847041',
				},
			});
			setPointData(res?.data || {});
		} catch (error) {
			Toast.error(getApiErrorString(error?.data));
		}
	};

	useEffect(() => {
		fetchOrganizationCogopoint();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeMessageCard]);

	return {
		pointData,
		pointLoading: loading,
	};
};
export default useGetOrganizationCogopoints;
