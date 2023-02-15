import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetOrganization = ({ activeSelect }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/get_organization',
		method : 'get',
	}, { manual: true });

	const [organizationData, setOrganizationData] = useState(null);

	const fetchOrganization = async () => {
		try {
			const res = await trigger({
				params: {
					id                 : 'bbde20db-d8b8-4be7-8307-367666847041',
					user_data_required : true,
				},
			});
			setOrganizationData(res?.data?.data || {});
		} catch (error) {
			Toast.error(error?.message);
			setOrganizationData({});
		}
	};

	useEffect(() => {
		fetchOrganization();
	}, [activeSelect]);

	return {
		organizationData,
		loading,
	};
};
export default useGetOrganization;
