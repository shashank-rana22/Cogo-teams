import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import toastApiError from '../utils/toastApiError';

const useUpdateStatus = () => {
	const [apiData, setApiData] = useState({});
	const [{ loading }, trigger] = useRequest({
		url    : 'update_partner',
		method : 'POST',
	}, { manual: true });

	const updateStatus = async (data) => {
		try {
			const res = await trigger({ data });

			setApiData(res?.data || {});
			Toast.success('Partner Status Updated Successfully');
		} catch (err) {
			setApiData({});

			toastApiError(err);
		}
	};

	return {
		loading,
		data: apiData,
		updateStatus,
	};
};

export default useUpdateStatus;
