import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetListCommunicationLog({ activeMessageCard }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_organization_communication_logs',
		method : 'get',
	}, { manual: true });

	const fetchListLogApi = async () => {
		await trigger({
			params: {
				filters: {
					communication_type : 'meeting',
					organization_id    : 'bbde20db-d8b8-4be7-8307-367666847041',
				},
			},
		});
	};
	useEffect(() => {
		fetchListLogApi();
	}, [activeMessageCard]);

	return {
		listLoading : loading,
		listData    : data,
		fetchListLogApi,
	};
}
export default useGetListCommunicationLog;
