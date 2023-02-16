import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetListCommunicationLog({ activeMessageCard }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_organization_communication_logs',
		method : 'get',
	}, { manual: true });

	const fetchListLogApi = async () => {
		try {
			await trigger({
				params: {
					filters: {
						communication_type : 'meeting',
						organization_id    : 'bbde20db-d8b8-4be7-8307-367666847041',
					},
				},
			});
		} catch (error) {
			Toast.error(getApiErrorString(error?.data));
		}
	};
	useEffect(() => {
		fetchListLogApi();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeMessageCard]);

	return {
		listLoading : loading,
		listData    : data,
		fetchListLogApi,
	};
}
export default useGetListCommunicationLog;
