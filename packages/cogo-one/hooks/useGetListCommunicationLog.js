import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

function useGetListCommunicationLog({ organizationId = null }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_organization_communication_logs',
		method : 'get',
	}, { manual: true });

	const fetchListLogApi = async () => {
		await trigger({
			params: {
				filters: {
					communication_type : 'meeting',
					organization_id    : organizationId,
				},
			},
		});
	};
	useEffect(() => {
		if (organizationId) {
			fetchListLogApi();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [organizationId]);

	return {
		listLoading : loading,
		listData    : data,
		fetchListLogApi,
	};
}
export default useGetListCommunicationLog;
