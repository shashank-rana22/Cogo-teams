/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetCogoOneDashboard() {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_cogo_one_dashboard',
		method : 'post',
	}, { manual: true });

	const getCogoOneDashboard = async () => {
		try {
			await trigger({
				data: {
					timeline : '1001',
					agent_id : '80',
				},
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	useEffect(() => {
		getCogoOneDashboard();
	}, []);

	return {
		loading,
		getCogoOneDashboard,
		listData: data,
	};
}
export default useGetCogoOneDashboard;
