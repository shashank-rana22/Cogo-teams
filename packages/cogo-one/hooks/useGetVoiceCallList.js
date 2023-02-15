import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetVoiceCallList = ({ activeTab }) => {
	const checkActiveTab = activeTab === 'voice';
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_user_call_details',
		method : 'get',
	}, { manual: true });

	const [pagination, setPagination] = useState(1);

	const voiceCallList = async () => {
		try {
			await trigger({
				page: pagination,
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.error));
		}
	};

	useEffect(() => {
		voiceCallList();
	}, [checkActiveTab]);

	return {
		loading,
		data,
		setPagination,
	};
};
export default useGetVoiceCallList;
